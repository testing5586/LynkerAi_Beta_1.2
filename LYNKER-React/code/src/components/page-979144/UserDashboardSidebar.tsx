
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

const menuItems = [
  {
    id: 'profile',
    label: '个人资料',
    icon: 'User',
    href: './page-979334.html',
  },
  {
    id: 'true-chart',
    label: '我的真命盘',
    icon: 'Sparkles',
    href: './page-979144.html',
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
    href: './page-979399.html',
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
    icon: 'Settings',
    href: './page-979411.html',
  },
  {
    id: 'billing',
    label: '付款设置',
    icon: 'CreditCard',
    href: './page-979468.html',
  },
];

export default function UserDashboardSidebar({ currentPage = 'true-chart' }: UserDashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } overflow-y-auto`}
    >
      {/* Collapse Button */}
      <div className="p-4 flex justify-end">
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
      <nav className="space-y-2 px-3">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/70 hover:bg-muted hover:text-foreground'
            }`}
            title={isCollapsed ? item.label : undefined}
          >
            <SafeIcon name={item.icon} className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </a>
        ))}
      </nav>

      {!isCollapsed && (
        <>
          <Separator className="my-4" />

          {/* Quick Actions */}
          <div className="px-3 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase px-3 py-2">
              快速操作
            </p>
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              asChild
            >
              <a href="./home-page.html">
                <SafeIcon name="Home" className="h-4 w-4 mr-2" />
                返回首页
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              asChild
            >
              <a href="./knowledge-base-main.html">
                <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
                知识库
              </a>
            </Button>
          </div>
        </>
      )}
    </aside>
  );
}
