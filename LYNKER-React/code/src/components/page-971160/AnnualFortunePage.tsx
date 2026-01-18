
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import YearSelector from './YearSelector';
import AnnualFortuneChart from './AnnualFortuneChart';
import PredictionSummaryCard from './PredictionSummaryCard';
import HealthWarningCard from './HealthWarningCard';
import DisasterWarningCard from './DisasterWarningCard';
import VideoRecordList from './VideoRecordList';
import { mockAnnualFortuneData } from './mockData';

export default function AnnualFortunePage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const yearData = mockAnnualFortuneData[selectedYear] || mockAnnualFortuneData[2025];
  const monthData = yearData.months[selectedMonth - 1];

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}月`,
  }));

  return (
    <div className="flex-1 overflow-auto">
      <style>{`
        .annual-fortune-page {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(45, 212, 191, 0.05) 100%);
        }
        
        .fortune-chart-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(139, 92, 246, 0.1);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .warning-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
      `}</style>

      <div className="annual-fortune-page min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gradient-mystical">流年运势</h1>
            <p className="text-muted-foreground">综合多位命理师的批命报告，为您生成个性化的流年运势预测</p>
          </div>

          {/* Year & Month Selector */}
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="text-lg">选择年份和月份</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">选择年份</label>
                  <YearSelector
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                    availableYears={Object.keys(mockAnnualFortuneData).map(Number)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">选择月份</label>
                  <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(Number(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annual Fortune Chart */}
          <div className="fortune-chart-container">
            <h2 className="text-xl font-semibold mb-6">全年运势曲线</h2>
            <AnnualFortuneChart yearData={yearData} selectedMonth={selectedMonth} />
          </div>

          {/* Month Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{selectedYear}年{selectedMonth}月运势总览</h2>
            <div className="summary-grid">
              <PredictionSummaryCard
                title="整体运势"
                score={monthData.overallScore}
                description={monthData.overallDescription}
                icon="Sparkles"
              />
              <PredictionSummaryCard
                title="事业运"
                score={monthData.careerScore}
                description={monthData.careerDescription}
                icon="Briefcase"
              />
              <PredictionSummaryCard
                title="感情运"
                score={monthData.loveScore}
                description={monthData.loveDescription}
                icon="Heart"
              />
              <PredictionSummaryCard
                title="财运"
                score={monthData.wealthScore}
                description={monthData.wealthDescription}
                icon="Coins"
              />
            </div>
          </div>

          {/* Warnings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">预警信息</h2>
            <div className="warning-grid">
              <HealthWarningCard
                level={monthData.healthWarning.level}
                description={monthData.healthWarning.description}
                suggestions={monthData.healthWarning.suggestions}
              />
              <DisasterWarningCard
                level={monthData.disasterWarning.level}
                description={monthData.disasterWarning.description}
                suggestions={monthData.disasterWarning.suggestions}
              />
            </div>
          </div>

          {/* Video Records */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">批命视频记录</h2>
            <VideoRecordList records={yearData.videoRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}
