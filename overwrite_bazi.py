
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'
new_content = r"""<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>八字同频搜索 · 灵客AI</title>

    <!-- Global Dark Theme -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/common.css') }}?v=20" />

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">

    <script>
        const API_BASE = "{{ url_for('bazi.bazi_match') }}".replace(/\/match$/, '');
    </script>
</head>

<body>

<div class="layout-container">

    <!-- Sidebar -->
    <aside class="sidebar">

        <!-- 用户信息卡 -->
        <div class="user-profile-card">
            <div class="profile-user-info">
                <div class="user-avatar-large">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                         alt="User Avatar" id="userAvatar">
                </div>
                <div class="user-name" id="userName">{{ birth_data.name if birth_data else '灵友' }}</div>
                <div class="user-uid" id="userUid">UID: {{ birth_data.uid if birth_data else '---' }}</div>
            </div>

            <div class="profile-header">CURRENT CHART</div>

            <div class="profile-item">
                <div class="profile-label">出生时间</div>
                <div class="profile-value" id="birthTime">{{ birth_data.local_datetime if birth_data else '---' }}</div>
            </div>

            <div class="profile-item">
                <div class="profile-label">八字排盘</div>
                <div class="profile-value" id="baziCode">
                    {% if bazi and bazi.four_pillars %}
                        {{ bazi.four_pillars.year.stem }}{{ bazi.four_pillars.year.branch }} · 
                        {{ bazi.four_pillars.month.stem }}{{ bazi.four_pillars.month.branch }} · 
                        {{ bazi.four_pillars.day.stem }}{{ bazi.four_pillars.day.branch }} · 
                        {{ bazi.four_pillars.hour.stem }}{{ bazi.four_pillars.hour.branch }}
                    {% else %}
                        ---
                    {% endif %}
                </div>
            </div>

            <a href="{{ url_for('birth_input.birth_input_form') }}" class="btn-primary">重新输入出生时间</a>
        </div>

        <!-- 排行榜 -->
        <div class="leaderboard-card">
            <div class="section-title">
                同频排行榜
                <span id="algoBadge" class="algo-badge bazi">BaziMatchAgent</span>
            </div>

            <div class="leaderboard-tabs">
                <div class="tab-item" onclick="window.location.href='{{ url_for('modernmatch.modernmatch_index') }}'" id="tab-time">🔮 现代时间榜</div>
                <div class="tab-item active" onclick="window.location.href='{{ url_for('bazi.bazi_match') }}'" id="tab-bazi">🧘‍♂️ 八字同频榜</div>
            </div>

            <div id="leaderboardDesc" class="leaderboard-desc">
                本榜基于传统八字四柱匹配，不采用现代秒级结构。
            </div>

            <div id="weight-version" class="weight-tag" style="display:none"></div>

            <div id="leaderboardList" class="leaderboard-list">
                {% for item in leaderboard %}
                <div class="rank-item">
                    <div class="rank-icon">No.{{ loop.index }}</div>
                    <div class="rank-info">
                        <div class="rank-user">灵友 #{{ item.friend_id }}</div>
                        <div class="rank-stats">匹配 {{ item.match_count }} 次</div>
                    </div>
                    <div class="rank-score">{{ item.final_score }}</div>
                </div>
                {% else %}
                <div class="loading">暂无排行数据</div>
                {% endfor %}
            </div>
        </div>

    </aside>

    <!-- Main Content -->
    <main class="main-content">

        <div class="page-header">
            <h1>同命匹配 · 八字同频搜索</h1>
            <p class="desc">基于天干地支结构的灵魂级匹配引擎</p>
        </div>

        <!-- 评分说明 -->
        <div class="filter-panel">
            <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:14px 18px;margin-bottom:18px;border-radius:8px;font-size:13px;color:#92400e;">
                <strong>📌 评分说明</strong><br>
                此评分遵循八字四柱匹配体系（年20 → 年月40 → 年月日70 → 年月日时100 分）。四柱完全一致视为100%。<br>
                若想查看更精密的毫秒时间同频，请使用
                <a href="{{ url_for('modernmatch.modernmatch_index') }}" style="color:#b45309;text-decoration:underline;">「时间同频搜索」</a>。
            </div>

            <div id="filter-status" class="filter-status">
                当前模式：{{ active_mode_label|default('标准模式') }}
            </div>

            <div class="filter-section">
                <div style="font-size:12px;color:#64748b;margin-bottom:12px;">筛选条件（可自定义）</div>
                <div id="bazi-criteria" class="match-criteria-bar">
                    <span class="criteria-chip {{ 'on' if filters.same_year_pillar else 'off' }}">同年柱</span>
                    <span class="criteria-chip {{ 'on' if filters.same_month_pillar else 'off' }}">同月柱</span>
                    <span class="criteria-chip {{ 'on' if filters.same_day_pillar else 'off' }}">同日柱</span>
                    <span class="criteria-chip {{ 'on' if filters.same_hour_pillar else 'off' }}">同时柱</span>
                </div>
            </div>
        </div>

        <!-- 匹配结果 -->
        <div id="matchList" class="list">
            {% for match in matches %}
            <article class="match-card">
                <div class="card-header">
                    <div class="name">灵友 #{{ match.friend_id }}</div>
                    <div class="match-badge">{{ match.score }} 分</div>
                </div>
                <p class="match-summary">八字：{{ match.bazi_code }}</p>
                <div class="match-tags">
                    {% if match.same_year_pillar %}<span class="match-tag">同年柱</span>{% endif %}
                    {% if match.same_month_pillar %}<span class="match-tag">同月柱</span>{% endif %}
                    {% if match.same_day_pillar %}<span class="match-tag">同日柱</span>{% endif %}
                    {% if match.same_hour_pillar %}<span class="match-tag">同时柱</span>{% endif %}
                </div>
                <div class="card-actions">
                    <a href="{{ url_for('bazi.bazi_detail', friend_id=match.friend_id) }}" class="btn-secondary">查看档案</a>
                    <button class="btn-primary">打招呼</button>
                </div>
            </article>
            {% else %}
            <div class="empty-state">暂无匹配结果</div>
            {% endfor %}
        </div>

    </main>

</div>

<!-- <script src="{{ url_for('static', filename='js/bazimatch.js') }}?v=20"></script> -->

</body>

</html>"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
