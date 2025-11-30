
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Look for the buttons in the match list
        if '打招呼' in content:
            print("Found match list buttons context:")
            # Find the area around "打招呼"
            idx = content.find('打招呼')
            start = max(0, idx - 500)
            end = min(len(content), idx + 200)
            print(content[start:end])
        else:
            print("Could not find '打招呼' in the file.")
else:
    print(f"File not found: {file_path}")
