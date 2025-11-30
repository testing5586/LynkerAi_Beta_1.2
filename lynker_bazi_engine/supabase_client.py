"""
Supabase 客户端配置
用于连接和操作 Supabase 数据库
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# Supabase 配置
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# 创建 Supabase 客户端
supabase: Client = None

def get_supabase_client() -> Client:
    """
    获取 Supabase 客户端实例（单例模式）
    
    Returns:
        Supabase 客户端实例
        
    Raises:
        ValueError: 如果环境变量未配置
    """
    global supabase
    
    if supabase is not None:
        return supabase
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError(
            "Supabase 配置缺失！请在 .env 文件中设置 SUPABASE_URL 和 SUPABASE_KEY"
        )
    
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase


def test_connection() -> bool:
    """
    测试 Supabase 连接是否正常
    
    Returns:
        连接是否成功
    """
    try:
        client = get_supabase_client()
        # 尝试查询一个表来测试连接
        result = client.table("chart_family_columns").select("id").limit(1).execute()
        return True
    except Exception as e:
        print(f"Supabase 连接测试失败: {e}")
        return False
