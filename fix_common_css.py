
import os

common_css_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\css\common.css'
dark_mode_css_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\css\bazi_dark_mode.css'

if os.path.exists(common_css_path) and os.path.exists(dark_mode_css_path):
    with open(common_css_path, 'r', encoding='utf-8') as f:
        common_content = f.read()
    
    with open(dark_mode_css_path, 'r', encoding='utf-8') as f:
        dark_content = f.read()
        
    if '.dark-body' not in common_content:
        print("Appending dark mode styles to common.css...")
        with open(common_css_path, 'a', encoding='utf-8') as f:
            f.write('\n\n' + dark_content)
        print("Successfully updated common.css")
    else:
        print("common.css already contains .dark-body styles.")
else:
    print("Files not found.")
