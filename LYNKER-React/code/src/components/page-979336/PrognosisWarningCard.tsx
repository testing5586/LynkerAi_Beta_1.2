
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisWarningModel } from '@/data/prognosis_chart';

interface PrognosisWarningCardProps {
  warning: PrognosisWarningModel;
}

export default function PrognosisWarningCard({ warning }: PrognosisWarningCardProps) {
  const severityConfig = {
    High: { color: 'bg-destructive/20 border-destructive/50', badge: 'bg-destructive text-destructive-foreground', icon: 'AlertTriangle' },
    Medium: { color: 'bg-yellow-500/20 border-yellow-500/50', badge: 'bg-yellow-600 text-yellow-50', icon: 'AlertCircle' },
    Low: { color: 'bg-blue-500/20 border-blue-500/50', badge: 'bg-blue-600 text-blue-50', icon: 'Info' },
  };

  const typeConfig = {
    Health: { label: '健康', icon: 'Heart' },
    Disaster: { label: '祸福', icon: 'Zap' },
    Finance: { label: '财务', icon: 'Wallet' },
  };

  const config = severityConfig[warning.severity];
  const typeLabel = typeConfig[warning.type];

  return (
    <Card className={`glass-card border-2 ${config.color}`}>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <SafeIcon name={typeLabel.icon} className="h-5 w-5 text-accent" />
              <span className="font-semibold">{warning.year}年 {typeLabel.label}预警</span>
            </div>
            <Badge className={config.badge}>
              {warning.severity === 'High' ? '高风险' : warning.severity === 'Medium' ? '中风险' : '低风险'}
            </Badge>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {warning.description}
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2">
            <SafeIcon name="Clock" className="h-3 w-3" />
            <span>建议提前做好准备</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
