# 🧱 Static Lockdown 指南  
## 路线 B：彻底禁用 Astro Island + Hydration（去 hydration）

> **用途说明**  
> 本文档用于在 **只有编译后产物（HTML + JS）且无 Astro / React 源码** 的前提下，  
> **一劳永逸地禁用 React / Astro Hydration**，  
> 使 HTML 成为 UI 的最终真实来源（Single Source of Truth）。

---

## 📌 适用场景

当你遇到以下任一情况时，**必须使用本方案**：

- 修改 HTML 后，页面刷新又被 React 改回去
- 删除 / 隐藏 UI 元素无效
- VS Code 中的 UI 修改被自动 re-render 覆盖
- 项目来自 UXBot / Astro / React 的 **build output**
- 没有 `.astro` / `.tsx` 源码，只能改 HTML

---

## 🎯 目标（必须全部满足）

- ✅ 彻底禁用 React / Astro 对 DOM 的接管
- ✅ 保留当前 HTML
- ✅ 保留现有样式（CSS 不变）
- ✅ 保留在 VSCode 中已完成的所有 UI 修改
- ✅ 不使用 JS hack（MutationObserver / setTimeout）
- ✅ 为未来 React 重写保留结构参考

---

## 🚫 明确禁止的做法

以下方式 **一律禁止**（这是技术债，不是解决方案）：

- ❌ MutationObserver 持续隐藏 DOM
- ❌ setTimeout / setInterval 反复 patch
- ❌ click 拦截强制改 DOM
- ❌ 在 React hydrate 之后再动手

---

## 🛠️ 执行步骤（严格按顺序）

### Step 1：定位并删除 Astro Island

在目标 HTML 文件中：

```html
<astro-island ...>
  ...
</astro-island>
```

👉 **完整删除整个 `<astro-island>...</astro-island>` 区块**

---

### Step 2：删除所有 Hydration Script

```html
<script type="module" src="/_astro/client*.js"></script>
<script type="module" src="/_astro/*.js"></script>
```

---

### Step 3：锁定 HTML 为最终结构

- 当前页面中 **已有的 HTML 即为最终 UI**
- 不重新生成组件
- 不引入框架

---

## ✅ 验收标准（Checklist）

- [ ] 不存在 `<astro-island>`
- [ ] Network 中无 `_astro/client*.js`
- [ ] 刷新后 UI 不回滚
- [ ] 无 JS hack 维持状态

---

## 🏁 总结

> **这是一次“拿回前端控制权”的工程决策，而不是妥协。**
