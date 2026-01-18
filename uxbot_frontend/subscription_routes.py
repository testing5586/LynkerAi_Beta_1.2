"""
Subscription and Token Management API Routes
訂閱和 Token 配額管理 API
"""

from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import uuid
import os
from supabase import create_client, Client

subscription_bp = Blueprint('subscription', __name__)

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_KEY", ""))

def get_supabase() -> Client:
    """Get Supabase client instance"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)

# ─────────────────────────────────────────────────────────────────
# Subscription Plans Configuration
# ─────────────────────────────────────────────────────────────────
SUBSCRIPTION_PLANS = {
    'free': {
        'token_quota': 100,
        'period_days': 30,
        'price': 0,
        'features': ['basic_ai', 'knowledge_base', 'limited_video']
    },
    'pro': {
        'token_quota': 1000,
        'period_days': 30,
        'price': 20,
        'features': ['premium_ai', 'unlimited_knowledge', 'unlimited_video', 'priority_support']
    }
}

# ─────────────────────────────────────────────────────────────────
# Create Subscription (after successful payment)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/subscription/create', methods=['POST'])
def create_subscription():
    """
    Create a new subscription after successful payment
    創建訂閱（支付成功後調用）
    """
    try:
        data = request.get_json()
        guru_id = data.get('guru_id')
        plan = data.get('plan', 'free')
        payment_method = data.get('payment_method')
        
        if not guru_id:
            return jsonify({'success': False, 'error': 'guru_id is required'}), 400
        
        if plan not in SUBSCRIPTION_PLANS:
            return jsonify({'success': False, 'error': 'Invalid plan'}), 400
        
        plan_config = SUBSCRIPTION_PLANS[plan]
        supabase = get_supabase()
        
        # Calculate period dates
        period_start = datetime.utcnow()
        period_end = period_start + timedelta(days=plan_config['period_days'])
        
        # Check if subscription already exists
        existing = supabase.table('guru_subscriptions').select('*').eq('guru_id', guru_id).execute()
        
        if existing.data and len(existing.data) > 0:
            # Update existing subscription
            result = supabase.table('guru_subscriptions').update({
                'plan': plan,
                'token_quota': plan_config['token_quota'],
                'token_used': 0,
                'period_start': period_start.isoformat(),
                'period_end': period_end.isoformat(),
                'status': 'active',
                'updated_at': datetime.utcnow().isoformat()
            }).eq('guru_id', guru_id).execute()
        else:
            # Create new subscription
            result = supabase.table('guru_subscriptions').insert({
                'guru_id': guru_id,
                'plan': plan,
                'token_quota': plan_config['token_quota'],
                'token_used': 0,
                'period_start': period_start.isoformat(),
                'period_end': period_end.isoformat(),
                'status': 'active'
            }).execute()
        
        # Also update guru_api_quotas table (wrapped in try-catch for FK issues)
        try:
            existing_quota = supabase.table('guru_api_quotas').select('*').eq('guru_id', guru_id).execute()
            
            if existing_quota.data and len(existing_quota.data) > 0:
                supabase.table('guru_api_quotas').update({
                    'plan': plan,
                    'monthly_quota': plan_config['token_quota'],
                    'used_quota': 0,
                    'reset_at': period_end.isoformat()
                }).eq('guru_id', guru_id).execute()
            else:
                supabase.table('guru_api_quotas').insert({
                    'guru_id': guru_id,
                    'plan': plan,
                    'monthly_quota': plan_config['token_quota'],
                    'used_quota': 0,
                    'reset_at': period_end.isoformat()
                }).execute()
        except Exception as e:
            # guru_api_quotas may have FK constraint, skip if fails
            print(f"Warning: Could not update guru_api_quotas: {e}")
        
        # Initialize AI config with default model
        try:
            existing_config = supabase.table('guru_ai_config').select('*').eq('guru_id', guru_id).execute()
            
            if not existing_config.data or len(existing_config.data) == 0:
                supabase.table('guru_ai_config').insert({
                    'guru_id': guru_id,
                    'preferred_model': 'deepseek_high'  # Default model
                }).execute()
        except Exception as e:
            print(f"Warning: Could not initialize guru_ai_config: {e}")
        
        return jsonify({
            'success': True,
            'data': {
                'guru_id': guru_id,
                'plan': plan,
                'token_quota': plan_config['token_quota'],
                'token_used': 0,
                'period_start': period_start.isoformat(),
                'period_end': period_end.isoformat(),
                'status': 'active'
            }
        })
        
    except Exception as e:
        print(f"Error creating subscription: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ─────────────────────────────────────────────────────────────────
# Get Subscription Status
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/subscription/<guru_id>', methods=['GET'])
def get_subscription(guru_id):
    """
    Get subscription status for a guru
    獲取訂閱狀態
    """
    try:
        supabase = get_supabase()
        
        result = supabase.table('guru_subscriptions').select('*').eq('guru_id', guru_id).execute()
        
        if not result.data or len(result.data) == 0:
            # Return default free tier info
            return jsonify({
                'success': True,
                'data': {
                    'guru_id': guru_id,
                    'plan': 'free',
                    'token_quota': 100,
                    'token_used': 0,
                    'token_remaining': 100,
                    'status': 'none',
                    'has_subscription': False
                }
            })
        
        sub = result.data[0]
        token_remaining = sub.get('token_quota', 0) - sub.get('token_used', 0)
        
        return jsonify({
            'success': True,
            'data': {
                'guru_id': guru_id,
                'plan': sub.get('plan'),
                'token_quota': sub.get('token_quota'),
                'token_used': sub.get('token_used'),
                'token_remaining': max(0, token_remaining),
                'period_start': sub.get('period_start'),
                'period_end': sub.get('period_end'),
                'status': sub.get('status'),
                'has_subscription': True
            }
        })
        
    except Exception as e:
        print(f"Error getting subscription: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ─────────────────────────────────────────────────────────────────
# Get User Subscription Status (Normal Users)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/user/subscription/<user_id>', methods=['GET'])
def get_user_subscription(user_id):
    """
    Get subscription/token status for a normal user.

    Notes:
    - This project currently has a guru_subscriptions table.
    - For normal users, we try a best-effort lookup in a user_subscriptions table
      (if it exists). If not found / table not present, we return a safe default
      free tier response.
    """
    try:
        supabase = get_supabase()

        # Best-effort: try to read from a dedicated user_subscriptions table.
        # If your Supabase schema does not have this table yet, this will raise
        # and we will fall back to default free tier.
        try:
            result = supabase.table('user_subscriptions').select('*').eq('user_id', user_id).execute()
        except Exception as _e:
            result = None

        if not result or not result.data or len(result.data) == 0:
            return jsonify({
                'success': True,
                'data': {
                    'user_id': user_id,
                    'plan': 'free',
                    'token_quota': 100,
                    'token_used': 0,
                    'token_remaining': 100,
                    'status': 'none',
                    'has_subscription': False
                }
            })

        sub = result.data[0]
        token_remaining = sub.get('token_quota', 0) - sub.get('token_used', 0)

        return jsonify({
            'success': True,
            'data': {
                'user_id': user_id,
                'plan': sub.get('plan', 'free'),
                'token_quota': sub.get('token_quota', 100),
                'token_used': sub.get('token_used', 0),
                'token_remaining': max(0, token_remaining),
                'period_start': sub.get('period_start'),
                'period_end': sub.get('period_end'),
                'status': sub.get('status', 'active'),
                'has_subscription': True
            }
        })

    except Exception as e:
        print(f"Error getting user subscription: {e}")
        # Fail closed with a default free tier response rather than a hard 500
        return jsonify({
            'success': True,
            'data': {
                'user_id': user_id,
                'plan': 'free',
                'token_quota': 100,
                'token_used': 0,
                'token_remaining': 100,
                'status': 'none',
                'has_subscription': False
            }
        })


# ─────────────────────────────────────────────────────────────────
# Use Token (called when AI is used)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/subscription/use-token', methods=['POST'])
def use_token():
    """
    Deduct tokens when AI is used
    使用 Token（每次 AI 調用時扣除）
    """
    try:
        data = request.get_json()
        guru_id = data.get('guru_id')
        tokens_used = data.get('tokens', 1)
        
        if not guru_id:
            return jsonify({'success': False, 'error': 'guru_id is required'}), 400
        
        supabase = get_supabase()
        
        # Get current active subscription only
        result = supabase.table('guru_subscriptions').select('*').eq('guru_id', guru_id).eq('status', 'active').limit(1).execute()
        
        if not result.data or len(result.data) == 0:
            return jsonify({
                'success': True,
                'data': {
                    'token_remaining': 0,
                    'use_fallback': True,
                    'message': 'No subscription, using fallback model'
                }
            })
        
        sub = result.data[0]
        current_used = sub.get('token_used', 0)
        quota = sub.get('token_quota', 0)
        remaining = quota - current_used
        
        if remaining <= 0:
            return jsonify({
                'success': True,
                'data': {
                    'token_remaining': 0,
                    'use_fallback': True,
                    'message': 'Token quota exhausted, using fallback model'
                }
            })
        
        # Deduct tokens
        new_used = current_used + tokens_used
        supabase.table('guru_subscriptions').update({
            'token_used': new_used,
            'updated_at': datetime.utcnow().isoformat()
        }).eq('guru_id', guru_id).execute()
        
        # Also update guru_api_quotas
        supabase.table('guru_api_quotas').update({
            'used_quota': new_used
        }).eq('guru_id', guru_id).execute()
        
        new_remaining = quota - new_used
        
        return jsonify({
            'success': True,
            'data': {
                'tokens_deducted': tokens_used,
                'token_used': new_used,
                'token_remaining': max(0, new_remaining),
                'use_fallback': new_remaining <= 0
            }
        })
        
    except Exception as e:
        print(f"Error using token: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ─────────────────────────────────────────────────────────────────
# Get AI Config (preferred model)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/ai-config/<guru_id>', methods=['GET'])
def get_ai_config(guru_id):
    """
    Get AI configuration for a guru
    獲取 AI 配置（偏好模型）
    """
    try:
        supabase = get_supabase()
        
        result = supabase.table('guru_ai_config').select('*').eq('guru_id', guru_id).execute()
        
        if not result.data or len(result.data) == 0:
            return jsonify({
                'success': True,
                'data': {
                    'guru_id': guru_id,
                    'preferred_model': 'deepseek_high',
                    'has_config': False
                }
            })
        
        config = result.data[0]
        
        return jsonify({
            'success': True,
            'data': {
                'guru_id': guru_id,
                'preferred_model': config.get('preferred_model', 'deepseek_high'),
                'has_config': True
            }
        })
        
    except Exception as e:
        print(f"Error getting AI config: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ─────────────────────────────────────────────────────────────────
# Update AI Config (change preferred model)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/ai-config/update', methods=['POST'])
def update_ai_config():
    """
    Update AI configuration (change preferred model)
    更新 AI 配置（更改偏好模型）
    """
    try:
        data = request.get_json()
        guru_id = data.get('guru_id')
        preferred_model = data.get('preferred_model')
        
        if not guru_id:
            return jsonify({'success': False, 'error': 'guru_id is required'}), 400
        
        # Valid models
        valid_models = ['chatgpt5', 'gemini3', 'deepseek_high', 'qwen_plus']
        if preferred_model not in valid_models:
            return jsonify({'success': False, 'error': f'Invalid model. Must be one of: {valid_models}'}), 400
        
        supabase = get_supabase()
        
        # Check if config exists
        existing = supabase.table('guru_ai_config').select('*').eq('guru_id', guru_id).execute()
        
        if existing.data and len(existing.data) > 0:
            # Update existing config
            result = supabase.table('guru_ai_config').update({
                'preferred_model': preferred_model,
                'updated_at': datetime.utcnow().isoformat()
            }).eq('guru_id', guru_id).execute()
        else:
            # Create new config
            result = supabase.table('guru_ai_config').insert({
                'guru_id': guru_id,
                'preferred_model': preferred_model
            }).execute()
        
        return jsonify({
            'success': True,
            'data': {
                'guru_id': guru_id,
                'preferred_model': preferred_model
            }
        })
        
    except Exception as e:
        print(f"Error updating AI config: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ─────────────────────────────────────────────────────────────────
# Get Available Models (for frontend dropdown)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/ai-models', methods=['GET'])
def get_available_models():
    """
    Get list of available AI models for selection
    獲取可用的 AI 模型列表（用於前端下拉選擇）
    """
    models = {
        'premium': [
            {'id': 'chatgpt5', 'name': 'ChatGPT-5', 'provider': 'OpenAI', 'description': '最新 GPT-5 模型，強大的推理能力'},
            {'id': 'gemini3', 'name': 'Gemini 3', 'provider': 'Google', 'description': 'Google 最新多模態 AI'},
            {'id': 'deepseek_high', 'name': 'DeepSeek R1', 'provider': 'DeepSeek', 'description': '深度推理模型，擅長複雜分析'},
            {'id': 'qwen_plus', 'name': 'Qwen Max', 'provider': 'Alibaba', 'description': '通義千問旗艦版'}
        ],
        'fallback': [
            {'id': 'deepseek_chat', 'name': 'DeepSeek Chat', 'provider': 'DeepSeek', 'description': '基礎對話模型'},
            {'id': 'qwen_turbo', 'name': 'Qwen Turbo', 'provider': 'Alibaba', 'description': '快速響應模型'}
        ]
    }
    
    return jsonify({
        'success': True,
        'data': models
    })


# ─────────────────────────────────────────────────────────────────
# Reset Token (for testing only)
# ─────────────────────────────────────────────────────────────────
@subscription_bp.route('/api/subscription/reset-token', methods=['POST'])
def reset_token():
    """
    Reset token usage to 0 (FOR TESTING ONLY)
    重置 Token 使用量（僅供測試）
    """
    data = request.get_json()
    guru_id = data.get('guru_id')
    
    if not guru_id:
        return jsonify({'success': False, 'error': 'guru_id is required'}), 400
    
    try:
        supabase = get_supabase()
        
        # Reset token_used to 0
        supabase.table('guru_subscriptions').update({
            'token_used': 0,
            'updated_at': datetime.utcnow().isoformat()
        }).eq('guru_id', guru_id).execute()
        
        # Also update guru_api_quotas
        try:
            supabase.table('guru_api_quotas').update({
                'used_quota': 0
            }).eq('guru_id', guru_id).execute()
        except:
            pass
        
        return jsonify({
            'success': True,
            'message': 'Token usage reset to 0'
        })
        
    except Exception as e:
        print(f"Error resetting token: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
