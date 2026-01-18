
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_GROUP } from '@/data/group_social';

interface GroupCard {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  category: string;
}

export default function GroupRecommendations() {
  const recommendedGroups: GroupCard[] = [
    {
      id: '1',
      name: '丁火身强群',
      memberCount: 235,
      description: '汇聚丁火日主身强的同命灵友',
      category: '命格交流',
    },
    {
      id: '2',
      name: '紫微爱好者',
      memberCount: 412,
      description: '深入探讨紫微斗数的奥秘',
      category: '专业讨论',
    },
    {
      id: '3',
      name: '占星新手村',
      memberCount: 189,
      description: '西方占星术学习交流',
      category: '学习交流',
    },
    {
      id: '4',
      name: '风水布局研究',
      memberCount: 156,
      description: '分享风水知识和案例',
      category: '专业讨论',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Groups Card */}
      <Card className="glass-card sticky top-20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="Users" className="w-5 h-5 text-accent" />
            推荐群组
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {recommendedGroups.map((group) => (
            <div
              key={group.id}
              className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">
                    {group.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {group.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <SafeIcon name="Users" className="w-3 h-3" />
                    {group.memberCount}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2 text-xs"
                  onClick={() => window.location.href = './page-944544.html'}
                >
                  进入
                </Button>
              </div>
            </div>
          ))}

          {/* View All Groups */}
          <Button
            variant="ghost"
            className="w-full text-sm text-primary hover:bg-primary/10"
            onClick={() => window.location.href = './page-944544.html'}
          >
            查看全部群组 →
          </Button>
        </CardContent>
      </Card>

      {/* Online Friends Card */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="Users" className="w-5 h-5 text-green-500" />
            在线灵友
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-foreground truncate">灵友{i}</span>
                <span className="text-xs text-muted-foreground ml-auto">在线</span>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-4 text-sm text-primary hover:bg-primary/10"
          >
            查看全部 →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
