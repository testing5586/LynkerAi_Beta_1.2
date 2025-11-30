# Lynker Engine · API 规范说明 （v0.1）

> 服务名称：Lynker Engine API  
> 类型：RESTful JSON API  
> 设计目标：可商业化 / 可授权 / 可扩展

---

## 1. API 设计原则

Lynker Engine API 的核心目标：

- 高稳定性
- 强一致性
- 结果可预测
- 与 UI 完全分离
- 支持商业授权与调用计费

所有 API 采用：

- HTTPS
- JSON
- UTF-8
- Bearer Token 认证（预留）

---

## 2. Base URL 规范

**开发环境：**

```
http://localhost:8787/api
```

**生产环境（预留）：**

```
https://api.lynker.ai/v1
```

---

## 3. 公共 Headers 规范

所有请求统一使用：

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {API_KEY}
X-Client-Version: 0.1
X-Engine-Mode: true-solar
```

---

## 4. 核心接口列表

### 4.1 紫微排盘接口

**Endpoint**

```bash
POST /v1/ziwei/chart
```

**Request Body**

```json
{
  "gender": "M",
  "date": "2000-03-20",
  "time": "08:18",
  "longitude": 120.000,
  "latitude": 0,
  "timezone": "+08:00"
}
```

**Response**

```json
{
  "meta": {
    "engine": "Lynker",
    "version": "0.1",
    "mode": "true-solar"
  },
  "result": {
    "mingGong": "亥",
    "shenGong": "未",
    "bureau": "水二局",
    "palaces": [
      {
        "index": 0,
        "name": "命宫",
        "branch": "亥",
        "majorStars": ["紫微"],
        "minorStars": ["红鸾"],
        "mutagen": ["科"]
      }
    ]
  }
}
```

### 4.2 八字排盘接口

**Endpoint**

```bash
POST /v1/bazi/chart
```

**Request Body**

```json
{
  "date": "2000-03-20",
  "time": "08:18",
  "longitude": 120.000,
  "gender": "M"
}
```

**Response**

```json
{
  "meta": {
    "engine": "Lynker",
    "version": "0.1"
  },
  "result": {
    "year": "庚辰",
    "month": "己卯",
    "day": "丁丑",
    "hour": "甲辰",
    "dayun": []
  }
}
```

---

## 5. 真命盘验证接口（核心商业接口）

**Endpoint**

```bash
POST /v1/chart/verify
```

**说明**

此接口用于灵客特色功能：

- 同一命盘多算法比对
- 文墨参考度评分
- 用户轨迹比对

**Request Body**

```json
{
  "gender": "M",
  "date": "2000-03-20",
  "time": "08:18",
  "longitude": 120.000,
  "lifeEvents": [
    {
      "year": 2014,
      "event": "转行进入室内设计行业"
    }
  ]
}
```

**Response**

```json
{
  "meta": {
    "engine": "Lynker",
    "version": "0.1",
    "verifyMode": true
  },
  "score": {
    "overall": 87,
    "ziweiMatch": 82,
    "baziMatch": 90,
    "wenmoMatch": 78
  },
  "adjustSuggest": {
    "timeOffsetSeconds": -120,
    "reason": "事件匹配度更高"
  }
}
```

---

## 6. 同命匹配专用接口

**Endpoint**

```bash
POST /v1/match/same-life
```

**用途说明**

- 用于灵客社交系统
- 同年月日时 + 点柱 + 刻柱 + 分柱匹配
- 输出相似度评分

**Request Body**

```json
{
  "userA": {
    "date": "2000-03-20",
    "time": "08:18",
    "gender": "M"
  },
  "userB": {
    "date": "2000-03-20",
    "time": "08:20",
    "gender": "F"
  }
}
```

**Response**

```json
{
  "similarity": 91,
  "level": "High Resonance",
  "matchPoints": [
    "same_hour",
    "close_minute",
    "same_ming_gong"
  ]
}
```

---

## 7. 商业授权接口预留

这些接口暂不开放，但文档已预留：

```bash
POST /v1/license/verify
POST /v1/license/usage
POST /v1/license/balance
```

---

## 8. 错误码规范

| Code | 含义 |
|------|------|
| 4001 | 参数错误 |
| 4002 | 时间格式错误 |
| 4003 | 地理经度错误 |
| 5001 | 引擎异常 |
| 5002 | 算法未准备 |
| 5003 | 超出速率限制 |

**JSON 示例：**

```json
{
  "error": {
    "code": 4001,
    "message": "Invalid longitude value"
  }
}
```

---

## 9. 版本管理设计

API 必须支持：

- **URI 版本控制**：`/v1/`
- **Header 版本控制**
- **向下兼容策略**

---

## 10. 结束语

**Lynker Engine API 的定位是：**

命理行业的基础设施，不是单一应用接口。

它将支持：

- 商业 SaaS
- 白标网站
- 多平台代理
- AI 命理协作系统

---

*本文档将随 API 迭代持续更新*
