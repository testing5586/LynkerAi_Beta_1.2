"""
测试 TimeMatchAgent 新评分系统
Test new TimeMatch scoring with penalties
"""

from supabase_client import get_supabase_client

def test_time_scoring():
    client = get_supabase_client()
    
    print("=" * 70)
    print("🧪 TESTING NEW TIMEMATCH LEADERBOARD SCORING")
    print("=" * 70)
    
    # Fetch time engine scores
    res = client.table("match_scores")\
        .select("*")\
        .eq("engine_type", "time")\
        .order("score", desc=True)\
        .execute()
    
    records = res.data if res.data else []
    
    # Aggregate
    stats = {}
    for m in records:
        for uid in [m["chart_id_a"], m["chart_id_b"]]:
            if uid not in stats:
                stats[uid] = {"total_score": 0, "count": 0}
            stats[uid]["total_score"] += m["score"]
            stats[uid]["count"] += 1
    
    # Calculate final scores with penalties
    results = []
    for uid, s in stats.items():
        avg_score = s["total_score"] / s["count"]
        match_count = s["count"]
        
        # Apply TimeMatch scoring rules
        final_score = avg_score / 100.0
        
        # Sample decay
        if match_count < 5:
            final_score *= 0.85
            penalty_note = f"❌ 样本衰减(-15%)"
        else:
            penalty_note = "✅ 无衰减"
        
        # 100% prevention
        if final_score >= 0.99:
            if avg_score >= 100 and match_count >= 3:
                final_score = 1.0
                cap_note = "✅ 允许100%"
            else:
                final_score = 0.97
                cap_note = f"⚠️ 上限97% (avg={avg_score:.0f}, cnt={match_count})"
        else:
            cap_note = "—"
        
        results.append({
            "user": uid,
            "avg": avg_score,
            "count": match_count,
            "final": final_score,
            "penalty": penalty_note,
            "cap": cap_note
        })
    
    # Sort by final score
    results.sort(key=lambda x: x["final"], reverse=True)
    
    # Display
    print("\n📊 SCORING BREAKDOWN:\n")
    print(f"{'Rank':<6}{'User':<8}{'Avg':<8}{'Count':<7}{'Final':<9}{'Penalty':<20}{'Cap Note':<30}")
    print("-" * 100)
    
    for i, r in enumerate(results, 1):
        print(f"{i:<6}#{r['user']:<7}{r['avg']:<8.1f}{r['count']:<7}{r['final']*100:<8.1f}% {r['penalty']:<20}{r['cap']:<30}")
    
    print("\n" + "=" * 70)
    print("✅ SCORING RULES APPLIED:")
    print("  1. Base score = avg_score / 100")
    print("  2. If count < 5: final_score *= 0.85")
    print("  3. If final >= 99%:")
    print("     - Allow 100% ONLY if avg=100 AND count>=3")
    print("     - Otherwise cap at 97%")
    print("=" * 70)

if __name__ == "__main__":
    test_time_scoring()
