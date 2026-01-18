
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
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_INVITE_CARD } from '@/data/group_social';

interface InviteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteCardModal({ isOpen, onClose }: InviteCardModalProps) {
  const [step, setStep] = useState<'input' | 'preview' | 'generated'>('input');
  const [contentUrl, setContentUrl] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenerateInvite = async () => {
    if (!contentUrl.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('generated');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(MOCK_INVITE_CARD.shortUrl);
    alert('短链接已复制！');
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = MOCK_INVITE_CARD.qrCodeUrl;
    link.download = 'invite-qr.png';
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isExpanded ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <SafeIcon name="Gift" className="w-5 h-5 text-accent" />
                生成灵客官方邀请函
              </DialogTitle>
              <DialogDescription>
                邀请博主参与灵客AI炼丹房，让大众验证预言准确度
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              <SafeIcon name={isExpanded ? 'Minimize2' : 'Maximize2'} className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'input' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">内容链接</label>
                <Input
                  placeholder="粘贴小红书、抖音、B站或YouTube链接..."
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  支持的平台：小红书、抖音、B站、YouTube
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">内容标题（可选）</label>
                <Input
                  placeholder="自定义标题，或系统自动识别..."
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-mystical-gradient hover:opacity-90"
                  onClick={handleGenerateInvite}
                  disabled={!contentUrl.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <SafeIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <SafeIcon name="Sparkles" className="w-4 h-4 mr-2" />
                      生成邀请函
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  取消
                </Button>
              </div>
            </div>
          )}

          {step === 'generated' && (
            <div className="space-y-4">
              {/* Invite Card Preview */}
              <Card className="glass-card p-6 space-y-4">
                <div className="text-center space-y-2">
                  <Badge className="bg-accent text-accent-foreground mx-auto">
                    <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                    结丹成功！
                  </Badge>
                  <h3 className="text-lg font-bold text-gradient-mystical">
                    灵客官方邀请函
                  </h3>
                </div>

                <div className="border-t border-b py-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">邀请内容</p>
                    <p className="text-sm font-medium">{MOCK_INVITE_CARD.targetContentTitle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">来源平台</p>
                    <p className="text-sm">{MOCK_INVITE_CARD.originalPlatform}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">邀请信息</p>
                    <p className="text-sm italic">{MOCK_INVITE_CARD.inviteMessage}</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-xs text-muted-foreground">扫描二维码或分享短链接</p>
                  <div className="w-32 h-32 bg-white p-2 rounded-lg">
                    <img
                      src={MOCK_INVITE_CARD.qrCodeUrl}
                      alt="QR Code"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={MOCK_INVITE_CARD.shortUrl}
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                  >
                    <SafeIcon name="Copy" className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-mystical-gradient hover:opacity-90"
                    onClick={handleDownloadQR}
                  >
                    <SafeIcon name="Download" className="w-4 h-4 mr-2" />
                    下载二维码
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(MOCK_INVITE_CARD.inviteMessage);
                      alert('邀请文案已复制！');
                    }}
                  >
                    <SafeIcon name="Copy" className="w-4 h-4 mr-2" />
                    复制文案
                  </Button>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setStep('input');
                    setContentUrl('');
                    setContentTitle('');
                  }}
                >
                  <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                  生成新邀请函
                </Button>
              </div>

              {/* Tips */}
              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                <p className="text-xs font-semibold text-foreground">💡 使用提示</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 将短链接分享到博主的评论区</li>
                  <li>• 邀请粉丝在灵客AI投票验证准确度</li>
                  <li>• 支持多个平台的内容导入</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
