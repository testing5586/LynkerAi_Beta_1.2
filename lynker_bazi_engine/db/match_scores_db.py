"""
Match Scores 数据库操作模块
处理匹配评分数据的 CRUD 操作
适配统一评分表 match_scores
"""

from typing import Dict, Any, Optional, List
from lynker_bazi_engine.supabase_client import get_supabase_client


def save_match_score(
    chart_id_a: int,
    chart_id_b: int,
    engine: str,
    score_data: Dict[str, Any]
) -> Optional[Dict[str, Any]]:
    """
    保存统一评分到 match_scores 表
    
    Args:
        chart_id_a: 命盘 A
        chart_id_b: 命盘 B
        engine: 'time' | 'bazi'
        score_data: {
            "score": int,
            "matched_rules": List[str],
            ...
        }
    """
    client = get_supabase_client()
    
    data = {
        "chart_id_a": chart_id_a,
        "chart_id_b": chart_id_b,
        "engine_type": engine,
        "score": score_data.get("score", 0),
        "matched_rules": score_data.get("matched_rules", []),
        "verified_count": score_data.get("verified_count", 0),
        "weight_version": score_data.get("weight_version", "v1")
    }
    
    # Upsert based on (chart_id_a, chart_id_b, engine_type)
    # Supabase upsert requires the conflict columns to be specified if not primary key
    try:
        result = client.table("match_scores").upsert(
            data, 
            on_conflict="chart_id_a, chart_id_b, engine_type"
        ).execute()
        
        if result.data:
            return result.data[0]
        return None
    except Exception as e:
        print(f"[DB] Save match score failed: {e}")
        return None


def get_match_score(
    chart_id_a: int, 
    chart_id_b: int, 
    engine: str = "time"
) -> Optional[Dict[str, Any]]:
    """
    查询统一评分
    """
    try:
        client = get_supabase_client()
        
        # 尝试查询 (a,b) 或 (b,a)
        # 注意：统一表设计时最好保证 a < b 或者双向存储。
        # 这里假设存储时已规范化，或者查询时双向查。
        # 为了简单，我们查询双向。
        
        result = client.table("match_scores")\
            .select("*")\
            .eq("engine_type", engine)\
            .or_(
                f"and(chart_id_a.eq.{chart_id_a},chart_id_b.eq.{chart_id_b}),"
                f"and(chart_id_a.eq.{chart_id_b},chart_id_b.eq.{chart_id_a})"
            )\
            .limit(1)\
            .execute()
            
        if result.data:
            return result.data[0]
        return None
        
    except Exception as e:
        print(f"[DB] Get match score failed: {e}")
        return None


def get_top_matches(chart_id: int, engine: str = "time", limit: int = 10) -> List[Dict[str, Any]]:
    """
    获取指定命盘的最佳匹配列表
    """
    try:
        client = get_supabase_client()
        
        result = client.table("match_scores")\
            .select("*")\
            .eq("engine_type", engine)\
            .or_(f"chart_id_a.eq.{chart_id},chart_id_b.eq.{chart_id}")\
            .order("score", desc=True)\
            .limit(limit)\
            .execute()
        
        return result.data if result.data else []
        
    except Exception as e:
        print(f"[DB] Get top matches failed: {e}")
        return []

# ========================================================
# 旧接口兼容 (Deprecated)
# ========================================================

def insert_match_score_legacy(chart_id_a, chart_id_b, match_data):
    """兼容旧代码的插入函数"""
    # 简单映射到新表
    return save_match_score(chart_id_a, chart_id_b, "time", {
        "score": match_data.get("composite_score", 0),
        "matched_rules": [], # 旧数据可能没有这个字段
        "verified_count": 0
    })

# Aliases for backward compatibility
insert_match_score = insert_match_score_legacy
upsert_match_score = insert_match_score_legacy

