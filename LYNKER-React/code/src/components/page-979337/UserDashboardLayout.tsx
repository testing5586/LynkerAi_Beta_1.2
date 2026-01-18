
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export default function UserDashboardLayout({
  children,
  activeTab = 'profile',
}: UserDashboardLayoutProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleNavClick = (targetPageId: string) => {
    // Navigate to the target page
    window.location.href = `./${targetPageId}.html`;
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-6 space-y-2">
          <h2 className="text-lg font-bold text-gradient-mystical mb-6">用户中心</h2>
          
          <nav className="space-y-1">
            {MOCK_USER_SETTINGS_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetPageId)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  currentTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                }`}
              >
                <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </nav>

          <Separator className="my-6" />

          {/* Additional Actions */}
          <div className="space-y-2">
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
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              asChild
            >
              <a href="./homology-match-discovery.html">
                <SafeIcon name="Users" className="h-4 w-4 mr-2" />
                同命匹配
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              asChild
            >
              <a href="./page-944865.html">
                <SafeIcon name="Heart" className="h-4 w-4 mr-2" />
                灵友圈
              </a>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl px-6 py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
