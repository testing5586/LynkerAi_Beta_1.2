
import { SocialFeedItemModel } from '@/data/social_feed';
import SocialPostCard from '@/components/page-944865/SocialPostCard';

interface SocialFeedProps {
  posts: SocialFeedItemModel[];
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>暂无动态，去发现朋友吧！</p>
        </div>
      ) : (
        posts.map((post) => (
          <SocialPostCard key={post.postId} post={post} />
        ))
      )}
    </div>
  );
}
