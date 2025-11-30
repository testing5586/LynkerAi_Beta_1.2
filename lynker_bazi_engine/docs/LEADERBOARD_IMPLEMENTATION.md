# 同命排行榜引擎实现总结

## ✅ 已完成的工作

### 1. 数据库层
- ✅ 创建了 `supabase_leaderboards.sql`
  - `chart_leaderboards` 表
  - 字段：avg_similarity, match_count, verified_count, final_score, rank_position
  - 索引优化

### 2. 排行榜引擎
- ✅ 创建了 `engines/leaderboard_engine.py`
  - `calculate_final_score()` - 综合评分计算
  - `calculate_leaderboard()` - 排行榜计算
  - `get_top_leaderboard()` - 获取前N名
  - `get_user_rank()` - 获取用户排名

### 3. 排名权重公式
```python
Final Score = (avg_similarity * 0.5) + (match_count * 0.3) + (verified_count * 0.2)
```

权重说明：
- 平均匹配度：50% - 核心指标
- 匹配总数：30% - 活跃度
- 验证匹配数：20% - 质量指标

### 4. API 端点
- ✅ `GET /api/leaderboard/top?limit=10` - 获取排行榜
- ✅ `GET /api/leaderboard/user/<user_id>` - 获取用户排名
- ✅ `POST /api/leaderboard/calculate` - 触发排行榜计算

### 5. 前端集成
需要在 `samelife.html` 添加排行榜区块（见下方代码）

## 📊 API 使用示例

### 获取排行榜前10名
```bash
curl http://localhost:5000/api/leaderboard/top?limit=10
```

响应：
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "user_id": 1001,
      "similarity": 0.92,
      "match_count": 18,
      "verified_count": 6,
      "final_score": 0.876
    }
  ],
  "count": 10
}
```

### 触发排行榜计算
```bash
curl -X POST http://localhost:5000/api/leaderboard/calculate
```

## 🎯 下一步

1. 在 Supabase 执行 `supabase_leaderboards.sql`
2. 调用 `/api/leaderboard/calculate` 初始化排行榜
3. 在前端添加排行榜显示区块
4. 测试排行榜功能

## 📝 前端代码片段

### HTML (添加到 samelife.html)
```html
<!-- 同命排行榜 -->
<div class="leaderboard-section">
    <h2 class="section-title">同命排行榜 🏆</h2>
    <div id="leaderboardList" class="leaderboard-list">
        <!-- 动态加载 -->
    </div>
</div>
```

### CSS (添加到 samelife.css)
```css
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
}

.rank-badge {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    margin-right: 16px;
}

.rank-1 { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; }
.rank-2 { background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%); color: white; }
.rank-3 { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); color: white; }
.rank-other { background: #e5e7eb; color: #6b7280; }

.leaderboard-info {
    flex: 1;
}

.user-name {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 4px;
}

.user-stats {
    font-size: 12px;
    color: #6b7280;
}

.similarity-score {
    font-size: 24px;
    font-weight: 700;
    color: #7c3aed;
}
```

### JavaScript (添加到 samelife.js)
```javascript
async function loadLeaderboard() {
    try {
        const res = await fetch("/api/leaderboard/top?limit=10");
        const data = await res.json();
        
        if (data.success) {
            displayLeaderboard(data.leaderboard);
        }
    } catch (err) {
        console.error("加载排行榜失败:", err);
    }
}

function displayLeaderboard(leaderboard) {
    const listEl = document.getElementById("leaderboardList");
    if (!listEl) return;
    
    listEl.innerHTML = "";
    
    leaderboard.forEach(item => {
        const div = document.createElement("div");
        div.className = "leaderboard-item";
        
        const rankClass = item.rank <= 3 ? `rank-${item.rank}` : "rank-other";
        const emoji = item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : "";
        
        div.innerHTML = `
            <div class="rank-badge ${rankClass}">
                ${emoji || `No.${item.rank}`}
            </div>
            <div class="leaderboard-info">
                <div class="user-name">灵友 #${item.user_id}</div>
                <div class="user-stats">
                    匹配 ${item.match_count} 次 · 验证 ${item.verified_count} 次
                </div>
            </div>
            <div class="similarity-score">
                ${Math.round(item.similarity * 100)}%
            </div>
        `;
        
        listEl.appendChild(div);
    });
}

// 页面加载时调用
loadLeaderboard();
```

## 🔄 定时更新

可以添加定时刷新：
```javascript
// 每5分钟刷新一次排行榜
setInterval(loadLeaderboard, 5 * 60 * 1000);
```
