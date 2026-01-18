
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';

interface TokenConsumptionProps {
  used: number;
  total: number;
  plan: 'free' | 'personal' | 'professional';
}

const CONSUMPTION_RATES = {
  basic_analysis: 10,
  advanced_analysis: 25,
  video_session: 50,
  knowledge_base_sync: 5,
  ai_chat: 2,
};

export default function TokenConsumption({
  used = 450,
  total = 1000,
  plan = 'personal',
}: TokenConsumptionProps) {
  const percentage = (used / total) * 100;
  const remaining = total - used;
  const daysRemaining = Math.ceil(remaining / 10); // Assuming 10 tokens per day average

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
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
          算力消耗
        </CardTitle>
        <CardDescription>
          当前订阅计划：{plan === 'free' ? '免费版' : plan === 'personal' ? '个人版' : '专业版'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Usage Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">已使用</span>
            <span className={`text-lg font-bold ${getStatusColor()}`}>
              {used} / {total}
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>使用率：{percentage.toFixed(1)}%</span>
            <span>剩余：{remaining} tokens</span>
          </div>
        </div>

        {/* Estimated Duration */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-1">
          <p className="text-xs font-semibold text-foreground">预计可用时长</p>
          <p className="text-sm text-accent font-bold">{daysRemaining} 天</p>
          <p className="text-xs text-muted-foreground">
            基于平均每日消耗 10 tokens 计算
          </p>
        </div>

        {/* Consumption Rates */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">常见操作消耗</p>
          <div className="space-y-1.5 text-xs">
            {Object.entries(CONSUMPTION_RATES).map(([operation, tokens]) => (
              <div key={operation} className="flex items-center justify-between text-muted-foreground">
                <span>{getOperationLabel(operation)}</span>
                <span className="font-mono text-accent">{tokens} tokens</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        {percentage > 80 && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 space-y-1">
            <p className="text-xs font-semibold text-destructive flex items-center gap-2">
              <SafeIcon name="AlertTriangle" className="h-4 w-4" />
              即将用尽
            </p>
            <p className="text-xs text-destructive/80">
              您的算力即将用尽，请考虑升级计划或购买额外算力。
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getOperationLabel(operation: string): string {
  const labels: Record<string, string> = {
    basic_analysis: '基础分析',
    advanced_analysis: '高级分析',
    video_session: '视频会议',
    knowledge_base_sync: '知识库同步',
    ai_chat: 'AI聊天',
  };
  return labels[operation] || operation;
}
