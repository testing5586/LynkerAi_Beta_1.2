"""
灵客引擎 · 同命排行榜引擎
Leaderboard Engine for Same-Life Matching
适配统一评分表 match_scores
"""

from typing import List, Dict, Any, Optional, Tuple
from lynker_bazi_engine.supabase_client import get_supabase_client

def get_dynamic_leaderboard(engine: str = "time", limit: int = 10, exclude_user_id: Optional[int] = None) -> List[Dict[str, Any]]:
    """
    基于 match_scores 表动态计算排行榜
    
    Args:
        engine: 'time' | 'bazi'
        limit: 返回数量
        exclude_user_id: 排除的用户ID（通常是当前搜索用户）
    """
    try:
        client = get_supabase_client()
        
        res = client.table("match_scores")\
            .select("*")\
            .eq("engine_type", engine)\
            .order("score", desc=True)\
            .limit(1000)\
            .execute()
            
        matches = res.data if res.data else []
        
        # 内存聚合
        stats = {}
        
        for m in matches:
            u1 = m["chart_id_a"]
            u2 = m["chart_id_b"]
            score = m["score"]
            verified = m.get("verified_count", 0) > 0
            
            for uid in [u1, u2]:
                # ✅ 排除当前用户
                if exclude_user_id is not None and uid == exclude_user_id:
                    continue
                    
                if uid not in stats:
                    stats[uid] = {
                        "total_score": 0,
                        "count": 0,
                        "verified": 0
                    }
                stats[uid]["total_score"] += score
                stats[uid]["count"] += 1
                if verified:
                    stats[uid]["verified"] += 1
                    
        # 计算最终得分并排序
        # 使用引擎专属评分逻辑
        leaderboard = []
        for uid, s in stats.items():
            match_count = s["count"]
            
            # === TimeMatch 专用逻辑 ===
            if engine == "time":
                # 🌟 频率共振哲学：取历史最高分（峰值共振）
                # 而非平均分（统计学系统）
                max_score = max(
                    [m["score"] for m in matches if uid in [m["chart_id_a"], m["chart_id_b"]]],
                    default=0
                )
                
                # 1. 基础分：峰值共振分数
                final_score = max_score / 100.0
                
                # 🌟 修正逻辑：完美共振豁免权
                # 如果达到100分（完美同频），直接给100%，无视样本衰减
                if max_score >= 100:
                    final_score = 1.0
                else:
                    # 2. 样本衰减系数：少于5次匹配自动降权
                    if match_count < 5:
                        final_score *= 0.85
                    
                    # 3. 防止非完美分数的100%泛滥
                    if final_score >= 0.99:
                        final_score = 0.97
                
                avg_score = s["total_score"] / s["count"]  # 仅用于展示
            
            # === BaziMatch 专用逻辑 ===
            elif engine == "bazi":
                # 传统八字使用纯平均分（已在四柱评分中区分）
                avg_score = s["total_score"] / s["count"]
                max_score = max(
                    [m["score"] for m in matches if uid in [m["chart_id_a"], m["chart_id_b"]]],
                    default=0
                )
                final_score = avg_score / 100.0
            
            else:
                # 默认逻辑
                avg_score = s["total_score"] / s["count"]
                max_score = avg_score
                final_score = avg_score / 100.0
            
            leaderboard.append({
                "user_id": uid, 
                "chart_id": uid,
                "match_count": s["count"],
                "verified_count": s["verified"],
                "final_score": final_score,  # 用于排序
                "display_score": max_score,  # ✅ 用于前端显示（原始分数）
                "avg_score": avg_score
            })
            
        leaderboard.sort(key=lambda x: x["final_score"], reverse=True)
        
        # 添加排名
        for i, item in enumerate(leaderboard):
            item['rank'] = i + 1
            
        return leaderboard[:limit]
        
    except Exception as e:
        print(f"[Leaderboard] Calculate failed: {e}")
        return []

# ========================================================
# 旧接口兼容 (Deprecated / Adapted)
# ========================================================

def get_top_leaderboard(limit: int = 10) -> List[Dict[str, Any]]:
    """兼容旧接口，默认返回 time 榜单"""
    return get_dynamic_leaderboard("time", limit)

def get_latest_weight_version() -> Optional[Dict[str, Any]]:
    """获取最新的权重版本记录"""
    try:
        client = get_supabase_client()
        res = client.table("weight_versions").select("*").order("created_at", desc=True).limit(1).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        print(f"Get weight version failed: {e}")
        return None

def calculate_leaderboard(weight_version_id: Optional[int] = None) -> List[Dict[str, Any]]:
    """兼容接口：计算排行榜"""
    # 忽略权重版本，直接返回动态榜单
    return get_dynamic_leaderboard("time")

def recalculate_leaderboard(weight_version_id: Optional[int] = None) -> Dict[str, Any]:
    """兼容接口：重新计算排行榜"""
    lb = get_dynamic_leaderboard("time")
    return {
        "leaderboard": lb,
        "weight_version_id": weight_version_id
    }

def get_user_rank(user_id: int) -> Optional[Dict[str, Any]]:
    """获取指定用户的排名信息"""
    # 从动态榜单中查找
    # 注意：这里效率较低，生产环境应直接查询数据库或缓存
    lb = get_dynamic_leaderboard("time", limit=1000)
    for item in lb:
        if item["user_id"] == user_id:
            return item
    return None
