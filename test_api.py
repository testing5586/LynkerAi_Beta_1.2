#!/usr/bin/env python
"""Simple API tester for Guru endpoints"""

import requests
import uuid
import json

BASE_URL = "http://localhost:8080"

def test_all():
    test_id = str(uuid.uuid4())
    print(f"\n{'='*50}")
    print("GURU API TEST")
    print(f"{'='*50}")
    print(f"Test guru_id: {test_id}\n")
    
    # Test 1: Search (should work even without data)
    print("[1] Search GET /api/guru/search")
    try:
        r = requests.get(f"{BASE_URL}/api/guru/search")
        data = r.json()
        print(f"    Status: {r.status_code}")
        print(f"    Response: success={data.get('success')}, total={data.get('pagination', {}).get('total', 0)}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    # Test 2: Get Draft (before save - should return empty snapshot)
    print("\n[2] Get Draft GET /api/guru/studio/<id>")
    try:
        r = requests.get(f"{BASE_URL}/api/guru/studio/{test_id}")
        data = r.json()
        print(f"    Status: {r.status_code}")
        print(f"    Response: success={data.get('success')}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    # Test 3: Save Draft
    print("\n[3] Save Draft POST /api/guru/studio/<id>/save")
    payload = {
        "snapshot": {
            "hero": {"studioName": "Test Studio", "guruName": "Test Guru", "location": "Test City"},
            "basic": {"bio": "Test bio", "specialties": ["Test"]}
        }
    }
    try:
        r = requests.post(f"{BASE_URL}/api/guru/studio/{test_id}/save", json=payload)
        data = r.json()
        print(f"    Status: {r.status_code}")
        print(f"    Response: success={data.get('success')}, message={data.get('message', data.get('error'))}")
        if not data.get('success'):
            print(f"    Error details: {data.get('error')}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    # Test 4: Get Draft (after save)
    print("\n[4] Get Draft (after save)")
    try:
        r = requests.get(f"{BASE_URL}/api/guru/studio/{test_id}")
        data = r.json()
        print(f"    Status: {r.status_code}")
        snapshot = data.get('data', {}).get('snapshot', {})
        studio_name = snapshot.get('hero', {}).get('studioName')
        print(f"    Response: success={data.get('success')}, studioName={studio_name}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    # Test 5: Publish
    print("\n[5] Publish POST /api/guru/studio/<id>/publish")
    try:
        r = requests.post(f"{BASE_URL}/api/guru/studio/{test_id}/publish")
        data = r.json()
        print(f"    Status: {r.status_code}")
        print(f"    Response: success={data.get('success')}, message={data.get('message', data.get('error'))}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    # Test 6: Get Public Profile
    print("\n[6] Get Public Profile GET /api/guru/public/<id>")
    try:
        r = requests.get(f"{BASE_URL}/api/guru/public/{test_id}")
        data = r.json()
        print(f"    Status: {r.status_code}")
        print(f"    Response: success={data.get('success')}, is_published={data.get('data', {}).get('is_published')}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    # Test 7: Search (should now find 1 result)
    print("\n[7] Search (after publish)")
    try:
        r = requests.get(f"{BASE_URL}/api/guru/search")
        data = r.json()
        print(f"    Status: {r.status_code}")
        print(f"    Response: success={data.get('success')}, total={data.get('pagination', {}).get('total', 0)}")
    except Exception as e:
        print(f"    FAIL: {e}")
    
    print(f"\n{'='*50}")
    print("TEST COMPLETE")
    print(f"{'='*50}")
    print(f"\nBrowser URLs:")
    print(f"  Setup: {BASE_URL}/uxbot/guru-business-page-setup.html?guru_id={test_id}")
    print(f"  Public: {BASE_URL}/uxbot/guru-business-page.html?guru_id={test_id}")
    print(f"  Search: {BASE_URL}/uxbot/guru-search-result.html")

if __name__ == "__main__":
    test_all()
