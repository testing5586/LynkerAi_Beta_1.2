
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_NOTE_DETAIL } from '@/data/ai_settings';
import MarkdownRenderer from './MarkdownRenderer';
import VideoPlayer from './VideoPlayer';
import NoteActions from './NoteActions';
import NoteMetadata from './NoteMetadata';

export default function AIGeneratedNoteView() {
  const [note] = useState(MOCK_AI_NOTE_DETAIL);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.fullMarkdownContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    // Show success toast
  };

  const handleSaveToKnowledge = () => {
    // Navigate to knowledge base with note data
    window.location.href = './knowledge-base.html';
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
            <NoteMetadata note={note} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReturn}
            className="ml-4"
          >
            <SafeIcon name="X" className="h-5 w-5" />
          </Button>
        </div>
        <Separator className="my-4" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Note Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs for different views */}
          <Tabs defaultValue="markdown" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="markdown">
                <SafeIcon name="FileText" className="mr-2 h-4 w-4" />
                笔记内容
              </TabsTrigger>
              <TabsTrigger value="video">
                <SafeIcon name="Video" className="mr-2 h-4 w-4" />
                视频片段
              </TabsTrigger>
            </TabsList>

            {/* Markdown Content Tab */}
            <TabsContent value="markdown" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">AI转录与分析</CardTitle>
                  <CardDescription>
                    自动生成的Markdown格式笔记，包含实时字幕转录和关键分析提取
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-96 p-4 bg-background border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="编辑笔记内容..."
                    />
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <MarkdownRenderer content={note.fullMarkdownContent} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Info Alert */}
              <Alert className="border-accent/50 bg-accent/5">
                <SafeIcon name="Lightbulb" className="h-4 w-4 text-accent" />
                <AlertDescription>
                  <strong>提示：</strong>此笔记由AI自动生成，您可以编辑和完善内容，然后保存到个人知识库中。
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Video Tab */}
            <TabsContent value="video" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">咨询视频片段</CardTitle>
                  <CardDescription>
                    点击下方链接查看相关的咨询视频片段
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPlayer videoUrl={note.consultationRefId} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Key Insights Section */}
          <Card className="glass-card border-accent/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <SafeIcon name="Sparkles" className="mr-2 h-5 w-5 text-accent" />
                关键洞察
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Badge className="mt-1 bg-primary/20 text-primary border-primary/30">核心</Badge>
                <div>
                  <p className="font-medium text-sm">本次咨询的核心主题</p>
                  <p className="text-sm text-muted-foreground">分析命主在2025年春季的事业变动及其稳定性。</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start space-x-3">
                <Badge className="mt-1 bg-destructive/20 text-destructive border-destructive/30">警告</Badge>
                <div>
                  <p className="font-medium text-sm">AI断语提醒</p>
                  <p className="text-sm text-muted-foreground">注意丙火和申金的冲突，可能会导致合作关系破裂。</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start space-x-3">
                <Badge className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">建议</Badge>
                <div>
                  <p className="font-medium text-sm">建议行动</p>
                  <p className="text-sm text-muted-foreground">在农历三月前，避免签订长期合同，灵活调整策略。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          <NoteActions
            isEditing={isEditing}
            isSaving={isSaving}
            onEdit={() => setIsEditing(!isEditing)}
            onSave={handleSave}
            onSaveToKnowledge={handleSaveToKnowledge}
            onReturn={handleReturn}
          />

          {/* Related Info Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">笔记信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">咨询ID</p>
                <p className="font-mono text-xs bg-background p-2 rounded mt-1 break-all">
                  {note.consultationRefId}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">生成时间</p>
                <p className="font-medium">{note.timestamp}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">字数统计</p>
                <p className="font-medium">{note.fullMarkdownContent.length} 字符</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">快速链接</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a href="./ai-chat-interface.html">
                  <SafeIcon name="MessageSquare" className="mr-2 h-4 w-4" />
                  返回AI聊天
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a href="./knowledge-base.html">
                  <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
                  查看知识库
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a href="./prophecy-verification-record.html">
                  <SafeIcon name="CheckCircle" className="mr-2 h-4 w-4" />
                  预言应验记录
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
