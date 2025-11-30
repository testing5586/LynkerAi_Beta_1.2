
import os
import re

modernmatch_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html'

if os.path.exists(modernmatch_path):
    with open(modernmatch_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the match results section with buttons
    if '查看详情' in content or '打招呼' in content:
        # Find the section around these buttons
        idx1 = content.find('查看详情') if '查看详情' in content else -1
        idx2 = content.find('打招呼') if '打招呼' in content else -1
        
        if idx1 > 0:
            start = max(0, idx1 - 800)
            end = min(len(content), idx1 + 400)
            print("=== 查看详情 BUTTON CONTEXT ===\n")
            print(content[start:end])
            print("\n" + "="*50 + "\n")
        
        if idx2 > 0:
            start = max(0, idx2 - 800)
            end = min(len(content), idx2 + 400)
            print("=== 打招呼 BUTTON CONTEXT ===\n")
            print(content[start:end])
else:
    print(f"File not found: {modernmatch_path}")
