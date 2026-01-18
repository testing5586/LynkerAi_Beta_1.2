
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import PrognosisCurveChart from './PrognosisCurveChart';
import WarningCard from './WarningCard';
import VideoRecordItem from './VideoRecordItem';
import YearSelector from './YearSelector';
import { MOCK_MULTI_MASTER_CURVES, MOCK_PROGNOSIS_WARNINGS, type PrognosisWarningModel } from '@/data/prognosis_chart';

interface VideoRecord {
  id: string;
  masterName: string;
  date: string;
  summary: string;
  videoUrl: string;
  duration: string;
}

export default function PrognosisYearlyView() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock video records data
  const videoRecords: VideoRecord[] = [
    {
      id: '1',
      masterName: '玄真子 (八字)',
      date: '2024-12-15',
      summary: '2025年为丙午年，火旺木相，事业运势上升，需注意人际关系。',
      videoUrl: '#',
      duration: '45分钟',
    },
    {
      id: '2',
      masterName: '星辰引路人 (占星)',
      date: '2024-12-10',
      summary: '木星进入第十宫，职业发展机遇增加，财运稳定增长。',
      videoUrl: '#',
      duration: '38分钟',
    },
    {
      id: '3',
      masterName: '紫微大师 (紫微)',
      date: '2024-12-05',
      summary: '廉贞化禄，事业有成，但需防范小人干扰。',
      videoUrl: '#',
      duration: '52分钟',
    },
  ];

  // Get warnings for selected year
  const yearWarnings = MOCK_PROGNOSIS_WARNINGS.filter(w => w.year === selectedYear);

  // Get summary for selected year
  const getYearSummary = (year: number) => {
    const summaries: Record<number, string> = {
      2024: '2024年为甲辰年，龙年运势，整体运势平稳，事业有所突破。',
      2025: '2025年为乙巳年，蛇年运势，火旺木相，需把握机遇同时防范风险。',
      2026: '2026年为丙午年，马年运势，运势波动较大，需谨慎应对。',
      2027: '2027年为丁未年，羊年运势，运势回升，适合新的开始。',
      2028: '2028年为戊申年，猴年运势，运势向好，事业财运双丰收。',
    };
    return summaries[year] || '暂无该年份的运势预测。';
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gradient-mystical">流年运势</h1>
        <p className="text-muted-foreground">
          综合多位命理师的批命报告，为您展示详细的流年运势分析
        </p>
      </div>

      {/* Year Selector */}
      <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">运势总览</TabsTrigger>
          <TabsTrigger value="warnings">预警信息</TabsTrigger>
          <TabsTrigger value="records">批命记录</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Year Summary Card */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                <span>{selectedYear}年运势总结</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed">
                {getYearSummary(selectedYear)}
              </p>
            </CardContent>
          </Card>

          {/* Curve Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>多师对比运势曲线</CardTitle>
              <CardDescription>
                展示不同命理师对您运势的预测对比
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PrognosisCurveChart data={MOCK_MULTI_MASTER_CURVES} selectedYear={selectedYear} />
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <SafeIcon name="TrendingUp" className="h-4 w-4 text-accent" />
                  <span>事业运</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">评分</span>
                    <Badge className="bg-accent/20 text-accent">8.5/10</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    运势向好，适合开展新项目
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <SafeIcon name="Heart" className="h-4 w-4 text-red-500" />
                  <span>感情运</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">评分</span>
                    <Badge className="bg-red-500/20 text-red-500">7.0/10</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    感情稳定，需加强沟通
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <SafeIcon name="Coins" className="h-4 w-4 text-yellow-500" />
                  <span>财运</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">评分</span>
                    <Badge className="bg-yellow-500/20 text-yellow-500">8.0/10</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    财运稳定增长，适合投资
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Warnings Tab */}
        <TabsContent value="warnings" className="space-y-4">
          {yearWarnings.length > 0 ? (
            <div className="space-y-4">
              {yearWarnings.map((warning, index) => (
                <WarningCard key={index} warning={warning} />
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <SafeIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                  <span>{selectedYear}年暂无重大预警，运势平稳</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <div className="space-y-3">
            {videoRecords.map((record) => (
              <VideoRecordItem key={record.id} record={record} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" asChild>
          <a href="./page-962652.html">
            <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
            查看知识库
          </a>
        </Button>
        <Button className="bg-mystical-gradient hover:opacity-90" asChild>
          <a href="./prognosis-service-entry.html">
            <SafeIcon name="Calendar" className="h-4 w-4 mr-2" />
            预约新的批命
          </a>
        </Button>
      </div>
    </div>
  );
}
