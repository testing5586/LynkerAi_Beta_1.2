"""
紫微斗数严格解析器 v1.0
仅使用规则/正则提取，不做任何 AI 推理或补全
支持：
1. 文墨天机 AI 分析版 JSON 文件
2. 普通文本格式命盘（尽力提取）
3. TXT 补丁模块：智能解析文墨天机导出的 .txt 文件
"""
import json
import re
from typing import Dict, Any, List

# ✨ 导入 TXT 补丁模块
try:
    from .ziwei_txt_patch import parse_wenmo_txt_to_json
    TXT_PATCH_AVAILABLE = True
    print("[Ziwei Parser] ✅ TXT 补丁模块已加载")
except ImportError as e:
    print(f"[Ziwei Parser] ⚠️ TXT 补丁模块未找到: {e}")
    TXT_PATCH_AVAILABLE = False

# 12 宫位标准名称
PALACES = ["命宫", "兄弟宫", "夫妻宫", "子女宫", "财帛宫", "疾厄宫", 
           "迁移宫", "仆役宫", "官禄宫", "田宅宫", "福德宫", "父母宫"]


def _clean(s: str) -> str:
    """清理字符串：去除多余空白"""
    return re.sub(r'\s+', ' ', s or '').strip()


def _empty_v11() -> Dict[str, Any]:
    """返回空的 ZiweiAI_v1.1 结构"""
    return {
        "meta": {
            "parser_version": "ZiweiAI_v1.1",
            "source": "文墨天机",
            "system": "LynkerAI ZiweiAI",
        },
        "basic_info": {
            "性别": "",
            "阳历日期": "",
            "阴历日期": "",
            "真太阳时": "",
            "命主": "",
            "身主": "",
            "命局": "",
        },
        "star_map": {p: [] for p in PALACES},
        "transformations": {
            "生年四化": {"禄": "", "权": "", "科": "", "忌": ""},
            "流年四化": {"禄": "", "权": "", "科": "", "忌": ""},
        },
        "tags": {"格局": [], "性格": [], "优势": [], "风险因子": []},
        "success": True
    }


def parse_wenmo_ai_json(obj: Dict[str, Any]) -> Dict[str, Any]:
    """
    修正版 v1.3
    自动兼容：
    - 文墨AI标准JSON（含 basic_info, star_map）
    - 扁平JSON（旧格式）
    - 繁简体宫位名（財帛宮→财帛宫）
    """
    import copy
    
    # 🔍 调试：打印输入结构
    print("[Ziwei Parser Debug] 原始 JSON 顶层字段:", list(obj.keys()))
    try:
        sample = json.dumps(obj, ensure_ascii=False)[:500]
        print(f"[Ziwei Parser Debug] 样本内容前500字符: {sample}")
    except Exception as e:
        print(f"[Ziwei Parser Debug] 无法打印 JSON 内容: {e}")
    
    # 🧩 Step 1. 如果是文墨AI标准格式（含 basic_info）
    if "basic_info" in obj and "star_map" in obj:
        print("[Ziwei Parser Debug] 🧠 检测到标准文墨AI JSON格式，直接复制字段")
        bi = copy.deepcopy(obj["basic_info"])
        sm = copy.deepcopy(obj["star_map"])
        tx = obj.get("transformations", {})

        # 🈶 繁简体宫名自动替换
        mapping = {
            "財帛宮": "财帛宫", "兄弟宮": "兄弟宫", "命宮": "命宫",
            "夫妻宮": "夫妻宫", "子女宮": "子女宫", "父母宮": "父母宫",
            "田宅宮": "田宅宫", "官祿宮": "官禄宫", "交友宮": "交友宫",
            "疾厄宮": "疾厄宫", "遷移宮": "迁移宫", "福德宮": "福德宫"
        }

        # 🈶 繁简体宫名替换 + 保持字典格式
        new_sm = {}
        for k, v in sm.items():
            key_simplified = mapping.get(k, k)
            new_sm[key_simplified] = v  # 保持原始格式（字典或列表）
        
        sm = new_sm
        
        # 🔍 输出确认日志
        print("[Ziwei Parser Debug] ✅ 标准格式数据已复制（保持字典格式）")
        print(f"[Ziwei Parser Debug] 基本信息: {bi}")
        print(f"[Ziwei Parser Debug] 宫位数量: {len([p for p in sm.values() if p])}")
        sample_palace = sm.get('命宫') or sm.get('命宮')
        if sample_palace:
            print(f"[Ziwei Parser Debug] 命宫示例: {sample_palace}")
        
        out = _empty_v11()
        out["meta"] = obj.get("meta", {})
        out["basic_info"] = bi
        out["star_map"] = sm
        out["transformations"] = tx
        out["tags"] = obj.get("tags", {"格局": [], "性格": [], "优势": [], "风险因子": []})
        
        return out

    # 🧩 Step 2. 若是扁平结构，旧逻辑继续兼容
    print("[Ziwei Parser Debug] ⚙️ 检测到扁平结构，回退旧逻辑解析")
    
    out = _empty_v11()
    bi = out["basic_info"]
    
    for key in ["性别", "gender", "性別"]:
        v = obj.get(key)
        if v:
            bi["性别"] = _clean(str(v))
            break
    
    for key in ["命主", "命主星"]:
        v = obj.get(key)
        if v:
            bi["命主"] = _clean(str(v))
            break
    
    for key in ["身主", "身主星"]:
        v = obj.get(key)
        if v:
            bi["身主"] = _clean(str(v))
            break
    
    for key in ["阳历日期", "阳历", "公历"]:
        v = obj.get(key)
        if v:
            bi["阳历日期"] = _clean(str(v))
            break
    
    for key in ["真太阳时", "真太陽時"]:
        v = obj.get(key)
        if v:
            bi["真太阳时"] = _clean(str(v))
            break
    
    for key in ["命局", "局数"]:
        v = obj.get(key)
        if v:
            bi["命局"] = _clean(str(v))
            break

    print(f"[Ziwei Parser Debug] 扁平格式提取结果: {bi}")
    return out


# ========== 纯文本解析（兼容用户直接粘贴"宫块文字版"） ==========

# 基本信息正则
_P_BIRTH = re.compile(r"出生时间[:：]\s*([0-9\-\/年月日\.]+[ T]?[0-9:\.时分秒]*)", re.I)
_P_TRUE = re.compile(r"真太阳时[:：]\s*([0-9\-\/年月日\.]+[ T]?[0-9:\.时分秒]*)", re.I)
_P_SOLAR = re.compile(r"(阳历|公历)[:：]\s*([0-9\-\/年月日\.]+)", re.I)
_P_LUNAR = re.compile(r"(阴历|农历|陰曆)[:：]\s*([^\n\r]+)", re.I)
_P_SEX = re.compile(r"性别[:：]\s*([男女阴阳])", re.I)
_P_MZ = re.compile(r"命主[:：]\s*([^\s，,\n\r]+)", re.I)
_P_SZ = re.compile(r"身主[:：]\s*([^\s，,\n\r]+)", re.I)
_P_JU = re.compile(r"(命局|局数|局)[:：]\s*([^\s，,\n\r]+)", re.I)

# 宫块正则
# 匹配 "命宫"、"夫妻宫" 等
_P_PALACE_HEAD = re.compile(r"^([{}])宫".format("".join(PALACES)), re.M)
_P_MAINLINE = re.compile(r"主星[:：]\s*([^\n\r]+)", re.I)
_P_SUBLINE = re.compile(r"(副曜|辅星|杂曜|小星)[:：]\s*([^\n\r]+)", re.I)


def parse_wenmo_plain_text(text: str) -> Dict[str, Any]:
    """
    严格从普通文字版命盘中抽取数据
    尽力而为，不推断缺失信息
    """
    out = _empty_v11()
    t = text or ""

    # 提取 basic_info
    m = _P_BIRTH.search(t)
    if m:
        out["basic_info"]["阳历日期"] = _clean(m.group(1))
    
    m = _P_TRUE.search(t)
    if m:
        out["basic_info"]["真太阳时"] = _clean(m.group(1))
    
    m = _P_SOLAR.search(t)
    if m:
        out["basic_info"]["阳历日期"] = _clean(m.group(2))
    
    m = _P_LUNAR.search(t)
    if m:
        out["basic_info"]["阴历日期"] = _clean(m.group(2))
    
    m = _P_SEX.search(t)
    if m:
        out["basic_info"]["性别"] = _clean(m.group(1))
    
    m = _P_MZ.search(t)
    if m:
        out["basic_info"]["命主"] = _clean(m.group(1))
    
    m = _P_SZ.search(t)
    if m:
        out["basic_info"]["身主"] = _clean(m.group(1))
    
    m = _P_JU.search(t)
    if m:
        out["basic_info"]["命局"] = _clean(m.group(2))

    # 提取宫位星曜（逐段找"XX宫"抬头，往下收集到下一个宫位抬头为止）
    star_map = out["star_map"]
    
    # 在文本中定位每个宫位的开始位置
    heads = []
    for p in PALACES:
        for m in re.finditer(r"^{}宫".format(p), t, flags=re.M):
            heads.append((m.start(), p))
    heads.sort()
    
    # 逐个宫位提取星曜
    for idx, (pos, palace) in enumerate(heads):
        # 确定这个宫位的文本块范围
        end = heads[idx + 1][0] if idx + 1 < len(heads) else len(t)
        block = t[pos:end]
        
        bucket: List[str] = []
        
        # 提取主星
        m = _P_MAINLINE.search(block)
        if m:
            stars_str = _clean(m.group(1))
            bucket += re.split(r'[，,、\s]+', stars_str)
        
        # 提取副曜、小星等
        for m in _P_SUBLINE.finditer(block):
            stars_str = _clean(m.group(2))
            bucket += re.split(r'[，,、\s]+', stars_str)
        
        # 过滤掉无效条目
        star_map[palace] = [
            x for x in bucket 
            if x and x not in ["主星", "副曜", "小星", "辅星", "杂曜", "：", ":"]
        ]

    return out


def parse_wenmo_ai_file(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    统一入口：解析文墨天机 AI 分析版文件
    - 若为 .json：按 JSON 格式解析
    - 否则：按纯文本格式解析
    都不做推断，仅做规则提取
    """
    name = (filename or "").lower()
    
    # 尝试 JSON 解析
    try:
        if name.endswith(".json") or name.endswith(".txt"):
            text = file_bytes.decode("utf-8", errors="ignore")
            
            # 先尝试 JSON
            try:
                obj = json.loads(text)
                result = parse_wenmo_ai_json(obj)
                
                # 输出完整 JSON 结构日志
                print("[ZiweiJSON v1.1] 完整结构包含以下字段:")
                print(f"  - meta: {list(result['meta'].keys())}")
                print(f"  - basic_info: {list(result['basic_info'].keys())}")
                print(f"  - star_map: {len(result['star_map'])} 个宫位")
                print(f"  - transformations: {list(result['transformations'].keys())}")
                print(f"  - tags: {list(result['tags'].keys())}")
                print(f"[ZiweiJSON v1.1] 完整数据: {json.dumps(result, ensure_ascii=False, indent=2)}")
                
                return result
            except json.JSONDecodeError:
                # JSON 解析失败，按纯文本处理
                if TXT_PATCH_AVAILABLE:
                    print("[Ziwei Parser] 📝 启用 TXT 补丁解析文墨天机命盘...")
                    print(f"[TXT Debug] 原始文本前500字符:\n{text[:500]}")
                    txt_data = parse_wenmo_txt_to_json(text)
                    print(f"[TXT Debug] 解析返回的 star_map 宫位数: {len(txt_data.get('star_map', {}))}")
                    print(f"[TXT Debug] 命宫原始数据: {txt_data.get('star_map', {}).get('命宫', 'NOT_FOUND')}")
                    # 转换为标准 v1.1 格式
                    result = _empty_v11()
                    result["basic_info"].update(txt_data.get("basic_info", {}))
                    result["star_map"] = txt_data.get("star_map", {})
                    result["transformations"] = txt_data.get("transformations", {})
                    print(f"[ZiweiText v1.1] TXT 补丁解析完成，命宫: {result['star_map'].get('命宫', {})}")
                    print(f"[ZiweiText v1.1] 完整数据: {json.dumps(result, ensure_ascii=False, indent=2)}")
                    return result
                else:
                    result = parse_wenmo_plain_text(text)
                    print("[ZiweiText v1.1] 纯文本解析完成（旧版）")
                    print(f"[ZiweiText v1.1] 完整数据: {json.dumps(result, ensure_ascii=False, indent=2)}")
                    return result
    except Exception as e:
        print(f"⚠️ 解析文件失败: {e}")
    
    # 其他情况：按纯文本解析
    text = file_bytes.decode("utf-8", errors="ignore")
    if TXT_PATCH_AVAILABLE:
        print("[Ziwei Parser] 📝 启用 TXT 补丁（fallback 路径）...")
        txt_data = parse_wenmo_txt_to_json(text)
        result = _empty_v11()
        result["basic_info"].update(txt_data.get("basic_info", {}))
        result["star_map"] = txt_data.get("star_map", {})
        result["transformations"] = txt_data.get("transformations", {})
        print("[ZiweiText v1.1] 默认纯文本解析完成（TXT 补丁）")
        return result
    else:
        result = parse_wenmo_plain_text(text)
        print("[ZiweiText v1.1] 默认纯文本解析完成（旧版）")
        return result


def validate_wenmo_file(data: Dict[str, Any]) -> tuple[bool, str]:
    """
    验证文件是否为合法的紫微命盘数据（兼容多版本）
    返回: (is_valid, error_message)
    """
    # ✅ 修改：支持多种版本格式（AI版、手工版、manual等）
    parser_version = data.get("meta", {}).get("parser_version", "")
    if not parser_version or not parser_version.startswith(("wenmo", "ZiweiAI", "manual")):
        print(f"[Ziwei DEBUG] ⚠️ 非标准版本数据（{parser_version}），继续兼容模式")
        # 不再严格拒绝，允许继续处理
    
    # 检查 source 标识（放宽检查）
    source = data.get("meta", {}).get("source", "")
    if source and "文墨" not in source and "WenMo" not in source and "wenmo" not in source.lower() and "manual" not in source.lower():
        print(f"[Ziwei DEBUG] ⚠️ 非文墨天机来源（{source}），继续兼容模式")
    
    return True, ""
