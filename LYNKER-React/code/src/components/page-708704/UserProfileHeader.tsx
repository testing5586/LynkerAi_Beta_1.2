
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';

interface UserProfileHeaderProps {}

export default function UserProfileHeader({}: UserProfileHeaderProps) {
  // Mock user data
  const user = {
    name: '灵客探索者',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'CN',
    region: '北京',
    bio: '热爱命理学的探索者，相信通过了解自己的命盘能更好地把握人生方向。',
    joinDate: '2024年3月',
    isPro: false,
    verificationStatus: 'verified',
    stats: {
      followers: 128,
      following: 45,
      posts: 23,
    },
  };

  return (
    <Card className="glass-card mb-8 overflow-hidden">
      <CardContent className="p-0">
        {/* Background Banner */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-4 text-4xl opacity-20">☯️</div>
            <div className="absolute bottom-4 right-8 text-5xl opacity-20">✨</div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 mb-6">
            {/* Avatar */}
            <div className="mb-4 md:mb-0">
              <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user.verificationStatus === 'verified' && (
                  <Badge className="bg-accent text-accent-foreground">
                    <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                    已验证
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-3">{user.bio}</p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <RegionBadge country={user.country} region={user.region} />
                <Badge variant="outline" className="text-xs">
                  <SafeIcon name="Calendar" className="w-3 h-3 mr-1" />
                  加入于 {user.joinDate}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{user.stats.followers}</div>
                  <div className="text-xs text-muted-foreground">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{user.stats.following}</div>
                  <div className="text-xs text-muted-foreground">关注</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{user.stats.posts}</div>
                  <div className="text-xs text-muted-foreground">发帖</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 mt-4 md:mt-0">
              <Button asChild className="bg-mystical-gradient hover:opacity-90">
                <a href="./profile-setup-user.html">
                  <SafeIcon name="Edit" className="w-4 h-4 mr-2" />
                  编辑资料
                </a>
              </Button>
              <Button variant="outline">
                <SafeIcon name="Share2" className="w-4 h-4 mr-2" />
                分享资料
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
