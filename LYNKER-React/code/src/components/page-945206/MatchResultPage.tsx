
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import MatchResultHero from './MatchResultHero';
import MatchResultCard from './MatchResultCard';
import ShareSection from './ShareSection';

// Mock data for initialization
const mockUserProfile = {
  name: '灵客用户',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
  country: 'CN',
  region: '北京',
};

const mockMatchResult = {
  theme: '紫微天府格局，命宫主星天府，性格稳重，事业心强',
  compatibility: 87,
  description: '您的命盘展现出稳健的事业运和深厚的人脉基础。天府星主财富和稳定，预示着您在人生中会获得持续的成功和安定。',
  celebrities: [
    {
      id: 'celeb-1',
      name: '某知名企业家',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/c8ed0402-0aea-477e-8a31-040aaa1e7321.png',
      category: '企业家',
      compatibility: 92,
      description: '同为天府格局，事业运势相似，都具有强大的领导力和财富积累能力。',
    },
    {
      id: 'celeb-2',
      name: '某著名艺术家',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/c8a747ea-8942-4f9a-b405-1f1e6dcab9b5.png',
      category: '艺术家',
      compatibility: 85,
      description: '紫微星的创意天赋在您和这位艺术家身上都有体现，审美品味相近。',
    },
  ],
  realUsers: [
    {
      id: 'user-1',
      name: '云澜',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/afe36a23-a5b2-4fae-b434-fbb1b8854472.png',
      country: 'CN',
      region: '上海',
      compatibility: 89,
      description: '同为天府格局，事业心强，生活品质相似，有很多共同话题。',
      isPro: false,
    },
    {
      id: 'user-2',
      name: '星辰',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/e7120722-f95d-4bb5-a0e7-b288959271b3.png',
      country: 'CN',
      region: '深圳',
      compatibility: 86,
      description: '紫微天府的组合，命宫主星相同，人生轨迹有相似之处。',
      isPro: false,
    },
    {
      id: 'user-3',
      name: '月影',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/2636bffb-ac26-4d40-87fe-181be9e26a1c.png',
      country: 'CN',
      region: '杭州',
      compatibility: 84,
      description: '天府星的稳定性在你们身上都有体现，适合长期交流和互动。',
      isPro: false,
    },
  ],
};

export default function MatchResultPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (platform: string) => {
    setIsSharing(true);
    // Simulate share action
    setTimeout(() => setIsSharing(false), 1000);
  };

  const handleViewDetail = (userId: string) => {
    window.location.href = `./homology-match-profile-view.html?id=${userId}`;
  };

  const handleStartChat = (userId: string) => {
    window.location.href = `./page-945207.html?id=${userId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Hero Section */}
      <MatchResultHero
        theme={mockMatchResult.theme}
        compatibility={mockMatchResult.compatibility}
        description={mockMatchResult.description}
      />

      {/* Main Content */}
      <div className="container px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <SafeIcon name="BarChart3" className="h-4 w-4" />
              <span className="hidden sm:inline">概览</span>
            </TabsTrigger>
            <TabsTrigger value="celebrities" className="flex items-center space-x-2">
              <SafeIcon name="Star" className="h-4 w-4" />
              <span className="hidden sm:inline">名人</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <SafeIcon name="Users" className="h-4 w-4" />
              <span className="hidden sm:inline">用户</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Compatibility Score */}
            <Card className="glass-card p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-mystical-gradient glow-primary mb-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">
                      {mockMatchResult.compatibility}
                    </div>
                    <div className="text-sm text-white/80">同频指数</div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{mockMatchResult.theme}</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {mockMatchResult.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  <SafeIcon name="Sparkles" className="w-3 h-3 mr-1" />
                  紫微斗数
                </Badge>
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  <SafeIcon name="Zap" className="w-3 h-3 mr-1" />
                  天府格局
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                  <SafeIcon name="Heart" className="w-3 h-3 mr-1" />
                  高度匹配
                </Badge>
              </div>
            </Card>

            {/* Share Section */}
            <ShareSection
              title={mockMatchResult.theme}
              compatibility={mockMatchResult.compatibility}
              onShare={handleShare}
              isSharing={isSharing}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {mockMatchResult.celebrities.length}
                </div>
                <p className="text-sm text-muted-foreground">相似名人</p>
              </Card>
              <Card className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockMatchResult.realUsers.length}
                </div>
                <p className="text-sm text-muted-foreground">同频用户</p>
              </Card>
              <Card className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {mockMatchResult.compatibility}%
                </div>
                <p className="text-sm text-muted-foreground">匹配度</p>
              </Card>
            </div>
          </TabsContent>

          {/* Celebrities Tab */}
          <TabsContent value="celebrities" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">与您命盘相似的名人</h3>
              <p className="text-muted-foreground">这些名人与您拥有相似的命理特征和人生轨迹</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockMatchResult.celebrities.map((celebrity) => (
                <MatchResultCard
                  key={celebrity.id}
                  user={celebrity}
                  type="celebrity"
                  onViewDetail={() => handleViewDetail(celebrity.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">与您同频的用户</h3>
              <p className="text-muted-foreground">发现与您命盘相匹配的真实用户，开始灵魂对话</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockMatchResult.realUsers.map((user) => (
                <MatchResultCard
                  key={user.id}
                  user={user}
                  type="user"
                  onViewDetail={() => handleViewDetail(user.id)}
                  onStartChat={() => handleStartChat(user.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Button
            variant="outline"
            onClick={() => window.location.href = './homology-match-discovery.html'}
            className="flex items-center space-x-2"
          >
            <SafeIcon name="ArrowLeft" className="h-4 w-4" />
            <span>返回发现</span>
          </Button>
          <Button
            className="bg-mystical-gradient hover:opacity-90 flex items-center space-x-2"
            onClick={() => window.location.href = './page-944865.html'}
          >
            <SafeIcon name="MessageCircle" className="h-4 w-4" />
            <span>进入灵友圈</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
