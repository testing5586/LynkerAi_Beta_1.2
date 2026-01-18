
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface TrendingTopic {
  id: string;
  title: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

export default function TrendingTopics() {
  const trendingTopics: TrendingTopic[] = [
    {
      id: '1',
      title: '2026年经济预测',
      count: 234,
      trend: 'up',
    },
    {
      id: '2',
      title: '紫微斗数验证',
      count: 189,
      trend: 'up',
    },
    {
      id: '3',
      title: '八字命格分析',
      count: 156,
      trend: 'stable',
    },
    {
      id: '4',
      title: '占星术预言',
      count: 142,
      trend: 'down',
    },
    {
      id: '5',
      title: '风水布局讨论',
      count: 128,
      trend: 'up',
    },
    {
      id: '6',
      title: '感情运势预测',
      count: 115,
      trend: 'stable',
    },
    {
      id: '7',
      title: '事业发展指导',
      count: 98,
      trend: 'down',
    },
    {
      id: '8',
      title: '健康养生建议',
      count: 87,
      trend: 'up',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <SafeIcon name="TrendingUp" className="w-4 h-4 text-green-500" />;
      case 'down':
        return <SafeIcon name="TrendingDown" className="w-4 h-4 text-red-500" />;
      default:
        return <SafeIcon name="Minus" className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="glass-card sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <SafeIcon name="Flame" className="w-5 h-5 text-accent" />
          热门话题
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {trendingTopics.map((topic, index) => (
          <button
            key={topic.id}
            className="w-full text-left p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-muted-foreground w-5">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {topic.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-7">
                  <SafeIcon name="MessageCircle" className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{topic.count}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {getTrendIcon(topic.trend)}
              </div>
            </div>
          </button>
        ))}

        {/* View All Button */}
        <button className="w-full mt-4 p-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium">
          查看全部话题 →
        </button>
      </CardContent>
    </Card>
  );
}
