import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { Button } from '@/components/ui/button';

export interface VoterInfo {
  voterId: string;
  alias: string;
  avatarUrl: string;
  country: string;
  region: string;
  birthplace: string;
  culturalBackground: string;
  religion: string;
  bloodType: string;
  occupation: string;
  voteType: 'perfect' | 'accurate' | 'inaccurate' | 'not_me' | 'reserved' | 'nonsense';
  flagIcon: string;
  timestamp: string;
}

interface VoterCardProps {
  voter: VoterInfo;
}

const voteTypeColor: Record<string, string> = {
  perfect: 'bg-cyan-500/20 text-cyan-400',
  accurate: 'bg-blue-500/20 text-blue-400',
  inaccurate: 'bg-red-500/20 text-red-400',
  not_me: 'bg-purple-500/20 text-purple-400',
  reserved: 'bg-gray-500/20 text-gray-400',
  nonsense: 'bg-orange-500/20 text-orange-400',
};

const voteTypeLabel: Record<string, string> = {
  perfect: '准！我就是',
  accurate: '准',
  inaccurate: '不准',
  not_me: '不准！我不是',
  reserved: '有保留',
  nonsense: '胡扯',
};

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function VoterCard({ voter }: VoterCardProps) {
  return (
    <div className="flex gap-3 p-4 bg-background/30 rounded-lg border border-border/30 hover:border-border/50 transition-all">
      {/* Avatar */}
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={voter.avatarUrl} alt={voter.alias} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {voter.alias.slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-sm">{voter.alias}</span>
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            <span className="mr-1">{getFlagEmoji(voter.flagIcon)}</span>
            {voter.region}
          </Badge>
          <Badge className={`text-xs px-2 py-0.5 ${voteTypeColor[voter.voteType]}`}>
            {voteTypeLabel[voter.voteType]}
          </Badge>
        </div>

{/* Details Grid */}
         <div className="grid grid-cols-2 gap-2 text-xs mb-2">
           <div>
             <span className="text-muted-foreground">国家：</span>
             <span className="text-foreground">{voter.country}</span>
           </div>
           <div>
             <span className="text-muted-foreground">地区：</span>
             <span className="text-foreground">{voter.region}</span>
           </div>
           <div>
             <span className="text-muted-foreground">职业：</span>
             <span className="text-foreground">{voter.occupation}</span>
           </div>
           <div>
             <span className="text-muted-foreground">血型：</span>
             <span className="text-foreground">{voter.bloodType}</span>
           </div>
           <div>
             <span className="text-muted-foreground">出生地：</span>
             <span className="text-foreground">{voter.birthplace}</span>
           </div>
           <div>
             <span className="text-muted-foreground">宗教信仰：</span>
             <span className="text-foreground">{voter.religion}</span>
           </div>
           <div className="col-span-2">
             <span className="text-muted-foreground">文化背景：</span>
             <span className="text-foreground">{voter.culturalBackground}</span>
           </div>
         </div>

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground">
          投票时间：{voter.timestamp}
        </div>
      </div>
    </div>
  );
}