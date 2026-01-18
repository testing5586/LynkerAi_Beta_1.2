
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface SettingsSidebarProps {
  currentPage?: string;
}

const menuItems = [
  {
    id: 'profile',
    label: '个人资料',
    icon: 'User',
    href: './page-979337.html',
  },
  {
    id: 'true-chart',
    label: '我的真命盘',
    icon: 'Compass',
    href: './page-979145.html',
  },
  {
    id: 'yearly-fortune',
    label: '年流年运势',
    icon: 'TrendingUp',
    href: './page-979336.html',
  },
  {
    id: 'knowledge-base',
    label: '知识库',
    icon: 'BookOpen',
    href: './page-979401.html',
  },
  {
    id: 'booking',
    label: '预约',
    icon: 'Calendar',
    href: './page-979400.html',
  },
  {
    id: 'ai-settings',
    label: 'AI设置',
    icon: 'Zap',
    href: './page-1035309.html',
  },
  {
    id: 'payment',
    label: '付款设置',
    icon: 'CreditCard',
    href: './page-979468.html',
  },
];

export default function SettingsSidebar({ currentPage = 'ai-settings' }: SettingsSidebarProps) {
  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-6 space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          设置菜单
        </h2>
        
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 ${
              currentPage === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/70 hover:text-foreground'
            }`}
            asChild
          >
            <a href={item.href}>
              <SafeIcon name={item.icon} className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {currentPage === item.id && (
                <SafeIcon name="ChevronRight" className="h-4 w-4" />
              )}
            </a>
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="px-6 py-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          asChild
        >
          <a href="./home-page.html">
            <SafeIcon name="LogOut" className="h-4 w-4" />
            返回首页
          </a>
        </Button>
      </div>
    </aside>
  );
}
