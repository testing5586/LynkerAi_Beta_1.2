
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_ALIASES } from '@/data/user';

interface UserForumProfileHeaderProps {}

export default function UserForumProfileHeader({}: UserForumProfileHeaderProps) {
  // Mock user data
  const user = {
    name: MOCK_USER_ALIASES[0],
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
    country: 'CN',
    region: '广东深圳',
    joinDate: '2025-08-15',
    bio: '热爱探索自己命运轨迹的普通人。正在努力实现自我价值，期望通过命理找到人生的最优解。',
    totalPosts: 24,
    totalAccurateVotes: 156,
  };

  const joinDateObj = new Date(user.joinDate);
  const joinDateFormatted = joinDateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="glass-card border-primary/20 overflow-hidden">
      {/* Banner Background */}
      <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
        </div>
      </div>

      <CardContent className="pt-0">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <UserAvatar
              user={{
                name: user.name,
                avatar: user.avatar,
                country: user.country,
              }}
              size="large"
              showHoverCard={false}
              className="ring-4 ring-background"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 pt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-muted-foreground mb-3">{user.bio}</p>
              </div>
<Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => window.location.href = './page-945207.html'}
              >
                <SafeIcon name="Mail" className="mr-2 h-4 w-4" />
                发送私信
              </Button>
            </div>

            {/* Tags and Info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <RegionBadge country={user.country} region={user.region} size="small" />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <SafeIcon name="Calendar" className="w-4 h-4" />
                  <span>加入于 {joinDateFormatted}</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon name="MessageSquare" className="w-4 h-4" />
                  <span>发帖 {user.totalPosts} 篇</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon name="ThumbsUp" className="w-4 h-4" />
                  <span>获赞 {user.totalAccurateVotes} 次</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
