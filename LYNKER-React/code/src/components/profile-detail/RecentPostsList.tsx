
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { ForumPostSummaryModel } from '@/data/forum';

interface RecentPostsListProps {
  posts: ForumPostSummaryModel[];
}

export default function RecentPostsList({ posts }: RecentPostsListProps) {
  return (
    <section className="mt-8">
      <Card className="glass-card p-6 border border-border">
        <div className="flex items-center space-x-2 mb-6">
          <SafeIcon name="MessageSquare" className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold">最近发帖</h2>
          <Badge variant="secondary" className="ml-auto">
            {posts.length} 篇
          </Badge>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <a
              key={post.postId}
              href={`./forum-post-detail.html?id=${post.postId}`}
              className="block p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50 hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.date}
                  </p>
                </div>

                {/* Vote Stats */}
                <div className="flex items-center space-x-3 text-xs text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <SafeIcon name="ThumbsUp" className="w-4 h-4 text-green-500" />
                    <span>{post.accurateVotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon name="ThumbsDown" className="w-4 h-4 text-red-500" />
                    <span>{post.inaccurateVotes}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon name="MessageSquare" className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">此用户还没有发布任何帖子</p>
          </div>
        )}
      </Card>
    </section>
  );
}
