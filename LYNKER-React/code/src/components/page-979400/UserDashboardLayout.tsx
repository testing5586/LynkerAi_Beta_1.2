
import { ReactNode } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export default function UserDashboardLayout({ children, activeTab = 'profile' }: UserDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
          <SidebarHeader className="border-b border-border/30 px-4 py-6">
            <h2 className="text-lg font-bold text-gradient-mystical">用户中心</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="space-y-2 px-2">
              {MOCK_USER_SETTINGS_NAV.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.id}
                    className={`rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <a href={`./${item.targetPageId}.html`} className="flex items-center space-x-3">
                      <SafeIcon name={item.iconName} className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex flex-col flex-1">
          <main className="flex-1 overflow-auto">
            <div className="container max-w-6xl mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
