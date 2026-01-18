
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface VideoSegmentSectionProps {
  videoLink: string;
}

export default function VideoSegmentSection({ videoLink }: VideoSegmentSectionProps) {
  return (
    <div className="space-y-4">
      {/* Video Player Placeholder */}
      <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video border border-primary/20">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <SafeIcon name="Play" className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-semibold">完整会话视频</p>
              <p className="text-sm text-muted-foreground">点击下方按钮查看视频</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <Card className="glass-card border-primary/10 p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">视频信息</h4>
              <p className="text-sm text-muted-foreground mt-1">
                此视频包含完整的批命过程，包括分析、讨论和建议。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">视频格式</p>
              <p className="font-medium">MP4 (H.264)</p>
            </div>
            <div>
              <p className="text-muted-foreground">分辨率</p>
              <p className="font-medium">1080p</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="flex-1 bg-mystical-gradient hover:opacity-90"
          onClick={() => window.open(videoLink, '_blank')}
        >
          <SafeIcon name="Play" className="mr-2 h-4 w-4" />
          播放视频
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            // In real app, would trigger download
            const link = document.createElement('a');
            link.href = videoLink;
            link.download = 'consultation-video.mp4';
            link.click();
          }}
        >
          <SafeIcon name="Download" className="mr-2 h-4 w-4" />
          下载视频
        </Button>
      </div>

      {/* Video Segments */}
      <Card className="glass-card border-primary/10 p-4">
        <h4 className="font-semibold text-foreground mb-4">关键时间点</h4>
        <div className="space-y-2">
          {[
            { time: '00:00', label: '开场与客户信息确认' },
            { time: '02:30', label: '八字分析开始' },
            { time: '15:45', label: '紫微斗数解读' },
            { time: '28:20', label: '预言与建议' },
            { time: '35:00', label: '总结与答疑' },
          ].map((segment, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-between group"
              onClick={() => {
                // In real app, would seek to timestamp
                console.log(`Seeking to ${segment.time}`);
              }}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <div>
                  <p className="font-medium text-foreground">{segment.label}</p>
                  <p className="text-xs text-muted-foreground">{segment.time}</p>
                </div>
              </div>
              <SafeIcon name="ChevronRight" className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </button>
          ))}
        </div>
      </Card>

      {/* Download Info */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <SafeIcon name="Info" className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>视频保存：</strong>此视频将自动保存在您的知识库中，可随时查看。
            </p>
            <p>
              <strong>隐私保护：</strong>视频内容仅供您和客户查看，受到严格的隐私保护。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
