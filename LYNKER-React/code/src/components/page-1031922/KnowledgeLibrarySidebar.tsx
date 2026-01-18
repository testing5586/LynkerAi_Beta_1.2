
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { cn } from '@/lib/utils';

interface KnowledgeLibrarySidebarProps {
  isClient?: boolean;
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const DEFAULT_CATEGORIES = [
  { id: 'bazi', name: '八字', icon: 'BarChart3', color: 'bg-orange-500/20 text-orange-600' },
  { id: 'ziwei', name: '紫微', icon: 'Star', color: 'bg-purple-500/20 text-purple-600' },
];

export default function KnowledgeLibrarySidebar({ 
  isClient = true,
  selectedCategory = 'bazi',
  onCategoryChange 
}: KnowledgeLibrarySidebarProps) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: `cat_${Date.now()}`,
        name: newCategoryName,
        icon: 'Folder',
        color: 'bg-blue-500/20 text-blue-600',
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-foreground mb-4">知识板块</h2>
      </div>

      {/* Categories */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                selectedCategory === category.id && 'bg-primary text-primary-foreground'
              )}
onClick={() => handleCategoryClick(category.id)}
              disabled={!isClient}
            >
              <SafeIcon name={category.icon} className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{category.name}</span>
            </Button>
          ))}

          {/* Add Category */}
          {showAddCategory ? (
            <div className="space-y-2 p-2 bg-muted rounded-md">
              <input
                type="text"
                placeholder="输入板块名称..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-2 py-1 text-sm bg-background border rounded"
                disabled={!isClient}
                autoFocus
              />
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddCategory}
                  disabled={!isClient || !newCategoryName.trim()}
                  className="flex-1"
                >
                  确定
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName('');
                  }}
                  disabled={!isClient}
                  className="flex-1"
                >
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground"
              onClick={() => setShowAddCategory(true)}
              disabled={!isClient}
            >
              <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
              新增板块
            </Button>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start text-sm"
          asChild
        >
<a href="./page-1041776.html">
             <SafeIcon name="Brain" className="h-4 w-4 mr-2" />
             记忆库
           </a>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start text-sm"
          asChild
        >
          <a href="./master-backend-overview.html">
            <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            返回后台
          </a>
        </Button>
      </div>
    </div>
  );
}
