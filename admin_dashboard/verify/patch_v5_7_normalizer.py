# -*- coding: utf-8 -*-
"""
🔹 Ziwei TXT Parser v5.7 — 数据标准化器
繁简体统一、状态归类、地支正则清洗
"""

def normalize_result(result):
    """标准化处理：繁简体统一、状态归一化"""
    
    # 1. 繁简体状态统一
    for palace, data in result.get("star_map", {}).items():
        if not isinstance(data, dict):
            continue
        
        for key in ["主星", "辅星", "小星"]:
            stars = data.get(key, [])
            if not isinstance(stars, list):
                continue
            
            for star in stars:
                if not isinstance(star, dict):
                    continue
                
                # 繁体转简体
                state = star.get("状态", "")
                if state == "庙":
                    star["状态"] = "廟"
                elif state in ["祿"]:
                    star["状态"] = "禄"
                elif state in ["權"]:
                    star["状态"] = "权"
    
    # 2. 四化繁简体统一
    if "transformations" in result:
        for hua_type in ["生年四化", "流年四化"]:
            if hua_type in result["transformations"]:
                hua_data = result["transformations"][hua_type]
                if isinstance(hua_data, dict):
                    # 确保键名统一为简体
                    normalized = {}
                    for k, v in hua_data.items():
                        k_norm = k.replace("祿", "禄").replace("權", "权")
                        normalized[k_norm] = v
                    result["transformations"][hua_type] = normalized
    
    # 3. 地支清洗（移除非法字符）
    for palace, data in result.get("star_map", {}).items():
        if isinstance(data, dict) and "地支" in data:
            dz = data["地支"]
            # 只保留合法天干地支字符
            import re
            clean = re.search(r"[甲乙丙丁戊己庚辛壬癸]?[子丑寅卯辰巳午未申酉戌亥]", dz)
            if clean:
                data["地支"] = clean.group(0)
    
    return result


if __name__ == "__main__":
    # 测试用例
    test_result = {
        "star_map": {
            "命宫": {
                "主星": [{"名": "貪狼", "状态": "庙", "标签": []}],
                "地支": "己卯[身宮]"
            }
        },
        "transformations": {
            "生年四化": {"祿": "太陰", "權": "天機", "科": "天梁", "忌": "文曲"}
        }
    }
    
    result = normalize_result(test_result)
    print("✅ 标准化测试:")
    print(f"命宫主星状态: {result['star_map']['命宫']['主星'][0]['状态']}")
    print(f"命宫地支: {result['star_map']['命宫']['地支']}")
    print(f"生年四化: {result['transformations']['生年四化']}")
