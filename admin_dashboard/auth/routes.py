"""
认证路由：注册、登录、登出
整合 LynkerAi Registration 用户系统
"""
from flask import Blueprint, request, jsonify, render_template, redirect, url_for, flash, session
from flask_login import login_user, logout_user, login_required, current_user
from email_validator import validate_email, EmailNotValidError
from models.user import (
    create_user,
    get_user_by_email,
    verify_password,
    validate_pseudonym,
    create_normal_user_profile,
    create_guru_profile
)

auth_bp = Blueprint('auth', __name__)


# ==================== 页面路由 ====================

@auth_bp.route('/login', methods=['GET'])
def login_page():
    """登录页面"""
    if current_user.is_authenticated:
        # 根据用户类型重定向
        if current_user.user_type == 'guru':
            return redirect(url_for('guru.dashboard'))
        elif current_user.user_type == 'normal_user':
            return redirect(url_for('user.home'))
        else:
            return redirect(url_for('auth.choose_user_type'))
    
    return render_template('auth/login.html')


@auth_bp.route('/register', methods=['GET'])
def register_page():
    """注册页面（选择用户类型）"""
    if current_user.is_authenticated:
        return redirect(url_for('auth.choose_user_type'))
    
    return render_template('auth/register.html')


@auth_bp.route('/choose-type', methods=['GET'])
@login_required
def choose_user_type():
    """选择用户类型（普通用户或命理师）"""
    # 如果已经选择过类型，跳转到对应页面
    if current_user.user_type == 'guru':
        return redirect('/guru/dashboard')
    elif current_user.user_type == 'normal_user':
        return redirect('/user/home')
    
    return render_template('auth/choose_type.html')


@auth_bp.route('/user-register', methods=['GET'])
@login_required
def user_register_page():
    """普通用户档案注册页面"""
    # 如果已有档案，跳转到主页
    if current_user.user_type == 'normal_user':
        return redirect('/user/home')
    
    # 获取用户昵称（从first_name字段）
    nickname = current_user.first_name or current_user.email.split('@')[0]
    
    # 准备用户数据传递到前端
    user_data = {
        'nickname': nickname,
        'email': current_user.email,
        'user_type': current_user.user_type,
        'created_at': current_user.created_at if current_user.created_at else None
    }
    
    return render_template('auth/user_register.html', nickname=nickname, user_data=user_data)


@auth_bp.route('/guru-register', methods=['GET'])
@login_required
def guru_register_page():
    """命理师档案注册页面"""
    # 如果已有档案，跳转到仪表盘
    if current_user.user_type == 'guru':
        return redirect('/guru/dashboard')
    
    return render_template('auth/guru_register.html')


@auth_bp.route('/guru-register-direct', methods=['GET'])
def guru_register_direct_page():
    """命理师一站式注册页面（无需登录）"""
    # 如果已登录且已是guru，跳转到仪表盘
    if current_user.is_authenticated and current_user.user_type == 'guru':
        return redirect('/guru/dashboard')
    
    return render_template('auth/guru_register.html', is_direct_register=True)


# ==================== API 路由 ====================

@auth_bp.route('/api/guru-register-direct', methods=['POST'])
def api_guru_register_direct():
    """
    命理师一站式注册 API（创建账号 + 档案）
    POST /api/guru-register-direct
    Body: { 
        email, password, displayName, realName, phoneNumber,
        bio, specializations, yearsOfExperience, certification, avatarUrl
    }
    """
    try:
        data = request.json
        email = data.get('email', '').strip()
        password = data.get('password', '')
        display_name = data.get('displayName', '').strip()
        real_name = data.get('realName', '').strip()
        phone_number = data.get('phoneNumber', '').strip()
        bio = data.get('bio', '').strip()
        specializations = data.get('specializations', [])
        
        # ===== 第一步：验证输入 =====
        if not email or not password:
            return jsonify({'error': '邮箱和密码不能为空'}), 400
        
        # 验证邮箱格式
        try:
            validate_email(email)
        except EmailNotValidError as e:
            return jsonify({'error': f'邮箱格式无效: {str(e)}'}), 400
        
        # 验证密码强度
        if len(password) < 6:
            return jsonify({'error': '密码至少需要 6 个字符'}), 400
        
        # 检查邮箱是否已存在
        existing_user = get_user_by_email(email)
        if existing_user:
            return jsonify({'error': '该邮箱已被注册'}), 409
        
        # 验证命理师必填字段
        if not display_name:
            return jsonify({'error': '展示名称不能为空'}), 400
        
        if len(display_name) < 2:
            return jsonify({'error': '展示名称至少需要2个字符'}), 400
        
        if not real_name:
            return jsonify({'error': '真实姓名不能为空（用于身份认证）'}), 400
        
        if not phone_number:
            return jsonify({'error': '手机号码不能为空'}), 400
        
        if not bio:
            return jsonify({'error': '个人简介不能为空'}), 400
        
        if not specializations or len(specializations) == 0:
            return jsonify({'error': '请至少选择一项专长'}), 400
        
        # ===== 第二步：创建用户账号 =====
        user = create_user(email, password, display_name, None)
        if not user:
            return jsonify({'error': '创建用户失败'}), 500
        
        # ===== 第三步：创建命理师档案 =====
        profile = create_guru_profile(
            user_id=user.id,
            pseudonym=display_name,
            bio=bio,
            specializations=specializations,
            region=data.get('region'),
            nationality=data.get('nationality'),
            ai_provider=data.get('aiProvider', 'LocalMock'),
            ai_tone=data.get('aiTone', 'professional'),
            avatar_url=data.get('avatarUrl'),
            display_name=display_name,
            real_name=real_name,
            phone_number=phone_number,
            years_of_experience=data.get('yearsOfExperience'),
            certification=data.get('certification')
        )
        
        if not profile:
            return jsonify({'error': '创建命理师档案失败'}), 500
        
        # ===== 第四步：自动登录 =====
        login_user(user, remember=True)
        
        return jsonify({
            'success': True,
            'message': '命理师注册成功！欢迎加入 LynkerAI',
            'user': {
                'id': user.id,
                'email': user.email,
                'displayName': display_name
            },
            'redirectTo': '/guru/dashboard'
        }), 201
        
    except Exception as e:
        print(f"[Auth] 命理师一站式注册失败: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'注册失败: {str(e)}'}), 500


@auth_bp.route('/api/register', methods=['POST'])
def api_register():
    """
    注册新用户
    POST /api/register
    Body: { email, password, nickname? }
    """
    try:
        data = request.json
        email = data.get('email', '').strip()
        password = data.get('password', '')
        nickname = data.get('nickname', '').strip()
        
        # 验证输入
        if not email or not password:
            return jsonify({'error': '邮箱和密码不能为空'}), 400
        
        # 验证邮箱格式
        try:
            validate_email(email)
        except EmailNotValidError as e:
            return jsonify({'error': f'邮箱格式无效: {str(e)}'}), 400
        
        # 验证密码强度
        if len(password) < 6:
            return jsonify({'error': '密码至少需要 6 个字符'}), 400
        
        # 检查邮箱是否已存在
        existing_user = get_user_by_email(email)
        if existing_user:
            return jsonify({'error': '该邮箱已被注册'}), 409
        
        # 创建用户 (使用nickname作为first_name)
        user = create_user(email, password, nickname, None)
        if not user:
            return jsonify({'error': '创建用户失败'}), 500
        
        # 自动登录
        login_user(user)
        
        return jsonify({
            'success': True,
            'message': '注册成功！',
            'user': {
                'id': user.id,
                'email': user.email,
                'firstName': user.first_name,
                'lastName': user.last_name
            }
        }), 201
        
    except Exception as e:
        print(f"[Auth] 注册失败: {e}")
        return jsonify({'error': '注册失败，请稍后重试'}), 500


@auth_bp.route('/api/login', methods=['POST'])
def api_login():
    """
    用户登录
    POST /api/login
    Body: { email, password }
    """
    try:
        data = request.json
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'error': '邮箱和密码不能为空'}), 400
        
        # 查找用户
        user = get_user_by_email(email)
        if not user:
            return jsonify({'error': '邮箱或密码错误'}), 401
        
        # 验证密码
        if not verify_password(user, password):
            return jsonify({'error': '邮箱或密码错误'}), 401
        
        # 登录用户
        login_user(user, remember=True)
        
        return jsonify({
            'success': True,
            'message': '登录成功！',
            'user': {
                'id': user.id,
                'email': user.email,
                'firstName': user.first_name,
                'lastName': user.last_name,
                'userType': user.user_type
            },
            'redirectTo': _get_redirect_url(user)
        }), 200
        
    except Exception as e:
        print(f"[Auth] 登录失败: {e}")
        return jsonify({'error': '登录失败，请稍后重试'}), 500


@auth_bp.route('/api/logout', methods=['POST'])
@login_required
def api_logout():
    """
    用户登出
    POST /api/logout
    """
    from flask import make_response
    
    logout_user()
    session.clear()
    
    # 创建响应
    response = make_response(jsonify({'success': True, 'message': '登出成功'}), 200)
    
    # 明确删除所有相关的 cookies
    response.set_cookie('session', '', expires=0, path='/')
    response.set_cookie('remember_token', '', expires=0, path='/')
    
    return response


@auth_bp.route('/api/user', methods=['GET'])
@login_required
def api_get_current_user():
    """
    获取当前登录用户信息
    GET /api/user
    """
    try:
        profile = current_user.profile
        
        return jsonify({
            'id': current_user.id,
            'email': current_user.email,
            'firstName': current_user.first_name,
            'lastName': current_user.last_name,
            'profileImageUrl': current_user.profile_image_url,
            'userType': current_user.user_type,
            'profile': profile
        }), 200
    except Exception as e:
        print(f"[Auth] 获取用户信息失败: {e}")
        return jsonify({'error': '获取用户信息失败'}), 500


# ==================== 普通用户档案 API ====================

@auth_bp.route('/api/user/normal-profile', methods=['POST'])
@login_required
def api_create_normal_profile():
    """
    创建普通用户档案
    POST /api/user/normal-profile
    Body: { gender?, birthDate?, preferredProvider? }
    Note: pseudonym已在注册时保存在first_name字段
    """
    try:
        data = request.json
        
        # 使用注册时的昵称（从first_name字段获取）
        pseudonym = current_user.first_name or current_user.email.split('@')[0]
        
        # 验证灵性假名（从用户数据获取）
        is_valid, error_msg = validate_pseudonym(pseudonym)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
        
        # 创建档案
        profile = create_normal_user_profile(
            user_id=current_user.id,
            pseudonym=pseudonym,
            gender=data.get('gender'),
            birth_date=data.get('birthDate'),
            birth_time=data.get('birthTime'),
            birth_location=data.get('birthLocation'),
            preferred_provider=data.get('preferredProvider', 'LocalMock'),
            preferred_language=data.get('preferredLanguage', 'zh'),
            avatar_url=data.get('avatarUrl')
        )
        
        if not profile:
            return jsonify({'error': '创建档案失败（可能已存在）'}), 409
        
        return jsonify({
            'success': True,
            'message': '欢迎加入 LynkerAI！',
            'profile': profile
        }), 201
        
    except Exception as e:
        print(f"[Auth] 创建普通用户档案失败: {e}")
        return jsonify({'error': '创建档案失败'}), 500


# ==================== 命理师档案 API ====================

@auth_bp.route('/api/guru/profile', methods=['POST'])
@login_required
def api_create_guru_profile():
    """
    创建命理师档案
    POST /api/guru/profile
    Body: { 
        displayName, realName, phoneNumber, bio, specializations,
        region, nationality, aiProvider, aiTone, yearsOfExperience, certification
    }
    """
    try:
        data = request.json
        display_name = data.get('displayName', '').strip()
        real_name = data.get('realName', '').strip()
        phone_number = data.get('phoneNumber', '').strip()
        bio = data.get('bio', '').strip()
        specializations = data.get('specializations', [])
        
        # 验证必填字段
        if not display_name:
            return jsonify({'error': '展示名称不能为空'}), 400
        
        if len(display_name) < 2:
            return jsonify({'error': '展示名称至少需要2个字符'}), 400
        
        # 命理师真名制度：真实姓名和手机号必填
        if not real_name:
            return jsonify({'error': '真实姓名不能为空（用于身份认证）'}), 400
        
        if not phone_number:
            return jsonify({'error': '手机号码不能为空'}), 400
        
        if not bio:
            return jsonify({'error': '个人简介不能为空'}), 400
        
        if not specializations or len(specializations) == 0:
            return jsonify({'error': '请至少选择一项专长'}), 400
        
        # 创建档案
        profile = create_guru_profile(
            user_id=current_user.id,
            pseudonym=display_name,  # 使用展示名称作为主要名称
            bio=bio,
            specializations=specializations,
            region=data.get('region'),
            nationality=data.get('nationality'),
            ai_provider=data.get('aiProvider', 'LocalMock'),
            ai_tone=data.get('aiTone', 'professional'),
            avatar_url=data.get('avatarUrl'),
            display_name=display_name,  # 展示名称
            real_name=real_name,  # 真实姓名（认证用）
            phone_number=phone_number,  # 手机号码
            years_of_experience=data.get('yearsOfExperience'),  # 从业年限
            certification=data.get('certification')  # 资质认证
        )
        
        if not profile:
            return jsonify({'error': '创建档案失败（可能已存在）'}), 409
        
        return jsonify({
            'success': True,
            'message': '命理师档案创建成功！',
            'profile': profile
        }), 201
        
    except Exception as e:
        print(f"[Auth] 创建命理师档案失败: {e}")
        return jsonify({'error': '创建档案失败'}), 500


# ==================== 辅助函数 ====================

def _get_redirect_url(user):
    """根据用户类型返回重定向 URL"""
    if user.user_type == 'guru':
        return '/guru/dashboard'
    elif user.user_type == 'normal_user':
        return '/user/home'
    else:
        return '/choose-type'
