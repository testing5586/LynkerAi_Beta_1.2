"""
Check chart_id=1 time data
"""
from supabase_client import get_supabase_client

def check_base_user():
    client = get_supabase_client()
    res = client.table("chart_time_layers_v2").select("*").eq("chart_id", 1).execute()
    if res.data:
        print("Chart #1:", res.data[0])
    else:
        print("Chart #1 not found")

if __name__ == "__main__":
    check_base_user()
