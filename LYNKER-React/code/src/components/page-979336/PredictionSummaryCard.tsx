
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface PredictionSummary {
  id: string;
  year: number;
  title: string;
  summary: string;
  highlights: string[];
}

interface PredictionSummaryCardProps {
  summary: PredictionSummary;
}

export default function PredictionSummaryCard({ summary }: PredictionSummaryCardProps) {
  return (
    <Card className="glass-card hover:shadow-card transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{summary.title}</span>
          <Badge variant="outline" className="text-accent border-accent/50">
            {summary.year}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {summary.summary}
        </p>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">运势亮点</p>
          <div className="flex flex-wrap gap-2">
            {summary.highlights.map((highlight, index) => {
              const isPositive = highlight.includes('↑');
              const isNeutral = highlight.includes('→');
              
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-xs ${
                    isPositive
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : isNeutral
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}
                >
                  {highlight}
                </Badge>
              );
            })}
          </div>
        </div>

        <button className="w-full mt-4 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors flex items-center justify-center space-x-2">
          <SafeIcon name="Eye" className="h-4 w-4" />
          <span>查看详细分析</span>
        </button>
      </CardContent>
    </Card>
  );
}
