
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VotingWidgetProps {
  votes: {
    perfect: number;
    accurate: number;
    reserved: number;
    inaccurate: number;
    not_me: number;
    nonsense: number;
  };
  compact?: boolean;
  onVote?: (option: string) => void;
}

export default function VotingWidget({ votes, compact = false, onVote }: VotingWidgetProps) {
  const [userVote, setUserVote] = useState<string | null>(null);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

const voteOptions = [
    { key: 'perfect', label: '准！我就是', color: 'bg-green-500', icon: 'CheckCircle2' },
    { key: 'accurate', label: '准', color: 'bg-blue-500', icon: 'ThumbsUp' },
    { key: 'inaccurate', label: '不准', color: 'bg-orange-500', icon: 'X' },
    { key: 'not_me', label: '不准！我不是', color: 'bg-purple-500', icon: 'User' },
    { key: 'reserved', label: '有保留', color: 'bg-yellow-500', icon: 'AlertCircle' },
    { key: 'nonsense', label: '胡扯', color: 'bg-red-500', icon: 'Trash2' },
  ];

  const handleVote = (option: string) => {
    setUserVote(option);
    onVote?.(option);
  };

if (compact) {
    return (
      <div className="space-y-2">
        {voteOptions.map((option) => {
          const count = votes[option.key as keyof typeof votes];
          const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
          const isSelected = userVote === option.key;

          return (
            <div key={option.key} className="flex items-center gap-2">
              <Button
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className={`flex-shrink-0 h-8 px-2 text-xs ${
                  isSelected ? option.color + ' text-white border-0' : ''
                }`}
                onClick={() => handleVote(option.key)}
              >
                <SafeIcon name={option.icon} className="w-3 h-3 mr-1" />
                {option.label}
              </Button>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${option.color} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium w-8 text-right">
                  {count}
                </span>
              </div>
            </div>
          );
        })}
        <div className="text-xs text-muted-foreground text-center pt-1">
          共 {totalVotes} 票
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-2">
        {voteOptions.map((option) => {
          const count = votes[option.key as keyof typeof votes];
          const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
          const isSelected = userVote === option.key;

          return (
            <button
              key={option.key}
              onClick={() => handleVote(option.key)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                isSelected
                  ? option.color + ' text-white'
                  : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              <SafeIcon name={option.icon} className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium text-center line-clamp-2">
                {option.label}
              </span>
              <span className="text-xs mt-1 font-bold">{count}</span>
              <div className="text-xs mt-0.5 opacity-75">{percentage.toFixed(0)}%</div>
            </button>
          );
        })}
      </div>
      <div className="text-center text-xs text-muted-foreground">
        共 {totalVotes} 票投票
      </div>
    </div>
  );
}
