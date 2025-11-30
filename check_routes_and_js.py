
import os

# Check routes file
routes_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes\birth_input_routes_v4.py'
if os.path.exists(routes_file):
    with open(routes_file, 'r', encoding='utf-8') as f:
        print(f"=== {routes_file} ===")
        print(f.read())

# Check JS file
js_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\js\bazimatch.js'
if os.path.exists(js_file):
    with open(js_file, 'r', encoding='utf-8') as f:
        print(f"\n=== {js_file} ===")
        print(f.read())
