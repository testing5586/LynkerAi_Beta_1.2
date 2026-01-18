import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { PublishTemplate } from './PublishTemplate';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

interface PostPreviewProps {
  user: {
    name: string;
    avatar: string;
    country: string;
    region: string;
  };
  content: string;
  mediaItems: MediaItem[];
  template?: PublishTemplate;
  tags?: string[];
}

export default function PostPreview({
  user,
  content,
  mediaItems,
  template,
  tags = [],
}: PostPreviewProps) {
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={`border-0 ${template?.previewClass || 'bg-card'}`}>
      {/* Header */}
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <UserAvatar user={user} size="default" showHoverCard={false} />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{user.name}</h4>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <RegionBadge country={user.country} region={user.region} size="small" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{formatTime()}</p>
            </div>
          </div>
          <SafeIcon name="MoreHorizontal" className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>

      {/* Template Badge */}
      {template && (
        <CardContent className="pb-3">
          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full ${template.bgColor}`}>
            <SafeIcon name={template.icon} className={`h-4 w-4 ${template.textColor}`} />
            <span className={`text-xs font-medium ${template.textColor}`}>{template.displayName}</span>
          </div>
        </CardContent>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <CardContent className="pb-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}

      {/* Content */}
      {content && (
        <CardContent className="pb-4">
          <p className="text-foreground whitespace-pre-wrap break-words leading-relaxed">
            {content}
          </p>
        </CardContent>
      )}

      {/* Media Grid */}
      {mediaItems.length > 0 && (
        <CardContent className="pb-4">
          <div className={`grid gap-2 ${
            mediaItems.length === 1 ? 'grid-cols-1' :
            mediaItems.length === 2 ? 'grid-cols-2' :
            mediaItems.length === 3 ? 'grid-cols-3' :
            mediaItems.length === 4 ? 'grid-cols-2' :
            'grid-cols-3'
          }`}>
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg overflow-hidden bg-muted aspect-square group"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <SafeIcon name="Play" className="h-8 w-8 text-white" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}

      {/* Actions */}
      <CardContent className="pb-4 border-t pt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <SafeIcon name="Heart" className="h-4 w-4" />
              <span>赞</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <SafeIcon name="MessageCircle" className="h-4 w-4" />
              <span>评论</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <SafeIcon name="Share2" className="h-4 w-4" />
              <span>分享</span>
            </button>
          </div>
          <button className="hover:text-primary transition-colors">
            <SafeIcon name="Bookmark" className="h-4 w-4" />
          </button>
        </div>
      </CardContent>

      {/* Info */}
      <CardContent className="pb-4 border-t pt-4">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <SafeIcon name="Eye" className="h-3 w-3" />
          <span>预览效果 - 发布后将显示在灵友圈</span>
        </div>
      </CardContent>
    </Card>
  );
}