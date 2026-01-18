
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import BirthTimeInput from './BirthTimeInput';
import ChartColumn from './ChartColumn';
import AIAssistantSummary from './AIAssistantSummary';
import { MOCK_PROGNOSIS_INPUT, MOCK_PROGNOSIS_AGENT_RESULTS } from '@/data/prognosis_pan';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';

interface ChartState {
  hour: number;
  minute: number;
  chartImage?: string;
  agentAnalysis: string;
}

export default function VerifyTrueChartPage() {
  // Initialize with mock data
  const [birthTime, setBirthTime] = useState({
    hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
    minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute,
  });

  const [charts, setCharts] = useState<ChartState[]>([
    {
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute,
      agentAnalysis: MOCK_PROGNOSIS_AGENT_RESULTS[0].interpretationMarkdown,
    },
    {
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute + 5,
      agentAnalysis: MOCK_PROGNOSIS_AGENT_RESULTS[1].interpretationMarkdown,
    },
    {
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute + 10,
      agentAnalysis: MOCK_PROGNOSIS_AGENT_RESULTS[2].interpretationMarkdown,
    },
  ]);

  const [selectedChart, setSelectedChart] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleBirthTimeChange = (hour: number, minute: number) => {
    setBirthTime({ hour, minute });
  };

  const handleChartTimeChange = (index: number, hour: number, minute: number) => {
    const newCharts = [...charts];
    newCharts[index] = { ...newCharts[index], hour, minute };
    setCharts(newCharts);
  };

  const handleConfirmChart = (index: number) => {
    setSelectedChart(index);
  };

  const handleSaveAsTrue = () => {
    if (selectedChart !== null) {
      const trueChart = charts[selectedChart];
      // In real app, this would save to backend
      console.log('Saving true chart:', trueChart);
      // Redirect to true chart page
      window.location.href = './page-979144.html';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gradient-mystical mb-2">验证真命盘</h1>
            <p className="text-muted-foreground mb-6">
              通过三个AI命理师的分析，找到最准确的出生时辰，确定您的真实命盘。
            </p>

            {/* Birth Time Input */}
            <BirthTimeInput
              hour={birthTime.hour}
              minute={birthTime.minute}
              onChange={handleBirthTimeChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8">
        {/* Info Alert */}
        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <SafeIcon name="Info" className="h-4 w-4" />
          <AlertTitle>如何使用此工具</AlertTitle>
          <AlertDescription>
            1. 在顶部输入您的出生时辰（时/分）
            <br />
            2. 可选：上传不同门派的排盘图片进行OCR识别
            <br />
            3. 查看三个AI命理师的分析结果
            <br />
            4. 根据灵伴AI的总结和辩论，选择最准确的时辰
            <br />
            5. 确认后保存为您的真命盘
          </AlertDescription>
        </Alert>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {charts.map((chart, index) => (
            <ChartColumn
              key={index}
              index={index}
              chart={chart}
              aiAgent={MOCK_PROGNOSIS_AGENT_RESULTS[index]}
              isSelected={selectedChart === index}
              onTimeChange={(hour, minute) => handleChartTimeChange(index, hour, minute)}
              onConfirm={() => handleConfirmChart(index)}
            />
          ))}
        </div>

        {/* Selection Summary */}
        {selectedChart !== null && (
          <Card className="mb-8 border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="CheckCircle" className="h-5 w-5 text-accent" />
                已选择命盘
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">选择的AI命理师</p>
                    <p className="text-lg font-semibold">
                      {MOCK_PROGNOSIS_AGENT_RESULTS[selectedChart].agent.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">出生时辰</p>
                    <p className="text-lg font-semibold">
                      {String(charts[selectedChart].hour).padStart(2, '0')}:
                      {String(charts[selectedChart].minute).padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">分析标题</p>
                  <p className="text-base font-medium">
                    {MOCK_PROGNOSIS_AGENT_RESULTS[selectedChart].analysisTitle}
                  </p>
                </div>
                <Button
                  onClick={handleSaveAsTrue}
                  className="w-full bg-mystical-gradient hover:opacity-90"
                  size="lg"
                >
                  <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                  确认并保存为真命盘
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Summary Section */}
        <div className="mb-8">
          <Button
            onClick={() => setShowSummary(!showSummary)}
            variant="outline"
            className="w-full mb-4"
            size="lg"
          >
            <SafeIcon name={showSummary ? 'ChevronUp' : 'ChevronDown'} className="h-4 w-4 mr-2" />
            {showSummary ? '隐藏' : '显示'}灵伴AI总结与辩论
          </Button>

          {showSummary && (
            <AIAssistantSummary
              agentResults={MOCK_PROGNOSIS_AGENT_RESULTS}
              selectedChartIndex={selectedChart}
            />
          )}
        </div>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <SafeIcon name="HelpCircle" className="h-5 w-5" />
              常见问题
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">为什么需要验证真命盘？</h4>
              <p className="text-sm text-muted-foreground">
                准确的出生时辰是命理分析的基础。即使相差几分钟，也可能导致完全不同的命盘结果。通过多个AI命理师的分析对比，可以帮助您找到最准确的时辰。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">OCR导入有什么作用？</h4>
              <p className="text-sm text-muted-foreground">
                如果您有其他命理软件生成的排盘图片，可以上传进行OCR识别，系统会自动提取时辰信息，帮助您快速填充数据。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">如何选择正确的命盘？</h4>
              <p className="text-sm text-muted-foreground">
                参考三个AI命理师的分析，特别是灵伴AI的总结。选择分析最符合您实际人生经历的那个时辰。如果仍有疑问，可以咨询专业命理师。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
