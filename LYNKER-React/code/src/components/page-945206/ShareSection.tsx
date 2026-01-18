
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { toast } from 'sonner';

interface ShareSectionProps {
  title: string;
  compatibility: number;
  onShare: (platform: string) => void;
  isSharing: boolean;
}

export default function ShareSection({
  title,
  compatibility,
  onShare,
  isSharing,
}: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `我的命盘同频指数是 ${compatibility}%！${title}。快来灵客AI发现与你同命的人吧！`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const platforms = [
    {
      name: '微信',
      icon: 'MessageCircle',
      color: 'bg-green-600',
      action: () => {
        onShare('wechat');
        toast.success('已复制分享链接，请在微信中粘贴');
      },
    },
    {
      name: '微博',
      icon: 'Share2',
      color: 'bg-red-500',
      action: () => {
        onShare('weibo');
        toast.success('已复制分享链接，请在微博中粘贴');
      },
    },
    {
      name: '小红书',
      icon: 'Heart',
      color: 'bg-pink-500',
      action: () => {
        onShare('xiaohongshu');
        toast.success('已复制分享链接，请在小红书中粘贴');
      },
    },
    {
      name: '抖音',
      icon: 'Music',
      color: 'bg-black',
      action: () => {
        onShare('douyin');
        toast.success('已复制分享链接，请在抖音中粘贴');
      },
    },
  ];

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('链接已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="glass-card p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">分享你的命盘报告</h3>
        <p className="text-muted-foreground">
          让朋友们看看你的同频指数，一起探索命理的奥秘
        </p>
      </div>

      {/* Share Preview */}
      <div className="mb-8 p-6 rounded-lg bg-muted/50 border border-muted">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-lg bg-mystical-gradient flex items-center justify-center flex-shrink-0 glow-primary">
            <SafeIcon name="Sparkles" className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">我的命盘分析报告</h4>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {shareText}
            </p>
            <Badge variant="secondary" className="text-xs">
              灵客AI - 同命相知
            </Badge>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {platforms.map((platform) => (
          <Button
            key={platform.name}
            variant="outline"
            className="flex flex-col items-center justify-center h-auto py-4 hover:bg-muted transition-colors"
            onClick={platform.action}
            disabled={isSharing}
          >
            <SafeIcon name={platform.icon} className="h-5 w-5 mb-2" />
            <span className="text-xs font-medium">{platform.name}</span>
          </Button>
        ))}
      </div>

      {/* Copy Link */}
      <div className="flex gap-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 px-4 py-2 rounded-lg bg-muted border border-muted-foreground/20 text-sm text-muted-foreground"
        />
        <Button
          variant={copied ? 'default' : 'outline'}
          onClick={handleCopyLink}
          className={copied ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          <SafeIcon
            name={copied ? 'Check' : 'Copy'}
            className="h-4 w-4 mr-2"
          />
          {copied ? '已复制' : '复制链接'}
        </Button>
      </div>

      {/* Share Tips */}
      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start space-x-3">
          <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent mb-1">分享小贴士</p>
            <p className="text-muted-foreground">
              分享你的命盘报告，邀请朋友一起探索同命匹配的奇妙世界。每次分享都可能帮助你发现新的灵魂同频者！
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
