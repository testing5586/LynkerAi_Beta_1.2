
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlchemyHero from '@/components/page-944545/AlchemyHero';
import TrendingSidebar from '@/components/page-944545/TrendingSidebar';
import AlchemyPostCard from '@/components/page-944545/AlchemyPostCard';
import GroupRecommendation from '@/components/page-944545/GroupRecommendation';
import InviteCardModal from '@/components/page-944545/InviteCardModal';
import { MOCK_ALCHEMY_POST } from '@/data/group_social';

export default function AlchemyPageContent() {
  const [selectedPost, setSelectedPost] = useState(MOCK_ALCHEMY_POST);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for trending topics
  const trendingTopics = [
    { id: 't1', title: '2026年经济大趋势预测', count: 234 },
    { id: 't2', title: '火星逆行对事业的影响', count: 189 },
    { id: 't3', title: '紫微斗数命格验证', count: 156 },
    { id: 't4', title: '八字五行平衡分析', count: 142 },
    { id: 't5', title: '占星术与现代生活', count: 128 },
  ];

  // Mock posts data
  const posts = [MOCK_ALCHEMY_POST];

  // Mock groups data
  const groups = [
    {
      id: 'g1',
      name: '丁火身强群',
      memberCount: 235,
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/d37c7429-e1d6-4ad6-95d5-534d8b5a107b.png',
    },
    {
      id: 'g2',
      name: '木火通明交流',
      memberCount: 189,
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/c8d3dd01-a142-4931-952a-21e0cbfe95e8.png',
    },
    {
      id: 'g3',
      name: '北方气候带研究',
      memberCount: 156,
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/6b0fe90e-e07c-4c9a-8c3f-f930af4b2bf9.png',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AlchemyHero onGenerateInvite={() => setIsInviteModalOpen(true)} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Trending Topics */}
          <div className="lg:col-span-1">
            <TrendingSidebar topics={trendingTopics} />
          </div>

          {/* Center - Posts */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="trending">热门</TabsTrigger>
                <TabsTrigger value="recent">最新</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {posts.map((post) => (
                  <AlchemyPostCard
                    key={post.alchemyPostId}
                    post={post}
                    onGenerateInvite={() => setIsInviteModalOpen(true)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {posts.slice(0, 1).map((post) => (
                  <AlchemyPostCard
                    key={post.alchemyPostId}
                    post={post}
                    onGenerateInvite={() => setIsInviteModalOpen(true)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {posts.map((post) => (
                  <AlchemyPostCard
                    key={post.alchemyPostId}
                    post={post}
                    onGenerateInvite={() => setIsInviteModalOpen(true)}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Groups */}
          <div className="lg:col-span-1">
            <GroupRecommendation groups={groups} />
          </div>
        </div>
      </div>

      {/* Invite Card Modal */}
      <InviteCardModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
