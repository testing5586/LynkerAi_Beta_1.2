
import os

files_to_check = [
    r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html',
    r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'
]

for fp in files_to_check:
    if os.path.exists(fp):
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
            print(f"--- {os.path.basename(fp)} ---")
            # Find body tag
            start = content.find('<body')
            end = content.find('>', start)
            if start != -1 and end != -1:
                print(f"Body tag: {content[start:end+1]}")
            else:
                print("Body tag not found")
    else:
        print(f"File not found: {fp}")
