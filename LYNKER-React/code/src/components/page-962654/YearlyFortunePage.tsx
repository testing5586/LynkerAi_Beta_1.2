
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import YearSelector from './YearSelector';
import PrognosisCurveChart from './PrognosisCurveChart';
import PrognosisWarningCard from './PrognosisWarningCard';
import VideoRecordItem from './VideoRecordItem';
import { MOCK_MULTI_MASTER_CURVES, MOCK_PROGNOSIS_WARNINGS } from '@/data/prognosis_chart';

interface VideoRecord {
  id: string;
  masterName: string;
  masterAvatar: string;
  date: string;
  duration: string;
  summary: string;
  videoUrl: string;
}

const MOCK_VIDEO_RECORDS: VideoRecord[] = [
  {
    id: 'vid_001',
    masterName: '玄真子',
    masterAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    date: '2024-12-15',
    duration: '45分钟',
    summary: '2025年流年运势分析：木火通明格局，事业运势上升，需注意人际关系。',
    videoUrl: '#',
  },
  {
    id: 'vid_002',
    masterName: '星辰引路人',
    masterAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    date: '2024-11-20',
    duration: '60分钟',
    summary: '占星视角：2025年木星进入第十宫，职业发展机遇显著，财运稳定增长。',
    videoUrl: '#',
  },
  {
    id: 'vid_003',
    masterName: '紫微斗数研究院',
    masterAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    date: '2024-10-10',
    duration: '50分钟',
    summary: '紫微命盘：2025年三方四正吉星汇聚，整体运势向好，把握机遇期。',
    videoUrl: '#',
  },
];

export default function YearlyFortunePage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [videoRecords, setVideoRecords] = useState<VideoRecord[]>(MOCK_VIDEO_RECORDS);

  const currentYearWarnings = MOCK_PROGNOSIS_WARNINGS.filter(
    (warning) => warning.year === selectedYear
  );

  const handleDeleteRecord = (id: string) => {
    setVideoRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const years = Array.from({ length: 5 }, (_, i) => 2024 + i);

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-64px)]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gradient-mystical">流年运势</h1>
            <p className="text-muted-foreground">
              综合多位命理师的批命报告，为您展示详细的流年运势分析
            </p>
          </div>

          {/* Year Selector */}
          <YearSelector
            years={years}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />

          {/* Tabs */}
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <SafeIcon name="TrendingUp" className="h-4 w-4" />
                <span className="hidden sm:inline">运势曲线</span>
              </TabsTrigger>
              <TabsTrigger value="warnings" className="flex items-center gap-2">
                <SafeIcon name="AlertTriangle" className="h-4 w-4" />
                <span className="hidden sm:inline">预警信息</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <SafeIcon name="Video" className="h-4 w-4" />
                <span className="hidden sm:inline">视频记录</span>
              </TabsTrigger>
            </TabsList>

            {/* Chart Tab */}
            <TabsContent value="chart" className="space-y-6">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
                    {selectedYear}年运势曲线图
                  </CardTitle>
                  <CardDescription>
                    展示不同命理师对您{selectedYear}年运势的预测对比
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PrognosisCurveChart
                    data={MOCK_MULTI_MASTER_CURVES}
                    selectedYear={selectedYear}
                  />
                </CardContent>
              </Card>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card border-accent/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <SafeIcon name="Star" className="h-4 w-4 text-accent" />
                      整体运势
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">平均评分</span>
                        <span className="text-2xl font-bold text-accent">7.5/10</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedYear}年整体运势向好，把握机遇期
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-green-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <SafeIcon name="Heart" className="h-4 w-4 text-green-500" />
                      健康运势
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        良好
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        注意季节交替时期的调理
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-yellow-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <SafeIcon name="Zap" className="h-4 w-4 text-yellow-500" />
                      财运指数
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">预期增长</span>
                        <span className="text-lg font-bold text-yellow-500">+15%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        稳定增长，避免大额投机
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Prediction Summary */}
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">批命预言摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">事业发展</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedYear}年木火通明，事业运势上升。上半年重点关注项目推进，下半年可考虑职业转变或创业机遇。
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">人际关系</h4>
                        <p className="text-sm text-muted-foreground">
                          贵人运势显著，但需注意言行谨慎。建议多参加社交活动，拓展人脉资源。
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">感情运势</h4>
                        <p className="text-sm text-muted-foreground">
                          单身者有机遇，已婚者需加强沟通。整体感情运势平稳，珍惜身边人。
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Warnings Tab */}
            <TabsContent value="warnings" className="space-y-4">
              {currentYearWarnings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentYearWarnings.map((warning) => (
                    <PrognosisWarningCard key={`${warning.year}-${warning.type}`} warning={warning} />
                  ))}
                </div>
              ) : (
                <Card className="glass-card border-green-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-green-400">
                      <SafeIcon name="CheckCircle" className="h-5 w-5" />
                      <p>{selectedYear}年暂无重大预警，运势平稳</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Tips */}
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base">运势建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      定期进行命理复盘，记录预言应验情况，有助于更好地理解自身运势规律
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      根据预警信息提前做好准备，趋吉避凶是命理学的核心应用
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-4">
              {videoRecords.length > 0 ? (
                <div className="space-y-3">
                  {videoRecords.map((record) => (
                    <VideoRecordItem
                      key={record.id}
                      record={record}
                      onDelete={() => handleDeleteRecord(record.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="glass-card border-muted/20">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <SafeIcon name="Video" className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground mb-4">暂无视频记录</p>
                      <Button asChild className="bg-mystical-gradient">
                        <a href="./prognosis-service-entry.html">
                          预约命理师咨询
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
