import re, json

def extract_fourhua(txt: str):
    """自动提取生年四化、流年四化并返回字典"""
    def _parse_segment(segment):
        res = {"禄": "", "权": "", "科": "", "忌": ""}
        # 匹配格式：禄→天機 或 禄:天機 或 禄 天機
        pattern = r"(禄|祿|权|科|忌)\s*[:：→]\s*([^\s,，;；]+)"
        matches = re.findall(pattern, segment)
        for k, v in matches:
            if k == "祿": k = "禄"
            res[k] = v.strip("、,，")
        return res

    seg_sn = re.search(r"(生年四化\s*[:：→].*?)(?:流年四化|$)", txt, re.DOTALL)
    seg_ln = re.search(r"(流年四化\s*[:：→].*)", txt)
    sn = _parse_segment(seg_sn.group(1)) if seg_sn else {"禄": "", "权": "", "科": "", "忌": ""}
    ln = _parse_segment(seg_ln.group(1)) if seg_ln else {"禄": "", "权": "", "科": "", "忌": ""}
    return {"生年四化": sn, "流年四化": ln}


def apply_fourhua_patch(data: dict, raw_txt: str):
    """为现有 Ziwei JSON 数据注入四化星信息"""
    if not data or "transformations" not in data:
        data["transformations"] = {}
    data["transformations"].update(extract_fourhua(raw_txt))
    return data


if __name__ == "__main__":
    sample = """
    生年四化：禄→天機 权→天梁 科→紫微 忌→文曲
    流年四化：禄→天同 权→天梁 科→文昌 忌→巨門
    """
    result = extract_fourhua(sample)
    print("✅ 四化提取测试结果：")
    print(json.dumps(result, ensure_ascii=False, indent=2))
