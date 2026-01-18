
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_MASTERS } from '@/data/base-mock';
import { cn } from '@/lib/utils';

export default function MasterRecordSidebar() {
  const currentMaster = MOCK_MASTERS[0];

  const menuItems = [
    {
      title: '后台概览',
      icon: 'LayoutDashboard',
      href: './master-backend-overview.html',
    },
{
      title: '公开档案页管理',
      icon: 'Store',
      href: './page-990256.html',
    },
{
 title: '我的预言记录',
      icon: 'FileText',
      href: './master-prognosis-record.html',
      active: true,
    },
{
      title: '顾客批命记录总览',
      icon: 'Users',
      href: './customer-prognosis-records-view.html',
      elementId: 'irmcf',
    },
  ];

  const settingsItems = [
    {
      title: '个人资料',
      icon: 'User',
      href: './master-profile.html',
    },
    {
      title: '知识库',
      icon: 'BookOpen',
      href: './knowledge-base-main.html',
    },
    {
      title: '设置',
      icon: 'Settings',
      href: './ai-assistant-settings.html',
    },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col h-[calc(100vh-64px)] sticky top-16">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-accent">
            <AvatarImage src={currentMaster.avatarUrl} alt={currentMaster.realName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentMaster.realName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{currentMaster.realName}</p>
            <p className="text-xs text-muted-foreground truncate">{currentMaster.expertise}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Navigation Section */}
        <div className="space-y-2">
          <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            管理
          </h3>
{menuItems.map((item) => (
             <a
               key={item.href}
               href={item.href}
               className={cn(
                 'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                 item.active
                   ? 'bg-primary text-primary-foreground'
                   : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
               )}
             >
               <SafeIcon name={item.icon} className="h-4 w-4" />
               <span id={item.elementId}>{item.title}</span>
             </a>
           ))}
        </div>

        <Separator />

        {/* Settings Section */}
        <div className="space-y-2">
          <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            设置
          </h3>
          {settingsItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <SafeIcon name={item.icon} className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          asChild
        >
          <a href="./home-page.html">
            <SafeIcon name="Home" className="mr-2 h-4 w-4" />
            返回首页
          </a>
        </Button>
      </div>
    </aside>
  );
}
