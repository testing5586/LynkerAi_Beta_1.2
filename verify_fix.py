
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        if '<meta charset="UTF-8">' in content and '{% endblock %}' in content:
             # Check if the meta tag appears AFTER the last endblock
             last_block = content.rfind('{% endblock %}')
             meta_tag = content.find('<meta charset="UTF-8">', last_block)
             if meta_tag != -1:
                 print("FAIL: File still has appended content.")
             else:
                 print("PASS: File looks clean (no meta tag after last block).")
        else:
             print("PASS: File looks clean.")
else:
    print(f"File not found: {file_path}")
