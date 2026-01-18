
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';

interface MatchResultCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    category?: string;
    country?: string;
    region?: string;
    compatibility: number;
    description: string;
    isPro?: boolean;
  };
  type: 'celebrity' | 'user';
  onViewDetail: () => void;
  onStartChat?: () => void;
}

export default function MatchResultCard({
  user,
  type,
  onViewDetail,
  onStartChat,
}: MatchResultCardProps) {
  return (
    <Card className="glass-card overflow-hidden hover:shadow-card transition-all duration-300 group">
      {/* Header with Avatar */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/10 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
          <SafeIcon name="Sparkles" className="h-8 w-8 text-accent" />
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-8 left-6">
          <div className="relative">
            <UserAvatar
              user={user}
              size="large"
              showHoverCard={false}
              className="ring-4 ring-background"
            />
            {user.isPro && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center ring-2 ring-background">
                <SafeIcon name="Crown" className="w-3 h-3 text-accent-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 px-6 pb-6">
        {/* Name and Category */}
        <div className="mb-3">
          <h3 className="text-lg font-bold mb-1">{user.name}</h3>
          {user.category && (
            <Badge variant="secondary" className="text-xs">
              {user.category}
            </Badge>
          )}
        </div>

        {/* Location */}
        {type === 'user' && user.country && (
          <div className="mb-3">
            <RegionBadge country={user.country} region={user.region} size="small" />
          </div>
        )}

        {/* Compatibility Score */}
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">同频指数</span>
            <span className="text-lg font-bold text-accent">{user.compatibility}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${user.compatibility}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {user.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewDetail}
          >
            <SafeIcon name="Eye" className="h-4 w-4 mr-1" />
            查看详情
          </Button>
          {type === 'user' && onStartChat && (
            <Button
              size="sm"
              className="flex-1 bg-mystical-gradient hover:opacity-90"
              onClick={onStartChat}
            >
              <SafeIcon name="MessageCircle" className="h-4 w-4 mr-1" />
              开始聊天
            </Button>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/50 transition-colors pointer-events-none" />
    </Card>
  );
}
