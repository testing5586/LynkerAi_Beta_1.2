"""
检查更新后的种子用户（2001、2002）
"""

from supabase_client import get_supabase_client

def view_seeds():
    client = get_supabase_client()
    res = client.table("chart_time_layers_v2")\
        .select("chart_id, year, month, day, hour, point_column, ke_column, fen_column, micro_fen_column, time_layer_code")\
        .in_("chart_id", [2001, 2002])\
        .order("chart_id")\
        .execute()
    rows = res.data or []
    print("=== Seed Users 2001 & 2002 ===")
    for r in rows:
        print(f"chart_id={r['chart_id']}, time_code={r['time_layer_code']}, "
              f"YMDH={r['year']}-{r['month']}-{r['day']} {r['hour']}:" 
              f"{r['point_column']:02d}:{r['ke_column']}:{r['fen_column']}:{r['micro_fen_column']}")

if __name__ == "__main__":
    view_seeds()
