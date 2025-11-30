
import requests

try:
    response = requests.get("http://localhost:5000/api/match/time?chart_id=1&mode=same_fen")
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
