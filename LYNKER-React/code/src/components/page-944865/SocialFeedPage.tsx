
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import SocialFeed from '@/components/page-944865/SocialFeed';
import PrognosisPanel from '@/components/page-944865/PrognosisPanel';
import OnlineUsersList from '@/components/page-944865/OnlineUsersList';
import PublishPostModal from '@/components/page-944865/PublishPostModal';
import UserProfilePopover from '@/components/page-944865/UserProfilePopover';
import { MOCK_SOCIAL_FEED, MOCK_PROGNOSIS_QUICK_VIEW } from '@/data/social_feed';

export default function SocialFeedPage() {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock current user
  const currentUser = {
    name: '星空下的观测者Q',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
    uid: 'USER_001',
    country: 'CN',
    region: '广东深圳',
    subscriptionPlan: '高级会员',
    apiTokenUsage: '2,450 / 10,000',
  };

return (
    <div id="irvyf" className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Navigation & Search */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Search */}
              <div className="relative">
                <SafeIcon name="Search" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索朋友或内容..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
<NavItem icon="Home" label="首页" href="./page-944865.html" active={activeTab === 'feed'} />
                 <NavItem icon="Users" label="朋友" href="#" />
                 <NavItem icon="MessageSquare" label="消息" href="./page-945207.html" />
                <NavItem icon="Bell" label="通知" href="#" />
                <NavItem icon="Settings" label="设置" href="#" />
              </nav>

              <Separator className="my-4" />

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-mystical-gradient hover:opacity-90"
                  onClick={() => setIsPublishOpen(true)}
                >
                  <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
                  发布新动态
                </Button>
                <Button variant="outline" className="w-full">
                  <SafeIcon name="Users" className="mr-2 h-4 w-4" />
                  发现朋友
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Suggested Groups */}
              <div>
                <h3 className="font-semibold text-sm mb-3">推荐群组</h3>
                <div className="space-y-2">
                  <GroupCard name="丁火身强群" members={342} />
                  <GroupCard name="紫微七杀交流" members={521} />
                  <GroupCard name="占星爱好者" members={189} />
                </div>
              </div>
            </div>
          </div>

{/* Center - Feed */}
           <div className="lg:col-span-3">
             <div className="space-y-4">
{/* Title */}
                <h1 id="i3x3lh" className="text-2xl font-bold text-foreground mb-4">灵友圈</h1>

               {/* Publish Card */}
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <button
                    onClick={() => setIsPublishOpen(true)}
                    className="flex-1 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-left text-muted-foreground"
                  >
                    分享你的想法...
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsPublishOpen(true)}
                  >
                    <SafeIcon name="Image" className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="feed">动态</TabsTrigger>
                  <TabsTrigger value="friends">朋友</TabsTrigger>
                  <TabsTrigger value="groups">群组</TabsTrigger>
                </TabsList>

                <TabsContent value="feed" className="space-y-4 mt-4">
                  <SocialFeed posts={MOCK_SOCIAL_FEED} />
                </TabsContent>

                <TabsContent value="friends" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <SafeIcon name="Users" className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>朋友列表功能开发中...</p>
                  </div>
                </TabsContent>

                <TabsContent value="groups" className="mt-4">
                  <div className="space-y-3">
                    <GroupCard name="丁火身强群" members={342} />
                    <GroupCard name="紫微七杀交流" members={521} />
                    <GroupCard name="占星爱好者" members={189} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

{/* Right Sidebar - Prognosis & Online Users */}
<div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Online Users */}
                <OnlineUsersList />

                {/* Prognosis Panel */}
                <PrognosisPanel data={MOCK_PROGNOSIS_QUICK_VIEW} />
              </div>
            </div>
        </div>
      </div>

      {/* Publish Modal */}
      <PublishPostModal open={isPublishOpen} onOpenChange={setIsPublishOpen} />
    </div>
  );
}

function NavItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground/80 hover:bg-muted'
      }`}
    >
      <SafeIcon name={icon} className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </a>
  );
}

function GroupCard({ name, members }: { name: string; members: number }) {
  return (
    <div className="glass-card p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground">{members} 成员</p>
        </div>
        <SafeIcon name="ChevronRight" className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
