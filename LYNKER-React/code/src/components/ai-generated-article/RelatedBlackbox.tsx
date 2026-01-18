
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface RelatedBlackboxProps {}

export default function RelatedBlackbox({}: RelatedBlackboxProps) {
  const blackboxItems = [
    {
      id: 'BB_001',
      title: '金木交战格局的深层AI验证数据',
      description: '包含50,000份命盘的统计分析、相关性系数、置信区间等高权限分析结果',
      accessLevel: 'Premium',
      dataPoints: 12847,
      analysisDepth: '深度',
      timestamp: '2024-01-15',
    },
    {
      id: 'BB_002',
      title: '地域环境因子的详细计算模型',
      description: '气候带、湿度、纬度、地形等环境变量与命理规律的交互作用分析',
      accessLevel: 'Premium',
      dataPoints: 8934,
      analysisDepth: '深度',
      timestamp: '2024-01-15',
    },
    {
      id: 'BB_003',
      title: '性别差异的生物学机制探讨',
      description: '激素水平、神经生物学、心理学因素对命理规律表现的影响分析',
      accessLevel: 'Premium',
      dataPoints: 5621,
      analysisDepth: '深度',
      timestamp: '2024-01-15',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
          <SafeIcon name="Lock" className="w-6 h-6 text-accent" />
          核心AI分析数据
        </h2>
        <p className="text-sm text-muted-foreground">
          以下是本文基于的高权限分析结果，仅供授权用户查看
        </p>
      </div>

      {/* Security Notice */}
      <Alert className="border-accent/50 bg-accent/5">
        <SafeIcon name="ShieldAlert" className="h-4 w-4 text-accent" />
        <AlertDescription className="text-sm">
          <strong>安全提示：</strong>Blackbox页面内容受到严格加密保护，禁止截图、复制和爬虫。违反规定可能导致账户被封禁。
        </AlertDescription>
      </Alert>

      {/* Blackbox Cards */}
      <div className="grid gap-4">
        {blackboxItems.map((item) => (
          <Card key={item.id} className="glass-card border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <SafeIcon name="Lock" className="w-4 h-4 text-accent" />
                    <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                      {item.accessLevel}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.analysisDepth}分析
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {item.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <SafeIcon name="Database" className="w-3 h-3" />
                  <span>{item.dataPoints.toLocaleString()} 数据点</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon name="Calendar" className="w-3 h-3" />
                  <span>{new Date(item.timestamp).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>

              {/* Access Button */}
              <Button
                asChild
                variant="outline"
                className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                <a href="./blackbox-page.html">
                  <SafeIcon name="Eye" className="mr-2 h-4 w-4" />
                  查看加密分析数据
                  <SafeIcon name="Lock" className="ml-2 h-4 w-4" />
                </a>
              </Button>

              {/* Warning */}
              <p className="text-xs text-muted-foreground italic">
                需要Premium权限。内容已加密，不可复制、截图或爬虫。
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upgrade CTA */}
      <Card className="glass-card border-accent/50 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <SafeIcon name="Sparkles" className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">升级到Premium会员</h3>
              <p className="text-sm text-muted-foreground mb-4">
                获得完整的Blackbox分析数据访问权限，深入了解AI的验证过程和数据支持。
              </p>
              <Button
                asChild
                className="bg-mystical-gradient hover:opacity-90"
              >
                <a href="./payment-gateway.html">
                  升级会员
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
