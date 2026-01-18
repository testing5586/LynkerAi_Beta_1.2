import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
}

export default function MessageDialog({
  open,
  onOpenChange,
  recipientName,
}: MessageDialogProps) {
  const [message, setMessage] = useState('');
  const [inviteAsFreind, setInviteAsFriend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Reset and close
    setMessage('');
    setInviteAsFriend(false);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>发送私信给 {recipientName}</DialogTitle>
          <DialogDescription>
            分享你的想法，建立更深的连接
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              你的留言
            </Label>
            <Textarea
              id="message"
              placeholder="输入你想说的话...可以分享你的想法、共同兴趣或任何你想交流的内容"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-28 resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/500
            </p>
          </div>

          {/* Invite Checkbox */}
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border border-muted">
            <Checkbox
              id="invite"
              checked={inviteAsFreind}
              onCheckedChange={(checked) => setInviteAsFriend(checked as boolean)}
            />
            <Label htmlFor="invite" className="flex-1 cursor-pointer">
              <div className="flex items-center space-x-1">
                <SafeIcon name="UserPlus" className="w-4 h-4" />
                <span className="text-sm font-medium">邀请加为好友</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                加为好友后可以看到更多信息
              </p>
            </Label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button
            className="bg-mystical-gradient hover:opacity-90"
            onClick={handleSubmit}
            disabled={!message.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <SafeIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                发送中...
              </>
            ) : (
              <>
                <SafeIcon name="Send" className="w-4 h-4 mr-2" />
                发送私信
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}