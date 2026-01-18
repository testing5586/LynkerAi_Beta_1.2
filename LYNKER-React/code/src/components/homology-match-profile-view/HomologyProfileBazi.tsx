
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface HomologyProfileBaziProps {
  summary: string;
}

export default function HomologyProfileBazi({ summary }: HomologyProfileBaziProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SafeIcon name="BarChart3" className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">八字信息</CardTitle>
        </div>
        <CardDescription>四柱命盘分析摘要</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-sm leading-relaxed text-foreground">{summary}</p>
        </div>

        {/* Quick Tags */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">命理特征</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              身弱用印
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              日坐正官
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              木火通明
            </span>
          </div>
        </div>

        {/* Compatibility */}
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs font-semibold text-accent mb-1">与您的八字相容性</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[92%] bg-accent rounded-full" />
            </div>
            <span className="text-xs font-bold text-accent">92%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
