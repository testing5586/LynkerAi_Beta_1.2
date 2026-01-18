
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SafeIcon from '@/components/common/SafeIcon';

interface ImportArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (url: string, title: string) => void;
}

export default function ImportArticleModal({
  open,
  onOpenChange,
  onImport,
}: ImportArticleModalProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      alert('请输入文章URL');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate fetching article metadata
      await new Promise((resolve) => setTimeout(resolve, 500));

      const finalTitle = title.trim() || new URL(url).hostname;
      onImport(url, finalTitle);
      setUrl('');
      setTitle('');
    } catch (error) {
      alert('导入失败，请检查URL是否正确');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SafeIcon name="Download" className="h-5 w-5" />
            导入文章
          </DialogTitle>
          <DialogDescription>
            输入文章URL，系统将自动提取内容并保存到您的知识库
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="article-url">文章URL</Label>
            <Input
              id="article-url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              支持导入来自网络的任何文章链接
            </p>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="article-title">文章标题（可选）</Label>
            <Input
              id="article-title"
              placeholder="自定义标题，留空则自动识别"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <SafeIcon name="Info" className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-muted-foreground">
                <p className="font-medium mb-1">导入说明：</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>支持导入网页文章、博客、论坛帖子等</li>
                  <li>系统将自动提取文章内容和元数据</li>
                  <li>导入的文章将保存为Markdown格式</li>
                  <li>您可以随时编辑和补充笔记</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button
              onClick={handleImport}
              disabled={isLoading || !url.trim()}
              className="bg-mystical-gradient hover:opacity-90 gap-2"
            >
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                  导入中...
                </>
              ) : (
                <>
                  <SafeIcon name="Download" className="h-4 w-4" />
                  导入
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
