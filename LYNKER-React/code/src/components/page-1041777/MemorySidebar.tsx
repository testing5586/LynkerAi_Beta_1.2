
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const CATEGORIES: Category[] = [
  { id: 'all', name: '全部记忆', icon: 'BookOpen', count: 0 },
  { id: 'bazi', name: '八字', icon: 'Zap', count: 0 },
  { id: 'ziwei', name: '紫薇', icon: 'Star', count: 0 },
  { id: 'astrology', name: '占星', icon: 'Moon', count: 0 },
  { id: 'fengshui', name: '风水', icon: 'Compass', count: 0 },
  { id: 'face', name: '面相', icon: 'Eye', count: 0 },
  { id: 'voting', name: '投票分析', icon: 'ThumbsUp', count: 0 },
  { id: 'high-accuracy', name: '高应验', icon: 'CheckCircle', count: 0 },
  { id: 'low-accuracy', name: '低应验', icon: 'XCircle', count: 0 },
  { id: 'controversial', name: '高争议', icon: 'AlertCircle', count: 0 },
];

interface MemorySidebarProps {}

export default function MemorySidebar({}: MemorySidebarProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    setIsClient(false);
    
    // Simulate loading category counts
    const updatedCategories = CATEGORIES.map(cat => ({
      ...cat,
      count: Math.floor(Math.random() * 50) + 1
    }));
    setCategories(updatedCategories);
    
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });
    
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Dispatch event to update main content
    window.dispatchEvent(new CustomEvent('categoryChange', { detail: { categoryId } }));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="w-full justify-start mb-4"
        >
          <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          返回
        </Button>
        <h2 className="text-lg font-bold text-gradient-mystical">记忆库</h2>
        <p className="text-xs text-muted-foreground mt-1">
          存储您的命理知识片段
        </p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {(isClient || true) && categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'hover:bg-muted text-foreground/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <SafeIcon name={category.icon} className="h-4 w-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <Badge
              variant={selectedCategory === category.id ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {category.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          asChild
        >
          <a href="./page-1031922.html">
            <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-2" />
            返回知识库
          </a>
        </Button>
      </div>
    </aside>
  );
}
