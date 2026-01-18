
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { cn } from '@/lib/utils';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

export default function UserDashboardSidebar({ currentPage = 'yearly-fortune' }: UserDashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'personal-info',
      label: '个人资料',
      icon: 'User',
      href: './page-979334.html',
    },
    {
      id: 'true-chart',
      label: '我的真命盘',
      icon: 'Compass',
      href: './page-979145.html',
    },
    {
      id: 'yearly-fortune',
      label: '年流年运势',
      icon: 'TrendingUp',
      href: './page-979333.html',
    },
    {
      id: 'knowledge-base',
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
      id: 'ai-settings',
      label: 'AI设置',
      icon: 'Settings',
      href: './page-979411.html',
    },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-64px)] bg-card border-r border-border transition-all duration-300 z-40',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && <h3 className="font-semibold text-sm">用户中心</h3>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <SafeIcon
            name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            className="h-4 w-4"
          />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
              currentPage === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/80 hover:bg-muted'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <SafeIcon name={item.icon} className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </a>
        ))}
      </nav>

      <Separator className="my-4" />

      {/* Additional Settings */}
      <div className="space-y-2 p-4">
        <a
          href="./page-979468.html"
          className={cn(
            'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
            'text-foreground/80 hover:bg-muted'
          )}
          title={isCollapsed ? '付款设置' : undefined}
        >
          <SafeIcon name="CreditCard" className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">付款设置</span>}
        </a>
      </div>
    </aside>
  );
}
