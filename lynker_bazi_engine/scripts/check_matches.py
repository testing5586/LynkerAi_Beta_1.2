import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_client import get_supabase_client

client = get_supabase_client()
try:
    print("检查 chart_match_scores...")
    res = client.table("chart_match_scores").select("count", count="exact").execute()
    print(f"记录数: {res.count}")
    
    if res.count > 0:
        print("获取前几条记录...")
        res = client.table("chart_match_scores").select("*").limit(2).execute()
        print(res.data)
except Exception as e:
    print(f"查询失败: {e}")
