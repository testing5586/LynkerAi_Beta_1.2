# -*- coding: utf-8 -*-
"""
用户档案 API 路由
用于灵友圈展示真实用户数据
"""
from flask import Blueprint, request, jsonify
from supabase_init import init_supabase

user_profile_bp = Blueprint('user_profile', __name__)

# 初始化 Supabase 客户端
_supabase_client = None

def get_supabase():
    """获取Supabase客户端（懒加载，使用 service_role key 绕过 RLS）"""
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = init_supabase(use_service_role=True)
    return _supabase_client


@user_profile_bp.route('/api/users/profiles', methods=['GET'])
def api_get_user_profiles():
    """
    获取普通用户档案列表（用于灵友圈展示，公开访问）
    GET /api/users/profiles?limit=10&offset=0
    """
    try:
        # 获取分页参数
        limit = int(request.args.get('limit', 20))
        offset = int(request.args.get('offset', 0))
        
        # 限制最大返回数量
        if limit > 50:
            limit = 50
        
        supabase = get_supabase()
        if not supabase:
            return jsonify({"error": "database not available"}), 503
        
        # 查询 normal_user_profiles（使用 * 获取所有字段）
        # 注意：使用 id 排序而不是 created_at，因为该字段可能不存在
        result = supabase.table("normal_user_profiles") \
            .select("*") \
            .order("id", desc=True) \
            .range(offset, offset + limit - 1) \
            .execute()
        
        if hasattr(result, 'error') and result.error:
            print(f"[api/users/profiles] Supabase error: {result.error}")
            return jsonify({"error": str(result.error)}), 500
        
        profiles = result.data if hasattr(result, 'data') else []
        print(f"[api/users/profiles] Found {len(profiles)} profiles")
        
        # 如果有数据，打印第一个profile的字段
        if profiles:
            print(f"[api/users/profiles] Available fields: {list(profiles[0].keys())}")
        
        # 格式化返回数据
        formatted_profiles = []
        for profile in profiles:
            formatted_profiles.append({
                "id": profile.get("id"),
                "user_id": profile.get("user_id"),
                "pseudonym": profile.get("pseudonym") or "灵客用户",
                "avatar_url": profile.get("avatar_url") or "",
                "gender": profile.get("gender"),
                "blood_type": profile.get("blood_type"),
                "occupation": profile.get("occupation"),
                "bio": profile.get("bio") or "",
                "birth_date": profile.get("birth_date"),
                "birth_time": profile.get("birth_time"),
                "birth_location": profile.get("birth_location"),
                # 使用 id 作为时间戳的替代（因为 created_at 可能不存在）
                "created_at": profile.get("created_at") or profile.get("id")
            })
        
        print(f"[api/users/profiles] Returned {len(formatted_profiles)} profiles")
        return jsonify({
            "success": True,
            "profiles": formatted_profiles,
            "count": len(formatted_profiles)
        }), 200

    except Exception as e:
        print(f"[api/users/profiles] Error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "internal server error"}), 500
