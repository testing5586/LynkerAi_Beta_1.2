# engines/time_match_agent.py
from lynker_bazi_engine.supabase_client import get_supabase_client

def get_base_time_layer(chart_id: int):
    """获取当前命盘的时间层数据"""
    if chart_id is None:
        return None
    client = get_supabase_client()
    res = (
        client.table("chart_time_layers_v2")
        .select("*")
        .eq("chart_id", chart_id)
        .limit(1)
        .execute()
    )
    return res.data[0] if res.data else None

def build_time_match_filter(base, mode: str):
    """
    构建递进锁链式匹配条件 (7-Level Structure)
    
    Hierarchy: year → month → day → shichen → hour → quarter → minute
    """
    where = {"year": base["year"]}

    # ✅ 7-Level Cascading Filters
    if mode in ("same_month", "same_day", "same_shichen", "same_hour", "same_quarter", "same_minute"):
        where["month"] = base["month"]
    
    if mode in ("same_day", "same_shichen", "same_hour", "same_quarter", "same_minute"):
        where["day"] = base["day"]
    
    # Layer 4: Cultural Dimension (时辰)
    if mode in ("same_shichen", "same_hour", "same_quarter", "same_minute"):
        where["chinese_shichen"] = base.get("chinese_shichen", "子")
    
    # Layer 5-7: Modern Precision
    if mode in ("same_hour", "same_quarter", "same_minute"):
        where["hour"] = base["hour"]
    
    if mode in ("same_quarter", "same_minute"):
        where["quarter_15min"] = base.get("quarter_15min", 0)
    
    if mode in ("same_minute",):
        where["minute"] = base.get("minute", 0)
    
    return where

from engines.match_score_engine import calculate_match_score
from db.match_scores_db import save_match_score

def find_time_matches(chart_id: int, mode: str):
    """查找匹配灵友"""
    base = get_base_time_layer(chart_id)
    if not base:
        return []

    where = build_time_match_filter(base, mode)
    client = get_supabase_client()
    query = client.table("chart_time_layers_v2").select("*")
    for k, v in where.items():
        query = query.eq(k, v)
    query = query.neq("chart_id", chart_id)
    res = query.execute()
    
    matches = []
    if res.data:
        for candidate in res.data:
            # 统一评分计算 (传入已获取的数据以优化性能)
            score_res = calculate_match_score(
                chart_id, 
                candidate['chart_id'], 
                engine='time', 
                data_a=base, 
                data_b=candidate
            )
            
            # 保存评分到统一表
            save_match_score(chart_id, candidate['chart_id'], 'time', score_res)
            
            # ✅ 隐私保护：构造返回数据时排除敏感字段
            # time_layer_code 仅用于后端算法，不向前端暴露
            match_result = {
                'chart_id': candidate['chart_id'],
                'match_score': score_res['score'],
                'matched_rules': score_res['matched_rules'],
                # ❌ 'time_layer_code': candidate.get('time_layer_code'),  # 已移除
                # 'year', 'month', 'day', 'hour' 等字段也不返回，防止逆推
            }
            matches.append(match_result)
            
    return matches

def build_criteria_text(mode: str):
    """构建中文匹配层级说明 (7-Level Structure)"""
    steps = [
        ("same_year", "同年"),
        ("same_month", "同月"),
        ("same_day", "同日"),
        ("same_shichen", "同时辰"),   # ✅ NEW: 文化维度
        ("same_hour", "同小时"),      # ✅ Updated
        ("same_quarter", "同刻"),     # ✅ Renamed (15分钟)
        ("same_minute", "同分"),      # ✅ Renamed (分钟级)
    ]
    active_idx = next((i for i, s in enumerate(steps) if s[0] == mode), -1)
    return " + ".join(steps[i][1] for i in range(active_idx + 1))
