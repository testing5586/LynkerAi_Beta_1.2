#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Quick test to check if .env file is being loaded"""

import os
import sys
from pathlib import Path

# Set console encoding for Windows
if sys.platform == 'win32':
    os.system('chcp 65001 >nul')
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

# Check if .env file exists
env_path = Path('.env')
print(f"🔍 Checking .env file...")
print(f"📁 Current directory: {os.getcwd()}")
print(f"📄 .env file exists: {env_path.exists()}")

if env_path.exists():
    print(f"📏 .env file size: {env_path.stat().st_size} bytes")
    print("\n📝 First few lines of .env (without sensitive data):")
    with open('.env', 'r', encoding='utf-8') as f:
        lines = f.readlines()[:10]
        for i, line in enumerate(lines, 1):
            # Hide actual values
            if '=' in line and not line.strip().startswith('#'):
                key = line.split('=')[0]
                print(f"  {i}. {key}=***")
            else:
                print(f"  {i}. {line.rstrip()}")

print("\n🔑 Loading environment variables...")
from dotenv import load_dotenv
load_dotenv()

# Check critical variables
vars_to_check = ['SUPABASE_URL', 'SUPABASE_KEY', 'MASTER_VAULT_KEY', 'OPENAI_API_KEY']
print("\n✅ Environment variables status:")
for var in vars_to_check:
    value = os.getenv(var)
    if value:
        # Show partial value for verification
        if var == 'SUPABASE_URL':
            print(f"  ✓ {var}: {value}")
        else:
            print(f"  ✓ {var}: {value[:20]}... (length: {len(value)})")
    else:
        print(f"  ✗ {var}: NOT SET")

# Try connecting to Supabase
print("\n🔗 Testing Supabase connection...")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if supabase_url and supabase_key:
    try:
        from supabase import create_client
        client = create_client(supabase_url, supabase_key)
        print("✅ Successfully created Supabase client!")
        
        # Try a simple query
        print("\n📊 Testing database access...")
        result = client.table("verified_charts").select("id").limit(1).execute()
        print(f"✅ Database query successful! (found {len(result.data)} records)")
        
    except Exception as e:
        print(f"❌ Supabase connection failed: {str(e)}")
else:
    print("❌ Cannot test connection - credentials not set")
