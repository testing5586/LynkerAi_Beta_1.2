// 八字同频匹配 - JavaScript 实现
const matchList = document.getElementById("matchList");
const statusText = document.getElementById("filter-status");

// 定义八字匹配层级（从松到严）
const BAZI_STEPS = [
    { key: 'same_year_pillar', label: '同年柱' },
    { key: 'same_month_pillar', label: '同月柱' },
    { key: 'same_day_pillar', label: '同日柱' },
    { key: 'same_hour_pillar', label: '同时柱' },
    { key: 'same_tiangan', label: '同天干结构' },
    { key: 'same_dizhi', label: '同地支结构' },
    { key: 'same_pattern', label: '同格局' },
    { key: 'same_yongshen', label: '同用神' }
];

// 默认最严模式
let currentMode = "same_yongshen";

// 初始化
function init() {
    renderFilterBar();
    loadCurrentUser();  // Load user birth time data from session
    loadMatches();
    loadLeaderboard();
}

// 渲染筛选条
function renderFilterBar() {
    const container = document.getElementById("bazi-criteria");
    if (!container) return;

    const activeIndex = BAZI_STEPS.findIndex(s => s.key === currentMode);

    container.innerHTML = BAZI_STEPS.map((step, idx) => {
        const isChecked = idx <= activeIndex;
        return `<span class="criteria-chip ${isChecked ? 'on' : 'off'}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} id="chk_${step.key}" onchange="handleFilterClick('${step.key}')">
          <label for="chk_${step.key}">${step.label}</label>
        </span>`;
    }).join('');

    updateStatusText(activeIndex);
}

// 处理筛选点击
function handleFilterClick(clickedKey) {
    if (clickedKey === currentMode) {
        const idx = BAZI_STEPS.findIndex(s => s.key === currentMode);
        if (idx > 0) {
            currentMode = BAZI_STEPS[idx - 1].key;
        } else {
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
    const total = BAZI_STEPS.length;

    if (count === total) {
        statusText.textContent = "超级同频模式：8 项全匹配";
        statusText.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        statusText.style.color = "#fff";
    } else {
        statusText.textContent = `宽松匹配模式：${count} 项条件生效`;
        statusText.style.background = "#fff3cd";
        statusText.style.color = "#856404";
    }
}

// 加载匹配结果
async function loadMatches() {
    matchList.innerHTML = "<div class='loading'>匹配中...</div>";

    try {
        const res = await fetch(`${API_BASE}/api/match/bazi?chart_id=1&mode=${currentMode}`, {
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
              未发现满足条件的八字同频者<br/>
              <small>${data.criteria_text || ''}</small>
            </div>
        `;
        return;
    }

    data.results.forEach(item => {
        const baziCode = item.bazi_code || '庚辰-戊寅-丁未-壬子';

        // 动态生成匹配标签
        let tagsHtml = '';
        if (item.matched_flags) {
            const flags = item.matched_flags;
            const labels = [
                { k: 'same_year_pillar', t: '同年柱' },
                { k: 'same_month_pillar', t: '同月柱' },
                { k: 'same_day_pillar', t: '同日柱' },
                { k: 'same_hour_pillar', t: '同时柱' },
                { k: 'same_tiangan', t: '同天干' },
                { k: 'same_dizhi', t: '同地支' },
                { k: 'same_pattern', t: '同格局' },
                { k: 'same_yongshen', t: '同用神' }
            ];

            tagsHtml = labels.map(l => {
                const isMatch = flags[l.k];
                const style = isMatch ?
                    'color:#6b21a8;background:#f3e8ff;border:1px solid #d8b4fe' :
                    'color:#9ca3af;background:#f3f4f6;border:1px solid #e5e7eb';
                return `<span style="display:inline-block;padding:2px 6px;border-radius:4px;font-size:12px;margin-right:4px;margin-bottom:4px;${style}">${l.t}</span>`;
            }).join('');
        } else {
            tagsHtml = item.criteria_text || '';
        }

        // 自动推导提示
        let autoDerivedHtml = '';
        if (item.auto_derived) {
            autoDerivedHtml = `<div style="font-size:11px;color:#ec4899;margin-top:4px;">✨ 结构项由系统自动推导，无需额外条件</div>`;
        }

        const div = document.createElement('div');
        div.className = 'bazi-match-card';
        div.innerHTML = `
      <div class="card-header">
        <div class="name">灵友 #${item.chart_id}</div>
        <div class="match-badge" style="background:${item.score >= 100 ? '#ec4899' : '#8b5cf6'}">${item.score_label || item.score + '分匹配'}</div>
      </div>
      <div class="bazi-code">八字频率码：${baziCode}</div>
      <div class="matched-tags" style="margin-top:8px;display:flex;flex-wrap:wrap;">
        ${tagsHtml}
      </div>
      ${autoDerivedHtml}
      <div class="card-actions">
        <button class="btn-primary" onclick="viewChart(${item.chart_id})">查看命盘</button>
        <button class="btn-secondary" onclick="sayHello(${item.chart_id})">打招呼</button>
      </div>
    `;
        matchList.appendChild(div);
    });
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
            const baziCodeEl = document.getElementById('baziCode');

            if (userNameEl) userNameEl.textContent = data.name || '样板人A';
            if (userUidEl) userUidEl.textContent = `UID: ${data.uid || '自定义'}`;
            if (birthTimeEl) birthTimeEl.textContent = `${data.solar_date} ${data.solar_time}`;

            // Note: bazi_code would need to be calculated from birth data
            // For now, we'll leave it as is since there's no bazi calculation in the current API
            // If baziCodeEl exists and data has bazi_code, update it
            // if (baziCodeEl && data.bazi_code) baziCodeEl.textContent = data.bazi_code;

            console.log('用户数据加载成功:', data);
        } else {
            console.log('未找到用户出生时间数据');
        }
    } catch (err) {
        console.error('加载用户数据失败:', err);
    }
}

// 排行榜模式 - BaziMatch 页面默认显示 Bazi 榜
let currentLeaderboardMode = 'bazi';

// 切换排行榜
window.switchLeaderboard = function (mode) {
    if (currentLeaderboardMode === mode) return;
    currentLeaderboardMode = mode;

    // 更新 UI 状态
    document.getElementById('tab-time').className = `tab-item ${mode === 'time' ? 'active' : ''}`;
    document.getElementById('tab-bazi').className = `tab-item ${mode === 'bazi' ? 'active' : ''}`;

    // 更新说明文案
    const descEl = document.getElementById('leaderboardDesc');
    const badgeEl = document.getElementById('algoBadge');

    if (mode === 'time') {
        descEl.textContent = "本榜基于「真太阳时 + 秒级时间结构」匹配，与八字系统无关。";
        badgeEl.textContent = "TimeMatchAgent";
        badgeEl.className = "algo-badge time";
    } else {
        descEl.textContent = "本榜基于传统八字四柱系统匹配，不采用现代秒级时间算法。";
        badgeEl.textContent = "BaziMatchAgent";
        badgeEl.className = "algo-badge bazi";
    }

    // 重新加载数据
    loadLeaderboard();
}

// 加载排行榜
async function loadLeaderboard() {
    const list = document.getElementById("leaderboardList");
    const versionTag = document.getElementById("weight-version");

    list.innerHTML = "<div class='loading'>加载中...</div>";

    try {
        let data;

        // 使用真实 API 获取数据 (支持 engine 参数)
        const res = await fetch(`${API_BASE}/api/leaderboard/top?limit=5&engine=${currentLeaderboardMode}`);
        if (!res.ok) throw new Error("Failed to load leaderboard");
        data = await res.json();

        if (versionTag && data.weight_version_id) {
            versionTag.textContent = `权重版本: v${data.weight_version_id}`;
        }

        if (!data.leaderboard || data.leaderboard.length === 0) {
            list.innerHTML = "<div class='empty'>暂无排行数据</div>";
            return;
        }

        list.innerHTML = data.leaderboard.map((item, idx) => {
            let icon = "No." + (idx + 1);
            // 前三名图标
            if (idx === 0) icon = "🥇";
            if (idx === 1) icon = "🥈";
            if (idx === 2) icon = "🥉";

            const userId = String(item.user_id);
            const displayScore = Math.round((item.final_score || 0) * 100);

            // 动态颜色：根据分数高低
            let scoreColor = "#8b5cf6";
            if (displayScore >= 90) scoreColor = "#ec4899";
            else if (displayScore < 60) scoreColor = "#64748b";

            return `
                <div class="rank-item">
                    <div class="rank-icon">${icon}</div>
                    <div class="rank-info">
                        <div class="rank-user">灵友 #${userId}</div>
                        <div class="rank-stats">匹配 ${item.match_count} 次 · 验证 ${item.verified_count} 次</div>
                    </div>
                    <div class="rank-score" style="background:linear-gradient(to right, #8b5cf6, ${scoreColor});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                        ${displayScore}<span style="font-size:10px;margin-left:2px">%</span>
                    </div>
                </div>
            `;
        }).join("");

    } catch (err) {
        console.error("加载排行榜失败:", err);
        list.innerHTML = "<div class='error'>加载失败</div>";
    }
}

function viewChart(chartId) {
    console.log("查看命盘:", chartId);
    alert(`查看命盘 #${chartId}（待实现）`);
}

function sayHello(chartId) {
    console.log("打招呼:", chartId);
    alert(`向灵友 #${chartId} 打招呼（待实现）`);
}

// 启动
init();
