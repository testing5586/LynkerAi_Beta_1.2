
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface HealthWarningCardProps {
  level: 'low' | 'medium' | 'high';
  description: string;
  suggestions: string[];
}

export default function HealthWarningCard({
  level,
  description,
  suggestions,
}: HealthWarningCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-500/20 border-red-500/50 text-red-500';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500';
      case 'low':
        return 'bg-green-500/20 border-green-500/50 text-green-500';
      default:
        return 'bg-blue-500/20 border-blue-500/50 text-blue-500';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'high':
        return '高风险';
      case 'medium':
        return '中风险';
      case 'low':
        return '低风险';
      default:
        return '未知';
    }
  };

  return (
    <Card className={`glass-card border-2 ${getLevelColor(level)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Heart" className="h-5 w-5" />
            健康预警
          </CardTitle>
          <Badge variant="outline" className={getLevelColor(level)}>
            {getLevelLabel(level)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">建议：</p>
          <ul className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                <SafeIcon name="CheckCircle" className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
