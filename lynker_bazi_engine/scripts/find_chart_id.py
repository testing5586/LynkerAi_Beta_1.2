
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_client import get_supabase_client

client = get_supabase_client()
res = client.table("chart_time_layers_v2").select("chart_id").limit(5).execute()
print("Available chart_ids:", res.data)
