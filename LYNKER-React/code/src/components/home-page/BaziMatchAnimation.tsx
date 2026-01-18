
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

export default function BaziMatchAnimation() {
  return (
    <Card className="glass-card overflow-hidden group hover:border-primary/50 transition-all">
      {/* Header */}
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-mystical-gradient flex items-center justify-center">
            <SafeIcon name="SquareGanttChart" className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>八字命盘共振</CardTitle>
            <CardDescription>实时搜索全球与您八字格局相似的灵魂</CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Animation Container */}
      <CardContent className="space-y-6">
        {/* SVG Animation */}
        <div className="relative w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Animated SVG Placeholder */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <defs>
              <radialGradient id="baziGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
              </radialGradient>
              <style>{`
                @keyframes baziRotate {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes baziPulse {
                  0%, 100% { r: 80px; opacity: 0.6; }
                  50% { r: 100px; opacity: 0.3; }
                }
                .bazi-circle { animation: baziRotate 20s linear infinite; }
                .bazi-pulse { animation: baziPulse 2s ease-in-out infinite; }
              `}</style>
            </defs>

            {/* Center circle */}
            <circle cx="200" cy="150" r="60" fill="url(#baziGradient)" />

            {/* Rotating outer ring */}
            <g className="bazi-circle" style={{ transformOrigin: '200px 150px' }}>
              <circle cx="200" cy="150" r="80" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="280" cy="150" r="8" fill="rgba(139, 92, 246, 0.8)" />
              <circle cx="120" cy="150" r="8" fill="rgba(234, 179, 8, 0.8)" />
              <circle cx="200" cy="70" r="8" fill="rgba(139, 92, 246, 0.8)" />
              <circle cx="200" cy="230" r="8" fill="rgba(234, 179, 8, 0.8)" />
            </g>

            {/* Pulsing circles */}
            <circle cx="200" cy="150" r="80" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" className="bazi-pulse" />
            <circle cx="200" cy="150" r="80" fill="none" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1" className="bazi-pulse" style={{ animationDelay: '0.5s' }} />

            {/* Text labels */}
            <text x="200" y="160" textAnchor="middle" fill="rgba(255, 255, 255, 0.8)" fontSize="14" fontWeight="bold">
              八字共振
            </text>
          </svg>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            通过八字四柱的深度分析，AI算法实时计算您与全球用户的命盘相似度，发现最匹配的灵魂同频者。
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <SafeIcon name="Check" className="h-4 w-4 text-accent" />
              <span>精准的五行平衡分析</span>
            </li>
            <li className="flex items-center gap-2">
              <SafeIcon name="Check" className="h-4 w-4 text-accent" />
              <span>环境因子智能匹配</span>
            </li>
            <li className="flex items-center gap-2">
              <SafeIcon name="Check" className="h-4 w-4 text-accent" />
              <span>实时更新匹配结果</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <Button className="w-full bg-mystical-gradient hover:opacity-90" asChild>
          <a href="./homology-match-discovery.html">
            <SafeIcon name="Sparkles" className="mr-2 h-4 w-4" />
            开始八字匹配
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
