
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import OnlineFriendsList from './OnlineFriendsList';
import ChatMessageArea from './ChatMessageArea';
import AIRecommendedTopics from './AIRecommendedTopics';
import PrognosisBoardDisplay from './PrognosisBoardDisplay';
import { MOCK_ONLINE_FRIENDS, MOCK_AI_RECOMMENDED_TOPICS, MOCK_PROGNOSIS_QUICK_VIEW } from '@/data/social_feed';
import { MOCK_USER_ALIASES } from '@/data/base-mock';

interface ChatMessage {
  id: string;
  sender: 'user' | 'friend' | 'ai';
  content: string;
  timestamp: string;
  avatar?: string;
  name?: string;
}

const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg1',
    sender: 'friend',
    name: MOCK_ONLINE_FRIENDS[0].alias,
    avatar: MOCK_ONLINE_FRIENDS[0].avatarUrl,
    content: '你好！我看到我们的命盘有很多相似之处，特别是都是廉贞坐命。',
    timestamp: '14:32',
  },
  {
    id: 'msg2',
    sender: 'user',
    content: '是的！我也注意到了。我们的官禄宫都有武曲，这意味着什么呢？',
    timestamp: '14:33',
  },
  {
    id: 'msg3',
    sender: 'ai',
    content: 'AI提示：根据你们的命盘对比，武曲在官禄宫通常表示事业上有很强的执行力和财务敏感度。你们可以讨论一下在职业选择上是否有相似的倾向。',
    timestamp: '14:34',
  },
  {
    id: 'msg4',
    sender: 'friend',
    name: MOCK_ONLINE_FRIENDS[0].alias,
    avatar: MOCK_ONLINE_FRIENDS[0].avatarUrl,
    content: '我目前在金融行业工作，感觉很适合自己。你呢？',
    timestamp: '14:35',
  },
  {
    id: 'msg5',
    sender: 'user',
    content: '我也是！我在投资公司做分析师。看来我们真的很同频呢。',
    timestamp: '14:36',
  },
];

export default function HomologyHomologyChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(MOCK_ONLINE_FRIENDS[0]);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
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

    // Simulate friend response after a delay
    setTimeout(() => {
      const friendResponse: ChatMessage = {
        id: `msg${messages.length + 2}`,
        sender: 'friend',
        name: selectedFriend.alias,
        avatar: selectedFriend.avatarUrl,
        content: '这很有趣！我们确实有很多共同点。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, friendResponse]);
    }, 1000);
  };

  const handleSelectTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="flex h-full w-full gap-4 p-4 bg-background">
      {/* Left Sidebar - Online Friends */}
      <div className="w-64 flex flex-col">
        <OnlineFriendsList
          friends={MOCK_ONLINE_FRIENDS}
          selectedFriend={selectedFriend}
          onSelectFriend={setSelectedFriend}
        />
      </div>

      {/* Center - Chat Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Chat Header */}
        <Card className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar
              user={{
                name: selectedFriend.alias,
                avatar: selectedFriend.avatarUrl,
                country: selectedFriend.geoTag?.country,
                region: selectedFriend.geoTag?.region,
              }}
              size="default"
              showHoverCard={false}
            />
            <div>
              <h2 className="font-semibold">{selectedFriend.alias}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedFriend.geoTag?.country} · {selectedFriend.geoTag?.region}
              </p>
            </div>
            {selectedFriend.isHomologyMatch && (
              <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                <SafeIcon name="Sparkles" className="w-3 h-3" />
                同命匹配
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = './page-945206.html'}
            title="返回匹配总览"
          >
            <SafeIcon name="ArrowLeft" className="w-5 h-5" />
          </Button>
        </Card>

        {/* Messages Area */}
        <ChatMessageArea messages={messages} scrollRef={scrollRef} />

        {/* Input Area */}
        <Card className="glass-card p-4">
          <div className="flex gap-2">
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
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-mystical-gradient hover:opacity-90"
            >
              <SafeIcon name="Send" className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - AI Topics & Prognosis */}
      <div className="w-80 flex flex-col gap-4">
        {/* AI Recommended Topics */}
        <AIRecommendedTopics
          topics={MOCK_AI_RECOMMENDED_TOPICS}
          expandedTopic={expandedTopic}
          onSelectTopic={handleSelectTopic}
        />

        <Separator className="my-2" />

        {/* Prognosis Board Display */}
        <PrognosisBoardDisplay
          userPrognosisData={MOCK_PROGNOSIS_QUICK_VIEW}
          friendPrognosisData={MOCK_PROGNOSIS_QUICK_VIEW}
          userName={MOCK_USER_ALIASES[0]}
          friendName={selectedFriend.alias}
        />
      </div>
    </div>
  );
}
