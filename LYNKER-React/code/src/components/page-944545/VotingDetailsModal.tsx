import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import VoterCard, { VoterInfo } from './VoterCard';
import SafeIcon from '@/components/common/SafeIcon';

export interface VotingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalVotes: number;
  votes: {
    perfect: number;
    accurate: number;
    inaccurate: number;
    not_me: number;
    reserved: number;
    nonsense: number;
  };
  voters: {
    perfect: VoterInfo[];
    accurate: VoterInfo[];
    inaccurate: VoterInfo[];
    not_me: VoterInfo[];
    reserved: VoterInfo[];
    nonsense: VoterInfo[];
  };
  title: string;
}

const voteTypes = [
  { key: 'perfect', label: '准！我就是', icon: 'Target', color: 'bg-cyan-500/20 text-cyan-400' },
  { key: 'accurate', label: '准', icon: 'CheckCircle', color: 'bg-blue-500/20 text-blue-400' },
  { key: 'inaccurate', label: '不准', icon: 'XCircle', color: 'bg-red-500/20 text-red-400' },
  { key: 'not_me', label: '不准！我不是', icon: 'User', color: 'bg-purple-500/20 text-purple-400' },
  { key: 'reserved', label: '有保留', icon: 'Tent', color: 'bg-gray-500/20 text-gray-400' },
  { key: 'nonsense', label: '胡扯', icon: 'MessageCircleOff', color: 'bg-orange-500/20 text-orange-400' },
];

export default function VotingDetailsModal({
  isOpen,
  onClose,
  totalVotes,
  votes,
  voters,
  title,
}: VotingDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('perfect');

  const getVotePercentage = (count: number) => {
    return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
  };

  const activeVoteType = voteTypes.find(item => item.key === activeTab);
  const activeVoters = voters[activeTab as keyof typeof voters] || [];
  const activeCount = votes[activeTab as keyof typeof votes];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>投票详情总览</DialogTitle>
          <DialogDescription>
            &quot;{title}&quot; - 总投票数：{totalVotes}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
<Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-6">
            {voteTypes.map((type) => (
              <TabsTrigger key={type.key} value={type.key} className="text-xs">
                <div className="flex flex-col items-center gap-1">
                  <span>{type.label}</span>
                  <span className="text-xs font-semibold">
                    {votes[type.key as keyof typeof votes]} ({getVotePercentage(votes[type.key as keyof typeof votes])}%)
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          {voteTypes.map((type) => (
            <TabsContent key={type.key} value={type.key} className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {activeVoters.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <SafeIcon name="Users" className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">暂无投票</p>
                    </div>
                  ) : (
                    activeVoters.map((voter) => (
                      <VoterCard key={voter.voterId} voter={voter} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        {/* Close Button */}
        <Button variant="outline" onClick={onClose} className="w-full">
          关闭
        </Button>
      </DialogContent>
    </Dialog>
  );
}