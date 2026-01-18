
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_USER_RECORD_DETAIL, MOCK_MASTERS } from '@/data/knowledge';
import { MOCK_MASTERS as MASTER_LIST } from '@/data/user';

interface UserRecordDetailContentProps {
  recordId: string;
}

export default function UserRecordDetailContent({ recordId }: UserRecordDetailContentProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [customNotes, setCustomNotes] = useState(MOCK_USER_RECORD_DETAIL.customUserNotes);
  const [isSaving, setIsSaving] = useState(false);

  // Get master info
  const master = MASTER_LIST.find(m => m.masterId === MOCK_USER_RECORD_DETAIL.masterId);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    setIsEditingNotes(false);
  };

  return (
    <div className="container max-w-4xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="h-8 w-8"
              >
                <SafeIcon name="ArrowLeft" className="h-4 w-4" />
              </Button>
              <h1 className="text-3xl font-bold text-gradient-mystical">
                {MOCK_USER_RECORD_DETAIL.title}
              </h1>
            </div>
            <div className="flex items-center gap-4 ml-11">
              <span className="text-sm text-muted-foreground">
                {new Date(MOCK_USER_RECORD_DETAIL.date).toLocaleDateString('zh-CN')}
              </span>
              <Badge variant="secondary">
                <SafeIcon name="Video" className="w-3 h-3 mr-1" />
                {MOCK_USER_RECORD_DETAIL.type}
              </Badge>
            </div>
          </div>
        </div>

        {/* Master Info Card */}
        {master && (
          <Card className="glass-card mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <UserAvatar
                    user={{
                      name: master.alias,
                      avatar: master.avatarUrl,
                      country: master.geoTag.country,
                      isPro: true,
                    }}
                    size="large"
                    showHoverCard={false}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{master.alias}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{master.expertise}</p>
                    <RegionBadge country={master.geoTag.flagIcon} region={master.geoTag.region} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <SafeIcon name="Star" className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold">{master.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{master.serviceCount} 次服务</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Summary Section */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
            AI生成摘要
          </CardTitle>
          <CardDescription>由AI助手自动整理的本次咨询要点</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none text-sm">
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              {MOCK_USER_RECORD_DETAIL.aiSummaryMarkdown.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-lg font-bold mt-4 mb-2">
                      {line.replace('# ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-4 mb-1">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={idx} className="font-semibold mb-2">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (line.trim()) {
                  return (
                    <p key={idx} className="mb-2">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Section */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Video" className="h-5 w-5 text-accent" />
            咨询视频
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border mb-4">
            <div className="text-center">
              <SafeIcon name="Play" className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">视频播放器</p>
              <p className="text-xs text-muted-foreground mt-1">
                {MOCK_USER_RECORD_DETAIL.videoLink}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">关键片段链接：</p>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href={MOCK_USER_RECORD_DETAIL.videoLink} target="_blank" rel="noopener noreferrer">
                <SafeIcon name="Link" className="h-4 w-4 mr-2" />
                查看完整视频
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Modules */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="BarChart3" className="h-5 w-5 text-accent" />
            详细分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {MOCK_USER_RECORD_DETAIL.analysisDetails.map((analysis, idx) => (
                <TabsTrigger key={idx} value={idx.toString()}>
                  {analysis.type}
                </TabsTrigger>
              ))}
            </TabsList>

            {MOCK_USER_RECORD_DETAIL.analysisDetails.map((analysis, idx) => (
              <TabsContent key={idx} value={idx.toString()} className="space-y-4">
                {/* Key Points */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {analysis.keyPoints.map((point, pidx) => (
                    <div key={pidx} className="bg-muted/30 rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{point.key}</p>
                      <p className="font-semibold text-accent">{point.value}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Detailed Report */}
                <div>
                  <h4 className="font-semibold mb-3">详细报告</h4>
                  <div className="bg-muted/20 rounded-lg p-4 border border-border text-sm leading-relaxed">
                    {analysis.detailedReport}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Custom Notes Section */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="FileText" className="h-5 w-5 text-accent" />
              我的备注
            </CardTitle>
            {!isEditingNotes && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(true)}
              >
                <SafeIcon name="Edit" className="h-4 w-4 mr-1" />
                编辑
              </Button>
            )}
          </div>
          <CardDescription>记录您对本次咨询的想法和反思</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditingNotes ? (
            <div className="space-y-4">
              <Textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="输入您的备注..."
                className="min-h-32"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditingNotes(false);
                    setCustomNotes(MOCK_USER_RECORD_DETAIL.customUserNotes);
                  }}
                >
                  取消
                </Button>
                <Button
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                  className="bg-mystical-gradient"
                >
                  {isSaving ? (
                    <>
                      <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                      保存备注
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/20 rounded-lg p-4 border border-border text-sm leading-relaxed whitespace-pre-wrap">
              {customNotes || '暂无备注，点击编辑添加您的想法。'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Records */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Link" className="h-5 w-5 text-accent" />
            相关记录
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = './user-prognosis-record.html'}
            >
              <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              返回预测记录列表
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = './consultation-room.html'}
            >
              <SafeIcon name="Video" className="h-4 w-4 mr-2" />
              进入会话室
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = './knowledge-base-main.html'}
            >
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              返回知识库主页
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center mb-8">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          返回
        </Button>
        <Button
          className="bg-mystical-gradient"
          onClick={() => window.location.href = './knowledge-base-main.html'}
        >
          <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
          返回知识库
        </Button>
      </div>
    </div>
  );
}
