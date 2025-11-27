# -*- coding: utf-8 -*-
"""
🔹 Ziwei TXT Parser v5.7 — 四化星自动提取器
提取 "禄→天机 权→天梁 科→紫微 忌→文曲" 等四化星
支持多种格式：→ : ： 以及繁简体
"""
import re

def extract_fourhua(result):
    """从原始文本中自动提取生年四化和流年四化"""
    raw_text = result.get("raw_text", "")
    if not raw_text:
        return result
    
    # 匹配格式：禄→天机 或 禄:天机 或 禄 天机
    pat = r"(禄|祿|权|權|科|忌)\s*[→:：\->]\s*([\u4e00-\u9fa5]+)"
    
    # 查找生年四化段落
    sn_segment = re.search(r"生年四化\s*[:：]?\s*([^\n\r]+)", raw_text)
    ln_segment = re.search(r"流年四化\s*[:：]?\s*([^\n\r]+)", raw_text)
    
    sn = {"禄": "", "权": "", "科": "", "忌": ""}
    ln = {"禄": "", "权": "", "科": "", "忌": ""}
    
    if sn_segment:
        pairs = re.findall(pat, sn_segment.group(1))
        for k, v in pairs:
            k_norm = "禄" if k in ["祿"] else ("权" if k == "權" else k)
            sn[k_norm] = v.strip()
    
    if ln_segment:
        pairs = re.findall(pat, ln_segment.group(1))
        for k, v in pairs:
            k_norm = "禄" if k in ["祿"] else ("权" if k == "權" else k)
            ln[k_norm] = v.strip()
    
    # 更新结果
    if "transformations" not in result:
        result["transformations"] = {}
    
    result["transformations"]["生年四化"] = sn
    result["transformations"]["流年四化"] = ln
    
    return result


if __name__ == "__main__":
    # 测试用例
    test_result = {
        "raw_text": """
文墨天機紫微斗數命盤

生年四化：禄→太陰 权→天機 科→天梁 忌→文曲
流年四化：禄→天同 权→天梁 科→文昌 忌→巨門

命宮[己卯]
├主星 : 貪狼[旺]
        """,
        "transformations": {}
    }
    
    result = extract_fourhua(test_result)
    print("✅ 四化提取测试:")
    print(f"生年四化: {result['transformations']['生年四化']}")
    print(f"流年四化: {result['transformations']['流年四化']}")
