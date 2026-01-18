
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface EmptyStateProps {
  variant?: 'no-records' | 'no-matches' | 'no-messages' | 'no-posts';
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  variant = 'no-records',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  const variants = {
    'no-records': {
      icon: 'FileText',
      defaultTitle: '暂无记录',
      defaultDescription: '您还没有任何预测记录，开始您的命理探索之旅吧。',
      defaultAction: '开始咨询',
      defaultHref: './prognosis-service-entry.html',
    },
    'no-matches': {
      icon: 'Users',
      defaultTitle: '暂无匹配',
      defaultDescription: '目前没有找到与您命盘相匹配的用户，请稍后再试。',
      defaultAction: '完善资料',
      defaultHref: './profile-setup-user.html',
    },
    'no-messages': {
      icon: 'Mail',
      defaultTitle: '暂无消息',
      defaultDescription: '您还没有收到任何消息，去发现同命人开始交流吧。',
      defaultAction: '发现同命',
      defaultHref: './homology-match-discovery.html',
    },
    'no-posts': {
      icon: 'MessageSquare',
      defaultTitle: '暂无帖子',
      defaultDescription: '还没有相关帖子，成为第一个发帖的人吧。',
      defaultAction: '发布帖子',
      defaultHref: './create-post.html',
    },
  };

  const config = variants[variant];
  const finalTitle = title || config.defaultTitle;
  const finalDescription = description || config.defaultDescription;
  const finalActionLabel = actionLabel || config.defaultAction;
  const finalActionHref = actionHref || config.defaultHref;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Mystical Symbol */}
      <div className="mb-6 relative">
        <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
          <SafeIcon name={config.icon} className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2">{finalTitle}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{finalDescription}</p>

      {/* Action */}
      {(actionHref || onAction) && (
        <Button
          onClick={onAction}
          asChild={!!actionHref && !onAction}
          className="bg-mystical-gradient hover:opacity-90"
        >
          {actionHref && !onAction ? (
            <a href={finalActionHref}>{finalActionLabel}</a>
          ) : (
            <span>{finalActionLabel}</span>
          )}
        </Button>
      )}
    </div>
  );
}
