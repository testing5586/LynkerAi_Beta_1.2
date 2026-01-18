
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface PredictionSummaryCardProps {
  title: string;
  score: number;
  description: string;
  icon: string;
}

export default function PredictionSummaryCard({
  title,
  score,
  description,
  icon,
}: PredictionSummaryCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    if (score >= 40) return 'outline';
    return 'destructive';
  };

  return (
    <Card className="glass-card hover:shadow-card transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name={icon} className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <Badge variant={getScoreBadgeVariant(score)} className="text-lg px-3 py-1">
            <span className={getScoreColor(score)}>{score}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
