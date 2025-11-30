
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        # Print the last 20 lines to see the end, and maybe around line 115 where the first block ends
        print(f"Total lines: {len(lines)}")
        print("--- Lines 110-120 ---")
        for i, line in enumerate(lines[110:120]):
            print(f"{110+i+1}: {line.rstrip()}")
        
        print("\n--- Last 10 lines ---")
        for i, line in enumerate(lines[-10:]):
            print(f"{len(lines)-10+i+1}: {line.rstrip()}")
else:
    print(f"File not found: {file_path}")
