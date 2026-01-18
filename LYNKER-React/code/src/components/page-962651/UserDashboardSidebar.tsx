
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { cn } from '@/lib/utils';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

export default function UserDashboardSidebar({ currentPage = 'appointments' }: UserDashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      id: 'fortune',
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
      id: 'appointments',
      label: '预约',
      icon: 'Calendar',
      href: './page-962651.html',
    },
    {
      id: 'ai-settings',
      label: 'AI设置',
      icon: 'Settings',
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
    <aside className={cn(
      'border-r bg-card transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="font-semibold text-lg text-gradient-mystical">我的后台</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <SafeIcon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              className="h-4 w-4"
            />
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors',
                currentPage === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <SafeIcon name={item.icon} className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </a>
          ))}
        </nav>

        <Separator />

        {/* Footer */}
        <div className="p-4 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
            <a href="./home-page.html">
              <SafeIcon name="Home" className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>返回首页</span>}
            </a>
          </Button>
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground text-center">
              灵客AI © 2025
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
