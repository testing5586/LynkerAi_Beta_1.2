import json

def parse_wenmo_ai_json(obj):
    """
    修复版：确保 star_map 保持 dict 结构（不是 keys 列表）
    """
    result = {"basic_info": {}, "star_map": {}, "transformations": {}}
    print("[Ziwei Parser Debug] 原始 JSON 顶层字段:", list(obj.keys()))

    # ---- 1️⃣ 基本信息 ----
    basic = obj.get("basic_info", {})
    result["basic_info"] = {
        "性别": basic.get("性别", ""),
        "命主": basic.get("命主", ""),
        "身主": basic.get("身主", ""),
        "真太阳时": basic.get("真太陽時", basic.get("真太阳时", "")),
        "阳历日期": basic.get("陽曆日期", basic.get("阳历日期", "")),
        "阴历日期": basic.get("農曆時間", basic.get("阴历日期", "")),
    }

    # ---- 2️⃣ 星曜分布 ----
    smap = obj.get("star_map", {})
    fixed_map = {}
    for palace, stars in smap.items():
        # 保留完整字典结构（主星、辅星、小星）
        if isinstance(stars, dict):
            fixed_map[palace] = {
                "地支": stars.get("地支", ""),
                "主星": stars.get("主星", ""),
                "辅星": stars.get("辅星", ""),
                "小星": stars.get("小星", "")
            }
        else:
            print(f"[警告] {palace} 不是字典，跳过 ({type(stars)})")
    result["star_map"] = fixed_map

    # ---- 3️⃣ 四化 ----
    result["transformations"] = obj.get("transformations", {})

    print(f"[Ziwei Parser Debug] ✅ 修复完成: 共 {len(fixed_map)} 宫位")
    return result


# 🔍 测试部分
if __name__ == "__main__":
    data = json.load(open("../wenmo_parsed_sample.json", encoding="utf-8"))
    parsed = parse_wenmo_ai_json(data)
    print(json.dumps(parsed, ensure_ascii=False, indent=2)[:1200])
