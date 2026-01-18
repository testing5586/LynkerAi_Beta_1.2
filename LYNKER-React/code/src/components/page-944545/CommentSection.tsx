
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import CompactVotingBar from './CompactVotingBar';
import VoteTypeBadge from './VoteTypeBadge';
import type { CommentModel } from '@/data/forum';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MOCK_FORUM_VOTING_OPTIONS } from '@/data/voting';

interface CommentSectionProps {
  comments: CommentModel[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [userVote, setUserVote] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm">评论 ({comments.length})</h4>

      {/* Voting Options Before Comment Input */}
      <div className="bg-background/50 rounded-lg p-3 space-y-2 border border-border/30">
        <p className="text-xs text-muted-foreground font-medium">评论前，请选择您的立场：</p>
        <div className="flex flex-wrap gap-1.5">
          {MOCK_FORUM_VOTING_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={userVote === option.id ? "default" : "outline"}
              size="sm"
              className={`text-xs px-2 py-1 h-auto gap-1 ${
                userVote === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background/50 hover:bg-accent/20'
              }`}
              onClick={() => setUserVote(userVote === option.id ? null : option.id)}
            >
              <SafeIcon name={option.iconName} className="h-3 w-3" />
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
        {userVote && (
          <p className="text-xs text-accent">
            ✓ 已选择：{MOCK_FORUM_VOTING_OPTIONS.find(opt => opt.id === userVote)?.label}
          </p>
        )}
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-8">
          <SafeIcon name="MessageCircle" className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">暂无评论，成为第一个评论的人吧</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.commentId} className="flex gap-3 p-3 bg-background/50 rounded-lg">
              {/* Avatar */}
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorAlias} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {comment.authorAlias.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-sm">{comment.authorAlias}</span>
                  {comment.geoTag && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      <span className="mr-1">{getFlagEmoji(comment.geoTag.flagIcon)}</span>
                      {comment.geoTag.region}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>

{/* Comment Text */}
                 <p className="text-sm text-foreground/80 mb-2 break-words">{comment.content}</p>

                 {/* User Vote Badge */}
                 {comment.userVote && (
                   <div className="mb-2">
                     <VoteTypeBadge voteType={comment.userVote} />
                   </div>
                 )}

                 {/* Appendix (Bazi/Ziwei Summary) */}
                {comment.appendix && (
                  <div className="mb-2 space-y-1">
                    {comment.appendix.baziSummary && (
                      <div className="text-xs bg-primary/10 text-primary-foreground/80 px-2 py-1 rounded">
                        <span className="font-semibold">八字：</span>
                        {comment.appendix.baziSummary}
                      </div>
                    )}
                    {comment.appendix.ziweiSummary && (
                      <div className="text-xs bg-accent/10 text-accent-foreground/80 px-2 py-1 rounded">
                        <span className="font-semibold">紫微：</span>
                        {comment.appendix.ziweiSummary}
                      </div>
                    )}
                  </div>
                )}

                {/* Mini Voting */}
                <div className="flex gap-2 text-xs">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <SafeIcon name="ThumbsUp" className="h-3 w-3" />
                    <span>赞同</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <SafeIcon name="Reply" className="h-3 w-3" />
                    <span>回复</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
