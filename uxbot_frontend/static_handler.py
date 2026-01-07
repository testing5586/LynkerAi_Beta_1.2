# -*- coding: utf-8 -*-
"""
UXBot前端静态资源处理器
处理CSS、JS、图片等静态文件的加载
"""
from flask import Blueprint, send_from_directory, abort, current_app
import os
import mimetypes

# 创建静态资源蓝图
static_bp = Blueprint('uxbot_static', __name__, url_prefix='/uxbot/static')

# MIME类型映射
MIME_TYPES = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject'
}

def get_uxbot_static_path():
    """获取UXBot静态文件根目录"""
    return os.path.join(current_app.root_path, '..', 'static', 'uxbot')

@static_bp.route('/css/<path:filename>')
def serve_css(filename):
    """提供CSS文件"""
    try:
        static_path = get_uxbot_static_path()
        css_path = os.path.join(static_path, 'css')
        if os.path.exists(css_path):
            return send_from_directory(css_path, filename, mimetype='text/css')
        else:
            # 如果没有专门的css文件夹，从根目录查找
            return send_from_directory(static_path, filename, mimetype='text/css')
    except Exception as e:
        current_app.logger.error(f"Error serving CSS {filename}: {e}")
        abort(404)

@static_bp.route('/js/<path:filename>')
def serve_js(filename):
    """提供JavaScript文件"""
    try:
        static_path = get_uxbot_static_path()
        js_path = os.path.join(static_path, 'js')
        if os.path.exists(js_path):
            return send_from_directory(js_path, filename, mimetype='application/javascript')
        else:
            return send_from_directory(static_path, filename, mimetype='application/javascript')
    except Exception as e:
        current_app.logger.error(f"Error serving JS {filename}: {e}")
        abort(404)

@static_bp.route('/images/<path:filename>')
def serve_images(filename):
    """提供图片文件"""
    try:
        static_path = get_uxbot_static_path()
        images_path = os.path.join(static_path, 'images')
        
        # 尝试多个可能的图片目录
        possible_paths = [
            images_path,
            os.path.join(static_path, 'img'),
            os.path.join(static_path, 'assets', 'images'),
            static_path
        ]
        
        for path in possible_paths:
            if os.path.exists(os.path.join(path, filename)):
                file_ext = os.path.splitext(filename)[1].lower()
                mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
                return send_from_directory(path, filename, mimetype=mimetype)
        
        abort(404)
    except Exception as e:
        current_app.logger.error(f"Error serving image {filename}: {e}")
        abort(404)

@static_bp.route('/fonts/<path:filename>')
def serve_fonts(filename):
    """提供字体文件"""
    try:
        static_path = get_uxbot_static_path()
        fonts_path = os.path.join(static_path, 'fonts')
        
        if os.path.exists(fonts_path):
            file_ext = os.path.splitext(filename)[1].lower()
            mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
            return send_from_directory(fonts_path, filename, mimetype=mimetype)
        else:
            abort(404)
    except Exception as e:
        current_app.logger.error(f"Error serving font {filename}: {e}")
        abort(404)

@static_bp.route('/assets/<path:filename>')
def serve_assets(filename):
    """提供assets目录下的文件"""
    try:
        static_path = get_uxbot_static_path()
        assets_path = os.path.join(static_path, 'assets')
        
        # 处理嵌套的assets路径结构
        if filename.startswith('html/'):
            # 处理 /uxbot/assets/html/55750/xxx.css
            file_path = os.path.join(assets_path, filename)
            if os.path.exists(file_path):
                file_ext = os.path.splitext(filename)[1].lower()
                mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
                return send_from_directory(os.path.dirname(file_path), os.path.basename(filename), mimetype=mimetype)
        
        elif filename.startswith('static/'):
            # 处理 /uxbot/assets/static/uxbot/25_6/xxx.js
            file_path = os.path.join(assets_path, filename)
            if os.path.exists(file_path):
                file_ext = os.path.splitext(filename)[1].lower()
                mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
                return send_from_directory(os.path.dirname(file_path), os.path.basename(filename), mimetype=mimetype)
        
        # 默认处理
        file_ext = os.path.splitext(filename)[1].lower()
        mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
        return send_from_directory(assets_path, filename, mimetype=mimetype)
        
    except Exception as e:
        current_app.logger.error(f"Error serving assets file {filename}: {e}")
        abort(404)

@static_bp.route('/<path:filename>')
def serve_static(filename):
    """通用静态文件服务"""
    try:
        static_path = get_uxbot_static_path()
        file_ext = os.path.splitext(filename)[1].lower()
        mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
        
        return send_from_directory(static_path, filename, mimetype=mimetype)
    except Exception as e:
        current_app.logger.error(f"Error serving static file {filename}: {e}")
        abort(404)

def init_static_handler(app):
    """初始化静态资源处理器"""
    app.register_blueprint(static_bp)
    print("[OK] UXBot静态资源处理器已注册: /uxbot/static")