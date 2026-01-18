
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { UserSettingsNavItemModel } from '@/data/user_settings';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardLayoutProps {
  children: ReactNode;
  currentPath?: string;
}

export default function UserDashboardLayout({
  children,
  currentPath = '/page-979468',
}: UserDashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter nav items - only show first 6 items for this layout
  const navItems = MOCK_USER_SETTINGS_NAV.slice(0, 6);

  const isCurrentPage = (targetPageId: string) => {
    const pageIdToPath: Record<string, string> = {
      'page_962653': '/page-962653',
      'page_962648': '/page-962648',
      'page_962654': '/page-962654',
      'page_962652': '/page-962652',
      'page_962651': '/page-962651',
      'page_962650': '/page-962650',
    };
    return pageIdToPath[targetPageId] === currentPath;
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-card/50 backdrop-blur-sm flex-col">
        <div className="p-6 space-y-2">
          <h2 className="text-lg font-bold text-gradient-mystical">用户中心</h2>
          <p className="text-xs text-muted-foreground">管理您的账户和设置</p>
        </div>

        <Separator />

<nav className="flex-1 p-4 space-y-1 overflow-y-auto">
{navItems.map((item) => (
              <a
                key={item.id}
id={item.id === 'true_chart' ? 'i3ygh' : item.id === 'knowledge_base' ? 'iwkok' : item.id === 'appointments' ? 'i0is6' : item.id === 'ai_settings' ? 'i6v5j' : undefined}
href={item.id === 'knowledge_base' ? './page_979401.html' : item.id === 'appointments' ? './page_979400.html' : item.id === 'ai_settings' ? './page_979411.html' : `./${item.targetPageId}.html`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isCurrentPage(item.targetPageId)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`}
            >
              <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.title}</span>
            </a>
          ))}
        </nav>

        <Separator />

        {/* Additional Settings */}
        <div className="p-4 space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./page-979468.html">
              <SafeIcon name="Wallet" className="h-4 w-4 mr-2" />
              <span className="text-sm">付款设置</span>
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
            <SafeIcon name="LogOut" className="h-4 w-4 mr-2" />
            <span className="text-sm">退出登录</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden fixed bottom-6 left-6 z-40">
          <Button size="icon" className="rounded-full shadow-lg">
            <SafeIcon name="Menu" className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 space-y-2 border-b">
            <h2 className="text-lg font-bold text-gradient-mystical">用户中心</h2>
            <p className="text-xs text-muted-foreground">管理您的账户和设置</p>
          </div>
<nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                id={item.id === 'true_chart' ? 'i3ygh' : undefined}
                href={`./${item.targetPageId}.html`}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isCurrentPage(item.targetPageId)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <SafeIcon name={item.iconName} className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
