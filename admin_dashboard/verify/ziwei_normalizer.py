# -*- coding: utf-8 -*-
"""
🔧 LynkerAI 紫微斗数验证系统 - Normalizer v1.1
Layer 2: 将 Vision 层的原始 OCR 输出标准化为 ZiweiAI_v1.1 结构
"""

from datetime import datetime
from typing import Union, Dict, Any
import re


def _empty_v11():
    """
    返回空的 ZiweiAI_v1.1 标准结构
    """
    return {
        "meta": {
            "parser_version": "ZiweiAI_v1.1",
            "source": "",
            "system": "LynkerAI ZiweiAI",
            "timestamp": datetime.now().isoformat()
        },
        "basic_info": {
            "性别": "",
            "真太阳时": "",
            "阳历日期": "",
            "阴历日期": "",
            "命局": "",
            "命主": "",
            "身主": "",
            "出生地": ""
        },
        "star_map": {},
        "transformations": {
            "生年四化": {"禄": "", "权": "", "科": "", "忌": ""},
            "流年四化": {"禄": "", "权": "", "科": "", "忌": ""}
        },
        "tags": {
            "格局": [],
            "性格": [],
            "优势": [],
            "风险因子": []
        },
        "astro_fingerprint": [],
        "relationship_vector": {},
        "environment": {},
        "risk": {}
    }


def re_search(pattern, text):
    """
    安全的正则搜索辅助函数
    """
    m = re.search(pattern, text)
    return m.group(1).strip() if m else None


def parse_wenmo_text(text: str) -> Dict[str, Any]:
    """
    精确解析文墨天机导出的 .txt 紫微命盘（v1.3 更新版）
    """
    import re, json

    out = {
        "meta": {"parser_version": "ZiweiAI_v1.3"},
        "basic_info": {},
        "star_map": {},
        "transformations": {},
        "tags": {}
    }

    # 🔹 提取基本信息
    basic_section = re.search(r"基本信息([\s\S]+?)命盤十二宮", text)
    if basic_section:
        for line in basic_section.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                out["basic_info"][k.strip().replace("│", "").replace("├", "").replace("└", "")] = v.strip()

    # 🔹 匹配命盤十二宮区块
    palace_blocks = re.findall(
        r"├[^\n]*?([命兄夫子财疾迁友官田福父][^宫宮]*[宫宮])\[[^\]]+\][\s\S]*?(?=\n│\s*├|\n└|\Z)",
        text
    )

    # 🔹 对每个宫位再抽取主星、辅星、小星、化星
    for block in re.finditer(
        r"├\s*([命兄夫子财疾迁友官田福父][^宫宮]*[宫宮])\[[^\]]+\]([\s\S]*?)(?=\n│\s*├|\n└|\Z)",
        text
    ):
        palace_name = block.group(1).strip().replace("  ", "").replace("宮", "宫")
        content = block.group(2)

        main_star = re.findall(r"主星\s*:\s*([^\n]+)", content)
        sub_star = re.findall(r"輔星\s*:\s*([^\n]+)", content)
        minor_star = re.findall(r"小星\s*:\s*([^\n]+)", content)
        trans_star = re.findall(r"神煞[\s\S]*?(?=\n│\s*├|\n└|\Z)", content)

        def clean(s):
            return re.sub(r"\[[^\]]*\]", "", s).replace("，", ",").strip()

        out["star_map"][palace_name] = {
            "主星": clean(main_star[0]) if main_star else "",
            "辅星": clean(sub_star[0]) if sub_star else "",
            "小星": clean(minor_star[0]) if minor_star else "",
            "化星": ""
        }

    print(f"[Ziwei Parser Debug] 找到 {len(out['star_map'])} 个宫位: {list(out['star_map'].keys())}")
    return out


def normalize_ziwei(raw_json: Union[str, Dict[str, Any]], user_profile=None):
    """
    第2层：将 Vision 层 OCR 输出标准化为 ZiweiAI_v1.1 结构
    
    参数:
        raw_json: str/dict, 可以是文墨天机 .txt 文本、Vision Agent 输出或 Parser 层输出
        user_profile: dict, 可选的用户资料（用于自动补全）
        
    返回:
        dict: 标准化的紫微命盘 JSON 结构（v1.1）
    """
    
    print(f"[Normalizer v1.1] 开始标准化处理...")
    print(f"[Normalizer Debug] 收到数据类型: {type(raw_json)}")
    
    # 🔧 Step 1: 如果是字符串（.txt 文本格式），先解析为字典
    if isinstance(raw_json, str):
        print("[Normalizer Debug] 检测到字符串输入，尝试解析文墨天机文本格式")
        if len(raw_json.strip()) < 10:
            print("[Normalizer] ⚠️ 文本内容过短，无法解析")
            return _empty_v11()
        
        # 调用文本解析器
        parsed_data = parse_wenmo_text(raw_json)
        if not parsed_data or not parsed_data.get("meta"):
            print("[Normalizer] ⚠️ 文本解析失败，返回空结构")
            return _empty_v11()
        
        # 文本解析器已返回完整结构，直接返回
        print("[Normalizer Debug] 文本解析成功，直接返回解析结果")
        return parsed_data
    
    # 🔧 Step 2: 如果不是字典，返回空结构
    if not isinstance(raw_json, dict):
        print(f"[Normalizer] ⚠️ 输入类型不支持: {type(raw_json)}，返回空结构")
        return _empty_v11()
    
    print(f"[Normalizer Debug] 数据顶层字段: {list(raw_json.keys())}")
    
    # 🔧 Step 3: 兼容 Parser 层直接输出（已经是标准结构，不需要再包装）
    if raw_json.get("meta") and raw_json.get("basic_info"):
        print("[Normalizer Debug] 检测到 Parser 层直接输出，跳过数据提取")
        data = raw_json
    else:
        # 提取原始数据（Vision 层输出）
        if not raw_json.get("success"):
            print(f"[Normalizer] ❌ Vision 层识别失败")
            return {
                "success": False,
                "error": raw_json.get("error", "识别失败")
            }
        data = raw_json.get("data", {})
    
    print(f"[Normalizer] 收到数据字段: {list(data.keys())}")
    
    # 提取 meta（v1.1 版本标识）
    meta = data.get("meta", {})
    if not meta:
        meta = {
            "parser_version": "ZiweiAI_v1.1",
            "source": "文墨天机",
            "system": "LynkerAI ZiweiAI",
            "timestamp": datetime.now().isoformat(),
            "ocr_timestamp": raw_json.get("timestamp")
        }
    else:
        meta["parser_version"] = "ZiweiAI_v1.1"
        meta["system"] = "LynkerAI ZiweiAI"
    
    # 提取基本信息（支持中英文键名）
    basic_info_raw = data.get("basic_info", {})
    normalized_basic_info = {
        "性别": basic_info_raw.get("性别") or basic_info_raw.get("gender", ""),
        "真太阳时": basic_info_raw.get("真太阳时") or basic_info_raw.get("true_solar_time", ""),
        "阳历日期": basic_info_raw.get("阳历日期") or basic_info_raw.get("solar_date", ""),
        "阴历日期": basic_info_raw.get("阴历日期") or basic_info_raw.get("lunar_date", ""),
        "命局": basic_info_raw.get("命局") or basic_info_raw.get("life_bureau", ""),
        "命主": basic_info_raw.get("命主") or basic_info_raw.get("destiny_master", ""),
        "身主": basic_info_raw.get("身主") or basic_info_raw.get("body_master", ""),
        "出生地": basic_info_raw.get("出生地") or basic_info_raw.get("birthplace", "")
    }
    
    # 自动补全：如果缺少性别且有用户资料
    if not normalized_basic_info["性别"] and user_profile:
        if user_profile.get("gender"):
            normalized_basic_info["性别"] = user_profile["gender"]
            print(f"[Normalizer] 自动补全性别: {user_profile['gender']}")
    
    # 标准化星曜分布（十二宫）
    star_map_raw = data.get("star_map", {})
    clean_star_map = {}
    
    # 定义标准十二宫顺序
    standard_palaces = [
        "命宫", "兄弟宫", "夫妻宫", "子女宫", "财帛宫", "疾厄宫",
        "迁移宫", "交友宫", "官禄宫", "田宅宫", "福德宫", "父母宫"
    ]
    
    for palace in standard_palaces:
        stars = star_map_raw.get(palace, {})
        
        # ✅ v1.3 修复：如果已经是字典格式（Parser v1.3 输出），直接保留
        if isinstance(stars, dict):
            clean_star_map[palace] = stars
            continue
        
        # 如果是字符串，分割成列表
        if isinstance(stars, str):
            stars = re.split(r"[，、\s]+", stars)
        
        # 过滤空字符串（处理旧格式的列表数据）
        clean_stars = [s.strip() for s in stars if s.strip()]
        clean_star_map[palace] = clean_stars
    
    print(f"[Normalizer] 已标准化 {len(clean_star_map)} 个宫位")
    
    # 标准化四化信息（v1.1 嵌套结构：生年四化 + 流年四化）
    transformations_raw = data.get("transformations", {})
    normalized_transformations = _normalize_transformations(transformations_raw)
    
    # 提取标签（v1.1 分类结构）
    tags_raw = data.get("tags", [])
    normalized_tags = _normalize_tags(tags_raw, clean_star_map, normalized_transformations)
    
    # 提取风险评估
    risk = data.get("risk", {})
    
    # ✨ v1.1 新增：生成星盘指纹（astro_fingerprint）
    astro_fingerprint = _generate_astro_fingerprint(
        clean_star_map, 
        normalized_transformations, 
        normalized_basic_info
    )
    
    # ✨ v1.1 新增：生成关系向量（relationship_vector）
    relationship_vector = _generate_relationship_vector(
        clean_star_map, 
        normalized_transformations,
        normalized_tags
    )
    
    # ✨ v1.1 新增：环境信息（environment）
    environment = _normalize_environment(data.get("environment", {}), user_profile)
    
    # ✨ v4.0 新增：保留大限/小限/流年数据（来自 TXT Patch v4.0）
    da_xian = data.get("大限", [])
    xiao_xian = data.get("小限", [])
    liu_nian = data.get("流年", [])
    
    print(f"[Normalizer v1.1] ✅ 标准化完成")
    if da_xian or xiao_xian or liu_nian:
        print(f"[Normalizer v4.0] ✅ 保留增强数据: 大限={len(da_xian)}条, 小限={len(xiao_xian)}条, 流年={len(liu_nian)}条")
    
    # 返回标准化结果（v1.1 完整结构 + v4.0 增强）
    result = {
        "success": True,
        "meta": meta,
        "basic_info": normalized_basic_info,
        "astro_fingerprint": astro_fingerprint,
        "star_map": clean_star_map,
        "transformations": normalized_transformations,
        "tags": normalized_tags,
        "relationship_vector": relationship_vector,
        "environment": environment,
        "risk": risk
    }
    
    # v4.0 增强字段（如果存在）
    if da_xian:
        result["大限"] = da_xian
    if xiao_xian:
        result["小限"] = xiao_xian
    if liu_nian:
        result["流年"] = liu_nian
    
    return result


def _normalize_transformations(transformations_raw):
    """
    标准化四化信息为 v1.1 嵌套结构
    
    返回格式:
    {
        "生年四化": {"禄": "天机", "权": "天梁", "科": "紫微", "忌": "文曲"},
        "流年四化": {"禄": "武曲", "权": "天府", "科": "太阳", "忌": "巨门"}
    }
    """
    result = {
        "生年四化": {"禄": "", "权": "", "科": "", "忌": ""},
        "流年四化": {"禄": "", "权": "", "科": "", "忌": ""}
    }
    
    # 检查是否已经是嵌套格式
    if "生年四化" in transformations_raw:
        sheng_nian = transformations_raw.get("生年四化", {})
        result["生年四化"] = {
            "禄": sheng_nian.get("禄", ""),
            "权": sheng_nian.get("权", ""),
            "科": sheng_nian.get("科", ""),
            "忌": sheng_nian.get("忌", "")
        }
    else:
        # 平的格式，默认为生年四化
        result["生年四化"] = {
            "禄": transformations_raw.get("化禄", ""),
            "权": transformations_raw.get("化权", ""),
            "科": transformations_raw.get("化科", ""),
            "忌": transformations_raw.get("化忌", "")
        }
    
    # 提取流年四化（如果有）
    if "流年四化" in transformations_raw:
        liu_nian = transformations_raw.get("流年四化", {})
        result["流年四化"] = {
            "禄": liu_nian.get("禄", ""),
            "权": liu_nian.get("权", ""),
            "科": liu_nian.get("科", ""),
            "忌": liu_nian.get("忌", "")
        }
    
    return result


def _normalize_tags(tags_raw, star_map, transformations):
    """
    标准化标签为 v1.1 分类结构
    
    返回格式:
    {
        "格局": ["天府坐命格", "禄权双美"],
        "性格": ["稳重", "谨慎", "理性"],
        "优势": ["管理力强", "财务思维佳"],
        "风险因子": ["迁移宫化忌", "夫妻宫冲动"]
    }
    """
    result = {
        "格局": [],
        "性格": [],
        "优势": [],
        "风险因子": []
    }
    
    # 如果已经是分类结构
    if isinstance(tags_raw, dict):
        for key in ["格局", "性格", "优势", "风险因子"]:
            if key in tags_raw:
                result[key] = tags_raw[key] if isinstance(tags_raw[key], list) else [tags_raw[key]]
    elif isinstance(tags_raw, list):
        # 简单列表，默认归入格局
        result["格局"] = tags_raw
    
    # 自动生成标签
    auto_tags = _generate_auto_tags(star_map, transformations)
    
    # 合并自动标签
    for category, tag_list in auto_tags.items():
        result[category].extend(tag_list)
        result[category] = list(set(result[category]))  # 去重
    
    return result


def _generate_auto_tags(star_map, transformations):
    """
    根据星曜分布自动生成分类标签
    """
    tags = {
        "格局": [],
        "性格": [],
        "优势": [],
        "风险因子": []
    }
    
    ming_gong = star_map.get("命宫", [])
    
    # 格局识别
    if "紫微" in ming_gong:
        tags["格局"].append("紫微坐命格")
        tags["性格"].extend(["领导力强", "自信"])
    if "天府" in ming_gong:
        tags["格局"].append("天府坐命格")
        tags["性格"].extend(["稳重", "谨慎"])
    if "武曲" in ming_gong:
        tags["优势"].append("财务思维佳")
    
    # 四化组合
    sheng_nian = transformations.get("生年四化", {})
    if sheng_nian.get("禄") and sheng_nian.get("权"):
        tags["格局"].append("禄权双美")
    
    # 风险因子检测
    if "化忌" in str(star_map.get("迁移宫", [])):
        tags["风险因子"].append("迁移宫化忌")
    if "破军" in star_map.get("夫妻宫", []):
        tags["风险因子"].append("夫妻宫破军")
    
    return tags


def _generate_astro_fingerprint(star_map, transformations, basic_info):
    """
    生成星盘指纹（v1.1 新增）
    
    返回:
    {
        "主星组合编码": "天府-天梁-武曲",
        "化星组合编码": "禄权科忌=天机-天梁-紫微-文曲",
        "局数编码": "金四局",
        "主宫地支": "巳",
        "星曜矩阵": [["命宫", "天府"], ["夫妻宫", "廉贞、破军"], ...]
    }
    """
    ming_gong_stars = star_map.get("命宫", [])
    
    # 主星组合编码（取命宫前3颗主星）
    main_stars = [s for s in ming_gong_stars if s in [
        "紫微", "天府", "武曲", "天相", "太阳", "太阴", 
        "贪狼", "巨门", "天机", "天梁", "七杀", "破军", "廉贞", "天同"
    ]][:3]
    main_combo = "-".join(main_stars) if main_stars else "无主星"
    
    # 化星组合编码
    sheng_nian = transformations.get("生年四化", {})
    hua_combo = f"禄权科忌={sheng_nian.get('禄', '')}-{sheng_nian.get('权', '')}-{sheng_nian.get('科', '')}-{sheng_nian.get('忌', '')}"
    
    # 局数编码
    ju_shu = basic_info.get("命局", "")
    
    # 星曜矩阵（重要宫位的星曜列表）
    important_palaces = ["命宫", "夫妻宫", "迁移宫", "财帛宫", "官禄宫"]
    star_matrix = []
    for palace in important_palaces:
        stars = star_map.get(palace, [])
        if stars:
            star_matrix.append([palace, "、".join(stars)])
    
    return {
        "主星组合编码": main_combo,
        "化星组合编码": hua_combo,
        "局数编码": ju_shu,
        "主宫地支": _extract_dizhi(basic_info),
        "星曜矩阵": star_matrix
    }


def _extract_dizhi(basic_info):
    """
    从命局信息中提取地支（简化实现）
    """
    ju_shu = basic_info.get("命局", "")
    dizhi_map = {
        "子": "子", "丑": "丑", "寅": "寅", "卯": "卯",
        "辰": "辰", "巳": "巳", "午": "午", "未": "未",
        "申": "申", "酉": "酉", "戌": "戌", "亥": "亥"
    }
    for dz in dizhi_map:
        if dz in ju_shu:
            return dz
    return ""


def _generate_relationship_vector(star_map, transformations, tags):
    """
    生成关系向量（v1.1 新增）
    
    返回四维评分（0.0-1.0）:
    {
        "婚姻": 0.82,
        "事业": 0.91,
        "健康": 0.78,
        "人际": 0.74
    }
    """
    # 基础分数
    scores = {
        "婚姻": 0.70,
        "事业": 0.70,
        "健康": 0.70,
        "人际": 0.70
    }
    
    # 婚姻评分逻辑
    fu_qi_gong = star_map.get("夫妻宫", [])
    if "紫微" in fu_qi_gong or "天府" in fu_qi_gong:
        scores["婚姻"] += 0.15
    if "破军" in fu_qi_gong or "七杀" in fu_qi_gong:
        scores["婚姻"] -= 0.10
    
    # 事业评分逻辑
    guan_lu_gong = star_map.get("官禄宫", [])
    if "紫微" in guan_lu_gong or "武曲" in guan_lu_gong:
        scores["事业"] += 0.20
    if tags.get("格局") and "禄权双美" in tags["格局"]:
        scores["事业"] += 0.10
    
    # 健康评分逻辑
    ji_e_gong = star_map.get("疾厄宫", [])
    if not ji_e_gong or "无主星" in str(ji_e_gong):
        scores["健康"] += 0.10
    
    # 人际评分逻辑
    jiao_you_gong = star_map.get("交友宫", [])
    if "天同" in jiao_you_gong or "天梁" in jiao_you_gong:
        scores["人际"] += 0.15
    
    # 限制在 0.0-1.0 范围
    for key in scores:
        scores[key] = max(0.0, min(1.0, scores[key]))
        scores[key] = round(scores[key], 2)
    
    return scores


def _normalize_environment(env_raw, user_profile):
    """
    标准化环境信息（v1.1 新增）
    
    返回:
    {
        "city": "吉隆坡",
        "country": "马来西亚",
        "climate_zone": "热带",
        "humidity_type": "潮湿",
        "terrain_type": "沿海"
    }
    """
    result = {
        "city": env_raw.get("city", ""),
        "country": env_raw.get("country", ""),
        "climate_zone": env_raw.get("climate_zone", ""),
        "humidity_type": env_raw.get("humidity_type", ""),
        "terrain_type": env_raw.get("terrain_type", "")
    }
    
    # 从用户资料自动补全
    if user_profile:
        if not result["city"] and user_profile.get("city"):
            result["city"] = user_profile["city"]
        if not result["country"] and user_profile.get("country"):
            result["country"] = user_profile["country"]
    
    return result


def validate_ziwei_structure(normalized_json):
    """
    验证标准化后的紫微命盘结构是否完整（v1.1）
    
    参数:
        normalized_json: dict, 标准化后的紫微命盘数据
        
    返回:
        dict: 验证结果 {"valid": bool, "errors": list, "warnings": list}
    """
    errors = []
    warnings = []
    
    # 检查必要字段（v1.1）
    required_fields = [
        "meta", "basic_info", "astro_fingerprint", "star_map", 
        "transformations", "tags", "relationship_vector", "environment"
    ]
    for field in required_fields:
        if field not in normalized_json:
            errors.append(f"缺少必要字段: {field}")
    
    # 检查十二宫是否完整
    if "star_map" in normalized_json:
        standard_palaces = [
            "命宫", "兄弟宫", "夫妻宫", "子女宫", "财帛宫", "疾厄宫",
            "迁移宫", "交友宫", "官禄宫", "田宅宫", "福德宫", "父母宫"
        ]
        
        star_map = normalized_json["star_map"]
        for palace in standard_palaces:
            if palace not in star_map:
                warnings.append(f"缺少宫位: {palace}")
    
    # 检查四化结构（v1.1 嵌套格式）
    if "transformations" in normalized_json:
        trans = normalized_json["transformations"]
        if "生年四化" not in trans:
            warnings.append("缺少生年四化信息")
        else:
            for hua in ["禄", "权", "科", "忌"]:
                if not trans["生年四化"].get(hua):
                    warnings.append(f"生年四化缺少: {hua}")
    
    # 检查 v1.1 新增字段
    if "astro_fingerprint" in normalized_json:
        fp = normalized_json["astro_fingerprint"]
        if not fp.get("主星组合编码"):
            warnings.append("星盘指纹缺少主星组合编码")
    
    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings
    }


# ===========================================
# Ziwei AI Patch v5.3 - Normalizer 透传所有字段
# ===========================================
def normalize_ziwei_data(data):
    if not isinstance(data, dict):
        return data
    normalized = {}
    for k, v in data.items():
        if isinstance(v, dict):
            normalized[k] = normalize_ziwei_data(v)
        else:
            normalized[k] = v
    return normalized
