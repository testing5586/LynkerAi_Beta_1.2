
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface MatchStatsProps {
  totalMatches: number;
  celebrityMatches: number;
  userMatches: number;
  averageCompatibility: number;
}

export default function MatchStats({
  totalMatches,
  celebrityMatches,
  userMatches,
  averageCompatibility,
}: MatchStatsProps) {
  const stats = [
    {
      label: '总匹配数',
      value: totalMatches,
      icon: 'Users',
      color: 'text-primary',
    },
    {
      label: '名人匹配',
      value: celebrityMatches,
      icon: 'Star',
      color: 'text-accent',
    },
    {
      label: '用户匹配',
      value: userMatches,
      icon: 'Heart',
      color: 'text-pink-500',
    },
    {
      label: '平均同频度',
      value: `${averageCompatibility}%`,
      icon: 'TrendingUp',
      color: 'text-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="glass-card p-6 text-center">
          <div className={`flex justify-center mb-3 ${stat.color}`}>
            <SafeIcon name={stat.icon} className="h-6 w-6" />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
