"""
Family Columns 数据库操作模块
处理父母柱数据的 CRUD 操作
"""

from typing import Dict, Any, Optional, List
from lynker_bazi_engine.supabase_client import get_supabase_client


def insert_family_columns(chart_id: int, family_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    插入父母柱数据到数据库
    
    Args:
        chart_id: 命盘 ID
        family_data: calculate_family_columns() 返回的数据
        
    Returns:
        插入成功返回记录，失败返回 None
        
    Example:
        >>> family_data = calculate_family_columns(chart_data)
        >>> result = insert_family_columns(12345, family_data)
    """
    try:
        client = get_supabase_client()
        
        # 准备插入数据
        insert_data = {
            "chart_id": chart_id,
            "father_presence": family_data["father_presence"],
            "father_authority": family_data["father_authority"],
            "father_resource": family_data["father_resource"],
            "father_conflict": family_data["father_conflict"],
            "father_distance": family_data["father_distance"],
            "mother_presence": family_data["mother_presence"],
            "mother_bond": family_data["mother_bond"],
            "mother_nurture": family_data["mother_nurture"],
            "mother_control": family_data["mother_control"],
            "mother_empty": family_data["mother_empty"],
            "algorithm_version": family_data.get("algorithm_version", "v0.1")
        }
        
        # 插入数据
        result = client.table("chart_family_columns").insert(insert_data).execute()
        
        if result.data and len(result.data) > 0:
            return result.data[0]
        return None
        
    except Exception as e:
        print(f"插入 family_columns 失败: {e}")
        return None


def get_family_columns_by_chart_id(chart_id: int) -> Optional[Dict[str, Any]]:
    """
    根据命盘 ID 查询父母柱数据
    
    Args:
        chart_id: 命盘 ID
        
    Returns:
        父母柱数据记录，不存在返回 None
    """
    try:
        client = get_supabase_client()
        
        result = client.table("chart_family_columns")\
            .select("*")\
            .eq("chart_id", chart_id)\
            .order("created_at", desc=True)\
            .limit(1)\
            .execute()
        
        if result.data and len(result.data) > 0:
            return result.data[0]
        return None
        
    except Exception as e:
        print(f"查询 family_columns 失败: {e}")
        return None


def update_family_columns(record_id: int, family_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    更新父母柱数据
    
    Args:
        record_id: 记录 ID
        family_data: 新的父母柱数据
        
    Returns:
        更新后的记录，失败返回 None
    """
    try:
        client = get_supabase_client()
        
        update_data = {
            "father_presence": family_data["father_presence"],
            "father_authority": family_data["father_authority"],
            "father_resource": family_data["father_resource"],
            "father_conflict": family_data["father_conflict"],
            "father_distance": family_data["father_distance"],
            "mother_presence": family_data["mother_presence"],
            "mother_bond": family_data["mother_bond"],
            "mother_nurture": family_data["mother_nurture"],
            "mother_control": family_data["mother_control"],
            "mother_empty": family_data["mother_empty"],
            "algorithm_version": family_data.get("algorithm_version", "v0.1"),
            "updated_at": "now()"
        }
        
        result = client.table("chart_family_columns")\
            .update(update_data)\
            .eq("id", record_id)\
            .execute()
        
        if result.data and len(result.data) > 0:
            return result.data[0]
        return None
        
    except Exception as e:
        print(f"更新 family_columns 失败: {e}")
        return None


def upsert_family_columns(chart_id: int, family_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    插入或更新父母柱数据（如果已存在则更新）
    
    Args:
        chart_id: 命盘 ID
        family_data: 父母柱数据
        
    Returns:
        操作后的记录，失败返回 None
    """
    # 先查询是否已存在
    existing = get_family_columns_by_chart_id(chart_id)
    
    if existing:
        # 已存在，执行更新
        return update_family_columns(existing["id"], family_data)
    else:
        # 不存在，执行插入
        return insert_family_columns(chart_id, family_data)


def get_all_family_columns(limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
    """
    获取所有父母柱记录（分页）
    
    Args:
        limit: 每页数量
        offset: 偏移量
        
    Returns:
        父母柱记录列表
    """
    try:
        client = get_supabase_client()
        
        result = client.table("chart_family_columns")\
            .select("*")\
            .order("created_at", desc=True)\
            .range(offset, offset + limit - 1)\
            .execute()
        
        return result.data if result.data else []
        
    except Exception as e:
        print(f"查询 family_columns 列表失败: {e}")
        return []


def delete_family_columns(record_id: int) -> bool:
    """
    删除父母柱记录
    
    Args:
        record_id: 记录 ID
        
    Returns:
        删除是否成功
    """
    try:
        client = get_supabase_client()
        
        result = client.table("chart_family_columns")\
            .delete()\
            .eq("id", record_id)\
            .execute()
        
        return True
        
    except Exception as e:
        print(f"删除 family_columns 失败: {e}")
        return False
