
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import KnowledgeLibrarySidebar from './KnowledgeLibrarySidebar';
import SourceDocumentPanel from './SourceDocumentPanel';
import AIChatPanel from './AIChatPanel';
import TaggingSystem from './TaggingSystem';

interface Document {
  id: string;
  title: string;
  type: 'markdown' | 'video' | 'article';
  category: string;
  content: string;
  createdAt: string;
  tags: string[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: '八字基础理论笔记',
    type: 'markdown',
    category: '八字',
    content: '# 八字基础理论\n\n## 天干地支\n天干：甲乙丙丁戊己庚辛壬癸\n地支：子丑寅卯辰巳午未申酉戌亥\n\n## 五行属性\n- 甲乙木\n- 丙丁火\n- 戊己土\n- 庚辛金\n- 壬癸水',
    createdAt: '2024-01-15',
    tags: ['基础', '天干地支'],
  },
  {
    id: '2',
    title: '紫微斗数宫位详解',
    type: 'article',
    category: '紫薇',
    content: '紫微斗数十二宫位详细解读...',
    createdAt: '2024-01-14',
    tags: ['紫薇', '宫位'],
  },
  {
    id: '3',
    title: '命理案例分析视频',
    type: 'video',
    category: '八字',
    content: 'https://example.com/video/case-study-1',
    createdAt: '2024-01-13',
    tags: ['案例', '分析'],
  },
];

const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: '请帮我分析这份八字笔记中的五行属性部分',
    timestamp: '2024-01-15 10:30',
  },
  {
    id: '2',
    role: 'assistant',
    content: '根据您的笔记，五行属性分为五类：\n\n1. **木属性**（甲乙）- 代表生长、发展\n2. **火属性**（丙丁）- 代表热情、光明\n3. **土属性**（戊己）- 代表稳定、承载\n4. **金属性**（庚辛）- 代表收敛、肃杀\n5. **水属性**（壬癸）- 代表流动、智慧\n\n这是八字分析的基础框架。',
    timestamp: '2024-01-15 10:31',
  },
];

export default function KnowledgeLibraryContent() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('八字');
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(mockDocuments[0]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(mockChatHistory);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportDialog, setShowImportDialog] = useState(false);

  useEffect(() => {
    setIsClient(false);
    
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const handleAddDocument = () => {
    setShowImportDialog(true);
  };

  const handleSendToMemory = () => {
    // 实现发送到记忆库的逻辑
    alert('内容已发送到记忆库');
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = './master-backend-overview.html'}
              className="hover:bg-accent"
            >
              <SafeIcon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gradient-mystical">知识库</h1>
            <Badge variant="secondary" className="ml-2">
              <SafeIcon name="BookOpen" className="h-3 w-3 mr-1" />
              {documents.length} 个资源
            </Badge>
          </div>
          <Button
            onClick={handleAddDocument}
            className="bg-mystical-gradient hover:opacity-90"
          >
            <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
            导入资源
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索笔记..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-muted-foreground/20"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-4 p-4">
        {/* Left Panel - Sidebar + Documents */}
        <div className="w-80 flex flex-col gap-4 overflow-hidden">
          {/* Sidebar Navigation */}
          <KnowledgeLibrarySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            isClient={isClient}
          />

          {/* Documents List */}
          <Card className="flex-1 overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm border-muted-foreground/20">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-sm">{selectedCategory}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredDocuments.length} 个资源
              </p>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-4">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocument(doc)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedDocument?.id === doc.id
                          ? 'bg-primary/20 border border-primary/50'
                          : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <SafeIcon
                          name={
                            doc.type === 'video'
                              ? 'Video'
                              : doc.type === 'article'
                              ? 'FileText'
                              : 'FileJson'
                          }
                          className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {doc.createdAt}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <SafeIcon name="FileQuestion" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无资源</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Right Panel - Source + Chat */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Source Document Panel */}
          {selectedDocument && (
            <SourceDocumentPanel
              document={selectedDocument}
              isClient={isClient}
            />
          )}

          {/* Divider */}
          <Separator className="my-0" />

          {/* AI Chat Panel */}
          <AIChatPanel
            chatHistory={chatHistory}
            onSendMessage={(message) => {
              const newMessage: ChatMessage = {
                id: String(chatHistory.length + 1),
                role: 'user',
                content: message,
                timestamp: new Date().toLocaleString('zh-CN'),
              };
              setChatHistory([...chatHistory, newMessage]);
            }}
            isClient={isClient}
          />

          {/* Tagging & Actions */}
          <Card className="bg-card/50 backdrop-blur-sm border-muted-foreground/20 p-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">标签系统</label>
                <TaggingSystem
                  selectedTags={selectedTags}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                  isClient={isClient}
                />
              </div>
              <Button
                onClick={handleSendToMemory}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={!selectedDocument}
              >
                <SafeIcon name="Send" className="h-4 w-4 mr-2" />
                送入知识库
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
