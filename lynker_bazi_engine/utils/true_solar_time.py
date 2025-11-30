"""
True Solar Time Calculation Utility (Wrapper for solar_time.py)
Used by birth_input page to calculate accurate solar time based on longitude
For backward compatibility with existing code
"""

from .solar_time import calculate_true_solar_time as calc_tst


def calculate_true_solar_time(solar_date_str, solar_time_str, longitude):
    """
    Calculate true solar time based on longitude
    
    Args:
        solar_date_str: "YYYY-MM-DD"
        solar_time_str: "HH:MM"
        longitude: Float, degrees East (e.g., 116.40 for Beijing)
    
    Returns:
        str: True solar time "YYYY-MM-DD HH:MM:SS"
    """
    local_datetime = f"{solar_date_str} {solar_time_str}:00"
    result = calc_tst(local_datetime, longitude, "+08:00")
    
    if "error" in result:
        # Fallback: return original if error
        return f"{solar_date_str} {solar_time_str}:00"
    
    return result.get("true_solar_datetime", f"{solar_date_str} {solar_time_str}:00")
