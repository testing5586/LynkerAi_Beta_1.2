import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Mock API plugin
        {
            name: 'mock-api',
            configureServer(server) {
                server.middlewares.use('/api/match-same-life', (req, res) => {
                    if (req.method === 'POST') {
                        let body = ''
                        req.on('data', chunk => {
                            body += chunk.toString()
                        })
                        req.on('end', () => {
                            const data = JSON.parse(body)
                            const mode = data.mode || 'fen'

                            // 模拟数据 - 根据不同模式返回不同数量的匹配
                            const mockData = {
                                hour: [
                                    { user_id: 'abc123def456', similarity: 78 },
                                    { user_id: 'ghi789jkl012', similarity: 72 },
                                    { user_id: 'mno345pqr678', similarity: 68 },
                                ],
                                point: [
                                    { user_id: 'stu901vwx234', similarity: 85 },
                                    { user_id: 'yza567bcd890', similarity: 82 },
                                ],
                                ke: [
                                    { user_id: 'efg123hij456', similarity: 92 },
                                    { user_id: 'klm789nop012', similarity: 89 },
                                    { user_id: 'qrs345tuv678', similarity: 87 },
                                    { user_id: 'wxy901zab234', similarity: 84 },
                                ],
                                fen: [
                                    { user_id: 'cde567fgh890', similarity: 98 },
                                    { user_id: 'ijk123lmn456', similarity: 96 },
                                ]
                            }

                            res.setHeader('Content-Type', 'application/json')
                            res.end(JSON.stringify({
                                matches: mockData[mode as keyof typeof mockData] || []
                            }))
                        })
                    } else {
                        res.statusCode = 405
                        res.end('Method Not Allowed')
                    }
                })
            }
        }
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
