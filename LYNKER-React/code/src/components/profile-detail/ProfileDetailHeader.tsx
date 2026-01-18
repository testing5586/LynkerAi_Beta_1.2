
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import SafeIcon from '@/components/common/SafeIcon';
import type { UserProfileDetailModel } from '@/data/user';

interface ProfileDetailHeaderProps {
  user: UserProfileDetailModel;
}

export default function ProfileDetailHeader({ user }: ProfileDetailHeaderProps) {
  const joinDateObj = new Date(user.joinDate);
  const joinDateFormatted = joinDateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="glass-card p-8 mb-8 border-2 border-primary/30">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:items-start">
          <UserAvatar
            user={{
              name: user.alias,
              avatar: user.avatarUrl,
              country: user.geoTag.flagIcon,
              region: user.geoTag.region,
            }}
            size="large"
            showHoverCard={false}
          />
          <div className="mt-4 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gradient-mystical">{user.alias}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              加入于 {joinDateFormatted}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          {/* Location & Region */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">地理位置</h3>
            <RegionBadge
              country={user.geoTag.flagIcon}
              region={user.geoTag.region}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">发帖数</p>
              <p className="text-lg font-semibold">
                {user.recentPosts?.length || 0}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">会员等级</p>
              <p className="text-lg font-semibold">普通用户</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">在线</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
