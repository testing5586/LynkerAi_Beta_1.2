
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import SafeIcon from '@/components/common/SafeIcon';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

export default function UserDashboardSidebar({ currentPage = 'annual-fortune' }: UserDashboardSidebarProps) {
  const menuItems = [
    {
      id: 'profile',
      label: '个人资料',
      icon: 'User',
      href: './page-962653.html',
    },
    {
      id: 'true-chart',
      label: '我的真命盘',
      icon: 'Compass',
      href: './page-965422.html',
    },
    {
      id: 'annual-fortune',
      label: '流年运势',
      icon: 'TrendingUp',
      href: './page-971160.html',
    },
    {
      id: 'knowledge',
      label: '知识库',
      icon: 'BookOpen',
      href: './page-962652.html',
    },
    {
      id: 'booking',
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
  ];

  return (
    <Sidebar className="border-r bg-background/50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            个人中心
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={currentPage === item.id}
                  className={`transition-colors ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <a href={item.href} className="flex items-center space-x-3">
                    <SafeIcon name={item.icon} className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
