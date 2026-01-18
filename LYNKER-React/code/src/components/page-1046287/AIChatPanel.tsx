
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIChatPanelProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isClient: boolean;
}

export default function AIChatPanel({
  chatHistory,
  onSendMessage,
  isClient,
}: AIChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (!inputValue.trim() || !isClient) return;

    setIsLoading(true);
    onSendMessage(inputValue);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="flex-1 overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm border-muted-foreground/20">
      {/* Chat Header */}
      <div className="border-b p-4 bg-muted/20">
        <div className="flex items-center gap-2">
          <SafeIcon name="MessageSquare" className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">灵伴AI助手</h3>
          <span className="text-xs text-muted-foreground ml-auto">在线</span>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="p-4 space-y-4">
          {chatHistory.length > 0 ? (
            chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  {message.role === 'user' ? (
                    <>
                      <AvatarImage src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        我
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/22/18bb2502-f0df-4588-869f-14b3c1ddbfb9.png" />
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        AI
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                <div
                  className={`flex-1 max-w-xs ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <SafeIcon name="MessageCircle" className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">开始与AI助手对话</p>
            </div>
          )}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-muted/20">
        <div className="flex gap-2">
          <Input
            placeholder="输入消息..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={!isClient || isLoading}
            className="bg-background border-muted-foreground/20"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || !isClient || isLoading}
            className="bg-mystical-gradient hover:opacity-90"
            size="icon"
          >
            <SafeIcon name="Send" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
