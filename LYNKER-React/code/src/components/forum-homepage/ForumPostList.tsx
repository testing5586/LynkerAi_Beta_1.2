
import ForumPostCard from '@/components/forum-homepage/ForumPostCard';

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
  };
  createdAt: string;
  image?: string;
}

interface ForumPostListProps {
  posts: Post[];
  onViewPost: (postId: string) => void;
}

export default function ForumPostList({ posts, onViewPost }: ForumPostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <ForumPostCard
          key={post.id}
          post={post}
          onClick={() => onViewPost(post.id)}
        />
      ))}
    </div>
  );
}
