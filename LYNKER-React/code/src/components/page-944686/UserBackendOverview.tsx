
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarInset } from '@/components/ui/sidebar';
import SafeIcon from '@/components/common/SafeIcon';
import UserBackendSidebar from '@/components/page-944686/UserBackendSidebar';
import UserProfileCard from '@/components/page-944686/UserProfileCard';
import DashboardStats from '@/components/page-944686/DashboardStats';
import QuickAccessCards from '@/components/page-944686/QuickAccessCards';

export default function UserBackendOverview() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <UserBackendSidebar />

      {/* Main Content */}
      <SidebarInset className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Header with User Profile */}
        <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gradient-mystical">用户后台</h1>
              <p className="text-sm text-muted-foreground mt-1">管理您的命理记录和社交互动</p>
            </div>
            <UserProfileCard />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <Card className="glass-card border-accent/20 bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                      <span>欢迎回来，灵客用户</span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      同命相知。在这里管理您的命理记录、发现同命人、参与社交互动。
                    </CardDescription>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    <SafeIcon name="Zap" className="h-3 w-3 mr-1" />
                    Pro会员
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Statistics Section */}
            <DashboardStats />

            {/* Quick Access Cards */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
                <span>快速访问</span>
              </h2>
              <QuickAccessCards />
            </div>

            {/* Recent Activity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="Clock" className="h-5 w-5 text-accent" />
                  <span>最近活动</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: 'FileText',
                      title: '查看了批命记录',
                      description: '来自命理师李明的八字分析',
                      time: '2小时前',
                    },
                    {
                      icon: 'Users',
                      title: '发现了同命人',
                      description: '与用户"云中漫步"命盘相似度92%',
                      time: '5小时前',
                    },
                    {
                      icon: 'MessageSquare',
                      title: '在灵友圈发布了动态',
                      description: '分享了最近的命理感悟',
                      time: '1天前',
                    },
                    {
                      icon: 'BookOpen',
                      title: '保存了知识库笔记',
                      description: 'AI自动生成的咨询摘要',
                      time: '2天前',
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 last:pb-0 last:border-0 border-b border-border/50">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <SafeIcon name={activity.icon} className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="glass-card border-dashed">
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <SafeIcon name="HelpCircle" className="h-5 w-5 text-accent" />
                  <span>需要帮助？</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="./placeholder.html">
                      <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
                      查看教程
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="./placeholder.html">
                      <SafeIcon name="MessageSquare" className="mr-2 h-4 w-4" />
                      联系支持
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="./placeholder.html">
                      <SafeIcon name="FileQuestion" className="mr-2 h-4 w-4" />
                      常见问题
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
