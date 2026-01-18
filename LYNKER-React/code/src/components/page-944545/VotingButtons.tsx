
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';

interface VotingButtonsProps {
  votes: {
    perfect: number;
    accurate: number;
    inaccurate: number;
    not_me: number;
    reserved: number;
    nonsense: number;
  };
  onVote: (option: string) => void;
}

export default function VotingButtons({ votes, onVote }: VotingButtonsProps) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0) || 1;

const voteOptions = [
    {
      key: 'perfect',
      label: '准！我就是',
      icon: 'ThumbsUp',
      color: 'text-green-500',
      bgColor: 'hover:bg-green-500/10',
      percentage: (votes.perfect / total) * 100,
    },
    {
      key: 'accurate',
      label: '准',
      icon: 'Check',
      color: 'text-blue-500',
      bgColor: 'hover:bg-blue-500/10',
      percentage: (votes.accurate / total) * 100,
    },
    {
      key: 'inaccurate',
      label: '不准',
      icon: 'X',
      color: 'text-orange-500',
      bgColor: 'hover:bg-orange-500/10',
      percentage: (votes.inaccurate / total) * 100,
    },
    {
      key: 'not_me',
      label: '不准！我不是',
      icon: 'User',
      color: 'text-purple-500',
      bgColor: 'hover:bg-purple-500/10',
      percentage: (votes.not_me / total) * 100,
    },
    {
      key: 'reserved',
      label: '有保留',
      icon: 'HelpCircle',
      color: 'text-yellow-500',
      bgColor: 'hover:bg-yellow-500/10',
      percentage: (votes.reserved / total) * 100,
    },
    {
      key: 'nonsense',
      label: '胡扯',
      icon: 'AlertCircle',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-500/10',
      percentage: (votes.nonsense / total) * 100,
    },
  ];

  return (
    <div className="space-y-2">
      {voteOptions.map((option) => (
        <div key={option.key} className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex-1 justify-start text-xs h-8 ${option.bgColor}`}
              onClick={() => onVote(option.key)}
            >
              <SafeIcon name={option.icon} className={`w-3 h-3 mr-1.5 ${option.color}`} />
              <span className="truncate">{option.label}</span>
            </Button>
            <span className="text-xs font-semibold text-muted-foreground min-w-12 text-right">
              {votes[option.key as keyof typeof votes]} ({Math.round(option.percentage)}%)
            </span>
          </div>
          <Progress value={option.percentage} className="h-1.5" />
        </div>
      ))}
    </div>
  );
}
