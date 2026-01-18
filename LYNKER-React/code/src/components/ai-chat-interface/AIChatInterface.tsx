
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import ChatMessage from './ChatMessage';
import RealtimeTranscript from './RealtimeTranscript';
import AIReminder from './AIReminder';
import ChatSidebar from './ChatSidebar';
import { MOCK_AI_CHAT_HISTORY } from '@/data/ai_settings';
import type { AIChatMessageModel } from '@/data/ai_settings';

export default function AIChatInterface() {
  const [messages, setMessages] = useState<AIChatMessageModel[]>(MOCK_AI_CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showReminder, setShowReminder] = useState(true);
  const [autoSaveNotes, setAutoSaveNotes] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: AIChatMessageModel = {
      messageId: `msg_${Date.now()}`,
      sender: 'user',
      content: inputValue,
      isContextual: false,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: AIChatMessageModel = {
        messageId: `msg_${Date.now() + 1}`,
        sender: 'ai',
        content: `感谢您的提问。根据您的命盘分析，我发现了一些有趣的模式。让我为您详细解释...`,
        isContextual: false,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center">
                <SafeIcon name="Sparkles" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">AI命理助手</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  在线
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTranscript(!showTranscript)}
                title="实时字幕"
              >
                <SafeIcon name="Captions" className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReminder(!showReminder)}
                title="AI提醒"
              >
                <SafeIcon name="Bell" className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a href="./ai-chat-interface.html" title="关闭">
                  <SafeIcon name="X" className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.messageId} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-center py-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Real-time Transcript */}
        {showTranscript && <RealtimeTranscript />}

        {/* AI Reminder */}
        {showReminder && <AIReminder />}

        {/* Input Area */}
        <div className="border-t bg-card/50 backdrop-blur-sm p-4 space-y-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <SafeIcon name="Info" className="h-4 w-4" />
            <span>提示：您的对话内容将自动保存为Markdown笔记</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-primary hover:text-primary"
              onClick={() => setAutoSaveNotes(!autoSaveNotes)}
            >
              {autoSaveNotes ? '✓ 自动保存' : '关闭自动保存'}
            </Button>
          </div>

          <div className="flex items-end space-x-2">
            <Input
              placeholder="输入您的问题或命理相关内容..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 resize-none"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-mystical-gradient hover:opacity-90"
            >
              <SafeIcon name="Send" className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = './ai-generated-note-view.html'}
            >
              <SafeIcon name="FileText" className="h-4 w-4 mr-1" />
              查看AI生成笔记
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = './prophecy-verification-record.html'}
            >
              <SafeIcon name="CheckCircle" className="h-4 w-4 mr-1" />
              预言应验记录
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = './knowledge-base.html'}
            >
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-1" />
              查看知识库
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <ChatSidebar />
    </div>
  );
}
