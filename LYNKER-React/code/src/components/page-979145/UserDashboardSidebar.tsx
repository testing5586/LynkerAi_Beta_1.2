
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';
import type { IconName } from '@/types';

export default function UserDashboardSidebar() {
  const [activeItem, setActiveItem] = useState('true_chart');

  const navItems = MOCK_USER_SETTINGS_NAV;

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col h-[calc(100vh-64px)] sticky top-16">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold text-gradient-mystical">用户中心</h2>
        <p className="text-xs text-muted-foreground mt-1">个人资料管理</p>
      </div>

{/* Navigation Items */}
       <nav className="flex-1 overflow-y-auto p-4 space-y-2">
         {navItems.map((item) => {
const href = item.id === 'true_chart' ? './page-979145.html' : item.id === 'knowledge_base' ? './page_979401.html' : item.id === 'appointments' ? './page_979400.html' : item.id === 'payment' ? './page_979468.html' : `/${item.targetPageId}.html`;
             const elementId = item.id === 'true_chart' ? 'ir20m' : item.id === 'knowledge_base' ? 'il304' : item.id === 'appointments' ? 'iq1ip' : item.id === 'payment' ? 'infz6' : undefined;
           return (
             <a
               key={item.id}
               id={elementId}
               href={href}
               onClick={() => setActiveItem(item.id)}
               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                 activeItem === item.id
                   ? 'bg-primary text-primary-foreground shadow-soft'
                   : 'text-foreground/70 hover:bg-muted hover:text-foreground'
               }`}
             >
               <SafeIcon name={item.iconName as IconName} className="h-5 w-5 flex-shrink-0" />
               <span className="text-sm font-medium">{item.title}</span>
             </a>
           );
         })}
       </nav>

      <Separator />

      {/* Footer Actions */}
<div className="p-4 space-y-2 border-t">
        <Button variant="ghost" className="w-full justify-start text-xs text-destructive hover:text-destructive" asChild>
          <a href="./home-page.html">
            <SafeIcon name="LogOut" className="h-4 w-4 mr-2" />
            返回首页
          </a>
        </Button>
      </div>
    </aside>
  );
}
