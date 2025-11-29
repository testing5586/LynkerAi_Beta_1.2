"""
TimeMatch Controlled Gradient Seed Test System
Base: 2001-05-15 10:32 (巳时)

Generates 8 users total:
- 1 base (seed_5000)
- 7 gradient levels (S/A/B/C/D/E/F)
- Only seed_5001 should score 100%
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from supabase_client import get_supabase_client
from datetime import datetime

# Shichen Mapping
SHICHEN_MAP = {
    23: '子', 0: '子', 1: '丑', 2: '丑', 3: '寅', 4: '寅',
    5: '卯', 6: '卯', 7: '辰', 8: '辰', 9: '巳', 10: '巳',
    11: '午', 12: '午', 13: '未', 14: '未', 15: '申', 16: '申',
    17: '酉', 18: '酉', 19: '戌', 20: '戌', 21: '亥', 22: '亥',
}

# ✅ CONTROLLED GRADIENT SEEDS (5月基准组)
GRADIENT_SEEDS = [
    # BASE USER (主基准用户)
    {
        "uid": 5000,
        "birth": "2001-05-15 10:32",
        "level": "BASE",
        "expected_score": 100,
        "description": "主基准用户 - 唯一100%真值"
    },
    
    # Level S: 100% Perfect Match (仅允许1个)
    {
        "uid": 5001,
        "birth": "2001-05-15 10:32",
        "level": "S",
        "expected_score": 100,
        "description": "完美匹配 - 7/7层全同"
    },
    
    # Level A: ~85% (只改"分")
    {
        "uid": 5101,
        "birth": "2001-05-15 10:33",
        "level": "A",
        "expected_score": 80,  # 100 - 20 (minute)
        "description": "改分钟 - 6/7层匹配"
    },
    
    # Level B: ~65% (改"刻"和"分")
    {
        "uid": 5201,
        "birth": "2001-05-15 10:46",  # ✅ Fixed: 46//15=3, different quarter
        "level": "B",
        "expected_score": 65,  # 100 - 15 (quarter) - 20 (minute)
        "description": "改刻+分 - 5/7层匹配"
    },
    
    # Level C: ~55% (改"小时")
    {
        "uid": 5301,
        "birth": "2001-05-15 09:32",
        "level": "C",
        "expected_score": 45,  # 100 - 20 (hour) - 15 (quarter) - 20 (minute)
        "description": "改小时 - 4/7层匹配"
    },
    
    # Level D: ~40% (改"时辰")
    {
        "uid": 5401,
        "birth": "2001-05-15 08:32",
        "level": "D",
        "expected_score": 30,  # 100 - 15 (shichen) - 20 (hour) - 15 (quarter) - 20 (minute)
        "description": "改时辰 辰时 - 3/7层匹配"
    },
    
    # Level E: ~25% (改"日")
    {
        "uid": 5501,
        "birth": "2001-05-16 10:32",
        "level": "E",
        "expected_score": 15,  # 只有year+month匹配
        "description": "改日期 - 2/7层匹配"
    },
    
    # Level F: ~10% (只保留同年同月)
    {
        "uid": 5601,
        "birth": "2001-05-22 15:11",
        "level": "F",
        "expected_score": 15,  # 只有year+month匹配
        "description": "只同年月 - 2/7层匹配"
    },
]

def parse_birth(birth_str):
    """Parse birth time to 7-level structure"""
    dt = datetime.strptime(birth_str, "%Y-%m-%d %H:%M")
    
    year = dt.year
    month = dt.month
    day = dt.day
    hour = dt.hour
    minute = dt.minute
    
    chinese_shichen = SHICHEN_MAP.get(hour, '子')
    quarter_15min = minute // 15
    
    # Legacy backup
    point_column = minute
    ke_column = quarter_15min
    fen_column = 0  # Legacy field (deprecated, set to 0)
    micro_fen_column = 0  # Legacy field (deprecated, set to 0)
    
    time_layer_code = f"{year:04d}{month:02d}{day:02d}{hour:02d}{minute:02d}"
    
    return {
        "year": year,
        "month": month,
        "day": day,
        "hour": hour,
        "chinese_shichen": chinese_shichen,
        "minute": minute,
        "quarter_15min": quarter_15min,
        "point_column": point_column,
        "ke_column": ke_column,
        "fen_column": fen_column,  # ✅ Added for NOT NULL constraint
        "micro_fen_column": micro_fen_column,  # ✅ Added for NOT NULL constraint
        "time_layer_code": time_layer_code,
    }

def generate_gradient_seeds():
    """Generate controlled gradient seed users"""
    client = get_supabase_client()
    
    print("=" * 80)
    print("🧪 TimeMatch Controlled Gradient Seed Test System")
    print("=" * 80)
    print(f"📊 Base: 2001-05-15 10:32 (巳时)")
    print(f"📊 Generating {len(GRADIENT_SEEDS)} users (1 base + 7 levels)")
    print("=" * 80)
    
    for seed in GRADIENT_SEEDS:
        chart_id = seed["uid"]
        birth_str = seed["birth"]
        level = seed["level"]
        expected_score = seed["expected_score"]
        desc = seed["description"]
        
        time_data = parse_birth(birth_str)
        time_data["chart_id"] = chart_id
        
        print(f"\n[{level}] User #{chart_id}: {birth_str}")
        print(f"    描述: {desc}")
        print(f"    期望分数: {expected_score}%")
        print(f"    时辰:{time_data['chinese_shichen']} | "
              f"时:{time_data['hour']:02d} | "
              f"刻:{time_data['quarter_15min']} | "
              f"分:{time_data['minute']:02d}")
        
        try:
            existing = client.table("chart_time_layers_v2")\
                .select("chart_id")\
                .eq("chart_id", chart_id)\
                .execute()
            
            if existing.data:
                print(f"    ⚠️  Updating existing user...")
                client.table("chart_time_layers_v2")\
                    .update(time_data)\
                    .eq("chart_id", chart_id)\
                    .execute()
            else:
                print(f"    ✅ Creating new user...")
                client.table("chart_time_layers_v2")\
                    .insert(time_data)\
                    .execute()
        
        except Exception as e:
            print(f"    ❌ Error: {e}")
    
    print("\n" + "=" * 80)
    print("✅ Gradient seed generation complete!")
    print("=" * 80)
    print("\n⚠️  CRITICAL: Only seed_5001 should score 100%")
    print("    All others must be <100%\n")

if __name__ == "__main__":
    generate_gradient_seeds()
