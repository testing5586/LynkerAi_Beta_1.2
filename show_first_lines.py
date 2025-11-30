
import os

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Show first 50 lines
lines = content.split('\n')
print("=== FIRST 50 LINES ===\n")
for i, line in enumerate(lines[:50], 1):
    print(f"{i:3d}: {line}")
