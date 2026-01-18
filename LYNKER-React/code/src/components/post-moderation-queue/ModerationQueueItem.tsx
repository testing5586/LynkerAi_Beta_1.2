
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SafeIcon from '@/components/common/SafeIcon';
import type { ModerationItem } from '@/components/post-moderation-queue/mock';

interface ModerationQueueItemProps {
  item: ModerationItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ModerationQueueItem({
  item,
  onApprove,
  onReject,
}: ModerationQueueItemProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const statusConfig = {
    pending: {
      label: '待审核',
      color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
      icon: 'Clock',
    },
    approved: {
      label: '已批准',
      color: 'bg-green-500/20 text-green-700 border-green-500/30',
      icon: 'CheckCircle',
    },
    rejected: {
      label: '已拒绝',
      color: 'bg-red-500/20 text-red-700 border-red-500/30',
      icon: 'XCircle',
    },
  };

  const typeConfig = {
    post: { label: '用户帖子', icon: 'MessageSquare' },
    article: { label: '命理师文章', icon: 'FileText' },
  };

  const config = statusConfig[item.status];
  const typeLabel = typeConfig[item.type];

  return (
    <Card className="glass-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate mb-2">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <SafeIcon name={typeLabel.icon} className="h-3 w-3" />
                  <span>{typeLabel.label}</span>
                </Badge>
                <Badge className={`border ${config.color} flex items-center space-x-1`}>
                  <SafeIcon name={config.icon} className="h-3 w-3" />
                  <span>{config.label}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.authorAvatar} alt={item.authorName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {item.authorName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{item.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(item.submittedAt)}
              </p>
            </div>
          </div>

          {/* Content Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {item.content}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col gap-2 shrink-0">
          <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <SafeIcon name="Eye" className="h-4 w-4 mr-2" />
                查看详情
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{item.title}</DialogTitle>
                <DialogDescription>
                  由 {item.authorName} 于 {formatDate(item.submittedAt)} 提交
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">内容</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {item.reason && (
                  <div>
                    <h4 className="font-semibold mb-2">审核备注</h4>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {item.status === 'pending' && (
            <>
              <Button
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  onApprove(item.id);
                  setIsDetailOpen(false);
                }}
              >
                <SafeIcon name="Check" className="h-4 w-4 mr-2" />
                批准
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={() => {
                  onReject(item.id);
                  setIsDetailOpen(false);
                }}
              >
                <SafeIcon name="X" className="h-4 w-4 mr-2" />
                拒绝
              </Button>
            </>
          )}

          {item.status === 'approved' && (
            <Button size="sm" disabled className="w-full bg-green-600/50">
              <SafeIcon name="CheckCircle" className="h-4 w-4 mr-2" />
              已批准
            </Button>
          )}

          {item.status === 'rejected' && (
            <Button size="sm" disabled variant="destructive" className="w-full opacity-50">
              <SafeIcon name="XCircle" className="h-4 w-4 mr-2" />
              已拒绝
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;

  return date.toLocaleDateString('zh-CN');
}
