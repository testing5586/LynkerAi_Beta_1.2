"""
灵客引擎 · 八字同频匹配引擎 v3
Bazi Match Agent for Soul-Level Matching (传统友好版)

核心变化：
1）采用「四柱为主、结构为辅」的评分体系：
    - 同年柱：20 分
    - 同年月柱：40 分
    - 同年月日柱：70 分
    - 同年月日时柱：100 分（真正同命）
2）同天干结构 / 同地支结构 / 同格局 / 同用神
    → 仅作为「研究型选项」，不直接拉高基础分
    → 当四柱完全相同（100 分）时，自动视为全部满足（auto_derived = True）
3）返回给前端完整的 matched_flags，方便 UI 展示与自动勾选。
"""

from typing import List, Dict, Any, Optional, Tuple
from lynker_bazi_engine.supabase_client import get_supabase_client


# ============================================================
# 工具函数：计算匹配 profile & 评分
# ============================================================

def _compute_match_flags(base: Dict[str, Any],
                         cand: Dict[str, Any]) -> Dict[str, bool]:
    """
    对比基准八字与候选八字，计算 8 个维度的布尔匹配情况
    """
    flags = {
        "same_year_pillar": False,
        "same_month_pillar": False,
        "same_day_pillar": False,
        "same_hour_pillar": False,
        "same_tiangan": False,
        "same_dizhi": False,
        "same_pattern": False,
        "same_yongshen": False,
    }

    # 四柱
    if base.get("year_pillar") and cand.get("year_pillar"):
        flags["same_year_pillar"] = (base["year_pillar"] == cand["year_pillar"])

    if flags["same_year_pillar"] and base.get("month_pillar") and cand.get("month_pillar"):
        flags["same_month_pillar"] = (base["month_pillar"] == cand["month_pillar"])

    if flags["same_month_pillar"] and base.get("day_pillar") and cand.get("day_pillar"):
        flags["same_day_pillar"] = (base["day_pillar"] == cand["day_pillar"])

    if flags["same_day_pillar"] and base.get("hour_pillar") and cand.get("hour_pillar"):
        flags["same_hour_pillar"] = (base["hour_pillar"] == cand["hour_pillar"])

    # 结构项（仅作研究用）
    if base.get("tiangan_structure") and cand.get("tiangan_structure"):
        flags["same_tiangan"] = (base["tiangan_structure"] == cand["tiangan_structure"])

    if base.get("dizhi_structure") and cand.get("dizhi_structure"):
        flags["same_dizhi"] = (base["dizhi_structure"] == cand["dizhi_structure"])

    if base.get("pattern_type") and cand.get("pattern_type"):
        flags["same_pattern"] = (base["pattern_type"] == cand["pattern_type"])

    if base.get("yongshen") and cand.get("yongshen"):
        flags["same_yongshen"] = (base["yongshen"] == cand["yongshen"])

    return flags


def _compute_score_and_text(flags: Dict[str, bool]) -> Tuple[int, str]:
    """
    根据四柱匹配情况计算评分与条件文本
    评分规则（传统友好版）：
        - 同年柱：20 分
        - 同年 + 同月：40 分
        - 同年 + 同月 + 同日：70 分
        - 同年 + 同月 + 同日 + 同时：100 分
    """
    score = 0
    parts = []

    if flags["same_year_pillar"]:
        score = max(score, 20)
        parts.append("同年柱")
    if flags["same_month_pillar"]:
        score = max(score, 40)
        parts.append("同月柱")
    if flags["same_day_pillar"]:
        score = max(score, 70)
        parts.append("同日柱")
    if flags["same_hour_pillar"]:
        score = max(score, 100)
        parts.append("同时柱")

    # 结构项只参与文案，不直接加分
    if flags["same_tiangan"]:
        parts.append("同天干结构")
    if flags["same_dizhi"]:
        parts.append("同地支结构")
    if flags["same_pattern"]:
        parts.append("同格局")
    if flags["same_yongshen"]:
        parts.append("同用神")

    criteria_text = " · ".join(parts) if parts else "暂无有效匹配条件"

    return score, criteria_text


def _apply_auto_derived_structures(flags: Dict[str, bool]) -> Dict[str, bool]:
    """
    Auto-derive 逻辑：
    只要四柱完全相同（同年 + 同月 + 同日 + 同时），
    则自动视为结构项全部成立（供 UI 自动打勾用）。
    """
    if flags["same_hour_pillar"]:
        flags["same_tiangan"] = True
        flags["same_dizhi"] = True
        flags["same_pattern"] = True
        flags["same_yongshen"] = True
    return flags


def _score_label(score: int) -> str:
    """
    返回类似"75分匹配"的文字，方便前端直接显示
    """
    return f"{score}分匹配"


# ============================================================
# 核心数据获取
# ============================================================

def get_base_bazi(chart_id: int) -> Optional[Dict[str, Any]]:
    """
    获取基准八字数据，如果不存在则创建一条默认记录（方便测试）
    """
    try:
        client = get_supabase_client()
        res = (
            client.table("chart_bazi_layers")
            .select("*")
            .eq("chart_id", chart_id)
            .limit(1)
            .execute()
        )

        if res.data and len(res.data) > 0:
            return res.data[0]

        # 不存在时，写入一条默认八字（仅做防呆，不涉及真实业务）
        print(f"[BaziMatchAgent] 未找到 chart_id={chart_id} 的八字数据，创建默认记录。")
        default_bazi = {
            "chart_id": chart_id,
            "year_pillar": "庚辰",
            "month_pillar": "戊寅",
            "day_pillar": "丁未",
            "hour_pillar": "壬子",
            "tiangan_structure": "庚戊丁壬",
            "dizhi_structure": "辰寅未子",
            "pattern_type": "正财格",
            "yongshen": "木",
            "bazi_code": "庚辰-戊寅-丁未-壬子",
        }

        insert_res = client.table("chart_bazi_layers").insert(default_bazi).execute()
        if insert_res.data:
            return insert_res.data[0]

        return default_bazi

    except Exception as e:
        print(f"[BaziMatchAgent] 获取八字数据失败: {e}")
        import traceback
        traceback.print_exc()
        return None


# ============================================================
# 候选集获取（按最低过滤条件：mode）
# ============================================================

def _fetch_candidates(base: Dict[str, Any], mode: str) -> List[Dict[str, Any]]:
    """
    根据 mode 设定「最低过滤条件」，从 Supabase 拉一批候选记录。

    mode 兼容旧版：
        same_year_pillar   -> 只要求同年
        same_month_pillar  -> 至少同年 + 同月
        same_day_pillar    -> 至少同年 + 同月 + 同日
        same_hour_pillar   -> 至少同年 + 同月 + 同日 + 同时
        same_tiangan       -> 至少同年+月+日+时，并且同天干结构
        same_dizhi         -> 同上 + 同地支结构
        same_pattern       -> 同上 + 同格局
        same_yongshen      -> 同上 + 同用神（最严格，几乎完全同命）
    """
    client = get_supabase_client()
    q = client.table("chart_bazi_layers").select("*").neq("chart_id", base["chart_id"])

    # 基础：四柱递进
    if mode in ("same_year_pillar",
                "same_month_pillar",
                "same_day_pillar",
                "same_hour_pillar",
                "same_tiangan",
                "same_dizhi",
                "same_pattern",
                "same_yongshen"):
        if base.get("year_pillar"):
            q = q.eq("year_pillar", base["year_pillar"])

    if mode in ("same_month_pillar",
                "same_day_pillar",
                "same_hour_pillar",
                "same_tiangan",
                "same_dizhi",
                "same_pattern",
                "same_yongshen"):
        if base.get("month_pillar"):
            q = q.eq("month_pillar", base["month_pillar"])

    if mode in ("same_day_pillar",
                "same_hour_pillar",
                "same_tiangan",
                "same_dizhi",
                "same_pattern",
                "same_yongshen"):
        if base.get("day_pillar"):
            q = q.eq("day_pillar", base["day_pillar"])

    if mode in ("same_hour_pillar",
                "same_tiangan",
                "same_dizhi",
                "same_pattern",
                "same_yongshen"):
        if base.get("hour_pillar"):
            q = q.eq("hour_pillar", base["hour_pillar"])

    # 结构项逐层追加（这些只是筛选，不影响评分规则）
    if mode in ("same_tiangan", "same_dizhi", "same_pattern", "same_yongshen"):
        if base.get("tiangan_structure"):
            q = q.eq("tiangan_structure", base["tiangan_structure"])

    if mode in ("same_dizhi", "same_pattern", "same_yongshen"):
        if base.get("dizhi_structure"):
            q = q.eq("dizhi_structure", base["dizhi_structure"])

    if mode in ("same_pattern", "same_yongshen"):
        if base.get("pattern_type"):
            q = q.eq("pattern_type", base["pattern_type"])

    if mode in ("same_yongshen",):
        if base.get("yongshen"):
            q = q.eq("yongshen", base["yongshen"])

    res = q.limit(200).execute()
    return res.data or []


# ============================================================
# 主匹配函数
# ============================================================

# 为兼容旧接口保留这个映射（现在主要用于前端文案）
CRITERIA_TEXT_MAP = {
    "same_year_pillar": "同年柱",
    "same_month_pillar": "同年柱 · 同月柱",
    "same_day_pillar": "同年柱 · 同月柱 · 同日柱",
    "same_hour_pillar": "同年柱 · 同月柱 · 同日柱 · 同时柱",
    "same_tiangan": "四柱相同 · 同天干结构",
    "same_dizhi": "四柱相同 · 同天干结构 · 同地支结构",
    "same_pattern": "四柱相同 · 同天干结构 · 同地支结构 · 同格局",
    "same_yongshen": "四柱相同 · 同天干结构 · 同地支结构 · 同格局 · 同用神",
}


from engines.match_score_engine import calculate_match_score
from db.match_scores_db import save_match_score

def run_bazi_match(chart_id: int, mode: str = "same_year_pillar") -> List[Dict[str, Any]]:
    """
    执行八字匹配（v3 版）
    集成统一评分内核 + 数据库持久化
    """
    base = get_base_bazi(chart_id)
    if not base:
        print(f"[BaziMatchAgent] 无法获取 chart_id={chart_id} 的八字数据")
        return []

    # 1. 拉候选集（根据 mode 做最小过滤）
    candidates = _fetch_candidates(base, mode)

    results: List[Dict[str, Any]] = []

    # 2. 对每个候选进行评分 & 标记
    for cand in candidates:
        # 调用统一评分引擎
        score_res = calculate_match_score(
            chart_id, 
            cand['chart_id'], 
            engine='bazi', 
            data_a=base, 
            data_b=cand
        )
        
        # 保存到数据库
        save_match_score(chart_id, cand['chart_id'], 'bazi', score_res)
        
        # 转换格式适配前端
        matched_rules = set(score_res['matched_rules'])
        flags = {
            "same_year_pillar": "same_year_pillar" in matched_rules,
            "same_month_pillar": "same_month_pillar" in matched_rules,
            "same_day_pillar": "same_day_pillar" in matched_rules,
            "same_hour_pillar": "same_hour_pillar" in matched_rules,
            "same_tiangan": "same_tiangan" in matched_rules,
            "same_dizhi": "same_dizhi" in matched_rules,
            "same_pattern": "same_pattern" in matched_rules,
            "same_yongshen": "same_yongshen" in matched_rules,
        }
        
        score = score_res['score']
        
        # 没有任何有效匹配条件的，可以直接丢弃（可选）
        if score == 0:
            continue
            
        # 构建 criteria_text (简单复用之前的逻辑或基于 rules 生成)
        parts = []
        if flags["same_year_pillar"]: parts.append("同年柱")
        if flags["same_month_pillar"]: parts.append("同月柱")
        if flags["same_day_pillar"]: parts.append("同日柱")
        if flags["same_hour_pillar"]: parts.append("同时柱")
        if flags["same_tiangan"]: parts.append("同天干结构")
        if flags["same_dizhi"]: parts.append("同地支结构")
        if flags["same_pattern"]: parts.append("同格局")
        if flags["same_yongshen"]: parts.append("同用神")
        criteria_text = " · ".join(parts) if parts else "暂无有效匹配条件"

        item: Dict[str, Any] = {
            "chart_id": cand.get("chart_id"),
            "bazi_code": cand.get("bazi_code", "未知"),
            "score": score,
            "score_label": _score_label(score),
            "criteria_text": criteria_text,
            "matched_flags": flags,
            "auto_derived": score_res.get("auto_derived", False),
            # 方便前端展示的字段：
            "year_pillar": cand.get("year_pillar"),
            "month_pillar": cand.get("month_pillar"),
            "day_pillar": cand.get("day_pillar"),
            "hour_pillar": cand.get("hour_pillar"),
            "pattern_type": cand.get("pattern_type"),
            "yongshen": cand.get("yongshen"),
        }

        results.append(item)

    # 3. 默认按分数从高到低排序
    results.sort(key=lambda x: x["score"], reverse=True)

    return results


def build_bazi_criteria_text(mode: str) -> str:
    """
    兼容旧接口：返回"模式描述"
    （现在前端更推荐读取每条 result 里的 criteria_text）
    """
    return CRITERIA_TEXT_MAP.get(mode, "自定义匹配模式")
