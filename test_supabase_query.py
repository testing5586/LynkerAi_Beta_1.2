import os
from dotenv import load_dotenv
from supabase import create_client
import json

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

print(f"URL: {url}")
print(f"Key: {key[:50]}..." if key else "Key: None")

if url and key:
    supabase = create_client(url, key)
    
    # 查询 normal_user_profiles
    print("\n=== Querying normal_user_profiles ===")
    result = supabase.table("normal_user_profiles").select("*").limit(5).execute()
    print(f"Count: {len(result.data)}")
    print(json.dumps(result.data, indent=2, ensure_ascii=False))
    
    # 查询 users
    print("\n=== Querying users ===")
    result2 = supabase.table("users").select("*").limit(5).execute()
    print(f"Count: {len(result2.data)}")
    print(json.dumps(result2.data, indent=2, ensure_ascii=False))
