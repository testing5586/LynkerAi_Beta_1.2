
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { mockChatHistory } from '@/data/knowledge-base-mock';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relatedArticles?: string[];
}

interface Article {
  id: string;
  title: string;
  content: string;
}

interface AIChatProps {
  selectedAI: string;
  articles: Article[];
}

export default function AIChat({ selectedAI, articles }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockChatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `感谢您的提问。根据您的知识库内容，我发现这与您之前记录的命理分析有关。让我为您详细解释...`,
        timestamp: new Date().toISOString(),
        relatedArticles: articles.slice(0, 2).map((a) => a.id),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Area */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="glass-card border-primary/20 flex flex-col h-[600px]">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="MessageCircle" className="w-5 h-5 text-accent" />
              AI命理研究助手
            </CardTitle>
            <CardDescription>
              与AI讨论您的命理研究，获取深度分析
            </CardDescription>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.relatedArticles && message.relatedArticles.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-current/20 space-y-1">
                        <p className="text-xs opacity-75">相关文章：</p>
                        {message.relatedArticles.map((articleId) => {
                          const article = articles.find((a) => a.id === articleId);
                          return article ? (
                            <a
                              key={articleId}
                              href={`#article-${articleId}`}
                              className="text-xs underline opacity-75 hover:opacity-100 block"
                            >
                              {article.title}
                            </a>
                          ) : null;
                        })}
                      </div>
                    )}
                    <p className="text-xs opacity-50 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="输入您的问题..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="bg-muted/50"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Send" className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              按 Enter 发送，Shift+Enter 换行
            </p>
          </div>
        </Card>
      </div>

      {/* Sidebar - Related Articles & Tips */}
      <div className="space-y-4">
        {/* AI Info */}
        <Card className="glass-card border-accent/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="Zap" className="w-4 h-4 text-accent" />
              当前AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium capitalize">{selectedAI}</p>
              <p className="text-xs text-muted-foreground mt-1">
                高级命理分析模型
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full text-xs"
              asChild
            >
              <a href="./page-979411.html">
                <SafeIcon name="Settings" className="w-3 h-3 mr-1" />
                切换AI
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="Lightbulb" className="w-4 h-4 text-accent" />
              使用提示
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>• 提供具体的命理信息以获得更准确的分析</p>
            <p>• 引用您的笔记中的内容进行深度讨论</p>
            <p>• 使用"对比"、"分析"等关键词获得结构化回答</p>
            <p>• 所有对话将自动保存到您的知识库</p>
          </CardContent>
        </Card>

        {/* Recent Articles */}
        {articles.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <SafeIcon name="BookOpen" className="w-4 h-4 text-accent" />
                最近文章
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {articles.slice(0, 3).map((article) => (
                <a
                  key={article.id}
                  href={`#article-${article.id}`}
                  className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <p className="text-xs font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </p>
                </a>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
