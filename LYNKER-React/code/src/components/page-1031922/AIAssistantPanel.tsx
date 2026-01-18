'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import { cn } from '@/lib/utils';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistantPanel() {
const [isClient, setIsClient] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('chatgpt5');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是您的命理研究助手。我可以帮助您分析命理知识、提炼关键数据，并将其保存到长期记忆库。请告诉我您想研究的内容。',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setIsClient(false);
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '我已收到您的信息。正在分析相关的命理知识...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const selectedProviderData = MOCK_AI_ASSISTANTS.find(p => p.id === selectedProvider);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-mystical-gradient shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-white glow-primary"
          title="打开AI助手"
        >
          <SafeIcon name="MessageCircle" className="h-6 w-6" />
        </button>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setIsExpanded(false)}
          />

          {/* Panel */}
          <Card className={cn(
            "fixed z-40 flex flex-col shadow-2xl glass-card transition-all duration-300",
            isEnlarged 
              ? "bottom-4 right-4 w-[85vw] h-[85vh] max-w-6xl max-h-[85vh]" 
              : "bottom-6 right-6 w-96 h-[600px]"
          )}>
{/* Header */}
             <div className="flex items-center justify-between p-4 border-b">
               <div className="flex items-center gap-2 flex-1">
                 <div className="w-8 h-8 rounded-full bg-mystical-gradient flex items-center justify-center flex-shrink-0">
                   <SafeIcon name="Sparkles" className="h-4 w-4 text-white" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <h3 className="font-semibold text-sm">灵伴AI</h3>
                   <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                     <SelectTrigger className="h-7 text-xs w-full">
                       <SelectValue placeholder="选择AI提供商" />
                     </SelectTrigger>
                     <SelectContent className="z-50">
                       {MOCK_AI_ASSISTANTS.map((provider) => (
                         <SelectItem key={provider.id} value={provider.id}>
                           {provider.name}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
               </div>
               <div className="flex items-center gap-1 flex-shrink-0">
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={() => setIsEnlarged(!isEnlarged)}
                   className="h-8 w-8"
                   title={isEnlarged ? "缩小" : "放大"}
                 >
                   <SafeIcon name={isEnlarged ? "Minimize2" : "Maximize2"} className="h-4 w-4" />
                 </Button>
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={() => setIsExpanded(false)}
                   className="h-8 w-8"
                 >
                   <SafeIcon name="X" className="h-4 w-4" />
                 </Button>
               </div>
             </div>

            {/* Content - Tabs when enlarged, normal view otherwise */}
            {isEnlarged ? (
              <Tabs defaultValue="chat" className="flex flex-col flex-1 overflow-hidden">
                <TabsList className="m-4 mb-2">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <SafeIcon name="MessageCircle" className="h-4 w-4" />
                    对话
                  </TabsTrigger>
                  <TabsTrigger value="provider" className="flex items-center gap-2">
                    <SafeIcon name="Settings" className="h-4 w-4" />
                    AI提供商
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col m-0 p-4 pt-2">
                  {/* Messages */}
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            'flex gap-2',
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <SafeIcon name="Sparkles" className="h-3 w-3 text-primary" />
                            </div>
                          )}
                          <div
                            className={cn(
                              'max-w-xl px-4 py-3 rounded-lg text-sm',
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            )}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="输入您的问题..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="text-sm"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="bg-mystical-gradient hover:opacity-90"
                      >
                        <SafeIcon name="Send" className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs flex-1"
                        asChild
                      >
<a href="./page-1041776.html">
                          <SafeIcon name="Brain" className="h-3 w-3 mr-1" />
                          记忆库
                        </a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="provider" className="flex-1 overflow-auto m-0 p-4 pt-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">选择AI提供商</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {MOCK_AI_ASSISTANTS.map((provider) => (
                          <button
                            key={provider.id}
                            onClick={() => setSelectedProvider(provider.id)}
                            className={cn(
                              "p-3 rounded-lg border-2 transition-all text-left",
                              selectedProvider === provider.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                <SafeIcon name={provider.iconName} className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-semibold text-sm">{provider.name}</h5>
                                  {selectedProvider === provider.id && (
                                    <Badge className="text-xs bg-primary text-primary-foreground">
                                      <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                                      已选择
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {provider.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedProviderData && (
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="text-sm font-semibold mb-2">当前选择</p>
                        <p className="text-sm text-muted-foreground">
                          已选择 <span className="font-semibold text-foreground">{selectedProviderData.name}</span> 作为AI助手。
                        </p>
                        <a
                          href={selectedProviderData.keySetupLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        >
                          <SafeIcon name="ExternalLink" className="h-3 w-3" />
                          {selectedProviderData.keySetupLinkTitle}
                        </a>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex gap-2',
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <SafeIcon name="Sparkles" className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            'max-w-xs px-3 py-2 rounded-lg text-sm',
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="输入您的问题..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      className="text-sm"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-mystical-gradient hover:opacity-90"
                    >
                      <SafeIcon name="Send" className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs flex-1"
                      asChild
                    >
<a href="./page-1041776.html">
                         <SafeIcon name="Brain" className="h-3 w-3 mr-1" />
                         记忆库
                       </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </>
      )}
    </>
  );
}