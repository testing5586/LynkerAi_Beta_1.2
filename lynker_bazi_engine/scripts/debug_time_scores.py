"""
Debug TimeMatch leaderboard scores
"""

from supabase_client import get_supabase_client

def debug_time_scores():
    client = get_supabase_client()
    
    print("=" * 70)
    print("🔍 DEBUG: TimeMatch 排行榜分数")
    print("=" * 70)
    
    # Get all time scores
    res = client.table("match_scores")\
        .select("*")\
        .eq("engine_type", "time")\
        .order("score", desc=True)\
        .execute()
    
    records = res.data if res.data else []
    
    print(f"\n📊 原始评分记录 ({len(records)} 条):")
    print("-" * 70)
    for r in records:
        print(f"  {r['chart_id_a']} x {r['chart_id_b']}: score={r['score']}")
    
    # Aggregate by user
    stats = {}
    for m in records:
        for uid in [m["chart_id_a"], m["chart_id_b"]]:
            if uid not in stats:
                stats[uid] = {"total": 0, "count": 0, "scores": []}
            stats[uid]["total"] += m["score"]
            stats[uid]["count"] += 1
            stats[uid]["scores"].append(m["score"])
    
    print(f"\n📈 用户聚合统计:")
    print("-" * 70)
    for uid in sorted(stats.keys()):
        s = stats[uid]
        avg = s["total"] / s["count"]
        print(f"  User #{uid}:")
        print(f"    Count: {s['count']}, Scores: {s['scores']}")
        print(f"    Total: {s['total']}, Avg: {avg:.1f}")
        
        # Apply penalties
        final = avg / 100.0
        if s["count"] < 5:
            final *= 0.85
            print(f"    Final: {final:.2%} (样本衰减)")
        else:
            print(f"    Final: {final:.2%}")
    
    print("=" * 70)

if __name__ == "__main__":
    debug_time_scores()
