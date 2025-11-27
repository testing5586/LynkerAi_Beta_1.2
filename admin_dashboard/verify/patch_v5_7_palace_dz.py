# -*- coding: utf-8 -*-
"""
🔹 Ziwei TXT Parser v5.7 — 宫位地支提取器
精确识别「兄弟宮[己卯]」格式并提取地支干支
"""
import re

def extract_palace_dz(result):
    """提取每个宫位的地支信息"""
    palace_pattern = re.compile(
        r"^\s*[│├└]*\s*(?!主星|辅星|輔星|小星|大限|小限|流年)"
        r"([\u4e00-\u9fa5]{1,3})\s*[宫宮]?\s*\[([^\]]+?)\]",
        re.MULTILINE
    )
    
    raw_text = result.get("raw_text", "")
    if not raw_text:
        return result
    
    for m in palace_pattern.finditer(raw_text):
        palace_name = m.group(1)
        # 统一为简体"宫"
        if not palace_name.endswith("宫") and not palace_name.endswith("宮"):
            palace = palace_name + "宫"
        else:
            palace = palace_name.replace("宮", "宫")
        
        dizhi_raw = m.group(2).strip()
        
        # 提取地支（可能包含天干，如"己卯"或仅"卯"）
        m_dz = re.search(r"[甲乙丙丁戊己庚辛壬癸]?[子丑寅卯辰巳午未申酉戌亥]", dizhi_raw)
        dizhi = m_dz.group(0) if m_dz else dizhi_raw
        
        # 更新 star_map 中的地支信息
        if palace in result["star_map"]:
            if isinstance(result["star_map"][palace], dict):
                result["star_map"][palace]["地支"] = dizhi
    
    # 主宫地支写入 astro_fingerprint
    if "astro_fingerprint" not in result:
        result["astro_fingerprint"] = {}
    
    if "命宫" in result["star_map"]:
        dizhi = result["star_map"]["命宫"].get("地支", "")
        result["astro_fingerprint"]["主宫地支"] = dizhi
    
    return result


if __name__ == "__main__":
    # 测试用例
    test_result = {
        "raw_text": """
├命宮[己卯]
│ ├主星 : 貪狼[旺]
├兄弟宮[庚辰]
│ ├主星 : 太陰[平]
├財帛宮[戊子][身宮]
│ ├主星 : 破軍[廟]
        """,
        "star_map": {
            "命宫": {"主星": "貪狼", "辅星": "", "小星": "", "地支": ""},
            "兄弟宫": {"主星": "太陰", "辅星": "", "小星": "", "地支": ""},
            "财帛宫": {"主星": "破軍", "辅星": "", "小星": "", "地支": ""}
        },
        "astro_fingerprint": {}
    }
    
    result = extract_palace_dz(test_result)
    print("✅ 地支提取测试:")
    for palace, data in result["star_map"].items():
        print(f"  {palace}: 地支={data.get('地支', '未识别')}")
    print(f"\n主宫地支: {result['astro_fingerprint'].get('主宫地支', '未识别')}")
