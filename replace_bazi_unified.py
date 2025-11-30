
import os
import shutil
from datetime import datetime

old_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'
new_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified_new.html'
backup_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified_backup.html'

# Backup old file
if os.path.exists(old_file):
    shutil.copy2(old_file, backup_file)
    print(f"✓ Backed up old file to: {backup_file}")

# Replace with new file
if os.path.exists(new_file):
    shutil.copy2(new_file, old_file)
    print(f"✓ Replaced bazi_unified.html with new version")
    print(f"✓ Old file backed up as: bazi_unified_backup.html")
else:
    print("ERROR: New file not found")
