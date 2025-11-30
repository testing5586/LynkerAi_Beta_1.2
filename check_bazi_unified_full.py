
import os

bazi_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(bazi_path):
    with open(bazi_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"File size: {len(content)} bytes")
    print("\n=== FIRST 1000 CHARS ===\n")
    print(content[:1000])
    print("\n\n=== LAST 500 CHARS ===\n")
    print(content[-500:])
else:
    print("File not found")
