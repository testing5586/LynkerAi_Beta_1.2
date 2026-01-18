
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';
import type { ProphecyRecordModel } from '@/data/knowledge';

interface ProphecyStatsProps {
  records: ProphecyRecordModel[];
}

export default function ProphecyStats({ records }: ProphecyStatsProps) {
  const stats = {
    total: records.length,
    fulfilled: records.filter(r => r.fulfillmentStatus === '已应验').length,
    pending: records.filter(r => r.fulfillmentStatus === '应验中').length,
    unfulfilled: records.filter(r => r.fulfillmentStatus === '未应验').length,
  };

  const fulfillmentRate = stats.total > 0 ? Math.round((stats.fulfilled / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Records */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <SafeIcon name="FileText" className="mr-2 h-4 w-4" />
            总记录数
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gradient-mystical">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">条预言记录</p>
        </CardContent>
      </Card>

      {/* Fulfilled */}
      <Card className="glass-card border-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-green-400 flex items-center">
            <SafeIcon name="CheckCircle" className="mr-2 h-4 w-4" />
            已应验
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{stats.fulfilled}</div>
          <p className="text-xs text-muted-foreground mt-1">条预言已应验</p>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card className="glass-card border-yellow-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-yellow-400 flex items-center">
            <SafeIcon name="Clock" className="mr-2 h-4 w-4" />
            应验中
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          <p className="text-xs text-muted-foreground mt-1">条预言等待验证</p>
        </CardContent>
      </Card>

      {/* Unfulfilled */}
      <Card className="glass-card border-red-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-red-400 flex items-center">
            <SafeIcon name="XCircle" className="mr-2 h-4 w-4" />
            未应验
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-400">{stats.unfulfilled}</div>
          <p className="text-xs text-muted-foreground mt-1">条预言未应验</p>
        </CardContent>
      </Card>

      {/* Fulfillment Rate */}
      <Card className="glass-card md:col-span-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <span className="flex items-center">
              <SafeIcon name="TrendingUp" className="mr-2 h-4 w-4" />
              应验率
            </span>
            <span className="text-lg font-bold text-accent">{fulfillmentRate}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={fulfillmentRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {stats.fulfilled} 已应验 / {stats.total} 总记录
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
