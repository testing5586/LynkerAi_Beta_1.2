
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_ALIASES } from '@/data/user';

interface UserPostsListProps {}

export default function UserPostsList({}: UserPostsListProps) {
  // Mock user posts
  const userAlias = MOCK_USER_ALIASES[0];
  const posts = [
    {
      postId: 'p005',
      title: '关于紫微斗数中贪狼坐命的看法',
      excerpt: '贪狼坐命的人往往具有强烈的欲望和行动力，但需要注意控制自己的冲动...',
      tags: ['紫微斗数', '贪狼'],
      date: '2025-11-10',
      accurateVotes: 12,
      inaccurateVotes: 2,
      replies: 8,
    },
    {
      postId: 'p006',
      title: '八字中食伤生财的实际应用',
      excerpt: '食伤代表创意和表达，当食伤生财时，说明创意能够转化为经济效益...',
      tags: ['八字', '食伤', '财运'],
      date: '2025-11-08',
      accurateVotes: 24,
      inaccurateVotes: 3,
      replies: 15,
    },
    {
      postId: 'p007',
      title: '我的同命匹配经验分享',
      excerpt: '通过灵客AI的同命匹配功能，我找到了几个命盘相似的朋友，我们一起讨论命理...',
      tags: ['同命匹配', '社交', '经验分享'],
      date: '2025-11-05',
      accurateVotes: 45,
      inaccurateVotes: 1,
      replies: 32,
    },
    {
      postId: 'p008',
      title: '占星中火星逆行的影响分析',
      excerpt: '火星逆行期间，我们的行动力可能会受到影响，但这也是反思和调整的好时机...',
      tags: ['占星术', '火星', '逆行'],
      date: '2025-10-28',
      accurateVotes: 18,
      inaccurateVotes: 5,
      replies: 12,
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}月前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">最近发帖</h2>
        <Badge variant="secondary" className="text-base px-3 py-1">
          共 {posts.length} 篇
        </Badge>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card
            key={post.postId}
            className="glass-card border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group"
            onClick={() => window.location.href = './forum-post-detail.html'}
          >
            <CardContent className="pt-6">
              <div className="space-y-3">
                {/* Title */}
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats and Date */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <SafeIcon name="MessageSquare" className="w-4 h-4" />
                      <span>{post.replies} 条评论</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SafeIcon name="ThumbsUp" className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">{post.accurateVotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SafeIcon name="ThumbsDown" className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400">{post.inaccurateVotes}</span>
                    </div>
                  </div>
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => window.location.href = './forum-homepage.html'}
        >
          <SafeIcon name="ArrowRight" className="mr-2 h-4 w-4" />
          返回论坛首页
        </Button>
      </div>
    </div>
  );
}
