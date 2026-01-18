
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock video thumbnail
  const thumbnailUrl = "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/9/b8d4b464-c233-4ebc-8301-0f0cc8ef4b78.png";

  return (
    <div className="space-y-4">
      {/* Video Thumbnail */}
      <Card className="glass-card overflow-hidden group cursor-pointer">
        <div className="relative aspect-video bg-background/50">
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() => setIsPlaying(true)}
            >
              <SafeIcon name="Play" className="h-8 w-8 text-white fill-white" />
            </Button>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 px-3 py-1 rounded text-xs text-white">
            90:00
          </div>
        </div>
      </Card>

      {/* Video Info */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">视频链接</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => {
              navigator.clipboard.writeText(videoUrl);
            }}
          >
            <SafeIcon name="Copy" className="h-4 w-4 mr-1" />
            复制链接
          </Button>
        </div>
        <div className="bg-background/50 p-3 rounded border border-border break-all font-mono text-xs">
          {videoUrl}
        </div>
      </div>

      {/* Video Segments */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm">关键时间点</h4>
        <div className="space-y-2">
          {[
            { time: '0:00', label: '咨询开始' },
            { time: '15:30', label: '命盘分析' },
            { time: '45:00', label: '风险提醒' },
            { time: '75:00', label: '建议总结' },
          ].map((segment) => (
            <Button
              key={segment.time}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left"
              onClick={() => {
                // In real app, would seek to this time
                setIsPlaying(true);
              }}
            >
              <SafeIcon name="Clock" className="mr-2 h-4 w-4" />
              <span className="flex-1">{segment.label}</span>
              <span className="text-xs text-muted-foreground">{segment.time}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Download Option */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        asChild
      >
        <a href={videoUrl} download>
          <SafeIcon name="Download" className="mr-2 h-4 w-4" />
          下载视频
        </a>
      </Button>
    </div>
  );
}
