"""
Test and Validate Gradient Seed System
Calculates all scores and generates test report
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from supabase_client import get_supabase_client
from engines.match_score_engine import calculate_match_score
from db.match_scores_db import save_match_score

BASE_USER = 5000
GRADIENT_USERS = [5000, 5001, 5101, 5201, 5301, 5401, 5501, 5601]

EXPECTED_SCORES = {
    5000: {"level": "BASE", "expected": 100, "desc": "主基准用户"},
    5001: {"level": "S", "expected": 100, "desc": "完美匹配"},
    5101: {"level": "A", "expected": 80, "desc": "改分钟"},
    5201: {"level": "B", "expected": 65, "desc": "改刻+分"},
    5301: {"level": "C", "expected": 45, "desc": "改小时"},
    5401: {"level": "D", "expected": 30, "desc": "改时辰"},
    5501: {"level": "E", "expected": 15, "desc": "改日期"},
    5601: {"level": "F", "expected": 15, "desc": "只同年月"},
}

def test_gradient_scores():
    """Calculate and validate gradient scores"""
    client = get_supabase_client()
    
    print("=" * 80)
    print("🧪 Gradient Seed Test - Score Validation")
    print("=" * 80)
    print(f"Base User: #{BASE_USER} (2001-05-15 10:32)")
    print("=" * 80)
    
    # Fetch base user data
    base_res = client.table("chart_time_layers_v2")\
        .select("*")\
        .eq("chart_id", BASE_USER)\
        .execute()
    
    if not base_res.data:
        print(f"❌ Base user #{BASE_USER} not found!")
        return
    
    base_data = base_res.data[0]
    print(f"\n📊 Base User Fields:")
    print(f"   year={base_data['year']}, month={base_data['month']}, day={base_data['day']}")
    print(f"   shichen={base_data['chinese_shichen']}, hour={base_data['hour']}")
    print(f"   quarter={base_data['quarter_15min']}, minute={base_data['minute']}")
    
    # Calculate scores
    results = []
    perfect_matches = 0
    
    print("\n" + "=" * 80)
    print("📊 Match Score Results")
    print("=" * 80)
    
    for target_id in GRADIENT_USERS:
        if target_id == BASE_USER:
            continue
        
        expected_data = EXPECTED_SCORES[target_id]
        level = expected_data["level"]
        expected_score = expected_data["expected"]
        desc = expected_data["desc"]
        
        # Calculate score
        score_result = calculate_match_score(BASE_USER, target_id, engine='time')
        actual_score = score_result['score']
        matched_rules = score_result['matched_rules']
        
        # Save to database
        save_match_score(BASE_USER, target_id, 'time', score_result)
        
        # Check for 100%
        if actual_score >= 100:
            perfect_matches += 1
        
        # Validation
        score_match = (actual_score == expected_score)
        status = "✅" if score_match else "❌"
        
        print(f"\n[{level}] User #{target_id}: {desc}")
        print(f"    期望分数: {expected_score}%")
        print(f"    实际分数: {actual_score}% {status}")
        print(f"    命中层级: {len(matched_rules)}/7 - {', '.join(matched_rules)}")
        
        results.append({
            "uid": target_id,
            "level": level,
            "expected": expected_score,
            "actual": actual_score,
            "match": score_match,
            "layers": len(matched_rules),
            "rules": matched_rules
        })
    
    # Final validation
    print("\n" + "=" * 80)
    print("🔍 Integrity Check")
    print("=" * 80)
    
    if perfect_matches > 1:
        print(f"❌ ERROR: Multiple 100% matches detected – integrity violation!")
        print(f"   Found {perfect_matches} users with 100% score")
        print(f"   Only seed_5001 should score 100%")
    elif perfect_matches == 1:
        print(f"✅ PASS: Only 1 user scored 100% (as expected)")
    else:
        print(f"⚠️  WARNING: No 100% matches found")
    
    # Score accuracy check
    all_match = all(r["match"] for r in results)
    if all_match:
        print(f"✅ PASS: All scores match expected values")
    else:
        failed = [r for r in results if not r["match"]]
        print(f"❌ FAIL: {len(failed)} scores don't match expected values")
        for f in failed:
            print(f"   - #{f['uid']} ({f['level']}): expected {f['expected']}%, got {f['actual']}%")
    
    print("\n" + "=" * 80)
    print("📋 Test Summary")
    print("=" * 80)
    print(f"Total Users Tested: {len(results)}")
    print(f"Perfect Matches (100%): {perfect_matches}")
    print(f"Score Accuracy: {sum(1 for r in results if r['match'])}/{len(results)} correct")
    print(f"Overall Status: {'✅ PASS' if all_match and perfect_matches == 1 else '❌ FAIL'}")
    print("=" * 80)
    
    return results

if __name__ == "__main__":
    test_gradient_scores()
