'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_USER_RECORDS, MOCK_MASTER_RECORDS } from '@/data/knowledge';
import EmptyState from '@/components/common/EmptyState';

interface KnowledgeBaseContentProps {
  selectedView: string;
}

interface ResearchNote {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  sourceUrl?: string;
}

interface ArticleDetail {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  sourceUrl?: string;
}

const MOCK_RESEARCH_NOTES: ResearchNote[] = [
  {
    id: 'rn001',
    title: '五行平衡与命运稳定性研究',
    date: '2025-11-10',
    content: '通过分析100个案例，发现五行平衡度与人生稳定性呈正相关。特别是在事业转折期，五行失衡的命主更容易遭遇挫折...',
    tags: ['五行', '平衡', '稳定性'],
  },
  {
    id: 'rn002',
    title: '大运流年交界期的风险预警',
    date: '2025-11-05',
    content: '大运与流年交界的三个月内，命主容易出现决策失误。建议在此期间避免重大决策，保持观望态度...',
    tags: ['大运', '流年', '风险'],
  },
  {
    id: 'rn003',
    title: '环境因子对命理的影响分析',
    date: '2025-10-28',
    content: '出生地的气候、纬度、湿度等环境因子会影响五行的强弱。北方干燥地区出生的人，火木相对较强...',
    tags: ['环境', '气候', '五行'],
  },
];

export default function KnowledgeBaseContent({ selectedView }: KnowledgeBaseContentProps) {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importDialogTab, setImportDialogTab] = useState('url');
  const [researchNotes, setResearchNotes] = useState<ResearchNote[]>(MOCK_RESEARCH_NOTES);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Article detail modal state
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetail | null>(null);

  // Import dialog state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteUrl, setNoteUrl] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [pasteContent, setPasteContent] = useState('');

const handleImportUrl = () => {
    if (noteTitle.trim() && noteUrl.trim()) {
      const newNote: ResearchNote = {
        id: `rn${Date.now()}`,
        title: noteTitle,
        date: new Date().toISOString().split('T')[0],
        content: `导入自 ${noteUrl}`,
        tags: ['导入'],
        sourceUrl: noteUrl,
      };
      setResearchNotes([newNote, ...researchNotes]);
      resetImportDialog();
      setCurrentPage(1);
    }
  };

  const handleImportMarkdown = () => {
    if (noteTitle.trim() && markdownContent.trim()) {
      const newNote: ResearchNote = {
        id: `rn${Date.now()}`,
        title: noteTitle,
        date: new Date().toISOString().split('T')[0],
        content: markdownContent.substring(0, 200),
        tags: ['Markdown'],
      };
      setResearchNotes([newNote, ...researchNotes]);
      resetImportDialog();
      setCurrentPage(1);
    }
  };

  const handleImportPaste = () => {
    if (noteTitle.trim() && pasteContent.trim()) {
      const newNote: ResearchNote = {
        id: `rn${Date.now()}`,
        title: noteTitle,
        date: new Date().toISOString().split('T')[0],
        content: pasteContent.substring(0, 200),
        tags: ['粘贴导入'],
      };
      setResearchNotes([newNote, ...researchNotes]);
      resetImportDialog();
      setCurrentPage(1);
    }
  };

  const resetImportDialog = () => {
    setShowImportDialog(false);
    setImportDialogTab('url');
    setNoteTitle('');
    setNoteUrl('');
    setMarkdownContent('');
    setPasteContent('');
  };

const handleDeleteNote = (id: string) => {
     setResearchNotes(researchNotes.filter(note => note.id !== id));
   };

   const handleViewArticle = (article: ResearchNote) => {
     setSelectedArticle({
       id: article.id,
       title: article.title,
       date: article.date,
       content: article.content,
       tags: article.tags,
       sourceUrl: article.sourceUrl,
     });
   };

   const handleCloseArticleDetail = () => {
     setSelectedArticle(null);
   };

 const renderBaziContent = () => {
  const filteredNotes = researchNotes;
  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">八字命理</h3>
        <Button 
          className="bg-mystical-gradient hover:opacity-90"
          onClick={() => setShowImportDialog(true)}
        >
          <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
          新增笔记
        </Button>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="articles">文章</TabsTrigger>
          <TabsTrigger value="videos">视频</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {paginatedNotes.length > 0 ? (
            <>
              <div className="grid gap-4">
                {paginatedNotes.map((note) => (
                  <Card key={note.id} className="glass-card hover:shadow-card transition-shadow cursor-pointer relative group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <CardDescription className="mt-2">
                            <div className="flex items-center space-x-2">
                              <SafeIcon name="Calendar" className="h-4 w-4" />
                              <span>{note.date}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <SafeIcon name="Trash2" className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
<Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewArticle(note)}
                        >
                           查看
                           <SafeIcon name="ArrowRight" className="h-3 w-3 ml-2" />
                         </Button>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>

               {totalPages > 1 && (
                 <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    第 {currentPage} / {totalPages} 页 (共 {filteredNotes.length} 项)
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
                      上一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      下一页
                      <SafeIcon name="ChevronRight" className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
<EmptyState
              variant="no-records"
              title="暂无笔记"
              description={'点击"新增笔记"开始添加您的命理知识。'}
            />
          )}
        </TabsContent>

<TabsContent value="videos" className="space-y-4">
          <EmptyState
            variant="no-records"
            title="暂无视频"
            description="您还没有导入任何视频链接，请添加视频资料。"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const renderZiweiContent = () => {
  const filteredNotes = researchNotes.filter(note => note.tags.some(tag => tag.includes('紫微') || tag.includes('导入')));
  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">紫微斗数</h3>
        <Button 
          className="bg-mystical-gradient hover:opacity-90"
          onClick={() => setShowImportDialog(true)}
        >
          <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
          新增笔记
        </Button>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="articles">文章</TabsTrigger>
          <TabsTrigger value="videos">视频</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {paginatedNotes.length > 0 ? (
            <>
              <div className="grid gap-4">
                {paginatedNotes.map((note) => (
                  <Card key={note.id} className="glass-card hover:shadow-card transition-shadow cursor-pointer relative group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <CardDescription className="mt-2">
                            <div className="flex items-center space-x-2">
                              <SafeIcon name="Calendar" className="h-4 w-4" />
                              <span>{note.date}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <SafeIcon name="Trash2" className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
<Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewArticle(note)}
                        >
                           查看
                           <SafeIcon name="ArrowRight" className="h-3 w-3 ml-2" />
                         </Button>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>

               {totalPages > 1 && (
                 <div className="flex items-center justify-between mt-6 pt-4 border-t">
                   <div className="text-sm text-muted-foreground">
                     第 {currentPage} / {totalPages} 页 (共 {filteredNotes.length} 项)
                   </div>
                   <div className="flex gap-2">
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                       disabled={currentPage === 1}
                     >
                       <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
                       上一页
                     </Button>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                       disabled={currentPage === totalPages}
                     >
                       下一页
                       <SafeIcon name="ChevronRight" className="h-4 w-4 ml-1" />
                     </Button>
                   </div>
                 </div>
               )}
             </>
           ) : (
             <EmptyState
              variant="no-records"
              title="暂无紫微文章"
              description={'点击"新增笔记"开始添加您的紫微相关知识。'}
            />
          )}
        </TabsContent>

        <TabsContent value="videos">
          <EmptyState
            variant="no-records"
            title="暂无视频"
            description="您还没有导入任何视频链接，请点击新增笔记添加。"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const renderResearchContent = () => {
  const filteredNotes = researchNotes;
  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">研究笔记</h3>
        <Button
          className="bg-mystical-gradient hover:opacity-90"
          onClick={() => setShowImportDialog(true)}
        >
          <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
          新增笔记
        </Button>
      </div>

      {paginatedNotes.length > 0 ? (
        <>
          <div className="grid gap-4">
            {paginatedNotes.map((note) => (
              <Card key={note.id} className="glass-card hover:shadow-card transition-shadow cursor-pointer relative group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <div className="flex items-center space-x-2">
                          <SafeIcon name="Calendar" className="h-4 w-4" />
                          <span>{note.date}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <SafeIcon name="Trash2" className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      编辑
                      <SafeIcon name="Edit" className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                第 {currentPage} / {totalPages} 页 (共 {filteredNotes.length} 项)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
                  上一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  下一页
                  <SafeIcon name="ChevronRight" className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
) : (
 <EmptyState
            variant="no-records"
            title="暂无笔记"
            description={'点击"新增笔记"开始添加您的命理研究笔记。'}
          />
      )}
    </div>
  );
};

const renderCustomContent = () => (
     <div className="space-y-4">
       <div className="flex items-center justify-between mb-6">
         <h3 className="text-xl font-semibold">自定义分类</h3>
         <Button
           className="bg-mystical-gradient hover:opacity-90"
           onClick={() => setShowImportDialog(true)}
         >
           <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
           新增笔记
         </Button>
       </div>

       <EmptyState
         variant="no-records"
         title="此分类暂无内容"
         description="开始添加您的笔记和记录吧。"
       />
     </div>
   );

   return (
     <div className="flex-1 p-6 md:p-8">
       <div className="max-w-4xl mx-auto">
         {selectedView === 'bazi' && renderBaziContent()}
         {selectedView === 'ziwei' && renderZiweiContent()}
         {selectedView === 'research' && renderResearchContent()}
         {selectedView.startsWith('custom_') && renderCustomContent()}
       </div>

{/* Import Dialog */}
        <Dialog open={showImportDialog} onOpenChange={(open) => {
          if (!open) resetImportDialog();
        }}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle className="flex items-center gap-2">
               <SafeIcon name="Plus" className="h-5 w-5" />
               导入内容到知识库
             </DialogTitle>
             <DialogDescription>
               导入文章链接、粘贴Markdown内容或纯文本
             </DialogDescription>
           </DialogHeader>

           <Tabs value={importDialogTab} onValueChange={setImportDialogTab} className="w-full">
             <TabsList className="grid w-full grid-cols-3">
               <TabsTrigger value="url">导入链接</TabsTrigger>
               <TabsTrigger value="markdown">Markdown</TabsTrigger>
               <TabsTrigger value="paste">粘贴文本</TabsTrigger>
             </TabsList>

             {/* Import URL Tab */}
             <TabsContent value="url" className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="url-title">笔记标题</Label>
                 <Input
                   id="url-title"
                   placeholder="输入笔记标题"
                   value={noteTitle}
                   onChange={(e) => setNoteTitle(e.target.value)}
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="note-url">文章/视频链接</Label>
                 <Input
                   id="note-url"
                   placeholder="https://example.com/article"
                   value={noteUrl}
                   onChange={(e) => setNoteUrl(e.target.value)}
                 />
               </div>
               <p className="text-sm text-muted-foreground">
                 支持导入文章链接、视频链接等外部资源。系统将自动提取内容。
               </p>
             </TabsContent>

             {/* Import Markdown Tab */}
             <TabsContent value="markdown" className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="md-title">笔记标题</Label>
                 <Input
                   id="md-title"
                   placeholder="输入笔记标题"
                   value={noteTitle}
                   onChange={(e) => setNoteTitle(e.target.value)}
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="md-content">Markdown内容</Label>
                 <Textarea
                   id="md-content"
                   placeholder="可复制粘贴Markdown格式内容、AI笔记、网页文章等任何文本内容。支持代码块、表格等格式。"
                   value={markdownContent}
                   onChange={(e) => setMarkdownContent(e.target.value)}
                   className="min-h-[200px] font-mono text-sm"
                 />
               </div>
               <div className="bg-muted/50 p-3 rounded-md border border-muted-foreground/20">
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   <strong>💡 使用提示：</strong>
                   <br />
                   1. 从浏览器复制网页内容，粘贴到此框
                   <br />
                   2. 复制AI生成的markdown笔记并粘贴
                   <br />
                   3. 支持任何纯文本格式（Markdown、纯文本均可）
                   <br />
                   4. 内容将自动保存到您的知识库
                 </p>
               </div>
             </TabsContent>

             {/* Paste Content Tab */}
             <TabsContent value="paste" className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="paste-title">笔记标题</Label>
                 <Input
                   id="paste-title"
                   placeholder="输入笔记标题"
                   value={noteTitle}
                   onChange={(e) => setNoteTitle(e.target.value)}
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="paste-content">粘贴内容</Label>
                 <Textarea
                   id="paste-content"
                   placeholder="在此粘贴任何文本内容..."
                   value={pasteContent}
                   onChange={(e) => setPasteContent(e.target.value)}
                   className="min-h-[200px]"
                 />
               </div>
               <p className="text-sm text-muted-foreground">
                 支持粘贴任何纯文本、论坛帖子、博客内容等。
               </p>
             </TabsContent>
           </Tabs>

           <DialogFooter>
             <Button variant="outline" onClick={resetImportDialog}>
               取消
             </Button>
             <Button
               className="bg-mystical-gradient hover:opacity-90"
               onClick={() => {
                 if (importDialogTab === 'url') {
                   handleImportUrl();
                 } else if (importDialogTab === 'markdown') {
                   handleImportMarkdown();
                 } else {
                   handleImportPaste();
                 }
               }}
             >
               <SafeIcon name="Check" className="h-4 w-4 mr-2" />
               导入内容
             </Button>
</DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Article Detail Modal */}
        <Dialog open={!!selectedArticle} onOpenChange={(open) => {
          if (!open) handleCloseArticleDetail();
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <SafeIcon name="Calendar" className="h-4 w-4" />
                        <span>{selectedArticle.date}</span>
                      </div>
                      {selectedArticle.sourceUrl && (
                        <a 
                          href={selectedArticle.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-primary hover:underline"
                        >
                          <SafeIcon name="ExternalLink" className="h-4 w-4" />
                          <span>查看原文</span>
                        </a>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{selectedArticle.content}</p>
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={handleCloseArticleDetail}
                  >
                    关闭
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }