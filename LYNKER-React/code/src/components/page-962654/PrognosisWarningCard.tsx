
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisWarningModel } from '@/data/prognosis_chart';

interface PrognosisWarningCardProps {
  warning: PrognosisWarningModel;
}

export default function PrognosisWarningCard({ warning }: PrognosisWarningCardProps) {
  const typeConfig = {
    Health: {
      icon: 'Heart',
      label: '健康预警',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    Disaster: {
      icon: 'AlertTriangle',
      label: '祸福预警',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    Finance: {
      icon: 'TrendingDown',
      label: '财务预警',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
  };

  const severityConfig = {
    High: { label: '高风险', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    Medium: { label: '中风险', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    Low: { label: '低风险', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  };

  const config = typeConfig[warning.type];
  const severityLabel = severityConfig[warning.severity];

  return (
    <Card className={`glass-card border ${config.borderColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <SafeIcon name={config.icon} className={`h-5 w-5 ${config.color}`} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base flex items-center gap-2">
                {config.label}
                <Badge className={severityLabel.color}>{severityLabel.label}</Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{warning.year}年</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {warning.description}
        </p>
        <div className="mt-4 pt-4 border-t border-muted/20">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <SafeIcon name="Lightbulb" className="h-3 w-3" />
            建议提前做好准备，趋吉避凶
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
