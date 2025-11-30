
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        print(f"File size: {len(content)}")
        print("--- Last 200 chars ---")
        print(content[-200:])
        
        if "{% endblock %}" in content:
            print("\nFound {% endblock %}")
            
        if '<meta charset="UTF-8">' in content[content.rfind('{% endblock %}'):]:
             print("\nWARNING: Found <meta> tag AFTER the last endblock. File is likely still corrupted.")
        else:
             print("\nFile structure looks correct at the end.")
else:
    print(f"File not found: {file_path}")
