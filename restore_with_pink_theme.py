
import os
import shutil

backup_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified_backup.html'
current_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(backup_file):
    # Read backup
    with open(backup_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if it has the pink theme CSS
    if 'bazi_dark_mode_v2.css' not in content:
        # Need to add it
        # Find the common.css line and add after it
        old_css = '    <link rel="stylesheet" href="{{ url_for(\'static\', filename=\'css/common.css\') }}?v=20" />'
        
        if old_css in content:
            new_css = '''    <link rel="stylesheet" href="{{ url_for('static', filename='css/common.css') }}?v=20" />
    <link rel="stylesheet" href="{{ url_for('static', filename='css/bazi_dark_mode_v2.css') }}?v=1" />'''
            
            content = content.replace(old_css, new_css)
            print("✓ Added bazi_dark_mode_v2.css link")
        else:
            print("⚠ Could not find css/common.css link to insert after")
    else:
        print("✓ CSS already has pink theme")
    
    # Write to current file
    with open(current_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Restored complete backup with ModernMatch theme")
    print(f"✓ File size: {len(content)} bytes")
    
    # Verify key elements
    has_checkbox = 'type="checkbox"' in content
    has_view_profile = '查看档案' in content
    has_css_v2 = 'bazi_dark_mode_v2.css' in content
    
    print(f"\n=== VERIFICATION ===")
    print(f"{'✓' if has_checkbox else '✗'} Checkbox elements")
    print(f"{'✓' if has_view_profile else '✗'} 查看档案 button")
    print(f"{'✓' if has_css_v2 else '✗'} ModernMatch CSS")
    
else:
    print("✗ Backup file not found")
