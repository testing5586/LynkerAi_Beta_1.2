
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisInputModel } from '@/data/prognosis_pan';

interface TimeSlot {
  id: string;
  label: string;
  input: PrognosisInputModel;
  isSelected: boolean;
}

interface AIAssistantDebatePanelProps {
  selectedSlot: TimeSlot | undefined;
  timeSlots: TimeSlot[];
  onConfirmTrueChart: () => void;
  onToggleDebate: () => void;
}

interface DebateMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export default function AIAssistantDebatePanel({
  selectedSlot,
  timeSlots,
  onConfirmTrueChart,
  onToggleDebate,
}: AIAssistantDebatePanelProps) {
  const [messages, setMessages] = useState<DebateMessage[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      content:
        '您好！我是灵伴AI。我已经分析了三个AI agent的结果。根据综合分析，您的出生时辰最可能是 7:30。请告诉我您对这个结果的看法，或者提出任何疑问。',
      timestamp: '14:30',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: DebateMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: DebateMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'ai',
        content:
          '感谢您的反馈。根据您的信息，我建议继续调整时间方案，观察AI的分析变化。当您确信某个时间是正确的时，可以点击"确认真命盘"按钮。',
        timestamp: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  if (!selectedSlot) return null;

  return (
    <Card className="glass-card sticky top-32 flex flex-col h-[calc(100vh-200px)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
          灵伴AI
        </CardTitle>
        <CardDescription className="text-xs">
          AI助手辅助分析和辩论
        </CardDescription>
      </CardHeader>

      <Separator />

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground'
                }`}
              >
                <SafeIcon
                  name={message.sender === 'user' ? 'User' : 'Sparkles'}
                  className="h-4 w-4"
                />
              </div>

              {/* Message */}
              <div
                className={`flex-1 space-y-1 ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                } flex flex-col`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-xs text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Input Area */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="输入您的问题或反馈..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="bg-background/50"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <SafeIcon name="Send" className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={onToggleDebate}
            variant="outline"
            className="w-full gap-2 text-sm"
          >
            <SafeIcon name="MessageSquare" className="h-4 w-4" />
            深度辩论
          </Button>

          <Button
            onClick={onConfirmTrueChart}
            className="w-full gap-2 bg-mystical-gradient hover:opacity-90 text-sm"
          >
            <SafeIcon name="Check" className="h-4 w-4" />
            确认真命盘
          </Button>
        </div>

        {/* Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-2 space-y-1">
          <p className="text-xs font-semibold text-accent">💡 提示</p>
          <p className="text-xs text-muted-foreground">
            当您确信某个时间是正确的出生时辰时，点击"确认真命盘"按钮保存。
          </p>
        </div>
      </div>
    </Card>
  );
}
