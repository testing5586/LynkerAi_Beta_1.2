# -*- coding: utf-8 -*-
"""
UXBot Assets路径处理器
专门处理UXBot生成的复杂assets路径结构
"""
from flask import Blueprint, send_from_directory, abort, current_app
import os

# 创建assets处理蓝图
assets_bp = Blueprint('uxbot_assets', __name__, url_prefix='/uxbot/assets')

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

def get_assets_root():
    """获取assets根目录"""
    return os.path.join(current_app.root_path, '..', 'static', 'uxbot', 'assets')

@assets_bp.route('/html/<path:subpath>')
def serve_html_assets(subpath):
    """处理 /uxbot/assets/html/ 路径下的文件"""
    try:
        assets_root = get_assets_root()
        html_dir = os.path.join(assets_root, 'html')
        
        file_path = os.path.join(html_dir, subpath)
        if os.path.exists(file_path):
            file_ext = os.path.splitext(subpath)[1].lower()
            mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
            
            # 从文件所在目录提供文件
            dir_path = os.path.dirname(file_path)
            filename = os.path.basename(file_path)
            
            current_app.logger.info(f"Serving HTML asset: {file_path}")
            return send_from_directory(dir_path, filename, mimetype=mimetype)
        else:
            current_app.logger.warning(f"HTML asset not found: {file_path}")
            abort(404)
            
    except Exception as e:
        current_app.logger.error(f"Error serving HTML asset {subpath}: {e}")
        abort(404)

@assets_bp.route('/static/<path:subpath>')
def serve_static_assets(subpath):
    """处理 /uxbot/assets/static/ 路径下的文件"""
    try:
        assets_root = get_assets_root()
        static_dir = os.path.join(assets_root, 'static')
        
        file_path = os.path.join(static_dir, subpath)
        if os.path.exists(file_path):
            file_ext = os.path.splitext(subpath)[1].lower()
            mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
            
            # 从文件所在目录提供文件
            dir_path = os.path.dirname(file_path)
            filename = os.path.basename(file_path)
            
            current_app.logger.info(f"Serving static asset: {file_path}")
            return send_from_directory(dir_path, filename, mimetype=mimetype)
        else:
            current_app.logger.warning(f"Static asset not found: {file_path}")
            abort(404)
            
    except Exception as e:
        current_app.logger.error(f"Error serving static asset {subpath}: {e}")
        abort(404)

@assets_bp.route('/optimized_images/<path:filename>')
def serve_optimized_images(filename):
    """处理 /uxbot/assets/optimized_images/ 路径下的图片文件"""
    try:
        assets_root = get_assets_root()
        images_dir = os.path.join(assets_root, 'optimized_images')
        
        file_path = os.path.join(images_dir, filename)
        if os.path.exists(file_path):
            file_ext = os.path.splitext(filename)[1].lower()
            mimetype = MIME_TYPES.get(file_ext, 'image/png')
            
            current_app.logger.info(f"Serving optimized image: {file_path}")
            return send_from_directory(images_dir, filename, mimetype=mimetype)
        else:
            current_app.logger.warning(f"Optimized image not found: {file_path}")
            abort(404)
            
    except Exception as e:
        current_app.logger.error(f"Error serving optimized image {filename}: {e}")
        abort(404)

@assets_bp.route('/<path:filename>')
def serve_general_assets(filename):
    """处理其他assets文件"""
    try:
        assets_root = get_assets_root()
        file_path = os.path.join(assets_root, filename)
        
        if os.path.exists(file_path):
            file_ext = os.path.splitext(filename)[1].lower()
            mimetype = MIME_TYPES.get(file_ext, 'application/octet-stream')
            
            dir_path = os.path.dirname(file_path)
            base_name = os.path.basename(file_path)
            
            current_app.logger.info(f"Serving general asset: {file_path}")
            return send_from_directory(dir_path, base_name, mimetype=mimetype)
        else:
            current_app.logger.warning(f"General asset not found: {file_path}")
            abort(404)
            
    except Exception as e:
        current_app.logger.error(f"Error serving general asset {filename}: {e}")
        abort(404)

def init_assets_handler(app):
    """初始化assets处理器"""
    app.register_blueprint(assets_bp)
    print("[OK] UXBot Assets处理器已注册: /uxbot/assets")