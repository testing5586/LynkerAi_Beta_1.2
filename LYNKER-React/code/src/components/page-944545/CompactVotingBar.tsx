import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SafeIcon from '@/components/common/SafeIcon';
import VotingDetailsModal, { type VotingDetailsModalProps } from './VotingDetailsModal';
import type { VoterInfo } from './VoterCard';
import { MOCK_FORUM_VOTING_OPTIONS } from '@/data/voting';

interface CompactVotingBarProps {
  votes: {
    perfect: number;
    accurate: number;
    reserved: number;
    inaccurate: number;
    not_me: number;
    nonsense: number;
  };
  totalVotes: number;
  voters?: {
    perfect: VoterInfo[];
    accurate: VoterInfo[];
    reserved: VoterInfo[];
    inaccurate: VoterInfo[];
    not_me: VoterInfo[];
    nonsense: VoterInfo[];
  };
  title?: string;
}

export default function CompactVotingBar({ 
  votes, 
  totalVotes,
  voters = {
    perfect: [],
    accurate: [],
    reserved: [],
    inaccurate: [],
    not_me: [],
    nonsense: [],
  },
  title = '投票项目',
}: CompactVotingBarProps) {
  const voteOptions = MOCK_FORUM_VOTING_OPTIONS;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getVotePercentage = (count: number) => {
    return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
  };

const getVoteColor = (optionId: string) => {
    const colors: Record<string, string> = {
      perfect: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30',
      accurate: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30',
      reserved: 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30',
      inaccurate: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
      not_me: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30',
      nonsense: 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30',
    };
    return colors[optionId] || 'bg-muted text-muted-foreground';
  };

  return (
    <>
      <TooltipProvider>
        <div className="space-y-2">
          {/* Vote Summary with "View More" Button */}
<div className="flex items-center justify-start">
            <div className="text-xs text-muted-foreground">
              总投票数：{totalVotes}
            </div>
            {totalVotes > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailsOpen(true)}
                className="text-xs h-auto px-2 py-0"
                style={{ margin: '0 0 0 25px', padding: '0 8.5px 0 8.5px' }}
              >
                <SafeIcon name="BarChart3" className="h-3 w-3 mr-1" />
                查看更多
              </Button>
            )}
          </div>

{/* Voting Buttons */}
           <div className="flex gap-1.5">
{voteOptions.map((option) => {
               const count = votes[option.id as keyof typeof votes] ?? 0;
               const percentage = getVotePercentage(count);

              return (
                <Tooltip key={option.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-xs px-2 py-1 h-auto ${getVoteColor(option.id)}`}
                    >
                      <SafeIcon name={option.iconName} className="h-3 w-3 mr-1" />
                      <span className="font-semibold">{count}</span>
                      <span className="text-xs ml-1">({percentage}%)</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </TooltipProvider>

      {/* Voting Details Modal */}
      <VotingDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        totalVotes={totalVotes}
        votes={votes}
        voters={voters}
        title={title}
      />
    </>
  );
}