
import os
import re

# Search for all Python files with route definitions
routes_dir = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes'

api_routes = []

if os.path.exists(routes_dir):
    for filename in os.listdir(routes_dir):
        if filename.endswith('.py'):
            filepath = os.path.join(routes_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all route definitions
            routes = re.findall(r"@\w+\.route\(['\"]([^'\"]+)['\"]", content)
            
            if routes:
                print(f"\n=== {filename} ===")
                for route in routes:
                    print(f"  {route}")
                    api_routes.append(route)

print("\n\n=== MISSING API ENDPOINTS ===")
needed = [
    '/api/get-current-user',
    '/api/match/bazi',
    '/api/leaderboard/top'
]

for endpoint in needed:
    if endpoint in api_routes or any(endpoint in r for r in api_routes):
        print(f"✓ {endpoint}")
    else:
        print(f"✗ {endpoint} - NOT FOUND")
