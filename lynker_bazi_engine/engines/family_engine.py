"""
灵客引擎 · 父母柱计算模块
Family Column Calculation Engine

基于紫微斗数父母宫的抽象映射，计算父柱与母柱的各项指标
"""

from typing import Dict, Any


def calculate_family_columns(chart_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    计算父母柱数据
    
    Args:
        chart_data: 命盘数据，包含紫微斗数排盘结果
        
    Returns:
        包含父柱和母柱各项指标的字典
        
    示例返回值:
    {
        "father_presence": 65,
        "father_authority": 70,
        "father_resource": 55,
        "father_conflict": 40,
        "father_distance": 45,
        "mother_presence": 75,
        "mother_bond": 80,
        "mother_nurture": 70,
        "mother_control": 35,
        "mother_empty": 30,
        "algorithm_version": "v0.1"
    }
    """
    
    # 初始化默认值（中性值为50）
    result = {
        "father_presence": 50,
        "father_authority": 50,
        "father_resource": 50,
        "father_conflict": 50,
        "father_distance": 50,
        "mother_presence": 50,
        "mother_bond": 50,
        "mother_nurture": 50,
        "mother_control": 50,
        "mother_empty": 50,
        "algorithm_version": "v0.1"
    }
    
    # TODO: 实现真实的父母宫分析逻辑
    # 当前为示例实现，基于简单规则
    
    # 从命盘数据中提取父母宫信息
    parents_palace = chart_data.get("parents_palace", {})
    
    # 获取父母宫的主星
    main_stars = parents_palace.get("main_stars", [])
    
    # 获取四化信息
    transformations = parents_palace.get("transformations", {})
    
    # ========== 父柱计算逻辑 ==========
    
    # 1. 父亲存在强度 (father_presence)
    # 基于父母宫主星的强度
    if "太阳" in main_stars:
        result["father_presence"] += 15
    if "天府" in main_stars:
        result["father_presence"] += 10
        
    # 2. 父亲权威投射 (father_authority)
    # 化权增强权威感
    if transformations.get("化权"):
        result["father_authority"] += 20
    if "紫微" in main_stars:
        result["father_authority"] += 15
        
    # 3. 父亲资源支持 (father_resource)
    # 化禄代表资源流动
    if transformations.get("化禄"):
        result["father_resource"] += 25
    if "天府" in main_stars or "武曲" in main_stars:
        result["father_resource"] += 10
        
    # 4. 父亲对抗张力 (father_conflict)
    # 化忌增加冲突
    if transformations.get("化忌"):
        result["father_conflict"] += 30
    if "擎羊" in main_stars or "陀罗" in main_stars:
        result["father_conflict"] += 15
        
    # 5. 父亲情感距离 (father_distance)
    # 天马、天机等代表距离感
    if "天马" in main_stars:
        result["father_distance"] += 20
    if "天机" in main_stars:
        result["father_distance"] += 10
        
    # ========== 母柱计算逻辑 ==========
    
    # 1. 母亲存在强度 (mother_presence)
    if "太阴" in main_stars:
        result["mother_presence"] += 20
    if "天同" in main_stars:
        result["mother_presence"] += 10
        
    # 2. 母亲情感黏结力 (mother_bond)
    # 化科代表情感连接
    if transformations.get("化科"):
        result["mother_bond"] += 20
    if "太阴" in main_stars:
        result["mother_bond"] += 15
        
    # 3. 母亲滋养能力 (mother_nurture)
    if "天同" in main_stars:
        result["mother_nurture"] += 20
    if "天府" in main_stars:
        result["mother_nurture"] += 15
        
    # 4. 母亲控制型模式 (mother_control)
    if "天机" in main_stars:
        result["mother_control"] += 15
    if transformations.get("化权"):
        result["mother_control"] += 20
        
    # 5. 母亲缺失型模式 (mother_empty)
    if transformations.get("化忌"):
        result["mother_empty"] += 25
    if "地空" in main_stars or "地劫" in main_stars:
        result["mother_empty"] += 20
        
    # 确保所有值在 0-100 范围内
    for key in result:
        if key != "algorithm_version":
            result[key] = max(0, min(100, result[key]))
    
    return result


def get_family_structure_type(family_data: Dict[str, Any]) -> Dict[str, str]:
    """
    根据父母柱数据判断家庭结构类型
    
    Args:
        family_data: calculate_family_columns() 返回的数据
        
    Returns:
        包含结构类型和描述的字典
    """
    
    # 计算父柱和母柱的综合强度
    father_strength = (
        family_data["father_presence"] + 
        family_data["father_authority"] + 
        family_data["father_resource"]
    ) / 3
    
    mother_strength = (
        family_data["mother_presence"] + 
        family_data["mother_bond"] + 
        family_data["mother_nurture"]
    ) / 3
    
    # 判断结构类型
    if father_strength >= 60 and mother_strength >= 60:
        return {
            "type_id": "BALANCED_STRONG",
            "description": "双亲均衡强势型",
            "detail": "父母双方在命主生命中都有较强的存在感和影响力"
        }
    elif father_strength >= 60 and mother_strength < 40:
        return {
            "type_id": "F_STRONG_M_WEAK",
            "description": "父强母弱型",
            "detail": "现实驱动强，情感根系弱"
        }
    elif father_strength < 40 and mother_strength >= 60:
        return {
            "type_id": "F_WEAK_M_STRONG",
            "description": "父弱母强型",
            "detail": "情感依附强，外部支撑弱"
        }
    elif father_strength < 40 and mother_strength < 40:
        return {
            "type_id": "DUAL_WEAK",
            "description": "双亲缺失型",
            "detail": "父母双方在命主生命中存在感较弱"
        }
    else:
        return {
            "type_id": "BALANCED_MODERATE",
            "description": "双亲均衡中性型",
            "detail": "父母双方影响力处于中等水平"
        }


def interpret_family_column(family_data: Dict[str, Any]) -> Dict[str, str]:
    """
    生成父母柱的文字解读
    
    Args:
        family_data: calculate_family_columns() 返回的数据
        
    Returns:
        包含各维度解读的字典
    """
    
    def get_level_text(value: int) -> str:
        """将数值转换为等级描述"""
        if value >= 80:
            return "极强"
        elif value >= 65:
            return "较强"
        elif value >= 50:
            return "中等"
        elif value >= 35:
            return "较弱"
        else:
            return "极弱"
    
    return {
        "father_summary": f"父亲存在感{get_level_text(family_data['father_presence'])}，"
                         f"权威投射{get_level_text(family_data['father_authority'])}，"
                         f"资源支持{get_level_text(family_data['father_resource'])}",
        "mother_summary": f"母亲存在感{get_level_text(family_data['mother_presence'])}，"
                         f"情感黏结{get_level_text(family_data['mother_bond'])}，"
                         f"滋养能力{get_level_text(family_data['mother_nurture'])}",
        "structure_type": get_family_structure_type(family_data)
    }
