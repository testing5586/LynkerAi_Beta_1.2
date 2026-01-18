
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
import { MOCK_USER_BACKEND_NAV } from '@/data/user_backend';

export default function UserBackendSidebar() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['main']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const menuGroups = [
    {
      id: 'main',
      label: '主菜单',
      items: MOCK_USER_BACKEND_NAV,
    },
    {
      id: 'settings',
      label: '设置',
      items: [
        {
          id: 'profile',
          title: '个人资料',
          iconName: 'User' as const,
          description: '编辑个人信息和隐私设置',
          targetPageId: 'profile_setup_user',
        },
        {
          id: 'ai_settings',
          title: 'AI助手设置',
          iconName: 'Settings' as const,
          description: '配置AI助手和API密钥',
          targetPageId: 'ai_assistant_settings',
        },
        {
          id: 'privacy',
          title: '隐私设置',
          iconName: 'Lock' as const,
          description: '管理数据可见性和权限',
          targetPageId: 'placeholder',
        },
      ],
    },
  ];

  const getPageRoute = (pageId: string): string => {
    const routes: Record<string, string> = {
      page_944726: './page-944726.html',
      homology_match_discovery: './homology-match-discovery.html',
      page_944865: './page-944865.html',
      knowledge_base_main: './knowledge-base-main.html',
      profile_setup_user: './profile-setup-user.html',
      ai_assistant_settings: './ai-assistant-settings.html',
      placeholder: '#',
    };
    return routes[pageId] || '#';
  };

  return (
    <Sidebar variant="inset" className="top-[--header-height] h-[calc(100vh-var(--header-height))]">
      <SidebarContent>
        {menuGroups.map((group) => (
          <div key={group.id}>
            <SidebarGroup>
              <SidebarGroupLabel
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleGroup(group.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{group.label}</span>
                  <SafeIcon
                    name={expandedGroups.includes(group.id) ? 'ChevronDown' : 'ChevronRight'}
                    className="h-4 w-4"
                  />
                </div>
              </SidebarGroupLabel>

              {expandedGroups.includes(group.id) && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          className="hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <a href={getPageRoute(item.targetPageId)}>
                            <SafeIcon name={item.iconName} className="h-4 w-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
            {group.id === 'main' && <SidebarSeparator />}
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./placeholder.html">
              <SafeIcon name="HelpCircle" className="mr-2 h-4 w-4" />
              帮助中心
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
            <SafeIcon name="LogOut" className="mr-2 h-4 w-4" />
            退出登录
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
