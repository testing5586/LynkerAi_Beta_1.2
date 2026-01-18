
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'primary' | 'accent' | 'secondary';
}

export default function QuickAccessSection() {
  const quickAccessItems: QuickAccessItem[] = [
    {
      id: 'knowledge-base',
      title: '知识库',
      description: '查看您的预测记录和AI生成的笔记',
      icon: 'BookOpen',
      href: './knowledge-base-main.html',
      color: 'primary',
    },
    {
      id: 'forum',
      title: '论坛',
      description: '与其他用户分享命理经验和讨论',
      icon: 'MessageSquare',
      href: './forum-homepage.html',
      color: 'accent',
    },
    {
      id: 'homology-match',
      title: '同命匹配',
      description: '发现与您命盘相匹配的同命人',
      icon: 'Users',
      href: './homology-match-discovery.html',
      color: 'secondary',
    },
    {
      id: 'master-backend',
      title: '命理师后台',
      description: '命理师专用管理后台（仅限Pro用户）',
      icon: 'LayoutDashboard',
      href: './master-backend-overview.html',
      color: 'primary',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 hover:bg-primary/20 text-primary',
    accent: 'bg-accent/10 hover:bg-accent/20 text-accent',
    secondary: 'bg-secondary/10 hover:bg-secondary/20 text-secondary',
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">快速访问</h2>
          <p className="text-muted-foreground">
            探索平台的其他功能和服务
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => (
            <Card
              key={item.id}
              className="glass-card hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => {
                window.location.href = item.href;
              }}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${colorClasses[item.color]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <SafeIcon name={item.icon} className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {item.description}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start group-hover:translate-x-1 transition-transform"
                  asChild
                >
                  <a href={item.href}>
                    进入
                    <SafeIcon name="ArrowRight" className="ml-auto h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-start space-x-4">
            <SafeIcon name="Info" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">新用户提示</h3>
              <p className="text-sm text-muted-foreground">
                首次使用？建议您先完善个人资料，这样可以获得更精准的命理师推荐和同命匹配结果。
                <a href="./profile-setup-user.html" className="text-primary hover:underline ml-1">
                  立即完善资料 →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
