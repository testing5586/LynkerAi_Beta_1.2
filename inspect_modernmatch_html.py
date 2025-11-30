
import os

modernmatch_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html'

if os.path.exists(modernmatch_path):
    with open(modernmatch_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find filter buttons in modernmatch
    if '同年柱' in content:
        idx = content.find('同年柱')
        start = max(0, idx - 400)
        end = min(len(content), idx + 400)
        print("=== MODERNMATCH FILTER BUTTONS ===\n")
        print(content[start:end])
        print("\n" + "="*60 + "\n")
    
    # Find score badge
    if '88分' in content or '92分' in content:
        idx = content.find('88分') if '88分' in content else content.find('92分')
        start = max(0, idx - 300)
        end = min(len(content), idx + 300)
        print("=== MODERNMATCH SCORE BADGE ===\n")
        print(content[start:end])
        
else:
    print("File not found")
