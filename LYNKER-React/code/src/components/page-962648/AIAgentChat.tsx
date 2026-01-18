
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel, PrognosisAgentResultModel } from '@/data/prognosis_pan';
import type { PrognosisInputModel } from '@/data/prognosis_pan';

interface AIAgentChatProps {
  agent: AIAssistantModel;
  result: PrognosisAgentResultModel;
  birthtimeInput: PrognosisInputModel;
  adjustedMinute: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export default function AIAgentChat({
  agent,
  result,
  birthtimeInput,
  adjustedMinute,
}: AIAgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      content: `我是${agent.name}。我已分析了您的出生信息。请告诉我您对这个分析的看法，或提出任何疑问。`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        content: `感谢您的提问。根据您的出生时间 ${birthtimeInput.birthDate} ${String(birthtimeInput.birthTimeHour).padStart(2, '0')}:${String(adjustedMinute).padStart(2, '0')}，我的分析是...`,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-96 space-y-3">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 border rounded-lg p-3 bg-background/50">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-xs ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="break-words">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          placeholder="提出您的问题..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
          className="text-xs h-8 bg-background/50"
        />
        <Button
          size="sm"
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="h-8 px-3"
        >
          <SafeIcon name="Send" className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
