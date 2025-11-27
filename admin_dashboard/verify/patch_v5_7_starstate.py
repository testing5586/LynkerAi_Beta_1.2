# -*- coding: utf-8 -*-
"""
🔹 Ziwei TXT Parser v5.7 — 星曜状态解析器
解析 [廟/庙][旺][平][陷][得][利][不] 与 [生年忌][↑忌][↓科] 等状态
"""
import re

def extract_starstate(result):
    """解析星曜状态标记"""
    star_pattern = re.compile(r"([\u4e00-\u9fa5]+)\[([^\]]+)\]")
    states = ["廟", "庙", "旺", "平", "陷", "得", "利", "不"]
    
    for palace, data in result["star_map"].items():
        if not isinstance(data, dict):
            continue
            
        for key in ["主星", "辅星", "小星"]:
            raw = data.get(key, "")
            if not raw or not isinstance(raw, str):
                continue
            
            parsed = []
            for name, tag in star_pattern.findall(raw):
                # 提取所有标签
                taglist = re.findall(r"(廟|庙|旺|平|陷|得|利|不|生年.{1,2}|↑.{1,2}|↓.{1,2})", tag)
                
                # 确定主要状态
                state = next((t for t in taglist if t in states), "")
                
                parsed.append({
                    "名": name.strip(),
                    "状态": state,
                    "标签": taglist
                })
            
            # 如果成功解析，则替换为结构化数据
            if parsed:
                data[key] = parsed
            elif raw and "、" in raw:
                # 处理无状态标记的星曜（如"左輔、右弼"）
                stars = [s.strip() for s in raw.split("、") if s.strip()]
                data[key] = [{"名": s, "状态": "", "标签": []} for s in stars]
    
    return result


if __name__ == "__main__":
    # 测试用例
    test_result = {
        "star_map": {
            "命宫": {
                "主星": "貪狼[旺]",
                "辅星": "右弼[旺]、擎羊[旺]",
                "小星": "天官[旺]、天空[陷]"
            },
            "财帛宫": {
                "主星": "破軍[廟]、武曲[生年忌]",
                "辅星": "天魁[旺]",
                "小星": "紅鸞[廟]、咸池[陷]"
            }
        }
    }
    
    result = extract_starstate(test_result)
    print("✅ 星曜状态解析测试:")
    for palace, data in result["star_map"].items():
        print(f"\n{palace}:")
        for key in ["主星", "辅星", "小星"]:
            stars = data.get(key, [])
            if stars:
                print(f"  {key}:")
                for s in stars:
                    print(f"    - {s['名']} [{s['状态']}] 标签={s['标签']}")
