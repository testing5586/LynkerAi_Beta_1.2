
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import SafeIcon from '@/components/common/SafeIcon';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

export default function UserDashboardSidebar({ currentPage = 'ai_settings' }: UserDashboardSidebarProps) {
  const menuItems = [
    {
      id: 'personal_info',
      label: '个人资料',
      icon: 'User',
      href: './page-962653.html',
    },
    {
      id: 'true_chart',
      label: '我的真命盘',
      icon: 'Compass',
      href: './page-962648.html',
    },
    {
      id: 'yearly_fortune',
      label: '流年运势',
      icon: 'TrendingUp',
      href: './page-962654.html',
    },
    {
      id: 'knowledge_base',
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
      id: 'ai_settings',
      label: 'AI设置',
      icon: 'Settings',
      href: './page-962650.html',
    },
    {
      id: 'payment_settings',
      label: '付款设置',
      icon: 'CreditCard',
      href: './page-962649.html',
    },
  ];

  return (
    <Sidebar variant="inset" className="top-[--header-height] h-[calc(100vh-var(--header-height))]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold mb-4">
            个人中心
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={currentPage === item.id}
                  className={currentPage === item.id ? 'bg-primary text-primary-foreground' : ''}
                >
                  <a href={item.href} className="flex items-center space-x-2">
                    <SafeIcon name={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
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
