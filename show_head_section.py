
import os

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

with open(template_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("=== LINES 1-25 (HEAD SECTION) ===\n")
for i in range(min(25, len(lines))):
    print(f"{i+1:3d}: {lines[i]}", end='')
