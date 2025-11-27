# === Ziwei TXT Patch v5.9: 四化标签内嵌星曜 ===
# 自动把 transformations 中的四化数据注入到星曜标签中
# 支持繁简体兼容（禄/祿、权/權、科、忌）

def _normalize_star_name(name):
    """繁简体星曜名称标准化"""
    if not name:
        return ""
    # 繁→简
    mapping = {
        '太陰': '太阴', '天機': '天机', '廉貞': '廉贞',
        '貪狼': '贪狼', '巨門': '巨门', '祿存': '禄存',
        '擎羊': '擎羊', '陀羅': '陀罗', '鈴星': '铃星'
    }
    return mapping.get(name.strip(), name.strip())

def patch_fourhua_embed(result):
    if not result or 'transformations' not in result or 'star_map' not in result:
        return result

    transformations = result.get('transformations', {})
    star_map = result.get('star_map', {})

    # 合并生年与流年四化（支持多个四化同名星）
    hua_mapping = {}  # {normalized_star_name: [四化列表]}
    
    for hua_type in ['生年四化', '流年四化']:
        hua_dict = transformations.get(hua_type, {})
        for hua_char, star_name in hua_dict.items():
            if not star_name:
                continue
            norm_name = _normalize_star_name(star_name)
            hua_mapping.setdefault(norm_name, [])
            # 繁简体四化字符兼容
            hua_char_normalized = hua_char.replace('祿', '禄').replace('權', '权')
            if hua_char_normalized not in hua_mapping[norm_name]:
                hua_mapping[norm_name].append(hua_char_normalized)

    embed_count = 0
    # 遍历所有宫位和星曜
    for palace, info in star_map.items():
        if not isinstance(info, dict):
            continue
        for layer in ['主星', '辅星', '小星']:
            stars = info.get(layer, [])
            if not isinstance(stars, list):
                continue

            for s in stars:
                if not isinstance(s, dict):
                    continue
                    
                star_name = s.get('名', '')
                norm_name = _normalize_star_name(star_name)
                
                # 检查是否有对应的四化
                if norm_name in hua_mapping:
                    s.setdefault('标签', [])
                    for hua in hua_mapping[norm_name]:
                        if hua not in s['标签']:
                            s['标签'].append(hua)
                            embed_count += 1

    # 标记执行状态
    result.setdefault('meta', {})
    result['meta']['fourhua_embedded'] = True
    print(f"[TXT Patch v5.9] ✅ 已将 {embed_count} 个四化标签嵌入到星曜（涉及 {len(hua_mapping)} 颗四化星）")
    return result
