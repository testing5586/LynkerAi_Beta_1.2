
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import type { PrognosisQuickViewModel } from '@/data/social_feed';

interface PrognosisDisplayProps {
  currentUser: {
    name: string;
    avatar: string;
    country?: string;
    region?: string;
  };
  friend: {
    name: string;
    avatar: string;
    country?: string;
    region?: string;
  };
  currentUserPrognosis: PrognosisQuickViewModel;
  friendPrognosis?: PrognosisQuickViewModel;
  commonPoints?: string[];
}

export default function PrognosisDisplay({
  currentUser,
  friend,
  currentUserPrognosis,
  friendPrognosis,
  commonPoints = [],
}: PrognosisDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Prognosis Display */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center space-x-2">
          <SafeIcon name="Star" className="h-5 w-5 text-accent" />
          <span>命盘对比</span>
        </h3>

        {/* Current User Prognosis */}
        <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-muted">
          <div className="flex items-center space-x-2 mb-2">
            <UserAvatar
              user={{ name: currentUser.name, avatar: currentUser.avatar }}
              size="small"
              showHoverCard={false}
            />
            <span className="text-sm font-semibold">{currentUser.name}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <p className="font-semibold text-muted-foreground mb-1">八字</p>
              <p className="text-foreground">{currentUserPrognosis.baziSummary}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground mb-1">紫微</p>
              <p className="text-foreground">{currentUserPrognosis.ziweiSummary}</p>
            </div>
            {currentUserPrognosis.isVerified && (
              <Badge variant="secondary" className="w-fit text-xs">
                <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                已验证真命盘
              </Badge>
            )}
          </div>
        </div>

        {/* Friend Prognosis */}
        {friendPrognosis && (
          <div className="p-3 rounded-lg bg-muted/30 border border-muted">
            <div className="flex items-center space-x-2 mb-2">
              <UserAvatar
                user={{ name: friend.name, avatar: friend.avatar }}
                size="small"
                showHoverCard={false}
              />
              <span className="text-sm font-semibold">{friend.name}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-semibold text-muted-foreground mb-1">八字</p>
                <p className="text-foreground">{friendPrognosis.baziSummary}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground mb-1">紫微</p>
                <p className="text-foreground">{friendPrognosis.ziweiSummary}</p>
              </div>
              {friendPrognosis.isVerified && (
                <Badge variant="secondary" className="w-fit text-xs">
                  <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                  已验证真命盘
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Common Points */}
      {commonPoints.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center space-x-2">
            <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
            <span>同频点</span>
          </h3>
          <div className="space-y-2">
            {commonPoints.map((point, idx) => (
              <Badge key={idx} variant="outline" className="w-full justify-start">
                <SafeIcon name="Check" className="w-3 h-3 mr-2" />
                {point}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
