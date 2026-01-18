
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_SAVED_MEMORIES } from '@/data/guru_knowledge';
import type { SavedMemoryModel } from '@/data/guru_knowledge';

interface MemoryContentProps {}

const ITEMS_PER_PAGE = 10;

export default function MemoryContent({}: MemoryContentProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [memories, setMemories] = useState<SavedMemoryModel[]>(MOCK_SAVED_MEMORIES);
  const [filteredMemories, setFilteredMemories] = useState<SavedMemoryModel[]>(MOCK_SAVED_MEMORIES);

  useEffect(() => {
    setIsClient(false);
    
    // Listen for category changes
    const handleCategoryChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedCategory(customEvent.detail.categoryId);
      setCurrentPage(1);
    };
    
    window.addEventListener('categoryChange', handleCategoryChange);
    
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });
    
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange);
      cancelAnimationFrame(timer);
    };
  }, []);

  // Filter memories based on search and category
  useEffect(() => {
    let filtered = memories;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (memory) =>
          memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          memory.sourceContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
          memory.tag?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter (simplified - in real app would map tags to categories)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((memory) => {
        const categoryMap: Record<string, string[]> = {
          'bazi': ['八字', '应验案例'],
          'ziwei': ['紫薇'],
          'astrology': ['占星'],
          'fengshui': ['风水'],
          'face': ['面相'],
          'voting': ['投票分析'],
          'high-accuracy': ['应验案例', '高应验'],
          'low-accuracy': ['低应验'],
          'controversial': ['高风险预警', '高争议'],
        };
        
        const categoryTags = categoryMap[selectedCategory] || [];
        return categoryTags.some(tag => memory.tag?.includes(tag));
      });
    }
    
    setFilteredMemories(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, memories]);

  // Pagination
  const totalPages = Math.ceil(filteredMemories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMemories = filteredMemories.slice(startIndex, endIndex);

  const handleDeleteMemory = (memoryId: string) => {
    setMemories(memories.filter(m => m.memoryId !== memoryId));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background/50">
      {/* Header */}
      <div className="border-b p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-mystical">记忆库</h1>
            <p className="text-sm text-muted-foreground mt-1">
              共 {filteredMemories.length} 条记忆 • 第 {currentPage} / {totalPages || 1} 页
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索记忆内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {(isClient || true) && currentMemories.length > 0 ? (
            currentMemories.map((memory, index) => (
              <MemoryItemCard
                key={memory.memoryId}
                memory={memory}
                index={startIndex + index + 1}
                onDelete={() => handleDeleteMemory(memory.memoryId)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <SafeIcon name="BookOpen" className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">暂无记忆数据</p>
              <p className="text-sm text-muted-foreground/70">
                从聊天、文章或论坛中提取文本来创建记忆
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t p-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            显示 {startIndex + 1}-{Math.min(endIndex, filteredMemories.length)} / {filteredMemories.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
              上一页
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && <span className="text-muted-foreground">...</span>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              下一页
              <SafeIcon name="ChevronRight" className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface MemoryItemCardProps {
  memory: SavedMemoryModel;
  index: number;
  onDelete: () => void;
}

function MemoryItemCard({ memory, index, onDelete }: MemoryItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      className="p-4 hover:shadow-card transition-all cursor-pointer glass-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">{index}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground line-clamp-2 mb-2">{memory.content}</p>
          
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">{memory.sourceContext}</p>
            <p className="text-xs text-muted-foreground/70">{formatDate(memory.timestamp)}</p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {memory.tag && (
              <Badge variant="secondary" className="text-xs">
                {memory.tag}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        {isHovered && (
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <SafeIcon name="Trash2" className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
