
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
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface PublishPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PublishPostModal({ open, onOpenChange }: PublishPostModalProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset and close
    setContent('');
    setIsSubmitting(false);
    onOpenChange(false);

    // Show success toast (in real app)
    console.log('Post published:', content);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>发布新动态</DialogTitle>
          <DialogDescription>
            分享你的想法、图片或视频到灵友圈
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Content Input */}
          <Textarea
            placeholder="分享你的想法...（支持@朋友和#话题）"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32 resize-none"
          />

          {/* Character Count */}
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{content.length} / 5000</span>
            {content.length > 4500 && (
              <span className="text-yellow-500">接近字数限制</span>
            )}
          </div>

          <Separator />

          {/* Media Options */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="添加图片"
            >
              <SafeIcon name="Image" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="添加视频"
            >
              <SafeIcon name="Video" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="添加表情"
            >
              <SafeIcon name="Smile" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="添加位置"
            >
              <SafeIcon name="MapPin" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button
            className="bg-mystical-gradient hover:opacity-90"
            onClick={handlePublish}
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                发布中...
              </>
            ) : (
              <>
                <SafeIcon name="Send" className="mr-2 h-4 w-4" />
                发布
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
