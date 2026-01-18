
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface ProfileSidebarProps {
  currentPage: 'profile' | 'bazi' | 'yearly' | 'knowledge' | 'appointment' | 'ai' | 'payment';
}

export default function ProfileSidebar({ currentPage }: ProfileSidebarProps) {
  const menuItems = [
    {
      id: 'profile',
      label: '个人资料',
      icon: 'User',
      href: './page-962653.html',
    },
    {
      id: 'bazi',
      label: '我的真命盘',
      icon: 'Compass',
      href: './page-962648.html',
    },
    {
      id: 'yearly',
      label: '流年运势',
      icon: 'TrendingUp',
      href: './page-962654.html',
    },
    {
      id: 'knowledge',
      label: '知识库',
      icon: 'BookOpen',
      href: './page-962652.html',
    },
    {
      id: 'appointment',
      label: '预约',
      icon: 'Calendar',
      href: './page-962651.html',
    },
    {
      id: 'ai',
      label: 'AI设置',
      icon: 'Sparkles',
      href: './page-962650.html',
    },
    {
      id: 'payment',
      label: '付款设置',
      icon: 'CreditCard',
      href: './page-962649.html',
    },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-6 space-y-2">
        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="Settings" className="h-5 w-5" />
          <span>设置</span>
        </h2>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <a href={item.href}>
                <SafeIcon name={item.icon} className="mr-3 h-4 w-4" />
                <span>{item.label}</span>
              </a>
            </Button>
          ))}
        </nav>
      </div>

      {/* Quick Stats Card */}
      <div className="p-6 border-t">
        <Card className="glass-card p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">账户状态</span>
              <span className="text-xs font-semibold text-green-500 flex items-center space-x-1">
                <SafeIcon name="CheckCircle" className="h-3 w-3" />
                <span>已验证</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">加入时间</span>
              <span className="text-xs font-semibold">2025年8月</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">命盘状态</span>
              <span className="text-xs font-semibold text-accent">待验证</span>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
