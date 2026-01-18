
'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import type { HomologyMatchModel } from '@/data/homology_match';

interface HomologyMatchCardProps {
  match: HomologyMatchModel;
}

export default function HomologyMatchCard({ match }: HomologyMatchCardProps) {
  const handleViewProfile = () => {
    window.location.href = './homology-match-profile-view.html';
  };

const handleAddFriend = () => {
    // Send friend request
    window.location.href = './user-friend-request.html';
  };

  return (
    <Card className="glass-card p-6 hover:shadow-card transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Avatar & Basic Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <UserAvatar
            user={{
              name: match.alias,
              avatar: match.avatarUrl,
              country: match.geoTag.flagIcon,
              region: match.geoTag.region,
            }}
            size="large"
            showHoverCard={false}
          />

          <div className="flex-1 min-w-0">
            {/* Name & Status */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                {match.alias}
              </h3>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            </div>

            {/* Region Badge */}
            <div className="mb-3">
              <RegionBadge
                country={match.geoTag.flagIcon}
                region={match.geoTag.region}
                size="small"
              />
            </div>

            {/* Main Star/Pillar */}
            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-1">命盘特征</p>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {match.mainStarOrPillar}
              </Badge>
            </div>

            {/* Interest Tags */}
            <div className="flex flex-wrap gap-1">
              {match.interestTags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {match.interestTags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{match.interestTags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right: Match Score & Actions */}
        <div className="flex flex-col items-end gap-4 flex-shrink-0">
          {/* Match Percentage */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gradient-mystical">
              {match.matchPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">匹配度</p>
          </div>

          {/* Progress Bar */}
          <div className="w-24">
            <Progress
              value={match.matchPercentage}
              className="h-2"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 w-full">
            <Button
              size="sm"
              className="w-full bg-mystical-gradient hover:opacity-90"
              onClick={handleViewProfile}
            >
              <SafeIcon name="Eye" className="h-4 w-4 mr-1" />
              查看资料
            </Button>
<Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={handleAddFriend}
            >
              <SafeIcon name="UserPlus" className="h-4 w-4 mr-1" />
              加为好友
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
