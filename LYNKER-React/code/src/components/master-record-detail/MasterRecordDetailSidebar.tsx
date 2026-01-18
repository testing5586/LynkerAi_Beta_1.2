
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

export default function MasterRecordDetailSidebar() {
const menuItems = [
    {
      icon: 'LayoutDashboard',
      label: '后台概览',
      href: './master-backend-overview.html',
      id: 'i5uma',
    },
    {
      icon: 'Briefcase',
      label: '公开档案页管理',
      href: './master-studio-management.html',
      id: 'igwel',
    },
{
      icon: 'Users',
      label: '客户批命记录总览',
      href: './customer-prognosis-records-view.html',
    },
    {
      icon: 'BookOpen',
      label: '我的预言记录',
      href: './master-prognosis-record.html',
    },
  ];

  const settingsItems = [
    {
      icon: 'Settings',
      label: '账户设置',
      href: './profile-setup-master.html',
    },
    {
      icon: 'Key',
      label: 'API密钥',
      href: './ai-assistant-settings.html',
    },
    {
      icon: 'HardDrive',
      label: '存储管理',
      href: './placeholder.html',
    },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Navigation Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            导航
          </h3>
          <div className="space-y-2">
{menuItems.map((item) => (
               <Button
                 key={item.label}
                 variant="ghost"
                 className="w-full justify-start text-sm"
                 asChild
               >
                 <a href={item.href} {...(item.id && { id: item.id })}>
                   <SafeIcon name={item.icon} className="mr-3 h-4 w-4" />
                   {item.label}
                 </a>
               </Button>
             ))}
          </div>
        </div>

        <Separator />

        {/* Settings Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            设置
          </h3>
          <div className="space-y-2">
            {settingsItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-sm"
                asChild
              >
                <a href={item.href}>
                  <SafeIcon name={item.icon} className="mr-3 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quick Stats */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            统计
          </h3>
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">本月批命</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">应验率</span>
              <span className="font-semibold text-green-500">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">客户满意度</span>
              <span className="font-semibold text-accent">4.9/5</span>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Help Section */}
        <div>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            asChild
          >
            <a href="./placeholder.html">
              <SafeIcon name="HelpCircle" className="mr-3 h-4 w-4" />
              帮助文档
            </a>
          </Button>
        </div>
      </div>
    </aside>
  );
}
