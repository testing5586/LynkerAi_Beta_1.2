
import os

modernmatch_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html'

if os.path.exists(modernmatch_path):
    with open(modernmatch_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find button styles in the file
    if '<style>' in content:
        start = content.find('<style>')
        end = content.find('</style>', start) + 8
        style_block = content[start:end]
        
        # Extract button-related CSS
        lines = style_block.split('\n')
        button_styles = []
        in_button_rule = False
        
        for line in lines:
            if 'btn' in line.lower() or 'button' in line.lower():
                in_button_rule = True
            if in_button_rule:
                button_styles.append(line)
                if '}' in line and not '{' in line:
                    in_button_rule = False
                    button_styles.append('')  # blank line separator
        
        print("=== BUTTON STYLES FROM MODERNMATCH ===\n")
        print('\n'.join(button_styles))
    else:
        print("No <style> block found")
else:
    print(f"File not found: {modernmatch_path}")
