"""
出生数据标准化模块
将前端表单输入转换为统一的 normalized_birth_data 格式
"""

from datetime import datetime
from .utils.solar_time import calculate_true_solar_time, get_shichen_from_time


# 预设城市坐标和时区
LOCATION_PRESETS = {
    "kuala_lumpur": {
        "name": "吉隆坡 Kuala Lumpur",
        "lat": 3.139,
        "lng": 101.686,
        "timezone": "+08:00"
    },
    "singapore": {
        "name": "新加坡 Singapore",
        "lat": 1.3521,
        "lng": 103.8198,
        "timezone": "+08:00"
    },
    "beijing": {
        "name": "北京 Beijing",
        "lat": 39.9042,
        "lng": 116.4074,
        "timezone": "+08:00"
    },
    "shanghai": {
        "name": "上海 Shanghai",
        "lat": 31.2304,
        "lng": 121.4737,
        "timezone": "+08:00"
    },
    "guangzhou": {
        "name": "广州 Guangzhou",
        "lat": 23.1291,
        "lng": 113.2644,
        "timezone": "+08:00"
    },
    "shenzhen": {
        "name": "深圳 Shenzhen",
        "lat": 22.5431,
        "lng": 114.0579,
        "timezone": "+08:00"
    },
    "taipei": {
        "name": "台北 Taipei",
        "lat": 25.0330,
        "lng": 121.5654,
        "timezone": "+08:00"
    },
    "hong_kong": {
        "name": "香港 Hong Kong",
        "lat": 22.3193,
        "lng": 114.1694,
        "timezone": "+08:00"
    }
}


def normalize_birth_data(form_input: dict) -> dict:
    """
    标准化出生数据
    
    Args:
        form_input: 前端表单数据，包含：
            - gender: "male" | "female"
            - calendar_type: "solar" | "lunar"
            - birth_date: "YYYY-MM-DD"
            - birth_time: "HH:MM"
            - location: 城市键名（如 "kuala_lumpur"）
            - use_true_solar_time: bool
    
    Returns:
        标准化后的出生数据字典
    """
    # 获取基本信息
    gender = form_input.get("gender", "male")
    calendar_type = form_input.get("calendar_type", "solar")
    birth_date = form_input.get("birth_date", "")
    birth_time = form_input.get("birth_time", "00:00")
    location_key = form_input.get("location", "kuala_lumpur")
    use_true_solar_time = form_input.get("use_true_solar_time", False)
    
    # 获取地点信息
    location_data = LOCATION_PRESETS.get(location_key, LOCATION_PRESETS["kuala_lumpur"])
    
    # 构建本地日期时间
    local_datetime = f"{birth_date}T{birth_time}:00"
    
    # 解析时间
    time_parts = birth_time.split(":")
    hour_24 = int(time_parts[0]) if time_parts[0] else 0
    minute = int(time_parts[1]) if len(time_parts) > 1 and time_parts[1] else 0
    
    # 计算真太阳时
    if use_true_solar_time and birth_date:
        try:
            # 格式化为 solar_time.py 需要的格式
            local_dt_str = f"{birth_date} {birth_time}"
            result = calculate_true_solar_time(
                local_dt_str,
                location_data["lng"],
                location_data["timezone"]
            )
            # calculate_true_solar_time 返回字典
            if isinstance(result, dict) and "true_solar_datetime" in result:
                true_solar_datetime = result["true_solar_datetime"].replace(" ", "T")
            else:
                true_solar_datetime = local_datetime
            # 从真太阳时提取时辰
            tst_dt = datetime.fromisoformat(true_solar_datetime)
            shichen = get_shichen_from_time(tst_dt.hour, tst_dt.minute)
        except Exception:
            true_solar_datetime = local_datetime
            shichen = get_shichen_from_time(hour_24, minute)
    else:
        true_solar_datetime = local_datetime
        shichen = get_shichen_from_time(hour_24, minute)
    
    # 构建标准化数据
    normalized_data = {
        "gender": gender,
        "calendar_type": calendar_type,
        
        "local_datetime": local_datetime,
        "timezone": location_data["timezone"],
        
        "location": {
            "name": location_data["name"],
            "lat": location_data["lat"],
            "lng": location_data["lng"]
        },
        
        "use_true_solar_time": use_true_solar_time,
        "true_solar_datetime": true_solar_datetime,
        
        "shichen": shichen,
        "hour_24": hour_24,
        "minute": minute
    }
    
    return normalized_data
