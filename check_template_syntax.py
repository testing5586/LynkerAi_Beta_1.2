
import os

template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(template_file):
    with open(template_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("=== CHECKING FOR url_for ISSUES ===\n")
    
    for i, line in enumerate(lines, 1):
        if 'url_for' in line:
            print(f"Line {i}: {line.strip()}")
    
    print("\n=== CHECKING FOR Jinja2 SYNTAX ERRORS ===\n")
    
    content = ''.join(lines)
    
    # Check for unmatched braces
    open_braces = content.count('{{')
    close_braces = content.count('}}')
    print(f"{{ count: {open_braces}")
    print(f"}} count: {close_braces}")
    
    if open_braces != close_braces:
        print("⚠ MISMATCH: Unbalanced Jinja2 braces!")
    else:
        print("✓ Jinja2 braces balanced")
    
    # Check for common issues
    if "url_for('static'" in content:
        print("⚠ Found url_for('static') - should be url_for('bazi.static')")
    
    if "url_for('index')" in content:
        print("⚠ Found url_for('index') - should be url_for('bazi.index')")

else:
    print("File not found")
