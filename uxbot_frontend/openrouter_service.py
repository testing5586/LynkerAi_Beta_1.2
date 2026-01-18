"""
OpenRouter Integration Service
OpenRouter API 整合服務 - 統一管理多個 LLM 提供商
"""

import os
import httpx
from typing import Optional, Dict, Any, List
from datetime import datetime

# OpenRouter API Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# ─────────────────────────────────────────────────────────────────
# Model Mapping - Internal ID to OpenRouter Model ID
# ─────────────────────────────────────────────────────────────────
MODEL_MAPPING = {
    # Premium Models (consume tokens)
    'chatgpt5': 'openai/gpt-4o',  # Using GPT-4o as proxy for GPT-5
    'gemini3': 'google/gemini-2.0-flash-exp',  # Latest Gemini
    'deepseek_high': 'deepseek/deepseek-r1',  # DeepSeek R1 reasoning
    'qwen_plus': 'qwen/qwen-2.5-72b-instruct',  # Qwen Max equivalent
    
    # Fallback Models (free/low cost when tokens exhausted)
    'deepseek_chat': 'deepseek/deepseek-chat',  # Basic DeepSeek
    'qwen_turbo': 'qwen/qwen-2.5-7b-instruct',  # Lighter Qwen
}

# Model Display Info
MODEL_INFO = {
    'chatgpt5': {
        'name': 'ChatGPT-5',
        'provider': 'OpenAI',
        'tier': 'premium',
        'tokens_per_call': 2,  # Token cost multiplier
        'description': '最新 GPT-5 模型，強大的推理和創造能力'
    },
    'gemini3': {
        'name': 'Gemini 3',
        'provider': 'Google',
        'tier': 'premium',
        'tokens_per_call': 2,
        'description': 'Google 最新多模態 AI，擅長理解和生成'
    },
    'deepseek_high': {
        'name': 'DeepSeek R1',
        'provider': 'DeepSeek',
        'tier': 'premium',
        'tokens_per_call': 1,
        'description': '深度推理模型，擅長複雜分析和邏輯推導'
    },
    'qwen_plus': {
        'name': 'Qwen Max',
        'provider': 'Alibaba',
        'tier': 'premium',
        'tokens_per_call': 1,
        'description': '通義千問旗艦版，中文理解能力出色'
    },
    'deepseek_chat': {
        'name': 'DeepSeek Chat',
        'provider': 'DeepSeek',
        'tier': 'fallback',
        'tokens_per_call': 0,  # Free fallback
        'description': '基礎對話模型，Token 用盡後的備用選項'
    },
    'qwen_turbo': {
        'name': 'Qwen Turbo',
        'provider': 'Alibaba',
        'tier': 'fallback',
        'tokens_per_call': 0,  # Free fallback
        'description': '快速響應模型，Token 用盡後的備用選項'
    }
}


class OpenRouterService:
    """
    OpenRouter API Service for LLM interactions
    統一的 LLM 調用服務
    """
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or OPENROUTER_API_KEY
        self.base_url = OPENROUTER_BASE_URL
        
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model_id: str = 'deepseek_high',
        use_fallback: bool = False,
        max_tokens: int = 2000,
        temperature: float = 0.7,
        **kwargs
    ) -> Dict[str, Any]:
        """
        Send chat completion request to OpenRouter
        發送聊天完成請求
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            model_id: Internal model ID (chatgpt5, gemini3, etc.)
            use_fallback: If True, use fallback model instead
            max_tokens: Maximum response tokens
            temperature: Creativity setting (0-1)
        
        Returns:
            Response dict with 'content', 'model_used', 'tokens_consumed'
        """
        # Determine which model to use
        if use_fallback:
            actual_model_id = 'deepseek_chat'  # Default fallback
        else:
            actual_model_id = model_id
        
        openrouter_model = MODEL_MAPPING.get(actual_model_id, MODEL_MAPPING['deepseek_chat'])
        model_info = MODEL_INFO.get(actual_model_id, MODEL_INFO['deepseek_chat'])
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://lynker.ai",
            "X-Title": "LynkerAI"
        }
        
        payload = {
            "model": openrouter_model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            **kwargs
        }
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload
                )
                response.raise_for_status()
                data = response.json()
                
                # Extract response content
                content = ""
                if data.get("choices") and len(data["choices"]) > 0:
                    content = data["choices"][0].get("message", {}).get("content", "")
                
                return {
                    "success": True,
                    "content": content,
                    "model_used": actual_model_id,
                    "model_name": model_info['name'],
                    "tokens_consumed": model_info['tokens_per_call'],
                    "is_fallback": use_fallback or model_info['tier'] == 'fallback',
                    "usage": data.get("usage", {}),
                    "raw_response": data
                }
                
        except httpx.HTTPStatusError as e:
            return {
                "success": False,
                "error": f"API Error: {e.response.status_code}",
                "model_used": actual_model_id,
                "tokens_consumed": 0,
                "is_fallback": use_fallback
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "model_used": actual_model_id,
                "tokens_consumed": 0,
                "is_fallback": use_fallback
            }
    
    def chat_completion_sync(
        self,
        messages: List[Dict[str, str]],
        model_id: str = 'deepseek_high',
        use_fallback: bool = False,
        max_tokens: int = 2000,
        temperature: float = 0.7,
        **kwargs
    ) -> Dict[str, Any]:
        """
        Synchronous version of chat_completion
        同步版本的聊天完成
        """
        # Determine which model to use
        if use_fallback:
            actual_model_id = 'deepseek_chat'
        else:
            actual_model_id = model_id
        
        openrouter_model = MODEL_MAPPING.get(actual_model_id, MODEL_MAPPING['deepseek_chat'])
        model_info = MODEL_INFO.get(actual_model_id, MODEL_INFO['deepseek_chat'])
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://lynker.ai",
            "X-Title": "LynkerAI"
        }
        
        payload = {
            "model": openrouter_model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            **kwargs
        }
        
        try:
            with httpx.Client(timeout=60.0) as client:
                response = client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload
                )
                response.raise_for_status()
                data = response.json()
                
                content = ""
                if data.get("choices") and len(data["choices"]) > 0:
                    content = data["choices"][0].get("message", {}).get("content", "")
                
                return {
                    "success": True,
                    "content": content,
                    "model_used": actual_model_id,
                    "model_name": model_info['name'],
                    "tokens_consumed": model_info['tokens_per_call'],
                    "is_fallback": use_fallback or model_info['tier'] == 'fallback',
                    "usage": data.get("usage", {}),
                    "raw_response": data
                }
                
        except httpx.HTTPStatusError as e:
            return {
                "success": False,
                "error": f"API Error: {e.response.status_code}",
                "model_used": actual_model_id,
                "tokens_consumed": 0,
                "is_fallback": use_fallback
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "model_used": actual_model_id,
                "tokens_consumed": 0,
                "is_fallback": use_fallback
            }
    
    @staticmethod
    def get_model_info(model_id: str) -> Dict[str, Any]:
        """Get information about a model"""
        return MODEL_INFO.get(model_id, MODEL_INFO['deepseek_chat'])
    
    @staticmethod
    def get_all_premium_models() -> List[Dict[str, Any]]:
        """Get list of all premium models"""
        return [
            {'id': k, **v}
            for k, v in MODEL_INFO.items()
            if v['tier'] == 'premium'
        ]
    
    @staticmethod
    def get_all_fallback_models() -> List[Dict[str, Any]]:
        """Get list of all fallback models"""
        return [
            {'id': k, **v}
            for k, v in MODEL_INFO.items()
            if v['tier'] == 'fallback'
        ]


# ─────────────────────────────────────────────────────────────────
# Helper Functions for Flask Routes
# ─────────────────────────────────────────────────────────────────

def get_openrouter_service() -> OpenRouterService:
    """Get OpenRouter service instance"""
    return OpenRouterService()


def determine_model_for_guru(
    guru_id: str,
    preferred_model: str,
    token_remaining: int
) -> tuple[str, bool]:
    """
    Determine which model to use based on subscription status
    根據訂閱狀態決定使用哪個模型
    
    Returns:
        (model_id, use_fallback)
    """
    if token_remaining <= 0:
        # No tokens left, use fallback
        return 'deepseek_chat', True
    
    # Check if remaining tokens are enough for the preferred model
    model_info = MODEL_INFO.get(preferred_model, {})
    tokens_needed = model_info.get('tokens_per_call', 1)
    
    if token_remaining < tokens_needed:
        # Not enough tokens for preferred model, use fallback
        return 'deepseek_chat', True
    else:
        # Has enough tokens, use preferred model
        return preferred_model, False


# ─────────────────────────────────────────────────────────────────
# Example Usage in AI Chat Route
# ─────────────────────────────────────────────────────────────────
"""
Example integration in ai_routes.py:

from openrouter_service import get_openrouter_service, determine_model_for_guru

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    guru_id = data.get('guru_id')
    messages = data.get('messages', [])
    
    # Get subscription status
    sub_response = requests.get(f'/api/subscription/{guru_id}')
    sub_data = sub_response.json().get('data', {})
    token_remaining = sub_data.get('token_remaining', 0)
    
    # Get AI config
    config_response = requests.get(f'/api/ai-config/{guru_id}')
    config_data = config_response.json().get('data', {})
    preferred_model = config_data.get('preferred_model', 'deepseek_high')
    
    # Determine model
    model_id, use_fallback = determine_model_for_guru(guru_id, preferred_model, token_remaining)
    
    # Call OpenRouter
    service = get_openrouter_service()
    result = service.chat_completion_sync(
        messages=messages,
        model_id=model_id,
        use_fallback=use_fallback
    )
    
    # Deduct tokens if not fallback
    if result['success'] and not result['is_fallback']:
        requests.post('/api/subscription/use-token', json={
            'guru_id': guru_id,
            'tokens': result['tokens_consumed']
        })
    
    return jsonify(result)
"""
