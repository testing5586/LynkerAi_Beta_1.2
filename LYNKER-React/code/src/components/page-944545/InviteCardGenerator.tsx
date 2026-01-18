
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_INVITE_CARD } from '@/data/group_social';

interface InviteCardGeneratorProps {
  onClose: () => void;
}

export default function InviteCardGenerator({ onClose }: InviteCardGeneratorProps) {
  const [contentUrl, setContentUrl] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [platform, setPlatform] = useState('');
  const [generatedCard, setGeneratedCard] = useState<typeof MOCK_INVITE_CARD | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { id: 'bilibili', name: 'B站', icon: 'Play' },
    { id: 'xiaohongshu', name: '小红书', icon: 'Heart' },
    { id: 'douyin', name: '抖音', icon: 'Music' },
    { id: 'youtube', name: 'YouTube', icon: 'Youtube' },
  ];

  const handleGenerate = async () => {
    if (!contentUrl || !authorName || !platform) {
      alert('请填写所有必填项');
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock generated card
    setGeneratedCard({
      ...MOCK_INVITE_CARD,
      targetContentTitle: `${authorName}的最新预测内容`,
      originalPlatform: platforms.find((p) => p.id === platform)?.name || platform,
    });

    setIsGenerating(false);
  };

  const handleCopyLink = () => {
    if (generatedCard) {
      navigator.clipboard.writeText(generatedCard.shortUrl);
      alert('短链接已复制！');
    }
  };

  const handleDownloadQR = () => {
    if (generatedCard) {
      const link = document.createElement('a');
      link.href = generatedCard.qrCodeUrl;
      link.download = 'invite-qr.png';
      link.click();
    }
  };

  return (
    <Card className="border-2 border-accent/50 bg-card/50 backdrop-blur-sm mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Wand2" className="h-5 w-5 text-accent" />
              灵客官方邀请函生成器
            </CardTitle>
            <CardDescription>
              导入外部平台内容，生成邀请函邀请博主参与验证
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <SafeIcon name="X" className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!generatedCard ? (
          <div className="space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">选择平台</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      platform === p.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <SafeIcon name={p.icon} className="h-4 w-4" />
                    <span className="text-sm">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content URL */}
            <div>
              <label className="text-sm font-medium mb-2 block">内容链接</label>
              <Input
                placeholder="粘贴视频或文章链接..."
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                支持 B站、小红书、抖音、YouTube 等平台链接
              </p>
            </div>

            {/* Author Name */}
            <div>
              <label className="text-sm font-medium mb-2 block">博主名称</label>
              <Input
                placeholder="输入博主或命理师名称..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-background/50"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-mystical-gradient hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <SafeIcon name="Sparkles" className="h-4 w-4 mr-2" />
                  生成邀请函
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Generated Card Preview */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {generatedCard.targetContentTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    来自 {generatedCard.originalPlatform}
                  </p>
                </div>
                <Badge className="bg-accent text-accent-foreground">
                  <SafeIcon name="CheckCircle" className="h-3 w-3 mr-1" />
                  已生成
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center bg-background/50 rounded-lg p-4">
                  <img
                    src={generatedCard.qrCodeUrl}
                    alt="QR Code"
                    className="w-32 h-32 rounded-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-2">扫码分享</p>
                </div>

                {/* Short Link */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">短链接</p>
                  <div className="flex gap-2">
                    <Input
                      value={generatedCard.shortUrl}
                      readOnly
                      className="bg-background/50 text-xs"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyLink}
                    >
                      <SafeIcon name="Copy" className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {generatedCard.inviteMessage}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadQR}
                variant="outline"
                className="flex-1"
              >
                <SafeIcon name="Download" className="h-4 w-4 mr-2" />
                下载二维码
              </Button>
              <Button
                onClick={() => {
                  setGeneratedCard(null);
                  setContentUrl('');
                  setAuthorName('');
                  setPlatform('');
                }}
                variant="outline"
                className="flex-1"
              >
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                生成新邀请函
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
