# 灵客 · 验证真命盘页面 规格说明（v0.1）

> 页面英文名：True Birth Chart Verification  
> 内部代号：`/true-chart`  
> 关联模块：Lynker Engine（排盘引擎）、同命匹配、时间线事件库

---

## 1. 页面定位（是什么 & 不是什么）

**这个页面不是一般"排盘展示页面"，而是：**

1. 用来「验证出生时辰是否真实」的实验室  
2. 用来收集「人生事件 ↔ 命盘应验度」数据的入口  
3. 用来调用 **Lynker Engine API** 的前端控制台  
4. 将来作为「同命匹配 / AI 命例学习」的核心入口

---

## 2. 页面核心流程总览（User Flow）

用户进入 `/true-chart` 的基本流程：

### 1. 输入 / 选择出生信息  
   - 公历日期、时间（小时:分钟）、性别、经度  
   - 可选：从历史记录中选一个已提交的命盘  

### 2. 前端调用 **Lynker Engine API**  
   - `POST /v1/bazi/chart`  
   - `POST /v1/ziwei/chart`  
   - 得到结构化：八字＋紫微命盘 JSON  

### 3. 页面展示「双命盘视图」  
   - 左：八字四柱 + 大运  
   - 右：紫微十二宫 + 星曜  
   - 中间：基本信息（真太阳时 / 命主概览）  

### 4. 用户补充「个人人生时间线」  
   - 例如：  
     - 2001：出国念设计  
     - 2014：转行室内设计  
     - 2023：离婚  
   - 支持标签：事业 / 婚姻 / 健康 / 家庭 / 财运  

### 5. 调用 **验证接口** `POST /v1/chart/verify`  
   - 后端根据：  
     - 八字结构  
     - 紫微盘结构  
     - 事件标签  
   - 返回「应验评分」＋「建议的时辰修正（分钟级）」  

### 6. 页面进入「一问一验 Mode」  
   - AI 提出：  
     - 某一年是否发生某类事件？  
   - 用户回答 ✅/❌/有保留  
   - 持续迭代，更新真命盘可信度评分  

### 7. 用户可以选择：  
   - 将这个时辰标记为"暂定真命盘"  
   - 或继续微调（点柱/刻柱/分柱）  

---

## 3. 页面模块拆解（前端结构）

建议用 React 组件划分：

```tsx
<TrueChartPage>
  <BirthInputPanel />      // 基本资料输入
  <EngineSummaryCard />    // 引擎调用信息+真太阳时
  <DualChartView />        // 八字+紫微双盘展示
  <LifeTimelinePanel />    // 人生事件时间线输入
  <VerifyResultPanel />    // 验证分数 & 建议刻分
  <OneQuestionMode />      // 一问一验对话区
</TrueChartPage>
```

### 3.1 `<BirthInputPanel />`

**功能：**

- 输入出生日期、时间、性别、经度
- 提供「从其他排盘工具导入」入口（后期用 OCR/API）
- 按钮：[生成命盘]

**调用：**

点击后调用：
- `POST /v1/bazi/chart`
- `POST /v1/ziwei/chart`

---

### 3.2 `<EngineSummaryCard />`

**显示：**

- 使用的引擎版本：Lynker Engine v0.1
- 计算模式：真太阳时 or 钟表时
- 输入时间 vs 真太阳时
- 当前假设的：
  - 命宫位置
  - 身宫位置
  - 局数（火六局、水二局等）

---

### 3.3 `<DualChartView />`

**包含：**

#### `<BaziView />`
- 四柱＋大运一览

#### `<ZiweiView />`
- 十二宫宫格（接近文墨风格）
- 支持 hover 显示星曜解释（可后期接 AI）

**重要：**  
这两个子组件只吃「结构化 JSON」，不包含任何计算逻辑，所有逻辑来自引擎。

---

### 3.4 `<LifeTimelinePanel />`

**功能：**

让用户填写个人大事件（年份+标签+描述）

**示例：**
- 2014 | 事业 | 转行室内设计
- 2023 | 婚姻 | 离婚

**结构：**

```ts
interface LifeEventInput {
  year: number;
  category: 'career' | 'love' | 'health' | 'family' | 'finance' | 'other';
  description: string;
}
```

**数据会：**
- 直接传给 `/v1/chart/verify`
- 未来也会写入数据库，用于模型训练

---

### 3.5 `<VerifyResultPanel />`

**显示来自后端的验证结果：**

- 整体评分：`overall: 87`
- 八字匹配度：`baziMatch: 90`
- 紫微匹配度：`ziweiMatch: 82`
- 文墨参考匹配度：`wenmoMatch: 78`（后期）
- 建议的时间修正：`timeOffsetSeconds: -120`（往前调2分钟）

**UI 示例：**

一条横向评分条，下方一段说明文：

> 「根据你的人生事件，这个命盘与现实的吻合度约 87 分。  
> 若将出生时间向前调整 2 分钟（08:16 → 08:14），事业与婚姻事件的应验度可能更高。」

---

### 3.6 `<OneQuestionMode />`（一问一验模式）

**这是灵客的特色：**

由 AI 提出一次只验证"一条应象"

**例如：**

> 「命盘显示你在 2018–2020 年之间有一次事业起落，你有感觉到吗？」

**用户回答：**
- ✅ 很准，我 2018–2020 有明显事业波动
- ❌ 不准，没有特别变化
- 🟡 有保留，还不确定

**每条回答会：**
- 记录在 `verify_records` 表
- 反馈给引擎用于后续评分加权

---

## 4. 前端与 API 的交互（技术视角）

### 4.1 第一步：生成命盘

```ts
const resZiwei = await fetch('/v1/ziwei/chart', { ... });
const resBazi = await fetch('/v1/bazi/chart', { ... });
setZiweiChart(resZiwei.result);
setBaziChart(resBazi.result);
```

### 4.2 第二步：发送人生时间线 + 请求验证

```ts
const resVerify = await fetch('/v1/chart/verify', {
  method: 'POST',
  body: JSON.stringify({
    gender,
    date,
    time,
    longitude,
    lifeEvents
  })
});
setVerifyResult(resVerify);
```

### 4.3 第三步：一问一验记录

每一条问答都是一条记录：

```ts
POST /v1/chart/verify/feedback
{
  "chartId": "xxx",
  "questionId": "q_001",
  "userAnswer": "yes",  // yes / no / unsure
  "note": "2018-2020 确实事业有大变化"
}
```

---

## 5. 与未来功能的接口预留

### 5.1 同命匹配

在真命盘验证成功后，页面可以提供：

- 「寻找同命人」按钮
- 调用 `/v1/match/same-life`
- 使用当前时刻（刻分+分秒）作为匹配参数

### 5.2 父母柱 / 点柱 / 刻柱 / 分柱

在引擎加入这些结构后：

- `<EngineSummaryCard />` 可以显示：
  - 当前点柱、刻柱、分柱信息
- 验证结果可以提示：
  - 「当前刻柱更符合你的婚姻事件」

---

## 6. 页面设计原则（UX 层面）

1. **不以"吓人"的预测吓跑用户**
2. **语气保持「探索、实验、一起破解」**
3. **强调：**
   > 「这个页面不是算命，是帮你找到最接近真实的命盘。」
4. **所有结果都可以被用户修正**
5. **所有过程都可以被记录，用于未来训练**

---

## 7. 简要前端状态管理建议

可用简单的 React 状态或轻量 Zustand：

```ts
interface TrueChartState {
  input: LynkerChartInput;
  charts: {
    ziwei?: ZiweiChart;
    bazi?: BaziChart;
  };
  lifeEvents: LifeEventInput[];
  verifyResult?: VerifyResult;
  qaHistory: QuestionAnswerRecord[];
}
```

---

## 8. 总结

**验证真命盘页面** 是灵客的核心差异化功能：

- 不只是排盘，而是验证
- 不只是展示，而是收集数据
- 不只是算命，而是探索真实

这个页面将成为：
- 用户信任灵客的起点
- AI 学习命理的数据源
- 同命社交的入口

---

*本文档将随功能迭代持续更新*
