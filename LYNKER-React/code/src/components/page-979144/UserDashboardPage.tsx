
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserDashboardSidebar from './UserDashboardSidebar';
import TrueChartDisplay from './TrueChartDisplay';
import BirthTimeInfo from './BirthTimeInfo';

// Mock user data
const mockUserData = {
  uid: 'USER-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  name: '灵客用户',
  birthTime: {
    year: 1995,
    month: 3,
    day: 15,
    hour: 14,
    minute: 30,
    timezone: 'CST',
  },
  bazi: {
    year: '乙亥',
    month: '癸卯',
    day: '丙午',
    hour: '未时',
    elements: {
      wood: 2,
      fire: 2,
      earth: 1,
      metal: 0,
      water: 2,
    },
    pattern: '正官格',
    description: '日主丙火，生于卯月，官星透干，格局清纯。',
  },
  ziwei: {
    mainStar: '紫微',
    secondaryStar: '天府',
    palace: '命宫',
    stars: ['紫微', '天府', '天相', '天梁'],
    pattern: '紫府同宫',
    description: '紫微天府同宫于命宫，主人聪慧，有领导才能，事业心强。',
  },
  verified: true,
  verificationDate: '2024-01-15',
};

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <UserDashboardSidebar currentPage="true-chart" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient-mystical mb-2">我的真命盘</h1>
                <p className="text-muted-foreground">
                  查看您已验证的八字命盘和紫薇命盘
                </p>
              </div>
              <Button
                asChild
                className="bg-mystical-gradient hover:opacity-90"
              >
                <a href="./page-979338.html">
                  <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                  验证真命盘
                </a>
              </Button>
            </div>
            {mockUserData.verified && (
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <SafeIcon name="CheckCircle" className="h-3 w-3 mr-1" />
                  已验证
                </Badge>
                <span className="text-sm text-muted-foreground">
                  验证于 {mockUserData.verificationDate}
                </span>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Birth Time Info */}
          <BirthTimeInfo birthTime={mockUserData.birthTime} />

          <Separator className="my-8" />

          {/* Charts Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bazi Chart */}
            <TrueChartDisplay
              type="bazi"
              title="八字命盘"
              data={mockUserData.bazi}
              imageUrl="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/13/ec82355c-75a6-42a5-94f2-5e2cf7d69008.png"
            />

            {/* Ziwei Chart */}
            <TrueChartDisplay
              type="ziwei"
              title="紫薇命盘"
              data={mockUserData.ziwei}
              imageUrl="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/13/607ca2ec-6bf3-46f6-80db-a8c969f273eb.png"
            />
          </div>

          <Separator className="my-8" />

          {/* Analysis Section */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                命理分析总结
              </CardTitle>
              <CardDescription>
                基于您的八字和紫薇命盘的综合分析
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 border border-primary/10">
                  <h4 className="font-semibold mb-2 text-primary">八字格局</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {mockUserData.bazi.pattern}
                  </p>
                  <p className="text-sm">{mockUserData.bazi.description}</p>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-primary/10">
                  <h4 className="font-semibold mb-2 text-primary">紫薇格局</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {mockUserData.ziwei.pattern}
                  </p>
                  <p className="text-sm">{mockUserData.ziwei.description}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h4 className="font-semibold mb-2 text-accent">五行分布</h4>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(mockUserData.bazi.elements).map(([element, count]) => (
                    <div key={element} className="text-center">
                      <div className="text-2xl font-bold text-primary">{count}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {getElementName(element)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              variant="outline"
              asChild
              className="flex-1"
            >
<a href="./page-979337.html">
                <SafeIcon name="User" className="h-4 w-4 mr-2" />
                编辑个人资料
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="flex-1"
            >
              <a href="./page-979399.html">
                <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
                查看知识库
              </a>
            </Button>
            <Button
              asChild
              className="flex-1 bg-mystical-gradient hover:opacity-90"
            >
              <a href="./page-979338.html">
                <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                重新验证命盘
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getElementName(element: string): string {
  const names: Record<string, string> = {
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    water: '水',
  };
  return names[element] || element;
}
