
import os

modernmatch_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html'

if os.path.exists(modernmatch_path):
    with open(modernmatch_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the style section
    if '<style>' in content:
        start = content.find('<style>')
        end = content.find('</style>', start) + 8
        style_section = content[start:end]
        
        print("=== COMPLETE STYLE SECTION FROM MODERNMATCH ===\n")
        print(style_section)
        print("\n\n")
    
    # Find badge styles
    if '88分' in content or '92分' in content:
        idx = content.find('88分')
        if idx < 0:
            idx = content.find('92分')
        if idx > 0:
            start = max(0, idx - 300)
            end = min(len(content), idx + 200)
            print("=== SCORE BADGE CONTEXT ===\n")
            print(content[start:end])
            
else:
    print(f"File not found: {modernmatch_path}")
