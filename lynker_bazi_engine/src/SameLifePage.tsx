import React, { useState, useEffect } from 'react'
import './SameLifePage.css'

type Mode = 'hour' | 'point' | 'ke' | 'fen'

interface MatchResult {
    user_id: string
    similarity: number
}

interface MatchResponse {
    matches: MatchResult[]
}

const SameLifePage: React.FC = () => {
    const [mode, setMode] = useState<Mode>('fen')
    const [matches, setMatches] = useState<MatchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 假数据 - 后面接你的 API
    const birthTime = "2000-03-20 08:18"
    const trueTime = "08:10"

    const loadMatches = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/match-same-life", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode })
            })

            const data: MatchResponse = await res.json()

            if (!data.matches || data.matches.length === 0) {
                setMatches([])
            } else {
                setMatches(data.matches)
            }
        } catch (err) {
            setError("匹配失败")
            setMatches([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMatches()
    }, [mode])

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode)
    }

    return (
        <div className="page">
            <h1>同命匹配 · 寻找同频灵友</h1>
            <p className="desc">基于灵客排盘引擎，按"时 / 点 / 刻 / 分" 精度匹配。</p>

            {/* 模式选择 */}
            <div className="modes">
                <button
                    data-mode="hour"
                    className={mode === 'hour' ? 'active' : ''}
                    onClick={() => handleModeChange('hour')}
                >
                    同时辰
                </button>
                <button
                    data-mode="point"
                    className={mode === 'point' ? 'active' : ''}
                    onClick={() => handleModeChange('point')}
                >
                    同点柱
                </button>
                <button
                    data-mode="ke"
                    className={mode === 'ke' ? 'active' : ''}
                    onClick={() => handleModeChange('ke')}
                >
                    同期刻
                </button>
                <button
                    data-mode="fen"
                    className={mode === 'fen' ? 'active' : ''}
                    onClick={() => handleModeChange('fen')}
                >
                    同分命
                </button>
            </div>

            {/* 当前命盘 */}
            <div className="current-chart">
                <div>出生时间：<span id="birthTime">{birthTime}</span></div>
                <div>真太阳时：<span id="trueTime">{trueTime}</span></div>
            </div>

            {/* 匹配结果 */}
            <div id="matchList" className="list">
                {loading && <div className="loading">匹配中...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && matches.length === 0 && (
                    <div className="empty">暂无匹配结果</div>
                )}
                {!loading && !error && matches.length > 0 && matches.map((item, index) => (
                    <div key={index} className="card">
                        <div className="user">灵友 #{item.user_id.slice(0, 6)}</div>
                        <div className="sim">相似度：{item.similarity}%</div>
                        <div className="actions">
                            <button>查看命盘</button>
                            <button>打招呼</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SameLifePage
