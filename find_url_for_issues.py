
import os
import re

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(template_file):
    with open(template_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the API_BASE line
    if 'API_BASE' in content:
        idx = content.find('API_BASE')
        start = max(0, idx - 100)
        end = min(len(content), idx + 200)
        print("=== API_BASE CONFIGURATION ===\n")
        print(content[start:end])
        print("\n")
    
    # Find all url_for instances
    url_fors = re.findall(r"url_for\([^)]+\)", content)
    print("=== ALL url_for CALLS ===\n")
    for uf in url_fors:
        print(uf)
    
    print("\n=== CHECKING BLUEPRINT REGISTRATION ===")
    
    # The correct format should be url_for('bazi.xxx')
    if "url_for('bazi.index')" in content:
        print("✓ Correct: url_for('bazi.index')")
    elif "url_for('index')" in content:
        print("✗ ERROR: url_for('index') should be url_for('bazi.index')")
    
    if "url_for('bazi.static'" in content:
        print("✓ Correct: url_for('bazi.static')")
    elif "url_for('static'" in content:
        print("✗ ERROR: url_for('static') should be url_for('bazi.static')")

else:
    print("File not found")
