
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisWarningModel } from '@/data/prognosis_chart';

interface WarningCardProps {
  warning: PrognosisWarningModel;
}

export default function WarningCard({ warning }: WarningCardProps) {
  const severityConfig = {
    High: {
      color: 'bg-red-500/10 border-red-500/30',
      badgeColor: 'bg-red-500/20 text-red-500',
      icon: 'AlertTriangle',
      label: '高风险',
    },
    Medium: {
      color: 'bg-yellow-500/10 border-yellow-500/30',
      badgeColor: 'bg-yellow-500/20 text-yellow-500',
      icon: 'AlertCircle',
      label: '中风险',
    },
    Low: {
      color: 'bg-blue-500/10 border-blue-500/30',
      badgeColor: 'bg-blue-500/20 text-blue-500',
      icon: 'Info',
      label: '低风险',
    },
  };

  const typeConfig = {
    Health: {
      icon: 'Heart',
      label: '健康预警',
      color: 'text-red-500',
    },
    Disaster: {
      icon: 'Zap',
      label: '祸福预警',
      color: 'text-orange-500',
    },
    Finance: {
      icon: 'TrendingDown',
      label: '财务预警',
      color: 'text-yellow-500',
    },
  };

  const severity = severityConfig[warning.severity];
  const type = typeConfig[warning.type];

  return (
    <Card className={`glass-card border-2 ${severity.color}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${severity.badgeColor}`}>
              <SafeIcon name={severity.icon} className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center space-x-2">
                <SafeIcon name={type.icon} className={`h-4 w-4 ${type.color}`} />
                <span>{type.label}</span>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {warning.year}年 · {severity.label}
              </p>
            </div>
          </div>
          <Badge className={severity.badgeColor}>
            {warning.year}年
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {warning.description}
        </p>
        <div className="mt-4 p-3 bg-background/50 rounded-lg border border-muted">
          <p className="text-xs text-muted-foreground font-semibold mb-2">建议应对方案：</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>提前做好相关准备和规划</li>
            <li>咨询专业命理师获取详细指导</li>
            <li>采取积极的预防措施</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
