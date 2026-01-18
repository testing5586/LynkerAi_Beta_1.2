
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

export default function AnimationSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            同命匹配引擎
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            基于八字、紫薇、占星等多维度命理分析，为您找到最相匹配的灵魂同频者
          </p>
        </div>

        {/* Animation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Bazi Match Animation */}
          <Card className="glass-card border-accent/20 overflow-hidden group hover:border-accent/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-mystical-gradient flex items-center justify-center">
                  <SafeIcon name="Zap" className="h-5 w-5 text-white" />
                </div>
                <CardTitle>八字命盘共振</CardTitle>
              </div>
              <CardDescription>
                实时搜索全球与您八字格局相似的灵魂
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* SVG Animation Placeholder */}
              <div className="relative w-full h-64 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background */}
                  <defs>
                    <radialGradient id="baziGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(270, 60%, 55%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(240, 50%, 25%)" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>

                  {/* Central Circle */}
                  <circle cx="200" cy="150" r="80" fill="url(#baziGradient)" />
                  <circle cx="200" cy="150" r="80" fill="none" stroke="hsl(270, 60%, 55%)" strokeWidth="2" opacity="0.5" />

                  {/* Rotating Elements */}
                  <g style={{ animation: 'rotate 8s linear infinite' }}>
                    <circle cx="200" cy="70" r="8" fill="hsl(45, 80%, 60%)" />
                    <line x1="200" y1="150" x2="200" y2="70" stroke="hsl(270, 60%, 55%)" strokeWidth="1" opacity="0.5" />
                  </g>

                  {/* Matching Points */}
                  <g style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                    <circle cx="280" cy="150" r="6" fill="hsl(45, 80%, 60%)" opacity="0.8" />
                    <circle cx="280" cy="150" r="12" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="1" opacity="0.4" />
                  </g>

                  {/* Text */}
                  <text x="200" y="160" textAnchor="middle" fill="hsl(240, 5%, 96%)" fontSize="14" fontWeight="bold">
                    同频匹配
                  </text>
                  <text x="200" y="180" textAnchor="middle" fill="hsl(240, 5%, 65%)" fontSize="12">
                    相似度: 92%
                  </text>
                </svg>
              </div>

              {/* Info */}
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>✨ 支持同年月日、同时辰、同小时等多维度匹配</p>
                <p>✨ 实时更新全球用户数据库</p>
                <p>✨ 精准度达95%以上</p>
              </div>
            </CardContent>
          </Card>

          {/* Ziwei Match Animation */}
          <Card className="glass-card border-accent/20 overflow-hidden group hover:border-accent/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-mystical-gradient flex items-center justify-center">
                  <SafeIcon name="Star" className="h-5 w-5 text-white" />
                </div>
                <CardTitle>紫薇星盘同频</CardTitle>
              </div>
              <CardDescription>
                紫薇斗数主星相似度高，发现您的人生同行者
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* SVG Animation Placeholder */}
              <div className="relative w-full h-64 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background */}
                  <defs>
                    <radialGradient id="ziweiGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(45, 80%, 60%)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="hsl(270, 60%, 55%)" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>

                  {/* Outer Circle (12 Palaces) */}
                  <circle cx="200" cy="150" r="90" fill="url(#ziweiGradient)" />
                  <circle cx="200" cy="150" r="90" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="2" opacity="0.5" />

                  {/* Inner Circle */}
                  <circle cx="200" cy="150" r="50" fill="none" stroke="hsl(270, 60%, 55%)" strokeWidth="1.5" opacity="0.6" />

                  {/* Palace Markers */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const x = 200 + 90 * Math.cos(angle);
                    const y = 150 + 90 * Math.sin(angle);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4" fill="hsl(45, 80%, 60%)" opacity="0.7" />
                      </g>
                    );
                  })}

                  {/* Central Star */}
                  <circle cx="200" cy="150" r="8" fill="hsl(45, 80%, 60%)" />
                  <circle cx="200" cy="150" r="16" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="1" opacity="0.3" style={{ animation: 'pulse 2s ease-in-out infinite' }} />

                  {/* Text */}
                  <text x="200" y="160" textAnchor="middle" fill="hsl(240, 5%, 96%)" fontSize="14" fontWeight="bold">
                    紫薇同频
                  </text>
                  <text x="200" y="180" textAnchor="middle" fill="hsl(240, 5%, 65%)" fontSize="12">
                    命宫主星匹配
                  </text>
                </svg>
              </div>

              {/* Info */}
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>✨ 支持命宫主星、双星组合、格局等多维度分析</p>
                <p>✨ 三方四正同星识别</p>
                <p>✨ 自定义星曜+宫位组合搜索</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            准备好发现您的同命人了吗？
          </p>
          <a
            href="./homology-match-discovery.html"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-mystical-gradient text-white font-semibold hover:opacity-90 transition-opacity"
          >
            开始匹配
            <SafeIcon name="ArrowRight" className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { r: 12; opacity: 0.4; }
          50% { r: 16; opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
