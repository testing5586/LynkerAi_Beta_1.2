
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardSidebarProps {
  activeItem?: string;
}

export default function UserDashboardSidebar({ activeItem = 'profile' }: UserDashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-card border-r border-border transition-all duration-300 flex flex-col h-[calc(100vh-64px)] sticky top-16`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && <h3 className="font-semibold text-sm">个人中心</h3>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          <SafeIcon
            name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            className="h-4 w-4"
          />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {MOCK_USER_SETTINGS_NAV.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <a
              key={item.id}
              href={`./${item.targetPageId}.html`}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`}
              title={item.title}
            >
              <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
            </a>
          );
        })}
      </nav>

      <Separator />

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="p-4 space-y-3 border-t border-border">
          <Card className="bg-muted/50 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="Info" className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium">使用提示</span>
            </div>
            <p className="text-xs text-muted-foreground">
              点击左侧菜单项切换不同的管理功能。所有数据实时同步到云端。
            </p>
          </Card>
          <Button variant="outline" className="w-full text-xs" asChild>
            <a href="./home-page.html">
              <SafeIcon name="Home" className="h-3 w-3 mr-1" />
              返回首页
            </a>
          </Button>
        </div>
      )}
    </aside>
  );
}
