
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_PROGNOSIS_INPUT, MOCK_PROGNOSIS_AGENT_RESULTS, type PrognosisInputModel, type PrognosisAgentResultModel } from '@/data/prognosis_pan';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';

interface TimeGroup {
  id: string;
  date: string;
  hour: number;
  minute: number;
  source: 'manual' | 'ocr';
  isSelected: boolean;
}

export default function MyTrueBirthdayChart() {
  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([
    {
      id: 'group1',
      date: MOCK_PROGNOSIS_INPUT.birthDate,
      hour: MOCK_PROGNOSIS_INPUT.birthTimeHour,
      minute: MOCK_PROGNOSIS_INPUT.birthTimeMinute,
      source: 'manual',
      isSelected: true,
    },
    {
      id: 'group2',
      date: MOCK_PROGNOSIS_INPUT.birthDate,
      hour: 7,
      minute: 25,
      source: 'manual',
      isSelected: false,
    },
    {
      id: 'group3',
      date: MOCK_PROGNOSIS_INPUT.birthDate,
      hour: 7,
      minute: 35,
      source: 'manual',
      isSelected: false,
    },
  ]);

  const [selectedGroupId, setSelectedGroupId] = useState('group1');
  const [agentResults] = useState<PrognosisAgentResultModel[]>(MOCK_PROGNOSIS_AGENT_RESULTS);
  const [showOCRModal, setShowOCRModal] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState('');

  const selectedGroup = timeGroups.find(g => g.id === selectedGroupId);

  const handleAddTimeGroup = () => {
    const newId = `group${timeGroups.length + 1}`;
    setTimeGroups([
      ...timeGroups,
      {
        id: newId,
        date: MOCK_PROGNOSIS_INPUT.birthDate,
        hour: 12,
        minute: 0,
        source: 'manual',
        isSelected: false,
      },
    ]);
  };

  const handleDeleteTimeGroup = (id: string) => {
    if (timeGroups.length > 1) {
      const newGroups = timeGroups.filter(g => g.id !== id);
      setTimeGroups(newGroups);
      if (selectedGroupId === id) {
        setSelectedGroupId(newGroups[0].id);
      }
    }
  };

  const handleUpdateTimeGroup = (id: string, updates: Partial<TimeGroup>) => {
    setTimeGroups(timeGroups.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const handleOCRImport = (groupId: string) => {
    if (ocrText.trim()) {
      // 模拟OCR解析时间
      const timeMatch = ocrText.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        const hour = parseInt(timeMatch[1]);
        const minute = parseInt(timeMatch[2]);
        handleUpdateTimeGroup(groupId, { hour, minute, source: 'ocr' });
        setShowOCRModal(null);
        setOcrText('');
      }
    }
  };

  const formatTime = (hour: number, minute: number) => {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

return (
    <div id="iawld" className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 py-6 px-0">
      <div id="ibqlj" className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-gradient-mystical">我的真命盘</h1>
          <p className="text-muted-foreground">通过三个AI Agent的分析对比，确定您的真实出生时辰</p>
        </div>

        {/* Top Input Section */}
        {selectedGroup && (
          <Card className="glass-card border-accent/20">
            <CardHeader id="icaed">
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Clock" className="h-5 w-5 text-accent" />
                <span>出生时辰设置</span>
              </CardTitle>
              <CardDescription>调整出生日期和时间以生成命盘</CardDescription>
            </CardHeader>
            <CardContent id="i9m1b" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birth-date">出生日期</Label>
                  <Input
                    id="birth-date"
                    type="date"
                    value={selectedGroup.date}
                    onChange={(e) => handleUpdateTimeGroup(selectedGroupId, { date: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-hour">小时 (0-23)</Label>
                  <Input
                    id="birth-hour"
                    type="number"
                    min="0"
                    max="23"
                    value={selectedGroup.hour}
                    onChange={(e) => handleUpdateTimeGroup(selectedGroupId, { hour: parseInt(e.target.value) || 0 })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-minute">分钟 (0-59)</Label>
                  <Input
                    id="birth-minute"
                    type="number"
                    min="0"
                    max="59"
                    value={selectedGroup.minute}
                    onChange={(e) => handleUpdateTimeGroup(selectedGroupId, { minute: parseInt(e.target.value) || 0 })}
                    className="bg-background/50"
                  />
                </div>
</div>
             </CardContent>
          </Card>
        )}

{/* Main Layout: Three Columns */}
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {/* Three Columns - AI Agent Analysis */}
           <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {agentResults.map((result, index) => {
              const buttonIds = ['i5fxb', 'ict5pg', 'iingfi'];
              const nameIds = ['iplgyk', 'iplgyk-2', 'iplgyk-3'];
              return (
                <PrognosisColumn
                  key={result.agent.id}
                  agent={result.agent}
                  result={result}
                  timeGroup={timeGroups[index] || timeGroups[0]}
                  groupId={timeGroups[index]?.id || timeGroups[0].id}
                  buttonId={buttonIds[index]}
                  nameId={nameIds[index]}
                  onOCRClick={() => setShowOCRModal(timeGroups[index]?.id || timeGroups[0].id)}
                  onMinuteChange={(minute) => {
                    const gid = timeGroups[index]?.id || timeGroups[0].id;
                    handleUpdateTimeGroup(gid, { minute });
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Comparison Summary */}
        <PrognosisComparison
          results={agentResults}
          timeGroups={timeGroups}
          selectedGroupId={selectedGroupId}
        />

        {/* OCR Import Modal */}
        {showOCRModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="glass-card w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="Image" className="h-5 w-5" />
                  <span>导入排盘图片</span>
                </CardTitle>
                <CardDescription>粘贴排盘图片或输入识别的时间信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ocr-input">识别的时间信息</Label>
                  <textarea
                    id="ocr-input"
                    placeholder="例如: 07:30 或 出生时间: 7点30分"
                    value={ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                    className="w-full h-24 p-3 rounded-lg bg-background/50 border border-muted text-foreground placeholder-muted-foreground resize-none"
                  />
                </div>

                <Alert>
                  <SafeIcon name="Info" className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    支持多种排盘格式。系统将自动识别时间信息。
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOCRImport(showOCRModal)}
                    className="flex-1 bg-mystical-gradient"
                  >
                    <SafeIcon name="Check" className="h-4 w-4 mr-2" />
                    确认导入
                  </Button>
                  <Button
                    onClick={() => {
                      setShowOCRModal(null);
                      setOcrText('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

interface PrognosisColumnProps {
  agent: any;
  result: PrognosisAgentResultModel;
  timeGroup: any;
  groupId: string;
  buttonId: string;
  nameId: string;
  onOCRClick: () => void;
  onMinuteChange: (minute: number) => void;
}

function PrognosisColumn({
   agent,
   result,
   timeGroup,
   groupId,
   buttonId,
   nameId,
   onOCRClick,
   onMinuteChange,
 }: PrognosisColumnProps) {
return (
      <Card className="rounded-xl border bg-card text-card-foreground shadow glass-card border-accent/20 flex flex-col h-full">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <Button
            id={buttonId}
            onClick={onOCRClick}
            variant="outline"
            className="w-full text-xs h-8 rounded-md px-3"
          >
            <SafeIcon name="Image" className="h-4 w-4 mr-2" />
            导入排盘图片
          </Button>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <SafeIcon name={agent.iconName} className="h-4 w-4 text-primary" />
            </div>
<div id={nameId} className="font-semibold tracking-tight text-base">
               {agent.name === 'OpenAI ChatGPT' ? '文墨天机' : agent.name === 'Qwen' ? '测测' : agent.name === 'Google Gemini' ? '吉真紫薇' : agent.name}
             </div>
          </div>
        </div>

<div id="itmjer" className="p-6 pt-0 flex-1 space-y-4 overflow-y-auto">
           {/* AI Chat */}
           <AIAgentChat
             agent={agent}
             interpretation={result.interpretationMarkdown}
           />
         </div>
     </Card>
   );
 }

interface AIAgentChatProps {
  agent: any;
  interpretation: string;
}

function AIAgentChat({ agent, interpretation }: AIAgentChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    {
      role: 'ai',
      content: interpretation,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { role: 'user', content: input },
        {
          role: 'ai',
          content: `感谢您的提问。根据${agent.name}的分析，我认为这个问题很有见地。让我进一步为您解释...`,
        },
      ]);
      setInput('');
    }
  };

  return (
    <div className="space-y-3 border-t pt-3">
<ScrollArea className="h-48">
         <div className="space-y-2 pr-4">
           {messages.map((msg, idx) => (
             msg.role === 'user' && (
               <div
                 key={idx}
                 className={`flex justify-end`}
               >
                 <div
                   className={`max-w-xs p-2 rounded-lg text-xs bg-primary text-primary-foreground`}
                 >
                   {msg.content}
                 </div>
               </div>
             )
           ))}
         </div>
       </ScrollArea>

      <div className="flex gap-1">
        <Input
          placeholder="提问..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="h-8 text-xs bg-background/50"
        />
        <Button
          onClick={handleSendMessage}
          size="sm"
          className="h-8 px-2"
        >
          <SafeIcon name="Send" className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

interface PrognosisComparisonProps {
  results: PrognosisAgentResultModel[];
  timeGroups: TimeGroup[];
  selectedGroupId: string;
}

function PrognosisComparison({
   results,
   timeGroups,
   selectedGroupId,
 }: PrognosisComparisonProps) {
   const selectedGroup = timeGroups.find(g => g.id === selectedGroupId);
 
   return (
     <Card className="glass-card border-accent/20">
       <CardHeader>
<CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
            <span>AI分析总结</span>
          </CardTitle>
       </CardHeader>
<CardContent className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {results.map((result) => (
              <div key={result.agent.id} className="p-3 bg-muted/30 rounded-lg border border-muted">
                <div className="flex items-center space-x-2 mb-2"></div>
              </div>
            ))}
          </div>

        <Button className="w-full bg-mystical-gradient hover:opacity-90">
          <SafeIcon name="Check" className="h-4 w-4 mr-2" />
          确认此时辰为我的真命盘
        </Button>
      </CardContent>
    </Card>
  );
}
