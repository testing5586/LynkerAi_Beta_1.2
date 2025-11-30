
import os

# Find the old working version to see how checkboxes were implemented
templates_dir = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates'

# Look for any template with checkbox implementation
for filename in os.listdir(templates_dir):
    if filename.endswith('.html') and 'bazi' in filename.lower():
        filepath = os.path.join(templates_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'type="checkbox"' in content and '同年柱' in content:
            print(f"\n=== FOUND CHECKBOX IMPLEMENTATION IN {filename} ===\n")
            
            # Find the checkbox section
            idx = content.find('type="checkbox"')
            start = max(0, idx - 500)
            end = min(len(content), idx + 1000)
            print(content[start:end])
            break
