
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface UserActivityFeedProps {}

export default function UserActivityFeed({}: UserActivityFeedProps) {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'post',
      title: '如何理解八字中的十神关系',
      description: '分享了一篇关于八字十神的深度分析文章',
      timestamp: '2天前',
      likes: 24,
      comments: 8,
      icon: 'MessageSquare',
    },
    {
      id: 2,
      type: 'consultation',
      title: '完成了与命理师李老师的咨询',
      description: '进行了一次关于事业发展的命理咨询',
      timestamp: '5天前',
      likes: 12,
      comments: 3,
      icon: 'Video',
    },
    {
      id: 3,
      type: 'match',
      title: '与用户"星月之光"成为同命好友',
      description: '发现了一位命盘相匹配的用户',
      timestamp: '1周前',
      likes: 8,
      comments: 2,
      icon: 'Users',
    },
    {
      id: 4,
      type: 'knowledge',
      title: '在知识库中保存了3条预测记录',
      description: '整理了最近的咨询笔记和预言应验情况',
      timestamp: '1周前',
      likes: 5,
      comments: 1,
      icon: 'BookOpen',
    },
    {
      id: 5,
      type: 'vote',
      title: '参与了论坛投票：紫微斗数的准确性',
      description: '投票支持"非常准确"选项',
      timestamp: '2周前',
      likes: 3,
      comments: 0,
      icon: 'ThumbsUp',
    },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <SafeIcon name="Activity" className="w-5 h-5" />
          <span>最近活动</span>
        </CardTitle>
        <CardDescription>您在平台上的活动记录</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex space-x-4 pb-4 last:pb-0 last:border-0 border-b border-border/50">
              {/* Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <SafeIcon name={activity.icon} className="w-5 h-5 text-primary" />
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 h-12 bg-border/50 mt-2" />
                )}
              </div>

              {/* Activity Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-sm">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <SafeIcon name="Heart" className="w-4 h-4" />
                    <span>{activity.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <SafeIcon name="MessageCircle" className="w-4 h-4" />
                    <span>{activity.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <SafeIcon name="Share2" className="w-4 h-4" />
                    <span>分享</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 pt-6 border-t text-center">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            查看更多活动 →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
