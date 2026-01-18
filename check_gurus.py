#!/usr/bin/env python
"""Query existing guru accounts for testing"""

import requests
import json

BASE_URL = "http://localhost:8080"

# Try to find existing guru accounts via a custom endpoint or database query
# For now, we'll create a simple test that uses the registration flow

print("Testing Guru API with realistic flow...")
print()

# Option 1: Check if there are any existing published gurus
r = requests.get(f"{BASE_URL}/api/guru/search?page_size=10")
data = r.json()
print(f"Current published gurus: {data.get('pagination', {}).get('total', 0)}")

if data.get('data'):
    for guru in data['data']:
        print(f"  - {guru.get('guru_id')}: {guru.get('studio_name')} ({guru.get('guru_name')})")
else:
    print("  No published gurus found")
    print()
    print("To test the full flow, you need to:")
    print("1. Register a new guru account first via /uxbot/guru-registration.html")
    print("2. Then use that guru_id to test save/publish")

print()
print("Testing with non-existent guru_id will fail due to foreign key constraint")
print("guru_studios.guru_id -> guru_accounts.id")
