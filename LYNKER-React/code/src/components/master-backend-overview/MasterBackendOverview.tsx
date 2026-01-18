
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_MASTER_BACKEND_NAV } from '@/data/master_backend';
import type { BackendCardModel } from '@/data/master_backend';

export default function MasterBackendOverview() {
  const handleNavigate = (targetPageId: string) => {
    const pageRoutes: Record<string, string> = {
      'master_studio_management': './master-studio-management.html',
      'customer_prognosis_records_view': './customer-prognosis-records-view.html',
      'finance_center': './finance-center.html',
    };
    
    const href = pageRoutes[targetPageId];
    if (href) {
      window.location.href = href;
    }
  };

  const handleReturnToService = () => {
    window.location.href = './prognosis-service-entry.html';
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Page Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
<h1 className="text-3xl font-bold text-gradient-mystical mb-2">
                后台概览 | 管理中心
              </h1>
              <p className="text-muted-foreground">
                欢迎回来，命理师。管理您的工作室和客户记录。
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleReturnToService}
              className="gap-2"
            >
              <SafeIcon name="ArrowLeft" className="h-4 w-4" />
              返回服务入口
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                本月咨询次数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient-mystical">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">↑ 20%</span> 比上月增长
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                待结算金额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">¥2,480</div>
              <p className="text-xs text-muted-foreground mt-1">
                预计下周结算
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                客户满意度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.8</div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon
                    key={i}
                    name="Star"
                    className={`h-3 w-3 ${i < 4 ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

{/* Main Navigation Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">核心功能</h2>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Clock" className="h-5 w-5 text-accent" />
              最近活动
            </CardTitle>
            <CardDescription>
              您最近的工作室操作和客户互动
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'appointment',
                  title: '新预约确认',
                  description: '客户 李明 预约了明天下午3点的咨询',
                  time: '2小时前',
                  icon: 'Calendar',
                },
                {
                  type: 'review',
                  title: '收到新评价',
                  description: '客户给您的咨询留下了5星好评',
                  time: '4小时前',
                  icon: 'ThumbsUp',
                },
                {
                  type: 'payment',
                  title: '收款到账',
                  description: '¥680 已到账，来自客户 王芳',
                  time: '1天前',
                  icon: 'DollarSign',
                },
                {
                  type: 'message',
                  title: '客户消息',
                  description: '客户 张三 发送了咨询消息',
                  time: '1天前',
                  icon: 'Mail',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <SafeIcon
                      name={activity.icon}
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="glass-card mt-8 border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <SafeIcon name="Lightbulb" className="h-5 w-5" />
              小贴士
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              💡 <strong>优化您的档案</strong>：完善的工作室信息和服务介绍能吸引更多客户预约。
            </p>
            <p>
              📊 <strong>定期更新记录</strong>：及时标记客户预言的应验情况，有助于提升您的信誉度。
            </p>
            <p>
              🎯 <strong>设置预约链接</strong>：创建多个预约链接用于不同的服务类型，提高客户转化率。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface BackendCardProps {
  card: BackendCardModel;
  onNavigate: (targetPageId: string) => void;
}

function BackendCard({ card, onNavigate }: BackendCardProps) {
  return (
    <Card
      className="glass-card group cursor-pointer hover:border-primary/50 transition-all hover:shadow-card"
      onClick={() => onNavigate(card.targetPageId)}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ backgroundColor: `${card.colorHex}20`, borderColor: card.colorHex, borderWidth: '1px' }}
          >
            <SafeIcon
              name={card.iconName}
              className="h-6 w-6"
              style={{ color: card.colorHex }}
            />
          </div>
          <SafeIcon
            name="ArrowRight"
            className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
          />
        </div>
        <CardTitle className="text-lg">{card.title}</CardTitle>
        <CardDescription className="text-sm">
          {card.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(card.targetPageId);
          }}
        >
          进入
          <SafeIcon name="ChevronRight" className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
