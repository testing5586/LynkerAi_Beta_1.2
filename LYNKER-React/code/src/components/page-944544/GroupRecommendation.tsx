
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface RecommendedGroup {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  isJoined: boolean;
}

const RECOMMENDED_GROUPS: RecommendedGroup[] = [
  {
    id: 'g001',
    name: '紫微七杀讨论',
    memberCount: 2156,
    description: '深入探讨七杀星的特性和运用',
    isJoined: false,
  },
  {
    id: 'g002',
    name: '木火通明命格',
    memberCount: 1890,
    description: '木火通明格局的研究和分享',
    isJoined: true,
  },
  {
    id: 'g003',
    name: '同命婚配分析',
    memberCount: 987,
    description: '同命人的婚配和感情讨论',
    isJoined: false,
  },
  {
    id: 'g004',
    name: '北方气候带研究',
    memberCount: 1234,
    description: '环境因子对命理的影响研究',
    isJoined: false,
  },
];

export default function GroupRecommendation() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
          推荐群组
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {RECOMMENDED_GROUPS.map((group) => (
          <div
            key={group.id}
            className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate hover:text-primary cursor-pointer">
                  {group.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {group.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <SafeIcon name="Users" className="h-3 w-3" />
                <span>{group.memberCount}</span>
              </div>
              <Button
                size="sm"
                variant={group.isJoined ? 'outline' : 'default'}
                className={group.isJoined ? '' : 'bg-mystical-gradient hover:opacity-90'}
              >
                {group.isJoined ? '已加入' : '加入'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
