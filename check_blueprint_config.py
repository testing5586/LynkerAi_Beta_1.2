
import os

route_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes\birth_input_routes_v4.py'

if os.path.exists(route_file):
    with open(route_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("=== BLUEPRINT REGISTRATION ===\n")
    
    for i, line in enumerate(lines[:50], 1):
        if 'Blueprint' in line or 'bazi_bp' in line or 'static' in line.lower():
            print(f"{i:3d}: {line.rstrip()}")
    
    # Find the blueprint definition
    content = ''.join(lines)
    if 'Blueprint(' in content:
        idx = content.find('Blueprint(')
        print("\n=== BLUEPRINT DEFINITION ===\n")
        print(content[max(0, idx-100):idx+300])
else:
    print("Route file not found")
