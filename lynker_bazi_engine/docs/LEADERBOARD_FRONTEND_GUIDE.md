# 排行榜前端集成完成指南

## ✅ 后端已完成

1. ✅ 数据库表 SQL
2. ✅ 排行榜引擎
3. ✅ API 端点（已测试通过）

## 📝 前端集成步骤

由于 HTML 文件编辑遇到问题，这里提供完整的前端代码供你手动添加：

### 1. 在 samelife.html 中添加（在模式选择按钮后）

```html
<!-- 同命排行榜 -->
<div class="leaderboard-section">
    <h2 class="section-title">同命排行榜 🏆</h2>
    <div id="leaderboardList" class="leaderboard-list">
        <div class="loading">加载中...</div>
    </div>
</div>
```

### 2. 在 samelife.css 末尾添加

```css
/* ========== 排行榜样式 ========== */
.leaderboard-section {
    margin: 24px 0;
    padding: 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.leaderboard-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
}

.leaderboard-item:hover {
    border-color: #7c3aed;
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
    transform: translateY(-2px);
}

.rank-badge {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 18px;
    margin-right: 16px;
    flex-shrink: 0;
}

.rank-1 {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

.rank-2 {
    background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(209, 213, 219, 0.4);
}

.rank-3 {
    background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(251, 146, 60, 0.4);
}

.rank-other {
    background: #e5e7eb;
    color: #6b7280;
    font-size: 14px;
}

.leaderboard-info {
    flex: 1;
    min-width: 0;
}

.user-name {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 4px;
    font-size: 15px;
}

.user-stats {
    font-size: 12px;
    color: #6b7280;
}

.similarity-score {
    font-size: 28px;
    font-weight: 700;
    color: #7c3aed;
    margin-left: 16px;
    flex-shrink: 0;
}

.similarity-score::after {
    content: '%';
    font-size: 16px;
    margin-left: 2px;
}
```

### 3. 在 samelife.js 末尾添加

```javascript
// ========== 排行榜功能 ==========
async function loadLeaderboard() {
    const listEl = document.getElementById("leaderboardList");
    if (!listEl) return;
    
    try {
        const res = await fetch("/api/leaderboard/top?limit=10");
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success && data.leaderboard && data.leaderboard.length > 0) {
            displayLeaderboard(data.leaderboard);
        } else {
            listEl.innerHTML = "<div class='empty'>暂无排行榜数据</div>";
        }
    } catch (err) {
        console.error("加载排行榜失败:", err);
        listEl.innerHTML = `<div class='error'>加载失败: ${err.message}</div>`;
    }
}

function displayLeaderboard(leaderboard) {
    const listEl = document.getElementById("leaderboardList");
    if (!listEl) return;
    
    listEl.innerHTML = "";
    
    leaderboard.forEach(item => {
        const div = document.createElement("div");
        div.className = "leaderboard-item";
        
        const rank = item.rank;
        let rankClass = "rank-other";
        let rankDisplay = `No.${rank}`;
        
        if (rank === 1) {
            rankClass = "rank-1";
            rankDisplay = "🥇";
        } else if (rank === 2) {
            rankClass = "rank-2";
            rankDisplay = "🥈";
        } else if (rank === 3) {
            rankClass = "rank-3";
            rankDisplay = "🥉";
        }
        
        const similarity = Math.round(item.similarity * 100);
        
        div.innerHTML = `
            <div class="rank-badge ${rankClass}">
                ${rankDisplay}
            </div>
            <div class="leaderboard-info">
                <div class="user-name">灵友 #${item.user_id}</div>
                <div class="user-stats">
                    匹配 ${item.match_count} 次 · 验证 ${item.verified_count} 次
                </div>
            </div>
            <div class="similarity-score">
                ${similarity}
            </div>
        `;
        
        listEl.appendChild(div);
    });
}

// 页面加载时调用
loadLeaderboard();

// 每10秒自动刷新一次
setInterval(loadLeaderboard, 10000);
```

## 🧪 测试步骤

### 1. 执行 SQL（在 Supabase）
```sql
-- 执行 supabase_leaderboards.sql 的内容
```

### 2. 初始化排行榜数据
```bash
curl -X POST http://localhost:5000/api/leaderboard/calculate
```

### 3. 刷新浏览器
访问 http://localhost:5000，应该能看到排行榜显示

## 📊 预期效果

- 🥇 第1名：金色徽章
- 🥈 第2名：银色徽章
- 🥉 第3名：铜色徽章
- No.4-10：灰色徽章

每个条目显示：
- 排名徽章
- 用户ID
- 匹配次数和验证次数
- 相似度百分比（大号显示）

## ⚠️ 当前状态

- ✅ 后端 API 正常工作
- ✅ 排行榜计算成功
- ⚠️ 需要在 Supabase 执行 SQL 创建表
- ⚠️ 需要手动添加前端代码到 HTML/CSS/JS

## 🔧 故障排查

如果排行榜不显示：
1. 检查浏览器控制台是否有错误
2. 确认 SQL 表已创建
3. 调用 `/api/leaderboard/calculate` 初始化数据
4. 检查 `/api/leaderboard/top` 返回数据
