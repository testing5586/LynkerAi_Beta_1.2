
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes\birth_input_routes_v4.py'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        print(content)
else:
    print(f"File not found: {file_path}")
