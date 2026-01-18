
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';
import MasterUserMenu from './MasterUserMenu';

export default function MasterSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const master = {
    name: '李大师',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    specialty: '八字命理',
    rating: 4.8,
    totalConsultations: 156,
  };

  const mainMenuItems = [
    {
      label: '后台概览',
      icon: 'LayoutDashboard',
      href: './master-backend-overview.html',
      active: true,
    },
{
      label: '公开档案页管理',
      icon: 'Store',
      href: './page-990256.html',
    },
{
      label: '我的预言记录',
      icon: 'Users',
      href: './master-prognosis-record.html',
      id: 'ifocn',
    },
{
      label: '顾客批命记录总览',
      icon: 'Calendar',
      href: './customer-prognosis-records-view.html',
      id: 'ic1g8',
      spanId: 'ic79kj',
    },
    {
      label: '知识库',
      icon: 'BookOpen',
      href: './knowledge-base-main.html',
    },
  ];

const settingsMenuItems = [
    {
      label: '个人资料',
      icon: 'Settings',
      href: './profile-setup-master.html',
      id: 'inskrw',
    },
    {
      label: 'AI助手配置',
      icon: 'Sparkles',
      href: './ai-assistant-settings.html',
    },
    {
      label: '支付设置',
      icon: 'CreditCard',
      href: './placeholder.html',
    },
    {
      label: '隐私设置',
      icon: 'Lock',
      href: './placeholder.html',
    },
  ];

return (
    <aside className="w-64 border-r bg-background/50 backdrop-blur-sm flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Master Profile Card */}
        <div className="px-2 py-4">
          <div className="px-2 py-4 rounded-lg bg-muted/50 border border-muted">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 ring-2 ring-accent">
                <AvatarImage src={master.avatar} alt={master.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {master.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{master.name}</p>
                <p className="text-xs text-muted-foreground truncate">{master.specialty}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-background/50 rounded p-2 text-center">
                <p className="font-bold text-accent">{master.rating}</p>
                <p className="text-muted-foreground">评分</p>
              </div>
              <div className="bg-background/50 rounded p-2 text-center">
                <p className="font-bold text-primary">{master.totalConsultations}</p>
                <p className="text-muted-foreground">咨询次</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border my-2" />

        {/* Main Navigation */}
        <nav className="px-2 py-4">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">导航</p>
          <div className="space-y-1">
{mainMenuItems.map((item) => (
              <a
                 key={item.label}
                href={item.href}
                id={item.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <SafeIcon name={item.icon} className="h-4 w-4" />
                <span id={item.spanId} className="hidden sm:inline">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="h-px bg-border my-2" />

        {/* Settings */}
        <nav className="px-2 py-4">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">设置</p>
<div className="space-y-1">
             {settingsMenuItems.map((item) => (
               <a
                 key={item.label}
                 href={item.href}
                 className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
               >
                 <SafeIcon name={item.icon} className="h-4 w-4" />
                 <span id={item.id} className="hidden sm:inline">{item.label}</span>
               </a>
             ))}
           </div>
        </nav>

        <div className="h-px bg-border my-2" />

        {/* Quick Actions */}
        <div className="px-2 py-4">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">快速操作</p>
          <div className="space-y-2 px-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => window.location.href = './appointment-link-creation.html'}
            >
<SafeIcon name="Plus" className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">预约管理</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => window.location.href = './master-profile.html'}
            >
              <SafeIcon name="Edit" className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">编辑档案</span>
            </Button>
          </div>
        </div>
      </div>

{/* Footer - Master User Menu */}
      <div className="border-t p-4 flex justify-center">
      </div>
    </aside>
  );
}
