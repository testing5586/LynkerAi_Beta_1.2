
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface AppointmentLink {
  linkId: string;
  title: string;
  serviceType: string;
  duration: number;
  price: number;
  description: string;
  availableSlots: string[];
  createdDate: string;
  linkUrl: string;
  isActive: boolean;
  bookingCount: number;
}

interface LinkPreviewProps {
  link: AppointmentLink;
  onClose: () => void;
}

export default function LinkPreview({ link, onClose }: LinkPreviewProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.linkUrl);
    // In a real app, show a toast notification
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>预约链接预览</DialogTitle>
          <DialogDescription>
            这是客户将看到的预约页面样式
          </DialogDescription>
        </DialogHeader>

        {/* Preview Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white space-y-2">
            <h2 className="text-2xl font-bold">{link.title}</h2>
            <p className="text-sm opacity-90">{link.serviceType} 咨询服务</p>
          </div>

          {/* Service Details */}
          <Card className="glass-card">
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">服务描述</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">咨询时长</p>
                  <p className="text-lg font-semibold">{link.duration} 分钟</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">咨询价格</p>
                  <p className="text-lg font-semibold text-accent">¥{link.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">已预约</p>
                  <p className="text-lg font-semibold">{link.bookingCount} 次</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Time Slots */}
          <div>
            <h3 className="font-semibold mb-3">可用时间段</h3>
            <div className="grid grid-cols-2 gap-2">
              {link.availableSlots.map((slot, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start"
                  disabled
                >
                  <SafeIcon name="Clock" className="mr-2 h-4 w-4" />
                  {slot}
                </Button>
              ))}
            </div>
          </div>

          {/* Link Section */}
          <Card className="glass-card bg-primary/5 border-primary/20">
            <CardContent className="pt-6 space-y-3">
              <div>
                <p className="text-sm font-semibold mb-2">分享链接</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={link.linkUrl}
                    readOnly
                    className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                  >
                    <SafeIcon name="Copy" className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ 客户可以通过此链接直接预约您的咨询</p>
                <p>✓ 链接包含您的所有服务信息和时间安排</p>
                <p>✓ 支持分享到社交媒体和消息应用</p>
              </div>
            </CardContent>
          </Card>

          {/* Status Info */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${link.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="text-sm font-medium">
                {link.isActive ? '链接已激活' : '链接已停用'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              创建于 {link.createdDate}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              关闭
            </Button>
            <Button
              className="bg-mystical-gradient hover:opacity-90"
              onClick={() => {
                handleCopyLink();
                onClose();
              }}
            >
              <SafeIcon name="Copy" className="mr-2 h-4 w-4" />
              复制链接并关闭
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
