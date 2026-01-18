
import { Card, CardContent } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

export default function QuickStatsSection() {
  const stats = [
    {
      icon: 'Users',
      label: '认证命理师',
      value: '500+',
      description: '来自全球的专业命理师',
    },
    {
      icon: 'Heart',
      label: '满意度',
      value: '98%',
      description: '用户好评率',
    },
    {
      icon: 'Clock',
      label: '平均响应',
      value: '5分钟',
      description: '快速预约与咨询',
    },
    {
      icon: 'TrendingUp',
      label: '累计咨询',
      value: '50万+',
      description: '成功的命理指引',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="glass-card border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
                  <SafeIcon name={stat.icon} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gradient-mystical">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
