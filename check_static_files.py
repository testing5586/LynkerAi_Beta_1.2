
import os

# Check static folder structure
static_root = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static'

if os.path.exists(static_root):
    print(f"✓ Static folder exists: {static_root}\n")
    
    # List all subdirectories
    for root, dirs, files in os.walk(static_root):
        level = root.replace(static_root, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 2 * (level + 1)
        for file in files:
            if file.endswith(('.css', '.js')):
                print(f'{subindent}{file}')
else:
    print("✗ Static folder not found")

# Check for common.css specifically
common_css = os.path.join(static_root, 'css', 'common.css')
bazimatch_js = os.path.join(static_root, 'js', 'bazimatch.js')

print("\n=== CRITICAL FILES ===")
print(f"common.css: {'✓ EXISTS' if os.path.exists(common_css) else '✗ NOT FOUND'}")
print(f"bazimatch.js: {'✓ EXISTS' if os.path.exists(bazimatch_js) else '✗ NOT FOUND'}")

# Also check alternative locations
alt_static = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\static'
if os.path.exists(alt_static):
    print(f"\n✓ Alternative static folder found: {alt_static}")
