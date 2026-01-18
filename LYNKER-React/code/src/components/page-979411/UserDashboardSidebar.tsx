
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_SETTINGS_NAV } from '@/data/user_settings';

interface UserDashboardSidebarProps {
  activeItem?: string;
}

export default function UserDashboardSidebar({ activeItem = 'profile' }: UserDashboardSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-card/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-gradient-mystical mb-2">用户中心</h2>
          <p className="text-xs text-muted-foreground">管理您的个人信息和设置</p>
        </div>

        <Separator />

        {/* Navigation Items */}
        <nav className="space-y-2">
          {MOCK_USER_SETTINGS_NAV.map((item) => (
            <a
              key={item.id}
              href={`./${item.targetPageId}.html`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeItem === item.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-foreground/80 hover:bg-muted/50'
              }`}
            >
              <SafeIcon name={item.iconName} className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.title}</span>
              {activeItem === item.id && (
                <SafeIcon name="ChevronRight" className="h-4 w-4 ml-auto" />
              )}
            </a>
          ))}
        </nav>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground px-4">快速操作</p>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            asChild
          >
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              知识库
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            asChild
          >
            <a href="./prognosis-service-entry.html">
              <SafeIcon name="Sparkles" className="h-4 w-4 mr-2" />
              命理服务
            </a>
          </Button>
        </div>

        <Separator />

        {/* Help Section */}
        <Card className="bg-muted/30 border-0 p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="HelpCircle" className="h-4 w-4 text-accent" />
              <p className="text-sm font-semibold">需要帮助？</p>
            </div>
            <p className="text-xs text-muted-foreground">
              查看我们的帮助文档或联系客服支持
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              asChild
            >
              <a href="./placeholder.html">
                查看帮助文档
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}
