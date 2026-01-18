
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';
import ArenaHero from './ArenaHero';
import InviteCardGenerator from './InviteCardGenerator';
import AlchemyPostCard from './AlchemyPostCard';
import TrendingSidebar from './TrendingSidebar';
import GroupsSidebar from './GroupsSidebar';
import { MOCK_ALCHEMY_POST, MOCK_ALCHEMY_HERO_IMAGE } from '@/data/group_social';

// Mock data for posts
const MOCK_ALCHEMY_POSTS = [
  MOCK_ALCHEMY_POST,
{
    ...MOCK_ALCHEMY_POST,
    alchemyPostId: 'alb002',
    title: '2026年财运预测：哪些星座会迎来大转机？',
    externalAuthor: '小红书-命理小姐姐',
    platform: 'XiaoHongShu',
    originalUrl: 'https://www.xiaohongshu.com/explore/xxxxx',
    thumbnailUrl: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/71873477-5198-4aac-951c-68342a22c0b9.png',
    dateImported: '2025-11-12',
    totalVotes: 89,
    votes: {
      perfect: 32,
      accurate: 45,
      reserved: 8,
      inaccurate: 3,
      nonsense: 1,
    },
  },
{
    ...MOCK_ALCHEMY_POST,
    alchemyPostId: 'alb003',
    title: '紫微斗数天机星的秘密：为什么聪慧的人容易陷入困境？',
    externalAuthor: '抖音-玄学研究所',
    platform: 'Douyin',
    originalUrl: 'https://www.douyin.com/video/xxxxx',
    thumbnailUrl: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/71873477-5198-4aac-951c-68342a22c0b9.png',
    dateImported: '2025-11-11',
    totalVotes: 234,
    votes: {
      perfect: 95,
      accurate: 110,
      reserved: 20,
      inaccurate: 7,
      nonsense: 2,
    },
  },
];

const MOCK_TRENDING_TOPICS = [
  { id: 't001', title: '2026年财运预测', count: 1250 },
  { id: 't002', title: '紫微斗数天机星', count: 980 },
  { id: 't003', title: '八字格局分析', count: 756 },
  { id: 't004', title: '占星术应用', count: 543 },
  { id: 't005', title: '命理师资质验证', count: 421 },
];

export default function ArenaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteGenerator, setShowInviteGenerator] = useState(false);

  const filteredPosts = MOCK_ALCHEMY_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.externalAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.platform === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ArenaHero />

      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Trending Topics */}
          <div className="lg:col-span-1">
            <TrendingSidebar topics={MOCK_TRENDING_TOPICS} />
          </div>

          {/* Center - Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="搜索博主或内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => setShowInviteGenerator(!showInviteGenerator)}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                  生成邀请函
                </Button>
              </div>

              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="Bilibili">B站</TabsTrigger>
                  <TabsTrigger value="XiaoHongShu">小红书</TabsTrigger>
                  <TabsTrigger value="Douyin">抖音</TabsTrigger>
                  <TabsTrigger value="YouTube">YouTube</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Invite Generator Modal */}
            {showInviteGenerator && (
              <InviteCardGenerator onClose={() => setShowInviteGenerator(false)} />
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <AlchemyPostCard key={post.alchemyPostId} post={post} />
                ))
              ) : (
                <div className="text-center py-12">
                  <SafeIcon name="Search" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">未找到相关内容</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Groups */}
          <div className="lg:col-span-1">
            <GroupsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
