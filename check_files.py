
import os

static_js_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\js\bazimatch.js'
template_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

print(f"Checking for {static_js_path}...")
if os.path.exists(static_js_path):
    print("bazimatch.js exists.")
else:
    print("bazimatch.js does NOT exist.")

print(f"Checking for {template_path}...")
if os.path.exists(template_path):
    print("bazi_unified.html exists.")
else:
    print("bazi_unified.html does NOT exist.")
