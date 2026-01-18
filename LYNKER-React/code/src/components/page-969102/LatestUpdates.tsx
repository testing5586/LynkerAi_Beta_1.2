
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface Update {
  id: string;
  type: 'forum' | 'article' | 'match' | 'service';
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    country?: string;
  };
  timestamp: string;
  category: string;
  link: string;
}

const MOCK_UPDATES: Update[] = [
  {
    id: '1',
    type: 'forum',
    title: '2024年丁火身强人的运势分析',
    description: '深度解析丁火身强格局在2024年的运势变化，包括事业、感情、财运等多个维度...',
    author: {
      name: '灵客命理师',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
    },
    timestamp: '2小时前',
    category: '八字分析',
    link: './forum-post-detail.html',
  },
  {
    id: '2',
    type: 'article',
    title: 'AI验证：紫微廉贞星的性格特征准确率达95%',
    description: '通过大数据分析，AI系统验证了紫微廉贞星在性格预测中的准确性...',
    author: {
      name: '灵客AI',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
    },
    timestamp: '4小时前',
    category: 'AI验证',
    link: './ai-generated-article.html',
  },
  {
    id: '3',
    type: 'match',
    title: '同命匹配成功案例：两位天同星人的灵魂共鸣',
    description: '来自不同国家的两位天同星用户通过平台匹配，发现了惊人的人生相似点...',
    author: {
      name: '灵友社区',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
    },
    timestamp: '6小时前',
    category: '同命故事',
    link: './homology-match-discovery.html',
  },
  {
    id: '4',
    type: 'service',
    title: '新命理师入驻：占星学专家Dr. Chen',
    description: '来自美国的占星学博士加入灵客平台，提供专业的西方占星咨询服务...',
    author: {
      name: 'Dr. Chen',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'US',
    },
    timestamp: '1天前',
    category: '新服务',
    link: './master-profile.html',
  },
];

const typeConfig = {
  forum: { icon: 'MessageSquare', color: 'bg-blue-500/20 text-blue-400', label: '论坛讨论' },
  article: { icon: 'FileText', color: 'bg-purple-500/20 text-purple-400', label: 'AI文章' },
  match: { icon: 'Heart', color: 'bg-pink-500/20 text-pink-400', label: '同命故事' },
  service: { icon: 'Sparkles', color: 'bg-yellow-500/20 text-yellow-400', label: '新服务' },
};

export default function LatestUpdates() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
              最新动态
            </h2>
            <p className="text-lg text-foreground/70">
              发现平台最新的命理讨论、AI验证结果和同命故事
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <a href="./forum-homepage.html">
              查看全部
              <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {MOCK_UPDATES.map((update) => {
            const config = typeConfig[update.type];
            return (
              <Card
                key={update.id}
                className="glass-card group hover:shadow-card transition-all duration-300 hover:scale-105 border-accent/10 cursor-pointer overflow-hidden"
                onClick={() => {
                  window.location.href = update.link;
                }}
              >
                {/* Header */}
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={config.color}>
                      <SafeIcon name={config.icon} className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{update.timestamp}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {update.title}
                  </CardTitle>
                </CardHeader>

                {/* Content */}
                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-2">
                    {update.description}
                  </CardDescription>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-3">
                      <UserAvatar
                        user={{
                          name: update.author.name,
                          avatar: update.author.avatar,
                          country: update.author.country,
                        }}
                        size="small"
                        showHoverCard={false}
                      />
                      <div>
                        <p className="text-sm font-medium">{update.author.name}</p>
                        <p className="text-xs text-muted-foreground">{update.category}</p>
                      </div>
                    </div>
                    <SafeIcon name="ArrowRight" className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button (Mobile) */}
        <div className="md:hidden">
          <Button variant="outline" className="w-full" asChild>
            <a href="./forum-homepage.html">
              查看全部动态
              <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
