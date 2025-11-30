
import os

route_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes\birth_input_routes_v4.py'

if os.path.exists(route_file):
    with open(route_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("=== ALL ROUTES IN birth_input_routes_v4.py ===\n")
    
    for i, line in enumerate(lines, 1):
        if '@bazi_bp.route' in line or '@bp.route' in line:
            # Print the route and next 3 lines (function definition)
            print(f"\nLine {i}:")
            for j in range(5):
                if i + j - 1 < len(lines):
                    print(f"  {lines[i + j - 1].rstrip()}")
    
else:
    print("File not found")

# Also check for other route files
routes_dir = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes'
if os.path.exists(routes_dir):
    print("\n\n=== ALL ROUTE FILES ===\n")
    for file in os.listdir(routes_dir):
        if file.endswith('.py'):
            print(f"  {file}")
