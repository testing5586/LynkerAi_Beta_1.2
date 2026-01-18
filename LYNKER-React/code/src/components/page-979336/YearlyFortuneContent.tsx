
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import YearlyFortuneChart from './YearlyFortuneChart';
import PrognosisWarningCard from './PrognosisWarningCard';
import PredictionSummaryCard from './PredictionSummaryCard';
import VideoRecordItem from './VideoRecordItem';
import LifeKLineChart from './LifeKLineChart';
import AIDialogBox from '@/components/page-979401/AIDialogBox';
import { MOCK_MULTI_MASTER_CURVES, MOCK_PROGNOSIS_WARNINGS } from '@/data/prognosis_chart';

interface VideoRecord {
  id: string;
  masterId: string;
  masterName: string;
  date: string;
  duration: string;
  notes: string;
}

const MOCK_VIDEO_RECORDS: VideoRecord[] = [
  {
    id: 'video_001',
    masterId: 'master_001',
    masterName: '玄真子',
    date: '2024-11-15',
    duration: '45分钟',
    notes: '八字分析：火旺木弱，需补木元素',
  },
  {
    id: 'video_002',
    masterId: 'master_002',
    masterName: '星辰引路人',
    date: '2024-10-20',
    duration: '60分钟',
    notes: '占星解读：木星逆行期间需谨慎投资',
  },
  {
    id: 'video_003',
    masterId: 'master_001',
    masterName: '玄真子',
    date: '2024-09-10',
    duration: '50分钟',
    notes: '流年预测：2025年有贵人相助',
  },
];

const MOCK_PREDICTION_SUMMARIES = [
  {
    id: 'summary_001',
    year: 2025,
    title: '2025年整体运势',
    summary: '木火相生，事业运势上升，但需注意人际关系的维护。',
    highlights: ['事业运↑', '感情运→', '财运↑'],
  },
  {
    id: 'summary_002',
    year: 2026,
    title: '2026年运势展望',
    summary: '金克木，需谨慎应对挑战，但也是修行的好时机。',
    highlights: ['事业运→', '感情运↓', '财运→'],
  },
];

export default function YearlyFortuneContent() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [deletedRecords, setDeletedRecords] = useState<Set<string>>(new Set());

  const handleDeleteRecord = (recordId: string) => {
    setDeletedRecords((prev) => new Set([...prev, recordId]));
  };

  const visibleRecords = MOCK_VIDEO_RECORDS.filter((r) => !deletedRecords.has(r.id));

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return year.toString();
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gradient-mystical">流年运势</h1>
        <p className="text-muted-foreground">
          综合多位命理师的批命报告，为您展示详细的流年运势预测
        </p>
      </div>

      {/* Year Selector */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Calendar" className="h-5 w-5 text-accent" />
            <span>选择年份</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}年
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Yearly Fortune Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="LineChart" className="h-5 w-5 text-accent" />
            <span>运势曲线对比</span>
          </CardTitle>
          <CardDescription>
            展示不同命理师对您{selectedYear}年运势的预测对比
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YearlyFortuneChart data={MOCK_MULTI_MASTER_CURVES} selectedYear={parseInt(selectedYear)} />
        </CardContent>
      </Card>

      {/* Warnings Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <SafeIcon name="AlertTriangle" className="h-5 w-5 text-destructive" />
          <span>运势预警</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PROGNOSIS_WARNINGS.map((warning) => (
            <PrognosisWarningCard key={`${warning.year}-${warning.type}`} warning={warning} />
          ))}
        </div>
      </div>

      {/* Prediction Summaries */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <SafeIcon name="BookOpen" className="h-5 w-5 text-accent" />
          <span>批命预言摘要</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PREDICTION_SUMMARIES.map((summary) => (
            <PredictionSummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      </div>

{/* Video Records */}
       <Card className="glass-card">
         <CardHeader>
           <CardTitle className="flex items-center space-x-2">
             <SafeIcon name="Video" className="h-5 w-5 text-accent" />
             <span>批命视频记录</span>
           </CardTitle>
           <CardDescription>
             {visibleRecords.length} 条记录 · 可删除不需要的记录
           </CardDescription>
         </CardHeader>
         <CardContent>
           {visibleRecords.length === 0 ? (
             <div className="text-center py-8">
               <SafeIcon name="FileText" className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
               <p className="text-muted-foreground">暂无视频记录</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {visibleRecords.map((record) => (
                 <VideoRecordItem
                   key={record.id}
                   record={record}
                   onDelete={() => handleDeleteRecord(record.id)}
                 />
               ))}
             </div>
           )}
         </CardContent>
       </Card>

{/* Life K-Line Chart Section */}
       <LifeKLineChart />

       {/* AI Assistant Dialog */}
       <div className="flex justify-center py-8">
         <div className="w-full">
           <AIDialogBox 
             aiModel={{
               id: 'default',
               name: '灵伴AI',
               provider: 'ChatGPT',
               iconName: 'Sparkles',
               isDefault: true,
             }}
             notes={[]}
           />
         </div>
       </div>

       {/* Additional Info */}
       <Card className="glass-card border-accent/30 bg-accent/5">
         <CardHeader>
           <CardTitle className="text-base flex items-center space-x-2">
             <SafeIcon name="Info" className="h-5 w-5 text-accent" />
             <span>关于流年运势</span>
           </CardTitle>
         </CardHeader>
       </Card>
    </div>
  );
}
