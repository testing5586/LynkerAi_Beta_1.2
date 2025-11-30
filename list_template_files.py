
import os

templates_dir = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates'

if os.path.exists(templates_dir):
    print("=== TEMPLATE FILES ===\n")
    for file in os.listdir(templates_dir):
        if 'bazi' in file.lower() and file.endswith('.html'):
            filepath = os.path.join(templates_dir, file)
            size = os.path.getsize(filepath)
            print(f"{file:<40} {size:>8} bytes")
            
            # Check first line to identify
            with open(filepath, 'r', encoding='utf-8') as f:
                first_line = f.readline().strip()
                if 'bootstrap' in first_line.lower():
                    print(f"  → Uses Bootstrap")
                elif 'common.css' in first_line.lower() or 'common.css' in f.read(500):
                    print(f"  → Uses common.css")
