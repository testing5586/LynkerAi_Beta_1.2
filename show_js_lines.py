import os
js = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\js\bazimatch.js'
with open(js, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i in range(30, 45):
        if i < len(lines):
            print(f"{i+1:4d}: {lines[i]}", end='')
