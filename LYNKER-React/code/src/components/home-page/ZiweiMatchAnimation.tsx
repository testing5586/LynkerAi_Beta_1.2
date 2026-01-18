
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

export default function ZiweiMatchAnimation() {
  return (
    <Card className="glass-card overflow-hidden group hover:border-accent/50 transition-all">
      {/* Header */}
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
            <SafeIcon name="Star" className="h-6 w-6 text-background" />
          </div>
          <div>
            <CardTitle>紫微星盘同频</CardTitle>
            <CardDescription>紫微斗数主星相似度高，发现您的人生同行者</CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Animation Container */}
      <CardContent className="space-y-6">
        {/* SVG Animation */}
        <div className="relative w-full h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Animated SVG Placeholder */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <defs>
              <radialGradient id="ziweiGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0.3)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0.05)" />
              </radialGradient>
              <style>{`
                @keyframes ziweiRotate {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(-360deg); }
                }
                @keyframes ziweiOrbit {
                  0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
                  100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
                }
                .ziwei-circle { animation: ziweiRotate 25s linear infinite; }
                .ziwei-orbit { animation: ziweiOrbit 8s linear infinite; }
              `}</style>
            </defs>

            {/* Center circle */}
            <circle cx="200" cy="150" r="50" fill="url(#ziweiGradient)" />

            {/* Rotating outer ring */}
            <g className="ziwei-circle" style={{ transformOrigin: '200px 150px' }}>
              <circle cx="200" cy="150" r="90" fill="none" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="2" />
              {/* 12 positions for zodiac houses */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x = 200 + 90 * Math.cos(angle);
                const y = 150 + 90 * Math.sin(angle);
                return (
                  <circle key={i} cx={x} cy={y} r="4" fill="rgba(234, 179, 8, 0.6)" />
                );
              })}
            </g>

            {/* Orbiting stars */}
            <g className="ziwei-orbit" style={{ transformOrigin: '200px 150px' }}>
              <circle cx="300" cy="150" r="6" fill="rgba(139, 92, 246, 0.8)" />
            </g>
            <g className="ziwei-orbit" style={{ transformOrigin: '200px 150px', animationDelay: '-2.67s' }}>
              <circle cx="300" cy="150" r="6" fill="rgba(234, 179, 8, 0.8)" />
            </g>
            <g className="ziwei-orbit" style={{ transformOrigin: '200px 150px', animationDelay: '-5.33s' }}>
              <circle cx="300" cy="150" r="6" fill="rgba(139, 92, 246, 0.8)" />
            </g>

            {/* Text labels */}
            <text x="200" y="160" textAnchor="middle" fill="rgba(255, 255, 255, 0.8)" fontSize="14" fontWeight="bold">
              紫微同频
            </text>
          </svg>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            紫微斗数通过星曜组合和宫位分析，精准定位您的命运特质。AI智能匹配相同主星格局的用户，建立深度的人生共鸣。
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <SafeIcon name="Check" className="h-4 w-4 text-accent" />
              <span>14主星精准分类</span>
            </li>
            <li className="flex items-center gap-2">
              <SafeIcon name="Check" className="h-4 w-4 text-accent" />
              <span>12宫位深度解读</span>
            </li>
            <li className="flex items-center gap-2">
              <SafeIcon name="Check" className="h-4 w-4 text-accent" />
              <span>命运轨迹预测</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <Button className="w-full bg-gold-gradient hover:opacity-90 text-background font-semibold" asChild>
          <a href="./homology-match-discovery.html">
            <SafeIcon name="Sparkles" className="mr-2 h-4 w-4" />
            开始紫微匹配
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
