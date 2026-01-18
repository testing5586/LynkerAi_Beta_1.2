
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VideoSectionProps {
  videoLink: string;
}

export default function VideoSection({ videoLink }: VideoSectionProps) {
  return (
    <div className="space-y-4">
      {/* Main Video Player */}
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle>完整批命视频</CardTitle>
          <CardDescription>
            本次咨询的完整视频记录，由Jitsi会议系统自动保存
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <SafeIcon name="Play" className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">点击播放视频</p>
                  <p className="text-xs text-muted-foreground mt-1">时长：约 45 分钟</p>
                </div>
              </div>
            </div>

            {/* Play Button Overlay */}
            <Button
              size="lg"
              className="relative z-10 rounded-full bg-primary hover:bg-primary/90"
              onClick={() => window.open(videoLink, '_blank')}
            >
              <SafeIcon name="Play" className="h-6 w-6" />
            </Button>
          </div>

          {/* Video Info */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="FileVideo" className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">视频格式：MP4</span>
              </div>
              <span className="text-xs text-muted-foreground">1.2 GB</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">时长：45 分钟 32 秒</span>
              </div>
              <Badge variant="secondary">已保存</Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(videoLink, '_blank')}
            >
              <SafeIcon name="Download" className="mr-2 h-4 w-4" />
              下载视频
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(videoLink, '_blank')}
            >
              <SafeIcon name="Share2" className="mr-2 h-4 w-4" />
              分享链接
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Moments */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">关键时刻标记</CardTitle>
          <CardDescription>
            快速跳转到视频中的重要片段
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { time: '00:00', label: '开场介绍' },
              { time: '05:30', label: '八字分析开始' },
              { time: '15:45', label: '大运流年推算' },
              { time: '28:20', label: '建议和指导' },
              { time: '40:15', label: '答疑环节' },
            ].map((moment, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => window.open(`${videoLink}?t=${moment.time}`, '_blank')}
              >
                <SafeIcon name="Bookmark" className="mr-2 h-4 w-4 text-accent" />
                <span className="font-mono text-xs text-muted-foreground mr-3">
                  {moment.time}
                </span>
                <span>{moment.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">视频字幕</CardTitle>
          <CardDescription>
            AI自动生成的实时字幕记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 overflow-y-auto space-y-3 p-4 rounded-lg bg-muted/30">
            <div className="text-xs space-y-2">
              <p className="text-muted-foreground">
                <span className="font-mono text-primary">00:00</span> - 大家好，今天为您进行八字批命...
              </p>
              <p className="text-muted-foreground">
                <span className="font-mono text-primary">00:15</span> - 您的命盘显示日主为甲木...
              </p>
              <p className="text-muted-foreground">
                <span className="font-mono text-primary">00:45</span> - 这个格局在现代社会中...
              </p>
              <p className="text-muted-foreground">
                <span className="font-mono text-primary">01:20</span> - 建议您在事业选择上...
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => window.location.href = './ai-generated-note-view.html'}
          >
            <SafeIcon name="FileText" className="mr-2 h-4 w-4" />
            查看完整字幕和笔记
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
