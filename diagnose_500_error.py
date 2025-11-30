
import os

# Check if the route file exists and is valid
route_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes\birth_input_routes_v4.py'

if os.path.exists(route_file):
    with open(route_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the /bazi/match route
    if '@bazi_bp.route' in content:
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if '/match' in line or 'bazi_match' in line:
                start = max(0, i - 5)
                end = min(len(lines), i + 20)
                print(f"=== /bazi/match ROUTE (Lines {start}-{end}) ===\n")
                for j in range(start, end):
                    print(f"{j+1:4d}: {lines[j]}")
                print("\n")
                break
else:
    print("Route file not found")

# Check template file
template_file = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(template_file):
    with open(template_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"\n=== TEMPLATE CHECK ===")
    print(f"File size: {len(content)} bytes")
    print(f"First 200 chars:\n{content[:200]}")
    
    # Check for syntax issues
    if '{{' in content and '}}' in content:
        print("✓ Jinja2 syntax found")
    
    # Check for url_for usage
    if "url_for('bazi." in content:
        print("✓ url_for('bazi.xxx') found")
    elif "url_for(" in content:
        print("⚠ url_for found but might need 'bazi.' prefix")
else:
    print("Template file not found")
