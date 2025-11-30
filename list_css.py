
import os

css_dir = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\css'

if os.path.exists(css_dir):
    print(f"Listing files in {css_dir}:")
    for f in os.listdir(css_dir):
        print(f)
else:
    print(f"Directory not found: {css_dir}")
