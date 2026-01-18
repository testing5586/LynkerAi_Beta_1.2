
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

export default function ForumRightSidebar() {
  const onlineUsers = [
    {
      id: '1',
      name: '灵客用户001',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
      isPro: true,
    },
    {
      id: '2',
      name: '命理师小李',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
      isPro: true,
    },
    {
      id: '3',
      name: '占星爱好者',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'US',
      isPro: false,
    },
    {
      id: '4',
      name: '八字研究员',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
      isPro: false,
    },
  ];

  const recommendedPosts = [
    {
      id: '1',
      title: 'AI如何验证命理预测的准确性',
      votes: 234,
    },
    {
      id: '2',
      title: '2024年十二生肖运势总结',
      votes: 189,
    },
    {
      id: '3',
      title: '紫微斗数与现代心理学的结合',
      votes: 156,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Online Users */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="Users" className="w-5 h-5 text-accent" />
          <span>在线灵友</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {onlineUsers.length}
          </Badge>
        </h3>
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative">
                  <UserAvatar
                    user={user}
                    size="small"
                    showHoverCard={false}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border border-background" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">在线</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <SafeIcon name="MessageCircle" className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Posts */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="Star" className="w-5 h-5 text-accent" />
          <span>推荐阅读</span>
        </h3>
        <div className="space-y-3">
          {recommendedPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => window.location.href = `./forum-post-detail.html?id=${post.id}`}
              className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors group"
            >
              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <SafeIcon name="ThumbsUp" className="w-3 h-3 inline mr-1" />
                {post.votes} 投票
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="Link" className="w-5 h-5 text-accent" />
          <span>快速链接</span>
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            onClick={() => window.location.href = './page-944545.html'}
          >
            <SafeIcon name="Flame" className="mr-2 w-4 h-4" />
            炼丹房
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            onClick={() => window.location.href = './page-944544.html'}
          >
            <SafeIcon name="Users" className="mr-2 w-4 h-4" />
            群组页
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            onClick={() => window.location.href = './home-page.html'}
          >
            <SafeIcon name="Home" className="mr-2 w-4 h-4" />
            返回首页
          </Button>
        </div>
      </Card>

      {/* Community Stats */}
      <Card className="glass-card p-4 bg-accent/10 border-accent/20">
        <h3 className="font-semibold mb-3 text-sm">社区统计</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">总帖子数</span>
            <span className="font-semibold">12,456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">活跃用户</span>
            <span className="font-semibold">3,421</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">今日新帖</span>
            <span className="font-semibold">89</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">总投票数</span>
            <span className="font-semibold">45,678</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
