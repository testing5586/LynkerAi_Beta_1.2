
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';
import GroupSidebar from './GroupSidebar';
import GroupCard from './GroupCard';
import GroupRecommendation from './GroupRecommendation';
import OnlineFriends from './OnlineFriends';
import { MOCK_GROUP } from '@/data/group_social';

export default function GroupPageContent() {
  const [selectedGroup, setSelectedGroup] = useState(MOCK_GROUP);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient-mystical mb-2">灵客群组</h1>
        <p className="text-muted-foreground">找到志同道合的灵友，在同命群组中交流和成长</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex gap-2">
        <Input
          placeholder="搜索群组..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button className="bg-mystical-gradient hover:opacity-90">
          <SafeIcon name="Search" className="mr-2 h-4 w-4" />
          搜索
        </Button>
        <Button variant="outline">
          <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
          创建群组
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Hot Topics & Categories */}
        <div className="lg:col-span-1">
          <GroupSidebar />
        </div>

        {/* Center - Group Content */}
        <div className="lg:col-span-2">
          <GroupCard group={selectedGroup} />
        </div>

        {/* Right Sidebar - Recommendations & Friends */}
        <div className="lg:col-span-1 space-y-6">
          <GroupRecommendation />
          <OnlineFriends />
        </div>
      </div>
    </div>
  );
}
