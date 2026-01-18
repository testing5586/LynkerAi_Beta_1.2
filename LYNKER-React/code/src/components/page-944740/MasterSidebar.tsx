
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

export default function MasterSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock master data
  const master = {
    name: '张三丰 (玄真子)',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/5d8a6ed2-2973-41b9-a0ca-01cee48773d8.png',
    country: 'CN',
    region: '四川成都',
    isPro: true,
  };

  const menuItems = [
    {
      label: '后台概览',
      icon: 'LayoutDashboard',
      href: './master-backend-overview.html',
    },
    {
      label: '工作室管理',
      icon: 'Store',
      href: './master-studio-management.html',
    },
    {
      label: '批命记录',
      icon: 'FileText',
      href: './master-prognosis-record.html',
      isActive: true,
    },
    {
      label: '客户记录',
      icon: 'Users',
      href: './customer-prognosis-records-view.html',
    },
    {
      label: '预约链接',
      icon: 'Link',
      href: './appointment-link-creation.html',
    },
  ];

  const settingsItems = [
    {
      label: '个人资料',
      icon: 'User',
      href: './master-profile.html',
    },
    {
      label: 'AI助手设置',
      icon: 'Settings',
      href: './ai-assistant-settings.html',
    },
    {
      label: '知识库',
      icon: 'BookOpen',
      href: './knowledge-base-main.html',
    },
  ];

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-mystical-gradient flex items-center justify-center">
              <SafeIcon name="Sparkles" className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-sm font-bold text-gradient-mystical">灵客AI</span>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider">
              导航
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={item.isActive ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <a href={item.href} className="flex items-center space-x-2">
                      <SafeIcon name={item.icon} className="h-4 w-4" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* Settings */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider">
              设置
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center space-x-2">
                      <SafeIcon name={item.icon} className="h-4 w-4" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto py-2">
                  <UserAvatar
                    user={master}
                    size="small"
                    showHoverCard={false}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 text-left ml-2">
                      <p className="text-xs font-semibold truncate">{master.name}</p>
                      <p className="text-xs text-muted-foreground">Pro命理师</p>
                    </div>
                  )}
                  <SafeIcon name="ChevronUp" className="h-4 w-4 ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="./master-profile.html" className="cursor-pointer">
                    <SafeIcon name="User" className="mr-2 h-4 w-4" />
                    个人资料
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="./master-studio-management.html" className="cursor-pointer">
                    <SafeIcon name="Store" className="mr-2 h-4 w-4" />
                    工作室管理
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="./ai-assistant-settings.html" className="cursor-pointer">
                    <SafeIcon name="Settings" className="mr-2 h-4 w-4" />
                    设置
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <SafeIcon name="LogOut" className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
