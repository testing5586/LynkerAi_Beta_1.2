
import os

bazi_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(bazi_path):
    with open(bazi_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the filter section
    if '筛选条件' in content:
        idx = content.find('筛选条件')
        start = max(0, idx - 200)
        end = min(len(content), idx + 1200)
        print("=== COMPLETE FILTER SECTION ===\n")
        print(content[start:end])
        
else:
    print("File not found")
