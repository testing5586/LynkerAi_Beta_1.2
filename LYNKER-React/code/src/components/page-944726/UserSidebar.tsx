
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SafeIcon from '@/components/common/SafeIcon';

export default function UserSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: '批命记录',
      icon: 'FileText',
      href: './page-944726.html',
      isActive: true,
    },
    {
      title: '同命匹配',
      icon: 'Users',
      href: './homology-match-discovery.html',
    },
    {
      title: '灵友圈',
      icon: 'Heart',
      href: './page-944865.html',
    },
  ];

  const settingsItems = [
    {
      title: '个人资料',
      icon: 'User',
      href: './profile-setup-user.html',
    },
    {
      title: '隐私设置',
      icon: 'Lock',
      href: './placeholder.html',
    },
    {
      title: 'AI助手设置',
      icon: 'Settings',
      href: './ai-assistant-settings.html',
    },
  ];

  const user = {
    name: '星空下的观测者Q',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
    uid: 'USER_001',
    subscription: '标准会员',
    apiTokenUsage: '2,450 / 10,000',
  };

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarContent>
        {/* User Profile Section */}
        <SidebarGroup>
          <div className="px-4 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-sidebar-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60">{user.uid}</p>
                  </div>
                  <SafeIcon name="ChevronDown" className="h-4 w-4 text-sidebar-foreground/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.uid}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <SafeIcon name="Zap" className="mr-2 h-4 w-4" />
                  <span className="text-xs">{user.subscription}</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <SafeIcon name="Cpu" className="mr-2 h-4 w-4" />
                  <span className="text-xs">API Token: {user.apiTokenUsage}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <SafeIcon name="LogOut" className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>导航</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={item.isActive ? 'bg-sidebar-accent' : ''}
                  >
                    <a href={item.href} className="flex items-center space-x-2">
                      <SafeIcon name={item.icon} className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>设置</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center space-x-2">
                      <SafeIcon name={item.icon} className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">
            © 2025 灵客AI
          </p>
          <p className="text-xs text-sidebar-foreground/60 text-center mt-1">
            同命相知
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
