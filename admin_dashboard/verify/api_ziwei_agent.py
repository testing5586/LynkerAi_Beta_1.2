"""
紫微命盘解析模块
仅支持解析文墨天机导出的「AI 分析版 JSON/TXT」文件
禁止任何形式的模拟生成或推断
"""

from datetime import datetime


def generate_ziwei_data(birth_date, birth_time, timezone="+08:00", location=None, gender="未知"):
    """
    ⛔ 已禁用：紫微命盘模拟生成功能
    
    本系统不再提供紫微命盘的模拟生成或推断功能。
    所有紫微数据必须来自文墨天机导出的「AI 分析版 JSON/TXT」文件。
    
    请使用 parse_wenmo_ziwei_file() 函数解析真实文件。
    """
    raise NotImplementedError(
        "⛔ 紫微命盘模拟生成已禁用。"
        "请上传文墨天机导出的「AI 分析版 JSON/TXT」文件。"
    )


def call_external_ziwei_api(birth_date, birth_time, timezone, location, gender, provider="wenmo"):
    """
    ⛔ 已禁用：外部紫微API调用功能
    
    本系统不再支持通过API自动生成紫微命盘。
    所有紫微数据必须来自文墨天机导出的「AI 分析版 JSON/TXT」文件。
    
    请使用文件上传方式提供紫微命盘数据。
    """
    raise NotImplementedError(
        "⛔ 紫微命盘API生成已禁用。"
        "请上传文墨天机导出的「AI 分析版 JSON/TXT」文件。"
    )
