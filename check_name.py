path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\static\templates\uxbot\guru-dashboard-main.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = 'id="guru-name-display"'
idx = content.find(target)
if idx != -1:
    print('Context around name element (300 chars):')
    print(repr(content[idx:idx+300]))
else:
    print('NOT FOUND')
