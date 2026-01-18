"""
Avatar Upload Routes
处理用户头像上传到 Supabase Storage
"""
from flask import Blueprint, request, jsonify
from supabase import create_client
import os
from datetime import datetime
import uuid

avatar_bp = Blueprint('avatar', __name__)

# Supabase 配置
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# 延迟初始化 supabase 客户端
def get_supabase():
    """获取 Supabase 客户端实例"""
    # For server-side uploads/writes we should use service_role to bypass RLS.
    key = SUPABASE_SERVICE_ROLE_KEY or SUPABASE_KEY
    if not SUPABASE_URL or not key:
        raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY) must be set in environment")
    return create_client(SUPABASE_URL, key)

# 允许的图片类型
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'gif'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@avatar_bp.route('/api/user/avatar/upload', methods=['POST'])
def upload_avatar():
    """
    上传用户头像到 Supabase Storage
    
    Request:
        - file: 图片文件 (multipart/form-data)
        - user_id: 用户ID (form data)
    
    Response:
        {
            "success": true,
            "avatar_url": "https://xxx.supabase.co/storage/v1/object/public/user-avatars/user_id/avatar.jpg",
            "message": "头像上传成功"
        }
    """
    try:
        # 检查是否有文件
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': '没有上传文件'
            }), 400
        
        file = request.files['file']
        user_id = request.form.get('user_id')
        
        if not user_id:
            return jsonify({
                'success': False,
                'error': '缺少 user_id 参数'
            }), 400
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': '文件名为空'
            }), 400
        
        # 检查文件类型
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': f'不支持的文件类型，只允许: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        # 检查文件大小
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({
                'success': False,
                'error': f'文件太大，最大允许 {MAX_FILE_SIZE / 1024 / 1024}MB'
            }), 400
        
        # 读取文件内容
        file_content = file.read()
        
        # 生成文件名（使用原始扩展名）
        ext = file.filename.rsplit('.', 1)[1].lower()
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        filename = f"{user_id}/avatar_{timestamp}.{ext}"
        
        print(f"[Avatar] Uploading avatar for user {user_id}: {filename}")
        
        # 上传到 Supabase Storage
        supabase = get_supabase()
        response = supabase.storage.from_('user-avatars').upload(
            path=filename,
            file=file_content,
            file_options={
                "content-type": file.content_type,
                "upsert": "true"  # 允许覆盖已存在的文件（必须是字符串）
            }
        )
        
        print(f"[Avatar] Upload response: {response}")
        
        # 构建公开 URL
        avatar_url = f"{SUPABASE_URL}/storage/v1/object/public/user-avatars/{filename}"
        
        # 更新用户资料表中的 avatar_url
        try:
            # 先检查 normal_user_profiles 是否有记录
            existing = get_supabase().table('normal_user_profiles').select('user_id').eq('user_id', user_id).execute()
            
            if existing.data and len(existing.data) > 0:
                # 更新现有记录
                get_supabase().table('normal_user_profiles').update({
                    'avatar_url': avatar_url,
                    'updated_at': datetime.utcnow().isoformat()
                }).eq('user_id', user_id).execute()
            else:
                # 创建新记录
                get_supabase().table('normal_user_profiles').insert({
                    'user_id': user_id,
                    'avatar_url': avatar_url
                }).execute()
            
            print(f"[Avatar] Updated database with avatar URL: {avatar_url}")
        except Exception as db_error:
            print(f"[Avatar] Warning: Could not update database: {db_error}")
            # 即使数据库更新失败，仍返回成功（文件已上传）
        
        return jsonify({
            'success': True,
            'avatar_url': avatar_url,
            'message': '头像上传成功'
        }), 200
        
    except Exception as e:
        # Normalize common Supabase errors so frontend can show a clearer message.
        status = 500
        msg = str(e)
        if isinstance(e, dict):
            status_code = e.get('statusCode')
            if status_code in (401, 403):
                status = 403
            msg = e.get('message') or msg
        print(f"[Avatar] Upload error: {msg}")
        return jsonify({
            'success': False,
            'error': f'上传失败: {msg}'
        }), status

@avatar_bp.route('/api/user/avatar/delete', methods=['POST'])
def delete_avatar():
    """
    删除用户头像
    
    Request:
        {
            "user_id": "xxx",
            "avatar_url": "https://..."  # 可选，用于删除特定文件
        }
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        avatar_url = data.get('avatar_url')
        
        if not user_id:
            return jsonify({
                'success': False,
                'error': '缺少 user_id 参数'
            }), 400
        
        # 如果提供了 avatar_url，从中提取文件路径
        if avatar_url:
            # 从 URL 中提取路径: https://xxx.supabase.co/storage/v1/object/public/user-avatars/user_id/avatar.jpg
            # -> user_id/avatar.jpg
            path_parts = avatar_url.split('/user-avatars/')
            if len(path_parts) > 1:
                file_path = path_parts[1]
            else:
                return jsonify({
                    'success': False,
                    'error': 'Invalid avatar_url'
                }), 400
        else:
            # 删除该用户的所有头像文件
            file_path = f"{user_id}/"
        
        # 从 Supabase Storage 删除
        get_supabase().storage.from_('user-avatars').remove([file_path])
        
        # 清空数据库中的 avatar_url
        get_supabase().table('normal_user_profiles').update({
            'avatar_url': None,
            'updated_at': datetime.utcnow().isoformat()
        }).eq('user_id', user_id).execute()
        
        return jsonify({
            'success': True,
            'message': '头像已删除'
        }), 200
        
    except Exception as e:
        print(f"[Avatar] Delete error: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'删除失败: {str(e)}'
        }), 500
