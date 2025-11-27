"""
用户模型和数据库操作
迁移至 Supabase - 不再使用 Neon PostgreSQL
使用 BIGSERIAL 自增ID（不再使用UUID）
"""
import os
from flask_login import UserMixin
from flask_bcrypt import Bcrypt
from datetime import datetime
from supabase import create_client, Client

bcrypt = Bcrypt()

def get_supabase_client() -> Client:
    """获取 Supabase 客户端"""
    url = os.environ.get('SUPABASE_URL')
    key = os.environ.get('SUPABASE_KEY')
    
    if not url or not key:
        raise ValueError("❌ 缺少 SUPABASE_URL 或 SUPABASE_KEY 环境变量")
    
    return create_client(url, key)


class User(UserMixin):
    """
    Flask-Login 用户类
    兼容现有 users 表结构
    """
    def __init__(self, user_data):
        self.id = str(user_data.get('id'))  # UUID
        self.name = user_data.get('name')
        self.email = user_data.get('email')
        self.first_name = user_data.get('first_name')
        self.last_name = user_data.get('last_name')
        self.profile_image_url = user_data.get('profile_image_url')
        self._is_active = user_data.get('is_active', True)
        self.created_at = user_data.get('created_at')
        
        # 用户类型缓存
        self._user_type = None
    
    def get_id(self):
        """Flask-Login 需要的方法"""
        return self.id
    
    @property
    def is_active(self):
        """Flask-Login 需要的属性"""
        return self._is_active
    
    @property
    def user_type(self):
        """获取用户类型（guru 或 normal_user）"""
        if self._user_type is None:
            self._user_type = get_user_type(self.id)
        return self._user_type
    
    @property
    def profile(self):
        """获取用户档案（根据类型返回不同的档案）"""
        if self.user_type == 'guru':
            return get_guru_profile(self.id)
        elif self.user_type == 'normal_user':
            return get_normal_user_profile(self.id)
        return None


# ==================== 用户 CRUD 操作 ====================

def create_user(email, password, first_name=None, last_name=None):
    """
    创建新用户
    Args:
        email: 邮箱
        password: 明文密码
        first_name: 名字（可选）
        last_name: 姓氏（可选）
    Returns:
        User 对象或 None
    """
    try:
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
        supabase = get_supabase_client()
        
        # 创建用户记录（ID 由数据库 BIGSERIAL 自动生成）
        response = supabase.table('users').insert({
            'email': email,
            'password_hash': password_hash,
            'first_name': first_name,
            'last_name': last_name,
            'name': email,
            'is_active': True
        }).execute()
        
        if response.data and len(response.data) > 0:
            return User(response.data[0])
        return None
    except Exception as e:
        error_msg = str(e)
        if 'duplicate key' in error_msg.lower() or 'unique' in error_msg.lower():
            print(f"[User] 创建用户失败（邮箱已存在）: {e}")
        else:
            print(f"[User] 创建用户失败: {e}")
        return None


def get_user_by_id(user_id):
    """通过 ID 获取用户"""
    try:
        supabase = get_supabase_client()
        
        response = supabase.table('users')\
            .select('*')\
            .eq('id', user_id)\
            .execute()
        
        if response.data and len(response.data) > 0:
            return User(response.data[0])
        return None
    except Exception as e:
        print(f"[User] 获取用户失败: {e}")
        return None


def get_user_by_email(email):
    """通过邮箱获取用户"""
    try:
        supabase = get_supabase_client()
        
        response = supabase.table('users')\
            .select('*')\
            .eq('email', email)\
            .execute()
        
        if response.data and len(response.data) > 0:
            return User(response.data[0])
        return None
    except Exception as e:
        print(f"[User] 获取用户失败: {e}")
        return None


def verify_password(user, password):
    """
    验证密码
    Args:
        user: User 对象
        password: 明文密码
    Returns:
        bool
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table('users')\
            .select('password_hash')\
            .eq('id', user.id)\
            .execute()
        
        if response.data and len(response.data) > 0:
            password_hash = response.data[0].get('password_hash')
            if password_hash:
                return bcrypt.check_password_hash(password_hash, password)
        return False
    except Exception as e:
        print(f"[User] 验证密码失败: {e}")
        return False


def get_user_type(user_id):
    """
    判断用户类型
    Returns:
        'guru' | 'normal_user' | 'new_user'
    """
    try:
        supabase = get_supabase_client()
        
        # 检查是否是命理师
        guru_response = supabase.table('guru_profiles')\
            .select('id')\
            .eq('user_id', user_id)\
            .execute()
        
        if guru_response.data and len(guru_response.data) > 0:
            return 'guru'
        
        # 检查是否是普通用户
        normal_response = supabase.table('normal_user_profiles')\
            .select('id')\
            .eq('user_id', user_id)\
            .execute()
        
        if normal_response.data and len(normal_response.data) > 0:
            return 'normal_user'
        
        return 'new_user'
    except Exception as e:
        print(f"[User] 获取用户类型失败: {e}")
        return 'new_user'


# ==================== 普通用户档案 CRUD ====================

def create_normal_user_profile(user_id, pseudonym, **kwargs):
    """
    创建普通用户档案
    Args:
        user_id: 用户 ID（BIGINT）
        pseudonym: 灵性假名（必填）
        **kwargs: 可选字段（gender, birth_date, preferred_provider 等）
    Returns:
        dict 档案数据或 None
    """
    try:
        supabase = get_supabase_client()
        
        profile_data = {
            'user_id': user_id,
            'pseudonym': pseudonym,
            'gender': kwargs.get('gender'),
            'birth_date': kwargs.get('birth_date'),
            'birth_time': kwargs.get('birth_time'),
            'birth_location': kwargs.get('birth_location'),
            'preferred_provider': kwargs.get('preferred_provider', 'LocalMock'),
            'preferred_language': kwargs.get('preferred_language', 'zh'),
            'avatar_url': kwargs.get('avatar_url')
        }
        
        response = supabase.table('normal_user_profiles').insert(profile_data).execute()
        
        if response.data and len(response.data) > 0:
            print(f"[NormalProfile] 创建成功: {pseudonym} (user_id: {user_id})")
            return response.data[0]
        return None
    except Exception as e:
        error_msg = str(e)
        if 'duplicate key' in error_msg.lower() or 'unique' in error_msg.lower():
            print(f"[NormalProfile] 用户档案已存在")
        else:
            print(f"[NormalProfile] 创建失败: {e}")
        return None


def get_normal_user_profile(user_id):
    """获取普通用户档案"""
    try:
        supabase = get_supabase_client()
        
        response = supabase.table('normal_user_profiles')\
            .select('*')\
            .eq('user_id', user_id)\
            .execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        print(f"[NormalProfile] 获取失败: {e}")
        return None


# ==================== 命理师档案 CRUD ====================

def create_guru_profile(user_id, pseudonym, bio, specializations, **kwargs):
    """
    创建命理师档案
    Args:
        user_id: 用户 ID（BIGINT）
        pseudonym: 灵性假名 (展示名称)
        bio: 个人简介
        specializations: 专长列表 ['bazi', 'ziwei', 'iching', 'tarot']
        **kwargs: 可选字段 (real_name, phone_number, display_name, years_of_experience, certification)
    Returns:
        dict 档案数据或 None
    """
    try:
        supabase = get_supabase_client()
        
        profile_data = {
            'user_id': user_id,
            'pseudonym': pseudonym,
            'bio': bio,
            'specializations': specializations,
            'region': kwargs.get('region'),
            'nationality': kwargs.get('nationality'),
            'ai_provider': kwargs.get('ai_provider', 'LocalMock'),
            'ai_tone': kwargs.get('ai_tone', 'professional'),
            'avatar_url': kwargs.get('avatar_url'),
            'real_name': kwargs.get('real_name'),
            'phone_number': kwargs.get('phone_number'),
            'display_name': kwargs.get('display_name', pseudonym),
            'years_of_experience': kwargs.get('years_of_experience'),
            'certification': kwargs.get('certification')
        }
        
        response = supabase.table('guru_profiles').insert(profile_data).execute()
        
        if response.data and len(response.data) > 0:
            print(f"[GuruProfile] 创建成功: {pseudonym} (user_id: {user_id})")
            return response.data[0]
        return None
    except Exception as e:
        error_msg = str(e)
        if 'duplicate key' in error_msg.lower() or 'unique' in error_msg.lower():
            print(f"[GuruProfile] 命理师档案已存在")
        else:
            print(f"[GuruProfile] 创建失败: {e}")
        return None


def get_guru_profile(user_id):
    """获取命理师档案"""
    try:
        supabase = get_supabase_client()
        
        response = supabase.table('guru_profiles')\
            .select('*')\
            .eq('user_id', user_id)\
            .execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        print(f"[GuruProfile] 获取失败: {e}")
        return None


# ==================== 工具函数 ====================

def validate_pseudonym(pseudonym):
    """
    验证灵性假名（不能是真名格式）
    Returns:
        (bool, str) (是否有效, 错误消息)
    """
    import re
    
    if len(pseudonym) < 4:
        return False, "灵性假名至少需要 4 个字符"
    
    # 检查是否为真名模式
    real_name_patterns = [
        r'^[A-Z][a-z]+ [A-Z][a-z]+$',  # John Smith
        r'^(Mr|Mrs|Ms|Dr)\.',           # 头衔
    ]
    
    for pattern in real_name_patterns:
        if re.match(pattern, pseudonym, re.IGNORECASE):
            return False, "请使用灵性假名，而非真实姓名"
    
    return True, ""
