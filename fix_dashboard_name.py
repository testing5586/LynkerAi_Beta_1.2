import re

path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\static\templates\uxbot\guru-dashboard-main.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix common garbled text patterns
replacements = {
    '客户记录�?': '客户记录。',
    '比上月增�?': '比上月增加',
    '待结算金�?': '待结算金额',
    '客户满意�?': '客户满意度',
    '最近活�?': '最近活动',
    '新预约确�?': '新预约确认',
    '明天下�?': '明天下午3',
    '收到新评�?': '收到新评价',
    '5星好�?': '5星好评',
    '2小时�?': '2小时前',
    '4小时�?': '4小时前',
    '小贴�?': '小贴士',
    '客户预约�?': '客户预约。',
    '信誉度�?': '信誉度。',
    '转化率�?': '转化率。',
    '同命相知�?': '同命相知。',
    '知识�?': '知识库',
    '公开档案页管�?': '公开档案页管理',
    '咨询�?': '咨询数',
    '快速操�?': '快速操作',
    '�?20%': '+20%',
    '�?/span': '李</span',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed encoding issues')

