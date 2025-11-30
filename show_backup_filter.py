
import os

backup_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified_backup.html'

with open(backup_file, 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('筛选条件')
print(content[idx-200:idx+600])
