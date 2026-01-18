
import { Card, CardContent } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface StatItem {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}

const MOCK_STATS: StatItem[] = [
  {
    icon: 'FileText',
    label: '批命记录',
    value: 12,
    trend: '+3 本月',
    color: 'text-blue-500',
  },
  {
    icon: 'Users',
    label: '同命匹配',
    value: 28,
    trend: '+5 本周',
    color: 'text-purple-500',
  },
  {
    icon: 'MessageSquare',
    label: '灵友圈动态',
    value: 45,
    trend: '+12 本月',
    color: 'text-pink-500',
  },
  {
    icon: 'BookOpen',
    label: '知识库笔记',
    value: 34,
    trend: '+8 本月',
    color: 'text-amber-500',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {MOCK_STATS.map((stat, index) => (
        <Card key={index} className="glass-card hover:border-accent/50 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
                {stat.trend && (
                  <p className="text-xs text-green-500 mt-2 flex items-center space-x-1">
                    <SafeIcon name="TrendingUp" className="h-3 w-3" />
                    <span>{stat.trend}</span>
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                <SafeIcon name={stat.icon} className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
