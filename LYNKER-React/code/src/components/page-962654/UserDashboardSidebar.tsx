
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import SafeIcon from '@/components/common/SafeIcon';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'profile',
    label: '个人资料',
    icon: 'User',
    href: './page-962653.html',
  },
  {
    id: 'birth-chart',
    label: '我的真命盘',
    icon: 'Compass',
    href: './page-962648.html',
  },
  {
    id: 'yearly-fortune',
    label: '流年运势',
    icon: 'TrendingUp',
    href: './page-962654.html',
    isActive: true,
  },
  {
    id: 'knowledge-base',
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

export default function UserDashboardSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent id="irh7v">
        <SidebarGroup id="i1o8m">
          <SidebarGroupLabel>用户中心</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={item.isActive ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <a href={item.href} className="flex items-center gap-2">
                      <SafeIcon name={item.icon} className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
