
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VotingBadgeProps {
  label: string;
  count: number;
  variant: 'exact' | 'accurate' | 'inaccurate' | 'nonsense' | 'reserved' | 'not_me';
  size?: 'small' | 'default';
}

export default function VotingBadge({
  label,
  count,
  variant,
  size = 'small',
}: VotingBadgeProps) {
const variantStyles = {
    exact: 'bg-green-500/20 text-green-400 border-green-500/30',
    accurate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    inaccurate: 'bg-red-500/20 text-red-400 border-red-500/30',
    not_me: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    nonsense: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    reserved: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  const iconMap = {
    exact: 'CheckCircle',
    accurate: 'ThumbsUp',
    inaccurate: 'ThumbsDown',
    not_me: 'User',
    nonsense: 'AlertCircle',
    reserved: 'HelpCircle',
  };

const sizeClasses = size === 'small' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <Badge
      variant="outline"
      className={`${variantStyles[variant]} ${sizeClasses} border flex items-center gap-0.5 cursor-default whitespace-nowrap`}
    >
      <SafeIcon name={iconMap[variant]} className="w-2.5 h-2.5 flex-shrink-0" />
      <span className="text-xs">{label}</span>
      {count > 0 && <span className="ml-0.5 font-semibold text-xs">{count}</span>}
    </Badge>
  );
}
