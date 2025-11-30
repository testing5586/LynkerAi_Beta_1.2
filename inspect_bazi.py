
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        print(f"File size: {len(content)}")
        print("--- First 500 chars ---")
        print(content[:500])
        print("\n--- Middle 500 chars (around line 115) ---")
        lines = content.splitlines()
        if len(lines) > 110:
            print('\n'.join(lines[110:130]))
        print("\n--- Last 500 chars ---")
        print(content[-500:])
else:
    print(f"File not found: {file_path}")
