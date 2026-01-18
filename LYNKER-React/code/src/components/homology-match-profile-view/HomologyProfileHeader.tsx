
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import SafeIcon from '@/components/common/SafeIcon';
import type { HomologyProfileViewModel } from '@/data/homology_match';

interface HomologyProfileHeaderProps {
  profile: HomologyProfileViewModel;
}

export default function HomologyProfileHeader({ profile }: HomologyProfileHeaderProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <UserAvatar
              user={{
                name: profile.alias,
                avatar: profile.avatarUrl,
                country: profile.geoTag.country,
              }}
              size="large"
              showHoverCard={false}
            />
            {profile.isOnline && (
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{profile.alias}</h1>
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                <SafeIcon name="Zap" className="w-3 h-3 mr-1" />
                {profile.matchPercentage}% 匹配
              </Badge>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-sm text-green-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>在线</span>
              </div>
              <span className="text-xs text-muted-foreground">最后活跃：5分钟前</span>
            </div>

            {/* Region */}
            <div className="mb-4">
              <RegionBadge
                country={profile.geoTag.country}
                region={profile.geoTag.region}
              />
            </div>

            {/* Match Score Details */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{profile.matchPercentage}%</div>
                <div className="text-xs text-muted-foreground">总体匹配度</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">92%</div>
                <div className="text-xs text-muted-foreground">八字相似</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">88%</div>
                <div className="text-xs text-muted-foreground">紫微相似</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
