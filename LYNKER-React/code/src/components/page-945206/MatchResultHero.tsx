
import { useEffect, useState } from 'react';
import SafeIcon from '@/components/common/SafeIcon';

interface MatchResultHeroProps {
  theme: string;
  compatibility: number;
  description: string;
}

export default function MatchResultHero({
  theme,
  compatibility,
  description,
}: MatchResultHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden pt-20 pb-32">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container px-4">
        {/* Top Badge */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40">
            <SafeIcon name="Sparkles" className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">您的命盘分析报告</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={`text-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Compatibility Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40">
              {/* Outer Ring Animation */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin" style={{ animationDuration: '3s' }} />
              
              {/* Middle Ring */}
              <div className="absolute inset-2 rounded-full border-2 border-primary/30" />
              
              {/* Inner Circle */}
              <div className="absolute inset-4 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white">{compatibility}</div>
                  <div className="text-xs text-white/80 mt-1">同频指数</div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-mystical leading-tight">
            {theme}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-4 text-muted-foreground/50">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`flex justify-center mt-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-xs text-muted-foreground">向下滚动查看详情</span>
            <SafeIcon name="ChevronDown" className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
