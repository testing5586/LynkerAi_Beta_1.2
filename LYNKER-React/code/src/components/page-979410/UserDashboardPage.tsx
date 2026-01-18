
import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserProfilePopover from '@/components/page-979410/UserProfilePopover';

interface DashboardTab {
  id: string;
  name: string;
  icon: string;
  href: string;
}

const dashboardTabs: DashboardTab[] = [
  { id: 'profile', name: '个人资料', icon: 'User', href: './page-979334.html' },
  { id: 'true-chart', name: '我的真命盘', icon: 'Sparkles', href: './page-979145.html' },
  { id: 'yearly', name: '年流年运势', icon: 'TrendingUp', href: './page-979336.html' },
  { id: 'knowledge', name: '知识库', icon: 'BookOpen', href: './page-979401.html' },
  { id: 'booking', name: '预约', icon: 'Calendar', href: './page-979400.html' },
  { id: 'ai-setting', name: 'AI设置', icon: 'Settings', href: './page-979411.html' },
  { id: 'billing', name: '付款设置', icon: 'CreditCard', href: './page-979468.html' },
];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    name: '灵客用户',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    country: 'CN',
    uid: 'UID-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    subscription: '高级会员',
    apiUsage: { used: 8500, total: 10000 },
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar className="border-r bg-background/50 backdrop-blur-sm">
          <SidebarHeader className="border-b px-4 py-4">
            <h2 className="text-lg font-bold text-gradient-mystical">用户中心</h2>
            <p className="text-xs text-muted-foreground mt-1">管理您的账户和设置</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {dashboardTabs.map((tab) => (
                <SidebarMenuItem key={tab.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === tab.id}
                    className={`transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent/10'
                    }`}
                  >
                    <a href={tab.href} onClick={() => setActiveTab(tab.id)}>
                      <SafeIcon name={tab.icon} className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex flex-col">
          <div className="flex-1 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">用户后台管理</h1>
                  <p className="text-muted-foreground">
                    欢迎回来，{user.name}。管理您的账户、知识库和预约。
                  </p>
                </div>
                <UserProfilePopover user={user} />
              </div>

              <Separator className="my-6" />

              {/* Content Area - Placeholder */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="glass-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        订阅状态
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{user.subscription}</span>
                        <Badge className="bg-accent text-accent-foreground">
                          <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
                          活跃
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        API Token使用
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">
                          {user.apiUsage.total - user.apiUsage.used}
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-mystical-gradient h-2 rounded-full"
                            style={{
                              width: `${(user.apiUsage.used / user.apiUsage.total) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          已使用 {user.apiUsage.used} / {user.apiUsage.total}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        用户ID
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-mono text-foreground">{user.uid}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText(user.uid);
                          }}
                        >
                          <SafeIcon name="Copy" className="h-3 w-3 mr-1" />
                          复制
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardTabs.map((tab) => (
                    <a
                      key={tab.id}
                      href={tab.href}
                      className="group"
                    >
                      <Card className="glass-card hover:border-primary/50 transition-all cursor-pointer h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {tab.name}
                            </CardTitle>
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <SafeIcon
                                name={tab.icon}
                                className="h-5 w-5 text-primary"
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {getTabDescription(tab.id)}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>

                {/* Help Section */}
                <Card className="glass-card border-accent/20 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SafeIcon name="HelpCircle" className="h-5 w-5 text-accent" />
                      需要帮助？
                    </CardTitle>
                    <CardDescription>
                      查看我们的帮助文档或联系支持团队
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    <Button variant="outline" asChild>
                      <a href="./placeholder.html">
                        <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
                        帮助文档
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="./placeholder.html">
                        <SafeIcon name="Mail" className="h-4 w-4 mr-2" />
                        联系支持
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function getTabDescription(tabId: string): string {
  const descriptions: Record<string, string> = {
    profile: '更新您的个人信息、头像和隐私设置',
    'true-chart': '验证和管理您的真实命盘信息',
    yearly: '查看多年流年运势预测和分析',
    knowledge: '管理您的知识库和研究笔记',
    booking: '查看和管理您的命理师预约',
    'ai-setting': '配置您的专属AI助手和API密钥',
    billing: '管理支付方法和订阅信息',
  };
  return descriptions[tabId] || '管理您的账户设置';
}
