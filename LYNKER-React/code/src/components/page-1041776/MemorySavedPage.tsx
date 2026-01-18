
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import MemorySidebar from './MemorySidebar';
import MemoryCard from './MemoryCard';
import MemoryPagination from './MemoryPagination';

interface Memory {
  id: string;
  category: string;
  content: string;
  source: string;
  createdAt: string;
  verificationStatus: 'high' | 'low' | 'controversial' | 'none';
  tags: string[];
}

// Mock data
const mockMemories: Memory[] = [
  {
    id: '1',
    category: '八字',
    content: '日干为火，地支为寅木，火木相生，主聪慧伶俐，适合从事创意工作。',
    source: '论坛讨论',
    createdAt: '2024-01-15',
    verificationStatus: 'high',
    tags: ['火命', '创意', '聪慧'],
  },
  {
    id: '2',
    category: '紫薇',
    content: '紫微星在命宫，天府星在财帛宫，主财运亨通，适合经商。',
    source: '客户批命',
    createdAt: '2024-01-14',
    verificationStatus: 'high',
    tags: ['紫微', '财运', '经商'],
  },
  {
    id: '3',
    category: '占星',
    content: '太阳在狮子座，月亮在天秤座，主性格开朗，人际关系良好。',
    source: 'AI分析',
    createdAt: '2024-01-13',
    verificationStatus: 'none',
    tags: ['占星', '性格', '人际'],
  },
  {
    id: '4',
    category: '风水',
    content: '东方为木，宜放置绿植，增强生气，有利于事业发展。',
    source: '研究笔记',
    createdAt: '2024-01-12',
    verificationStatus: 'low',
    tags: ['风水', '绿植', '事业'],
  },
  {
    id: '5',
    category: '面相',
    content: '眉毛浓密，主意志坚定，容易成功。眼神有神，主聪慧。',
    source: '论坛讨论',
    createdAt: '2024-01-11',
    verificationStatus: 'controversial',
    tags: ['面相', '眉毛', '眼神'],
  },
  {
    id: '6',
    category: '投票分析',
    content: '关于"火命人适合从事创意工作"的投票结果：准 85%，不准 15%。',
    source: '论坛投票',
    createdAt: '2024-01-10',
    verificationStatus: 'high',
    tags: ['投票', '火命', '创意'],
  },
  {
    id: '7',
    category: '高应验',
    content: '预测某客户2024年会有重大工作机遇，已在1月份应验。',
    source: '客户反馈',
    createdAt: '2024-01-09',
    verificationStatus: 'high',
    tags: ['应验', '工作', '机遇'],
  },
  {
    id: '8',
    category: '低应验',
    content: '预测某客户会在上半年出国，但至今未实现。',
    source: '客户反馈',
    createdAt: '2024-01-08',
    verificationStatus: 'low',
    tags: ['未应验', '出国', '预测'],
  },
  {
    id: '9',
    category: '高争议',
    content: '关于"命理能否改变命运"的讨论，支持方和反对方各占50%。',
    source: '论坛讨论',
    createdAt: '2024-01-07',
    verificationStatus: 'controversial',
    tags: ['争议', '命运', '哲学'],
  },
];

const categories = [
  { id: 'all', name: '全部', icon: 'Archive' },
  { id: '八字', name: '八字', icon: 'Grid3x3' },
  { id: '紫薇', name: '紫薇', icon: 'Compass' },
  { id: '占星', name: '占星', icon: 'Star' },
  { id: '风水', name: '风水', icon: 'Mountain' },
  { id: '面相', name: '面相', icon: 'User' },
  { id: '投票分析', name: '投票分析', icon: 'BarChart3' },
  { id: '高应验', name: '高应验', icon: 'CheckCircle' },
  { id: '低应验', name: '低应验', icon: 'XCircle' },
  { id: '高争议', name: '高争议', icon: 'AlertCircle' },
];

const ITEMS_PER_PAGE = 12;

export default function MemorySavedPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [memories, setMemories] = useState<Memory[]>(mockMemories);

  useEffect(() => {
    setIsClient(false);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Filter memories based on category and search
  const filteredMemories = memories.filter((memory) => {
    const categoryMatch = selectedCategory === 'all' || memory.category === selectedCategory;
    const searchMatch =
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMemories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMemories = filteredMemories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
    if (paginatedMemories.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-[calc(100vh-128px)] bg-background">
      {/* Left Sidebar */}
      <MemorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onGoBack={handleGoBack}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
{/* Header */}
         <div className="border-b bg-card/50 backdrop-blur-sm p-4 space-y-3">
           <div className="flex items-center justify-between">
             <div>
               <h1 className="text-2xl font-bold text-gradient-mystical">记忆库</h1>
               <p className="text-xs text-muted-foreground mt-0.5">
                 存储和管理您的命理知识库
               </p>
             </div>
             <div className="text-right">
               <p className="text-xl font-bold text-accent">
                 {filteredMemories.length}
               </p>
               <p className="text-xs text-muted-foreground">条记忆</p>
             </div>
           </div>

           {/* Search */}
           <div className="relative">
             <SafeIcon
               name="Search"
               className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
             />
             <Input
               placeholder="搜索记忆..."
               value={searchQuery}
               onChange={(e) => {
                 setSearchQuery(e.target.value);
                 setCurrentPage(1);
               }}
               className="pl-10 h-8 text-xs"
             />
           </div>
         </div>

{/* Content Area */}
         <ScrollArea className="flex-1">
           <div className="p-4">
             {paginatedMemories.length > 0 ? (
               <div className="grid grid-cols-2 gap-3">
                 {paginatedMemories.map((memory) => (
                   <MemoryCard
                     key={memory.id}
                     memory={memory}
                     onDelete={() => handleDeleteMemory(memory.id)}
                   />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                 <SafeIcon
                   name="Archive"
                   className="h-12 w-12 text-muted-foreground/50 mb-4"
                 />
                 <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                   暂无记忆
                 </h3>
                 <p className="text-sm text-muted-foreground max-w-md">
                   {searchQuery
                     ? '没有找到匹配的记忆，请尝试其他搜索条件。'
                     : '该分类下还没有保存任何记忆，开始从聊天、文章或论坛中提取知识吧。'}
                 </p>
               </div>
             )}
           </div>
         </ScrollArea>

{/* Pagination */}
         {totalPages > 1 && (
           <div className="border-t bg-card/50 backdrop-blur-sm p-3">
             <MemoryPagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={setCurrentPage}
             />
           </div>
         )}
      </div>
    </div>
  );
}
