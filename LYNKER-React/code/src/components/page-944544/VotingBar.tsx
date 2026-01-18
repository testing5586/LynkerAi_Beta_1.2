
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VotingBarProps {
  votes: {
    perfect: number; // 准！我就是
    accurate: number; // 准
    reserved: number; // 有保留
    inaccurate: number; // 不准
    not_me: number; // 不准！我不是
    nonsense: number; // 胡扯
  };
  totalVotes: number;
}

export default function VotingBar({ votes, totalVotes }: VotingBarProps) {
const voteOptions = [
    {
      key: 'perfect',
      label: '准！我就是',
      color: 'bg-green-500',
      icon: 'CheckCircle2',
      count: votes.perfect,
    },
    {
      key: 'accurate',
      label: '准',
      color: 'bg-blue-500',
      icon: 'ThumbsUp',
      count: votes.accurate,
    },
    {
      key: 'inaccurate',
      label: '不准',
      color: 'bg-orange-500',
      icon: 'ThumbsDown',
      count: votes.inaccurate,
    },
    {
      key: 'not_me',
      label: '不准！我不是',
      color: 'bg-purple-500',
      icon: 'User',
      count: votes.not_me,
    },
    {
      key: 'reserved',
      label: '有保留',
      color: 'bg-yellow-500',
      icon: 'AlertCircle',
      count: votes.reserved,
    },
    {
      key: 'nonsense',
      label: '胡扯',
      color: 'bg-red-500',
      icon: 'XCircle',
      count: votes.nonsense,
    },
  ];

  return (
    <div className="space-y-2">
      {voteOptions.map((option) => {
        const percentage = totalVotes > 0 ? (option.count / totalVotes) * 100 : 0;

        return (
          <div key={option.key} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <SafeIcon name={option.icon} className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                <span className="text-xs font-medium truncate">{option.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                {option.count}
              </Badge>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${option.color} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
      <div className="text-xs text-muted-foreground pt-1">
        总投票数：{totalVotes}
      </div>
    </div>
  );
}
