"""
生成完整的 samelife.html 文件（包含排行榜）
"""

html_content = '''<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>同命匹配测试 · 灵客AI</title>
    <link rel="stylesheet" href="/static/css/samelife.css" />
</head>

<body>

    <div class="page">

        <h1>同命匹配 · 寻找同频灵友</h1>
        <p class="desc">基于灵客排盘引擎，按"时 / 点 / 刻 / 分" 精度匹配。</p>

        <!-- 模式选择 -->
        <div class="modes">
            <button data-mode="hour">同时辰</button>
            <button data-mode="point">同点柱</button>
            <button data-mode="ke">同期刻</button>
            <button data-mode="fen" class="active">同分命</button>
        </div>

        <!-- 同命排行榜 -->
        <div class="leaderboard-section">
            <h2 class="section-title">同命排行榜 🏆</h2>
            <div id="leaderboardList" class="leaderboard-list">
                <div class="loading">加载中...</div>
            </div>
        </div>

        <!-- 当前命盘 -->
        <div class="current-chart">
            <div>出生时间：<span id="birthTime">2000-03-20 08:18</span></div>
            <div>真太阳时：<span id="trueTime">08:10</span></div>
        </div>

        <!-- 匹配结果 -->
        <div id="matchList" class="list"></div>

    </div>

    <script src="/static/js/samelife.js"></script>

</body>

</html>'''

# 写入文件
with open('templates/samelife.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✓ samelife.html 已生成（包含排行榜）")
