import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export default function ConsultationAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      content: '我是您的AI助手。我可以帮助您准备更好的问题来问命理师，或者解答关于命理的基础疑问。请问有什么我可以帮助的吗？',
      timestamp: '14:30',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `m${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: `m${Date.now() + 1}`,
        sender: 'ai',
        content: `关于您提出的问题"${inputValue}"，这是一个很好的问题。建议您可以在咨询时这样问命理师：\n\n1. 请详细解释这个问题的含义\n2. 在我的命盘中有什么体现\n3. 如何应对或调整\n\n这样能帮助您获得更深入的见解。`,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    '怎样正确理解紫微命盘？',
    '八字和紫微的区别是什么？',
    '如何问命理师关于财运的问题？',
    '应该如何为咨询做准备？',
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <SafeIcon name="MessageCircle" className="w-4 h-4 text-accent" />
          AI助手
        </h3>
        <Badge variant="secondary" className="text-xs">
          在线
        </Badge>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 pr-4 mb-3">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-xs ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted/50 text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex space-x-2 px-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Quick questions */}
      {messages.length === 1 && (
        <div className="mb-3 space-y-2">
          <p className="text-xs text-muted-foreground font-semibold">快速问题：</p>
          <div className="space-y-1">
            {quickQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-auto py-1 px-2 text-foreground hover:bg-muted/50"
                onClick={() => {
                  setInputValue(question);
                }}
              >
                <SafeIcon name="HelpCircle" className="w-3 h-3 mr-2" />
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="问我一个问题..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="text-xs h-8"
        />
        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="h-8 w-8"
        >
          <SafeIcon name="Send" className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
}