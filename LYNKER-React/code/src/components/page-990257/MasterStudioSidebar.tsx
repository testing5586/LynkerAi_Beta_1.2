
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

const menuItems = [
  {
    title: '工作室管理',
    items: [
      { label: '基本信息', href: '#basic', icon: 'User' },
      { label: '服务项目', href: '#services', icon: 'Briefcase' },
      { label: '可用时间', href: '#schedule', icon: 'Calendar' },
    ],
  },
  {
    title: '其他功能',
    items: [
      { label: '预约链接管理', href: './appointment-link-creation.html', icon: 'Link' },
      { label: '客户评价', href: '#reviews', icon: 'Star' },
      { label: '收入统计', href: '#earnings', icon: 'TrendingUp' },
    ],
  },
];

export default function MasterStudioSidebar() {
  const [activeItem, setActiveItem] = useState('basic');

  return (
    <Sidebar className="border-r bg-background/50">
      <SidebarContent>
        {/* Header */}
        <div className="px-4 py-6 border-b">
          <h2 className="text-lg font-bold text-gradient-mystical">工作室管理</h2>
          <p className="text-xs text-muted-foreground mt-1">编辑您的工作室信息</p>
        </div>

        {/* Menu Groups */}
        {menuItems.map((group, index) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeItem === item.label}
                      onClick={() => setActiveItem(item.label)}
                      className={`gap-3 ${
                        activeItem === item.label
                          ? 'bg-primary/20 text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        <SafeIcon name={item.icon} className="h-4 w-4" />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer */}
      <SidebarFooter className="p-4 space-y-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full justify-start gap-2"
        >
          <a href="./master-profile.html">
            <SafeIcon name="Eye" className="h-4 w-4" />
            查看公开档案
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-full justify-start gap-2 text-muted-foreground"
        >
          <a href="./master-backend-overview.html">
            <SafeIcon name="ArrowLeft" className="h-4 w-4" />
            返回后台
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
