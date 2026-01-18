
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import VotingBar from './VotingBar';
import type { CommentModel } from '@/data/forum';

interface CommentSectionProps {
  comments: CommentModel[];
}

const MOCK_COMMENTS: CommentModel[] = [
  {
    commentId: 'c001',
    authorAlias: '星空下的观测者Q',
    authorAvatarUrl: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
    content: '我也是丁火身强，这个分析太准了！特别是关于创造力的部分，完全符合我的经历。',
    date: '2025-11-13 14:30',
  },
  {
    commentId: 'c002',
    authorAlias: '太乙神数研究员',
    authorAvatarUrl: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    content: '从八字角度看，丁火确实需要土金来制约，否则容易过于冲动。建议大家结合大运来看。',
    date: '2025-11-13 15:45',
  },
];

export default function CommentSection({ comments = MOCK_COMMENTS }: CommentSectionProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="MessageSquare" className="h-5 w-5" />
          评论区 ({comments.length || MOCK_COMMENTS.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Comment Input */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <UserAvatar
              user={{
                name: '我的昵称',
                avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
              }}
              size="small"
              showHoverCard={false}
            />
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="分享你的看法...（可选：附证你的紫薇八字简介）"
                className="min-h-20 resize-none"
              />
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs">
                  <SafeIcon name="Plus" className="mr-1 h-3 w-3" />
                  附证紫薇八字
                </Button>
                <Button size="sm" className="bg-mystical-gradient hover:opacity-90">
                  发表评论
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4 border-t pt-6">
          {(comments.length > 0 ? comments : MOCK_COMMENTS).map((comment) => (
            <div key={comment.commentId} className="space-y-3">
              {/* Comment Header */}
              <div className="flex items-start gap-3">
                <UserAvatar
                  user={{
                    name: comment.authorAlias,
                    avatar: comment.authorAvatarUrl,
                    country: 'CN',
                    region: '深圳',
                  }}
                  size="small"
                  showHoverCard={true}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">{comment.authorAlias}</span>
                    <RegionBadge country="CN" region="深圳" size="small" />
                  </div>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-sm text-foreground leading-relaxed ml-11">
                {comment.content}
              </p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4 ml-11 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <SafeIcon name="ThumbsUp" className="h-3.5 w-3.5" />
                  <span>点赞</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <SafeIcon name="MessageCircle" className="h-3.5 w-3.5" />
                  <span>回复</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <SafeIcon name="Flag" className="h-3.5 w-3.5" />
                  <span>举报</span>
                </button>
              </div>

              {/* Divider */}
              {comment !== (comments.length > 0 ? comments : MOCK_COMMENTS)[
                (comments.length > 0 ? comments : MOCK_COMMENTS).length - 1
              ] && <div className="border-t mt-4" />}
            </div>
          ))}
        </div>

        {/* Load More */}
        <Button variant="outline" className="w-full">
          <SafeIcon name="ChevronDown" className="mr-2 h-4 w-4" />
          加载更多评论
        </Button>
      </CardContent>
    </Card>
  );
}
