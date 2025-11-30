
import os

bazi_unified_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(bazi_unified_path):
    with open(bazi_unified_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the filter buttons section
    if '筛选条件' in content or '同年柱' in content:
        idx = content.find('筛选条件')
        if idx < 0:
            idx = content.find('同年柱')
        if idx > 0:
            start = max(0, idx - 200)
            end = min(len(content), idx + 800)
            print("=== FILTER BUTTONS SECTION ===\n")
            print(content[start:end])
            print("\n\n")
    
    # Find the score badge section
    if '88分' in content or '92分' in content:
        idx = content.find('88分')
        if idx < 0:
            idx = content.find('92分')
        if idx > 0:
            start = max(0, idx - 300)
            end = min(len(content), idx + 200)
            print("=== SCORE BADGE SECTION ===\n")
            print(content[start:end])
            print("\n\n")
    
    # Find the sidebar ranking section
    if 'No.1' in content or 'No.2' in content:
        idx = content.find('No.1')
        if idx > 0:
            start = max(0, idx - 200)
            end = min(len(content), idx + 600)
            print("=== RANKING SIDEBAR SECTION ===\n")
            print(content[start:end])
            
else:
    print(f"File not found: {bazi_unified_path}")
