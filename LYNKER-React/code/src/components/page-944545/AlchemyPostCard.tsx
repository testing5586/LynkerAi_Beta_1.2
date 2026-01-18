import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import CompactVotingBar from './CompactVotingBar';
import CommentSection from './CommentSection';
import VideoPlayModal from './VideoPlayModal';
import type { AlchemyPostModel } from '@/data/group_social';

interface AlchemyPostCardProps {
  post: AlchemyPostModel;
}

export default function AlchemyPostCard({ post }: AlchemyPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [baziSummary, setBaziSummary] = useState('');
  const [ziweiSummary, setZiweiSummary] = useState('');
  const [comments, setComments] = useState(post.comments);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      commentId: `c_${Date.now()}`,
      authorAlias: '当前用户',
      authorAvatarUrl: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      content: newComment,
      date: new Date().toLocaleString('zh-CN'),
      geoTag: { country: '中国', region: '北京', flagIcon: 'CN' },
      appendix: (baziSummary || ziweiSummary) ? {
        baziSummary: baziSummary || undefined,
        ziweiSummary: ziweiSummary || undefined,
      } : undefined,
    };

    setComments([...comments, comment]);
    setNewComment('');
    setBaziSummary('');
    setZiweiSummary('');
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      Bilibili: 'Play',
      XiaoHongShu: 'Heart',
      Douyin: 'Music',
      YouTube: 'Youtube',
    };
    return icons[platform] || 'Link';
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Bilibili: 'bg-blue-500/20 text-blue-400',
      XiaoHongShu: 'bg-red-500/20 text-red-400',
      Douyin: 'bg-purple-500/20 text-purple-400',
      YouTube: 'bg-red-600/20 text-red-500',
    };
    return colors[platform] || 'bg-muted text-muted-foreground';
  };

return (
    <Card className="border-border/50 hover:border-border transition-colors">
<CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getPlatformColor(post.platform)}>
                <SafeIcon name={getPlatformIcon(post.platform)} className="h-3 w-3 mr-1" />
                {post.platform}
              </Badge>
              <span className="text-xs text-muted-foreground">{post.dateImported}</span>
            </div>
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <CardDescription className="mt-2">
              原作者：{post.externalAuthor}
            </CardDescription>
          </div>
          <div 
            className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 flex items-center justify-center transition-all">
              <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all">
                <SafeIcon name="Play" className="h-5 w-5 text-black ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Voting Bar */}
        <CompactVotingBar 
          votes={post.votes} 
          totalVotes={post.totalVotes}
          voters={post.voters}
          title={post.title}
        />

        {/* Action Buttons - Compact Layout */}
        <div className="flex gap-2">
          {!isExpanded && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8 px-2 py-1"
              onClick={() => setIsExpanded(true)}
            >
              <SafeIcon name="ChevronDown" className="h-3 w-3 mr-1" />
              查看评论 ({comments.length})
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 text-xs h-8 px-2 py-1"
          >
            <a href={post.originalUrl} target="_blank" rel="noopener noreferrer">
              <SafeIcon name="ExternalLink" className="h-3 w-3 mr-1" />
              查看原始内容
            </a>
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t">
            {/* Appendix Input - User's Prognostic Characteristics */}
            <div className="space-y-2 bg-background/30 rounded-lg p-2 border border-border/30">
              <p className="text-xs text-muted-foreground font-medium">附证（可选）- 填写您的命理特征以验证身份：</p>
              <div className="space-y-1.5">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">八字简介</label>
                  <input
                    type="text"
                    placeholder="例如：甲子年 丙寅月 戊辰日 庚午时"
                    value={baziSummary}
                    onChange={(e) => setBaziSummary(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-background/50 border border-border/50 rounded text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">紫微简介</label>
                  <input
                    type="text"
                    placeholder="例如：紫微命宫 七杀星 天相星"
                    value={ziweiSummary}
                    onChange={(e) => setZiweiSummary(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-background/50 border border-border/50 rounded text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="space-y-2">
              <Textarea
                placeholder="分享您的看法或验证结果..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-16 bg-background/50 text-xs"
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="w-full bg-mystical-gradient hover:opacity-90 h-8 text-xs"
              >
                <SafeIcon name="Send" className="h-3 w-3 mr-1" />
                发表评论
              </Button>
            </div>

            {/* Comments Section */}
            <CommentSection comments={comments} />

            {/* Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs h-8 px-2 py-1"
              onClick={() => setIsExpanded(false)}
            >
              <SafeIcon name="ChevronUp" className="h-3 w-3 mr-1" />
              收起评论
            </Button>
          </div>
        )}
      </CardContent>

      {/* Video Play Modal */}
      <VideoPlayModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={post.originalUrl}
        title={post.title}
      />
    </Card>
  );
}