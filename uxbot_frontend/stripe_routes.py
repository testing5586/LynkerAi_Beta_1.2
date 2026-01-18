"""
Stripe Payment Integration Routes
Stripe 支付整合 API

使用 Stripe Checkout Session 實現安全的支付流程
"""

from flask import Blueprint, request, jsonify, url_for
from datetime import datetime, timedelta
import os
import json
import stripe
from supabase import create_client, Client

stripe_bp = Blueprint('stripe', __name__)

# ─────────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────────

# Stripe API Keys (從環境變量讀取)
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', '')
STRIPE_PUBLISHABLE_KEY = os.getenv('STRIPE_PUBLISHABLE_KEY', '')
STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET', '')

# Set Stripe API key
stripe.api_key = STRIPE_SECRET_KEY

# Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_KEY", ""))

# App URL for callbacks
APP_URL = os.getenv('APP_URL', 'http://localhost:8080')

# ─────────────────────────────────────────────────────────────────
# Subscription Plans Configuration (與 subscription_routes.py 保持一致)
# ─────────────────────────────────────────────────────────────────
STRIPE_PLANS = {
    'pro': {
        'name': '灵客AI 專業版',
        'description': '1000 AI Token 配額，每月自動續訂',
        'price_cents': 2000,  # $20.00 USD
        'token_quota': 1000,
        'period_days': 30,
        'currency': 'usd'
    }
}

def get_supabase() -> Client:
    """Get Supabase client instance"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)

# ─────────────────────────────────────────────────────────────────
# Get Stripe Publishable Key (前端需要)
# ─────────────────────────────────────────────────────────────────
@stripe_bp.route('/api/stripe/config', methods=['GET'])
def get_stripe_config():
    """
    Return Stripe publishable key for frontend
    返回 Stripe 公開密鑰供前端使用
    """
    if not STRIPE_PUBLISHABLE_KEY:
        return jsonify({
            'success': False,
            'error': 'Stripe not configured'
        }), 500
    
    return jsonify({
        'success': True,
        'publishableKey': STRIPE_PUBLISHABLE_KEY,
        'plans': {
            plan_id: {
                'name': plan['name'],
                'price': plan['price_cents'] / 100,
                'currency': plan['currency'],
                'description': plan['description']
            }
            for plan_id, plan in STRIPE_PLANS.items()
        }
    })

# ─────────────────────────────────────────────────────────────────
# Create Stripe Checkout Session
# ─────────────────────────────────────────────────────────────────
@stripe_bp.route('/api/stripe/create-checkout-session', methods=['POST'])
def create_checkout_session():
    """
    Create a Stripe Checkout Session for subscription payment
    創建 Stripe Checkout Session 用於訂閱支付
    
    Request Body:
    {
        "guru_id": "xxx-xxx-xxx",
        "plan": "pro"
    }
    """
    try:
        # Validate Stripe configuration
        if not STRIPE_SECRET_KEY:
            print("[Stripe] ERROR: STRIPE_SECRET_KEY not configured")
            return jsonify({
                'success': False,
                'error': 'Stripe 未配置，請聯繫管理員'
            }), 500
        
        data = request.get_json()
        guru_id = data.get('guru_id')
        plan = data.get('plan', 'pro')
        is_user_payment = data.get('is_user_payment', False)  # Check if this is user payment
        
        if not guru_id:
            return jsonify({
                'success': False,
                'error': 'guru_id is required'
            }), 400
        
        if plan not in STRIPE_PLANS:
            return jsonify({
                'success': False,
                'error': f'Invalid plan: {plan}'
            }), 400
        
        plan_config = STRIPE_PLANS[plan]
        
        # Determine success/cancel URLs based on payment type
        if is_user_payment:
            success_url = f"{APP_URL}/uxbot/user-payment-success.html?session_id={{CHECKOUT_SESSION_ID}}&user_id={guru_id}&plan={plan}"
            cancel_url = f"{APP_URL}/uxbot/user-payment.html?user_id={guru_id}&plan={plan}&canceled=true"
            print(f"[Stripe] Creating checkout session for USER user_id={guru_id}, plan={plan}")
        else:
            success_url = f"{APP_URL}/uxbot/guru-payment-success.html?session_id={{CHECKOUT_SESSION_ID}}&guru_id={guru_id}&plan={plan}"
            cancel_url = f"{APP_URL}/uxbot/guru-payment.html?guru_id={guru_id}&plan={plan}&canceled=true"
            print(f"[Stripe] Creating checkout session for GURU guru_id={guru_id}, plan={plan}")
        
        # Prepare metadata based on payment type
        metadata = {
            'plan': plan,
            'is_user_payment': str(is_user_payment)
        }
        if is_user_payment:
            metadata['user_id'] = guru_id  # For user payment, store as user_id
        else:
            metadata['guru_id'] = guru_id  # For guru payment, store as guru_id
        
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': plan_config['currency'],
                    'product_data': {
                        'name': plan_config['name'],
                        'description': plan_config['description'],
                    },
                    'unit_amount': plan_config['price_cents'],
                },
                'quantity': 1,
            }],
            mode='payment',  # 使用 'payment' 模式進行一次性付款
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata,
            client_reference_id=guru_id
        )
        
        print(f"[Stripe] Checkout session created: {checkout_session.id}")
        
        return jsonify({
            'success': True,
            'sessionId': checkout_session.id,
            'url': checkout_session.url
        })
        
    except stripe.error.StripeError as e:
        print(f"[Stripe] Stripe error: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Stripe 錯誤: {str(e)}'
        }), 400
        
    except Exception as e:
        print(f"[Stripe] Unexpected error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ─────────────────────────────────────────────────────────────────
# Verify Checkout Session and Activate Subscription
# ─────────────────────────────────────────────────────────────────
@stripe_bp.route('/api/stripe/verify-session', methods=['POST'])
def verify_session():
    """
    Verify a completed Stripe Checkout Session and activate subscription
    驗證已完成的 Stripe Checkout Session 並激活訂閱
    
    Request Body:
    {
        "session_id": "cs_xxx",
        "guru_id": "xxx",  # for guru payment
        "user_id": "xxx",  # for user payment
        "plan": "pro",
        "is_user_payment": false  # true for user payment
    }
    """
    try:
        data = request.get_json()
        session_id = data.get('session_id')
        guru_id = data.get('guru_id')
        user_id = data.get('user_id')
        plan = data.get('plan', 'pro')
        is_user_payment = data.get('is_user_payment', False)
        
        # Determine which ID to use
        entity_id = user_id if is_user_payment else guru_id
        id_field = 'user_id' if is_user_payment else 'guru_id'
        table_name = 'user_subscriptions' if is_user_payment else 'guru_subscriptions'
        quota_table = 'user_api_quotas' if is_user_payment else 'guru_api_quotas'
        
        if not session_id:
            return jsonify({
                'success': False,
                'error': 'session_id is required'
            }), 400
        
        if not entity_id:
            return jsonify({
                'success': False,
                'error': f'{id_field} is required'
            }), 400
        
        # Retrieve the session from Stripe
        print(f"[Stripe] Verifying session: {session_id}")
        session = stripe.checkout.Session.retrieve(session_id)
        
        # Verify payment status
        if session.payment_status != 'paid':
            print(f"[Stripe] Payment not completed: {session.payment_status}")
            return jsonify({
                'success': False,
                'error': '支付未完成',
                'payment_status': session.payment_status
            }), 400
        
        # Verify ID matches (check both guru_id and user_id in metadata for compatibility)
        metadata_id = session.metadata.get('user_id') if is_user_payment else session.metadata.get('guru_id')
        if metadata_id != entity_id:
            print(f"[Stripe] {id_field} mismatch: expected {metadata_id}, got {entity_id}")
            return jsonify({
                'success': False,
                'error': '驗證失敗'
            }), 400
        
        # Activate subscription
        print(f"[Stripe] Payment verified, activating subscription for {id_field}={entity_id}")
        
        plan_config = STRIPE_PLANS.get(plan, STRIPE_PLANS['pro'])
        supabase = get_supabase()
        
        # Calculate period dates
        period_start = datetime.utcnow()
        period_end = period_start + timedelta(days=plan_config['period_days'])
        
        # Check if subscription already exists
        existing = supabase.table(table_name).select('*').eq(id_field, entity_id).execute()
        
        if existing.data and len(existing.data) > 0:
            # Update existing subscription
            result = supabase.table(table_name).update({
                'plan': plan,
                'token_quota': plan_config['token_quota'],
                'token_used': 0,
                'period_start': period_start.isoformat(),
                'period_end': period_end.isoformat(),
                'status': 'active',
                'stripe_session_id': session_id,
                'stripe_payment_id': session.payment_intent,
                'updated_at': datetime.utcnow().isoformat()
            }).eq(id_field, entity_id).execute()
        else:
            # Create new subscription
            subscription_data = {
                id_field: entity_id,
                'plan': plan,
                'token_quota': plan_config['token_quota'],
                'token_used': 0,
                'period_start': period_start.isoformat(),
                'period_end': period_end.isoformat(),
                'status': 'active',
                'stripe_session_id': session_id,
                'stripe_payment_id': session.payment_intent
            }
            result = supabase.table(table_name).insert(subscription_data).execute()
        
        # Also update quota table
        try:
            existing_quota = supabase.table(quota_table).select('*').eq(id_field, entity_id).execute()
            
            if existing_quota.data and len(existing_quota.data) > 0:
                supabase.table(quota_table).update({
                    'plan': plan,
                    'token_quota': plan_config['token_quota'],
                    'token_used': 0,
                    'updated_at': datetime.utcnow().isoformat()
                }).eq(id_field, entity_id).execute()
            else:
                quota_data = {
                    id_field: entity_id,
                    'plan': plan,
                    'token_quota': plan_config['token_quota'],
                    'token_used': 0
                }
                supabase.table(quota_table).insert(quota_data).execute()
        except Exception as quota_error:
            print(f"[Stripe] Warning: Could not update {quota_table}: {quota_error}")
        
        print(f"[Stripe] Subscription activated successfully for {id_field}={entity_id}")
        
        return jsonify({
            'success': True,
            'message': '訂閱已成功激活',
            'data': {
                id_field: entity_id,
                'plan': plan,
                'token_quota': plan_config['token_quota'],
                'period_end': period_end.isoformat()
            }
        })
        
    except stripe.error.StripeError as e:
        print(f"[Stripe] Stripe error during verification: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Stripe 驗證錯誤: {str(e)}'
        }), 400
        
    except Exception as e:
        print(f"[Stripe] Unexpected error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ─────────────────────────────────────────────────────────────────
# Stripe Webhook Handler
# ─────────────────────────────────────────────────────────────────
@stripe_bp.route('/api/stripe/webhook', methods=['POST'])
def stripe_webhook():
    """
    Handle Stripe webhook events
    處理 Stripe Webhook 事件
    
    這個端點由 Stripe 自動調用，用於處理支付完成、失敗等事件
    """
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    print(f"[Stripe Webhook] Received webhook request")
    print(f"[Stripe Webhook] Signature header present: {sig_header is not None}")
    
    event = None
    
    # Try to verify signature if webhook secret is set
    if STRIPE_WEBHOOK_SECRET and STRIPE_WEBHOOK_SECRET.startswith('whsec_'):
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, STRIPE_WEBHOOK_SECRET
            )
            print(f"[Stripe Webhook] Signature verified successfully")
        except ValueError as e:
            print(f"[Stripe Webhook] Invalid payload: {str(e)}")
            # Fall back to parsing without verification
            event = None
        except stripe.error.SignatureVerificationError as e:
            print(f"[Stripe Webhook] Signature verification failed: {str(e)}")
            # Fall back to parsing without verification for local development
            event = None
    
    # If signature verification failed or not configured, parse JSON directly
    if event is None:
        try:
            event = json.loads(payload)
            print(f"[Stripe Webhook] Parsed event without signature verification (dev mode)")
        except json.JSONDecodeError as e:
            print(f"[Stripe Webhook] Invalid JSON: {str(e)}")
            return jsonify({'error': 'Invalid JSON'}), 400
    
    event_type = event.get('type', '')
    print(f"[Stripe Webhook] Received event: {event_type}")
    
    # Handle the event
    if event_type == 'checkout.session.completed':
        session = event['data']['object']
        guru_id = session.get('metadata', {}).get('guru_id')
        plan = session.get('metadata', {}).get('plan', 'pro')
        
        if guru_id and session.get('payment_status') == 'paid':
            print(f"[Stripe Webhook] Payment completed for guru_id={guru_id}, plan={plan}")
            # Note: Subscription is already activated in verify-session
            # This is a backup mechanism
            
    elif event_type == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print(f"[Stripe Webhook] Payment intent succeeded: {payment_intent.get('id')}")
        
    elif event_type == 'payment_intent.payment_failed':
        payment_intent = event['data']['object']
        error = payment_intent.get('last_payment_error', {}).get('message', 'Unknown error')
        print(f"[Stripe Webhook] Payment failed: {error}")
    
    return jsonify({'received': True})

# ─────────────────────────────────────────────────────────────────
# Get Payment History
# ─────────────────────────────────────────────────────────────────
@stripe_bp.route('/api/stripe/payment-history/<guru_id>', methods=['GET'])
def get_payment_history(guru_id):
    """
    Get payment history for a guru
    獲取 guru 的支付歷史
    """
    try:
        supabase = get_supabase()
        
        # Get subscription with payment info
        result = supabase.table('guru_subscriptions').select(
            'plan, token_quota, period_start, period_end, status, stripe_payment_id, created_at, updated_at'
        ).eq('guru_id', guru_id).execute()
        
        if not result.data:
            return jsonify({
                'success': True,
                'history': []
            })
        
        return jsonify({
            'success': True,
            'history': result.data
        })
        
    except Exception as e:
        print(f"[Stripe] Error fetching payment history: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
