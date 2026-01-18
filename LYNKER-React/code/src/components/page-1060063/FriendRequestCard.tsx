
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface FriendRequest {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  country: string;
  region: string;
  isPro: boolean;
  bio: string;
  constellation: string;
  bazi: string;
  ziwei: string;
  matchScore: number;
  requestTime: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface FriendRequestCardProps {
  request: FriendRequest;
  isSelected: boolean;
  onSelect: () => void;
}

export default function FriendRequestCard({
  request,
  isSelected,
  onSelect,
}: FriendRequestCardProps) {
  return (
    <Card
      className={`glass-card cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-primary shadow-card'
          : 'hover:shadow-card'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <UserAvatar
            user={{
              name: request.userName,
              avatar: request.avatar,
              country: request.country,
              isPro: request.isPro,
            }}
            size="default"
            showHoverCard={false}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold truncate">{request.userName}</h3>
              {request.isPro && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                  Pro
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{request.region}</p>
            <div className="flex items-center space-x-1 mb-2">
              <SafeIcon name="Zap" className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold text-accent">
                匹配度 {request.matchScore}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {request.requestTime}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
