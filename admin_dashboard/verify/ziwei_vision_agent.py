# -*- coding: utf-8 -*-
"""
🔧 LynkerAI 紫微斗数验证系统 - Vision Agent
Layer 1: GPT-4-Turbo-Vision OCR 识别紫微命盘
"""

import os
import base64
import json
import requests
from datetime import datetime


class ZiweiVisionAgent:
    """
    紫微斗数命盘识别 Vision Agent
    使用 GPT-4-Turbo-Vision 识别紫微命盘中的十二宫、星曜、四化等信息
    """

    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY") or ""
        self.endpoint = "https://api.openai.com/v1/chat/completions"
        self.model = "gpt-4-turbo"

    def process_image(self, image_base64, progress_callback=None, ocr_mode="intelligent"):
        """
        主入口：识别紫微命盘图片
        
        参数:
            image_base64: 图片的 base64 编码
            progress_callback: 进度回调函数
            ocr_mode: 识别模式 - "strict"(严格OCR) 或 "intelligent"(智能分析)
            
        返回:
            dict: 原始识别结果（未标准化的 JSON）
        """
        def say(msg):
            if progress_callback:
                progress_callback(msg)

        mode_label = "🔍 严格OCR" if ocr_mode == "strict" else "🧠 智能分析"
        say(f"🔮 启动 GPT-4-Turbo-Vision 识别紫微命盘 ({mode_label})...")
        print(f"[ZiweiAI_v1.2] OCR Mode Loaded: {ocr_mode}")
        
        try:
            response = self._call_gpt4_turbo_vision(image_base64, ocr_mode)
            say("✅ 模型响应成功，返回原始识别结果...")
            result = self._parse_vision_output(response, ocr_mode)
            
            say("✅ 紫微命盘 OCR 识别完成！")
            return result
            
        except Exception as e:
            return {"success": False, "error": str(e)}

    def _get_strict_prompt(self):
        """严格模式 Prompt - 纯OCR，禁止推理"""
        return """你是"紫微斗数命盘 OCR 专家"。你的任务是仅根据图片内容做逐字识别，并输出严格 JSON。

【非常重要的规则】：
1) 禁止臆测、推断、补全；图片没有的文字一律留空字符串 "" 或空数组 []
2) 先识别中宫（中心方框）中的：性别、真太阳时、阳历、阴历、命局、命主、身主；匹配对应字段
3) 再识别十二宫宫名与"主星（粗体/较大字）"，只把宫格内"主星名"装入对应数组（如"命宫": ["天府"]）
4) 识别四化区域的"生年四化"和"流年四化"，分别填入 transformations
5) 绝不可输出除 JSON 以外的任何文字；按给定 schema 返回

【输出格式要求】
必须严格按照以下 ZiweiAI_v1.2 JSON 结构输出：

{
  "meta": {
    "parser_version": "ZiweiAI_v1.2",
    "ocr_mode": "strict",
    "source": "文墨天机",
    "vision_model": "GPT-4-Turbo",
    "timestamp": "2025-11-06T20:00:00+08:00"
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
  "star_map": {
    "命宫": [], "兄弟宫": [], "夫妻宫": [], "子女宫": [],
    "财帛宫": [], "疾厄宫": [], "迁移宫": [], "交友宫": [],
    "官禄宫": [], "田宅宫": [], "福德宫": [], "父母宫": []
  },
  "transformations": {
    "生年四化": {"禄": "", "权": "", "科": "", "忌": ""},
    "流年四化": {"禄": "", "权": "", "科": "", "忌": ""}
  }
}

【重要提示】
- 只输出完整的 JSON，不要任何其他文字、解释或注释
- 所有字段都必须存在；图片没有就留空
- star_map 每个宫位数组只放"主星名"（一到两个）。若主星为空则返回 []
- 不要添加 astro_fingerprint、relationship_vector、environment、tags 等分析字段"""

    def _get_intelligent_prompt(self):
        """智能模式 Prompt - OCR + 智能分析"""
        return """你是一名专业的紫微斗数命盘OCR解析专家。请仔细识别图片中的紫微命盘，提取所有信息，并进行智能分析。

【识别要求】
1. 十二宫位：命宫、兄弟宫、夫妻宫、子女宫、财帛宫、疾厄宫、迁移宫、交友宫、官禄宫、田宅宫、福德宫、父母宫
2. 每个宫位的主星、副星、四化星（化禄、化权、化科、化忌）
3. 基本信息：性别、命局（如"金四局"）、命主、身主、真太阳时、阳历日期、阴历日期、出生地
4. 生年四化：禄、权、科、忌分别在哪个星
5. 地支信息（如"巳"、"午"等）

【输出格式要求】
必须严格按照以下 ZiweiAI_v1.1 JSON 结构输出，确保所有字段都存在：

{
  "meta": {
    "parser_version": "ZiweiAI_v1.1",
    "source": "文墨天机",
    "system": "LynkerAI ZiweiAI",
    "timestamp": "2025-11-06T20:00:00+08:00"
  },
  "basic_info": {
    "性别": "男",
    "真太阳时": "1975-05-10T23:10:00+08:00",
    "阳历日期": "1975-05-10",
    "阴历日期": "1975年四月初一",
    "命局": "金四局",
    "命主": "武曲",
    "身主": "天同",
    "出生地": "吉隆坡"
  },
  "astro_fingerprint": {
    "主星组合编码": "天府-天梁-武曲",
    "化星组合编码": "禄权科忌=天机-天梁-紫微-文曲",
    "局数编码": "金四局",
    "主宫地支": "巳",
    "星曜矩阵": [
      ["命宫", "天府"],
      ["夫妻宫", "廉贞、破军"],
      ["迁移宫", "紫微、七杀"]
    ]
  },
  "star_map": {
    "命宫": ["天府"],
    "兄弟宫": ["文曲", "擎羊"],
    "夫妻宫": ["廉贞", "破军", "禄存"],
    "子女宫": ["辅星", "陀罗"],
    "财帛宫": [],
    "疾厄宫": [],
    "迁移宫": ["紫微", "七杀"],
    "交友宫": ["天机", "天梁"],
    "官禄宫": ["天相"],
    "田宅宫": ["太阳", "巨门"],
    "福德宫": ["武曲", "贪狼"],
    "父母宫": ["天同", "太阴"]
  },
  "transformations": {
    "生年四化": {
      "禄": "天机",
      "权": "天梁",
      "科": "紫微",
      "忌": "文曲"
    },
    "流年四化": {
      "禄": "",
      "权": "",
      "科": "",
      "忌": ""
    }
  },
  "tags": {
    "格局": ["天府坐命格", "禄权双美"],
    "性格": ["稳重", "谨慎", "理性"],
    "优势": ["管理力强", "财务思维佳"],
    "风险因子": []
  },
  "relationship_vector": {
    "婚姻": 0.82,
    "事业": 0.91,
    "健康": 0.78,
    "人际": 0.74
  },
  "environment": {
    "city": "吉隆坡",
    "country": "马来西亚",
    "climate_zone": "热带",
    "humidity_type": "潮湿",
    "terrain_type": "沿海"
  },
  "risk": {}
}

【重要提示】
- 只输出完整的 JSON，不要任何其他文字、解释或注释
- 确保 JSON 格式正确，所有引号、括号、逗号都完整
- 如果某些信息无法识别，使用空字符串 "" 或空数组 []，但不要省略字段
- star_map 必须包含所有十二宫，即使某些宫位是空宫也要用 [] 表示
- astro_fingerprint 和 relationship_vector 可以留空值，后续 Normalizer 会自动生成
- environment 字段可以留空，如果图中有出生地信息请提取"""

    def _call_gpt4_turbo_vision(self, image_base64, ocr_mode="intelligent"):
        """调用 GPT-4-Turbo-Vision API 进行 OCR 识别"""
        
        # 清理 base64 数据（移除可能的前缀）
        if image_base64.startswith('data:'):
            image_base64 = image_base64.split(',', 1)[1] if ',' in image_base64 else image_base64
        
        # 根据模式选择 Prompt
        if ocr_mode == "strict":
            prompt = self._get_strict_prompt()
        else:
            prompt = self._get_intelligent_prompt()
        
        headers = {
            "Authorization": f"Bearer {self.openai_api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": "你是精通文墨天机版紫微斗数排盘的OCR识别专家，精确提取命盘所有细节"
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/png;base64,{image_base64}"}
                        }
                    ]
                }
            ],
            "temperature": 0.1,
            "max_tokens": 4000
        }
        
        res = None
        try:
            res = requests.post(self.endpoint, headers=headers, json=data, timeout=90)
            res.raise_for_status()
            content = res.json()["choices"][0]["message"]["content"]
            return content
            
        except requests.exceptions.HTTPError as e:
            if res:
                error_detail = ""
                try:
                    error_detail = res.json()
                except:
                    error_detail = res.text
                raise Exception(f"OpenAI API 错误 {res.status_code}: {error_detail}")
            else:
                raise Exception(f"请求失败: {str(e)}")

    def _parse_vision_output(self, response_text, ocr_mode="intelligent"):
        """解析 GPT 输出为原始 JSON 结构"""
        print(f"[ZiweiVision] 收到 GPT-4-Turbo 响应，长度: {len(response_text)} 字符")
        print(f"[ZiweiVision] 原始响应前500字符: {response_text[:500]}")
        
        try:
            json_text = self._extract_json_block(response_text)
            print(f"[ZiweiVision] 成功提取 JSON 区块，长度: {len(json_text)} 字符")
            data = json.loads(json_text)
            
            # 确保 meta 字段包含 ocr_mode
            if "meta" not in data:
                data["meta"] = {}
            data["meta"]["ocr_mode"] = ocr_mode
            data["meta"]["parser_version"] = "ZiweiAI_v1.2"
            
            print(f"[ZiweiVision] ✅ JSON 解析成功")
            print(f"[ZiweiVision] 识别到的字段: {list(data.keys())}")
            print(f"[ZiweiVision] OCR 模式: {ocr_mode}")
            
            return {
                "success": True,
                "timestamp": datetime.now().isoformat(),
                "raw_text": response_text,
                "data": data
            }
            
        except Exception as e:
            print(f"[ZiweiVision] ⚠️ 主解析失败: {str(e)}")
            print(f"[ZiweiVision] 尝试 fallback 正则提取...")
            
            # Fallback: 使用多种正则模式尝试提取
            import re
            
            # 方法1: 贪婪匹配最后一个完整的JSON
            patterns = [
                r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}',  # 支持一层嵌套
                r'\{.*\}',  # 最贪婪的匹配
            ]
            
            for i, pattern in enumerate(patterns):
                matches = list(re.finditer(pattern, response_text, re.DOTALL))
                if matches:
                    # 从最后一个匹配开始尝试
                    for match in reversed(matches):
                        json_candidate = match.group(0)
                        try:
                            data = json.loads(json_candidate)
                            print(f"[ZiweiVision] ✅ Fallback 成功 (模式 {i+1})，JSON长度: {len(json_candidate)}")
                            return {
                                "success": True,
                                "timestamp": datetime.now().isoformat(),
                                "raw_text": response_text,
                                "data": data
                            }
                        except json.JSONDecodeError:
                            continue
            
            # 所有方法都失败
            print(f"[ZiweiVision] ❌ 所有解析方法均失败")
            print(f"[ZiweiVision] 完整响应内容:\n{response_text}")
            
            return {
                "success": False,
                "error": f"无法提取有效的 JSON 结构: {str(e)}",
                "raw_text": response_text
            }

    def _extract_json_block(self, text):
        """提取 JSON 部分（支持 markdown 代码块）"""
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        
        start = text.find("{")
        end = text.rfind("}")
        
        if start == -1 or end == -1:
            raise ValueError(f"未找到 JSON 区块。GPT 响应: {text[:200]}")
        
        return text[start:end+1]
