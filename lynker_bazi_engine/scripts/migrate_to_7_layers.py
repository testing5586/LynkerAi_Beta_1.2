"""
Migrate chart_time_layers_v2 to new 7-level structure
- Add: chinese_shichen, minute, quarter_15min
- Keep: point_column, ke_column (as legacy backup)
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from supabase_client import get_supabase_client

# ✅ Fixed Shichen Mapping (Option A - Traditional 12 periods)
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

def migrate_to_7_layers():
    """
    Add new fields to existing records:
    - chinese_shichen (时辰)
    - minute (from point_column)
    - quarter_15min (from minute // 15)
    """
    client = get_supabase_client()
    
    print("=" * 70)
    print("🔄 Migrating to 7-Level Time Structure")
    print("=" * 70)
    
    # Fetch all records
    res = client.table("chart_time_layers_v2").select("*").execute()
    records = res.data if res.data else []
    
    print(f"📊 Found {len(records)} records to migrate")
    print("-" * 70)
    
    updated_count = 0
    skipped_count = 0
    
    for record in records:
        chart_id = record.get("chart_id")
        hour = record.get("hour", 0)
        point_col = record.get("point_column", 0)
        
        # Check if already migrated (has chinese_shichen)
        if record.get("chinese_shichen"):
            skipped_count += 1
            continue
        
        # ✅ Derive new fields
        chinese_shichen = SHICHEN_MAP.get(hour, '子')  # Default to 子
        minute = point_col  # Already 0-59
        quarter_15min = minute // 15  # 0-3
        
        # Update record (keep point_column and ke_column as backup)
        update_data = {
            "chinese_shichen": chinese_shichen,
            "minute": minute,
            "quarter_15min": quarter_15min,
        }
        
        try:
            client.table("chart_time_layers_v2")\
                .update(update_data)\
                .eq("chart_id", chart_id)\
                .execute()
            
            updated_count += 1
            
            if updated_count % 10 == 0:
                print(f"✅ Processed {updated_count} records...")
        
        except Exception as e:
            print(f"❌ Error updating chart_id={chart_id}: {e}")
    
    print("-" * 70)
    print(f"✅ Migration Complete")
    print(f"   - Updated: {updated_count}")
    print(f"   - Skipped (already migrated): {skipped_count}")
    print(f"   - Total: {len(records)}")
    print("=" * 70)

if __name__ == "__main__":
    migrate_to_7_layers()
