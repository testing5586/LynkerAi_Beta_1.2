
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

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
    id: 'appointments',
    label: '预约链接',
    icon: 'Link',
    href: './appointment-link-creation.html',
  },
  {
    id: 'records',
    label: '客户记录',
    icon: 'FileText',
    href: './customer-prognosis-records-view.html',
  },
];

const settingsItems: NavItem[] = [
  {
    id: 'profile',
    label: '个人档案',
    icon: 'User',
    href: './master-profile.html',
  },
  {
    id: 'knowledge',
    label: '知识库',
    icon: 'BookOpen',
    href: './knowledge-base-main.html',
  },
  {
    id: 'settings',
    label: '账户设置',
    icon: 'Settings',
    href: './ai-assistant-settings.html',
  },
];

export default function MasterSidebar() {
  const [activeItem, setActiveItem] = useState('appointments');

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col h-[calc(100vh-64px)] sticky top-16">
      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          asChild
        >
          <a href="./master-list.html">
            <SafeIcon name="Eye" className="mr-2 h-4 w-4" />
            查看我的档案
          </a>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <SafeIcon name="LogOut" className="mr-2 h-4 w-4" />
          退出登录
        </Button>
      </div>
    </aside>
  );
}
