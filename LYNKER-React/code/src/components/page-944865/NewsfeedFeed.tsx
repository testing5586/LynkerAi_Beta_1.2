
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface FeedItemProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    country: string;
    isPro: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
}

interface NewsfeedFeedProps {
  item: FeedItemProps;
}

export default function NewsfeedFeed({ item }: NewsfeedFeedProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="glass-card border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={item.author} size="default" showHoverCard={true} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{item.author.name}</h4>
                {item.author.isPro && (
                  <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                    <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                    Pro命理师
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <SafeIcon name="MoreHorizontal" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-foreground leading-relaxed">{item.content}</p>

        {/* Image */}
        {item.image && (
          <div className="rounded-lg overflow-hidden bg-muted/50">
            <img
              src={item.image}
              alt="Post content"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-primary/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-4 py-2 border-t border-border/30 text-xs text-muted-foreground flex justify-between">
        <span>{likeCount} 人赞</span>
        <div className="space-x-3">
          <span>{item.comments} 条评论</span>
          <span>{item.shares} 次分享</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-border/30 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-center text-muted-foreground hover:text-primary hover:bg-primary/10"
          onClick={handleLike}
        >
          <SafeIcon
            name="Heart"
            className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current text-accent' : ''}`}
          />
          <span className="text-xs">{isLiked ? '已赞' : '赞'}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-center text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <SafeIcon name="MessageCircle" className="w-4 h-4 mr-2" />
          <span className="text-xs">评论</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-center text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <SafeIcon name="Share2" className="w-4 h-4 mr-2" />
          <span className="text-xs">分享</span>
        </Button>
      </div>
    </Card>
  );
}
