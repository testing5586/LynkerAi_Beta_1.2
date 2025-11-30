
import os

bazi_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(bazi_path):
    with open(bazi_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find lines containing filter-related keywords
    for i, line in enumerate(lines, 1):
        if any(keyword in line for keyword in ['筛选', '同年柱', '同月柱', '同日柱', '同时柱', 'filter', 'pillar', 'checkbox']):
            start = max(0, i-3)
            end = min(len(lines), i+3)
            print(f"=== Lines {start}-{end} ===")
            for j in range(start, end):
                print(f"{j+1:4d}: {lines[j]}", end='')
            print("\n")
    
else:
    print("File not found")
