"""
普通用户路由
"""
from flask import Blueprint, render_template, redirect, jsonify
from flask_login import login_required, current_user

user_bp = Blueprint('user', __name__, url_prefix='/user')


@user_bp.route('/home')
@login_required
def home():
    """普通用户主页"""
    # 检查是否已创建档案
    user_type = current_user.user_type or 'new_user'
    if user_type == 'new_user':
        return redirect('/user-register')
    
    # 获取用户档案
    profile = current_user.profile
    
    # 准备用户数据传递到前端
    # created_at 可能已经是字符串（从数据库返回），需要处理
    created_at = current_user.created_at
    if created_at:
        created_at = created_at.isoformat() if hasattr(created_at, 'isoformat') else str(created_at)
    
    user_data = {
        'nickname': current_user.first_name or current_user.email.split('@')[0],
        'email': current_user.email,
        'user_type': user_type,
        'created_at': created_at
    }
    
    return render_template('user/home.html', profile=profile, user_data=user_data)
