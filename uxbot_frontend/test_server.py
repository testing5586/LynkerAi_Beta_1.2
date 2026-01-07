# -*- coding: utf-8 -*-
"""
UXBot前端测试启动脚本
用于测试UXBot前端与后端的集成
"""
import os
import sys
from flask import Flask

# 添加父目录到Python路径
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

def create_test_app():
    """创建测试Flask应用"""
    app = Flask(__name__)
    app.secret_key = 'uxbot-test-secret-key'
    
    # 配置模板和静态文件路径
    app.template_folder = '../static/templates/uxbot'
    app.static_folder = '../static'
    
    # 注册UXBot前端模块
    try:
        from uxbot_frontend import init_uxbot_frontend
        init_uxbot_frontend(app)
        print("✅ UXBot前端模块加载成功")
    except Exception as e:
        print(f"❌ UXBot前端模块加载失败: {e}")
        return None
    
    # 添加根路由，重定向到UXBot
    @app.route('/')
    def index():
        from flask import redirect, url_for
        return redirect(url_for('uxbot.index'))
    
    return app

if __name__ == '__main__':
    print("🚀 启动UXBot前端测试服务器...")
    
    app = create_test_app()
    if app:
        print("📱 UXBot前端测试地址:")
        print("   主页: http://localhost:8080/")
        print("   UXBot入口: http://localhost:8080/uxbot/")
        print("   用户仪表板: http://localhost:8080/uxbot/dashboard")
        print("   同命匹配: http://localhost:8080/uxbot/matching") 
        print("   我的真命盘: http://localhost:8080/uxbot/truechart")
        print("   师父搜索: http://localhost:8080/uxbot/guru/search")
        print("   论坛: http://localhost:8080/uxbot/forum")
        print("   API健康检查: http://localhost:8080/uxbot/api/health")
        print("\n按 Ctrl+C 停止服务器")
        
        app.run(host='0.0.0.0', port=8080, debug=True)
    else:
        print("❌ 无法启动测试服务器")