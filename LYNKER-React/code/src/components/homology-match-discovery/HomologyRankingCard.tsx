
'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import type { HomologyRankItemModel } from '@/data/homology_match';

interface HomologyRankingCardProps {
  item: HomologyRankItemModel;
  rank: number;
}

export default function HomologyRankingCard({
  item,
  rank,
}: HomologyRankingCardProps) {
  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const handleClick = () => {
    window.location.href = './homology-match-profile-view.html';
  };

  return (
    <Card
      className="glass-card p-3 hover:shadow-card transition-all cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {/* Rank Medal */}
        <div className="text-2xl font-bold w-8 text-center flex-shrink-0">
          {getRankMedal(rank)}
        </div>

        {/* Avatar */}
        <UserAvatar
          user={{
            name: item.alias,
            avatar: item.avatarUrl,
          }}
          size="small"
          showHoverCard={false}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
            {item.alias}
          </p>
          <p className="text-xs text-muted-foreground">
            匹配度: {item.matchScore}%
          </p>
        </div>

        {/* Score Badge */}
        <Badge className="bg-accent text-accent-foreground flex-shrink-0">
          {item.matchScore}
        </Badge>
      </div>
    </Card>
  );
}
