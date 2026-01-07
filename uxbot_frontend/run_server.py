# -*- coding: utf-8 -*-
"""
UXBot前端启动脚本

默认提供两种运行模式：
- 生产模式：debug=False, use_reloader=False（适合部署）
- 开发模式：debug=True, use_reloader=True（自动模板 / 代码热重载）

通过环境变量 UXBOT_DEBUG 控制：

- UXBOT_DEBUG=1  -> 开发模式
- 未设置 / 其他值 -> 生产模式
"""
import os
import sys
from flask import Flask

# 添加父目录到Python路径
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

def create_app():
    """创建Flask应用"""
    app = Flask(__name__)
    app.secret_key = 'uxbot-secret-key-2026'
    
    # 配置模板和静态文件路径
    app.template_folder = '../static/templates/uxbot'
    app.static_folder = '../static'
    
    # 注册UXBot前端模块
    from uxbot_frontend import init_uxbot_frontend
    init_uxbot_frontend(app)
    
    # 添加根路由
    @app.route('/')
    def index():
        from flask import redirect, url_for
        return redirect(url_for('uxbot.index'))
    
    return app

if __name__ == '__main__':
    # 根据环境变量决定是否开启调试与自动重载
    debug_flag = os.environ.get('UXBOT_DEBUG', '').strip()
    debug_mode = debug_flag == '1'

    mode_text = '开发模式（自动重载开启）' if debug_mode else '生产模式（无自动重载）'
    print("🚀 启动UXBot前端服务器：" + mode_text)
    print("📱 访问地址: http://localhost:8080/uxbot/")
    print("按 Ctrl+C 停止服务器\n")

    app = create_app()
    app.run(
        host='0.0.0.0',
        port=8080,
        debug=debug_mode,
        use_reloader=debug_mode,
    )
