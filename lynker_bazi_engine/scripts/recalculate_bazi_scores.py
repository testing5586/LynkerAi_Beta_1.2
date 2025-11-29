"""
重新计算所有八字匹配分数
Re-calculate all Bazi match scores with new traditional formula
"""

from supabase_client import get_supabase_client
from engines.match_score_engine import calculate_match_score

def recalculate_bazi_scores():
    """更新所有 bazi 引擎的评分为新公式"""
    client = get_supabase_client()
    
    # 1. 获取所有 bazi 引擎的评分记录
    print("📊 Fetching all bazi scores...")
    res = client.table("match_scores")\
        .select("*")\
        .eq("engine_type", "bazi")\
        .execute()
    
    records = res.data if res.data else []
    print(f"Found {len(records)} bazi score records")
    
    if not records:
        print("No records to update")
        return
    
    updated_count = 0
    
    for record in records:
        chart_id_a = record["chart_id_a"]
        chart_id_b = record["chart_id_b"]
        old_score = record["score"]
        
        # 2. 重新计算评分
        try:
            score_res = calculate_match_score(
                chart_id_a, 
                chart_id_b, 
                engine='bazi'
            )
            
            new_score = score_res['score']
            
            # 只有分数变化时才更新
            if new_score != old_score:
                print(f"  Updating {chart_id_a} x {chart_id_b}: {old_score} → {new_score}")
                
                # 3. 更新数据库
                client.table("match_scores")\
                    .update({
                        "score": new_score,
                        "matched_rules": score_res.get('matched_rules', [])
                    })\
                    .eq("id", record["id"])\
                    .execute()
                
                updated_count += 1
            
        except Exception as e:
            print(f"  ⚠️ Failed to update {chart_id_a} x {chart_id_b}: {e}")
            continue
    
    print(f"\n✅ Updated {updated_count}/{len(records)} records")
    print("🔄 Please refresh the page to see updated leaderboard")

if __name__ == "__main__":
    recalculate_bazi_scores()
