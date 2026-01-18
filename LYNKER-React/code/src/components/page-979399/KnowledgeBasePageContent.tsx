
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserDashboardSidebar from '@/components/page-979399/UserDashboardSidebar';
import AIChat from '@/components/page-979399/AIChat';
import ArticleList from '@/components/page-979399/ArticleList';
import { mockArticles, mockAIProviders } from '@/data/knowledge-base-mock';

export default function KnowledgeBasePageContent() {
  const [articles, setArticles] = useState(mockArticles);
  const [selectedAI, setSelectedAI] = useState('chatgpt');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  const handleImportArticle = () => {
    if (importUrl.trim()) {
      const newArticle = {
        id: Date.now().toString(),
        title: `导入文章 - ${new Date().toLocaleDateString('zh-CN')}`,
        content: `来自: ${importUrl}`,
        source: 'url-import',
        url: importUrl,
        createdAt: new Date().toISOString(),
        tags: ['导入'],
      };
      setArticles([newArticle, ...articles]);
      setImportUrl('');
      setIsImportDialogOpen(false);
    }
  };

  const handleCreateNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote = {
        id: Date.now().toString(),
        title: newNoteTitle,
        content: newNoteContent,
        source: 'manual',
        createdAt: new Date().toISOString(),
        tags: ['笔记'],
      };
      setArticles([newNote, ...articles]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsCreateNoteDialogOpen(false);
    }
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Left Sidebar */}
      <UserDashboardSidebar currentTab="knowledge" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gradient-mystical">知识库</h1>
            <p className="text-muted-foreground">
              管理您的命理研究笔记、导入的文章和AI对话记录
            </p>
          </div>

          {/* AI Provider Selector */}
          <Card className="mb-6 glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Zap" className="w-5 h-5 text-accent" />
                AI助手配置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">选择AI提供商</label>
                  <Select value={selectedAI} onValueChange={setSelectedAI}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAIProviders.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          <div className="flex items-center gap-2">
                            <SafeIcon name={provider.icon} className="w-4 h-4" />
                            {provider.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="mt-6"
                  asChild
                >
                  <a href="./page-979411.html">
                    <SafeIcon name="Settings" className="w-4 h-4 mr-2" />
                    配置API
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <SafeIcon name="BookOpen" className="w-4 h-4" />
                我的文章
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <SafeIcon name="MessageCircle" className="w-4 h-4" />
                AI对话
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              {/* Search and Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="搜索文章..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-mystical-gradient hover:opacity-90">
                      <SafeIcon name="Download" className="w-4 h-4 mr-2" />
                      导入文章
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card">
                    <DialogHeader>
                      <DialogTitle>导入文章</DialogTitle>
                      <DialogDescription>
                        输入文章URL，系统将自动抓取并导入内容
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="https://example.com/article"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        className="bg-muted/50"
                      />
                      <Button
                        onClick={handleImportArticle}
                        className="w-full bg-mystical-gradient hover:opacity-90"
                      >
                        导入
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isCreateNoteDialogOpen} onOpenChange={setIsCreateNoteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                      新建笔记
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>创建新笔记</DialogTitle>
                      <DialogDescription>
                        记录您的命理研究和思考
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">标题</label>
                        <Input
                          placeholder="输入笔记标题"
                          value={newNoteTitle}
                          onChange={(e) => setNewNoteTitle(e.target.value)}
                          className="bg-muted/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">内容</label>
                        <Textarea
                          placeholder="输入笔记内容（支持Markdown）"
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          className="bg-muted/50 min-h-[200px]"
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
              </div>

              {/* Articles List */}
              {filteredArticles.length > 0 ? (
                <ArticleList
                  articles={filteredArticles}
                  onDelete={handleDeleteArticle}
                  selectedAI={selectedAI}
                />
              ) : (
                <Card className="glass-card border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <SafeIcon name="BookOpen" className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">暂无文章</h3>
                    <p className="text-muted-foreground text-center mb-6">
                      导入文章或创建笔记开始您的知识库之旅
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsImportDialogOpen(true)}
                      >
                        导入文章
                      </Button>
                      <Button
                        onClick={() => setIsCreateNoteDialogOpen(true)}
                        className="bg-mystical-gradient hover:opacity-90"
                      >
                        新建笔记
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <AIChat selectedAI={selectedAI} articles={articles} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
