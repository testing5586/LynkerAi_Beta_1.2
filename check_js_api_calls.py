
import os

js_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\js\bazimatch.js'

if os.path.exists(js_file):
    with open(js_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("=== API CALLS IN bazimatch.js ===\n")
    
    for i, line in enumerate(lines, 1):
        if 'fetch(' in line or 'GET ' in line or '/api/' in line:
            print(f"Line {i}: {line.strip()}")
    
    print("\n\n=== API_BASE Usage ===\n")
    for i, line in enumerate(lines, 1):
        if 'API_BASE' in line:
            print(f"Line {i}: {line.strip()}")
            
else:
    print(f"File not found: {js_file}")
