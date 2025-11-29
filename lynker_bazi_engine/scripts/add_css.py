"""
添加排行榜CSS样式到 samelife.css
"""

css_code = '''
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
'''

# 追加到CSS文件
with open('static/css/samelife.css', 'a', encoding='utf-8') as f:
    f.write(css_code)

print("✓ 排行榜CSS样式已添加到 samelife.css")
