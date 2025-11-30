
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\css\common.css'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        print(f"File size: {len(content)}")
        print("--- First 500 chars ---")
        print(content[:500])
        
        print("\n--- Search for .dark-body ---")
        if '.dark-body' in content:
            idx = content.find('.dark-body')
            print(content[idx:idx+500])
        else:
            print(".dark-body class NOT found in CSS")
else:
    print(f"File not found: {file_path}")
