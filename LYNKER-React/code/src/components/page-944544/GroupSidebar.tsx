
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface HotTopic {
  id: string;
  name: string;
  postCount: number;
  memberCount: number;
  trend: 'up' | 'down' | 'stable';
}

const HOT_TOPICS: HotTopic[] = [
  {
    id: 'topic_1',
    name: '丁火身强群',
    postCount: 1245,
    memberCount: 3420,
    trend: 'up',
  },
  {
    id: 'topic_2',
    name: '紫微七杀讨论',
    postCount: 892,
    memberCount: 2156,
    trend: 'up',
  },
  {
    id: 'topic_3',
    name: '木火通明命格',
    postCount: 756,
    memberCount: 1890,
    trend: 'stable',
  },
  {
    id: 'topic_4',
    name: '北方气候带研究',
    postCount: 634,
    memberCount: 1234,
    trend: 'down',
  },
  {
    id: 'topic_5',
    name: '同命婚配分析',
    postCount: 521,
    memberCount: 987,
    trend: 'up',
  },
];

const CATEGORIES = [
  { name: '八字命格', icon: 'BarChart3', count: 234 },
  { name: '紫微斗数', icon: 'Star', count: 189 },
  { name: '西方占星', icon: 'Compass', count: 156 },
  { name: '同命社交', icon: 'Users', count: 342 },
  { name: '风水奇门', icon: 'Map', count: 98 },
  { name: '其他话题', icon: 'MessageSquare', count: 67 },
];

export default function GroupSidebar() {
  return (
    <div className="space-y-6">
      {/* Hot Topics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
            热门话题
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {HOT_TOPICS.map((topic, index) => (
            <button
              key={topic.id}
              className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-accent">#{index + 1}</span>
                    <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {topic.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <SafeIcon name="MessageSquare" className="h-3 w-3" />
                    <span>{topic.postCount}</span>
                    <SafeIcon name="Users" className="h-3 w-3 ml-1" />
                    <span>{topic.memberCount}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {topic.trend === 'up' && (
                    <SafeIcon name="TrendingUp" className="h-4 w-4 text-green-500" />
                  )}
                  {topic.trend === 'down' && (
                    <SafeIcon name="TrendingDown" className="h-4 w-4 text-red-500" />
                  )}
                  {topic.trend === 'stable' && (
                    <SafeIcon name="Minus" className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Layers" className="h-5 w-5 text-accent" />
            分类目录
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <SafeIcon name={category.icon} className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
