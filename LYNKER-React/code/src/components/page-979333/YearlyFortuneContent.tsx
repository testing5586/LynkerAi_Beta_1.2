
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';

// Mock data for yearly fortune
const mockYearlyData = {
  birthTime: '1995-03-15 14:30',
  currentYear: 2024,
  years: [2024, 2025, 2026, 2027],
  baziChart: {
    year: '乙卯',
    month: '二月',
    day: '十五',
    hour: '未时',
    elements: ['木', '木', '火', '土'],
    description: '八字命盘：乙卯年、二月、十五日、未时',
  },
  ziWeiChart: {
    palace: '命宫',
    mainStar: '紫微',
    secondaryStar: '天府',
    description: '紫薇命盘：命宫主星紫微，辅星天府',
  },
  yearlyForecasts: [
    {
      year: 2024,
      season: '春季',
      fortune: '事业运势上升，财运稳定',
      health: '需注意脾胃健康',
      warning: '避免重大决策',
      color: 'bg-green-500/20',
    },
    {
      year: 2024,
      season: '夏季',
      fortune: '感情运势良好，人际关系改善',
      health: '心火旺盛，需调理',
      warning: '谨慎投资',
      color: 'bg-blue-500/20',
    },
    {
      year: 2024,
      season: '秋季',
      fortune: '财运转佳，有贵人相助',
      health: '肺部需保养',
      warning: '防范小人',
      color: 'bg-yellow-500/20',
    },
    {
      year: 2024,
      season: '冬季',
      fortune: '静心修养，蓄势待发',
      health: '肾阳虚弱，需温阳',
      warning: '避免过度消耗',
      color: 'bg-purple-500/20',
    },
  ],
};

export default function YearlyFortuneContent() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const filteredForecasts = mockYearlyData.yearlyForecasts.filter((forecast) => {
    const yearMatch = forecast.year.toString() === selectedYear;
    const seasonMatch = selectedSeason === 'all' || forecast.season === selectedSeason;
    return yearMatch && seasonMatch;
  });

  return (
    <div className="flex-1 overflow-auto">
      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient-mystical">年流年运势</h1>
          <p className="text-muted-foreground">
            综合多位命理师的批命报告生成的个性化流年运势分析
          </p>
        </div>

        {/* Birth Time Display */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="Clock" className="h-5 w-5 text-accent" />
              <span>出生时辰</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">出生时间</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {mockYearlyData.birthTime}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">八字</p>
                  <div className="flex flex-wrap gap-2">
                    {mockYearlyData.baziChart.elements.map((element, idx) => (
                      <Badge key={idx} variant="secondary" className="text-base py-2 px-3">
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">八字详情</p>
                  <p className="text-sm text-foreground">
                    {mockYearlyData.baziChart.year} {mockYearlyData.baziChart.month}{' '}
                    {mockYearlyData.baziChart.day} {mockYearlyData.baziChart.hour}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">紫薇命盘</p>
                  <p className="text-sm text-foreground">
                    {mockYearlyData.ziWeiChart.palace}：{mockYearlyData.ziWeiChart.mainStar}
                    {mockYearlyData.ziWeiChart.secondaryStar}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bazi Chart */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Grid3x3" className="h-5 w-5 text-accent" />
                <span>八字命盘</span>
              </CardTitle>
              <CardDescription>已验证的八字命盘信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Placeholder for actual chart */}
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-dashed border-primary/30">
                  <div className="text-center space-y-2">
                    <SafeIcon name="Grid3x3" className="h-12 w-12 text-primary/50 mx-auto" />
                    <p className="text-sm text-muted-foreground">八字命盘图表</p>
                    <p className="text-xs text-muted-foreground">
                      {mockYearlyData.baziChart.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href="./page-979338.html">
                    <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                    验证真命盘
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ZiWei Chart */}
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Compass" className="h-5 w-5 text-accent" />
                <span>紫薇命盘</span>
              </CardTitle>
              <CardDescription>已验证的紫薇命盘信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Placeholder for actual chart */}
                <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border-2 border-dashed border-accent/30">
                  <div className="text-center space-y-2">
                    <SafeIcon name="Compass" className="h-12 w-12 text-accent/50 mx-auto" />
                    <p className="text-sm text-muted-foreground">紫薇命盘图表</p>
                    <p className="text-xs text-muted-foreground">
                      {mockYearlyData.ziWeiChart.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href="./page-979338.html">
                    <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                    验证真命盘
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yearly Forecast */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
              <span>流年运势预测</span>
            </CardTitle>
            <CardDescription>基于多位命理师的综合分析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">选择年份</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockYearlyData.years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">选择季节</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全年</SelectItem>
                    <SelectItem value="春季">春季</SelectItem>
                    <SelectItem value="夏季">夏季</SelectItem>
                    <SelectItem value="秋季">秋季</SelectItem>
                    <SelectItem value="冬季">冬季</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Forecast Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredForecasts.map((forecast, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border border-border ${forecast.color} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{forecast.season}</h4>
                    <Badge variant="outline">{forecast.year}年</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">事业财运</p>
                      <p className="text-foreground">{forecast.fortune}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">健康提示</p>
                      <p className="text-foreground">{forecast.health}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">风险预警</p>
                      <p className="text-destructive font-medium">{forecast.warning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredForecasts.length === 0 && (
              <div className="text-center py-8">
                <SafeIcon name="AlertCircle" className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">暂无该时期的运势预测</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-mystical-gradient hover:opacity-90">
            <a href="./page-979338.html">
              <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
              验证真命盘
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              查看知识库
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
