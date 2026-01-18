
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_KB_NOTES, MOCK_RESEARCH_TOPIC, MOCK_KB_CATEGORIES, type KBNoteModel } from '@/data/knowledge';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';
import CreateNoteModal from './CreateNoteModal';
import ImportArticleModal from './ImportArticleModal';
import AIDialogBox from './AIDialogBox';
import KnowledgeNoteCard from './KnowledgeNoteCard';

export default function KnowledgeBaseContent() {
  const [selectedAI, setSelectedAI] = useState(MOCK_AI_ASSISTANTS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [showImportArticle, setShowImportArticle] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [editingNote, setEditingNote] = useState<KBNoteModel | null>(null);
  const [notes, setNotes] = useState(MOCK_KB_NOTES);
  const [researchTopics, setResearchTopics] = useState(MOCK_RESEARCH_TOPIC);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.contentMarkdown.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = (title: string, content: string) => {
    const newNote = {
      noteId: `note_${Date.now()}`,
      title,
      contentMarkdown: content,
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setNotes([newNote, ...notes]);
    setShowCreateNote(false);
  };

  const handleImportArticle = (url: string, title: string) => {
    const newNote = {
      noteId: `note_${Date.now()}`,
      title: `导入: ${title}`,
      contentMarkdown: `[导入自外部链接]\n\n${url}`,
      dateCreated: new Date().toISOString().split('T')[0],
      sourceUrl: url,
    };
    setNotes([newNote, ...notes]);
    setShowImportArticle(false);
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

  const handleEditNote = (note: KBNoteModel) => {
    setEditingNote(note);
    setShowEditNote(true);
  };

  const handleSaveEditNote = (title: string, content: string) => {
    if (editingNote) {
      const updatedNotes = notes.map(note =>
        note.noteId === editingNote.noteId
          ? { ...note, title, contentMarkdown: content, dateCreated: new Date().toISOString().split('T')[0] }
          : note
      );
      setNotes(updatedNotes);
      setShowEditNote(false);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.noteId !== noteId));
  };

  const selectedAIModel = MOCK_AI_ASSISTANTS.find(ai => ai.id === selectedAI);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient-mystical">我的知识库</h1>
          <p className="text-muted-foreground">
            类似RAG的个人知识管理系统，AI助手可读取并共同研究命理
          </p>
</div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="notes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes">笔记库</TabsTrigger>
            <TabsTrigger value="research">研究主题</TabsTrigger>
            <TabsTrigger value="chat">AI对话</TabsTrigger>
          </TabsList>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="搜索笔记..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => setShowCreateNote(true)}
                className="bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                新建笔记
              </Button>
              <Button
                onClick={() => setShowImportArticle(true)}
                variant="outline"
              >
                <SafeIcon name="Download" className="h-4 w-4 mr-2" />
                导入文章
              </Button>
            </div>

{filteredNotes.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {filteredNotes.map((note) => (
                   <KnowledgeNoteCard key={note.noteId} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
                 ))}
               </div>
            ) : (
              <Card className="glass-card border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <SafeIcon name="FileText" className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">暂无笔记</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchQuery ? '没有找到匹配的笔记' : '开始创建您的第一条笔记吧'}
                  </p>
                  <Button
                    onClick={() => setShowCreateNote(true)}
                    className="bg-mystical-gradient"
                  >
                    <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                    创建笔记
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Research Topics Tab */}
          <TabsContent value="research" className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  const title = prompt('输入研究主题名称:');
                  if (title) handleCreateResearchTopic(title);
                }}
                className="bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                新建研究主题
              </Button>
            </div>

            {researchTopics.length > 0 ? (
              <div className="space-y-3">
                {researchTopics.map((topic) => (
                  <Card key={topic.topicId} className="glass-card hover:shadow-card transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{topic.title}</CardTitle>
                          <CardDescription className="mt-1">
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
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <SafeIcon name="BookOpen" className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">暂无研究主题</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    创建研究主题来组织您的命理研究
                  </p>
                  <Button
                    onClick={() => {
                      const title = prompt('输入研究主题名称:');
                      if (title) handleCreateResearchTopic(title);
                    }}
                    className="bg-mystical-gradient"
                  >
                    <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                    创建主题
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            {selectedAIModel && (
              <AIDialogBox aiModel={selectedAIModel} notes={notes} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showCreateNote && (
        <CreateNoteModal
          onClose={() => setShowCreateNote(false)}
          onCreate={handleCreateNote}
        />
      )}
{showImportArticle && (
         <ImportArticleModal
           onClose={() => setShowImportArticle(false)}
           onImport={handleImportArticle}
         />
       )}
       {showEditNote && editingNote && (
         <CreateNoteModal
           onClose={() => {
             setShowEditNote(false);
             setEditingNote(null);
           }}
           onCreate={handleSaveEditNote}
           mode="edit"
           initialTitle={editingNote.title}
           initialContent={editingNote.contentMarkdown}
         />
       )}
     </div>
  );
}
