
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

export default function UserDashboardSidebar({ currentPage = 'knowledge_base' }: UserDashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = MOCK_USER_SETTINGS_NAV;

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-card border-r transition-all duration-300 flex flex-col h-[calc(100vh-64px)] sticky top-16`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-semibold text-foreground">控制中心</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <SafeIcon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

{/* Navigation Items */}
       <nav className="flex-1 overflow-y-auto p-2 space-y-1">
         {navItems.map((item) => {
const isActive = currentPage === item.id;
              const href = item.id === 'true_chart' ? './page-979145.html' : item.id === 'knowledge_base' ? './page_979401.html' : item.id === 'appointments' ? './page_979400.html' : item.id === 'payment' ? './page_979468.html' : `/${item.targetPageId}.html`;
              const elementId = item.id === 'true_chart' ? 'iwwvt' : item.id === 'knowledge_base' ? 'is2vt' : item.id === 'appointments' ? 'ivnrt' : item.id === 'payment' ? 'iqb6bt' : undefined;
           return (
             <a
               key={item.id}
               id={elementId}
               href={href}
               className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${
                 isActive
                   ? 'bg-primary text-primary-foreground'
                   : 'text-foreground/70 hover:bg-muted hover:text-foreground'
               }`}
               title={item.title}
             >
               <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
               {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
             </a>
           );
         })}
       </nav>

      <Separator />

      {/* Footer Actions */}
      <div className="p-2 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start text-xs h-9"
          asChild
        >
          <a href="./home-page.html">
            <SafeIcon name="Home" className="h-4 w-4 mr-2" />
            {!isCollapsed && '返回首页'}
          </a>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-xs h-9 text-destructive hover:text-destructive"
        >
          <SafeIcon name="LogOut" className="h-4 w-4 mr-2" />
          {!isCollapsed && '退出登录'}
        </Button>
      </div>
    </aside>
  );
}
