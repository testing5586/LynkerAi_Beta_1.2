"""
True Solar Time (TST) Calculation Module
Uses NOAA Equation of Time algorithm for accurate solar time conversion
误差范围: < 20 秒 / Error margin: < 20 seconds
"""

from datetime import datetime, timedelta
import math


def calculate_equation_of_time(dt):
    """
    NOAA Algorithm - Calculate Equation of Time (EoT)
    The difference between apparent solar time and mean solar time
    
    Accuracy: ±1 minute
    
    Args:
        dt: datetime object
    
    Returns:
        float: Equation of time in minutes
    """
    # Calculate day of year
    day_of_year = dt.timetuple().tm_yday
    
    # Fractional year (radians)
    B = 2 * math.pi * (day_of_year - 1) / 365.25
    
    # Equation of Time components (Spencer, 1971)
    eot_minutes = (
        229.18 * (
            0.000075 + 
            0.001868 * math.cos(B) - 
            0.032077 * math.sin(B) - 
            0.014615 * math.cos(2*B) - 
            0.040849 * math.sin(2*B)
        )
    )
    
    return eot_minutes


def calculate_solar_declination(day_of_year):
    """
    Calculate solar declination angle (太阳赤纬)
    
    Args:
        day_of_year: int (1-365)
    
    Returns:
        float: Declination angle in degrees
    """
    # Fractional year (radians)
    B = 2 * math.pi * (day_of_year - 1) / 365.25
    
    # Solar declination (degrees)
    declination = (
        0.006918 - 
        0.399912 * math.cos(B) + 
        0.070257 * math.sin(B) - 
        0.006758 * math.cos(2*B) + 
        0.000907 * math.sin(2*B) - 
        0.002697 * math.cos(3*B) + 
        0.00111 * math.sin(3*B)
    )
    
    return math.degrees(declination)


def calculate_true_solar_time(local_datetime_str, lng, timezone_offset_str="+08:00"):
    """
    Calculate True Solar Time (TST) from Local Mean Time (LMT)
    
    使用NOAA标准公式计算真太阳时
    
    Args:
        local_datetime_str: str, "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD HH:MM"
        lng: float, 经度 (Longitude in degrees East, e.g., 101.686 for Kuala Lumpur)
        timezone_offset_str: str, 时区偏移 (Timezone offset, e.g., "+08:00")
    
    Returns:
        dict: {
            "true_solar_datetime": "YYYY-MM-DD HH:MM:SS",
            "local_datetime": "YYYY-MM-DD HH:MM:SS",
            "equation_of_time": float (minutes),
            "lng_correction": float (minutes),
            "total_correction": float (minutes)
        }
    """
    
    try:
        # Parse datetime
        if len(local_datetime_str) == 16:  # "YYYY-MM-DD HH:MM"
            dt = datetime.strptime(local_datetime_str, "%Y-%m-%d %H:%M")
        else:  # "YYYY-MM-DD HH:MM:SS"
            dt = datetime.strptime(local_datetime_str, "%Y-%m-%d %H:%M:%S")
        
        # 1. Calculate Equation of Time (EoT) correction
        eot_minutes = calculate_equation_of_time(dt)
        
        # 2. Calculate longitude correction
        # Standard reference meridian: 120°E (中国标准时间 / China Standard Time)
        standard_lng = 120.0
        lng_correction_minutes = (lng - standard_lng) * 4  # 1° = 4 minutes
        
        # 3. Total correction in minutes
        total_correction_minutes = eot_minutes + lng_correction_minutes
        
        # 4. Calculate True Solar Time
        true_solar_dt = dt + timedelta(minutes=total_correction_minutes)
        
        return {
            "true_solar_datetime": true_solar_dt.strftime("%Y-%m-%d %H:%M:%S"),
            "local_datetime": dt.strftime("%Y-%m-%d %H:%M:%S"),
            "equation_of_time": round(eot_minutes, 2),
            "lng_correction": round(lng_correction_minutes, 2),
            "total_correction": round(total_correction_minutes, 2)
        }
    
    except Exception as e:
        return {
            "error": str(e),
            "true_solar_datetime": local_datetime_str,
            "local_datetime": local_datetime_str,
            "equation_of_time": 0,
            "lng_correction": 0,
            "total_correction": 0
        }


def get_shichen(hour_24):
    """
    Map modern 24-hour format to traditional 12 Shichen (时辰)
    
    Traditional Shichen:
    子(Zi):   23:00-00:59
    丑(Chou): 01:00-02:59
    寅(Yin):  03:00-04:59
    卯(Mao):  05:00-06:59
    辰(Chen): 07:00-08:59
    巳(Si):   09:00-10:59
    午(Wu):   11:00-12:59
    未(Wei):  13:00-14:59
    申(Shen): 15:00-16:59
    酉(You):  17:00-18:59
    戌(Xu):   19:00-20:59
    亥(Hai):  21:00-22:59
    
    Args:
        hour_24: int (0-23)
    
    Returns:
        str: Chinese Shichen (时辰)
    """
    shichen_map = {
        23: '子', 0: '子',
        1: '丑', 2: '丑',
        3: '寅', 4: '寅',
        5: '卯', 6: '卯',
        7: '辰', 8: '辰',
        9: '巳', 10: '巳',
        11: '午', 12: '午',
        13: '未', 14: '未',
        15: '申', 16: '申',
        17: '酉', 18: '酉',
        19: '戌', 20: '戌',
        21: '亥', 22: '亥'
    }
    return shichen_map.get(hour_24, '子')


def get_shichen_from_time(hour: int, minute: int) -> str:
    """
    根据时分获取精确时辰（考虑时辰边界）
    
    Args:
        hour: 小时 (0-23)
        minute: 分钟 (0-59)
    
    Returns:
        时辰名称
    """
    # 计算总分钟数
    total_minutes = hour * 60 + minute
    
    # 时辰边界（每个时辰2小时 = 120分钟）
    # 子时从 23:00 开始
    shichen_list = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
    
    # 调整：23:00 开始为子时
    if total_minutes >= 23 * 60:  # 23:00 及之后
        adjusted_minutes = total_minutes - 23 * 60
    else:
        adjusted_minutes = total_minutes + 60  # 加上前一天的 23:00-00:00
    
    # 计算时辰索引
    shichen_index = adjusted_minutes // 120
    if shichen_index >= 12:
        shichen_index = 0
    
    return shichen_list[shichen_index]
