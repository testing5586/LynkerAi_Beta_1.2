# -*- coding: utf-8 -*-
"""
OTP验证路由 - Twilio手机验证
用于命理师（Guru）电话验证
"""
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
import random
import os
from supabase_init import get_supabase

# 创建OTP蓝图
otp_bp = Blueprint('otp', __name__, url_prefix='/uxbot/api/otp')

def generate_otp():
    """生成6位随机OTP码"""
    return str(random.randint(100000, 999999))

@otp_bp.route('/send', methods=['POST'])
def send_otp():
    """发送OTP验证码到手机
    
    请求体:
    {
        "phone": "+1234567890"
    }
    """
    try:
        data = request.get_json(force=True)
        phone = data.get("phone")

        if not phone:
            return jsonify({"error": "missing phone"}), 400

        # 标准化手机号：移除空格、破折号等
        phone = phone.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
        current_app.logger.info("标准化后的手机号: %s", phone)

        # 生成OTP
        otp = generate_otp()
        expires_at = datetime.utcnow() + timedelta(minutes=5)

        # 保存到数据库
        supabase = get_supabase()
        supabase.table("phone_otp_verifications").insert({
            "phone": phone,
            "otp_code": otp,
            "expires_at": expires_at.isoformat()
        }).execute()

        # 发送短信 - 直接使用Twilio REST API（不依赖SDK）
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_phone = os.getenv("TWILIO_FROM_PHONE")

        if not all([account_sid, auth_token, from_phone]) or account_sid.startswith('ACxxx'):
            # Twilio未配置，使用测试模式
            current_app.logger.warning("Twilio未配置，测试模式：OTP码=%s", otp)
            return jsonify({
                "success": True,
                "test_mode": True,
                "otp_code": otp
            }), 200

        # 使用HTTP直接调用Twilio API（避免SDK安装问题）
        try:
            import requests
            from requests.auth import HTTPBasicAuth
            
            url = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json"
            
            data = {
                'From': from_phone,
                'To': phone,
                'Body': f"【灵客AI】您的验证码是 {otp}，5分钟内有效。"
            }
            
            current_app.logger.info("准备发送SMS - From: %s, To: %s, OTP: %s", from_phone, phone, otp)
            
            response = requests.post(
                url,
                data=data,
                auth=HTTPBasicAuth(account_sid, auth_token)
            )
            
            current_app.logger.info("Twilio响应状态码: %d", response.status_code)
            
            if response.status_code == 201:
                result = response.json()
                current_app.logger.info("OTP已发送到 %s, SID: %s", phone, result.get('sid'))
                return jsonify({"success": True}), 200
            else:
                error_data = response.json()
                error_msg = error_data.get('message', '未知错误')
                error_code = error_data.get('code')
                current_app.logger.error("Twilio发送失败 [%d] Code: %s, Message: %s", 
                                        response.status_code, error_code, error_msg)
                # 返回测试模式，显示OTP码
                return jsonify({
                    "success": True,
                    "test_mode": True,
                    "otp_code": otp,
                    "error": f"SMS发送失败 (Code {error_code}): {error_msg}"
                }), 200
                
        except Exception as e:
            current_app.logger.error("发送SMS异常: %s", e)
            return jsonify({
                "success": True,
                "test_mode": True,
                "otp_code": otp,
                "error": str(e)
            }), 200

    except Exception as e:
        current_app.logger.exception("发送OTP错误: %s", e)
        return jsonify({"error": str(e)}), 500


@otp_bp.route('/verify', methods=['POST'])
def verify_otp():
    """验证OTP码并创建guru_account
    
    请求体:
    {
        "phone": "+1234567890",
        "otp": "123456",
        "email": "guru@example.com",  // 可选，用于创建guru_account
        "display_name": "张大师"  // 可选，用于创建guru_account
    }
    
    核心逻辑：
    1. 验证OTP是否有效
    2. 标记OTP为已验证
    3. 检查是否存在guru_account（幂等）
    4. 若不存在，创建guru_account (status='pending', phone_verified=true)
    """
    try:
        data = request.get_json(force=True)
        phone = data.get("phone")
        otp = data.get("otp")
        email = data.get("email")  # 可选，优先从guru_registrations查找
        display_name = data.get("display_name")  # 可选

        if not phone or not otp:
            return jsonify({"error": "missing phone or otp"}), 400

        # 标准化手机号
        phone = phone.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
        current_app.logger.info("验证OTP - 标准化后的手机号: %s", phone)

        supabase = get_supabase()

        # 1️⃣ 查找有效的OTP记录
        record = supabase.table("phone_otp_verifications") \
            .select("*") \
            .eq("phone", phone) \
            .eq("verified", False) \
            .gt("expires_at", datetime.utcnow().isoformat()) \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()

        if not record.data:
            return jsonify({"error": "otp expired or invalid"}), 400

        if record.data[0]["otp_code"] != otp:
            return jsonify({"error": "otp incorrect"}), 400

        # 2️⃣ 标记OTP为已验证
        supabase.table("phone_otp_verifications") \
            .update({"verified": True}) \
            .eq("id", record.data[0]["id"]) \
            .execute()

        # 3️⃣ 检查是否已存在guru_account（幂等检查）
        existing_account = supabase.table("guru_accounts") \
            .select("*") \
            .eq("phone", phone) \
            .execute()

        if existing_account.data:
            # 已存在账号，更新phone_verified状态（如果未设置）
            if not existing_account.data[0].get("phone_verified"):
                supabase.table("guru_accounts") \
                    .update({
                        "phone_verified": True,
                        "phone_verified_at": datetime.utcnow().isoformat()
                    }) \
                    .eq("id", existing_account.data[0]["id"]) \
                    .execute()
            
            current_app.logger.info("手机验证成功（账号已存在）: %s", phone)
            return jsonify({
                "success": True,
                "guru_account_id": existing_account.data[0]["id"],
                "status": existing_account.data[0].get("status", "pending")
            }), 200

        # 4️⃣ 不存在guru_account，尝试从guru_registrations获取信息并创建
        registration = supabase.table("guru_registrations") \
            .select("*") \
            .eq("phone", phone) \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()

        # 从registration或请求参数获取信息
        if registration.data:
            email = email or registration.data[0].get("email")
            display_name = display_name or registration.data[0].get("display_name")
            registration_id = registration.data[0].get("id")
        else:
            registration_id = None

        # 创建guru_account
        account_data = {
            "phone": phone,
            "phone_verified": True,
            "phone_verified_at": datetime.utcnow().isoformat(),
            "status": "pending",
            "workspace_enabled": True
        }

        # 添加可选字段
        if email:
            account_data["email"] = email
        if display_name:
            account_data["display_name"] = display_name
        if registration_id:
            account_data["registration_id"] = registration_id

        new_account = supabase.table("guru_accounts").insert(account_data).execute()

        if not new_account.data:
            raise RuntimeError("创建guru_account失败")

        current_app.logger.info("手机验证成功，guru_account已创建: %s", phone)
        return jsonify({
            "success": True,
            "guru_account_id": new_account.data[0]["id"],
            "status": "pending",
            "message": "验证成功，命理师账号已创建，等待审核通过后可发布工作室"
        }), 201

    except Exception as e:
        current_app.logger.exception("验证OTP错误: %s", e)
        return jsonify({"error": str(e)}), 500
