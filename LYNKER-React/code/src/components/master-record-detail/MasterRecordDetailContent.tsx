
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import { MOCK_MASTER_RECORD_DETAIL } from '@/data/knowledge';
import { MOCK_USER_ALIASES } from '@/data/user';
import MasterRecordDetailSidebar from './MasterRecordDetailSidebar';
import MarkdownNoteViewer from './MarkdownNoteViewer';
import ProphecyValidationList from './ProphecyValidationList';
import VideoSection from './VideoSection';

export default function MasterRecordDetailContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(MOCK_MASTER_RECORD_DETAIL.fullAIMarkdown);
  const [prophecyMarkers, setProphecyMarkers] = useState(
    MOCK_MASTER_RECORD_DETAIL.prophecyValidationMarkers
  );

  const handleSaveNotes = () => {
    setIsEditing(false);
    // In real app, would save to backend
  };

  const handleUpdateProphecy = (index: number, status: string) => {
    const updated = [...prophecyMarkers];
    updated[index].validationStatus = status as any;
    setProphecyMarkers(updated);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <MasterRecordDetailSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.location.href = './master-prognosis-record.html'}
                  >
                    <SafeIcon name="ArrowLeft" className="h-5 w-5" />
                  </Button>
                  <h1 className="text-3xl font-bold">批命详情</h1>
                </div>
                <p className="text-muted-foreground">
                  客户：{MOCK_MASTER_RECORD_DETAIL.clientId} | 日期：{MOCK_MASTER_RECORD_DETAIL.date}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <SafeIcon name={isEditing ? 'Check' : 'Edit'} className="mr-2 h-4 w-4" />
                  {isEditing ? '完成编辑' : '编辑笔记'}
                </Button>
                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNotes(MOCK_MASTER_RECORD_DETAIL.fullAIMarkdown);
                      setIsEditing(false);
                    }}
                  >
                    <SafeIcon name="X" className="mr-2 h-4 w-4" />
                    取消
                  </Button>
                )}
              </div>
            </div>

            {/* Client Info Card */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <UserAvatar
                      user={{
                        name: MOCK_MASTER_RECORD_DETAIL.clientId,
                        avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f8235e88-0267-4a5c-93ad-98adb68069c3.png',
                        country: 'CN',
                      }}
                      size="large"
                      showHoverCard={false}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{MOCK_MASTER_RECORD_DETAIL.clientId}</h3>
                      <p className="text-sm text-muted-foreground">
                        咨询ID：{MOCK_MASTER_RECORD_DETAIL.consultationId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        批命日期：{MOCK_MASTER_RECORD_DETAIL.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = './consultation-room.html'}
                    >
                      <SafeIcon name="Video" className="mr-2 h-4 w-4" />
                      进入会话室
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = './user-record-detail.html'}
                    >
                      <SafeIcon name="User" className="mr-2 h-4 w-4" />
                      查看客户记录
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="notes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">
                <SafeIcon name="FileText" className="mr-2 h-4 w-4" />
                AI笔记
              </TabsTrigger>
              <TabsTrigger value="prophecy">
                <SafeIcon name="CheckCircle" className="mr-2 h-4 w-4" />
                应验标记
              </TabsTrigger>
              <TabsTrigger value="video">
                <SafeIcon name="Video" className="mr-2 h-4 w-4" />
                视频片段
              </TabsTrigger>
            </TabsList>

            {/* AI Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>AI生成的Markdown笔记</CardTitle>
                  <CardDescription>
                    由AI自动转录和整理的批命过程记录
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarkdownNoteViewer
                    content={notes}
                    isEditing={isEditing}
                    onChange={setNotes}
                    onSave={handleSaveNotes}
                  />
                </CardContent>
              </Card>

              {/* AI Insights Alert */}
              <Alert className="border-primary/50 bg-primary/5">
                <SafeIcon name="Lightbulb" className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI提醒：</strong> 本次批命中提到的"丙火和申金的冲突"需要在后续跟进中重点关注，建议在下次咨询时验证其影响。
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Prophecy Validation Tab */}
            <TabsContent value="prophecy" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>预言应验情况</CardTitle>
                  <CardDescription>
                    标记和追踪本次批命中的预言应验状态
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProphecyValidationList
                    prophecies={prophecyMarkers}
                    onUpdateStatus={handleUpdateProphecy}
                  />
                </CardContent>
              </Card>

              {/* Validation Statistics */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>应验统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-green-500">
                        {prophecyMarkers.filter(p => p.validationStatus === '已应验').length}
                      </div>
                      <p className="text-sm text-muted-foreground">已应验</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-yellow-500">
                        {prophecyMarkers.filter(p => p.validationStatus === '应验中').length}
                      </div>
                      <p className="text-sm text-muted-foreground">应验中</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-red-500">
                        {prophecyMarkers.filter(p => p.validationStatus === '未应验').length}
                      </div>
                      <p className="text-sm text-muted-foreground">未应验</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-blue-500">
                        {prophecyMarkers.filter(p => p.validationStatus === '待验证').length}
                      </div>
                      <p className="text-sm text-muted-foreground">待验证</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Video Tab */}
            <TabsContent value="video" className="space-y-4">
              <VideoSection videoLink={MOCK_MASTER_RECORD_DETAIL.videoLink} />
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => window.location.href = './master-prognosis-record.html'}
            >
              <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
              返回批命记录
            </Button>
<div className="flex items-center space-x-2">
              <Button className="bg-mystical-gradient hover:opacity-90">
                <SafeIcon name="Save" className="mr-2 h-4 w-4" />
                保存所有更改
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
