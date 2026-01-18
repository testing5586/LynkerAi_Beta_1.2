
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface TokenUsageProps {
  used: number;
  total: number;
  lastReset: string;
}

interface TokenUsageChartProps {
  usage: TokenUsageProps;
}

export default function TokenUsageChart({ usage }: TokenUsageChartProps) {
  const percentage = (usage.used / usage.total) * 100;
  const remaining = usage.total - usage.used;
  const daysUntilReset = 15; // Mock value

  const getStatusColor = () => {
    if (percentage < 50) return 'text-green-500';
    if (percentage < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = () => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Usage Card */}
      <div className="lg:col-span-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
                Token使用统计
              </span>
              <Badge variant="outline">
                {Math.round(percentage)}% 已使用
              </Badge>
            </CardTitle>
            <CardDescription>
              本月额度使用情况，将在 {usage.lastReset} 后的30天内重置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">已使用</span>
                <span className={`text-lg font-bold ${getStatusColor()}`}>
                  {usage.used} / {usage.total}
                </span>
              </div>
              <Progress
                value={percentage}
                className="h-3"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{usage.total}</span>
              </div>
            </div>

            {/* Usage Breakdown */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                <p className="text-xs text-muted-foreground">已使用</p>
                <p className="text-lg font-bold text-accent">{usage.used}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                <p className="text-xs text-muted-foreground">剩余</p>
                <p className="text-lg font-bold text-green-500">{remaining}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                <p className="text-xs text-muted-foreground">使用率</p>
                <p className="text-lg font-bold">{Math.round(percentage)}%</p>
              </div>
            </div>

            {/* Usage Tips */}
            {percentage > 80 && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 space-y-2">
                <p className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <SafeIcon name="AlertTriangle" className="h-4 w-4" />
                  Token即将用尽
                </p>
                <p className="text-xs text-muted-foreground">
                  您的Token额度即将用尽，请考虑升级订阅计划以获得更多额度。
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reset Info Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="Clock" className="h-5 w-5 text-accent" />
            重置信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">下次重置时间</p>
            <p className="text-2xl font-bold text-accent">
              {daysUntilReset} 天
            </p>
            <p className="text-xs text-muted-foreground">
              2025-02-15 00:00:00
            </p>
          </div>

          <div className="space-y-2 p-3 rounded-lg bg-muted/50">
            <p className="text-sm font-semibold">重置后</p>
            <p className="text-lg font-bold text-accent">1000 tokens</p>
            <p className="text-xs text-muted-foreground">
              将恢复到您的月度额度
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2">
            <button className="w-full p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors text-sm font-semibold text-accent">
              <SafeIcon name="ShoppingCart" className="h-4 w-4 inline mr-2" />
              购买额外Token
            </button>
            <button className="w-full p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-semibold">
              <SafeIcon name="TrendingUp" className="h-4 w-4 inline mr-2" />
              升级订阅计划
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
