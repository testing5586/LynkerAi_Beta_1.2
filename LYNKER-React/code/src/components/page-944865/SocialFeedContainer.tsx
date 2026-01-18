
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import SocialPostCard from './SocialPostCard';
import { MOCK_SOCIAL_FEED, MOCK_USER_ALIASES } from '@/data/social_feed';

export default function SocialFeedContainer() {
  const [posts, setPosts] = useState(MOCK_SOCIAL_FEED);
  const [newPostContent, setNewPostContent] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const currentUser = {
    name: MOCK_USER_ALIASES[0],
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
  };

  const handlePublishPost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        postId: `sfp_${Date.now()}`,
        author: {
          userId: 'user_001',
          alias: currentUser.name,
          avatarUrl: currentUser.avatar,
        },
        timestamp: '刚刚',
        content: newPostContent,
        contentType: 'Text' as const,
        likesCount: 0,
        commentsCount: 0,
        sourceType: 'Friend' as const,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsComposing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Compose Post Section */}
      <Card className="glass-card m-4 p-4 sticky top-0 z-10">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div
              className="bg-muted/50 rounded-full px-4 py-2 cursor-pointer hover:bg-muted transition-colors"
              onClick={() => setIsComposing(true)}
            >
              <p className="text-sm text-muted-foreground">
                {currentUser.name}，分享你的想法...
              </p>
            </div>

            {isComposing && (
              <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                <Textarea
                  placeholder="分享你的命理见解、同命故事或任何想法..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-24 resize-none"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <SafeIcon name="Image" className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <SafeIcon name="Smile" className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <SafeIcon name="Link" className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsComposing(false);
                        setNewPostContent('');
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      size="sm"
                      className="bg-mystical-gradient hover:opacity-90"
                      onClick={handlePublishPost}
                      disabled={!newPostContent.trim()}
                    >
                      发布
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Feed Divider */}
      <div className="px-4 py-2">
        <Separator className="my-2" />
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <SafeIcon name="Zap" className="h-3 w-3" />
          <span>最新动态</span>
          <SafeIcon name="Zap" className="h-3 w-3" />
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 px-4 pb-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <SocialPostCard key={post.postId} post={post} />
          ))
        ) : (
          <Card className="glass-card p-8 text-center">
            <SafeIcon name="MessageSquare" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">暂无动态，关注朋友或命理师来看他们的分享吧</p>
            <Button variant="outline" className="mt-4">
              <SafeIcon name="Users" className="mr-2 h-4 w-4" />
              发现朋友
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
