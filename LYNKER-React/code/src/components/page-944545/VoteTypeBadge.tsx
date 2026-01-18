import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_FORUM_VOTING_OPTIONS } from '@/data/voting';

interface VoteTypeBadgeProps {
  voteType: 'perfect' | 'accurate' | 'reserved' | 'inaccurate' | 'nonsense';
}

const voteColorMap: Record<string, string> = {
  perfect: 'bg-[#22c55e]/20 text-[#22c55e]',
  accurate: 'bg-green-500/20 text-green-400',
  reserved: 'bg-blue-500/20 text-blue-400',
  inaccurate: 'bg-red-500/20 text-red-400',
  nonsense: 'bg-gray-500/20 text-gray-400',
};

export default function VoteTypeBadge({ voteType }: VoteTypeBadgeProps) {
  const option = MOCK_FORUM_VOTING_OPTIONS.find(opt => opt.id === voteType);
  
  if (!option) return null;

  return (
    <Badge className={`text-xs gap-1 ${voteColorMap[voteType]}`}>
      <SafeIcon name={option.iconName} className="h-3 w-3" />
      <span>{option.label}</span>
    </Badge>
  );
}