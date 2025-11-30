"""
重新计算所有 TimeMatch 评分
Recalculate all TimeMatch scores with fixed formula
"""

from supabase_client import get_supabase_client
from engines.match_score_engine import calculate_match_score

def recalculate_time_scores():
    """重新计算所有time引擎的评分"""
    client = get_supabase_client()
    
    print("=" * 70)
    print("🔄 重新计算 TimeMatch 评分")
    print("=" * 70)
    
    # 获取所有time评分记录
    res = client.table("match_scores")\
        .select("*")\
        .eq("engine_type", "time")\
        .execute()
    
    records = res.data if res.data else []
    print(f"找到 {len(records)} 条记录")
    
    if not records:
        print("无记录需要更新")
        return
   
    updated = 0
    
    for record in records:
        chart_id_a = record["chart_id_a"]
        chart_id_b = record["chart_id_b"]
        old_score = record["score"]
        
        try:
            # 重新计算
            score_res = calculate_match_score(
                chart_id_a,
                chart_id_b,
                engine='time'
            )
            
            new_score = score_res['score']
            
            if new_score != old_score:
                print(f"  更新 {chart_id_a} x {chart_id_b}: {old_score} → {new_score}")
                
                # 更新数据库
                client.table("match_scores")\
                    .update({
                        "score": new_score,
                        "matched_rules": score_res.get('matched_rules', [])
                    })\
                    .eq("id", record["id"])\
                    .execute()
                
                updated += 1
            else:
                print(f"  跳过 {chart_id_a} x {chart_id_b}: 分数未变 ({old_score})")
                
        except Exception as e:
            print(f"  ❌ 失败 {chart_id_a} x {chart_id_b}: {e}")
            continue
    
    print("-" * 70)
    print(f"✅ 完成: 更新 {updated}/{len(records)} 条记录")
    print("=" * 70)

if __name__ == "__main__":
    recalculate_time_scores()
