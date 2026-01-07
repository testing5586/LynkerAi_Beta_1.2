# -*- coding: utf-8 -*-
"""uxbot_routes

UXBot前端页面蓝图
负责渲染UXBot生成的HTML页面，提供统一的前端入口。

Notes
-----
该项目中存在一些历史遗留的页面别名（例如 969102.html / page-969102.html）。
为了避免出现“两个首页版本”或 TemplateNotFound，我们在这里做统一重定向，
确保首页只有一个权威入口：/uxbot/index.html。
"""

from flask import Blueprint, render_template, send_from_directory, redirect
import os

try:
    # Jinja2 is a dependency of Flask; import explicitly for TemplateNotFound handling.
    from jinja2 import TemplateNotFound
except Exception:  # pragma: no cover
    TemplateNotFound = Exception


# Legacy numeric page-id aliases (from UXBot-generated pageNameMap)
# These exist because the export originally used Chinese filenames / internal page ids,
# then switched to English slugs. We redirect ids -> current templates.
_LEGACY_PAGE_ID_TO_SLUG = {
    # Homepage
    "969102": "index",

    # Community / groups
    "944544": "lynkergroup",
    "944545": "arena",
    "944865": "lynkermates",
    "945207": "samedestiny-chatroom",

    # Posts
    "944864": "user-post-edit",

    # User dashboard
    "979145": "user-dashb-truechart",
    "979336": "user-dashb-prediction",
    "979337": "user-dashb-main",
    "979400": "user-dashb-booking",
    "979401": "user-dashb-knowledge",
    "979411": "user-dashb-aisetting",
    "979468": "user-dashb-billing",

    # Guru
    "990256": "guru-business-page-setup",
    "1031922": "guru-knowledge-main",
    "1035721": "guru-subscription",
    "1041776": "guru-saved-memory",

    # Friends
    "1060063": "user-friend-request",
    "1060398": "user-friends-overview",

    # Chinese page title (template exists as 我的真命盘.html)
    "962648": "我的真命盘",
}


def _redirect_if_legacy_alias(page: str):
    """Return a redirect response if `page` is a known legacy alias, else None."""
    if not page:
        return None

    # Guru backend legacy slugs -> new guru pages
    # 旧版命理师后台路径仍然可能在某些组件或历史链接中被使用：
    # - /uxbot/master-backend-overview.html
    # - /uxbot/master-prognosis-record.html
    # - /uxbot/customer-prognosis-records-view.html
    # - /uxbot/knowledge-base-main.html
    # 之前这些路径因为模板不存在会触发 TemplateNotFound，然后被兜底重定向到 /uxbot/index.html，
    # 导致命理师从后台导航时总被“踢回首页”。
    #
    # 这里显式把它们视为旧别名，重定向到新的权威页面：
    # - 后台概览 -> /uxbot/guru-dashboard-main.html
    # - 我的预言记录 -> /uxbot/guru-db-prophecy-chart.html
    # - 顾客批命记录总览 -> /uxbot/guru-customer-records.html
    # - 知识库（旧总入口） -> /uxbot/guru-knowledge-main.html
    if page == "master-backend-overview":
        return redirect("/uxbot/guru-dashboard-main.html", code=302)

    if page == "master-prognosis-record":
        return redirect("/uxbot/guru-db-prophecy-chart.html", code=302)

    if page == "customer-prognosis-records-view":
        return redirect("/uxbot/guru-customer-records.html", code=302)

    if page == "knowledge-base-main":
        return redirect("/uxbot/guru-knowledge-main.html", code=302)

    # Guru profile & appointment legacy slugs
    # - /uxbot/profile-setup-master.html  -> 命理师资料设置新页
    # - /uxbot/appointment-link-creation.html -> 命理师预约管理新页
    if page == "profile-setup-master":
        return redirect("/uxbot/guru-profile-setup.html", code=302)

    if page == "appointment-link-creation":
        return redirect("/uxbot/guru-appointment.html", code=302)

    # Legacy wrapper route
    if page == "registration-type-selection":
        return redirect("/uxbot/registra-select.html", code=302)

    # Common legacy home aliases
    if page in {"969102", "page-969102"}:
        return redirect("/uxbot/index.html", code=302)

    # Handle page-<id>
    if page.startswith("page-"):
        maybe_id = page[len("page-"):]
        if maybe_id.isdigit() and maybe_id in _LEGACY_PAGE_ID_TO_SLUG:
            return redirect(f"/uxbot/{_LEGACY_PAGE_ID_TO_SLUG[maybe_id]}.html", code=302)

    # Handle <id>
    if page.isdigit() and page in _LEGACY_PAGE_ID_TO_SLUG:
        return redirect(f"/uxbot/{_LEGACY_PAGE_ID_TO_SLUG[page]}.html", code=302)

    return None

# 创建蓝图
uxbot_bp = Blueprint('uxbot', __name__, 
                     template_folder='../static/templates/uxbot',
                     static_folder='../static',
                     url_prefix='/uxbot')

@uxbot_bp.route('/assets/<path:filename>')
def serve_assets(filename):
    """Serve asset files from the static/uxbot/assets directory"""
    return send_from_directory(os.path.join(uxbot_bp.static_folder, 'uxbot/assets'), filename)

@uxbot_bp.route('/<path:filename>.png')
def serve_png_images(filename):
    """Serve PNG images from optimized_images directory"""
    try:
        images_dir = os.path.join(uxbot_bp.static_folder, 'uxbot/assets/optimized_images')
        # Just get the basename in case filename has path components
        base_filename = os.path.basename(filename) + '.png'
        return send_from_directory(images_dir, base_filename, mimetype='image/png')
    except:
        # If not found in optimized_images, try other locations
        return send_from_directory(os.path.join(uxbot_bp.static_folder, 'uxbot/assets'), filename + '.png')

@uxbot_bp.route('/')
def index():
    """UXBot前端首页"""
    return render_template('index.html')


@uxbot_bp.route('/969102.html')
def legacy_home_969102():
    """Legacy homepage alias -> canonical homepage."""
    return redirect('/uxbot/index.html', code=302)


@uxbot_bp.route('/page-969102.html')
def legacy_home_page_969102():
    """Legacy homepage alias (often referenced by header nav) -> canonical homepage."""
    return redirect('/uxbot/index.html', code=302)


@uxbot_bp.route('/registration-type-selection.html')
def legacy_registration_type_selection():
    """Legacy registration selection page -> current page."""
    return redirect('/uxbot/registra-select.html', code=302)


@uxbot_bp.route('/profile-setup-user.html')
def legacy_profile_setup_user():
    """Registration flow final step alias -> user profile setup page.

    原型中使用 /profile-setup-user 作为“资料完善”页面别名，
    实际导出的模板文件为 user-profile-setup.html，
    因此前端跳转 /uxbot/profile-setup-user.html 时，这里统一重定向到
    /uxbot/user-profile-setup.html，避免落到首页。
    """
    return redirect('/uxbot/user-profile-setup.html', code=302)


@uxbot_bp.route('/guru-register.html')
def legacy_guru_register():
    """Legacy guru registration page -> canonical registra-guru.html.

    为避免命理师注册页出现两个入口，这里将 /uxbot/guru-register.html
    统一重定向到权威页面 /uxbot/registra-guru.html。
    """
    return redirect('/uxbot/registra-guru.html', code=302)

@uxbot_bp.route('/<page>.html')
def uxbot_page(page):
    """
    通用页面路由
    匹配 /uxbot/<page>.html
    直接渲染对应的HTML模板文件
    """
    legacy = _redirect_if_legacy_alias(page)
    if legacy is not None:
        return legacy

    try:
        return render_template(f"{page}.html")
    except TemplateNotFound:
        # As a last resort: if someone hits a legacy alias we didn't explicitly list,
        # fall back to the canonical homepage to avoid 500s.
        return redirect("/uxbot/index.html", code=302)
