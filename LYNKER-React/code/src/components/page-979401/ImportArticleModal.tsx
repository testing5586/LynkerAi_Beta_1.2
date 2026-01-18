
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SafeIcon from '@/components/common/SafeIcon';

interface ImportArticleModalProps {
  onClose: () => void;
  onImport: (url: string, title: string) => void;
}

export default function ImportArticleModal({ onClose, onImport }: ImportArticleModalProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim() || !title.trim()) {
      alert('请填写URL和标题');
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      alert('请输入有效的URL');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onImport(url, title);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <SafeIcon name="Download" className="h-5 w-5" />
            <span>导入文章</span>
          </DialogTitle>
          <DialogDescription>
            从网络导入文章或论坛内容到您的知识库
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">文章URL</label>
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              支持导入来自论坛、博客、小红书等平台的文章链接
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">文章标题</label>
            <Input
              placeholder="输入文章标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-muted/50"
            />
          </div>

          <div className="bg-muted/30 border border-muted rounded-lg p-3 space-y-2">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <SafeIcon name="Info" className="h-4 w-4" />
              <span>支持的来源</span>
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ 灵客论坛帖子</li>
              <li>✓ 灵友分享的文章</li>
              <li>✓ 个人博客和网站</li>
              <li>✓ 社交媒体链接</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !url.trim() || !title.trim()}
            className="bg-mystical-gradient hover:opacity-90"
          >
            {isSubmitting ? (
              <>
                <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                导入中...
              </>
            ) : (
              <>
                <SafeIcon name="Download" className="h-4 w-4 mr-2" />
                导入文章
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
