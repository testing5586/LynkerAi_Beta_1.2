
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_RESEARCH_TOPIC, MOCK_KB_NOTES } from '@/data/knowledge';
import KnowledgeLibrarySidebar from './KnowledgeLibrarySidebar';
import ResearchTopicCard from './ResearchTopicCard';
import ImportDialog from './ImportDialog';
import ResearchTopicDetail from './ResearchTopicDetail';
import AIAssistantPanel from './AIAssistantPanel';

export default function KnowledgeLibraryMain() {
  const [isClient, setIsClient] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('topics');
  const [topics, setTopics] = useState(MOCK_RESEARCH_TOPIC);
  const [notes, setNotes] = useState(MOCK_KB_NOTES);
  const [selectedCategory, setSelectedCategory] = useState('bazi');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    // 1→0→1 process
    setIsClient(false);

    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const handleCreateTopic = (title: string) => {
    const newTopic = {
      topicId: `rt${Date.now()}`,
      title,
      currentStage: 'Draft' as const,
      lastUpdated: new Date().toISOString().split('T')[0],
      category: selectedCategory,
    };
    setTopics([...topics, newTopic]);
    setShowImportDialog(false);
    setCurrentPage(1);
  };

  const handleImportNote = (title: string, url: string) => {
    const newNote = {
      noteId: `note_${Date.now()}`,
      title,
      contentMarkdown: `导入自外部链接：${url}`,
      dateCreated: new Date().toISOString().split('T')[0],
      sourceUrl: url,
    };
    setNotes([...notes, newNote]);
    setShowImportDialog(false);
  };

  const handleDeleteTopic = (topicId: string) => {
    setTopics(topics.filter(t => t.topicId !== topicId));
    if (selectedTopic === topicId) {
      setSelectedTopic(null);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.noteId !== noteId));
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSelectedTopic(null);
  };

  const filteredAndCategorizedTopics = topics.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    t.category === selectedCategory
  );

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAndCategorizedTopics.length / ITEMS_PER_PAGE);
  const paginatedTopics = filteredAndCategorizedTopics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Left Sidebar */}
      <KnowledgeLibrarySidebar 
        isClient={isClient || true}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient-mystical">命理知识库</h1>
              <p className="text-muted-foreground mt-1">
                类似Google Notebook LM的RAG知识管理系统
              </p>
            </div>
            <div className="flex items-center gap-2">
<Button
                onClick={() => setShowImportDialog(true)}
                className="bg-mystical-gradient hover:opacity-90"
                disabled={!isClient}
              >
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                导入内容
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <SafeIcon name="Search" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索研究主题或笔记..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={!isClient}
            />
          </div>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
<TabsList className="grid max-w-md grid-cols-2 mb-6 mx-auto">
                <TabsTrigger value="topics" className="flex items-center gap-2">
                  <SafeIcon name="BookOpen" className="h-4 w-4" />
                  研究主题
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <SafeIcon name="FileText" className="h-4 w-4" />
                  笔记库
                </TabsTrigger>
              </TabsList>

{/* Research Topics Tab */}
               <TabsContent value="topics" className="space-y-4">
                 {paginatedTopics.length === 0 ? (
                   <Card className="border-dashed">
                     <CardContent className="flex flex-col items-center justify-center py-12">
                       <SafeIcon name="BookOpen" className="h-12 w-12 text-muted-foreground mb-4" />
                       <p className="text-muted-foreground">暂无{selectedCategory === 'ziwei' ? '紫微' : '八字'}研究主题</p>
                       <Button
                         variant="link"
                         onClick={() => setShowImportDialog(true)}
                         disabled={!isClient}
                       >
                         创建新主题
                       </Button>
                     </CardContent>
                   </Card>
                 ) : (
                   <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                       {paginatedTopics.map((topic) => (
                         <div key={topic.topicId} className="relative group">
                           <ResearchTopicCard
                             topic={topic}
                             isSelected={selectedTopic === topic.topicId}
                             onSelect={() => setSelectedTopic(topic.topicId)}
                             isClient={isClient || true}
                           />
                           <Button
                             variant="ghost"
                             size="sm"
                             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                             onClick={() => handleDeleteTopic(topic.topicId)}
                             disabled={!isClient}
                           >
                             <SafeIcon name="Trash2" className="h-4 w-4 text-destructive" />
                           </Button>
                         </div>
                       ))}
                     </div>
                     
                     {/* Pagination */}
                     {totalPages > 1 && (
                       <div className="flex items-center justify-between mt-6 pt-4 border-t">
                         <div className="text-sm text-muted-foreground">
                           第 {currentPage} / {totalPages} 页 (共 {filteredAndCategorizedTopics.length} 项)
                         </div>
                         <div className="flex gap-2">
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                             disabled={currentPage === 1 || !isClient}
                           >
                             <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
                             上一页
                           </Button>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                             disabled={currentPage === totalPages || !isClient}
                           >
                             下一页
                             <SafeIcon name="ChevronRight" className="h-4 w-4 ml-1" />
                           </Button>
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4">
                {filteredNotes.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <SafeIcon name="FileText" className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">暂无笔记</p>
                      <Button
                        variant="link"
                        onClick={() => setShowImportDialog(true)}
                        disabled={!isClient}
                      >
                        导入笔记
                      </Button>
                    </CardContent>
                  </Card>
) : (
                   <div className="space-y-3">
                     {filteredNotes.map((note) => (
                       <div key={note.noteId} className="relative group">
                         <Card className="hover:shadow-card transition-shadow cursor-pointer">
                           <CardHeader className="pb-3">
                             <div className="flex items-start justify-between">
                               <div className="flex-1">
                                 <CardTitle className="text-base">{note.title}</CardTitle>
                                 <CardDescription className="mt-1">
                                   创建于 {note.dateCreated}
                                 </CardDescription>
                               </div>
                               <div className="flex items-center gap-2">
                                 {note.sourceUrl && (
                                   <Badge variant="secondary">
                                     <SafeIcon name="Link" className="h-3 w-3 mr-1" />
                                     导入
                                   </Badge>
                                 )}
                                 <Button
                                   variant="ghost"
                                   size="sm"
                                   className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                   onClick={() => handleDeleteNote(note.noteId)}
                                   disabled={!isClient}
                                 >
                                   <SafeIcon name="Trash2" className="h-4 w-4 text-destructive" />
                                 </Button>
                               </div>
                             </div>
                           </CardHeader>
                           <CardContent>
                             <p className="text-sm text-muted-foreground line-clamp-2">
                               {note.contentMarkdown}
                             </p>
                           </CardContent>
                         </Card>
                       </div>
                     ))}
                   </div>
                 )}
              </TabsContent>
            </Tabs>

            {/* Selected Topic Detail */}
            {selectedTopic && (
              <div className="mt-8">
                <Separator className="mb-6" />
                <ResearchTopicDetail
                  topic={topics.find(t => t.topicId === selectedTopic)}
                  isClient={isClient || true}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Import Dialog */}
      {(isClient || true) && (
        <ImportDialog
          open={showImportDialog}
          onOpenChange={setShowImportDialog}
          onCreateTopic={handleCreateTopic}
          onImportNote={handleImportNote}
        />
      )}

      {/* AI Assistant Panel */}
      {(isClient || true) && (
        <AIAssistantPanel />
      )}
    </div>
  );
}
