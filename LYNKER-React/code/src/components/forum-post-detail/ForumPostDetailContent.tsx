
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_FORUM_POST_DETAIL, MOCK_POST_COMMENTS } from '@/data/forum';
import { MOCK_MASTERS } from '@/data/base-mock';

export default function ForumPostDetailContent() {
const [votes, setVotes] = useState({
    accurate: MOCK_FORUM_POST_DETAIL.accurateVotes,
    inaccurate: MOCK_FORUM_POST_DETAIL.inaccurateVotes,
    perfect: 0,
    nonsense: 0,
    reserved: 0,
    not_me: 0,
  });

  const [userVote, setUserVote] = useState<string | null>(null);
  const [comments, setComments] = useState(MOCK_POST_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [showBlackbox, setShowBlackbox] = useState(false);

  const handleVote = (voteType: string) => {
    if (userVote === voteType) {
      setUserVote(null);
      setVotes((prev) => ({
        ...prev,
        [voteType === 'perfect' ? 'accurate' : voteType === 'nonsense' ? 'inaccurate' : voteType]: prev[voteType as keyof typeof prev] - 1,
      }));
    } else {
      if (userVote) {
        setVotes((prev) => ({
          ...prev,
          [userVote === 'perfect' ? 'accurate' : userVote === 'nonsense' ? 'inaccurate' : userVote]: prev[userVote as keyof typeof prev] - 1,
        }));
      }
      setUserVote(voteType);
      setVotes((prev) => ({
        ...prev,
        [voteType === 'perfect' ? 'accurate' : voteType === 'nonsense' ? 'inaccurate' : voteType]: prev[voteType as keyof typeof prev] + 1,
      }));
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        commentId: `c${comments.length + 1}`,
        authorAlias: '当前用户',
        authorAvatarUrl: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
        content: newComment,
        date: new Date().toLocaleString('zh-CN'),
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const author = MOCK_MASTERS.find((m) => m.realName === MOCK_FORUM_POST_DETAIL.authorAlias);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => (window.location.href = './forum-homepage.html')}
          className="text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
          返回论坛
        </Button>
        <div className="flex items-center space-x-2">
          {MOCK_FORUM_POST_DETAIL.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Post Header */}
      <Card className="glass-card mb-6">
        <CardHeader className="pb-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gradient-mystical">
              {MOCK_FORUM_POST_DETAIL.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <UserAvatar
                  user={{
                    name: MOCK_FORUM_POST_DETAIL.authorAlias,
                    avatar: MOCK_FORUM_POST_DETAIL.authorAvatarUrl,
                    isPro: MOCK_FORUM_POST_DETAIL.isMasterPost,
                    country: author?.geoTag.country,
                    region: author?.geoTag.region,
                  }}
                  size="default"
                  showHoverCard={true}
                />
                <div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-base font-semibold"
                    onClick={() => (window.location.href = './user-profile-forum-view.html')}
                  >
                    {MOCK_FORUM_POST_DETAIL.authorAlias}
                  </Button>
                  {MOCK_FORUM_POST_DETAIL.isMasterPost && (
                    <Badge className="ml-2 bg-accent text-accent-foreground">
                      <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                      Pro命理师
                    </Badge>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{MOCK_FORUM_POST_DETAIL.date}</p>
                </div>
              </div>

              {/* Share & More */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <SafeIcon name="Share2" className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SafeIcon name="MoreVertical" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Post Content */}
      <Card className="glass-card mb-6">
        <CardContent className="pt-6">
          <div className="prose prose-invert max-w-none mb-6">
            <div
              className="text-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: MOCK_FORUM_POST_DETAIL.fullContent
                  .replace(/\n/g, '<br />')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>'),
              }}
            />
          </div>

        </CardContent>
      </Card>

      {/* Voting Section */}
      <Card className="glass-card mb-6">
        <CardHeader>
          <h3 className="font-semibold">您认为这个预测怎么样？</h3>
        </CardHeader>
        <CardContent>
<div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
             <VoteButton
               icon="ThumbsUp"
               label="准！我就是"
               count={votes.accurate}
               isSelected={userVote === 'perfect'}
               onClick={() => handleVote('perfect')}
               variant="success"
             />
             <VoteButton
               icon="Check"
               label="准"
               count={votes.accurate}
               isSelected={userVote === 'accurate'}
               onClick={() => handleVote('accurate')}
               variant="info"
             />
             <VoteButton
               icon="X"
               label="不准"
               count={votes.inaccurate}
               isSelected={userVote === 'inaccurate'}
               onClick={() => handleVote('inaccurate')}
               variant="warning"
             />
             <VoteButton
               icon="User"
               label="不准！我不是"
               count={votes.not_me}
               isSelected={userVote === 'not_me'}
               onClick={() => handleVote('not_me')}
               variant="default"
             />
             <VoteButton
               icon="AlertCircle"
               label="胡扯"
               count={votes.nonsense}
               isSelected={userVote === 'nonsense'}
               onClick={() => handleVote('nonsense')}
               variant="destructive"
             />
             <VoteButton
               icon="HelpCircle"
               label="有保留"
               count={votes.reserved}
               isSelected={userVote === 'reserved'}
               onClick={() => handleVote('reserved')}
               variant="secondary"
             />
           </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="glass-card">
        <CardHeader>
          <h3 className="font-semibold">评论区 ({comments.length})</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* New Comment Form */}
          <div className="space-y-3">
            <Textarea
              placeholder="分享您的看法..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24 resize-none"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Send" className="mr-2 h-4 w-4" />
                发表评论
              </Button>
            </div>
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface VoteButtonProps {
  icon: string;
  label: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
  variant: 'success' | 'info' | 'warning' | 'destructive' | 'secondary';
}

function VoteButton({ icon, label, count, isSelected, onClick, variant }: VoteButtonProps) {
  const variantClasses = {
    success: isSelected ? 'bg-green-600 text-white border-green-600' : 'border-green-600/30 text-green-600 hover:bg-green-600/10',
    info: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-600/30 text-blue-600 hover:bg-blue-600/10',
    warning: isSelected ? 'bg-yellow-600 text-white border-yellow-600' : 'border-yellow-600/30 text-yellow-600 hover:bg-yellow-600/10',
    destructive: isSelected ? 'bg-red-600 text-white border-red-600' : 'border-red-600/30 text-red-600 hover:bg-red-600/10',
    secondary: isSelected ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-600/30 text-purple-600 hover:bg-purple-600/10',
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`flex flex-col items-center justify-center h-auto py-2 px-1 text-xs font-medium transition-all ${variantClasses[variant]}`}
    >
      <SafeIcon name={icon} className="h-4 w-4 mb-1" />
      <span className="line-clamp-2">{label}</span>
      <span className="text-xs opacity-70 mt-1">{count}</span>
    </Button>
  );
}

interface CommentItemProps {
  comment: {
    commentId: string;
    authorAlias: string;
    authorAvatarUrl: string;
    content: string;
    date: string;
    replies?: any[];
  };
}

function CommentItem({ comment }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (replyText.trim()) {
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start space-x-3">
        <UserAvatar
          user={{
            name: comment.authorAlias,
            avatar: comment.authorAvatarUrl,
          }}
          size="small"
          showHoverCard={false}
        />
<div className="flex-1">
           <div className="flex items-center space-x-2 mb-1">
             <Button
               variant="link"
               className="p-0 h-auto text-sm font-semibold"
               onClick={() => (window.location.href = './user-profile-forum-view.html')}
             >
               {comment.authorAlias}
             </Button>
             {comment.userVote && (
               <Badge
                 variant="secondary"
                 className={`text-xs ${
                   comment.userVote === 'perfect'
                     ? 'bg-green-900/50 text-green-200'
                     : comment.userVote === 'accurate'
                     ? 'bg-blue-900/50 text-blue-200'
                     : comment.userVote === 'reserved'
                     ? 'bg-yellow-900/50 text-yellow-200'
                     : comment.userVote === 'inaccurate'
                     ? 'bg-orange-900/50 text-orange-200'
                     : 'bg-red-900/50 text-red-200'
                 }`}
               >
                 {comment.userVote === 'perfect'
                   ? '准！我就是'
                   : comment.userVote === 'accurate'
                   ? '准'
                   : comment.userVote === 'reserved'
                   ? '有保留'
                   : comment.userVote === 'inaccurate'
                   ? '不准'
                   : '胡扯'}
               </Badge>
             )}
             <span className="text-xs text-muted-foreground">{comment.date}</span>
           </div>
          <p className="text-sm text-foreground mb-2">{comment.content}</p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs hover:text-foreground"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <SafeIcon name="Reply" className="mr-1 h-3 w-3" />
              回复
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs hover:text-foreground"
            >
              <SafeIcon name="ThumbsUp" className="mr-1 h-3 w-3" />
              赞 (0)
            </Button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder={`回复 ${comment.authorAlias}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-16 resize-none text-sm"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  取消
                </Button>
                <Button
                  size="sm"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  发送
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 space-y-3 border-l border-muted pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.commentId} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
