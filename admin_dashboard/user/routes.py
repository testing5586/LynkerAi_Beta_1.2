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
    
    # Safety check: if profile is None even for normal_user (data inconsistency), provide a fallback
    if profile is None:
        profile = {
            'pseudonym': current_user.first_name or current_user.email.split('@')[0],
            'gender': '',
            'birth_date': '',
            'preferred_provider': 'LocalMock'
        }

    # 准备用户数据传递到前端
    created_at_str = None
    if current_user.created_at:
        if hasattr(current_user.created_at, 'isoformat'):
            created_at_str = current_user.created_at.isoformat()
        else:
            created_at_str = str(current_user.created_at)

    user_data = {
        'nickname': current_user.first_name or current_user.email.split('@')[0],
        'email': current_user.email,
        'user_type': user_type,
        'created_at': created_at_str
    }
    
    return render_template('user/home.html', profile=profile, user_data=user_data)
