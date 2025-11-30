
import os

# Compare the two template files
backup_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified_backup.html'
current_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(backup_file) and os.path.exists(current_file):
    with open(backup_file, 'r', encoding='utf-8') as f:
        backup_content = f.read()
    
    with open(current_file, 'r', encoding='utf-8') as f:
        current_content = f.read()
    
    print(f"Backup file size: {len(backup_content)} bytes")
    print(f"Current file size: {len(current_content)} bytes")
    
    # Check for key elements
    elements_to_check = [
        ('checkbox', 'type="checkbox"'),
        ('查看档案 button', '查看档案'),
        ('pillar badges in cards', 'badge-pill'),
        ('form-check-inline', 'form-check-inline')
    ]
    
    print("\n=== ELEMENT COMPARISON ===\n")
    for name, pattern in elements_to_check:
        in_backup = pattern in backup_content
        in_current = pattern in current_content
        status = "✓" if in_current else "✗ MISSING"
        print(f"{status} {name}: Backup={in_backup}, Current={in_current}")
    
    # Find the filter section in backup
    if '筛选条件' in backup_content:
        idx = backup_content.find('筛选条件')
        start = max(0, idx - 100)
        end = min(len(backup_content), idx + 1500)
        print("\n=== BACKUP FILTER SECTION ===\n")
        print(backup_content[start:end])

else:
    print("Files not found")
