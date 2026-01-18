
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';
import LeftSidebar from './LeftSidebar';
import NewsfeedFeed from './NewsfeedFeed';
import RightSidebar from './RightSidebar';
import AIAssistantFloat from '@/components/common/AIAssistantFloat';

// Mock data
const mockFeedItems = [
  {
    id: '1',
    author: {
      name: '灵客用户A',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'CN',
      isPro: false,
    },
    content: '今天的八字分析真的太准了！感谢命理师的耐心讲解，对我的人生规划有了新的认识。',
    image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/12/0da6bdf5-60eb-42f4-8571-c432bf485343.png',
    timestamp: '2小时前',
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ['#八字', '#命理', '#人生规划'],
  },
  {
    id: '2',
    author: {
      name: '灵客用户B',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'US',
      isPro: true,
    },
    content: '紫薇命盘显示今年是转运年，各位同命人一起加油！',
    timestamp: '4小时前',
    likes: 156,
    comments: 42,
    shares: 18,
    tags: ['#紫薇', '#转运', '#同命'],
  },
  {
    id: '3',
    author: {
      name: '灵客用户C',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      country: 'JP',
      isPro: false,
    },
    content: '论坛里的这篇文章讲得太好了，推荐大家看看！',
    timestamp: '6小时前',
    likes: 89,
    comments: 23,
    shares: 12,
    tags: ['#论坛', '#知识分享'],
  },
];

const mockOnlineUsers = [
  { id: '1', name: '灵客用户A', avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png', status: 'online' },
  { id: '2', name: '灵客用户B', avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png', status: 'online' },
  { id: '3', name: '灵客用户D', avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png', status: 'online' },
  { id: '4', name: '灵客用户E', avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png', status: 'away' },
  { id: '5', name: '灵客用户F', avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png', status: 'online' },
];

const mockUserBaziChart = {
  year: '甲子',
  month: '丙寅',
  day: '戊午',
  hour: '己卯',
  elements: {
    wood: 2,
    fire: 2,
    earth: 1,
    metal: 0,
    water: 1,
  },
};

const mockUserZiWeiChart = {
  mainStar: '紫微',
  secondaryStar: '天府',
  palace: '命宫',
  luckyStars: ['左辅', '右弼'],
};

export default function LynkermatesPage() {
  const [feedItems, setFeedItems] = useState(mockFeedItems);
  const [onlineUsers, setOnlineUsers] = useState(mockOnlineUsers);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter feed items based on active tab
  const filteredFeedItems = feedItems.filter((item) => {
    if (activeTab === 'friends') {
      return !item.author.isPro;
    } else if (activeTab === 'masters') {
      return item.author.isPro;
    }
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Left Sidebar */}
      <LeftSidebar />

{/* Main Content */}
      <div className="flex-1 overflow-y-auto border-r border-border">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="px-4 pt-6 pb-2">
            <h1 className="text-4xl font-bold text-gradient-mystical">灵友圈</h1>
          </div>

          {/* Create Post Section */}
          <Card className="m-4 p-4 glass-card border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="User" className="w-5 h-5 text-primary" />
              </div>
              <Button
                variant="outline"
                className="flex-1 justify-start text-muted-foreground"
                asChild
              >
                <a href="./page-944864.html">
                  <SafeIcon name="Edit" className="w-4 h-4 mr-2" />
                  分享你的想法...
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                asChild
              >
                <a href="./page-944864.html">
                  <SafeIcon name="Image" className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </Card>

          {/* Tabs */}
          <div className="px-4 mb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="all">全部动态</TabsTrigger>
                <TabsTrigger value="friends">朋友</TabsTrigger>
                <TabsTrigger value="masters">命理师</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Feed Items */}
          <div className="space-y-4 px-4 pb-8">
            {filteredFeedItems.length > 0 ? (
              filteredFeedItems.map((item) => (
                <NewsfeedFeed key={item.id} item={item} />
              ))
            ) : (
              <Card className="p-8 text-center glass-card border-border/50">
                <SafeIcon name="MessageSquare" className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">暂无动态</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        onlineUsers={onlineUsers}
        baziChart={mockUserBaziChart}
        ziWeiChart={mockUserZiWeiChart}
      />

      {/* AI Assistant Float */}
      <AIAssistantFloat />
    </div>
  );
}
