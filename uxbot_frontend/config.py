# -*- coding: utf-8 -*-
"""
UXBot前端配置
管理静态资源、页面设置等
"""
import os

# UXBot前端根目录
UXBOT_ROOT = os.path.dirname(os.path.abspath(__file__))
UXBOT_TEMPLATES = os.path.join(UXBOT_ROOT, '..', 'static', 'templates', 'uxbot')
UXBOT_STATIC = os.path.join(UXBOT_ROOT, '..', 'static', 'uxbot')

# 页面分类配置
PAGE_CATEGORIES = {
    'user_pages': [
        'user_dashboard_main', 'user_dashboard_truechart', 'user_dashboard_prediction',
        'user_dashboard_booking', 'user_dashboard_knowledge', 'user_dashboard_aisetting',
        'user_dashboard_billing', 'user_prognosis_record', 'user_record_detail',
        'user_ai_note_view', 'profile_detail', 'profile_setup_user',
        'user_friend_request', 'user_friends_overview', 'user_post_edit', 'my_truechart'
    ],
    'guru_pages': [
        'master_backend_overview', 'master_studio_management', 'appointment_link_creation',
        'customer_prognosis_records_view', 'master_business_page_setup', 'master_knowledge_main',
        'master_subscription', 'master_saved_memory', 'knowledge_base_main',
        'master_prognosis_record', 'master_record_detail', 'profile_setup_master',
        'master_registration_form', 'master_profile', 'guru_search', 'guru_dashboard'
    ],
    'matching_pages': [
        'homology_match_discovery', 'homology_match_profile_view', 'samedestiny_chatroom'
    ],
    'forum_pages': [
        'forum_homepage', 'forum_post_detail', 'create_post', 'lynkergroup', 'lynkermates'
    ],
    'service_pages': [
        'prognosis_service_entry', 'master_list', 'booking_appointment',
        'consultation_room', 'payment_gateway'
    ],
    'auth_pages': [
        'registration_type_selection', 'user_registration_form'
    ],
    'admin_pages': [
        'post_moderation_queue', 'blackbox_page', 'ai_generated_article'
    ]
}

# 默认页面设置
DEFAULT_PAGE_SETTINGS = {
    'title': 'LynkerAI - 智能命理平台',
    'viewport': 'width=device-width, initial-scale=1.0',
    'charset': 'UTF-8',
    'theme_color': '#6366f1',
    'description': 'LynkerAI智能命理平台 - 连接传统智慧与现代科技'
}

# 静态资源CDN配置（可选）
CDN_CONFIG = {
    'enabled': False,
    'base_url': 'https://cdn.lynkerai.com',
    'version': '1.0.0'
}

# API端点配置
API_ENDPOINTS = {
    'bazi_engine': '/bazi',  # 八字引擎API
    'user_events': '/api/events',  # 用户事件追踪
    'admin_dashboard': '/admin',  # 管理后台
    'uxbot_frontend': '/uxbot'  # UXBot前端
}

def get_page_category(page_name):
    """获取页面所属分类"""
    for category, pages in PAGE_CATEGORIES.items():
        if page_name in pages:
            return category
    return 'general'

def is_user_page(page_name):
    """判断是否为用户页面"""
    return page_name in PAGE_CATEGORIES['user_pages']

def is_guru_page(page_name):
    """判断是否为师父页面"""
    return page_name in PAGE_CATEGORIES['guru_pages']

def requires_auth(page_name):
    """判断页面是否需要登录"""
    # 大部分页面都需要登录，除了注册和首页
    public_pages = ['index', 'registration_type_selection', 'user_registration_form', 'master_registration_form']
    return page_name not in public_pages