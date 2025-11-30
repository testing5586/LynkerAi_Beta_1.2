import os
js = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\js\bazimatch.js'
with open(js, 'r', encoding='utf-8') as f:
    content = f.read()
    
# Find the exact line
idx = content.find("criteria-chip")
if idx > 0:
    start = max(0, idx - 200)
    end = min(len(content), idx + 300)
    print("=== EXACT CODE AROUND criteria-chip ===\n")
    print(repr(content[start:end]))
