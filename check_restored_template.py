
import os

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Check what CSS is linked
print("=== CSS LINKS ===\n")
lines = content.split('\n')
for i, line in enumerate(lines[:30], 1):
    if 'stylesheet' in line.lower() or '.css' in line.lower():
        print(f"Line {i}: {line.strip()}")

print("\n=== HEAD SECTION ===\n")
head_end = content.find('</head>')
if head_end > 0:
    head_start = content.find('<head>')
    print(content[head_start:head_end+7])
