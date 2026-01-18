
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface HomologyProfileZiweiProps {
  summary: string;
}

export default function HomologyProfileZiwei({ summary }: HomologyProfileZiweiProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SafeIcon name="Star" className="w-5 h-5 text-accent" />
          <CardTitle className="text-lg">紫微信息</CardTitle>
        </div>
        <CardDescription>紫微斗数星盘分析摘要</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-sm leading-relaxed text-foreground">{summary}</p>
        </div>

        {/* Quick Tags */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">星曜特征</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              命宫武曲化权
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              事业心强
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              管理型格局
            </span>
          </div>
        </div>

        {/* Compatibility */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-1">与您的紫微相容性</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[88%] bg-primary rounded-full" />
            </div>
            <span className="text-xs font-bold text-primary">88%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
