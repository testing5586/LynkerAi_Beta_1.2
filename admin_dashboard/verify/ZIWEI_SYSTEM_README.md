# 紫微斗数三层架构系统
# Ziwei (Purple Star) Astrology Three-Layer Architecture

## 概述 Overview

本系统实现了与八字系统平行的紫微斗数命盘识别与分析架构，采用三层设计确保清晰的关注点分离。

This system implements a parallel architecture to the Bazi system for Ziwei (Purple Star) astrology chart recognition and analysis, using a three-layer design for clear separation of concerns.

## 架构图 Architecture

```
用户上传命盘图片
User uploads chart image
        ↓
┌─────────────────────────────────────────┐
│  Layer 1: Vision Agent                  │
│  ziwei_vision_agent.py                  │
│  - GPT-4-Turbo-Vision OCR               │
│  - 识别十二宫、主星、副星、四化           │
│  - Recognizes 12 palaces, stars, etc.   │
└─────────────────────────────────────────┘
        ↓ Raw JSON
┌─────────────────────────────────────────┐
│  Layer 2: Normalizer                    │
│  ziwei_normalizer.py                    │
│  - 标准化为 ZiweiAI_v1.0 结构            │
│  - 数据验证与自动标签                     │
│  - Standardizes to ZiweiAI_v1.0 format  │
└─────────────────────────────────────────┘
        ↓ Standardized JSON
┌─────────────────────────────────────────┐
│  Layer 3: Analysis Agent                │
│  ziwei_analysis_agent.py                │
│  - GPT-4-Turbo 命理分析                  │
│  - 生成格局、用神、六亲、建议等报告        │
│  - Generates fortune-telling reports    │
└─────────────────────────────────────────┘
        ↓ Analysis Report
   前端展示 Frontend Display
```

## 文件结构 File Structure

```
admin_dashboard/verify/
├── ziwei_vision_agent.py      # Layer 1: OCR 识别
├── ziwei_normalizer.py         # Layer 2: 标准化
├── ziwei_analysis_agent.py     # Layer 3: AI 分析
└── routes.py                   # API 端点集成
```

## API 端点 API Endpoint

### POST `/verify/api/ziwei/full_pipeline`

完整三层流程的单一端点。

**请求参数 Request:**
```json
{
  "image_base64": "iVBORw0KGgo...",
  "analysis_focus": "career"  // 可选: career, marriage, wealth, health, family
}
```

**响应 Response:**
```json
{
  "ok": true,
  "raw": {
    "success": true,
    "data": { /* Layer 1 原始识别结果 */ }
  },
  "standardized": {
    "success": true,
    "meta": {
      "parser_version": "ZiweiAI_v1.0",
      "source": "文墨天机",
      "timestamp": "2025-11-05T..."
    },
    "basic_info": {
      "gender": "男",
      "destiny_master": "贪狼",
      "body_master": "天相",
      "life_bureau": "水二局"
    },
    "star_map": {
      "命宫": ["紫微", "天府", "化科"],
      "兄弟宫": ["天机"],
      // ... 其余十宫
    },
    "transformations": {
      "化禄": "太阳",
      "化权": "贪狼",
      "化科": "紫微",
      "化忌": "武曲"
    },
    "tags": ["紫府同宫", "禄权双美"]
  },
  "analysis": {
    "summary": "命理总结...",
    "格局分析": ["格局1", "格局2"],
    "六亲关系": { /* 父母、兄弟、夫妻、子女 */ },
    "事业财运": { /* 事业、财运分析 */ },
    "建议": ["建议1", "建议2"]
  },
  "brief_summary": "男 水二局 | 命宫: 紫微、天府、化科 | 特征: 紫府同宫",
  "validation": {
    "valid": true,
    "errors": [],
    "warnings": []
  },
  "toast": "✅ 紫微命盘识别与分析完成",
  "progress": ["🔮 启动识别...", "✅ 识别完成", ...]
}
```

## 使用方法 Usage

### 1. 通过 API 调用

```python
import requests
import base64

# 读取命盘图片
with open('ziwei_chart.png', 'rb') as f:
    image_data = base64.b64encode(f.read()).decode('utf-8')

# 调用 API
response = requests.post(
    'http://localhost:5000/verify/api/ziwei/full_pipeline',
    json={
        'image_base64': image_data,
        'analysis_focus': 'career'  # 可选
    },
    headers={'Authorization': 'Bearer <token>'}
)

result = response.json()
print(result['brief_summary'])
print(result['analysis'])
```

### 2. 通过测试脚本

```bash
# 直接运行测试脚本
python test_ziwei_pipeline.py path/to/ziwei_chart.png
```

### 3. 编程调用各层

```python
from admin_dashboard.verify.ziwei_vision_agent import ZiweiVisionAgent
from admin_dashboard.verify.ziwei_normalizer import normalize_ziwei
from admin_dashboard.verify.ziwei_analysis_agent import ZiweiAnalysisAgent

# Layer 1: OCR
vision_agent = ZiweiVisionAgent()
raw = vision_agent.process_image(image_base64)

# Layer 2: 标准化
normalized = normalize_ziwei(raw)

# Layer 3: 分析
analysis_agent = ZiweiAnalysisAgent()
analysis = analysis_agent.analyze_ziwei(normalized, analysis_focus='marriage')
```

## 数据格式 Data Format

### ZiweiAI_v1.0 标准结构

```json
{
  "meta": {
    "parser_version": "ZiweiAI_v1.0",
    "source": "文墨天机",
    "timestamp": "ISO-8601"
  },
  "basic_info": {
    "gender": "男/女",
    "destiny_master": "星名",
    "body_master": "星名",
    "life_bureau": "水二局"
  },
  "star_map": {
    "命宫": ["主星1", "副星1", "化X"],
    "兄弟宫": [...],
    // ... 其余十宫
  },
  "transformations": {
    "化禄": "星名",
    "化权": "星名",
    "化科": "星名",
    "化忌": "星名"
  },
  "tags": ["标签1", "标签2"],
  "risk": {}
}
```

## 识别星曜清单 Recognized Stars

### 主星 Main Stars
- 北斗: 紫微、天机、太阳、武曲、天同、廉贞
- 南斗: 天府、太阴、贪狼、巨门、天相、天梁、七杀、破军

### 副星 Auxiliary Stars
- 吉星: 左辅、右弼、文昌、文曲、禄存、天魁、天钺
- 六煞: 擎羊、陀罗、火星、铃星、地空、地劫
- 其他: 红鸾、天喜、化禄、化权、化科、化忌等

## 分析重点模式 Analysis Focus Modes

| 模式 Mode | 说明 Description |
|----------|-----------------|
| `career` | 事业发展和官禄宫分析 |
| `marriage` | 婚姻感情和夫妻宫分析 |
| `wealth` | 财运和财帛宫分析 |
| `health` | 健康和疾厄宫分析 |
| `family` | 六亲关系分析 |

## 技术细节 Technical Details

### Layer 1: Vision Agent
- **模型**: GPT-4-Turbo-Vision
- **超时**: 90 秒
- **温度**: 0.1 (确保稳定输出)
- **最大 Tokens**: 2000

### Layer 2: Normalizer
- **版本**: ZiweiAI_v1.0
- **验证**: 结构完整性检查
- **自动标签**: 基于星曜组合生成

### Layer 3: Analysis Agent
- **模型**: GPT-4-Turbo
- **温度**: 0.2 (平衡创造力与一致性)
- **最大 Tokens**: 2000
- **输出格式**: JSON 结构化报告

## 错误处理 Error Handling

系统采用分层错误处理：
- Layer 1 失败 → 返回 OCR 错误
- Layer 2 失败 → 保留 Layer 1 结果
- Layer 3 失败 → 返回前两层结果，标记分析失败

即使某一层失败，用户仍能获得前面层级的数据。

## 与八字系统对比 Comparison with Bazi System

| 特性 | 八字系统 | 紫微系统 |
|------|---------|---------|
| Layer 1 模型 | GPT-4o | GPT-4-Turbo-Vision |
| 识别内容 | 十行四列 | 十二宫 + 星曜 |
| 标准版本 | BaziAI_v1.2 | ZiweiAI_v1.0 |
| 分析重点 | 五行、十神 | 格局、四化 |

## 未来扩展 Future Extensions

- [ ] 流年分析自动生成
- [ ] 大限走势预测
- [ ] 多命盘对比分析
- [ ] 与八字系统联合分析
- [ ] 自定义分析模板

## 许可 License

本系统为 LynkerAI 项目的一部分，遵循项目主许可协议。
