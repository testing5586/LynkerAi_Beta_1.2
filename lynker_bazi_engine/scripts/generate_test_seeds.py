"""
Generate Test Seed Users for 7-Level TimeMatch Structure
Creates 13 users (3001-3013) with diverse time data
"""
import sys
from pathlib import Path
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from supabase_client import get_supabase_client

# ✅ Shichen Mapping (Traditional 12 periods)
SHICHEN_MAP = {
    23: '子', 0: '子',      # 23:00-00:59
    1: '丑', 2: '丑',       # 01:00-02:59
    3: '寅', 4: '寅',       # 03:00-04:59
    5: '卯', 6: '卯',       # 05:00-06:59
    7: '辰', 8: '辰',       # 07:00-08:59
    9: '巳', 10: '巳',      # 09:00-10:59
    11: '午', 12: '午',     # 11:00-12:59
    13: '未', 14: '未',     # 13:00-14:59
    15: '申', 16: '申',     # 15:00-16:59
    17: '酉', 18: '酉',     # 17:00-18:59
    19: '戌', 20: '戌',     # 19:00-20:59
    21: '亥', 22: '亥',     # 21:00-22:59
}

SEED_USERS = [
    {"uid": 3001, "birth": "2000-03-20 08:18"},  # Perfect match with #1
    {"uid": 3002, "birth": "2000-03-20 08:10"},  # Same shichen, diff minute
    {"uid": 3003, "birth": "2000-03-20 08:29"},  # Same hour, diff quarter
    {"uid": 3004, "birth": "2000-03-20 07:59"},  # Diff shichen (卯→辰)
    {"uid": 3005, "birth": "2000-03-20 09:00"},  # Diff shichen (辰→巳)
    {"uid": 3006, "birth": "2000-03-20 08:45"},  # Same hour, diff quarter
    {"uid": 3007, "birth": "2000-03-21 08:18"},  # Diff day
    {"uid": 3008, "birth": "2000-03-19 08:18"},  # Diff day
    {"uid": 3009, "birth": "1999-03-20 08:18"},  # Diff year
    {"uid": 3010, "birth": "2001-03-20 08:18"},  # Diff year
    {"uid": 3011, "birth": "2000-04-20 08:18"},  # Diff month
    {"uid": 3012, "birth": "2000-03-20 23:50"},  # Diff shichen (子时)
    {"uid": 3013, "birth": "2000-03-21 00:10"},  # Diff day + 子时
]

def parse_birth_time(birth_str):
    """Parse birth time and calculate 7-level structure"""
    dt = datetime.strptime(birth_str, "%Y-%m-%d %H:%M")
    
    year = dt.year
    month = dt.month
    day = dt.day
    hour = dt.hour
    minute = dt.minute
    
    # Calculate derived fields
    chinese_shichen = SHICHEN_MAP.get(hour, '子')
    quarter_15min = minute // 15  # 0-3
    
    # Legacy fields (for backward compatibility)
    point_column = minute  # Same as minute
    ke_column = quarter_15min  # Same as quarter_15min
    
    # Build time_layer_code (frequency code - privacy protected)
    time_layer_code = f"{year:04d}{month:02d}{day:02d}{hour:02d}{minute:02d}"
    
    return {
        "year": year,
        "month": month,
        "day": day,
        "hour": hour,
        
        # ✅ NEW: 7-Level Structure Fields
        "chinese_shichen": chinese_shichen,
        "minute": minute,
        "quarter_15min": quarter_15min,
        
        # Legacy (backup)
        "point_column": point_column,
        "ke_column": ke_column,
        
        # Privacy (backend only)
        "time_layer_code": time_layer_code,
    }

def generate_seed_users():
    """Generate and insert seed users into database"""
    client = get_supabase_client()
    
    print("=" * 70)
    print("🌱 Generating Test Seed Users for 7-Level Structure")
    print("=" * 70)
    
    for user in SEED_USERS:
        chart_id = user["uid"]
        birth_str = user["birth"]
        
        # Parse and calculate all fields
        time_data = parse_birth_time(birth_str)
        time_data["chart_id"] = chart_id
        
        print(f"\n📝 User #{chart_id}: {birth_str}")
        print(f"   Year: {time_data['year']}, Month: {time_data['month']}, Day: {time_data['day']}")
        print(f"   时辰: {time_data['chinese_shichen']}, Hour: {time_data['hour']:02d}, Min: {time_data['minute']:02d}, Quarter: {time_data['quarter_15min']}")
        
        try:
            # Check if already exists
            existing = client.table("chart_time_layers_v2")\
                .select("chart_id")\
                .eq("chart_id", chart_id)\
                .execute()
            
            if existing.data:
                print(f"   ⚠️  User #{chart_id} already exists, updating...")
                client.table("chart_time_layers_v2")\
                    .update(time_data)\
                    .eq("chart_id", chart_id)\
                    .execute()
            else:
                print(f"   ✅ Creating new user #{chart_id}...")
                client.table("chart_time_layers_v2")\
                    .insert(time_data)\
                    .execute()
            
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 70)
    print("✅ Seed user generation complete!")
    print("=" * 70)

if __name__ == "__main__":
    generate_seed_users()
