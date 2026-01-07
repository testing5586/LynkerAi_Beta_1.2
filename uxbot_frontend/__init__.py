# -*- coding: utf-8 -*-
"""
UXBot前端模块初始化
"""
from .uxbot_routes import uxbot_bp
from .config import PAGE_CATEGORIES, DEFAULT_PAGE_SETTINGS, API_ENDPOINTS
from .static_handler import init_static_handler
from .api_bridge import init_api_bridge
from .assets_handler import init_assets_handler
from .otp_routes import otp_bp

__version__ = '1.0.0'
__author__ = 'LynkerAI Team'

def init_uxbot_frontend(app):
    """初始化UXBot前端模块到Flask应用"""
    # 注册主蓝图
    app.register_blueprint(uxbot_bp)
    
    # 初始化静态资源处理器
    init_static_handler(app)
    
    # 初始化assets处理器
    init_assets_handler(app)
    
    # 初始化API桥接器
    init_api_bridge(app)
    
    # 注册OTP验证路由
    app.register_blueprint(otp_bp)
    print("[OK] UXBot OTP验证已注册: /uxbot/api/otp")
    
    # 添加全局模板变量
    @app.context_processor
    def inject_uxbot_globals():
        return {
            'page_categories': PAGE_CATEGORIES,
            'default_settings': DEFAULT_PAGE_SETTINGS,
            'api_endpoints': API_ENDPOINTS
        }
    
    print("[OK] UXBot前端模块已注册: /uxbot")
    return uxbot_bp