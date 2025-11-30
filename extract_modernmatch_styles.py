
import os

modernmatch_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\modernmatch_unified_v3.html'

if os.path.exists(modernmatch_path):
    with open(modernmatch_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the complete style block
    if '<style>' in content:
        start = content.find('<style>')
        end = content.find('</style>', start) + 8
        styles = content[start:end]
        
        # Save to file for inspection
        output_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\modernmatch_styles_extracted.css'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(styles)
        
        print(f"Extracted styles saved to: {output_path}")
        print(f"Style block size: {len(styles)} characters")
        
        # Show first 2000 chars
        print("\n=== FIRST 2000 CHARS ===\n")
        print(styles[:2000])
        
else:
    print("File not found")
