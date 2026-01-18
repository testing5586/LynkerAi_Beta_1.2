
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import VotingBar from './VotingBar';

interface GroupPostProps {
  post: {
    postId: string;
    title: string;
    authorAlias: string;
    isMasterPost: boolean;
    accurateVotes: number;
    inaccurateVotes: number;
    tags: string[];
    date: string;
    totalComments: number;
  };
}

export default function GroupPost({ post }: GroupPostProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <UserAvatar
                user={{
                  name: post.authorAlias,
                  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
                  isPro: post.isMasterPost,
                }}
                size="small"
                showHoverCard={false}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{post.authorAlias}</span>
                  {post.isMasterPost && (
                    <Badge variant="secondary" className="text-xs">
                      <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                      命理师
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </div>
            <CardTitle className="text-lg mb-3">{post.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content Preview */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          这是群组内唯一的贴文内容摘要。群主在此分享了关于丁火身强命格的深入见解，讨论了如何在现代社会中发挥火性的创造力和领导力...
        </p>

        {/* Voting Section */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-semibold">投票结果</h4>
          <VotingBar
            votes={{
              perfect: 56,
              accurate: 80,
              reserved: 10,
              inaccurate: 5,
              nonsense: 3,
            }}
            totalVotes={154}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <SafeIcon name="MessageSquare" className="h-4 w-4" />
              <span>{post.totalComments} 评论</span>
            </div>
            <div className="flex items-center gap-1">
              <SafeIcon name="Share2" className="h-4 w-4" />
              <span>分享</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
