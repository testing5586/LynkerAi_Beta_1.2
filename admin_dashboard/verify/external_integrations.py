"""
外部命理API集成配置
支持与文墨天机、问真等第三方API对接
"""

import os
import requests


EXTERNAL_PROVIDERS = {
    "wenmo": {
        "name": "文墨天机",
        "base_url": "https://api.wenmo.com/v1/astrology",
        "token": os.getenv("WENMO_API_KEY", ""),
        "enabled": False  # 设置为 True 启用外部API
    },
    "wenzhen": {
        "name": "问真",
        "base_url": "https://api.wenzhen.cn/astrology",
        "token": os.getenv("WENZHEN_API_KEY", ""),
        "enabled": False  # 设置为 True 启用外部API
    }
}


def call_external_provider(provider_name, payload):
    """
    调用外部命理API提供商
    
    参数:
        provider_name: str, 提供商名称 ("wenmo" 或 "wenzhen")
        payload: dict, 请求数据
            {
                "birth_date": "YYYY-MM-DD",
                "birth_time": "HH:MM:SS",
                "timezone": "+08:00",
                "location": {...},
                "gender": "男/女",
                "chart_type": "bazi" 或 "ziwei"
            }
            
    返回:
        dict: 外部API返回的数据，如果失败返回 None
    """
    
    provider = EXTERNAL_PROVIDERS.get(provider_name)
    
    if not provider:
        print(f"[External API] ❌ 未知的提供商: {provider_name}")
        return None
    
    if not provider["enabled"]:
        print(f"[External API] ⚠️ 提供商 {provider['name']} 未启用")
        return None
    
    if not provider["token"]:
        print(f"[External API] ❌ 提供商 {provider['name']} 缺少 API Token")
        return None
    
    try:
        headers = {
            "Authorization": f"Bearer {provider['token']}",
            "Content-Type": "application/json"
        }
        
        print(f"[External API] 🌐 调用 {provider['name']} API...")
        
        response = requests.post(
            provider["base_url"],
            json=payload,
            headers=headers,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"[External API] ✅ {provider['name']} 调用成功")
            return data
        else:
            print(f"[External API] ❌ {provider['name']} 返回错误: {response.status_code}")
            return None
            
    except requests.exceptions.Timeout:
        print(f"[External API] ❌ {provider['name']} 请求超时")
        return None
    except Exception as e:
        print(f"[External API] ❌ {provider['name']} 调用异常: {str(e)}")
        return None


def get_provider_status():
    """
    获取所有外部API提供商的状态
    
    返回:
        dict: 提供商状态信息
    """
    status = {}
    
    for key, provider in EXTERNAL_PROVIDERS.items():
        status[key] = {
            "name": provider["name"],
            "enabled": provider["enabled"],
            "has_token": bool(provider["token"]),
            "base_url": provider["base_url"]
        }
    
    return status


def enable_provider(provider_name, enable=True):
    """
    启用或禁用外部API提供商
    
    参数:
        provider_name: str, 提供商名称
        enable: bool, True启用, False禁用
    """
    if provider_name in EXTERNAL_PROVIDERS:
        EXTERNAL_PROVIDERS[provider_name]["enabled"] = enable
        status = "启用" if enable else "禁用"
        print(f"[External API] ✅ {EXTERNAL_PROVIDERS[provider_name]['name']} 已{status}")
        return True
    else:
        print(f"[External API] ❌ 未知的提供商: {provider_name}")
        return False
