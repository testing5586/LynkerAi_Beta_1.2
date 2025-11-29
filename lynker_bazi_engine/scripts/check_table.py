import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_client import get_supabase_client

client = get_supabase_client()
try:
    # 尝试查询一个肯定存在的表，或者列出所有表（Supabase API 不直接支持列出表，但我们可以尝试查询）
    print("尝试查询 user_charts...")
    res = client.table("user_charts").select("count", count="exact").execute()
    print(f"user_charts 存在，记录数: {res.count}")
except Exception as e:
    print(f"查询失败: {e}")
