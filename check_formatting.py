
with open(r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\routes\birth_input_routes_v4.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if "session['birth_data'] = {" in line:
            print(f"--- Context around line {i+1} ---")
            for j in range(max(0, i), min(len(lines), i+15)):
                print(f"{j+1}: {repr(lines[j])}")
            break
