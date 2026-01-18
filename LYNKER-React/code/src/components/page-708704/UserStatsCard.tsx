
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';

interface UserStatsCardProps {}

export default function UserStatsCard({}: UserStatsCardProps) {
  // Mock stats data
  const stats = {
    postAccuracy: 78,
    predictionAccuracy: 82,
    communityReputation: 85,
    knowledgeContribution: 72,
    upvotes: 156,
    downvotes: 12,
  };

  const accuracyItems = [
    {
      label: '发帖准确度',
      value: stats.postAccuracy,
      icon: 'MessageSquare',
      color: 'text-blue-500',
    },
    {
      label: '预测准确度',
      value: stats.predictionAccuracy,
      icon: 'Sparkles',
      color: 'text-purple-500',
    },
    {
      label: '社区声誉',
      value: stats.communityReputation,
      icon: 'Heart',
      color: 'text-red-500',
    },
  ];

  return (
    <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
      {accuracyItems.map((item) => (
        <Card key={item.label} className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <SafeIcon name={item.icon} className={`w-5 h-5 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{item.value}%</div>
              <Progress value={item.value} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
