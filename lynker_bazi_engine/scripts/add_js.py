"""
添加排行榜JavaScript代码到 samelife.js
"""

js_code = '''

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
'''

# 追加到JS文件
with open('static/js/samelife.js', 'a', encoding='utf-8') as f:
    f.write(js_code)

print("✓ 排行榜JavaScript代码已添加到 samelife.js")
