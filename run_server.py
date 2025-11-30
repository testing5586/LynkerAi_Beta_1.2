from flask import Flask, redirect, url_for
from lynker_bazi_engine.routes.birth_input_routes_v4 import (
    birth_input_bp,
    modernmatch_bp,
    bazi_bp,
    ziwei_bp,
    api_bp,
)
import os
import sys

# 确保路径正确
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def create_app():
    # 获取模板目录的绝对路径
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    TEMPLATE_DIR = os.path.join(BASE_DIR, 'lynker_bazi_engine', 'templates')
    STATIC_DIR = os.path.join(BASE_DIR, 'lynker_bazi_engine', 'static')

    app = Flask(__name__, 
                template_folder=TEMPLATE_DIR,
                static_folder=STATIC_DIR)
    
    app.secret_key = "CHANGE_THIS_TO_REAL_SECRET"
    app.config['SESSION_TYPE'] = 'filesystem'

    # 注册蓝图：出生输入页
    app.register_blueprint(birth_input_bp, url_prefix='')

    # 注册蓝图：ModernMatch (时间命盘)
    app.register_blueprint(modernmatch_bp)

    # 注册蓝图：ModernMatch API
    app.register_blueprint(api_bp)

    # 注册蓝图：八字命盘
    app.register_blueprint(bazi_bp)

    # 注册蓝图：紫微命盘
    app.register_blueprint(ziwei_bp)
    
    # Debug: Print all registered routes
    print("\n=== Registered Routes ===")
    for rule in app.url_map.iter_rules():
        print(f"{rule.methods} {rule.rule} -> {rule.endpoint}")
    print("=========================\n")

    @app.route("/")
    def index():
        # 默认跳到出生输入
        return "<script>location.href='/birth-input';</script>"

    @app.errorhandler(404)
    def not_found(e):
        return "404 Not Found", 404

    return app


if __name__ == "__main__":
    print("=" * 60)
    print("🌟 灵客排盘引擎 Flask Server v1.3 (Blueprint Refactored)")
    print("=" * 60)
    print("📍 访问地址: http://127.0.0.1:5002/")
    
    app = create_app()
    app.run(host='0.0.0.0', port=5002, debug=True)




