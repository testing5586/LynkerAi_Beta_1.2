
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { SocialFeedItemModel } from '@/data/social_feed';
import RegionBadge from '@/components/common/RegionBadge';

interface SocialPostCardProps {
  post: SocialFeedItemModel;
}

export default function SocialPostCard({ post }: SocialPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const getSourceBadgeColor = () => {
    switch (post.sourceType) {
      case 'Master':
        return 'bg-accent text-accent-foreground';
      case 'Group':
        return 'bg-primary text-primary-foreground';
      case 'AI':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="glass-card p-4 rounded-lg hover:shadow-card transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <img
            src={post.author.avatarUrl}
            alt={post.author.alias}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-sm truncate">{post.author.alias}</h4>
              {post.sourceType === 'Master' && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                  <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{post.timestamp}</span>
              {post.author.geoTag && (
                <>
                  <span>•</span>
                  <span>{post.author.geoTag.country}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Badge className={getSourceBadgeColor()}>{post.sourceType}</Badge>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
      </div>

      {/* Media */}
      {post.mediaUrl && post.contentType !== 'Text' && (
        <div className="mb-3 rounded-lg overflow-hidden bg-muted/50">
          {post.contentType === 'Image' && (
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="w-full h-auto max-h-96 object-cover"
            />
          )}
          {post.contentType === 'Video' && (
            <video
              src={post.mediaUrl}
              className="w-full h-auto max-h-96 object-cover"
              controls
            />
          )}
        </div>
      )}

      {/* Related Post Link */}
      {post.relatedPost && (
        <div className="mb-3 p-3 bg-muted/30 rounded-lg border border-muted">
          <p className="text-xs text-muted-foreground mb-1">关联论坛帖子</p>
          <a
            href={`./forum-post-detail.html?id=${post.relatedPost.postId}`}
            className="text-sm font-medium text-primary hover:underline line-clamp-2"
          >
            {post.relatedPost.title}
          </a>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-b">
        <span>{likeCount} 赞</span>
        <span>{post.commentsCount} 评论</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-muted-foreground hover:text-foreground"
          onClick={handleLike}
        >
          <SafeIcon
            name="Heart"
            className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`}
          />
          {isLiked ? '已赞' : '赞'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="MessageCircle" className="h-4 w-4 mr-2" />
          评论
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="Share2" className="h-4 w-4 mr-2" />
          分享
        </Button>
      </div>
    </Card>
  );
}
