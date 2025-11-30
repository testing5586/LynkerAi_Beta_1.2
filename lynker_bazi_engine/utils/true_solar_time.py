"""
True Solar Time Calculation Utility
Used by birth_input page to calculate accurate solar time based on longitude
"""
from datetime import datetime, timedelta

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
    # Parse datetime
    dt_str = f"{solar_date_str} {solar_time_str}"
    dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M")
    
    # Calculate longitude correction in minutes
    # Standard timezone center for China: 120°E
    # Each 15° = 1 hour difference
    # 1° longitude = 4 minutes time difference
    
    standard_longitude = 120.0  # China uses 120°E as standard
    correction_minutes = (longitude - standard_longitude) * 4
    
    # Apply correction
    true_dt = dt + timedelta(minutes=correction_minutes)
    
    return true_dt.strftime("%Y-%m-%d %H:%M:%S")
