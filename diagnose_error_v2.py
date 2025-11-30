
import requests
from bs4 import BeautifulSoup

url = "http://localhost:5002/bazi/match"

try:
    print(f"Requesting {url}...")
    response = requests.get(url)
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 500:
        print("\n--- Server Error Details ---")
        # Flask's debugger page structure usually has the exception in a specific place
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try to find the exception title
        h1 = soup.find('h1')
        if h1:
            print(f"Exception: {h1.get_text(strip=True)}")
            
        # Try to find the description
        desc = soup.find('div', class_='detail')
        if desc:
            print(f"Detail: {desc.get_text(strip=True)}")
            
        # Print the last few lines of the traceback if possible
        traceback_div = soup.find('div', class_='traceback')
        if traceback_div:
            print("\nTraceback (summary):")
            print(traceback_div.get_text(strip=True)[:500] + "...")
        else:
            # Fallback: print the raw text if parsing fails or structure is different
            print("\nRaw content snippet (end):")
            print(response.text[-1000:])

except Exception as e:
    print(f"Diagnosis failed: {e}")
