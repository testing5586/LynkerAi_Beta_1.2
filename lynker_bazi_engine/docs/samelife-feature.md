# 同命匹配功能说明

## ✅ 已完成

我已经将你的 HTML/JS/CSS 代码转换为 React + TypeScript 组件。

### 📁 创建的文件

1. **`src/SameLifePage.tsx`** - React 组件（主逻辑）
2. **`src/SameLifePage.css`** - 样式文件
3. **`vite.config.ts`** - 添加了模拟 API 中间件

### 🎯 功能特性

- ✅ 四种匹配模式：同时辰 / 同点柱 / 同期刻 / 同分命
- ✅ 模式切换自动重新加载匹配结果
- ✅ 加载状态、错误状态、空状态显示
- ✅ 响应式设计，hover 效果
- ✅ TypeScript 类型安全

### 🔧 模拟 API

当前使用 Vite 中间件模拟 API 响应：

**端点**: `POST /api/match-same-life`

**请求体**:
\`\`\`json
{
  "mode": "fen"  // hour | point | ke | fen
}
\`\`\`

**响应**:
\`\`\`json
{
  "matches": [
    {
      "user_id": "cde567fgh890",
      "similarity": 98
    }
  ]
}
\`\`\`

### 🚀 运行项目

\`\`\`bash
npm run dev
\`\`\`

访问: http://localhost:5173/

### 🔄 接入真实 API

当你准备好后端 API 时，有两种方式：

#### 方式 1: 使用 Vite 代理（推荐）

在 `vite.config.ts` 中替换 mock-api 插件为：

\`\`\`typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://your-backend-url.com',
        changeOrigin: true,
      }
    }
  }
})
\`\`\`

#### 方式 2: 直接修改 fetch URL

在 `SameLifePage.tsx` 中修改：

\`\`\`typescript
const res = await fetch("https://your-api.com/api/match-same-life", {
  // ...
})
\`\`\`

### 📊 不同模式的模拟数据

- **同时辰 (hour)**: 3 个匹配结果
- **同点柱 (point)**: 2 个匹配结果  
- **同期刻 (ke)**: 4 个匹配结果
- **同分命 (fen)**: 2 个匹配结果

### 🎨 样式说明

- 主色调: `#5b21b6` (紫色)
- 悬停色: `#6d28d9`
- 背景色: `#f7f7fb`
- 使用了现代的圆角、阴影、过渡效果

### 📝 后续开发建议

1. **添加真实的出生时间输入**
   - 可以添加日期时间选择器
   - 计算真太阳时

2. **实现"查看命盘"功能**
   - 跳转到详细命盘页面
   - 或使用 Modal 弹窗显示

3. **实现"打招呼"功能**
   - 发送消息给匹配用户
   - 需要用户认证系统

4. **添加分页或无限滚动**
   - 当匹配结果很多时

5. **添加筛选和排序**
   - 按相似度排序
   - 按地区筛选等

## 🐛 问题排查

如果遇到问题：

1. 确保 `npm install` 已完成
2. 重启开发服务器: `Ctrl+C` 然后 `npm run dev`
3. 清除浏览器缓存
4. 检查浏览器控制台的错误信息
