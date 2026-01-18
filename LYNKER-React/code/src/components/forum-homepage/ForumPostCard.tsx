
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import VotingBadge from '@/components/forum-homepage/VotingBadge';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    country: string;
    isPro: boolean;
  };
  category: string;
  tags: string[];
  views: number;
  comments: number;
  votes: {
    accurate: number;
    inaccurate: number;
    reserved: number;
    nonsense: number;
    exact: number;
    not_me: number;
  };
  createdAt: string;
  image?: string;
}

interface ForumPostCardProps {
  post: Post;
  onClick: () => void;
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return '刚刚';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}天前`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}周前`;
  return `${Math.floor(seconds / 2592000)}个月前`;
}

export default function ForumPostCard({ post, onClick }: ForumPostCardProps) {
  const timeAgo = formatTimeAgo(post.createdAt);

const totalVotes =
    post.votes.accurate +
    post.votes.inaccurate +
    post.votes.reserved +
    post.votes.nonsense +
    post.votes.exact +
    post.votes.not_me;

  return (
    <Card
      onClick={onClick}
      className="glass-card p-4 hover:border-primary/50 transition-all cursor-pointer group"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <UserAvatar
            user={{
              name: post.author.name,
              avatar: post.author.avatar,
              country: post.author.country,
              isPro: post.author.isPro,
            }}
            size="default"
            showHoverCard={false}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {post.title}
                </h3>
                {post.author.isPro && (
                  <Badge variant="secondary" className="flex-shrink-0 text-xs">
                    <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.author.name}</span>
                <span>•</span>
                <span>{timeAgo}</span>
              </div>
            </div>
            {post.image && (
              <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

{/* Voting Badges */}
            <div className="flex gap-1 mb-3 flex-wrap">
              <VotingBadge
                label="准！我就是"
                count={post.votes.exact}
                variant="exact"
              />
              <VotingBadge label="准" count={post.votes.accurate} variant="accurate" />
              <VotingBadge
                label="不准"
                count={post.votes.inaccurate}
                variant="inaccurate"
              />
              <VotingBadge
                label="不准！我不是"
                count={post.votes.not_me}
                variant="not_me"
              />
              <VotingBadge
                label="胡扯"
                count={post.votes.nonsense}
                variant="nonsense"
              />
              <VotingBadge
                label="有保留"
                count={post.votes.reserved}
                variant="reserved"
              />
            </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <SafeIcon name="Eye" className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <SafeIcon name="MessageSquare" className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <SafeIcon name="ThumbsUp" className="w-4 h-4" />
              <span>{totalVotes}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
