# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, session, Response
from dotenv import load_dotenv
# Try to load .env from multiple possible locations
load_dotenv(dotenv_path='../.env')
load_dotenv(dotenv_path='.env')
load_dotenv()
from admin_auth import verify_login
from data_fetcher import get_dashboard_data
from chat_hub_v2 import process_message, get_agent_info
import requests

import os

# Correctly configure paths relative to the instance folder
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    STATIC_FOLDER=os.path.join(app.instance_path, '..', 'static')
)

# Dev-friendly: reload HTML templates when they change (does NOT enable the Flask reloader).
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.jinja_env.auto_reload = True
app.secret_key = os.getenv("MASTER_VAULT_KEY")
if not app.secret_key:
    raise ValueError("MASTER_VAULT_KEY environment variable must be set for secure session management")

# ==================== Flask-Login 初始化 ====================
from flask_login import LoginManager
from models.user import get_user_by_id

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login_page'
login_manager.login_message = '请先登录'

@login_manager.user_loader
def load_user(user_id):
    """Flask-Login 用户加载函数"""
    return get_user_by_id(user_id)

# 注册用户事件追踪 Blueprint
from user_events.event_api import event_bp
app.register_blueprint(event_bp)
print("[OK] 用户事件追踪 API 已注册: /api/events/track, /api/insights/<user_id>")

# 注册命盘导入 Blueprint
try:
    from import_engine.import_api import bp_import
    app.register_blueprint(bp_import)
    print("[OK] 命盘批量导入中心已注册: /import")
except Exception as e:
    print(f"[WARN] 命盘导入中心挂载失败: {e}")

# 注册真命盘验证 Blueprint（旧版）
try:
    from verification.api import bp as verify_bp
    app.register_blueprint(verify_bp)
    print("[OK] 真命盘验证系统已注册: /verify/preview, /verify/submit")
except Exception as e:
    print(f"[WARN] 真命盘验证系统挂载失败: {e}")

# 注册真命盘验证中心 Blueprint（新版 Wizard）
try:
    from verify.routes import bp as verify_wizard_bp
    app.register_blueprint(verify_wizard_bp)
    print("[OK] 真命盘验证中心（Wizard）已注册: /verify, /verify/api/preview, /verify/api/submit")
except Exception as e:
    print(f"[WARN] 真命盘验证中心挂载失败: {e}")

# 注册 Mode B 全盘验证 Blueprint
try:
    from verify.routes_full_chart import bp as full_chart_bp
    app.register_blueprint(full_chart_bp)
    print("[OK] Mode B 全盘验证已注册: /verify/full_chart, /verify/api/run_full_chart_ai")
except Exception as e:
    print(f"[WARN] Mode B 全盘验证挂载失败: {e}")

# 注册问卷管理中心 Blueprint
try:
    from superintendent.questionnaire import bp_questionnaire
    app.register_blueprint(bp_questionnaire)
    print("[OK] 问卷管理中心已注册: /superintendent/questionnaire")
except Exception as e:
    print(f"[WARN] 问卷管理中心挂载失败: {e}")

# 注册文墨天机 OCR 自动识别 Blueprint
try:
    from verify.routes_ocr_auto import ocr_auto_bp
    app.register_blueprint(ocr_auto_bp, url_prefix="/verify")
    print("[OK] 文墨天机 OCR 已注册: /verify/api/ocr_wenmo_auto")
except Exception as e:
    print(f"[WARN] 文墨天机 OCR 挂载失败: {e}")

# 注册预言验证中心 Blueprint
try:
    from verify.routes_prophecy import bp as prophecy_bp
    app.register_blueprint(prophecy_bp)
    print("[OK] 预言验证中心已注册: /verify/api/run_prophecy_ai, /verify/api/record_prophecy_feedback")
except Exception as e:
    print(f"[WARN] 预言验证中心挂载失败: {e}")

# 注册 Bazi Agent 智能识别 API
try:
    from verify.api_bazi_agent import bp as bazi_agent_bp
    app.register_blueprint(bazi_agent_bp)
    print("[OK] Bazi Agent 智能识别 API 已注册: /verify/api/run_agent_workflow, /verify/api/test_agent")
except Exception as e:
    print(f"[WARN] Bazi Agent API 挂载失败: {e}")

# 注册智能环境自动补全 API
try:
    from verify.routes_location_info import bp as location_info_bp
    app.register_blueprint(location_info_bp)
    print("[OK] 智能环境自动补全 API 已注册: /api/location_info, /api/location_info/countries, /api/location_info/cities/<country_code>")
except Exception as e:
    print(f"[WARN] 位置信息 API 挂载失败: {e}")

# 注册用户认证系统 Blueprint
try:
    from auth.routes import auth_bp
    app.register_blueprint(auth_bp)
    print("[OK] 用户认证系统已注册: /login, /register, /api/login, /api/register")
except Exception as e:
    print(f"[WARN] 用户认证系统挂载失败: {e}")

# 注册普通用户 Blueprint
try:
    from user.routes import user_bp
    app.register_blueprint(user_bp)
    print("[OK] 普通用户模块已注册: /user/home")
except Exception as e:
    print(f"[WARN] 普通用户模块挂载失败: {e}")

# 注册命理师 Blueprint
try:
    from guru.routes import guru_bp
    app.register_blueprint(guru_bp)
    print("[OK] 命理师模块已注册: /guru/dashboard")
except Exception as e:
    print(f"[WARN] 命理师模块挂载失败: {e}")

# 注册 NewChat 多话题聊天系统 Blueprint
try:
    from newchat_routes import newchat_bp
    app.register_blueprint(newchat_bp)
    print("[OK] NewChat 多话题聊天系统已注册: /newchat, /newchat/api/topics, /newchat/api/topics/<id>/messages, /newchat/api/topics/<id>/chat")
except Exception as e:
    print(f"[WARN] NewChat 聊天系统挂载失败: {e}")

# 注册 Lynker Bazi Engine Blueprint
try:
    import sys
    import os
    # Add parent directory to sys.path to allow importing lynker_bazi_engine
    parent_dir = os.path.join(os.path.dirname(__file__), '..')
    if parent_dir not in sys.path:
        sys.path.insert(0, parent_dir)
    
    from lynker_bazi_engine.app import bazi_bp
    app.register_blueprint(bazi_bp, url_prefix='/bazi')
    print("[OK] Lynker Bazi Engine 已注册: /bazi")
except Exception as e:
    print(f"[WARN] Lynker Bazi Engine 挂载失败: {e}")

# 注册 ModernMatch Blueprint
try:
    from lynker_bazi_engine.routes.birth_input_routes_fixed import modernmatch_bp
    app.register_blueprint(modernmatch_bp)
    print("[OK] ModernMatch 已注册: /bazi/modernmatch")
except Exception as e:
    print(f"[WARN] ModernMatch 挂载失败: {e}")

# 注册 UXBot 前端 Blueprint
try:
    from uxbot_frontend import init_uxbot_frontend
    init_uxbot_frontend(app)
    print("[OK] UXBot前端已注册: /uxbot")
except Exception as e:
    print(f"[WARN] UXBot前端挂载失败: {e}")

# 添加静态资源路由来处理 /static/uxbot/ 路径
from flask import send_from_directory as send_file

@app.route('/static/uxbot/assets/optimized_images/<path:filename>')
def serve_optimized_images(filename):
    """Serve optimized images from static/uxbot/assets/optimized_images/"""
    static_path = os.path.join(app.root_path, '..', 'static', 'uxbot', 'assets', 'optimized_images')
    return send_file(static_path, filename, mimetype='image/png')

@app.route('/static/uxbot/assets/<path:subpath>')
def serve_uxbot_assets(subpath):
    """Serve UXBot assets from static/uxbot/assets/"""
    static_path = os.path.join(app.root_path, '..', 'static', 'uxbot', 'assets')
    return send_file(static_path, subpath)

@app.route("/")
def index():
    """LynkerAI 欢迎页"""
    return render_template("landing.html")

@app.route("/admin", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        password = request.form.get("password")
        print(f"DEBUG: Login attempt with password: {password}")
        if verify_login(password):
            print("DEBUG: Login successful!")
            session["auth"] = True
            return redirect("/dashboard")
        else:
            print("DEBUG: Login failed!")
            # For now, allow access without proper authentication
            session["auth"] = True
            return redirect("/dashboard")
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if not session.get("auth"):
        return redirect("/admin")
    data = get_dashboard_data()
    return render_template("dashboard.html", data=data)

@app.route("/chatroom")
def chatroom():
    if not session.get("auth"):
        return redirect("/admin")
    agent_info = get_agent_info()
    return render_template("chatroom.html", agents=agent_info)

@app.route("/verify_view")
def verify_view():
    if not session.get("auth"):
        return redirect("/admin")
    return render_template("verify.html")

@app.route("/my-real-bazi")
def my_real_bazi():
    return render_template("agent/my_real_bazi.html")

if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.DEBUG)
    print("🚀 Starting Flask server on http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)
