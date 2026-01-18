
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import BaziPanelColumn from './BaziPanelColumn';
import AIAgentAnalysis from './AIAgentAnalysis';
import { MOCK_PROGNOSIS_INPUT, MOCK_PROGNOSIS_AGENT_RESULTS } from '@/data/prognosis_pan';

export default function PageContent() {
  // Initialize with mock data
  const [birthDate, setBirthDate] = useState(MOCK_PROGNOSIS_INPUT.birthDate);
  const [panels, setPanels] = useState([
    {
      id: 'panel_1',
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute,
      location: MOCK_PROGNOSIS_INPUT.birthLocation,
      baziImage: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/12/c5592f4f-655d-4202-843c-908f601d18fe.png',
    },
    {
      id: 'panel_2',
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute + 15,
      location: MOCK_PROGNOSIS_INPUT.birthLocation,
      baziImage: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/12/908385d1-2254-414a-bbfb-7b66b8e0ced9.png',
    },
    {
      id: 'panel_3',
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute + 30,
      location: MOCK_PROGNOSIS_INPUT.birthLocation,
      baziImage: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/12/b64e3fcb-8de9-442e-897b-7454094e831c.png',
    },
  ]);

  const [selectedPanelId, setSelectedPanelId] = useState('panel_1');
  const [agentResults] = useState(MOCK_PROGNOSIS_AGENT_RESULTS);
  const [confirmationStatus, setConfirmationStatus] = useState<'pending' | 'confirmed'>('pending');

  const handleTimeChange = (panelId: string, hour: number, minute: number) => {
    setPanels(panels.map(p => 
      p.id === panelId ? { ...p, hour, minute } : p
    ));
  };

  const handleConfirmBazi = (panelId: string) => {
    setSelectedPanelId(panelId);
    setConfirmationStatus('confirmed');
  };

  const handleAddPanel = () => {
    const newPanel = {
      id: `panel_${Date.now()}`,
      hour: 12,
      minute: 0,
      location: MOCK_PROGNOSIS_INPUT.birthLocation,
      baziImage: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/12/060ce940-b34a-4438-be49-b3ea9d6bb294.png',
    };
    setPanels([...panels, newPanel]);
  };

  return (
    <div className="container py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient-mystical mb-2">我的真命盘</h1>
        <p className="text-muted-foreground">
          通过三个AI Agent的分析对比，确定您最准确的出生时辰和命盘
        </p>
      </div>

      {/* Birth Date Input */}
      <Card className="glass-card p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">出生日期</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">出生地</label>
            <input
              type="text"
              value={MOCK_PROGNOSIS_INPUT.birthLocation}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-muted-foreground"
            />
          </div>
        </div>
      </Card>

      {/* Main Layout: Three Panels + AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Left: Three Bazi Panels */}
        <div className="lg:col-span-2 space-y-6">
          {panels.map((panel, index) => (
            <BaziPanelColumn
              key={panel.id}
              panelId={panel.id}
              panelNumber={index + 1}
              hour={panel.hour}
              minute={panel.minute}
              location={panel.location}
              baziImage={panel.baziImage}
              isSelected={selectedPanelId === panel.id}
              onTimeChange={handleTimeChange}
              onConfirm={handleConfirmBazi}
            />
          ))}
          
          {/* Add Panel Button */}
          <Button
            onClick={handleAddPanel}
            variant="outline"
            className="w-full"
          >
            <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
            添加新的出生时辰
          </Button>
        </div>

        {/* Right: AI Agent Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4">AI Agent 分析</h2>
            
            {agentResults.map((result, index) => (
              <AIAgentAnalysis
                key={result.agent.id}
                agent={result.agent}
                analysisTitle={result.analysisTitle}
                interpretation={result.interpretationMarkdown}
                confidenceScore={result.confidenceScore}
                agentNumber={index + 1}
              />
            ))}

            {/* Confirmation Status */}
            {confirmationStatus === 'confirmed' && (
              <Alert className="mt-6 border-accent bg-accent/10">
                <SafeIcon name="CheckCircle" className="h-4 w-4 text-accent" />
                <AlertDescription className="text-accent">
                  已确认真命盘！此命盘已保存到您的个人资料。
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Summary Section */}
      <Card className="glass-card p-6 mb-8 border-accent/50">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-mystical-gradient flex items-center justify-center flex-shrink-0">
            <SafeIcon name="Sparkles" className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">灵伴AI总结</h3>
            <p className="text-sm text-muted-foreground mb-4">
              根据三个AI Agent的分析，我发现它们在关于您的命盘时辰上有不同的看法。
              ChatGPT倾向于7:25的时辰，而通义千问认为7:30最为合理。
              建议您根据以下线索确认：
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-start space-x-2">
                <SafeIcon name="CheckCircle2" className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span>回忆您出生时的具体时刻（如医院记录、家人回忆）</span>
              </li>
              <li className="flex items-start space-x-2">
                <SafeIcon name="CheckCircle2" className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span>对比三个命盘中哪个最符合您的人生经历</span>
              </li>
              <li className="flex items-start space-x-2">
                <SafeIcon name="CheckCircle2" className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span>与专业命理师进行验证</span>
              </li>
            </ul>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-mystical-gradient">
                <SafeIcon name="MessageSquare" className="mr-2 h-4 w-4" />
                与AI辩论
              </Button>
              <Button size="sm" variant="outline">
                <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
                查看详细分析
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <a href="./page-961642.html">
            <SafeIcon name="ChevronLeft" className="mr-2 h-4 w-4" />
            返回用户中心
          </a>
        </Button>
        <Button className="bg-mystical-gradient" asChild>
          <a href="./knowledge-base-main.html">
            <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
            保存到知识库
          </a>
        </Button>
      </div>
    </div>
  );
}
