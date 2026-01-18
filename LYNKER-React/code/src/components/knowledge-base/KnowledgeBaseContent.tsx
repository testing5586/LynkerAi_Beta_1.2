
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_RECORDS, MOCK_PROPHECY_RECORDS } from '@/data/knowledge';

export default function KnowledgeBaseContent() {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Filter records by search query
  const filteredRecords = MOCK_USER_RECORDS.filter(
    (record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.masterAlias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveNotes = (recordId: string, notes: string) => {
    setCustomNotes((prev) => ({
      ...prev,
      [recordId]: notes,
    }));
  };

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">个人知识库</h1>
            <p className="text-muted-foreground">
              您的命理咨询笔记和预言应验记录管理中心
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = './consultation-room.html'}
            className="gap-2"
          >
            <SafeIcon name="ArrowLeft" className="h-4 w-4" />
            返回咨询室
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SafeIcon
            name="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            placeholder="搜索记录标题或命理师名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all" className="gap-2">
            <SafeIcon name="BookOpen" className="h-4 w-4" />
            <span className="hidden sm:inline">全部记录</span>
          </TabsTrigger>
          <TabsTrigger value="bazi" className="gap-2">
            <SafeIcon name="SquareGanttChart" className="h-4 w-4" />
            <span className="hidden sm:inline">八字</span>
          </TabsTrigger>
          <TabsTrigger value="ziwei" className="gap-2">
            <SafeIcon name="Star" className="h-4 w-4" />
            <span className="hidden sm:inline">紫微</span>
          </TabsTrigger>
          <TabsTrigger value="prophecy" className="gap-2">
            <SafeIcon name="CheckCircle" className="h-4 w-4" />
            <span className="hidden sm:inline">预言应验</span>
          </TabsTrigger>
        </TabsList>

        {/* All Records Tab */}
        <TabsContent value="all" className="space-y-4">
          {filteredRecords.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SafeIcon name="FileText" className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  {searchQuery ? '未找到匹配的记录' : '您还没有任何咨询记录'}
                </p>
              </CardContent>
            </Card>
          ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecords.map((record) => (
                <RecordCard
                  key={record.recordId}
                  record={record}
                  customNotes={customNotes[record.recordId]}
                  onSaveNotes={(notes) => handleSaveNotes(record.recordId, notes)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Bazi Tab */}
        <TabsContent value="bazi" className="space-y-4">
          {filteredRecords.filter((r) => r.type === '八字').length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SafeIcon name="SquareGanttChart" className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">暂无八字咨询记录</p>
              </CardContent>
            </Card>
          ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {filteredRecords
                 .filter((r) => r.type === '八字')
                 .map((record) => (
                   <RecordCard
                     key={record.recordId}
                     record={record}
                     customNotes={customNotes[record.recordId]}
                     onSaveNotes={(notes) => handleSaveNotes(record.recordId, notes)}
                   />
                 ))}
             </div>
          )}
        </TabsContent>

        {/* Ziwei Tab */}
        <TabsContent value="ziwei" className="space-y-4">
          {filteredRecords.filter((r) => r.type === '紫微').length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SafeIcon name="Star" className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">暂无紫微咨询记录</p>
              </CardContent>
            </Card>
          ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {filteredRecords
                 .filter((r) => r.type === '紫微')
                 .map((record) => (
                   <RecordCard
                     key={record.recordId}
                     record={record}
                     customNotes={customNotes[record.recordId]}
                     onSaveNotes={(notes) => handleSaveNotes(record.recordId, notes)}
                   />
                 ))}
             </div>
          )}
        </TabsContent>

        {/* Prophecy Tab */}
        <TabsContent value="prophecy" className="space-y-4">
          {MOCK_PROPHECY_RECORDS.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SafeIcon name="CheckCircle" className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">暂无预言应验记录</p>
              </CardContent>
            </Card>
          ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {MOCK_PROPHECY_RECORDS.map((prophecy) => (
                 <ProphecyCard key={prophecy.prophecyId} prophecy={prophecy} />
               ))}
             </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RecordCard({
  record,
  customNotes,
  onSaveNotes,
}: {
  record: any;
  customNotes?: string;
  onSaveNotes: (notes: string) => void;
}) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(customNotes || '');

  return (
    <Card className="glass-card hover:shadow-card transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{record.title}</CardTitle>
              <Badge variant="secondary">{record.type}</Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <SafeIcon name="User" className="h-4 w-4" />
              {record.masterAlias}
              <span className="text-muted-foreground">•</span>
              <SafeIcon name="Calendar" className="h-4 w-4" />
              {record.date}
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <SafeIcon name="MoreVertical" className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>记录详情</DialogTitle>
                <DialogDescription>
                  {record.title} - {record.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">AI生成摘要</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {record.userNotesPreview}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">视频链接</h4>
                  <a
                    href={record.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <SafeIcon name="Video" className="h-4 w-4" />
                    查看咨询视频
                  </a>
                </div>
                <Button
                  asChild
                  className="w-full bg-mystical-gradient"
                >
                  <a href="./user-record-detail.html">查看完整详情</a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thumbnail */}
        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted">
          <img
            src={record.thumbnailUrl}
            alt={record.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
            <a
              href={record.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white hover:text-accent transition-colors"
            >
              <SafeIcon name="Play" className="h-4 w-4" />
              播放视频
            </a>
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">自定义备注</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingNotes(!isEditingNotes)}
            >
              {isEditingNotes ? '完成' : '编辑'}
            </Button>
          </div>

          {isEditingNotes ? (
            <div className="space-y-2">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="添加您的个人备注..."
                className="min-h-24"
              />
              <Button
                size="sm"
                onClick={() => {
                  onSaveNotes(notes);
                  setIsEditingNotes(false);
                }}
                className="bg-mystical-gradient"
              >
                保存备注
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md min-h-12">
              {notes || '暂无备注，点击编辑添加...'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProphecyCard({ prophecy }: { prophecy: any }) {
  const statusColors = {
    已应验: 'bg-green-500/20 text-green-400 border-green-500/30',
    未应验: 'bg-red-500/20 text-red-400 border-red-500/30',
    应验中: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{prophecy.prophecySummary}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <SafeIcon name="User" className="h-4 w-4" />
              {prophecy.sourceMaster}
              <span className="text-muted-foreground">•</span>
              <SafeIcon name="Calendar" className="h-4 w-4" />
              {prophecy.dateRecorded}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`${statusColors[prophecy.fulfillmentStatus as keyof typeof statusColors]}`}
          >
            {prophecy.fulfillmentStatus}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">预期应验日期</p>
            <p className="font-semibold">{prophecy.dateExpected}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">记录日期</p>
            <p className="font-semibold">{prophecy.dateRecorded}</p>
          </div>
        </div>

        {prophecy.userReflection && (
          <div>
            <p className="text-muted-foreground text-sm mb-2">您的反思</p>
            <p className="text-sm bg-muted/50 p-3 rounded-md">
              {prophecy.userReflection}
            </p>
          </div>
        )}

        <Button variant="outline" className="w-full" asChild>
          <a href="./prophecy-verification-record.html">
            <SafeIcon name="Edit" className="mr-2 h-4 w-4" />
            编辑记录
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
