
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import ForumHero from '@/components/forum-homepage/ForumHero';
import ForumSidebar from '@/components/forum-homepage/ForumSidebar';
import ForumPostList from '@/components/forum-homepage/ForumPostList';
import ForumRightSidebar from '@/components/forum-homepage/ForumRightSidebar';
import { forumPostsMock, forumCategoriesMock } from '@/data/forum-mock';

type SortType = 'recent' | 'hot';

export default function ForumContent() {
  const [sortType, setSortType] = useState<SortType>('hot');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search
  const filteredPosts = forumPostsMock.filter((post) => {
    const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'hot') {
      return (b.views + b.comments) - (a.views + a.comments);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleCreatePost = () => {
    window.location.href = './create-post.html';
  };

  const handleViewPost = (postId: string) => {
    window.location.href = `./forum-post-detail.html?id=${postId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ForumHero onSearch={setSearchQuery} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ForumSidebar
              categories={forumCategoriesMock}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Tabs value={sortType} onValueChange={(v) => setSortType(v as SortType)}>
                  <TabsList className="bg-muted">
                    <TabsTrigger value="hot" className="flex items-center space-x-1">
                      <SafeIcon name="Flame" className="w-4 h-4" />
                      <span>热门</span>
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="flex items-center space-x-1">
                      <SafeIcon name="Clock" className="w-4 h-4" />
                      <span>最新</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Button
                onClick={handleCreatePost}
                className="bg-mystical-gradient hover:opacity-90 flex items-center space-x-2"
              >
                <SafeIcon name="Plus" className="w-4 h-4" />
                <span>发布新帖</span>
              </Button>
            </div>

            {/* Posts List */}
            <ForumPostList posts={sortedPosts} onViewPost={handleViewPost} />

            {/* Empty State */}
            {sortedPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <SafeIcon name="MessageSquare" className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">暂无帖子</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? '没有找到匹配的帖子' : '这个分类还没有帖子，成为第一个发帖的人吧'}
                </p>
                <Button onClick={handleCreatePost} variant="outline">
                  <SafeIcon name="Plus" className="mr-2 w-4 h-4" />
                  发布新帖
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <ForumRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
