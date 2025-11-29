// 时间同频匹配系统 - Time Matching System

// 七层时间结构筛选步骤
const STEPS = [
    { key: "same_year", label: "同年" },
    { key: "same_month", label: "同月" },
    { key: "same_day", label: "同日" },
    { key: "same_shichen", label: "同时辰" },
    { key: "same_hour", label: "同小时" },
    { key: "same_quarter", label: "同刻" },
    { key: "same_minute", label: "同分" }
];

// 当前匹配模式（默认: 同分，即100%精准匹配）
let currentMode = "same_minute";

// DOM元素引用
const statusText = document.getElementById("filter-status");
const matchList = document.getElementById("matchList");

// 渲染筛选条
function renderFilterBar() {
    const container = document.getElementById("match-criteria");
    if (!container) return;

    const activeIndex = STEPS.findIndex(s => s.key === currentMode);

    container.innerHTML = STEPS.map((step, idx) => {
        const isChecked = idx <= activeIndex;
        // 强制锁定前两项（同年、同月）
        const isMandatory = idx <= 1;

        let icon = isChecked ? '✅' : '⬜';
        if (isMandatory) icon = '🔒';

        return `<span class="criteria-chip ${isChecked ? 'on' : 'off'}" 
                      onclick="handleFilterClick('${step.key}')"
                      style="${isMandatory ? 'opacity:0.9' : ''}">
          ${icon} ${step.label}
        </span>`;
    }).join('');

    updateStatusText(activeIndex);
}

// 处理筛选点击
function handleFilterClick(clickedKey) {
    const clickedIdx = STEPS.findIndex(s => s.key === clickedKey);

    // 1. 禁止点击“同年”(idx=0)，因为最低必须是“同月”
    if (clickedIdx < 1) return;

    if (clickedKey === currentMode) {
        const idx = STEPS.findIndex(s => s.key === currentMode);
        // 2. 如果当前是“同月”(idx=1)，禁止取消（即禁止退回到同年）
        if (idx > 1) {
            currentMode = STEPS[idx - 1].key;
        } else {
            // 已经是同月，不做任何操作
            return;
        }
    } else {
        currentMode = clickedKey;
    }

    renderFilterBar();
    loadMatches();
}

// 更新状态文字
function updateStatusText(activeIndex) {
    if (!statusText) return;

    const count = activeIndex + 1;
    const total = STEPS.length;

    if (count === total) {
        statusText.textContent = "当前默认搜索模式：100% 精准匹配";
        statusText.style.color = "#6a38ff";
    } else {
        statusText.textContent = `自定义筛选模式：${count} 项条件`;
        statusText.style.color = "#d97706";
    }
}

// 加载匹配结果
async function loadMatches() {
    matchList.innerHTML = "<div class='loading'>匹配中...</div>";

    try {
        const res = await fetch(`${API_BASE}/api/match/time?chart_id=1&mode=` + currentMode, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        renderResults(data);

    } catch (err) {
        console.error("匹配失败:", err);
        matchList.innerHTML = `<div class='error'>匹配失败: ${err.message}</div>`;
    }
}

function renderResults(data) {
    matchList.innerHTML = '';

    if (!data.results || data.results.length === 0) {
        matchList.innerHTML = `
            <div style="text-align:center;color:#999;padding:20px;">
              未发现满足条件的灵友<br/>
              <small>${data.criteria_text || ''}</small>
            </div>
        `;
        return;
    }

    data.results.forEach(item => {
        // ✅ 隐私保护：不再读取或显示 time_layer_code
        // const rawCode = item.time_layer_code || ''; // 已删除
        // const displayCode = rawCode.length >= 12 ? rawCode.slice(0, 12) : rawCode; // 已删除

        const matchText = data.criteria_text || '符合筛选条件';

        // 根据匹配分数生成隐私友好的共振状态描述
        let resonanceStatus = '';
        let resonanceIcon = '';
        if (item.match_score >= 100) {
            resonanceStatus = '完美同频';
            resonanceIcon = '🌟';
        } else if (item.match_score >= 80) {
            resonanceStatus = '高度同步';
            resonanceIcon = '🌀';
        } else if (item.match_score >= 50) {
            resonanceStatus = '中度共振';
            resonanceIcon = '🧬';
        } else {
            resonanceStatus = '低频匹配';
            resonanceIcon = '✨';
        }

        const div = document.createElement('div');
        div.className = 'match-card';
        div.innerHTML = `
          <div class="card-header">
            <div class="name">灵友 #${item.chart_id}</div>
            <div class="match-badge" style="background:${item.match_score >= 100 ? '#ec4899' : '#8b5cf6'}">
                ${item.match_score >= 100 ? '100% 同频' : Math.round(item.match_score) + '% 同频'}
            </div>
          </div>
          
          <div class="privacy-status" style="display:flex;gap:8px;align-items:center;margin-top:8px;padding:8px;background:rgba(139,92,246,0.1);border-radius:8px;">
            <span style="font-size:18px;">${resonanceIcon}</span>
            <span style="font-size:13px;font-weight:600;color:#6d28d9;">频率共振：${resonanceStatus}</span>
            <span style="margin-left:auto;font-size:11px;color:#94a3b8;">🔒 已加密</span>
          </div>
          
          <div class="matched-tags" style="margin-top:8px;">
             <span style="display:inline-block;padding:4px 8px;background:#f3e8ff;color:#6b21a8;border-radius:4px;font-size:12px;font-weight:500;">
               ✨ ${matchText}
             </span>
          </div>

          <div class="card-actions">
            <button class="btn-primary" onclick="alert('功能开发中')">查看详情</button>
            <button class="btn-secondary" onclick="alert('功能开发中')">打招呼</button>
          </div>
        `;
        matchList.appendChild(div);
    });
}

// ========== 家庭结构数据加载 ==========
async function loadFamilyData() {
    try {
        const chartData = {
            parents_palace: {
                main_stars: ["太阳", "天府", "太阴"],
                transformations: {
                    "化禄": true,
                    "化权": false,
                    "化科": true,
                    "化忌": false
                }
            }
        };

        const res = await fetch(`${API_BASE}/api/calc/family-columns`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chart_data: chartData })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
            updateFamilyUI(data.family_data, data.interpretation);
        }
    } catch (err) {
        console.error("家庭结构数据加载失败:", err);
    }
}

function updateFamilyUI(familyData, interpretation) {
    const structureType = document.getElementById("structureType");
    if (structureType) structureType.textContent = familyData.structure_type;
}

// Load current user birth time data from session
async function loadCurrentUser() {
    try {
        const res = await fetch(`${API_BASE}/api/get-current-user`);
        const data = await res.json();

        if (data.success) {
            // Update user profile card elements
            const userNameEl = document.getElementById('userName');
            const userUidEl = document.getElementById('userUid');
            const birthTimeEl = document.getElementById('birthTime');
            const trueTimeEl = document.getElementById('trueTime');

            if (userNameEl) userNameEl.textContent = data.name || '灵友';
            if (userUidEl) userUidEl.textContent = `UID: ${data.uid || '---'}`;
            if (birthTimeEl) birthTimeEl.textContent = `${data.solar_date} ${data.solar_time}`;
            if (trueTimeEl) trueTimeEl.textContent = data.true_solar_time;

            console.log('用户数据加载成功:', data);
        } else {
            console.log('未找到用户出生时间数据');
        }
    } catch (err) {
        console.error('加载用户数据失败:', err);
    }
}


// 加载排行榜
async function loadLeaderboard() {
    const list = document.getElementById("leaderboardList");
    const versionTag = document.getElementById("weight-version");

    try {
        // ✅ 排除当前用户（chart_id=1）显示在排行榜中
        const currentUserId = 1; // 当前用户 chart_id
        const res = await fetch(`${API_BASE}/api/leaderboard/top?limit=5&exclude_user=${currentUserId}`);
        if (!res.ok) throw new Error("Failed to load leaderboard");

        const data = await res.json();

        if (versionTag && data.weight_version_id) {
            versionTag.textContent = `权重版本: v${data.weight_version_id}`;
        }

        if (!data.leaderboard || data.leaderboard.length === 0) {
            list.innerHTML = "<div class='empty'>暂无排行数据</div>";
            return;
        }

        list.innerHTML = data.leaderboard.map((item, idx) => {
            let icon = "No." + (idx + 1);
            if (idx === 0) icon = "🥇";
            if (idx === 1) icon = "🥈";
            if (idx === 2) icon = "🥉";

            const userId = String(item.user_id);
            // ✅ 使用 display_score（原始分数）而不是 final_score（排序用的衰减分数）
            const displayScore = Math.round(item.display_score || item.final_score * 100);

            return `
                <div class="rank-item">
                    <div class="rank-icon">${icon}</div>
                    <div class="rank-info">
                        <div class="rank-user">灵友 #${userId}</div>
                        <div class="rank-stats">匹配 ${item.match_count} 次 · 验证 ${item.verified_count} 次</div>
                    </div>
                    <div class="rank-score">${displayScore} <span style="font-size:12px">%</span></div>
                </div>
            `;
        }).join("");

    } catch (err) {
        console.error("加载排行榜失败:", err);
        list.innerHTML = "<div class='error'>加载失败</div>";
    }
}

// Initialize page
(function init() {
    renderFilterBar();
    loadCurrentUser();  // Load user birth time data from session
    loadMatches();
    loadLeaderboard();
})();
