
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlchemyHeroSection from './AlchemyHeroSection';
import TrendingTopics from './TrendingTopics';
import AlchemyPostCard from './AlchemyPostCard';
import GroupRecommendations from './GroupRecommendations';
import InviteCardGenerator from './InviteCardGenerator';
import { MOCK_ALCHEMY_POST } from '@/data/group_social';

export default function AlchemyLayout() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [showInviteGenerator, setShowInviteGenerator] = useState(false);

  // Mock data for multiple posts
  const alchemyPosts = [MOCK_ALCHEMY_POST];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AlchemyHeroSection onGenerateInvite={() => setShowInviteGenerator(true)} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Trending Topics */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <TrendingTopics />
          </div>

          {/* Center - Posts */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="trending">热门</TabsTrigger>
                <TabsTrigger value="recent">最新</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {alchemyPosts.map((post) => (
                  <AlchemyPostCard key={post.alchemyPostId} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {alchemyPosts
                  .sort((a, b) => b.totalVotes - a.totalVotes)
                  .map((post) => (
                    <AlchemyPostCard key={post.alchemyPostId} post={post} />
                  ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {alchemyPosts.map((post) => (
                  <AlchemyPostCard key={post.alchemyPostId} post={post} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Group Recommendations */}
          <div className="lg:col-span-1 order-3">
            <GroupRecommendations />
          </div>
        </div>
      </div>

      {/* Invite Card Generator Modal */}
      {showInviteGenerator && (
        <InviteCardGenerator onClose={() => setShowInviteGenerator(false)} />
      )}
    </div>
  );
}
