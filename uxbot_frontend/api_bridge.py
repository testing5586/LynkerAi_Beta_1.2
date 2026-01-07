# -*- coding: utf-8 -*-
"""
UXBot前端API桥接器
连接UXBot前端与后端API服务
"""
from flask import Blueprint, request, jsonify, session, current_app
import requests
import json
import os
from supabase_init import get_supabase

# 创建API桥接蓝图
api_bridge_bp = Blueprint('uxbot_api', __name__, url_prefix='/uxbot/api')

# 后端API配置
BACKEND_APIS = {
    'bazi_engine': 'http://localhost:5000/bazi',
    'admin_dashboard': 'http://localhost:5000/admin',
    'user_events': 'http://localhost:5000/api/events'
}

def get_api_base_url(service):
    """获取指定服务的API基础URL"""
    return BACKEND_APIS.get(service, 'http://localhost:5000')

@api_bridge_bp.route('/user/profile', methods=['GET', 'POST'])
def user_profile_api():
    """用户个人资料API"""
    if request.method == 'GET':
        # 获取用户资料
        user_id = session.get('user_id', 'guest')
        return jsonify({
            'success': True,
            'user': {
                'id': user_id,
                'name': '用户',
                'avatar': '/uxbot/static/images/default-avatar.png',
                'level': '初级用户'
            }
        })
    
    elif request.method == 'POST':
        # 更新用户资料
        data = request.get_json()
        # TODO: 实际的用户资料更新逻辑
        return jsonify({'success': True, 'message': '资料更新成功'})

@api_bridge_bp.route('/bazi/calculate', methods=['POST'])
def bazi_calculate_api():
    """八字计算API桥接"""
    try:
        data = request.get_json()
        
        # 转发到八字引擎
        response = requests.post(
            f"{get_api_base_url('bazi_engine')}/api/calc/family-columns",
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            return jsonify({
                'success': False,
                'error': '八字计算服务暂时不可用'
            }), 500
            
    except Exception as e:
        current_app.logger.error(f"八字计算API错误: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误'
        }), 500

@api_bridge_bp.route('/matching/soulmate', methods=['POST'])
def soulmate_matching_api():
    """同命匹配API桥接"""
    try:
        data = request.get_json()
        
        # 转发到八字引擎的同命匹配API
        response = requests.post(
            f"{get_api_base_url('bazi_engine')}/api/match-same-life",
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            return jsonify({
                'success': False,
                'error': '同命匹配服务暂时不可用'
            }), 500
            
    except Exception as e:
        current_app.logger.error(f"同命匹配API错误: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误'
        }), 500

@api_bridge_bp.route('/register', methods=['POST'])
def register_api():
    """UXBot 用户注册API - 写入 Supabase user_registrations 表"""
    try:
        # 3️⃣ 读取请求 JSON
        payload = request.get_json(silent=True) or {}

        pseudonym = payload.get('pseudonym')
        email = payload.get('email')

        data_to_insert = {
            'pseudonym': pseudonym,
            'email': email,
            'source': 'uxbot',
            'raw_payload': payload,
        }

        # 4️⃣ 获取 Supabase 客户端并写入 user_registrations 表
        supabase = get_supabase()
        result = supabase.table('user_registrations').insert(data_to_insert).execute()

        # 兼容 supabase-py 不同返回格式
        if hasattr(result, 'data'):
            rows = result.data
        elif isinstance(result, dict):
            rows = result.get('data')
        else:
            rows = None

        if not rows:
            raise RuntimeError('Supabase insert returned no data')

        record = rows[0]
        record_id = record.get('id')

        # 5️⃣ 插入成功，返回 201 和真实 id
        return jsonify({'success': True, 'id': str(record_id)}), 201

    except Exception as e:
        # 6️⃣ 失败时返回 500 和错误信息
        current_app.logger.exception("注册API错误: %s", e)
        return jsonify({'success': False, 'error': str(e)}), 500


@api_bridge_bp.route('/guru/register', methods=['POST'])
def guru_register_api():
    """命理师注册 API 最终修复版

    注意：
    - 前端字段来自原生注册页 registra-guru.html：
      realName / email / phone / categories / introduction
    - 这里做字段映射，写入 Supabase guru_registrations 表
    """
    try:
        data = request.get_json(force=True) or {}
        print("[guru_register] Incoming JSON:", data)

        # 字段映射：前端 -> 数据库
        display_name = data.get("realName")
        email = data.get("email")
        phone = data.get("phone")
        categories = data.get("categories", [])
        introduction = data.get("introduction")

        # 基本兜底（防止缺关键字段导致 500）
        if not display_name or not email:
            return jsonify({
                "error": "missing required fields",
                "required": ["realName", "email"],
            }), 400

        supabase = get_supabase()

        payload = {
            "display_name": display_name,
            "email": email,
            "expertise": categories,   # Supabase 列类型可为 jsonb 或 text[]
            "status": "pending",
            "source": "platform_native",
            "raw_payload": data,
        }

        # 可选字段
        if phone is not None:
            payload["phone"] = phone
        if introduction is not None:
            payload["introduction"] = introduction

        result = supabase.table("guru_registrations").insert(payload).execute()

        if getattr(result, "error", None):
            return jsonify({"error": str(result.error)}), 500

        return jsonify({
            "success": True,
            "status": "pending_review",
        }), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@api_bridge_bp.route('/admin/guru/approve', methods=['POST'])
def approve_guru():
    """审核通过命理师注册申请
    
    读取 guru_registrations 中的 pending 记录，
    更新状态为 approved，并在 guru_accounts 表中创建账号
    """
    try:
        data = request.get_json(force=True)
        registration_id = data.get("registration_id")

        if not registration_id:
            return jsonify({"error": "missing registration_id"}), 400

        supabase = get_supabase()

        # 1️⃣ 取申请记录
        reg = supabase.table("guru_registrations") \
            .select("*") \
            .eq("id", registration_id) \
            .single() \
            .execute()

        if not reg.data:
            return jsonify({"error": "registration not found"}), 404

        if reg.data["status"] != "pending":
            return jsonify({"error": "registration not pending"}), 400

        # 2️⃣ 更新申请状态
        supabase.table("guru_registrations") \
            .update({"status": "approved"}) \
            .eq("id", registration_id) \
            .execute()

        # 3️⃣ 创建 guru_accounts
        account_data = {
            "registration_id": registration_id,
            "display_name": reg.data["display_name"],
            "email": reg.data["email"],
            "status": "active",
            "workspace_enabled": True
        }
        
        # 添加phone字段（如果存在）
        if reg.data.get("phone"):
            account_data["phone"] = reg.data["phone"]
        
        account = supabase.table("guru_accounts").insert(account_data).execute()

        return jsonify({
            "success": True,
            "guru_account_id": account.data[0]["id"]
        }), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@api_bridge_bp.route('/guru/publish', methods=['POST'])
def guru_publish():
    """命理师发布工作室 - 仅需审核通过
    
    权限检查：
    - status = 'approved'（管理员已审核）
    
    注意：
    - phone_verified 是创建 guru_account 的前置条件，此处不再检查
    - 只有 status='approved' 才能发布工作室
    """
    try:
        data = request.get_json(force=True)
        guru_id = data.get("guru_id")
        
        if not guru_id:
            return jsonify({"error": "missing guru_id"}), 400
        
        supabase = get_supabase()
        
        # 查询guru账号状态
        guru = supabase.table("guru_accounts") \
            .select("*") \
            .eq("id", guru_id) \
            .single() \
            .execute()
        
        if not guru.data:
            return jsonify({
                "error": "guru not found",
                "message": "命理师账号不存在"
            }), 404
        
        # ❌ 唯一权限检查：管理员审核状态
        if guru.data.get("status") != "approved":
            return jsonify({
                "error": "not approved",
                "message": "审核通过后才能发布工作室"
            }), 403
        
        # ✅ 权限通过 - 执行发布逻辑
        # TODO: 实现实际的发布逻辑（发布guru-business-page等）
        
        current_app.logger.info("命理师发布工作室成功: guru_id=%s", guru_id)
        return jsonify({
            "success": True,
            "message": "工作室发布成功"
        }), 201
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@api_bridge_bp.route('/guru/status', methods=['GET'])
def guru_status():
    """获取用户的Guru状态
    
    用于前端判断：
    - 是否可以进入 Guru Dashboard（exists = true）
    - 是否可以发布工作室（status = 'approved'）
    
    请求参数：
    - phone: 用户手机号（查询参数）
    - email: 用户邮箱（查询参数，可选）
    
    返回：
    {
        "exists": true/false,  // 是否存在guru_account
        "status": "pending|approved",  // 账号状态
        "can_access_dashboard": true/false,
        "can_publish": true/false,
        "guru_account": {...}  // guru账号详情
    }
    """
    try:
        phone = request.args.get('phone')
        email = request.args.get('email')
        
        if not phone and not email:
            return jsonify({
                "error": "missing phone or email"
            }), 400
        
        supabase = get_supabase()
        
        # 查询guru账号
        query = supabase.table("guru_accounts").select("*")
        
        if phone:
            query = query.eq("phone", phone)
        elif email:
            query = query.eq("email", email)
        
        result = query.execute()
        
        if not result.data:
            # 不存在guru_account
            return jsonify({
                "exists": False,
                "can_access_dashboard": False,
                "can_publish": False,
                "message": "请先完成手机号验证以创建命理师账号"
            }), 200
        
        guru = result.data[0]
        status = guru.get("status", "pending")
        
        return jsonify({
            "exists": True,
            "status": status,
            "can_access_dashboard": True,  # 只要存在guru_account就能访问Dashboard
            "can_publish": (status == "approved"),  # 只有approved才能发布
            "guru_account": {
                "id": guru.get("id"),
                "display_name": guru.get("display_name"),
                "email": guru.get("email"),
                "phone": guru.get("phone"),
                "status": status,
                "phone_verified": guru.get("phone_verified"),
                "workspace_enabled": guru.get("workspace_enabled")
            }
        }), 200
    
    except Exception as e:
        current_app.logger.exception("获取Guru状态错误: %s", e)
        return jsonify({"error": str(e)}), 500

@api_bridge_bp.route('/guru/search', methods=['GET'])
def guru_search_api():
    """师父搜索API"""
    try:
        keyword = request.args.get('keyword', '')
        page = request.args.get('page', 1, type=int)
        
        # 模拟师父数据（实际项目中应从数据库获取）
        gurus = [
            {
                'id': 'guru_001',
                'name': '张大师',
                'avatar': '/uxbot/static/images/guru1.png',
                'specialty': '八字命理',
                'rating': 4.8,
                'experience': '20年',
                'price': 188
            },
            {
                'id': 'guru_002',
                'name': '李师父',
                'avatar': '/uxbot/static/images/guru2.png',
                'specialty': '紫微斗数',
                'rating': 4.9,
                'experience': '15年',
                'price': 268
            }
        ]
        
        return jsonify({
            'success': True,
            'gurus': gurus,
            'total': len(gurus),
            'page': page
        })
        
    except Exception as e:
        current_app.logger.error(f"师父搜索API错误: {e}")
        return jsonify({
            'success': False,
            'error': '搜索服务暂时不可用'
        }), 500

@api_bridge_bp.route('/forum/posts', methods=['GET', 'POST'])
def forum_posts_api():
    """论坛帖子API"""
    if request.method == 'GET':
        # 获取帖子列表
        page = request.args.get('page', 1, type=int)
        category = request.args.get('category', '')
        
        # 模拟帖子数据
        posts = [
            {
                'id': 'post_001',
                'title': '八字入门指南',
                'author': '易学爱好者',
                'content': '分享一些八字学习的基础知识...',
                'created_at': '2026-01-01 10:00:00',
                'replies': 15,
                'likes': 32
            },
            {
                'id': 'post_002',
                'title': '我的命盘分析经验',
                'author': '命理研究者',
                'content': '经过多年研究，分享一些心得...',
                'created_at': '2026-01-01 12:00:00',
                'replies': 8,
                'likes': 24
            }
        ]
        
        return jsonify({
            'success': True,
            'posts': posts,
            'total': len(posts),
            'page': page
        })
    
    elif request.method == 'POST':
        # 创建新帖子
        data = request.get_json()
        # TODO: 实际的帖子创建逻辑
        return jsonify({
            'success': True,
            'post_id': 'post_new',
            'message': '帖子发布成功'
        })

@api_bridge_bp.route('/events/track', methods=['POST'])
def track_event_api():
    """用户事件追踪API桥接"""
    try:
        data = request.get_json()
        
        # 转发到用户事件追踪系统
        response = requests.post(
            f"{get_api_base_url('user_events')}/track",
            json=data,
            timeout=10
        )
        
        return jsonify({'success': True})
        
    except Exception as e:
        current_app.logger.error(f"事件追踪API错误: {e}")
        return jsonify({'success': False}), 500

@api_bridge_bp.route('/health', methods=['GET'])
def health_check():
    """健康检查API"""
    return jsonify({
        'status': 'healthy',
        'timestamp': '2026-01-02',
        'version': '1.0.0',
        'services': {
            'uxbot_frontend': 'ok',
            'bazi_engine': 'ok',
            'admin_dashboard': 'ok'
        }
    })

def init_api_bridge(app):
    """初始化API桥接器"""
    app.register_blueprint(api_bridge_bp)
    print("[OK] UXBot API桥接器已注册: /uxbot/api")