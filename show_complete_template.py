
import os

# Read the current template
template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

print("=== COMPLETE FILE ===\n")
print(content)
