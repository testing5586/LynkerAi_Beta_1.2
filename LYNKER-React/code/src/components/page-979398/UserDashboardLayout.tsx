
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import AIAssistantFloat from '@/components/common/AIAssistantFloat';

interface UserDashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export default function UserDashboardLayout({
  children,
  activeTab = 'booking',
}: UserDashboardLayoutProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const menuItems = [
    {
      id: 'profile',
      label: '个人资料',
      icon: 'User',
      href: './page-979334.html',
    },
    {
      id: 'true-chart',
      label: '我的真命盘',
      icon: 'Sparkles',
      href: './page-979145.html',
    },
    {
      id: 'yearly-fortune',
      label: '年流年运势',
      icon: 'TrendingUp',
      href: './page-979336.html',
    },
    {
      id: 'knowledge',
      label: '知识库',
      icon: 'BookOpen',
      href: './page-979401.html',
    },
    {
      id: 'booking',
      label: '预约',
      icon: 'Calendar',
      href: './page-979398.html',
    },
    {
      id: 'ai-setting',
      label: 'AI设置',
      icon: 'Settings',
      href: './page-979411.html',
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Left Sidebar */}
      <aside className="w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-6 space-y-2">
          <h2 className="text-lg font-bold text-gradient-mystical mb-6">用户中心</h2>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  currentTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                }`}
              >
                <SafeIcon name={item.icon} className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-4" />

        {/* Quick Links */}
        <div className="p-6 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            快速链接
          </h3>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            asChild
          >
            <a href="./prognosis-service-entry.html">
              <SafeIcon name="Sparkles" className="h-4 w-4 mr-2" />
              预约命理师
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            asChild
          >
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              知识库
            </a>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* AI Assistant Float */}
      <AIAssistantFloat client:load />
    </div>
  );
}
