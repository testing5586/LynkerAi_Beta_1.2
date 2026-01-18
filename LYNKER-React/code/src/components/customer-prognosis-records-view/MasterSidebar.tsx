
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

export default function MasterSidebar() {
  const [activeNav, setActiveNav] = useState('records');

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: '后台概览',
      icon: 'LayoutDashboard',
      href: './master-backend-overview.html',
    },
{
      id: 'studio',
      label: '公开档案页管理',
      icon: 'Store',
      href: './page-990256.html',
    },
{
      id: 'records',
      label: '客户批命记录总览',
      icon: 'Archive',
      href: './customer-prognosis-records-view.html',
      isActive: true,
    },
    {
      id: 'knowledge',
      label: '知识库',
      icon: 'BookOpen',
      href: './knowledge-base-main.html',
    },
  ];

  const settingsItems = [
    {
      id: 'profile',
      label: '个人资料',
      icon: 'User',
      href: './master-profile.html',
    },
    {
      id: 'payment',
      label: '支付设置',
      icon: 'CreditCard',
      href: './placeholder.html',
    },
    {
      id: 'api',
      label: 'API设置',
      icon: 'Code',
      href: './placeholder.html',
    },
  ];

  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-mystical-gradient flex items-center justify-center">
            <SafeIcon name="Sparkles" className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm">命理师后台</h2>
            <p className="text-xs text-muted-foreground">工作室管理中心</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-foreground/70 px-2 py-2 uppercase tracking-wider">导航</p>
          <div className="space-y-1">
{navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                {...(item.id === 'studio' && { id: 'ij6wk' })}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <SafeIcon name={item.icon} className="h-4 w-4" />
                <span {...(item.id === 'studio' && { id: 'itee9' })}>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="h-px bg-border my-4" />

        {/* Settings */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-foreground/70 px-2 py-2 uppercase tracking-wider">设置</p>
          <div className="space-y-1">
            {settingsItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <SafeIcon name={item.icon} className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="h-px bg-border my-4" />

        {/* Quick Actions */}
        <div className="p-4">
          <p className="text-xs font-semibold text-foreground/70 px-2 py-2 uppercase tracking-wider">快速操作</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href="./appointment-link-creation.html">
                <SafeIcon name="Link" className="mr-2 h-4 w-4" />
                创建预约链接
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href="./knowledge-base-main.html">
                <SafeIcon name="FileText" className="mr-2 h-4 w-4" />
                查看我的笔记
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <p>已服务客户</p>
            <p className="font-bold text-foreground">2,340+</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a href="./placeholder.html">
              <SafeIcon name="LogOut" className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </aside>
  );
}
