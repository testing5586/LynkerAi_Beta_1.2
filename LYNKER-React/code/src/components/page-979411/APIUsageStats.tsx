
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

export default function APIUsageStats() {
  // Mock data
  const stats = {
    totalTokens: 10000,
    usedTokens: 7250,
    remainingTokens: 2750,
    monthlyLimit: 50000,
    monthlyUsed: 28500,
    resetDate: '2025-02-15',
    requestsToday: 145,
    requestsThisMonth: 3250,
  };

  const usagePercentage = (stats.usedTokens / stats.totalTokens) * 100;
  const monthlyPercentage = (stats.monthlyUsed / stats.monthlyLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Current Plan Usage */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>当前套餐使用情况</CardTitle>
          <CardDescription>
            您的API Token使用统计
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
                <span className="font-medium">Token使用</span>
              </div>
              <span className="text-sm font-semibold">
                {stats.usedTokens.toLocaleString()} / {stats.totalTokens.toLocaleString()}
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>已使用 {usagePercentage.toFixed(1)}%</span>
              <span>剩余 {stats.remainingTokens.toLocaleString()} tokens</span>
            </div>
          </div>

          {/* Monthly Usage */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SafeIcon name="Calendar" className="h-5 w-5 text-primary" />
                <span className="font-medium">本月使用</span>
              </div>
              <span className="text-sm font-semibold">
                {stats.monthlyUsed.toLocaleString()} / {stats.monthlyLimit.toLocaleString()}
              </span>
            </div>
            <Progress value={monthlyPercentage} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>已使用 {monthlyPercentage.toFixed(1)}%</span>
              <span>重置日期：{stats.resetDate}</span>
            </div>
          </div>

          {/* Request Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">今日请求</p>
              <p className="text-2xl font-bold">{stats.requestsToday}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">本月请求</p>
              <p className="text-2xl font-bold">{stats.requestsThisMonth.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Alerts */}
      <Card className="glass-card border-amber-500/50 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="AlertCircle" className="h-5 w-5 text-amber-600" />
            使用提醒
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-amber-900 dark:text-amber-200">
          <p>
            ⚠️ 您的Token使用已达到 <strong>72.5%</strong>，建议及时升级或充值
          </p>
          <p>
            💡 本月还有 <strong>21,500 tokens</strong> 可用，预计可支持约 <strong>150 次</strong> 咨询
          </p>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>使用详情</CardTitle>
          <CardDescription>
            不同功能的Token消耗统计
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: '咨询分析', tokens: 3500, percentage: 48 },
              { name: '笔记生成', tokens: 2100, percentage: 29 },
              { name: '命盘解读', tokens: 1200, percentage: 17 },
              { name: '其他功能', tokens: 450, percentage: 6 },
            ].map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.tokens.toLocaleString()} tokens ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
