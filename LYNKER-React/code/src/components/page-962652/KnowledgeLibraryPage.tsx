
import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_KB_NOTES, MOCK_RESEARCH_TOPIC, KBNoteModel, ResearchTopicModel } from '@/data/knowledge';

interface NoteCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ExtendedNote extends KBNoteModel {
  category?: string;
}

export default function KnowledgeLibraryPage() {
  const [notes, setNotes] = useState<ExtendedNote[]>(MOCK_KB_NOTES.map(note => ({
    ...note,
    category: 'general'
  })));
  const [researchTopics, setResearchTopics] = useState<ResearchTopicModel[]>(MOCK_RESEARCH_TOPIC);
  const [selectedNote, setSelectedNote] = useState<ExtendedNote | null>(notes[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const noteCategories: NoteCategory[] = [
    { id: 'general', name: '通用笔记', icon: 'FileText', color: '#8B5CF6' },
    { id: 'bazi', name: '八字研究', icon: 'BarChart3', color: '#D97706' },
    { id: 'ziwei', name: '紫微研究', icon: 'Star', color: '#5B21B6' },
    { id: 'astrology', name: '占星研究', icon: 'Compass', color: '#3B82F6' },
    { id: 'forum', name: '论坛分享', icon: 'MessageSquare', color: '#EC4899' },
  ];

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.contentMarkdown.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      const newNote: ExtendedNote = {
        noteId: `note_${Date.now()}`,
        title: newNoteTitle,
        contentMarkdown: newNoteContent,
        dateCreated: new Date().toISOString().split('T')[0],
        category: 'general',
      };
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsCreatingNote(false);
    }
  };

  const handleImportArticle = async () => {
    if (importUrl.trim()) {
      setIsImporting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newNote: ExtendedNote = {
        noteId: `note_${Date.now()}`,
        title: `导入文章 - ${new Date().toLocaleDateString()}`,
        contentMarkdown: `# 导入自外部链接\n\n来源: ${importUrl}\n\n(内容将通过AI自动提取和总结)\n\n## 主要内容\n\n此处将显示从URL导入的文章内容摘要...`,
        dateCreated: new Date().toISOString().split('T')[0],
        sourceUrl: importUrl,
        category: 'forum',
      };
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setImportUrl('');
      setIsImporting(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(n => n.noteId !== noteId);
    setNotes(updatedNotes);
    if (selectedNote?.noteId === noteId) {
      setSelectedNote(updatedNotes[0] || null);
    }
  };

  const handleUpdateNote = (updatedContent: string) => {
    if (selectedNote) {
      const updatedNotes = notes.map(n =>
        n.noteId === selectedNote.noteId
          ? { ...n, contentMarkdown: updatedContent }
          : n
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, contentMarkdown: updatedContent });
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <Sidebar className="border-r">
        <SidebarHeader className="border-b p-4">
          <h2 className="text-lg font-bold text-gradient-mystical">知识库</h2>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              {/* Create Note Button */}
              <Dialog open={isCreatingNote} onOpenChange={setIsCreatingNote}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-mystical-gradient hover:opacity-90">
                    <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
                    创建新笔记
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>创建新笔记</DialogTitle>
                    <DialogDescription>
                      开始记录您的命理研究和发现
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">笔记标题</label>
                      <Input
                        placeholder="输入笔记标题..."
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">内容</label>
                      <Textarea
                        placeholder="输入笔记内容（支持Markdown格式）..."
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        className="mt-1 min-h-32"
                      />
                    </div>
                    <Button
                      onClick={handleCreateNote}
                      className="w-full bg-mystical-gradient hover:opacity-90"
                    >
                      创建笔记
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Import Article */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SafeIcon name="Download" className="mr-2 h-4 w-4" />
                    导入文章
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>导入外部文章</DialogTitle>
                    <DialogDescription>
                      粘贴文章URL链接，AI将自动提取和总结内容
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">文章链接</label>
                      <Input
                        placeholder="https://example.com/article"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={handleImportArticle}
                      disabled={isImporting || !importUrl.trim()}
                      className="w-full bg-mystical-gradient hover:opacity-90"
                    >
                      {isImporting ? (
                        <>
                          <SafeIcon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
                          导入中...
                        </>
                      ) : (
                        <>
                          <SafeIcon name="Download" className="mr-2 h-4 w-4" />
                          导入文章
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Separator />

              {/* Note Categories */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">分类</h3>
                <div className="space-y-2">
                  {noteCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                    >
                      <SafeIcon name={category.icon} className="mr-2 h-4 w-4" />
                      {category.name}
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {notes.filter(n => n.category === category.id).length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Research Topics */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">研究主题</h3>
                <div className="space-y-2">
                  {researchTopics.map((topic) => (
                    <div
                      key={topic.topicId}
                      className="p-2 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-medium line-clamp-2">{topic.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          {topic.currentStage === 'Draft' ? '草稿' : topic.currentStage === 'Researching' ? '研究中' : '已完成'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{topic.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search */}
              <Separator />
              <div>
                <label className="text-sm font-medium">搜索笔记</label>
                <Input
                  placeholder="搜索笔记内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="container max-w-4xl mx-auto p-6">
            {selectedNote ? (
              <div className="space-y-6">
                {/* Note Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{selectedNote.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>创建于 {selectedNote.dateCreated}</span>
                      {selectedNote.sourceUrl && (
                        <a
                          href={selectedNote.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <SafeIcon name="ExternalLink" className="h-3 w-3" />
                          查看原文
                        </a>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteNote(selectedNote.noteId)}
                    className="text-destructive hover:text-destructive"
                  >
                    <SafeIcon name="Trash2" className="h-5 w-5" />
                  </Button>
                </div>

                <Separator />

                {/* Note Content Editor */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">笔记内容</label>
                    <Textarea
                      value={selectedNote.contentMarkdown}
                      onChange={(e) => handleUpdateNote(e.target.value)}
                      className="mt-2 min-h-96 font-mono text-sm"
                      placeholder="支持Markdown格式..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-mystical-gradient hover:opacity-90">
                      <SafeIcon name="Save" className="mr-2 h-4 w-4" />
                      保存笔记
                    </Button>
                    <Button variant="outline">
                      <SafeIcon name="Share2" className="mr-2 h-4 w-4" />
                      分享到论坛
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* AI Research Chat */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                      AI研究助手
                    </CardTitle>
                    <CardDescription>
                      与AI讨论此笔记的内容，获得更深入的命理分析
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4 min-h-64 max-h-96 overflow-y-auto">
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                              <SafeIcon name="Sparkles" className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">AI助手</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                我已阅读您的笔记。我可以帮助您分析其中的命理观点，提供补充解释，或讨论相关的应用案例。请告诉我您想深入探讨的方面。
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="输入您的问题或想法..."
                          className="flex-1"
                        />
                        <Button size="icon" className="bg-mystical-gradient hover:opacity-90">
                          <SafeIcon name="Send" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96">
                <SafeIcon name="BookOpen" className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">暂无笔记</h2>
                <p className="text-muted-foreground mb-4">创建或导入您的第一条笔记开始探索</p>
                <Button className="bg-mystical-gradient hover:opacity-90">
                  <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
                  创建笔记
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Notes List Sidebar (Right) */}
        <div className="border-l w-80 bg-background/50 flex flex-col">
          <div className="border-b p-4">
            <h3 className="font-semibold">笔记列表</h3>
            <p className="text-xs text-muted-foreground mt-1">
              共 {filteredNotes.length} 条笔记
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <Card
                    key={note.noteId}
                    className={`cursor-pointer transition-all ${
                      selectedNote?.noteId === note.noteId
                        ? 'ring-2 ring-primary bg-primary/10'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm line-clamp-2">{note.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{note.dateCreated}</p>
                      {note.sourceUrl && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          <SafeIcon name="Link" className="h-3 w-3 mr-1" />
                          导入
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">没有找到匹配的笔记</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </div>
  );
}
