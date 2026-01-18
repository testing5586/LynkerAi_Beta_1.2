
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface DiscussionSectionProps {}

export default function DiscussionSection({}: DiscussionSectionProps) {
  const discussions = [
    {
      id: 'disc_001',
      title: '我的金木交战经历完全符合研究结论！',
      author: '灵友_云澜',
      country: 'CN',
      region: '北京',
      votes: {
        accurate: 45,
        somewhat: 12,
        inaccurate: 3,
        nonsense: 1,
        reserved: 8,
      },
      commentCount: 23,
      timestamp: '2小时前',
    },
    {
      id: 'disc_002',
      title: '地域差异的发现很有意思，想深入讨论环境因子',
      author: '命理研究者_月影',
      country: 'US',
      region: '加州',
      votes: {
        accurate: 32,
        somewhat: 18,
        inaccurate: 5,
        nonsense: 2,
        reserved: 12,
      },
      commentCount: 18,
      timestamp: '4小时前',
    },
    {
      id: 'disc_003',
      title: '性别差异部分需要更多样本验证',
      author: 'Pro命理师_紫微',
      country: 'CN',
      region: '上海',
      isPro: true,
      votes: {
        accurate: 28,
        somewhat: 15,
        inaccurate: 8,
        nonsense: 0,
        reserved: 6,
      },
      commentCount: 31,
      timestamp: '6小时前',
    },
  ];

  const totalDiscussions = 156;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SafeIcon name="MessageSquare" className="w-6 h-6 text-accent" />
            社区讨论
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {totalDiscussions} 条讨论 • 用户正在验证这些发现
          </p>
        </div>
        <Button
          asChild
          className="bg-mystical-gradient hover:opacity-90"
        >
          <a href="./forum-post-detail.html">
            查看全部讨论
            <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Discussion Cards */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="glass-card hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {discussion.author}
                    </span>
                    {discussion.isPro && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                        <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                        Pro命理师
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {getFlagEmoji(discussion.country)} {discussion.region}
                    </span>
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground hover:text-primary transition-colors">
                    {discussion.title}
                  </CardTitle>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {discussion.timestamp}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Vote Buttons - Compact */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">投票：</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/50"
                >
                  <SafeIcon name="ThumbsUp" className="w-3 h-3 mr-1" />
                  准！我就是 ({discussion.votes.accurate})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50"
                >
                  <SafeIcon name="Check" className="w-3 h-3 mr-1" />
                  准 ({discussion.votes.somewhat})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
                >
                  <SafeIcon name="X" className="w-3 h-3 mr-1" />
                  不准 ({discussion.votes.inaccurate})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-orange-500/20 hover:text-orange-400 hover:border-orange-500/50"
                >
                  <SafeIcon name="AlertCircle" className="w-3 h-3 mr-1" />
                  胡扯 ({discussion.votes.nonsense})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/50"
                >
                  <SafeIcon name="HelpCircle" className="w-3 h-3 mr-1" />
                  有保留 ({discussion.votes.reserved})
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <SafeIcon name="MessageCircle" className="w-3 h-3" />
                  <span>{discussion.commentCount} 条评论</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon name="TrendingUp" className="w-3 h-3" />
                  <span>热度: {Math.floor(Math.random() * 100) + 50}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          想分享您的看法？加入讨论，帮助我们验证这些发现！
        </p>
        <Button
          asChild
          className="bg-mystical-gradient hover:opacity-90"
        >
          <a href="./forum-post-detail.html">
            <SafeIcon name="MessageSquare" className="mr-2 h-4 w-4" />
            进入完整讨论区
          </a>
        </Button>
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
