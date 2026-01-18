
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface SettingsMenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const SETTINGS_MENU: SettingsMenuItem[] = [
  { id: 'profile', label: '个人资料', icon: 'User', href: './page-962653.html' },
  { id: 'birth-chart', label: '我的真命盘', icon: 'Zap', href: './page-962648.html' },
  { id: 'yearly-fortune', label: '流年运势', icon: 'TrendingUp', href: './page-962654.html' },
  { id: 'knowledge-base', label: '知识库', icon: 'BookOpen', href: './page-962652.html' },
  { id: 'appointments', label: '预约', icon: 'Calendar', href: './page-962651.html' },
  { id: 'ai-settings', label: 'AI设置', icon: 'Sparkles', href: './page-962650.html' },
  { id: 'payment', label: '付款设置', icon: 'CreditCard', href: './page-962649.html' },
];

export default function UserSettingsSidebar() {
  const [activeMenu, setActiveMenu] = useState('ai-settings');

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold text-gradient-mystical">设置中心</h2>
        <p className="text-xs text-muted-foreground mt-1">管理您的账户和偏好设置</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {SETTINGS_MENU.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeMenu === item.id
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-foreground/70 hover:bg-muted hover:text-foreground'
            }`}
          >
            <SafeIcon name={item.icon} className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      <Separator />

      {/* Footer Actions */}
      <div className="p-4 space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
          <a href="./page-944686.html">
            <SafeIcon name="Home" className="h-4 w-4 mr-2" />
            返回首页
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" asChild>
          <a href="./index.html">
            <SafeIcon name="LogOut" className="h-4 w-4 mr-2" />
            退出登录
          </a>
        </Button>
      </div>
    </aside>
  );
}
