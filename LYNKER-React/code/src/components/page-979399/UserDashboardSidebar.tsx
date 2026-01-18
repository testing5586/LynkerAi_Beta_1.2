
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface UserDashboardSidebarProps {
  currentTab?: string;
}

export default function UserDashboardSidebar({ currentTab = 'knowledge' }: UserDashboardSidebarProps) {
  const menuItems = [
    {
      id: 'profile',
      label: '个人资料',
      icon: 'User',
      href: './page-979334.html',
    },
    {
      id: 'truechart',
      label: '我的真命盘',
      icon: 'Compass',
      href: './page-979145.html',
    },
    {
      id: 'prediction',
      label: '年流年运势',
      icon: 'TrendingUp',
      href: './page-979336.html',
    },
    {
      id: 'knowledge',
      label: '知识库',
      icon: 'BookOpen',
      href: './page-979401.html',
    },
    {
      id: 'booking',
      label: '预约',
      icon: 'Calendar',
      href: './page-979400.html',
    },
    {
      id: 'ai-setting',
      label: 'AI设置',
      icon: 'Zap',
      href: './page-979411.html',
    },
    {
      id: 'billing',
      label: '付款设置',
      icon: 'CreditCard',
      href: './page-979468.html',
    },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm overflow-y-auto sticky top-16 h-[calc(100vh-64px)]">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-gradient-mystical mb-2">个人中心</h2>
          <p className="text-xs text-muted-foreground">管理您的账户和设置</p>
        </div>

        <Separator />

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentTab === item.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`}
            >
              <SafeIcon name={item.icon} className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {currentTab === item.id && (
                <SafeIcon name="ChevronRight" className="w-4 h-4 ml-auto" />
              )}
            </a>
          ))}
        </nav>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            快速操作
          </p>
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="w-4 h-4 mr-2" />
              主知识库
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
            <a href="./prognosis-service-entry.html">
              <SafeIcon name="Sparkles" className="w-4 h-4 mr-2" />
              预约咨询
            </a>
          </Button>
        </div>

        <Separator />

        {/* Storage Info */}
        <Card className="glass-card border-primary/20 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">存储空间</span>
              <span className="text-xs font-bold text-accent">2.5 GB / 10 GB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-mystical-gradient h-2 rounded-full"
                style={{ width: '25%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              剩余 7.5 GB 可用空间
            </p>
          </div>
        </Card>

        {/* Help */}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          asChild
        >
          <a href="./placeholder.html">
            <SafeIcon name="HelpCircle" className="w-4 h-4 mr-2" />
            帮助中心
          </a>
        </Button>
      </div>
    </aside>
  );
}
