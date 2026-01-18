
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import type { KBNoteModel } from '@/data/knowledge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIResearchChatProps {
  notes: KBNoteModel[];
}

export default function AIResearchChat({ notes }: AIResearchChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是您的AI研究助手。我可以帮助您分析知识库中的笔记，进行命理研究讨论。请告诉我您想研究的主题或问题。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input, notes),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Info Card */}
      <Card className="glass-card p-4 bg-primary/10 border-primary/20">
        <div className="flex items-start gap-3">
          <SafeIcon name="Lightbulb" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-primary mb-1">AI研究助手已加载您的知识库</p>
            <p className="text-muted-foreground">
              {notes.length} 条笔记已索引，您可以提问关于这些笔记的任何问题
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Messages */}
        <ScrollArea className="flex-1 rounded-lg border bg-background/50 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                    <span className="text-sm">AI正在思考...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="space-y-2">
          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">建议问题：</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '分析我的八字笔记中的用神',
                  '紫微命盘中的七杀星代表什么',
                  '如何理解五行平衡',
                  '总结我的研究主题',
                ].map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInput(question);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="输入您的问题或研究主题..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-mystical-gradient hover:opacity-90"
              size="icon"
            >
              <SafeIcon name="Send" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateAIResponse(userInput: string, notes: KBNoteModel[]): string {
  const responses = [
    `根据您的知识库中的 ${notes.length} 条笔记，我发现了一些有趣的模式。关于"${userInput}"，我建议您重点关注以下几点：\n\n1. 在您的笔记中，这个主题与多个命理维度相关\n2. 建议结合八字和紫微的分析来获得更全面的理解\n3. 您可以创建一个新的研究主题来深入探讨这个问题`,

    `这是一个很好的问题！基于您的知识库内容，我可以提供以下分析：\n\n关于"${userInput}"：\n- 这涉及到命理学中的核心概念\n- 在您的笔记中有相关的案例分析\n- 建议参考您导入的相关文章进行对比研究`,

    `我注意到您的知识库中有关于"${userInput}"的多条笔记。让我为您总结一下关键要点：\n\n1. 理论基础：这个概念在传统命理学中的定义\n2. 实践应用：如何在实际分析中应用\n3. 现代解读：结合当代社会背景的理解\n\n您想深入了解哪个方面呢？`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
