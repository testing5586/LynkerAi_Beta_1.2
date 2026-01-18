
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';

interface VotingWidgetProps {
  votes: {
    perfect: number;
    accurate: number;
    reserved: number;
    inaccurate: number;
    nonsense: number;
  };
  totalVotes: number;
}

export default function VotingWidget({ votes, totalVotes }: VotingWidgetProps) {
  const [userVote, setUserVote] = useState<string | null>(null);

  const voteOptions = [
    {
      id: 'perfect',
      label: '准！我就是',
      icon: 'ThumbsUp',
      color: 'text-green-500',
      bgColor: 'hover:bg-green-500/10',
      count: votes.perfect,
    },
    {
      id: 'accurate',
      label: '准',
      icon: 'Check',
      color: 'text-blue-500',
      bgColor: 'hover:bg-blue-500/10',
      count: votes.accurate,
    },
    {
      id: 'reserved',
      label: '有保留',
      icon: 'HelpCircle',
      color: 'text-yellow-500',
      bgColor: 'hover:bg-yellow-500/10',
      count: votes.reserved,
    },
    {
      id: 'inaccurate',
      label: '不准',
      icon: 'X',
      color: 'text-orange-500',
      bgColor: 'hover:bg-orange-500/10',
      count: votes.inaccurate,
    },
    {
      id: 'nonsense',
      label: '胡扯',
      icon: 'AlertCircle',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-500/10',
      count: votes.nonsense,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Vote Buttons */}
      <div className="grid grid-cols-5 gap-1.5">
        {voteOptions.map((option) => {
          const percentage = totalVotes > 0 ? (option.count / totalVotes) * 100 : 0;
          const isSelected = userVote === option.id;

          return (
            <div key={option.id} className="flex flex-col items-center gap-1">
              <Button
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className={`w-full h-auto py-1.5 px-1 text-xs flex flex-col items-center justify-center gap-0.5 ${
                  isSelected ? option.color : ''
                } ${option.bgColor}`}
                onClick={() => setUserVote(isSelected ? null : option.id)}
              >
                <SafeIcon name={option.icon} className="w-3.5 h-3.5" />
                <span className="text-xs font-medium line-clamp-1">{option.label}</span>
              </Button>

              {/* Vote Count */}
              <div className="text-center w-full">
                <div className="text-xs font-semibold">{option.count}</div>
                <div className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</div>
              </div>

              {/* Progress Bar */}
              <Progress value={percentage} className="h-1 w-full" />
            </div>
          );
        })}
      </div>

      {/* Total Votes */}
      <div className="text-center text-xs text-muted-foreground">
        总投票数：{totalVotes}
      </div>
    </div>
  );
}
