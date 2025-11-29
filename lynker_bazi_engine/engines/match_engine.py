"""
灵客引擎 · 同命匹配引擎
Enhanced Match Engine with Three-Layer Scoring

权重配置（v1.0）：
- 时间结构：40%
- 父柱相似度：30%
- 母柱相似度：30%
"""

from typing import Dict, Any, List, Optional, Tuple
import math


# ========== 权重配置 ==========
DEFAULT_WEIGHTS = {
    "time": 40,
    "father": 30,
    "mother": 30
}


def calculate_time_score(chart_a: Dict[str, Any], chart_b: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """
    计算时间结构相似度评分
    
    Args:
        chart_a: 命盘 A 的时间数据
        chart_b: 命盘 B 的时间数据
        
    Returns:
        (score, details) - 评分(0-100)和详细信息
        
    时间数据格式示例:
    {
        "birth_time": "2000-03-20 08:18",
        "true_solar_time": "08:10"
    }
    """
    # TODO: 实际实现需要解析真太阳时并计算分钟差
    # 这里使用简化版本
    
    # 假设已经有分钟差数据
    time_diff_minutes = abs(
        chart_a.get("time_diff_minutes", 0) - 
        chart_b.get("time_diff_minutes", 0)
    )
    
    # 时间匹配模式判定
    if time_diff_minutes == 0:
        match_mode = "fen"  # 同分命
        score = 100
    elif time_diff_minutes <= 15:
        match_mode = "ke"  # 同期刻
        score = max(0, 100 - time_diff_minutes * 4)
    elif time_diff_minutes <= 60:
        match_mode = "point"  # 同点柱
        score = max(0, 100 - time_diff_minutes * 1.5)
    elif time_diff_minutes <= 120:
        match_mode = "hour"  # 同时辰
        score = max(0, 100 - time_diff_minutes * 0.8)
    else:
        match_mode = "none"
        score = max(0, 100 - time_diff_minutes * 0.5)
    
    details = {
        "time_match_mode": match_mode,
        "time_diff_minutes": time_diff_minutes
    }
    
    return int(score), details


def calculate_father_score(family_a: Dict[str, Any], family_b: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """
    计算父柱相似度评分
    
    使用欧氏距离计算 5 个维度的相似度：
    - presence (存在强度)
    - authority (权威投射)
    - resource (资源支持)
    - conflict (对抗张力)
    - distance (情感距离)
    
    Args:
        family_a: 命盘 A 的父母柱数据
        family_b: 命盘 B 的父母柱数据
        
    Returns:
        (score, details) - 评分(0-100)和详细信息
    """
    dimensions = [
        "father_presence",
        "father_authority",
        "father_resource",
        "father_conflict",
        "father_distance"
    ]
    
    # 计算各维度差异
    diffs = {}
    squared_diffs = 0
    
    for dim in dimensions:
        val_a = family_a.get(dim, 50)
        val_b = family_b.get(dim, 50)
        diff = abs(val_a - val_b)
        diffs[f"{dim}_diff"] = diff
        squared_diffs += diff ** 2
    
    # 欧氏距离
    euclidean_distance = math.sqrt(squared_diffs)
    
    # 最大可能距离（所有维度都是 100 的差异）
    max_distance = math.sqrt(5 * (100 ** 2))
    
    # 转换为相似度评分 (0-100)
    similarity = 100 * (1 - euclidean_distance / max_distance)
    score = max(0, min(100, similarity))
    
    details = diffs
    
    return int(score), details


def calculate_mother_score(family_a: Dict[str, Any], family_b: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """
    计算母柱相似度评分
    
    使用欧氏距离计算 5 个维度的相似度：
    - presence (存在强度)
    - bond (情感黏结)
    - nurture (滋养能力)
    - control (控制模式)
    - empty (缺失模式)
    
    Args:
        family_a: 命盘 A 的父母柱数据
        family_b: 命盘 B 的父母柱数据
        
    Returns:
        (score, details) - 评分(0-100)和详细信息
    """
    dimensions = [
        "mother_presence",
        "mother_bond",
        "mother_nurture",
        "mother_control",
        "mother_empty"
    ]
    
    # 计算各维度差异
    diffs = {}
    squared_diffs = 0
    
    for dim in dimensions:
        val_a = family_a.get(dim, 50)
        val_b = family_b.get(dim, 50)
        diff = abs(val_a - val_b)
        diffs[f"{dim}_diff"] = diff
        squared_diffs += diff ** 2
    
    # 欧氏距离
    euclidean_distance = math.sqrt(squared_diffs)
    
    # 最大可能距离
    max_distance = math.sqrt(5 * (100 ** 2))
    
    # 转换为相似度评分 (0-100)
    similarity = 100 * (1 - euclidean_distance / max_distance)
    score = max(0, min(100, similarity))
    
    details = diffs
    
    return int(score), details


def calculate_composite_match(
    chart_a: Dict[str, Any],
    chart_b: Dict[str, Any],
    family_a: Dict[str, Any],
    family_b: Dict[str, Any],
    weights: Optional[Dict[str, int]] = None
) -> Dict[str, Any]:
    """
    计算综合匹配度（三层评分系统）
    
    Args:
        chart_a: 命盘 A 的时间数据
        chart_b: 命盘 B 的时间数据
        family_a: 命盘 A 的父母柱数据
        family_b: 命盘 B 的父母柱数据
        weights: 可选的权重配置，默认使用 DEFAULT_WEIGHTS
        
    Returns:
        包含所有评分和详细信息的字典
    """
    if weights is None:
        weights = DEFAULT_WEIGHTS
    
    # 计算三层评分
    time_score, time_details = calculate_time_score(chart_a, chart_b)
    father_score, father_details = calculate_father_score(family_a, family_b)
    mother_score, mother_details = calculate_mother_score(family_a, family_b)
    
    # 计算加权综合评分
    composite_score = (
        time_score * weights["time"] / 100 +
        father_score * weights["father"] / 100 +
        mother_score * weights["mother"] / 100
    )
    
    # 组装完整结果
    result = {
        # 三层评分
        "time_score": time_score,
        "father_score": father_score,
        "mother_score": mother_score,
        "composite_score": int(composite_score),
        
        # 权重配置
        "time_weight": weights["time"],
        "father_weight": weights["father"],
        "mother_weight": weights["mother"],
        
        # 详细信息
        **time_details,
        **father_details,
        **mother_details,
        
        # 算法版本
        "algorithm_version": "v1.0"
    }
    
    return result


def interpret_match_score(match_data: Dict[str, Any]) -> Dict[str, str]:
    """
    生成匹配评分的文字解读
    
    Args:
        match_data: calculate_composite_match() 返回的数据
        
    Returns:
        包含各层级解读的字典
    """
    def get_level_text(score: int) -> str:
        """将评分转换为等级描述"""
        if score >= 90:
            return "极高"
        elif score >= 75:
            return "很高"
        elif score >= 60:
            return "较高"
        elif score >= 40:
            return "中等"
        elif score >= 25:
            return "较低"
        else:
            return "很低"
    
    composite = match_data["composite_score"]
    time_score = match_data["time_score"]
    father_score = match_data["father_score"]
    mother_score = match_data["mother_score"]
    
    # 综合评价
    if composite >= 85:
        overall = "极度相似的命理结构，罕见的同频灵友"
    elif composite >= 70:
        overall = "高度相似的生命模式，值得深入交流"
    elif composite >= 55:
        overall = "中等程度的相似性，有共鸣基础"
    elif composite >= 40:
        overall = "部分维度相似，可能有特定共鸣点"
    else:
        overall = "命理结构差异较大"
    
    return {
        "overall_interpretation": overall,
        "time_level": get_level_text(time_score),
        "father_level": get_level_text(father_score),
        "mother_level": get_level_text(mother_score),
        "time_summary": f"时间结构相似度{get_level_text(time_score)}（{time_score}分）",
        "father_summary": f"父柱相似度{get_level_text(father_score)}（{father_score}分）",
        "mother_summary": f"母柱相似度{get_level_text(mother_score)}（{mother_score}分）"
    }
