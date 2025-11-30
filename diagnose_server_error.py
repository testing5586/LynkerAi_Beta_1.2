
import requests
import sys

url = "http://localhost:5002/bazi/match"

try:
    print(f"Requesting {url}...")
    response = requests.get(url)
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 500:
        print("\n--- Server Error Traceback (Preview) ---")
        # Flask debug page usually puts the traceback in a specific div or just plain text
        # We'll print the first 2000 chars which usually contains the exception
        content = response.text
        
        # Try to find the exception text
        if "Traceback" in content:
            start = content.find("Traceback")
            print(content[start:start+2000])
        else:
            print(content[:2000])
            
    elif response.status_code == 200:
        print("Success! Page loaded correctly.")
    else:
        print(f"Unexpected status: {response.status_code}")
        print(response.text[:500])

except Exception as e:
    print(f"Connection failed: {e}")
    print("Make sure the server is running (python run_server.py)")
