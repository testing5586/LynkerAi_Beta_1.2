
import os

file_path = r"c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\static\templates\uxbot\guru-dashboard-main.html"

with open(file_path, 'rb') as f:
    content = f.read()

target = b'id="guru-name-display"'
idx = content.find(target)

if idx != -1:
    # Print 300 bytes around the target
    print(content[idx:idx+300])
else:
    print("Target not found")
