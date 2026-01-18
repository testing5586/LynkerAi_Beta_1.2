
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface QuickAccessItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  color: string;
}

const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: 'prognosis_records',
    icon: 'ScrollText',
    title: '我的批命记录',
    description: '查看和对比所有命理师的历史咨询记录，追踪命理预言的应验情况。',
    actionLabel: '查看记录',
    actionHref: './page-944726.html',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'homology_match',
    title: '同命匹配设置',
    icon: 'Users',
    description: '发现与您命盘相匹配的潜在同命人，管理匹配偏好和筛选条件。',
    actionLabel: '发现同命',
    actionHref: './homology-match-discovery.html',
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'social_feed',
    icon: 'Rss',
    title: '灵友圈动态',
    description: '浏览朋友和群组的最新动态，分享您的命理感悟和生活点滴。',
    actionLabel: '进入圈子',
    actionHref: './page-944865.html',
    color: 'from-pink-500/20 to-pink-600/20',
  },
  {
    id: 'knowledge_base',
    icon: 'BookOpen',
    title: '知识库与笔记',
    description: '管理您的研究笔记和AI自动整理的咨询摘要，建立个人命理知识体系。',
    actionLabel: '进入知识库',
    actionHref: './knowledge-base-main.html',
    color: 'from-amber-500/20 to-amber-600/20',
  },
];

export default function QuickAccessCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {QUICK_ACCESS_ITEMS.map((item) => (
        <Card
          key={item.id}
          className={`glass-card hover:border-accent/50 transition-all hover:shadow-card bg-gradient-to-br ${item.color}`}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <SafeIcon name={item.icon} className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{item.description}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-mystical-gradient hover:opacity-90">
              <a href={item.actionHref}>
                <SafeIcon name="ArrowRight" className="mr-2 h-4 w-4" />
                {item.actionLabel}
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
