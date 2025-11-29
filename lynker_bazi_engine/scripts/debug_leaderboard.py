"""
调试排行榜数据
Debug leaderboard data discrepancy
"""

from supabase_client import get_supabase_client

def debug_leaderboard():
    client = get_supabase_client()
    
    print("=" * 60)
    print("🔍 DEBUGGING BAZI LEADERBOARD DATA")
    print("=" * 60)
    
    # 1. 获取所有 bazi 评分记录
    res = client.table("match_scores")\
        .select("*")\
        .eq("engine_type", "bazi")\
        .order("score", desc=True)\
        .execute()
    
    records = res.data if res.data else []
    
    print(f"\n📊 Raw database records ({len(records)} total):")
    print("-" * 60)
    for r in records:
        print(f"  {r['chart_id_a']} x {r['chart_id_b']}: score={r['score']}")
    
    # 2. 模拟排行榜聚合逻辑
    stats = {}
    
    for m in records:
        u1 = m["chart_id_a"]
        u2 = m["chart_id_b"]
        score = m["score"]
        
        for uid in [u1, u2]:
            if uid not in stats:
                stats[uid] = {
                    "total_score": 0,
                    "count": 0
                }
            stats[uid]["total_score"] += score
            stats[uid]["count"] += 1
    
    print(f"\n📈 Aggregated stats:")
    print("-" * 60)
    for uid, s in sorted(stats.items()):
        avg_score = s["total_score"] / s["count"]
        final_score = avg_score / 100.0
        print(f"  User #{uid}:")
        print(f"    Total: {s['total_score']}, Count: {s['count']}")
        print(f"    Avg: {avg_score:.1f}, Final: {final_score:.2%}")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    debug_leaderboard()
