
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import KnowledgeBaseSidebar from './KnowledgeBaseSidebar';
import ImportArticleModal from './ImportArticleModal';
import NotesList from './NotesList';
import AIResearchChat from './AIResearchChat';
import CreateNoteModal from './CreateNoteModal';
import { MOCK_KB_NOTES, MOCK_RESEARCH_TOPIC, MOCK_KB_CATEGORIES } from '@/data/knowledge';

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState('notes');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [notes, setNotes] = useState(MOCK_KB_NOTES);
  const [researchTopics, setResearchTopics] = useState(MOCK_RESEARCH_TOPIC);
  const [searchQuery, setSearchQuery] = useState('');

  const handleImportArticle = (url: string, title: string) => {
    const newNote = {
      noteId: `note_${Date.now()}`,
      title: title || '导入文章',
      contentMarkdown: `# ${title || '导入文章'}\n\n来源: ${url}\n\n[点击查看原文](${url})`,
      dateCreated: new Date().toISOString().split('T')[0],
      sourceUrl: url,
    };
    setNotes([newNote, ...notes]);
    setShowImportModal(false);
  };

  const handleCreateNote = (title: string, content: string) => {
    const newNote = {
      noteId: `note_${Date.now()}`,
      title,
      contentMarkdown: content,
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setNotes([newNote, ...notes]);
    setShowCreateNoteModal(false);
  };

  const handleCreateResearchTopic = (title: string) => {
    const newTopic = {
      topicId: `rt_${Date.now()}`,
      title,
      currentStage: 'Draft' as const,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setResearchTopics([newTopic, ...researchTopics]);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.contentMarkdown.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <KnowledgeBaseSidebar
        researchTopics={researchTopics}
        onCreateTopic={handleCreateResearchTopic}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b bg-background/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient-mystical">我的知识库</h1>
              <p className="text-muted-foreground mt-1">
                管理您的命理笔记、导入的文章和研究主题
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowImportModal(true)}
                variant="outline"
                className="gap-2"
              >
                <SafeIcon name="Download" className="h-4 w-4" />
                导入文章
              </Button>
              <Button
                onClick={() => setShowCreateNoteModal(true)}
                className="bg-mystical-gradient hover:opacity-90 gap-2"
              >
                <SafeIcon name="Plus" className="h-4 w-4" />
                新建笔记
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <SafeIcon
              name="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="搜索笔记、文章或主题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
              <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="notes"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                >
                  <SafeIcon name="FileText" className="h-4 w-4 mr-2" />
                  我的笔记 ({filteredNotes.length})
                </TabsTrigger>
                <TabsTrigger
                  value="research"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                >
                  <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
                  研究主题 ({researchTopics.length})
                </TabsTrigger>
                <TabsTrigger
                  value="ai-chat"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                >
                  <SafeIcon name="MessageSquare" className="h-4 w-4 mr-2" />
                  AI研究助手
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Notes Tab */}
            <TabsContent value="notes" className="p-6 space-y-6">
              {filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <SafeIcon name="FileText" className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">暂无笔记</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? '没有找到匹配的笔记' : '开始创建您的第一条笔记吧'}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => setShowCreateNoteModal(true)}
                      className="bg-mystical-gradient hover:opacity-90"
                    >
                      <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                      创建新笔记
                    </Button>
                  )}
                </div>
              ) : (
                <NotesList
                  notes={filteredNotes}
                  selectedNoteId={selectedNote}
                  onSelectNote={setSelectedNote}
                />
              )}
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research" className="p-6 space-y-6">
              <div className="grid gap-4">
                {researchTopics.map((topic) => (
                  <Card
                    key={topic.topicId}
                    className="glass-card hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{topic.title}</CardTitle>
                          <CardDescription className="mt-2">
                            最后更新: {topic.lastUpdated}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            topic.currentStage === 'Completed'
                              ? 'default'
                              : topic.currentStage === 'Researching'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {topic.currentStage === 'Draft'
                            ? '草稿'
                            : topic.currentStage === 'Researching'
                              ? '研究中'
                              : '已完成'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <SafeIcon name="Clock" className="h-4 w-4" />
                        <span>创建于 {topic.lastUpdated}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Chat Tab */}
            <TabsContent value="ai-chat" className="p-6 h-full">
              <AIResearchChat notes={filteredNotes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <ImportArticleModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onImport={handleImportArticle}
      />
      <CreateNoteModal
        open={showCreateNoteModal}
        onOpenChange={setShowCreateNoteModal}
        onCreate={handleCreateNote}
      />
    </div>
  );
}
