
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface ForumStatsCardProps {}

export default function ForumStatsCard({}: ForumStatsCardProps) {
  // Mock voting statistics
const stats = {
    accurate: 156, // 准！我就是
    accurate_simple: 89, // 准
    inaccurate: 12, // 不准
    not_me: 7, // 不准！我不是
    nonsense: 3, // 胡扯
    reserved: 8, // 有保留
  };

  const totalVotes = Object.values(stats).reduce((a, b) => a + b, 0);

const voteItems = [
    {
      label: '准！我就是',
      value: stats.accurate,
      color: 'bg-green-500/20 text-green-400',
      icon: 'CheckCircle',
      percentage: ((stats.accurate / totalVotes) * 100).toFixed(1),
    },
    {
      label: '准',
      value: stats.accurate_simple,
      color: 'bg-blue-500/20 text-blue-400',
      icon: 'ThumbsUp',
      percentage: ((stats.accurate_simple / totalVotes) * 100).toFixed(1),
    },
    {
      label: '不准',
      value: stats.inaccurate,
      color: 'bg-orange-500/20 text-orange-400',
      icon: 'AlertCircle',
      percentage: ((stats.inaccurate / totalVotes) * 100).toFixed(1),
    },
    {
      label: '不准！我不是',
      value: stats.not_me,
      color: 'bg-purple-500/20 text-purple-400',
      icon: 'User',
      percentage: ((stats.not_me / totalVotes) * 100).toFixed(1),
    },
    {
      label: '胡扯',
      value: stats.nonsense,
      color: 'bg-red-500/20 text-red-400',
      icon: 'XCircle',
      percentage: ((stats.nonsense / totalVotes) * 100).toFixed(1),
    },
    {
      label: '有保留',
      value: stats.reserved,
      color: 'bg-yellow-500/20 text-yellow-400',
      icon: 'HelpCircle',
      percentage: ((stats.reserved / totalVotes) * 100).toFixed(1),
    },
  ];

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="BarChart3" className="w-5 h-5" />
          论坛投票统计
        </CardTitle>
        <CardDescription>
          基于 {totalVotes} 次社区投票
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {voteItems.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SafeIcon name={item.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <Badge variant="secondary" className={item.color}>
                  {item.value} ({item.percentage}%)
                </Badge>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color.split(' ')[0]} transition-all`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Accuracy Rate */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">准确率</span>
            <span className="text-2xl font-bold text-gradient-mystical">
              {(((stats.accurate + stats.accurate_simple) / totalVotes) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            基于"准！我就是"和"准"的投票比例
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
