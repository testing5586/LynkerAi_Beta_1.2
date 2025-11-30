
import os

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(template_file):
    with open(template_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("=== COMPLETE FILE CONTENT ===\n")
    print(content)
else:
    print("File not found")
