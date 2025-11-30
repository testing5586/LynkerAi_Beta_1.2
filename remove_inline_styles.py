
import os

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the style block
if '<style>' in content:
    style_start = content.find('<style>')
    style_end = content.find('</style>', style_start)
    
    if style_end > 0:
        print(f"Found <style> block from position {style_start} to {style_end}")
        print("\n=== STYLE BLOCK CONTENT ===\n")
        print(content[style_start:style_end+8])
        
        # Remove the style block
        new_content = content[:style_start] + content[style_end+8:]
        
        with open(template_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("\n✓ Removed inline <style> block")
        print(f"✓ New file size: {len(new_content)} bytes (was {len(content)} bytes)")
    else:
        print("⚠ Found <style> but no </style>")
else:
    print("✓ No <style> block found")
