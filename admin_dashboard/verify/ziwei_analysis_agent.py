# -*- coding: utf-8 -*-
"""
🔧 LynkerAI 紫微斗数验证系统 - Analysis Agent
Layer 3: 基于标准化数据进行命理分析
"""

import os
import json
from openai import OpenAI


class ZiweiAnalysisAgent:
    """
    紫微斗数命理分析 Agent
    使用 GPT-4-Turbo 或 DeepSeek 进行专业命理分析
    """
    
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY") or ""
        self.client = OpenAI(api_key=self.openai_api_key) if self.openai_api_key else None
        self.model = "gpt-4-turbo"
    
    def analyze_ziwei(self, standard_json):
        """
        🔧 修正版（v1.2）
        兼容文墨AI导出、手动JSON与文本解析结果
        保证前端Child AI能正常读取命主、身主、十二宫星曜
        """

        import json

        # --- 调试日志 ---
        print("[Ziwei DEBUG] analyze_ziwei() invoked")
        print("[Ziwei DEBUG] 输入JSON字段:", list(standard_json.keys()))

        # --- 容错处理 ---
        if not isinstance(standard_json, dict):
            print("[Ziwei ERROR] 输入数据不是dict！")
            return {"success": False, "error": "Invalid input"}

        # --- 保底读取 ---
        meta = standard_json.get("meta", {})
        basic_info = standard_json.get("basic_info", {})
        star_map = standard_json.get("star_map", {})

        # --- 容错: 有时解析后的 star_map 是 [] 而不是 dict ---
        if isinstance(star_map, list):
            print("[Ziwei DEBUG] ⚠️ 检测到 star_map 为 list，改为空字典")
            star_map = {}

        # --- 若 star_map 为空，尝试向上层字段读取 ---
        if not star_map:
            print("[Ziwei DEBUG] ⚠️ star_map 为空，尝试兼容旧格式")
            for k, v in standard_json.items():
                if isinstance(v, dict) and "主星" in str(v):
                    print(f"[Ziwei DEBUG] ✅ 兼容匹配到宫位结构: {k}")
                    star_map[k] = v

        # --- 提取命主、身主 ---
        mingzhu = basic_info.get("命主") or basic_info.get("命主星") or "未识别"
        shenzhu = basic_info.get("身主") or basic_info.get("身主星") or "未识别"

        # --- 若命主仍空，尝试从任意宫位主星中匹配 ---
        if mingzhu == "未识别" and "命宫" in star_map:
            minggong = star_map["命宫"]
            # ✅ 修复：检查命宫是 dict 还是 list
            if isinstance(minggong, dict):
                main_stars = minggong.get("主星", "")
                if main_stars:
                    mingzhu = main_stars.split(",")[0]
                    print(f"[Ziwei DEBUG] ✅ 自动推断命主: {mingzhu}")

        # --- 生成结构化摘要 ---
        summary = {
            "命主": mingzhu,
            "身主": shenzhu,
            "性别": basic_info.get("性别", "未知"),
            "命局": basic_info.get("命局", "未识别"),
            "格局": "未识别"
        }

        # --- 提取四化 ---
        transformations = standard_json.get("transformations", {})
        if not transformations:
            transformations = {"禄": "?", "权": "?", "科": "?", "忌": "?"}
        
        # ✅ 修复：正确提取四化编码（兼容嵌套和扁平结构）
        if "生年四化" in transformations:
            sihua = transformations["生年四化"]
            sihua_code = f"{sihua.get('禄', '-')}{sihua.get('权', '-')}{sihua.get('科', '-')}{sihua.get('忌', '-')}"
        else:
            sihua_code = "----"

        # --- 星盘指纹 ---
        astro_fingerprint = {
            "主宫地支": basic_info.get("身宫", ""),
            "主星组合编码": "无主星" if not star_map else "正常",
            "化星组合编码": f"禄权科忌={sihua_code}",
            "局数编码": "",
            "星曜矩阵": []
        }

        # --- 关系向量评分（默认模板）---
        relationship_vector = {"婚姻": 0.7, "事业": 0.7, "健康": 0.8, "人际": 0.7}

        # --- 构造最终结果 ---
        result = {
            "success": True,
            "meta": meta,
            "basic_info": basic_info,
            "summary": summary,
            "star_map": star_map,
            "transformations": transformations,
            "astro_fingerprint": astro_fingerprint,
            "relationship_vector": relationship_vector,
            "risk": {},
            "analysis": {
                "summary": "此命盘数据已成功识别（兼容模式）。",
                "系统判断": "已启用 ZiweiAnalysisAgent v1.2 容错模式。"
            },
            "model": "ZiweiAI_v1.2"
        }
        
        # ✨ v4.0 增强：透传大限/小限/流年数据（如果存在）
        if "大限" in standard_json:
            result["大限"] = standard_json["大限"]
            print(f"[Analysis Agent v4.0] ✅ 透传大限数据: {len(result['大限'])}条")
        if "小限" in standard_json:
            result["小限"] = standard_json["小限"]
            print(f"[Analysis Agent v4.0] ✅ 透传小限数据: {len(result['小限'])}条")
        if "流年" in standard_json:
            result["流年"] = standard_json["流年"]
            print(f"[Analysis Agent v4.0] ✅ 透传流年数据: {len(result['流年'])}条")

        print("[Ziwei DEBUG] ✅ ZiweiAnalysisAgent v1.2 分析完成 — 返回完整结构")
        print("[Ziwei DEBUG] star_map keys:", list(star_map.keys()))
        return result
    
    def _build_analysis_prompt(self, standard_json, analysis_focus):
        """构建分析提示词"""
        
        basic_info = standard_json.get("basic_info", {})
        star_map = standard_json.get("star_map", {})
        transformations = standard_json.get("transformations", {})
        tags = standard_json.get("tags", [])
        
        # 基础命盘信息
        prompt = f"""请分析以下紫微斗数命盘，生成详细的命理报告。

【基本信息】
- 性别: {basic_info.get('gender', '未知')}
- 命主: {basic_info.get('destiny_master', '未知')}
- 身主: {basic_info.get('body_master', '未知')}
- 命局: {basic_info.get('life_bureau', '未知')}

【十二宫星曜分布】
"""
        
        # 添加星曜分布
        for palace, stars in star_map.items():
            stars_str = "、".join(stars) if stars else "空宫"
            prompt += f"- {palace}: {stars_str}\n"
        
        # 添加四化信息
        prompt += f"\n【四化】\n"
        for hua_type, star in transformations.items():
            prompt += f"- {hua_type}: {star}\n"
        
        # 添加标签
        if tags:
            prompt += f"\n【命盘特征】\n"
            prompt += "、".join(tags) + "\n"
        
        # 添加分析要求
        prompt += f"""

请按照以下结构输出分析报告（JSON 格式）：

```json
{{
  "summary": "命理总结（100字以内）",
  "格局分析": [
    "格局1的分析",
    "格局2的分析"
  ],
  "用神分析": [
    "用神建议1",
    "用神建议2"
  ],
  "六亲关系": {{
    "父母": "父母宫分析",
    "兄弟": "兄弟宫分析",
    "夫妻": "夫妻宫分析",
    "子女": "子女宫分析"
  }},
  "事业财运": {{
    "事业": "官禄宫分析",
    "财运": "财帛宫分析"
  }},
  "健康": "疾厄宫分析",
  "流年风险": [
    "需要注意的流年风险"
  ],
  "建议": [
    "人生建议1",
    "人生建议2"
  ]
}}
```
"""
        
        # 如果指定了分析重点
        if analysis_focus:
            focus_map = {
                "career": "请特别关注事业发展和官禄宫的分析",
                "marriage": "请特别关注婚姻感情和夫妻宫的分析",
                "wealth": "请特别关注财运和财帛宫的分析",
                "health": "请特别关注健康和疾厄宫的分析",
                "family": "请特别关注六亲关系的分析"
            }
            if analysis_focus in focus_map:
                prompt += f"\n【分析重点】\n{focus_map[analysis_focus]}\n"
        
        return prompt
    
    def _parse_analysis_response(self, content):
        """解析 AI 的分析响应"""
        
        # 尝试提取 JSON
        try:
            # 查找 JSON 代码块
            if "```json" in content:
                json_str = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                json_str = content.split("```")[1].split("```")[0].strip()
            else:
                # 尝试直接解析
                start = content.find("{")
                end = content.rfind("}")
                if start != -1 and end != -1:
                    json_str = content[start:end+1]
                else:
                    # 无法找到 JSON，返回纯文本格式
                    return {
                        "summary": content[:200] + "..." if len(content) > 200 else content,
                        "详细分析": content
                    }
            
            return json.loads(json_str)
            
        except Exception as e:
            # JSON 解析失败，返回结构化的纯文本格式
            return {
                "summary": "分析完成，详见下方内容",
                "详细分析": content,
                "解析错误": str(e)
            }
    
    def generate_brief_summary(self, standard_json):
        """
        生成简短的命盘摘要（用于快速预览）
        支持 ZiweiAI v1.1 格式
        
        参数:
            standard_json: dict, 标准化后的紫微命盘数据
            
        返回:
            str: 简短摘要
        """
        
        if not standard_json.get("success"):
            return "命盘数据无效"
        
        basic_info = standard_json.get("basic_info", {})
        star_map = standard_json.get("star_map", {})
        tags = standard_json.get("tags", [])
        
        # 提取命宫主星
        ming_gong_stars = star_map.get("命宫", [])
        ming_gong_str = "、".join(ming_gong_stars[:3]) if ming_gong_stars else "空宫"
        
        # 构建摘要
        summary = f"{basic_info.get('性别', '')} {basic_info.get('命局', '')}"
        summary += f" | 命宫: {ming_gong_str}"
        
        # 提取特征标签（支持 v1.1 字典格式和 v1.0 列表格式）
        if tags:
            if isinstance(tags, dict):
                # v1.1 格式：字典
                all_tags = []
                for category in ["格局", "性格", "优势"]:
                    if category in tags and tags[category]:
                        all_tags.extend(tags[category])
                if all_tags:
                    summary += f" | 特征: {all_tags[0]}"
            elif isinstance(tags, list) and len(tags) > 0:
                # v1.0 格式：列表
                summary += f" | 特征: {tags[0]}"
        
        return summary


# ===========================================
# Ziwei AI Patch v5.3 - Analysis Agent 增强
# ===========================================
def merge_all_fields(base, new_data):
    for k, v in new_data.items():
        if isinstance(v, dict):
            base[k] = merge_all_fields(base.get(k, {}), v)
        else:
            if k not in base or not base[k]:
                base[k] = v
    return base

def enhance_with_risk(star_map):
    risk_score, warn = 0, ""
    migration = star_map.get("迁移宫", {})
    content = json.dumps(migration, ensure_ascii=False)
    danger_stars = ["化忌", "羊", "陀", "铃", "火", "空", "劫"]
    matches = [s for s in danger_stars if s in content]
    if matches:
        risk_score = min(1.0, len(matches) * 0.2)
        warn = f"迁移宫出现危险星曜：{'、'.join(matches)}"
    return {"风险值": risk_score, "迁移宫预警": warn}

def build_final_result(parsed_data):
    result = parsed_data.copy()
    result["risk"] = enhance_with_risk(result.get("star_map", {}))
    return result


def _risk_focus_qianyi(star_map, transformations):
    # 迁移宫重点评估
    qy = star_map.get("迁移宫", {}) or {}
    txt = "、".join(filter(None, [qy.get("主星",""), qy.get("辅星",""), qy.get("小星","")]))
    risk = 0.0
    bad = []
    danger = ["化忌","七杀","破军","火星","铃星","擎羊","陀罗","地空","地劫","天空","大耗","劫煞"]
    for d in danger:
        if d in txt:
            bad.append(d); risk += 0.25
    # 化忌来自四化
    for tag in ("生年四化","流年四化"):
        meta = (transformations or {}).get(tag, {})
        if meta and "忌" in meta and meta["忌"]:
            bad.append(f"{tag}:{meta['忌']}")
            risk += 0.25
    risk = min(1.0, risk)
    detail = "、".join(sorted(set(bad))) if bad else "无明显凶星"
    return {"迁移宫风险": int(risk*100), "迁移宫凶星": detail}
