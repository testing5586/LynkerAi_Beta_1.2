
import os

bazi_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(bazi_path):
    with open(bazi_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find filter buttons
    if '同年柱' in content:
        idx = content.find('同年柱')
        start = max(0, idx - 400)
        end = min(len(content), idx + 400)
        print("=== FILTER BUTTONS HTML ===\n")
        print(content[start:end])
        print("\n" + "="*60 + "\n")
    
    # Find score display
    if 'match_score' in content.lower() or '88分' in content:
        idx = content.find('match_score') if 'match_score' in content.lower() else content.find('88分')
        if idx < 0:
            idx = content.find('{{ match')
        if idx > 0:
            start = max(0, idx - 300)
            end = min(len(content), idx + 300)
            print("=== SCORE DISPLAY HTML ===\n")
            print(content[start:end])
            print("\n" + "="*60 + "\n")
    
    # Find ranking cards
    if 'No.1' in content:
        idx = content.find('No.1')
        start = max(0, idx - 400)
        end = min(len(content), idx + 400)
        print("=== RANKING CARD HTML ===\n")
        print(content[start:end])
        
else:
    print("File not found")
