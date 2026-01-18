
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset } from '@/components/ui/sidebar';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_ONLINE_FRIENDS, MOCK_AI_RECOMMENDED_TOPICS, MOCK_PROGNOSIS_QUICK_VIEW } from '@/data/social_feed';

interface ChatMessage {
  id: string;
  sender: 'user' | 'friend' | 'ai';
  content: string;
  timestamp: string;
  avatar?: string;
  name?: string;
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'msg1',
    sender: 'friend',
    name: MOCK_ONLINE_FRIENDS[0].alias,
    avatar: MOCK_ONLINE_FRIENDS[0].avatarUrl,
    content: '你好！我看到我们都是武曲贪狼的组合，太巧合了！',
    timestamp: '14:32',
  },
  {
    id: 'msg2',
    sender: 'user',
    content: '是啊！我也注意到了。你的命盘中武曲在哪个宫位呢？',
    timestamp: '14:33',
  },
  {
    id: 'msg3',
    sender: 'friend',
    name: MOCK_ONLINE_FRIENDS[0].alias,
    avatar: MOCK_ONLINE_FRIENDS[0].avatarUrl,
    content: '在官禄宫，所以我一直在金融行业工作。你呢？',
    timestamp: '14:34',
  },
  {
    id: 'msg4',
    sender: 'ai',
    name: '灵伴AI',
    content: '💡 AI建议：你们都有武曲贪狼的组合，可以讨论一下在事业发展中如何平衡物质追求与精神满足。这是你们命格的共同挑战。',
    timestamp: '14:35',
  },
];

const CURRENT_USER = {
  name: '星空下的观测者Q',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
  country: 'CN',
  region: '深圳',
};

const FRIEND = MOCK_ONLINE_FRIENDS[0];

export default function HomologyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg${messages.length + 1}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate friend response after 1 second
    setTimeout(() => {
      const friendResponse: ChatMessage = {
        id: `msg${messages.length + 2}`,
        sender: 'friend',
        name: FRIEND.alias,
        avatar: FRIEND.avatarUrl,
        content: '这是一个很有趣的观点！我也有类似的想法。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, friendResponse]);
    }, 1000);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    const aiMessage: ChatMessage = {
      id: `msg${messages.length + 1}`,
      sender: 'ai',
      name: '灵伴AI',
      content: `💡 AI建议：${topic}`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, aiMessage]);
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)] bg-background">
      {/* Left Sidebar - Online Friends */}
      <Sidebar className="w-64 border-r bg-card">
        <SidebarHeader className="border-b p-4">
          <h2 className="font-semibold flex items-center space-x-2">
            <SafeIcon name="Users" className="h-5 w-5 text-primary" />
            <span>在线同命友</span>
          </h2>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {/* Current Chat Friend */}
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center space-x-3 mb-2">
                  <UserAvatar user={{ name: FRIEND.alias, avatar: FRIEND.avatarUrl }} size="default" showHoverCard={false} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{FRIEND.alias}</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">在线</span>
                    </div>
                  </div>
                </div>
                <Badge className="w-full justify-center bg-accent text-accent-foreground">
                  <SafeIcon name="Heart" className="w-3 h-3 mr-1" />
                  同命匹配
                </Badge>
              </div>

              <Separator className="my-4" />

              {/* Other Online Friends */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3 px-2">其他在线好友</p>
                <div className="space-y-2">
                  {MOCK_ONLINE_FRIENDS.slice(1).map((friend) => (
                    <button
                      key={friend.userId}
                      className="w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <UserAvatar user={{ name: friend.alias, avatar: friend.avatarUrl }} size="small" showHoverCard={false} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{friend.alias}</p>
                          {friend.isHomologyMatch && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              同命
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>

      {/* Main Chat Area */}
      <SidebarInset className="flex flex-col flex-1">
        {/* Chat Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserAvatar user={{ name: FRIEND.alias, avatar: FRIEND.avatarUrl }} size="default" showHoverCard={false} />
              <div>
                <h2 className="font-semibold">{FRIEND.alias}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>在线</span>
                  {FRIEND.geoTag && (
                    <>
                      <span>•</span>
                      <span>{FRIEND.geoTag.country}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href="./page-945206.html">
                <SafeIcon name="ArrowLeft" className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-end space-x-2 max-w-xs ${
                        msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      {msg.sender !== 'user' && (
                        <UserAvatar
                          user={{ name: msg.name || '', avatar: msg.avatar }}
                          size="small"
                          showHoverCard={false}
                        />
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : msg.sender === 'ai'
                            ? 'bg-accent/20 text-foreground border border-accent/30'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {msg.sender !== 'user' && (
                          <p className="text-xs font-semibold mb-1 opacity-70">{msg.name}</p>
                        )}
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-60 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="border-t bg-card/50 backdrop-blur-sm p-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="输入消息..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
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
            </div>
          </div>

          {/* Right Sidebar - AI Topics & Prognosis */}
          <div className="w-80 border-l bg-card/50 backdrop-blur-sm flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* AI Recommended Topics */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent" />
                    <span>AI推荐话题</span>
                  </h3>
                  <div className="space-y-2">
                    {MOCK_AI_RECOMMENDED_TOPICS.map((topic) => (
                      <button
                        key={topic.topicId}
                        onClick={() => handleTopicClick(topic.suggestedQuery)}
                        className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
                          selectedTopic === topic.suggestedQuery
                            ? 'bg-primary/10 border-primary'
                            : 'bg-muted/30 border-muted hover:border-primary/50'
                        }`}
                      >
                        <p className="font-medium mb-1">{topic.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {topic.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Prognosis Display */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <SafeIcon name="Star" className="h-5 w-5 text-accent" />
                    <span>命盘对比</span>
                  </h3>

                  {/* Current User Prognosis */}
                  <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-muted">
                    <div className="flex items-center space-x-2 mb-2">
                      <UserAvatar
                        user={{ name: CURRENT_USER.name, avatar: CURRENT_USER.avatar }}
                        size="small"
                        showHoverCard={false}
                      />
                      <span className="text-sm font-semibold">{CURRENT_USER.name}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="font-semibold text-muted-foreground mb-1">八字</p>
                        <p className="text-foreground">{MOCK_PROGNOSIS_QUICK_VIEW.baziSummary}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground mb-1">紫微</p>
                        <p className="text-foreground">{MOCK_PROGNOSIS_QUICK_VIEW.ziweiSummary}</p>
                      </div>
                      {MOCK_PROGNOSIS_QUICK_VIEW.isVerified && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                          已验证真命盘
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Friend Prognosis */}
                  <div className="p-3 rounded-lg bg-muted/30 border border-muted">
                    <div className="flex items-center space-x-2 mb-2">
                      <UserAvatar
                        user={{ name: FRIEND.alias, avatar: FRIEND.avatarUrl }}
                        size="small"
                        showHoverCard={false}
                      />
                      <span className="text-sm font-semibold">{FRIEND.alias}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="font-semibold text-muted-foreground mb-1">八字</p>
                        <p className="text-foreground">日主：乙木。身弱用印，喜水木，忌金。当前大运逢官，适宜稳定发展。</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground mb-1">紫微</p>
                        <p className="text-foreground">命宫：武曲贪狼。财帛宫：廉贞。事业与财富并重，需平衡物质与精神。</p>
                      </div>
                      <Badge variant="secondary" className="w-fit text-xs">
                        <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                        已验证真命盘
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Common Points */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                    <span>同频点</span>
                  </h3>
<div className="space-y-2">
                     <Badge variant="outline" className="w-full justify-start">
                       <SafeIcon name="Check" className="w-3 h-3 mr-2" />
                       都有武曲贪狼组合
                     </Badge>
                   </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
