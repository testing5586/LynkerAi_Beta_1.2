from supabase_client import get_supabase_client
import sys

try:
    client = get_supabase_client()
    # Try to select from match_scores
    res = client.table("match_scores").select("count", count="exact").limit(1).execute()
    print("Table match_scores exists.")
    print(res)
except Exception as e:
    print(f"Error accessing match_scores: {e}")
    sys.exit(1)
