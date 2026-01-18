
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import SafeIcon from '@/components/common/SafeIcon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { IconName } from '@/types';

interface NavItem {
  id: string;
  title: string;
  iconName: IconName;
  targetPageId: string;
}

interface UserDashboardLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'profile', title: '个人资料', iconName: 'User', targetPageId: 'page_979337' },
  { id: 'true_chart', title: '我的真命盘', iconName: 'Star', targetPageId: 'page_979145' },
{ id: 'yearly_fortune', title: '流年运势', iconName: 'LineChart', targetPageId: 'page_979336' },
  { id: 'knowledge_base', title: '知识库', iconName: 'BookOpen', targetPageId: 'page_979401' },
  { id: 'appointments', title: '预约记录', iconName: 'Calendar', targetPageId: 'page_979400' },
  { id: 'ai_settings', title: 'AI设置', iconName: 'Bot', targetPageId: 'page_979411' },
  { id: 'payment', title: '付款设置', iconName: 'Wallet', targetPageId: 'page_979468' },
];

export default function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
  const [activeNav, setActiveNav] = useState('yearly_fortune');

const getPageRoute = (pageId: string): string => {
    const routes: Record<string, string> = {
      page_979337: './page-979337.html',
      page_979145: './page-979145.html',
page_979336: './page_979336.html',
      page_979401: './page-979401.html',
      page_979400: './page-979400.html',
      page_979411: './page-979411.html',
      page_979468: './page-979468.html',
    };
    return routes[pageId] || '#';
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-6 space-y-2">
          <h2 className="text-lg font-bold text-gradient-mystical mb-6">我的后台</h2>
          
          <nav className="space-y-1">
{NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              const href = getPageRoute(item.targetPageId);
              const elementId = item.id === 'yearly_fortune' ? 'ixpzj' : undefined;
              
              return (
                <a
                  key={item.id}
                  id={elementId}
                  href={href}
                  onClick={() => setActiveNav(item.id)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg glow-primary'
                      : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <Separator className="my-4" />

        {/* Sidebar Footer */}
        <div className="p-6 space-y-3">
          <Button variant="outline" className="w-full justify-start text-xs" asChild>
            <a href="./home-page.html">
              <SafeIcon name="Home" className="h-4 w-4 mr-2" />
              返回首页
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground hover:text-foreground">
            <SafeIcon name="HelpCircle" className="h-4 w-4 mr-2" />
            帮助中心
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
