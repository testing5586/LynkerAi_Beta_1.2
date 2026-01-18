
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface TokenUsage {
  used: number;
  total: number;
  resetDate: string;
  plan: string;
}

export default function TokenUsageDisplay() {
  const [isClient, setIsClient] = useState(false);
  const [tokenUsage, setTokenUsage] = useState<TokenUsage>({
    used: 8500,
    total: 10000,
    resetDate: '2026-02-15',
    plan: '个人版',
  });

  useEffect(() => {
    setIsClient(false);
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const usagePercentage = (tokenUsage.used / tokenUsage.total) * 100;
  const remaining = tokenUsage.total - tokenUsage.used;
  const warningLevel = usagePercentage > 80;
  const criticalLevel = usagePercentage > 95;

  const getStatusColor = () => {
    if (criticalLevel) return 'text-destructive';
    if (warningLevel) return 'text-accent';
    return 'text-primary';
  };

  const getStatusBadge = () => {
    if (criticalLevel) return <Badge variant="destructive">即将用尽</Badge>;
    if (warningLevel) return <Badge className="bg-accent text-accent-foreground">即将达到上限</Badge>;
    return <Badge className="bg-primary/20 text-primary">充足</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Main Usage Card */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
                Token使用情况
              </CardTitle>
              <CardDescription>当前订阅计划：{tokenUsage.plan}</CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Usage Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">已使用</p>
              <p className={`text-2xl font-bold ${getStatusColor()}`}>
                {tokenUsage.used.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">总额度</p>
              <p className="text-2xl font-bold text-primary">
                {tokenUsage.total.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">剩余</p>
              <p className="text-2xl font-bold text-accent">
                {remaining.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">使用进度</span>
              <span className={`text-sm font-semibold ${getStatusColor()}`}>
                {usagePercentage.toFixed(1)}%
              </span>
            </div>
            <Progress
              value={usagePercentage}
              className="h-3"
            />
          </div>

          {/* Reset Info */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <SafeIcon name="Calendar" className="h-4 w-4 inline mr-2" />
              下次重置日期：<span className="font-semibold text-foreground">{tokenUsage.resetDate}</span>
            </p>
          </div>

          {/* Warning Messages */}
          {warningLevel && (
            <div className={`p-4 rounded-lg ${criticalLevel ? 'bg-destructive/10 border border-destructive/30' : 'bg-accent/10 border border-accent/30'}`}>
              <p className={`text-sm font-medium ${criticalLevel ? 'text-destructive' : 'text-accent'}`}>
                <SafeIcon name="AlertTriangle" className="h-4 w-4 inline mr-2" />
                {criticalLevel
                  ? '您的Token即将用尽，请立即升级或充值'
                  : '您的Token使用量已超过80%，建议升级计划'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Token Consumption Info */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="BarChart3" className="h-5 w-5 text-primary" />
            Token消耗说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <SafeIcon name="MessageSquare" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">文本对话</p>
                <p className="text-xs text-muted-foreground">每条消息消耗 1-10 tokens</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <SafeIcon name="FileText" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">文档分析</p>
                <p className="text-xs text-muted-foreground">每份文档消耗 50-200 tokens</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <SafeIcon name="Image" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">图像识别</p>
                <p className="text-xs text-muted-foreground">每张图片消耗 100-500 tokens</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <SafeIcon name="Zap" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">高级功能</p>
                <p className="text-xs text-muted-foreground">高级分析和报告消耗 200-1000 tokens</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-mystical-gradient hover:opacity-90" asChild>
          <a href="./page-979468.html">
            <SafeIcon name="CreditCard" className="h-4 w-4 mr-2" />
            充值Token
          </a>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <a href="./page-979337.html">
            <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            返回个人资料
          </a>
        </Button>
      </div>
    </div>
  );
}
