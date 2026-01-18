
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_MASTER_RECORD_DETAIL } from '@/data/knowledge';
import { MOCK_USER_ALIASES } from '@/data/base-mock';
import RecordMarkdownContent from './RecordMarkdownContent';
import ProphecyValidationMarkers from './ProphecyValidationMarkers';
import VideoSegmentSection from './VideoSegmentSection';
import NotesEditor from './NotesEditor';

export default function MasterRecordDetailPage() {
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const record = MOCK_MASTER_RECORD_DETAIL;

  // Mock client info
  const clientInfo = {
    name: record.clientId,
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f8235e88-0267-4a5c-93ad-98adb68069c3.png',
    country: 'CN',
    region: '广东深圳',
  };

  const handleSaveNotes = (content: string) => {
    setNotes(content);
    setIsEditingNotes(false);
    // In real app, would save to backend
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history.back()}
          className="text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="ChevronLeft" className="mr-2 h-4 w-4" />
          返回批命记录
        </Button>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/10">
            {record.date}
          </Badge>
        </div>
      </div>

      {/* Client Info Card */}
      <Card className="glass-card mb-6 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <UserAvatar
                user={clientInfo}
                size="large"
                showHoverCard={false}
              />
              <div>
                <CardTitle className="text-2xl">{clientInfo.name}</CardTitle>
                <CardDescription className="mt-2">
                  <RegionBadge country={clientInfo.country} region={clientInfo.region} />
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">批命日期</p>
              <p className="text-lg font-semibold">{record.date}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="markdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="markdown" className="flex items-center space-x-2">
            <SafeIcon name="FileText" className="h-4 w-4" />
            <span>批命笔记</span>
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

        {/* Markdown Content Tab */}
        <TabsContent value="markdown" className="space-y-4">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="FileText" className="h-5 w-5 text-accent" />
                <span>AI生成的批命笔记</span>
              </CardTitle>
              <CardDescription>
                由AI自动转录和整理的批命过程记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecordMarkdownContent content={record.fullAIMarkdown} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prophecy Validation Tab */}
        <TabsContent value="prophecy" className="space-y-4">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="CheckCircle" className="h-5 w-5 text-accent" />
                <span>预言应验情况</span>
              </CardTitle>
              <CardDescription>
                追踪和标记预言的应验状态
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProphecyValidationMarkers markers={record.prophecyValidationMarkers} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="video" className="space-y-4">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Video" className="h-5 w-5 text-accent" />
                <span>完整会话视频</span>
              </CardTitle>
              <CardDescription>
                本次批命的完整视频记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VideoSegmentSection videoLink={record.videoLink} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notes Section */}
      <Card className="glass-card border-primary/20 mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="Edit" className="h-5 w-5 text-accent" />
              <span>命理师备注</span>
            </CardTitle>
            {!isEditingNotes && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(true)}
              >
                <SafeIcon name="Edit" className="mr-2 h-4 w-4" />
                编辑备注
              </Button>
            )}
          </div>
          <CardDescription>
            添加或编辑关于此次批命的个人备注
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditingNotes ? (
            <NotesEditor
              initialContent={notes}
              onSave={handleSaveNotes}
              onCancel={() => setIsEditingNotes(false)}
            />
          ) : (
            <div className="prose prose-invert max-w-none">
              {notes ? (
                <div className="bg-muted/50 rounded-lg p-4 text-foreground whitespace-pre-wrap">
                  {notes}
                </div>
              ) : (
                <div className="text-muted-foreground italic">
                  暂无备注。点击"编辑备注"添加您的想法。
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Actions */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <h3 className="text-lg font-semibold mb-4">相关操作</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.location.href = './consultation-room.html'}
          >
            <SafeIcon name="Video" className="mr-2 h-4 w-4" />
            进入会话室
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.location.href = './knowledge-base-main.html'}
          >
            <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
            返回知识库
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.location.href = './customer-prognosis-records-view.html'}
          >
            <SafeIcon name="List" className="mr-2 h-4 w-4" />
            查看所有客户记录
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.location.href = './master-prognosis-record.html'}
          >
            <SafeIcon name="ChevronLeft" className="mr-2 h-4 w-4" />
            返回批命记录列表
          </Button>
        </div>
      </div>

      {/* Info Box */}
      <Card className="glass-card border-accent/20 mt-8 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <SafeIcon name="Info" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>提示：</strong>此页面展示的是您对客户的完整批命记录。所有内容均由AI自动转录和整理，确保准确性和完整性。
              </p>
              <p>
                您可以随时编辑备注、更新应验标记，以便更好地追踪预言的应验情况。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
