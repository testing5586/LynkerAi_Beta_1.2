def detect_gezhu(star_map: dict):
    """根据星曜组合识别格局"""
    tags = []
    if not star_map:
        return tags

    # 紫府朝垣：紫微 + 天府
    for k, v in star_map.items():
        stars = v.get("主星", "")
        if "紫微" in stars and "天府" in stars:
            tags.append("紫府朝垣")
            break

    # 武杀同宫：武曲 + 七杀
    for k, v in star_map.items():
        stars = v.get("主星", "")
        if "武曲" in stars and "七殺" in stars:
            tags.append("武杀同宫")
            break

    # 日月并明：太阳 + 太阴
    for k, v in star_map.items():
        stars = v.get("主星", "")
        if "太陽" in stars and "太陰" in stars:
            tags.append("日月并明")
            break

    return list(set(tags))


def apply_pattern_patch(data: dict):
    """为现有 Ziwei JSON 数据注入格局标签"""
    star_map = data.get("star_map", {})
    tags = detect_gezhu(star_map)
    data["tags"] = tags
    return data


if __name__ == "__main__":
    test_map = {
        "命宫": {"主星": "紫微、天府"},
        "迁移宫": {"主星": "武曲、七殺"},
        "兄弟宫": {"主星": "太陽、太陰"}
    }
    from pprint import pprint
    pprint(apply_pattern_patch({"star_map": test_map}))
