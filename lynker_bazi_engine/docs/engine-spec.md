# Lynker Engine · 排盘引擎规范（v0.1）

> 内部代号：Lynker Core Engine  
> 项目阶段：Prototype / Experimental  
> 最后更新：2025-Q1

---

## 1. 项目目标（Why this engine exists）

Lynker Engine 的目标不是简单"排盘工具"，而是：

- 构建一套 **可验证的命理引擎**
- 支持紫微斗数、八字、未来扩展命理系统
- 允许 AI 与用户人生轨迹进行交叉验证
- 为未来 API 商业化奠定基础

Lynker Engine 是 **灵客（LynkerAI）的核心资产**。

---

## 2. 引擎设计哲学

与传统排盘软件不同，Lynker Engine 的核心理念：

| 传统软件 | Lynker Engine |
|----------|----------------|
| 黑箱算法 | 半开源 / 可解释 |
| 固定流派 | 多流派可切换 |
| 只出盘 | 出盘 + 验证 |
| 单机 | 云端 API 化 |
| 不追踪 | 追踪用户真实人生事件 |

引擎不追求"神秘感"，而追求 **可验证性**。

---

## 3. 模块结构设计

```
/engine
  /bazi
    ├─ calc-core.ts
    ├─ true-solar.ts
    ├─ pillars.ts
    ├─ dayun.ts
    └─ liunian.ts

  /ziwei
    ├─ core.ts
    ├─ bureau.ts
    ├─ star-map.ts
    ├─ mutagen.ts
    └─ palace-layout.ts

  /future
    ├─ parent-column.ts  // 父母柱
    ├─ point-column.ts   // 点柱
    ├─ ke-column.ts      // 刻柱
    └─ fen-column.ts     // 分柱
```

每个模块必须满足：

- 可以独立测试
- 不依赖 UI
- 可被 API 层调用

---

## 4. 输入标准（Input Schema）

所有排盘请求统一结构：

```ts
interface LynkerChartInput {
  gender: 'M' | 'F';
  date: string;      // YYYY-MM-DD
  time: string;      // HH:mm
  longitude: number; // 经度
  latitude?: number; // 纬度（预留）
  timezone?: string; // 时区（预留）
  utcOffset?: number;
}
```

---

## 5. 输出标准（Output Schema）

所有排盘结果统一输出 JSON：

```ts
interface LynkerChartOutput {
  meta: {
    engine: 'Lynker';
    version: '0.1';
    calculationMode: 'true-solar' | 'clock';
  };

  bazi?: {
    pillars: Pillar[];
    dayun: LuckCycle[];
  };

  ziwei?: {
    mingGong: string;
    shenGong: string;
    bureau: string;
    palaces: Palace[];
  };

  future?: {
    parentColumn?: any;
    pointColumn?: any;
    keColumn?: any;
    fenColumn?: any;
  };
}
```

---

## 6. 核心计算原则

引擎优先级算法设定：

1. **真太阳时优先**
2. **地理经度强制修正**
3. **节气模式优先**
4. **多算法对照保留差异值**
5. **允许 AI 层参与模糊校正**

---

## 7. 与文墨天机的关系

Lynker Engine 并不复刻文墨天机：

- **不使用其私有算法**
- **但允许结果级兼容**
- **以开源 + 可验证为优先**

兼容程度标注字段：

```ts
compatibility: {
  wenmoMatchPercent?: number
}
```

---

## 8. API 商业化预埋

引擎在设计时已考虑：

- SaaS API 输出
- 第三方计费
- 调用次数统计
- 版本控制
- 白标输出能力

未来 API 示例：

```bash
POST /api/v1/chart
POST /api/v1/compare
POST /api/v1/verify
```

---

## 9. 当前阶段路线图

### Phase 1（当前）

- ✅ 紫微排盘基本结构
- ✅ 八字四柱排盘
- ✅ 真太阳时算法

### Phase 2

- ⬜ 父母柱模块
- ⬜ 点柱 / 刻柱 / 分柱
- ⬜ 批量比对机制

### Phase 3

- ⬜ AI 验证引擎
- ⬜ API 商业化
- ⬜ 同命社交系统接入

---

## 10. 设计原则（必须遵守）

1. **不允许业务逻辑写在 UI 层**
2. **所有算法必须归属于 /engine**
3. **所有外部调用通过 API**
4. **输出数据不可依赖 UI 结构存在**

---

## 11. 结束语

**Lynker Engine 不是工具，而是基础设施。**

我们不是在模仿命理系统，而是在构建：

- 一套可验证的命理计算标准
- 一个可扩展的引擎架构
- 一个面向未来的 AI + 命理融合平台

---

*本文档将随引擎迭代持续更新*
