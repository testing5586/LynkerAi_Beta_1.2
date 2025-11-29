《父母柱设计哲学（Family Column Philosophy）》
1. 设计起源（Design Origin）

“父母柱”并非传统八字或紫微斗数体系中的现成概念，而是基于以下洞察重构而来：

传统命理系统中的“父母宫”，并不是用来断定父母的社会地位或财富等级，
而是反映命主与父母之间的关系结构、资源倾向与生命应象体验。

灵客系统将这种洞察转化为数据结构，命名为 父母柱（Family Column）。

2. 核心哲学（Core Philosophy）

父母柱的设计遵循三条核心哲学原则：

原则一：关系优先，而非事实优先

系统关注的是：

✅ 父母对命主的投入意愿
✅ 亲缘关系的真实心理张力
✅ 资源是否向命主倾斜

而不是：

❌ 父母实际资产数值
❌ 社会地位标签

原则二：感知真实优于客观真实

灵客系统采信：

“命主感受到的父母状态”，
远比“社会统计意义上的父母状态”更重要。

也就是说：

如果一个命主长期感觉被忽视，
即使父母客观条件优秀，
系统仍记录为“弱亲缘结构”。

原则三：六亲结构不是标签，而是“应象系统”

系统不将父母视为：

“好 / 坏”

“强 / 弱”

而是视为：

一种贯穿命主一生的应象力场。

父母柱是一个结构变量，而不是评价变量。

3. 三维字段心理学模型（Core 3-Axis Model）

父母柱由三条主轴构成：

字段	核心含义	解释
presence	存在形态	父母在命主人生中是否“真实参与”
wealth	资源倾向	资源是否愿意向命主倾斜
relation	关系张力	情感压力、疏离度、冲突潜势

这三个字段彼此独立，但在算法中会形成动态权重模型。

4. 与传统命理系统的关系

父母柱并非取代传统系统，而是作为：

✅ 紫微斗数父母宫的抽象映射
✅ 八字六亲逻辑的结构化模型
✅ 铁板神数学六亲的数字化容器

它是一个**“兼容层”**，不是一个“派别”。

5. 支持反复修订的设计原则（Collaboration-Ready Design）

由于灵客计划长期与多位命理师共同研发，父母柱系统从一开始即为“可变哲学结构”而设计：

设计原则：

所有字段均可版本化

每次修改需保留历史逻辑

允许不同流派生成“子逻辑分支”

AI 必须记录“算法来源”

6. 版本机制预埋方案

建议系统内部使用以下结构：

family_column_versions {
  id
  version_name
  author_type   // system | astrologer | researcher
  core_philosophy_hash
  created_at
}


从而支持：

✅ 多命理师参与
✅ 哲学演化
✅ 历史对比
✅ 实验分支

7. 灵客最终使命声明（可作为产品内核宣言）

灵客不是为了制造“标准答案”，
而是为了构建一个可以反复验证、持续进化的命理结构系统。

父母柱并非一种绝对真理，
而是一种不断被修正、被理解、被挑战的关系模型。

我们不垄断真理，
只记录真实。

《父柱 / 母柱 双核心结构设计哲学》
1. 设计动机（Why Split）

传统命理的一个致命盲区是：

把“父母”当作一个整体结构来判断。

但真实人生中，父与母对命主的影响是完全不同性质的力量：

父亲 → 权威 / 法则 / 现实资源 / 外部世界接口

母亲 → 情感安全 / 内在价值 / 生存直觉 / 潜意识模型

所以灵客系统强制将父母拆分为两个独立运算柱：

father_column
mother_column

2. 父柱（Father Column）哲学模型
父柱的核心意义：

代表命主如何面对：

规则

权威

社会结构

现实竞争世界

不是“父亲这个人”，
而是：外在秩序的投射源。

父柱核心字段：
father_column {
  presence_level      // 实体存在强度
  authority_projection // 权威投射感
  resource_flow        // 资源支持方向
  conflict_tension     // 对抗张力
  emotional_distance   // 情感距离感
}

3. 母柱（Mother Column）哲学模型
母柱的核心意义：

代表命主如何面对：

情绪

安全感

依附关系

潜意识

不是“母亲这个人”，
而是：内在世界的塑造源。

母柱核心字段：
mother_column {
  presence_level
  emotional_bond      // 情感黏结力
  nurturing_quality   // 滋养能力
  control_pattern     // 控制型模式
  emptiness_pattern   // 缺失型模式
}

4. 父母“双引擎”运行机制

灵客不再做：

❌ 单一“父母宫”
❌ 单个“父母评分”

而是采用：

父柱引擎（外在现实建模）
        +
母柱引擎（内在情绪建模）
        =
人生基础人格引擎（Core Life Engine）

5. 特殊设计：允许“父母力量不对称”

允许极端结构：

✅ 父强母弱
✅ 母强父缺
✅ 双缺失
✅ 双过度干预

系统不会评价对错，只记录结构类型：

family_structure_type {
  type_id: "F_STRONG_M_WEAK",
  description: "现实驱动强，情感根系弱"
}

6. 与紫微的连接方式（你之前提到的父母宫盲区）

你之前的核心洞察是对的：

紫微的父母宫看到的是“我与父母的关系结构”，
不是“父母的真实社会层级”。

所以灵客采取如下映射：

紫微父母宫	灵客映射去向
化科	emotional_bond ↑
化忌	conflict_tension ↑
化权	authority_projection ↑
化禄	resource_flow ↑

而不是简单断：

❌ 父母有钱
❌ 家境好坏

7. 支持多门派合作的开放接口设计

你说未来要多位命理师参与 → 这里已经预埋：

family_logic_branches {
  id
  branch_name
  base_model: "orthodox" | "blind" | "ziwei" | "iron_plate"
  override_rules
  created_by
}

8. 数据库存储结构参考（给你工程师用）
CREATE TABLE chart_family_columns (
  id BIGSERIAL PRIMARY KEY,
  chart_id BIGINT,

  -- Father Column
  father_presence SMALLINT,
  father_authority SMALLINT,
  father_resource SMALLINT,
  father_conflict SMALLINT,
  father_distance SMALLINT,

  -- Mother Column
  mother_presence SMALLINT,
  mother_bond SMALLINT,
  mother_nurture SMALLINT,
  mother_control SMALLINT,
  mother_empty SMALLINT,

  created_at TIMESTAMP DEFAULT now()
);