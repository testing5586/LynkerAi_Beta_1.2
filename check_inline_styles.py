
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        if '<style>' in content:
            print("Found <style> block in modernmatch_unified_v3.html")
            start = content.find('<style>')
            end = content.find('</style>')
            print(content[start:end+8])
        else:
            print("No <style> block found.")
else:
    print(f"File not found: {file_path}")
