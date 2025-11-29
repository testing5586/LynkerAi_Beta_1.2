"""
测试新的峰值共振评分系统
Test new peak resonance scoring philosophy
"""

from supabase_client import get_supabase_client

def test_peak_resonance():
    client = get_supabase_client()
    
    print("=" * 70)
    print("🌟 测试峰值共振评分系统 (Peak Resonance Scoring)")
    print("=" * 70)
    
    # Fetch time scores
    res = client.table("match_scores")\
        .select("*")\
        .eq("engine_type", "time")\
        .order("score", desc=True)\
        .execute()
    
    matches = res.data if res.data else []
    
    # Aggregate
    stats = {}
    for m in matches:
        for uid in [m["chart_id_a"], m["chart_id_b"]]:
            if uid not in stats:
                stats[uid] = {"scores": [], "count": 0}
            stats[uid]["scores"].append(m["score"])
            stats[uid]["count"] += 1
    
    # Calculate with peak resonance
    results = []
    for uid, s in stats.items():
        max_score = max(s["scores"])
        avg_score = sum(s["scores"]) / len(s["scores"])
        count = s["count"]
        
        # Peak resonance
        final_score = max_score / 100.0
        
        # Sample decay
        if count < 5:
            final_score *= 0.85
            decay_note = "❌ 样本衰减(-15%)"
        else:
            decay_note = "✅ 无衰减"
        
        # 100% cap
        if final_score >= 0.99:
            if max_score >= 100 and count >= 3:
                final_score = 1.0
                cap_note = "✅ 允许100%"
            else:
                final_score = 0.97
                cap_note = f"⚠️ 上限97%"
        else:
            cap_note = "—"
        
        results.append({
            "user": uid,
            "max": max_score,
            "avg": avg_score,
            "count": count,
            "final": final_score,
            "decay": decay_note,
            "cap": cap_note
        })
    
    # Sort
    results.sort(key=lambda x: x["final"], reverse=True)
    
    # Display
    print("\n📊 峰值共振排行榜:\n")
    print(f"{'Rank':<6}{'User':<8}{'Max':<7}{'Avg':<7}{'Cnt':<5}{'Final':<9}{'Decay':<20}{'Cap':<30}")
    print("-" * 100)
    
    for i, r in enumerate(results[:15], 1):  # 显示前15名
        print(f"{i:<6}#{r['user']:<7}{r['max']:<7.0f}{r['avg']:<7.1f}{r['count']:<5}{r['final']*100:<8.1f}% {r['decay']:<20}{r['cap']:<30}")
    
    print("\n" + "=" * 70)
    print("🌟 核心哲学：")
    print("  - 使用 max_score (峰值频率) 而非 avg_score (统计平均)")
    print("  - 完美同频用户保持100% (样本≥3)")
    print("  - 少于5次样本自动降权15%")
    print("=" * 70)

if __name__ == "__main__":
    test_peak_resonance()
