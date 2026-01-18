
import os
import re

file_path = r"c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\static\templates\uxbot\guru-dashboard-main.html"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    # Fallback to loose encoding if strict utf-8 fails
    with open(file_path, 'r', encoding='latin-1') as f:
        content = f.read()

# Pattern to match the name element regardless of its content
# <p id="guru-name-display" ... >OLD_CONTENT</p>
pattern_name = r'(<p id="guru-name-display"[^>]*>)(.*?)(</p>)'
pattern_avatar = r'(<span id="guru-avatar-display"[^>]*>)(.*?)(</span>)' # Note: avatar might include nested spans

def replace_name(match):
    print(f"Found name element. Original content: {match.group(2)}")
    return f"{match.group(1)}Loading...{match.group(3)}"

new_content, count = re.subn(pattern_name, replace_name, content, count=1)

if count > 0:
    print("Successfully replaced static name with placeholder.")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
else:
    print("Could not find the guru-name-display element.")

