
import os

# Check the HTML structure for filter section
template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the filter section
if '筛选条件' in content:
    idx = content.find('筛选条件')
    start = max(0, idx - 200)
    end = min(len(content), idx + 1000)
    print("=== FILTER SECTION IN TEMPLATE ===\n")
    print(content[start:end])
    print("\n" + "="*60 + "\n")

# Check if there's a container for checkboxes
if 'bazi-criteria' in content or 'filter-criteria' in content:
    print("✓ Found filter criteria container")
else:
    print("✗ No filter criteria container found")

# Check the JavaScript file
js_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static\js\bazimatch.js'

if os.path.exists(js_file):
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Find where filter checkboxes are rendered
    if 'checkbox' in js_content.lower():
        print("\n=== CHECKBOX RENDERING IN JS ===\n")
        lines = js_content.split('\n')
        for i, line in enumerate(lines):
            if 'checkbox' in line.lower():
                start = max(0, i-3)
                end = min(len(lines), i+5)
                for j in range(start, end):
                    print(f"{j+1:4d}: {lines[j]}")
                print()
    else:
        print("⚠ No checkbox rendering found in JS")
        
        # Look for filter rendering
        if 'pillar' in js_content.lower() or 'criteria' in js_content.lower():
            print("\n=== FILTER RENDERING CODE ===\n")
            lines = js_content.split('\n')
            for i, line in enumerate(lines):
                if 'pillar' in line.lower() or 'criteria' in line.lower():
                    print(f"{i+1:4d}: {line}")
