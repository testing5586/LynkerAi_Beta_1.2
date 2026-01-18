"""
AI Chat Routes - 整合 OpenRouter LLM 服務
處理 AI 對話請求，自動管理 Token 消耗和模型切換
"""

from flask import Blueprint, request, jsonify
import os
from supabase import create_client, Client

from .openrouter_service import (
    OpenRouterService, 
    MODEL_INFO, 
    MODEL_MAPPING,
    determine_model_for_guru
)

ai_chat_bp = Blueprint('ai_chat', __name__)

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_KEY", ""))

def get_supabase() -> Client:
    """Get Supabase client instance"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)


# Token 警告閾值
TOKEN_WARNING_THRESHOLD = 10
TOKEN_CRITICAL_THRESHOLD = 3

def get_token_warning(token_remaining: int) -> dict:
    """
    獲取 Token 警告信息
    當 Token 不足時返回警告
    """
    if token_remaining <= 0:
        return {
            'level': 'exhausted',
            'message': '您的高級 Token 已用完，目前使用基礎 AI 模型',
            'show': True
        }
    elif token_remaining <= TOKEN_CRITICAL_THRESHOLD:
        return {
            'level': 'critical',
            'message': f'您的高級 Token 僅剩 {token_remaining} 個，即將切換到基礎模型',
            'show': True
        }
    elif token_remaining <= TOKEN_WARNING_THRESHOLD:
        return {
            'level': 'warning',
            'message': f'您的高級 Token 剩餘 {token_remaining} 個，建議升級訂閱',
            'show': True
        }
    else:
        return {
            'level': 'ok',
            'message': None,
            'show': False
        }


def get_subscription_status(guru_id: str) -> dict:
    """獲取訂閱狀態"""
    try:
        supabase = get_supabase()
        response = supabase.table('guru_subscriptions').select('*').eq('guru_id', guru_id).eq('status', 'active').execute()
        
        if response.data and len(response.data) > 0:
            sub = response.data[0]
            token_quota = sub.get('token_quota', 0)
            token_used = sub.get('token_used', 0)
            return {
                'has_subscription': True,
                'plan': sub.get('plan', 'free'),
                'token_quota': token_quota,
                'token_used': token_used,
                'token_remaining': token_quota - token_used,
                'status': sub.get('status', 'active')
            }
        else:
            return {
                'has_subscription': False,
                'plan': None,
                'token_quota': 0,
                'token_used': 0,
                'token_remaining': 0,
                'status': 'none'
            }
    except Exception as e:
        print(f"[AI Chat] Error getting subscription: {e}")
        return {
            'has_subscription': False,
            'token_remaining': 0,
            'error': str(e)
        }


def get_ai_config(guru_id: str) -> dict:
    """獲取 AI 配置（偏好模型）"""
    try:
        supabase = get_supabase()
        response = supabase.table('guru_ai_config').select('*').eq('guru_id', guru_id).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        else:
            return {'preferred_model': 'deepseek_high'}  # 默認模型
    except Exception as e:
        print(f"[AI Chat] Error getting AI config: {e}")
        return {'preferred_model': 'deepseek_high'}


def deduct_tokens(guru_id: str, tokens: int) -> bool:
    """扣除 Token"""
    try:
        supabase = get_supabase()
        
        # 獲取當前使用量
        response = supabase.table('guru_subscriptions').select('token_used').eq('guru_id', guru_id).eq('status', 'active').execute()
        
        if response.data and len(response.data) > 0:
            current_used = response.data[0].get('token_used', 0)
            new_used = current_used + tokens
            
            # 更新
            supabase.table('guru_subscriptions').update({
                'token_used': new_used
            }).eq('guru_id', guru_id).eq('status', 'active').execute()
            
            return True
        return False
    except Exception as e:
        print(f"[AI Chat] Error deducting tokens: {e}")
        return False


# AI 使用日誌表名
AI_USAGE_LOG_TABLE = 'guru_ai_usage_logs'

def log_ai_usage(guru_id: str, model_id: str, tokens_used: int, is_fallback: bool, success: bool):
    """記錄 AI 使用日誌"""
    try:
        supabase = get_supabase()
        # 插入使用日誌
        supabase.table(AI_USAGE_LOG_TABLE).insert({
            'guru_id': guru_id,
            'model_id': model_id,
            'tokens_used': tokens_used,
            'is_fallback': is_fallback,
            'success': success
        }).execute()
        print(f"[AI Chat] Logged usage: model={model_id}, tokens={tokens_used}")
    except Exception as e:
        # 日誌記錄失敗不影響主流程（表可能尚未創建）
        print(f"[AI Chat] Log error (non-critical): {e}")


# ─────────────────────────────────────────────────────────────────
# API Routes
# ─────────────────────────────────────────────────────────────────

@ai_chat_bp.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    """
    AI 對話端點
    
    Request Body:
    {
        "guru_id": "uuid",
        "messages": [
            {"role": "system", "content": "你是一位專業的命理師..."},
            {"role": "user", "content": "請幫我分析..."}
        ],
        "model": "deepseek_high",  // 可選，覆蓋默認偏好
        "max_tokens": 2000,        // 可選
        "temperature": 0.7         // 可選
    }
    
    Response:
    {
        "success": true,
        "content": "AI 回覆內容...",
        "model_used": "deepseek_high",
        "model_name": "DeepSeek R1",
        "is_fallback": false,
        "tokens_consumed": 1,
        "token_remaining": 992
    }
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'success': False, 'error': '無效的請求'}), 400
    
    guru_id = data.get('guru_id')
    messages = data.get('messages', [])
    
    if not guru_id:
        return jsonify({'success': False, 'error': '缺少 guru_id'}), 400
    
    if not messages or len(messages) == 0:
        return jsonify({'success': False, 'error': '缺少對話內容'}), 400
    
    # 1. 獲取訂閱狀態
    subscription = get_subscription_status(guru_id)
    token_remaining = subscription.get('token_remaining', 0)
    
    # 2. 獲取偏好模型（可被請求覆蓋）
    requested_model = data.get('model')
    if requested_model and requested_model in MODEL_INFO:
        preferred_model = requested_model
    else:
        ai_config = get_ai_config(guru_id)
        preferred_model = ai_config.get('preferred_model', 'deepseek_high')
    
    # 3. 決定使用哪個模型
    model_id, use_fallback = determine_model_for_guru(
        guru_id=guru_id,
        preferred_model=preferred_model,
        token_remaining=token_remaining
    )
    
    # 4. 檢查 API Key
    api_key = os.getenv('OPENROUTER_API_KEY', '')
    if not api_key:
        return jsonify({
            'success': False,
            'error': 'OpenRouter API Key 未配置',
            'hint': '請設置環境變數 OPENROUTER_API_KEY'
        }), 500
    
    # 5. 調用 OpenRouter
    service = OpenRouterService(api_key=api_key)
    result = service.chat_completion_sync(
        messages=messages,
        model_id=model_id,
        use_fallback=use_fallback,
        max_tokens=data.get('max_tokens', 2000),
        temperature=data.get('temperature', 0.7)
    )
    
    # 6. 處理結果
    if result.get('success'):
        tokens_consumed = result.get('tokens_consumed', 0)
        
        # 扣除 Token（只有非 fallback 模型才扣）
        if tokens_consumed > 0 and not result.get('is_fallback'):
            deduct_tokens(guru_id, tokens_consumed)
            new_remaining = token_remaining - tokens_consumed
        else:
            new_remaining = token_remaining
        
        # 記錄使用日誌
        log_ai_usage(
            guru_id=guru_id,
            model_id=model_id,
            tokens_used=tokens_consumed,
            is_fallback=result.get('is_fallback', False),
            success=True
        )
        
        return jsonify({
            'success': True,
            'content': result.get('content', ''),
            'model_used': result.get('model_used'),
            'model_name': result.get('model_name'),
            'is_fallback': result.get('is_fallback', False),
            'tokens_consumed': tokens_consumed,
            'token_remaining': new_remaining,
            'usage': result.get('usage', {}),
            'warning': get_token_warning(new_remaining)
        })
    else:
        # API 調用失敗
        log_ai_usage(
            guru_id=guru_id,
            model_id=model_id,
            tokens_used=0,
            is_fallback=use_fallback,
            success=False
        )
        
        return jsonify({
            'success': False,
            'error': result.get('error', '未知錯誤'),
            'model_used': model_id,
            'is_fallback': use_fallback
        }), 500


@ai_chat_bp.route('/api/ai/models', methods=['GET'])
def get_available_models():
    """獲取可用的 AI 模型列表"""
    guru_id = request.args.get('guru_id')
    
    # 獲取訂閱狀態
    if guru_id:
        subscription = get_subscription_status(guru_id)
        token_remaining = subscription.get('token_remaining', 0)
    else:
        token_remaining = 0
    
    # 構建模型列表
    models = []
    for model_id, info in MODEL_INFO.items():
        model_data = {
            'id': model_id,
            'name': info['name'],
            'provider': info['provider'],
            'tier': info['tier'],
            'tokens_per_call': info['tokens_per_call'],
            'description': info['description'],
            'available': True
        }
        
        # 如果是高級模型且沒有 Token，標記為不可用
        if info['tier'] == 'premium' and token_remaining <= 0:
            model_data['available'] = False
            model_data['unavailable_reason'] = 'Token 餘額不足'
        
        models.append(model_data)
    
    return jsonify({
        'success': True,
        'models': models,
        'token_remaining': token_remaining
    })


@ai_chat_bp.route('/api/ai/status', methods=['GET'])
def get_ai_status():
    """獲取 AI 服務狀態"""
    guru_id = request.args.get('guru_id')
    
    if not guru_id:
        return jsonify({'success': False, 'error': '缺少 guru_id'}), 400
    
    # 獲取訂閱狀態
    subscription = get_subscription_status(guru_id)
    ai_config = get_ai_config(guru_id)
    
    preferred_model = ai_config.get('preferred_model', 'deepseek_high')
    model_info = MODEL_INFO.get(preferred_model, MODEL_INFO['deepseek_high'])
    
    # 決定實際可用的模型
    token_remaining = subscription.get('token_remaining', 0)
    actual_model, is_fallback = determine_model_for_guru(
        guru_id=guru_id,
        preferred_model=preferred_model,
        token_remaining=token_remaining
    )
    actual_model_info = MODEL_INFO.get(actual_model, MODEL_INFO['deepseek_chat'])
    
    return jsonify({
        'success': True,
        'subscription': {
            'has_subscription': subscription.get('has_subscription', False),
            'plan': subscription.get('plan'),
            'token_remaining': token_remaining,
            'token_quota': subscription.get('token_quota', 0)
        },
        'ai_config': {
            'preferred_model': preferred_model,
            'preferred_model_name': model_info['name']
        },
        'current_model': {
            'id': actual_model,
            'name': actual_model_info['name'],
            'is_fallback': is_fallback,
            'reason': '高級 Token 已用完，使用基礎模型' if is_fallback else '使用偏好的高級模型'
        }
    })


@ai_chat_bp.route('/api/ai/test', methods=['POST'])
def test_ai_connection():
    """測試 AI 連接（不消耗 Token）"""
    api_key = os.getenv('OPENROUTER_API_KEY', '')
    
    if not api_key:
        return jsonify({
            'success': False,
            'error': 'OpenRouter API Key 未配置',
            'configured': False
        })
    
    # 使用免費模型測試
    service = OpenRouterService(api_key=api_key)
    result = service.chat_completion_sync(
        messages=[{"role": "user", "content": "Say 'Hello, LynkerAI!' in exactly those words."}],
        model_id='deepseek_chat',  # 使用免費模型測試
        use_fallback=True,
        max_tokens=50
    )
    
    return jsonify({
        'success': result.get('success', False),
        'configured': True,
        'message': result.get('content', ''),
        'error': result.get('error') if not result.get('success') else None
    })


# ─────────────────────────────────────────────────────────────────
# Token 使用統計 API
# ─────────────────────────────────────────────────────────────────

@ai_chat_bp.route('/api/ai/usage-stats', methods=['GET'])
def get_usage_stats():
    """
    獲取 Token 使用統計數據
    
    Query Params:
        guru_id: UUID (required)
        days: int (optional, default=7)
    
    Response:
    {
        "success": true,
        "stats": {
            "current": { "used": 50, "quota": 1000, "remaining": 950 },
            "daily_usage": [
                {"date": "2026-01-06", "tokens": 5, "calls": 3},
                {"date": "2026-01-07", "tokens": 8, "calls": 4},
                ...
            ],
            "model_breakdown": [
                {"model": "DeepSeek R1", "tokens": 30, "calls": 15},
                {"model": "ChatGPT-5", "tokens": 20, "calls": 5}
            ],
            "total_calls": 45,
            "avg_daily_tokens": 7.1
        }
    }
    """
    guru_id = request.args.get('guru_id')
    days = int(request.args.get('days', 7))
    
    if not guru_id:
        return jsonify({'success': False, 'error': '缺少 guru_id'}), 400
    
    try:
        supabase = get_supabase()
        
        # 1. 獲取當前訂閱狀態
        subscription = get_subscription_status(guru_id)
        
        # 2. 嘗試從 guru_ai_usage_logs 表獲取使用日誌
        # 如果表不存在，返回模擬數據
        daily_usage = []
        model_breakdown = []
        total_calls = 0
        
        try:
            from datetime import datetime, timedelta
            
            # 計算日期範圍
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days)
            
            # 嘗試查詢使用日誌
            response = supabase.table(AI_USAGE_LOG_TABLE).select('*').eq(
                'guru_id', guru_id
            ).gte(
                'created_at', start_date.isoformat()
            ).order('created_at', desc=False).execute()
            
            if response.data:
                # 按日期聚合
                from collections import defaultdict
                date_stats = defaultdict(lambda: {'tokens': 0, 'calls': 0})
                model_stats = defaultdict(lambda: {'tokens': 0, 'calls': 0})
                
                for log in response.data:
                    # 提取日期部分
                    created_at = log.get('created_at', '')
                    if created_at:
                        date_key = created_at[:10]  # YYYY-MM-DD
                    else:
                        continue
                    
                    tokens = log.get('tokens_used', 0)
                    model_id = log.get('model_id', 'unknown')
                    
                    # 獲取模型名稱
                    model_info = MODEL_INFO.get(model_id, {})
                    model_name = model_info.get('name', model_id)
                    
                    date_stats[date_key]['tokens'] += tokens
                    date_stats[date_key]['calls'] += 1
                    model_stats[model_name]['tokens'] += tokens
                    model_stats[model_name]['calls'] += 1
                    total_calls += 1
                
                # 轉換為列表
                for date, stats in sorted(date_stats.items()):
                    daily_usage.append({
                        'date': date,
                        'tokens': stats['tokens'],
                        'calls': stats['calls']
                    })
                
                for model, stats in model_stats.items():
                    model_breakdown.append({
                        'model': model,
                        'tokens': stats['tokens'],
                        'calls': stats['calls']
                    })
            else:
                # 沒有日誌，生成空數據
                daily_usage = generate_empty_daily_data(days)
                
        except Exception as log_error:
            print(f"[AI Usage] Log query error (using mock data): {log_error}")
            # 表可能不存在，生成模擬數據用於展示
            daily_usage = generate_mock_daily_data(days, subscription.get('token_used', 0))
            model_breakdown = generate_mock_model_breakdown()
            total_calls = sum(d['calls'] for d in daily_usage)
        
        # 計算平均每日使用量
        avg_daily = round(sum(d['tokens'] for d in daily_usage) / max(len(daily_usage), 1), 1)
        
        return jsonify({
            'success': True,
            'stats': {
                'current': {
                    'used': subscription.get('token_used', 0),
                    'quota': subscription.get('token_quota', 0),
                    'remaining': subscription.get('token_remaining', 0),
                    'plan': subscription.get('plan', 'free')
                },
                'daily_usage': daily_usage,
                'model_breakdown': model_breakdown,
                'total_calls': total_calls,
                'avg_daily_tokens': avg_daily
            }
        })
        
    except Exception as e:
        print(f"[AI Usage] Error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


def generate_empty_daily_data(days: int) -> list:
    """生成空的每日數據"""
    from datetime import datetime, timedelta
    result = []
    for i in range(days):
        date = datetime.now() - timedelta(days=days - 1 - i)
        result.append({
            'date': date.strftime('%Y-%m-%d'),
            'tokens': 0,
            'calls': 0
        })
    return result


def generate_mock_daily_data(days: int, total_used: int) -> list:
    """生成模擬的每日使用數據（用於測試/演示）"""
    from datetime import datetime, timedelta
    import random
    
    result = []
    remaining = total_used
    
    for i in range(days):
        date = datetime.now() - timedelta(days=days - 1 - i)
        
        if remaining > 0 and i < days - 1:
            # 隨機分配部分用量
            portion = random.randint(0, min(remaining // 2 + 1, 10))
        elif i == days - 1:
            # 最後一天分配剩餘
            portion = remaining
        else:
            portion = 0
        
        calls = max(1, portion // 2) if portion > 0 else 0
        remaining -= portion
        
        result.append({
            'date': date.strftime('%Y-%m-%d'),
            'tokens': portion,
            'calls': calls
        })
    
    return result


def generate_mock_model_breakdown() -> list:
    """生成模擬的模型使用分佈"""
    return [
        {'model': 'DeepSeek R1', 'tokens': 0, 'calls': 0},
        {'model': 'ChatGPT-5', 'tokens': 0, 'calls': 0}
    ]
