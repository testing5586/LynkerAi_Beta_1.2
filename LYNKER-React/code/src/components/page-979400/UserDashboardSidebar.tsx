
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardSidebarProps {
  currentPage?: string;
}

export default function UserDashboardSidebar({ currentPage = 'appointments' }: UserDashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } overflow-y-auto`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-gradient-mystical">控制中心</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <SafeIcon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            className="h-4 w-4" 
          />
        </Button>
      </div>

      <Separator />

{/* Navigation Items */}
       <nav className="p-2 space-y-1">
         {MOCK_USER_SETTINGS_NAV.map((item) => {
const isActive = currentPage === item.id;
              const href = item.id === 'true_chart' ? './page-979145.html' : item.id === 'knowledge_base' ? './page_979401.html' : item.id === 'appointments' ? './page_979400.html' : item.id === 'payment' ? './page_979468.html' : `./${item.targetPageId}.html`;
              const elementId = item.id === 'true_chart' ? 'ighlh' : item.id === 'knowledge_base' ? 'i4cp4' : item.id === 'appointments' ? 'i32g6' : item.id === 'payment' ? 'iz9kg' : undefined;
           
           return (
             <a
               key={item.id}
               id={elementId}
               href={href}
               className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                 isActive
                   ? 'bg-primary text-primary-foreground shadow-soft'
                   : 'text-foreground/70 hover:bg-muted hover:text-foreground'
               }`}
               title={isCollapsed ? item.title : undefined}
             >
               <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
               {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
             </a>
           );
         })}
       </nav>

      <Separator className="my-4" />

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">快速操作</p>
          <Button 
            variant="outline" 
            className="w-full justify-start text-xs"
            asChild
          >
            <a href="./prognosis-service-entry.html">
              <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
              新增预约
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-xs"
            asChild
          >
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              查看笔记
            </a>
          </Button>
        </div>
      )}
    </aside>
  );
}
