
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\ziwei_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "{% endblock %}" in content:
        last_block = content.rfind('{% endblock %}')
        # Check for content after the last block that looks like a new file start
        if '<meta name="viewport"' in content[last_block:] or '<!DOCTYPE html>' in content[last_block:]:
             print("FAIL: ziwei_unified.html appears to have duplicate content appended.")
        else:
             print("PASS: ziwei_unified.html looks clean.")
    else:
        print("WARNING: ziwei_unified.html might be incomplete (no endblock found).")
else:
    print(f"File not found: {file_path}")
