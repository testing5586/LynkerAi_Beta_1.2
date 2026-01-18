
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import { MOCK_MASTER_RECORD_DETAIL } from '@/data/knowledge';
import { MOCK_USER_ALIASES } from '@/data/base-mock';

export default function MasterRecordDetailContent() {
  const record = MOCK_MASTER_RECORD_DETAIL;
  const [customNotes, setCustomNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const getValidationStatusColor = (status: string) => {
    switch (status) {
      case '已应验':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '未应验':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case '部分应验':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case '待验证':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">批命记录详情</h1>
            <p className="text-muted-foreground">
              客户：{record.clientId} | 日期：{record.date}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center space-x-2"
          >
            <SafeIcon name="ArrowLeft" className="h-4 w-4" />
            <span>返回列表</span>
          </Button>
        </div>

        {/* Client Info Card */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <UserAvatar
                  user={{
                    name: record.clientId,
                    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f8235e88-0267-4a5c-93ad-98adb68069c3.png',
                    country: 'CN',
                    region: '广东深圳',
                  }}
                  size="large"
                  showHoverCard={false}
                />
                <div>
                  <h2 className="text-xl font-semibold">{record.clientId}</h2>
                  <p className="text-sm text-muted-foreground">
                    会话ID：{record.consultationId}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">批命日期</p>
                <p className="text-lg font-semibold">{record.date}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="notes" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <SafeIcon name="FileText" className="h-4 w-4" />
            <span>AI笔记</span>
          </TabsTrigger>
          <TabsTrigger value="prophecy" className="flex items-center space-x-2">
            <SafeIcon name="CheckCircle" className="h-4 w-4" />
            <span>应验标记</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center space-x-2">
            <SafeIcon name="Video" className="h-4 w-4" />
            <span>视频片段</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                <span>AI自动生成笔记</span>
              </CardTitle>
              <CardDescription>
                由AI助手自动转录和整理的批命记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none mb-6">
                <div className="bg-muted/30 rounded-lg p-6 border border-border/50 overflow-auto max-h-96">
                  <div className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {record.fullAIMarkdown}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Custom Notes Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">自定义备注</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    添加您的个人备注和补充说明
                  </p>
                  <Textarea
                    placeholder="输入您的备注内容..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">取消</Button>
                  <Button
                    onClick={handleSaveNotes}
                    disabled={isSaving}
                    className="bg-mystical-gradient hover:opacity-90"
                  >
                    {isSaving ? (
                      <>
                        <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <SafeIcon name="Save" className="mr-2 h-4 w-4" />
                        保存备注
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prophecy Validation Tab */}
        <TabsContent value="prophecy" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="CheckCircle" className="h-5 w-5 text-accent" />
                <span>预言应验情况</span>
              </CardTitle>
              <CardDescription>
                追踪和标记预言的应验状态
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {record.prophecyValidationMarkers.map((marker, index) => (
                <div key={index} className="border border-border/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{marker.prophecy}</h4>
                      <p className="text-sm text-muted-foreground">
                        预期应验日期：{marker.expectedDate}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`whitespace-nowrap ${getValidationStatusColor(marker.validationStatus)}`}
                    >
                      {marker.validationStatus}
                    </Badge>
                  </div>

                  {/* Status Update Options */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
                    {['已应验', '未应验', '部分应验', '待验证'].map((status) => (
                      <Button
                        key={status}
                        variant={marker.validationStatus === status ? 'default' : 'outline'}
                        size="sm"
                        className={marker.validationStatus === status ? 'bg-mystical-gradient' : ''}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add New Prophecy */}
              <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center">
                <SafeIcon name="Plus" className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <button className="text-accent hover:underline">
                    添加新的预言标记
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="video" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Video" className="h-5 w-5 text-accent" />
                <span>会话视频</span>
              </CardTitle>
              <CardDescription>
                完整的批命会话视频记录
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Player */}
              <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center border border-border/50">
                <div className="text-center space-y-4">
                  <SafeIcon name="Play" className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-muted-foreground mb-2">视频播放器</p>
                    <a
                      href={record.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-sm"
                    >
                      点击打开完整视频 →
                    </a>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">视频链接</p>
                  <p className="text-sm font-mono truncate text-accent">
                    {record.videoLink}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">会话ID</p>
                  <p className="text-sm font-mono">{record.consultationId}</p>
                </div>
              </div>

              {/* Download/Share Options */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <SafeIcon name="Download" className="mr-2 h-4 w-4" />
                  下载视频
                </Button>
                <Button variant="outline" className="flex-1">
                  <SafeIcon name="Share2" className="mr-2 h-4 w-4" />
                  分享链接
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-6 border-t border-border/50">
        <Button
          variant="outline"
          onClick={() => window.location.href = './master-prognosis-record.html'}
          className="flex items-center space-x-2"
        >
          <SafeIcon name="ArrowLeft" className="h-4 w-4" />
          <span>返回批命记录</span>
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.location.href = './consultation-room.html'}
            className="flex items-center space-x-2"
          >
            <SafeIcon name="Video" className="h-4 w-4" />
            <span>进入会话室</span>
          </Button>
          <Button
            onClick={() => window.location.href = './customer-prognosis-records-view.html'}
            className="bg-mystical-gradient hover:opacity-90 flex items-center space-x-2"
          >
            <SafeIcon name="Users" className="h-4 w-4" />
            <span>查看客户记录</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
