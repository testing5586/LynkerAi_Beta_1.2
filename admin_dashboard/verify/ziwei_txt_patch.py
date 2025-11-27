# -*- coding: utf-8 -*-
"""
🧩 Ziwei TXT Patch v2.0 - WenMo Tree Format
解析文墨天机导出的树状结构 .txt 命盘文件
"""
import re

palace_hdr_re = re.compile(
    r'^[\s│├└]*[│├└]?\s*(?P<name>[\u4e00-\u9fa5]{1,4}\s*[宫宮])\[(?P<dz>[^\]]+)\](?:\[[^\]]+\])?\s*$',
    re.M
)
import json


def parse_wenmo_txt_to_json(txt: str):
    """
    解析文墨天机树状格式 TXT 命盘文件。
    
    格式示例：
    ├財帛宮[戊子][身宮]
    │ │ ├主星 : 破軍[廟]
    │ │ ├輔星 : 天魁[旺]
    │ │ ├小星 : 紅鸞[廟],旬空[陷],咸池[陷],天德[廟]
    
    🔀 智能路由：
    - 树状格式（含│或├主星）→ v5.1 稳定版
    - 简化格式（不含树状符号）→ 尝试 v5.6 Hybrid 外挂（失败时自动回退 v5.1）
    """
    
    # 初始化结果结构
    result = {
        "basic_info": {"命主": "", "身主": "", "性别": "", "真太阳时": ""},
        "star_map": {},
        "transformations": {"生年四化": {}, "流年四化": {}},
        "raw_text": txt,  # 🆕 v5.7: 保存原始文本供后续补丁使用
        "astro_fingerprint": {}  # 🆕 v5.7: 初始化命理指纹
    }
    
    # === 🆕 v5.6 Hybrid 外挂：可选增强模块 ===
    # 检测简化格式（无树状符号但有宫位+星曜）
    is_tree_format = "│" in txt or "├" in txt or "└" in txt
    has_palace_stars = bool(re.search(r"(命宫|迁移宫|财帛宫)[\s：:]+[\u4e00-\u9fa5]", txt))
    use_v56 = False  # 标志：是否使用 v5.6 解析结果
    
    if not is_tree_format and has_palace_stars:
        try:
            try:
                from .ziwei_txt_hybrid_v56 import parse_wenmo_txt_v56
            except ImportError:
                from ziwei_txt_hybrid_v56 import parse_wenmo_txt_v56
            print("[智能路由] 🔀 检测到简化格式，尝试 v5.6 Hybrid 外挂...")
            v56_result = parse_wenmo_txt_v56(txt)
            
            # 验证 v5.6 结果有效性
            if v56_result and v56_result.get("star_map"):
                valid_palaces = [p for p in v56_result["star_map"].values() if p and p.get("主星")]
                if len(valid_palaces) >= 2:  # 至少2个宫位有数据
                    print(f"[智能路由] ✅ v5.6 Hybrid 解析成功，提取 {len(valid_palaces)} 个宫位")
                    use_v56 = True
                    # 使用 v5.6 的解析结果
                    result["star_map"] = v56_result["star_map"]
                    result["transformations"] = v56_result.get("transformations", {"生年四化": {}, "流年四化": {}})
                else:
                    print(f"[智能路由] ⚠️ v5.6 数据不足（{len(valid_palaces)} 宫），回退 v5.1")
            else:
                print("[智能路由] ⚠️ v5.6 返回空数据，回退 v5.1")
        except Exception as e:
            print(f"[智能路由] ⚠️ v5.6 Hybrid 解析失败: {e}，自动回退 v5.1 稳定版")
    else:
        print("[智能路由] 🎯 检测到树状格式，使用 v5.1 稳定解析器")

    # 仅在未使用 v5.6 时执行 v5.1 星盘解析
    if not use_v56:
        # 提取命主 / 身主 (支持繁简体)
        m = re.search(r"命主[:：]\s*([^\s\n；;,，]+)", txt)
        s = re.search(r"身主[:：]\s*([^\s\n；;,，]+)", txt)
        if m: 
            result["basic_info"]["命主"] = m.group(1).strip()
        if s: 
            result["basic_info"]["身主"] = s.group(1).strip()

        # 繁简体宫位名称映射
        palace_map = {
            "命宮": "命宫", "兄弟宮": "兄弟宫", "夫妻宮": "夫妻宫", "子女宮": "子女宫",
            "財帛宮": "财帛宫", "疾厄宮": "疾厄宫", "遷移宮": "迁移宫", "交友宮": "交友宫",
            "僕役宮": "交友宫",  # 仆役宫 = 交友宫
            "官祿宮": "官禄宫", "田宅宮": "田宅宫", "福德宮": "福德宫", "父母宮": "父母宫"
        }

        # 解析每个宫位
        for palace_trad, palace_simp in palace_map.items():
            # 匹配宫位开始行：├財帛宮[戊子][身宮]
            palace_pattern = rf"[├└│]\s*{palace_trad}\[([^\]]+)\]"
            palace_match = re.search(palace_pattern, txt, re.MULTILINE)
            
            if palace_match:
                # 🆕 v5.7: 提取地支
                dizhi_raw = palace_match.group(1).strip()
                m_dz = re.search(r"[甲乙丙丁戊己庚辛壬癸]?[子丑寅卯辰巳午未申酉戌亥]", dizhi_raw)
                dizhi = m_dz.group(0) if m_dz else ""
                
                # 找到宫位起始位置
                start_pos = palace_match.end()
                
                # 查找下一个宫位的位置（作为当前宫位的结束位置）
                next_palace_pattern = r"[├└│]\s*(?:命宮|兄弟宮|夫妻宮|子女宮|財帛宮|疾厄宮|遷移宮|交友宮|僕役宮|官祿宮|田宅宮|福德宮|父母宮)"
                next_match = re.search(next_palace_pattern, txt[start_pos:], re.MULTILINE)
                end_pos = start_pos + next_match.start() if next_match else len(txt)
                
                # 提取当前宫位的内容块
                palace_block = txt[start_pos:end_pos]
                
                # 提取主星、辅星、小星
                stars = {"主星": "", "辅星": "", "小星": "", "地支": dizhi}  # 🆕 v5.7: 添加地支
                
                for star_type in ["主星", "輔星", "小星"]:
                    # 匹配：│ │ ├主星 : 破軍[廟]
                    star_pattern = rf"[├│]\s*{star_type}\s*[:：]\s*([^\n]+)"
                    star_match = re.search(star_pattern, palace_block)
                    
                    if star_match:
                        star_text = star_match.group(1).strip()
                        # 🆕 v5.7: 保留原始星曜文本（包含状态标记），供后续解析
                        # 映射到简体键名
                        key_map = {"主星": "主星", "輔星": "辅星", "小星": "小星"}
                        stars[key_map.get(star_type, star_type)] = star_text
                
                # 保存到 star_map (使用简体宫位名)
                result["star_map"][palace_simp] = stars
            else:
                # 未找到该宫位，返回空 dict
                result["star_map"][palace_simp] = {}
        
        print(f"[TXT Patch v2.0] ✅ 已解析 {len([p for p in result['star_map'].values() if p])} 个宫位，命主={result['basic_info'].get('命主')}")

    # ## Fallback fix for missing palaces
    try:
        sm = result.get("star_map", {})
        # 需要兜底修补的宫位
        need = []
        for k in ("命宫","交友宫"):
            v = sm.get(k)
            if not isinstance(v, dict) or not (v.get("主星") or v.get("辅星") or v.get("小星")):
                need.append(k)
        if need:
            # 分别处理每个缺失的宫位
            for palace in need:
                if palace == "命宫":
                    keys = ["命\\s*", "命"]
                elif palace == "交友宫":
                    keys = ["交友", "僕役", "仆役", "奴僕", "奴仆"]
                else:
                    continue
                    
                got = _extract_block(txt, keys)
                if got:
                    sm[palace] = {**{"主星":"","辅星":"","小星":""}, **got}
            
            result["star_map"] = sm
    except Exception as e:
        print(f"[TXT Patch] Fallback failed: {e}")
        import traceback
        traceback.print_exc()

    # === Ziwei TXT Patch v4.0: 增强四化/大限/小限/流年识别 ===
    try:
        extra = _enhance_with_transforms_and_limits(txt, result["star_map"])
        result["transformations"] = {
            "生年四化": extra.get("生年四化", {}),
            "流年四化": extra.get("流年四化", {})
        }
        result["大限"] = extra.get("大限", [])
        result["小限"] = extra.get("小限", [])
        result["流年"] = extra.get("流年", [])
        print(f"[TXT Patch v4.0] ✅ 已提取生年四化: {extra.get('生年四化')}")
    except Exception as e:
        print(f"[TXT Patch v4.0] ⚠️ 四化/大限模块异常: {e}")

    # === Ziwei TXT Patch v5.0: 格局标签 + 风险分析 ===
    try:
        risk_data = _enhance_with_risk_analysis(txt, result["star_map"], result)
        result.update(risk_data)
        print(f"[TXT Patch v5.0] ✅ 格局标签: {risk_data.get('格局标签')}, 灾难风险: {risk_data.get('灾难预报', {}).get('风险值')}")
    except Exception as e:
        print(f"[TXT Patch v5.0] ⚠️ 风险分析模块异常: {e}")

    # === Ziwei TXT Patch v5.6+: 四化星与格局标签增强模块 ===
    try:
        try:
            from .patch_v5_6p_fourhua import apply_fourhua_patch
            from .patch_v5_6p_pattern import apply_pattern_patch
        except ImportError:
            from patch_v5_6p_fourhua import apply_fourhua_patch
            from patch_v5_6p_pattern import apply_pattern_patch
        
        # 应用四化增强补丁（使用原始文本）
        result = apply_fourhua_patch(result, txt)
        # 应用格局标签增强补丁
        result = apply_pattern_patch(result)
        print(f"[TXT Patch v5.6+] ✅ 已注入增强四化星与格局标签")
    except Exception as e:
        print(f"[TXT Patch v5.6+] ⚠️ 增强补丁调用失败: {e}")

    # === Ziwei TXT Patch v5.7: 扩展修订版（地支+状态+四化增强） ===
    try:
        try:
            from .patch_v5_7_palace_dz import extract_palace_dz
            from .patch_v5_7_starstate import extract_starstate
            from .patch_v5_7_fourhua_auto import extract_fourhua
            from .patch_v5_7_normalizer import normalize_result
        except ImportError:
            from patch_v5_7_palace_dz import extract_palace_dz
            from patch_v5_7_starstate import extract_starstate
            from patch_v5_7_fourhua_auto import extract_fourhua
            from patch_v5_7_normalizer import normalize_result
        
        # 应用 v5.7 补丁链
        result = extract_palace_dz(result)      # 地支提取
        result = extract_starstate(result)      # 星曜状态解析
        result = extract_fourhua(result)        # 四化星自动提取（增强版）
        result = normalize_result(result)       # 数据标准化
        print(f"[TXT Patch v5.7] ✅ 已应用扩展修订版（地支+状态+四化增强）")
    except Exception as e:
        print(f"[TXT Patch v5.7] ⚠️ 扩展补丁调用失败: {e}")

    # === Ziwei TXT Patch v5.8: 行内四化抓取 + 格局风险增强 ===
    try:
        try:
            from .patch_v5_8_fourhua_auto import patch_transformations
            from .patch_v5_8_patterns import patch_patterns_and_risk
        except ImportError:
            from patch_v5_8_fourhua_auto import patch_transformations
            from patch_v5_8_patterns import patch_patterns_and_risk
        
        # 应用 v5.8 补丁链
        result = patch_transformations(result)      # 行内四化 + （可选）天干四化
        result = patch_patterns_and_risk(result)    # 格局标签 + 迁移宫风险 ×2
        print(f"[TXT Patch v5.8] ✅ 已应用四化抓取与格局风险增强")
    except Exception as e:
        print(f"[TXT Patch v5.8] ⚠️ v5.8 补丁调用失败: {e}")

    # === Ziwei TXT Patch v5.9.3: 四化天干推算（兜底方案） ===
    try:
        try:
            from .patch_v5_9_3_tiangan_fourhua import patch_tiangan_fourhua
        except ImportError:
            from patch_v5_9_3_tiangan_fourhua import patch_tiangan_fourhua
        
        # 若四化数据为空，根据生年天干自动推算
        result = patch_tiangan_fourhua(result)
    except Exception as e:
        print(f"[TXT Patch v5.9.3] ⚠️ 天干推算补丁调用失败: {e}")

    # === Ziwei TXT Patch v5.9: 四化标签自动内嵌星曜 ===
    try:
        try:
            from .patch_v5_9_fourhua_embed import patch_fourhua_embed
        except ImportError:
            from patch_v5_9_fourhua_embed import patch_fourhua_embed
        
        # 从 transformations 反推四化到星曜标签
        result = patch_fourhua_embed(result)
    except Exception as e:
        print(f"[TXT Patch v5.9] ⚠️ 四化内嵌补丁调用失败: {e}")

    return result


def parse_wenmo_auto(obj_or_txt):
    """
    自动判断输入是 JSON 还是 TXT，并调用相应解析器。
    """
    if isinstance(obj_or_txt, str):
        # 可能是 JSON 字符串或 TXT 文本
        try:
            j = json.loads(obj_or_txt)
            print("[TXT Patch] 📄 输入为 JSON 字符串，转为 dict 格式")
            return j
        except Exception:
            print("[TXT Patch] 📝 检测到 TXT 内容，启用 TXT→JSON 转换模块")
            return parse_wenmo_txt_to_json(obj_or_txt)
    elif isinstance(obj_or_txt, dict):
        return obj_or_txt
    else:
        raise TypeError(f"Unsupported type: {type(obj_or_txt)}")


def _normalize_palace_name(raw: str) -> str:
    name = (raw or "").strip()
    name = name.replace("宮", "宫")
    name = re.sub(r"\s+", "", name)   # 命  宫 -> 命宫
    # 同义词归并
    alias = {
        "交友宫": {"交友宫","僕役宮","仆役宫","奴僕宮","奴仆宫"},
    }
    for k, v in alias.items():
        if name in v:
            return k
    return name


def _extract_block(text, palace_keys):
    # 针对命宫/交友宫专用：允许标题空格、第二个[]、繁简混排
    for pk in palace_keys:
        # 匹配宫位标题行 + 后续所有以│开头的内容行（直到遇到非│行或文件结束）
        pat = rf"""(?P<hdr>^[\s│├└]*[│├└]?\s*{pk}(?:\s*)[宫宮]\[[^\]]+\](?:\[[^\]]+\])?\s*$)
(?P<body>(?:^[│├└\s]+.*$\n?)+)
"""
        m = re.search(pat, text, re.M)
        if not m:
            continue
        body = m.group("body")
        def pick(label):
            mm = re.search(rf"^[│├└┤\s]*.*?{label}\s*[:：]\s*([^\n\r]+)", body, re.M)
            if not mm:
                return ""
            raw = mm.group(1).strip()
            # 🆕 v5.7: 保留原始星曜文本（包含状态标记）
            return raw
        # 兼容 輔星/辅星
        fu = pick("辅星") or pick("輔星")
        return {
            "主星": pick("主星"),
            "辅星": fu,
            "小星": pick("小星"),
        }
    return None



# =======================================================
# Ziwei TXT Patch v4.0 — 四化 + 大限 + 小限 + 流年识别
# =======================================================

def _parse_four_transforms(text):
    res = {"禄": "", "权": "", "科": "", "忌": ""}
    m = re.search(r"生年四化[:：]?\s*禄.?([^\s、]+).*权.?([^\s、]+).*科.?([^\s、]+).*忌.?([^\s、]+)", text)
    if m:
        res.update({"禄": m.group(1), "权": m.group(2), "科": m.group(3), "忌": m.group(4)})
    return res

def _parse_flow_transforms(text):
    res = {"禄": "", "权": "", "科": "", "忌": ""}
    m = re.search(r"流年四化[:：]?\s*禄.?([^\s、]+).*权.?([^\s、]+).*科.?([^\s、]+).*忌.?([^\s、]+)", text)
    if m:
        res.update({"禄": m.group(1), "权": m.group(2), "科": m.group(3), "忌": m.group(4)})
    return res

def _parse_decades(text):
    limits = []
    for seg in re.findall(r"大限[:：]?\s*(\d{2}-\d{2})\s*岁\s*([甲乙丙丁戊己庚辛壬癸]\S+)\s*→\s*([^\n\r]+)", text):
        limits.append({"区间": seg[0], "地支": seg[1], "星曜": seg[2].strip()})
    return limits

def _parse_minor(text):
    limits = []
    for seg in re.findall(r"小限[:：]?\s*(\d{1,2})岁\s*([^\s]+)\s*([^\n\r]+)", text):
        limits.append({"年龄": seg[0], "宫位": seg[1], "星曜": seg[2].strip()})
    return limits

def _parse_yearflow(text):
    limits = []
    for seg in re.findall(r"流年\s*(\d{4})[:：]?\s*([^\n\r]+)", text):
        limits.append({"年份": seg[0], "内容": seg[1].strip()})
    return limits

# === Hook 注入到主函数结尾 ===
def _enhance_with_transforms_and_limits(raw_text, star_map):
    return {
        "生年四化": _parse_four_transforms(raw_text),
        "流年四化": _parse_flow_transforms(raw_text),
        "大限": _parse_decades(raw_text),
        "小限": _parse_minor(raw_text),
        "流年": _parse_yearflow(raw_text)
    }



# =======================================================
# Ziwei TXT Patch v5.0 — 格局 + 灾难预报 + 风险因子
# =======================================================

def _detect_patterns(star_map):
    tags = []
    s = json.dumps(star_map, ensure_ascii=False)
    if re.search("紫微.*天府", s): tags.append("紫府朝垣")
    if re.search("七殺.*破軍.*貪狼", s): tags.append("殺破狼")
    if re.search("太陽.*太陰", s): tags.append("日月并明")
    if re.search("武曲.*天相", s): tags.append("財官雙美")
    if re.search("廉貞.*貪狼", s): tags.append("桃花重")
    if re.search("天梁.*天同", s): tags.append("慈善格")
    return tags

def _calc_disaster_risk(star_map):
    danger_keywords = ['化忌','羊','陀','铃','火','空','劫','刑','煞']
    risk_score = 0
    for palace, data in star_map.items():
        content = json.dumps(data, ensure_ascii=False)
        matches = sum(1 for k in danger_keywords if k in content)
        if matches: risk_score += matches * 0.1
    return min(round(risk_score,2),1.0)

def _calc_flow_risk(flow_data, star_map):
    if not flow_data: return 0.3
    risk = 0
    if any("忌" in v for v in flow_data.values() if v): risk += 0.2
    if any("權" in v for v in flow_data.values() if v): risk += 0.1
    if "疾厄" in json.dumps(star_map,ensure_ascii=False): risk += 0.1
    return min(round(0.3 + risk,2),1.0)

def _calc_monthly_risk(text):
    month_risks = {}
    for seg in re.findall(r"流月(\d{1,2})[:：]?\s*([^\n\r]+)", text):
        m, content = seg
        risk = 0.3
        if "忌" in content: risk += 0.2
        if "煞" in content: risk += 0.1
        if "喜" in content or "科" in content: risk -= 0.1
        month_risks[int(m)] = round(max(min(risk,1.0),0.1),2)
    return month_risks

def _enhance_with_risk_analysis(raw_text, star_map, result):
    patterns = _detect_patterns(star_map)
    # ✅ v5.1: 使用增强版迁移宫风险分析
    disaster_data = _calc_disaster_risk_v51(star_map)
    flow_risk = _calc_flow_risk(result.get("流年四化",{}), star_map)
    monthly = _calc_monthly_risk(raw_text)
    
    risk_result = {
        "格局标签": patterns,
        "灾难预报": disaster_data,
        "流年风险因子": flow_risk,
        "流月风险因子": monthly
    }
    
    # 如果存在迁移宫预警，添加到结果中
    if disaster_data.get("迁移宫预警详情"):
        risk_result["迁移宫预警详情"] = disaster_data["迁移宫预警详情"]
    
    return risk_result



# =======================================================
# Ziwei TXT Patch v5.1 — 迁移宫重点灾象分析强化
# =======================================================

def _calc_disaster_risk_v51(star_map):
    danger_keywords = ['化忌','羊','陀','铃','火','空','劫','刑','煞']
    risk_score = 0
    migration_detail = {"宫位": "迁移宫", "凶象": [], "备注": ""}

    for palace, data in star_map.items():
        content = json.dumps(data, ensure_ascii=False)
        matches = [k for k in danger_keywords if k in content]
        if not matches:
            continue
        add_score = len(matches) * 0.1
        if palace == "迁移宫":
            add_score *= 2  # 权重加倍
            migration_detail["凶象"].extend(matches)
            if any("化忌" in k for k in matches):
                add_score += 0.3
                migration_detail["备注"] = "迁移宫化忌——重大外动凶象"
            elif any(k in content for k in ["七殺","破軍","貪狼"]):
                add_score += 0.2
                migration_detail["备注"] = "迁移宫动煞叠象"
        risk_score += add_score

    migration_detail["凶象"] = list(set(migration_detail["凶象"]))
    return {
        "风险值": min(round(risk_score,2),1.0),
        "迁移宫预警详情": migration_detail if migration_detail["凶象"] else None,
        "说明": f"累计危险星曜出现 {int(risk_score*10)} 次"
    }


# ===========================================
# Ziwei AI Patch v5.3 - Parser 层增强
# ===========================================
def _extract_four_transforms(lines):
    result = {"生年四化": {}, "流年四化": {}}
    for line in lines:
        if "生年四化" in line:
            parts = re.findall(r"(禄|权|科|忌).*?[→→>→:： ]+([^\s、]+)", line)
            for k, v in parts:
                result["生年四化"][k] = v
        elif "流年四化" in line:
            parts = re.findall(r"(禄|权|科|忌).*?[→→>→:： ]+([^\s、]+)", line)
            for k, v in parts:
                result["流年四化"][k] = v
    return result

def _extract_limits(lines):
    result = {"大限": "", "小限": "", "流年": ""}
    for line in lines:
        if "大限" in line: result["大限"] = line.strip()
        if "小限" in line: result["小限"] = line.strip()
        if "流年" in line: result["流年"] = line.strip()
    return result
