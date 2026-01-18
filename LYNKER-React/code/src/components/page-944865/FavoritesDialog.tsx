import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';

interface FavoriteItem {
  id: string;
  type: 'post' | 'article' | 'user';
  title: string;
  author: string;
  timestamp: string;
  preview: string;
  icon: string;
}

interface FavoritesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockFavorites: FavoriteItem[] = [
  {
    id: '1',
    type: 'post',
    title: '八字中的财运分析',
    author: '灵客用户A',
    timestamp: '2024-01-15',
    preview: '很详细的财运分析方法...',
    icon: 'BookOpen',
  },
  {
    id: '2',
    type: 'article',
    title: '紫薇命盘解读指南',
    author: '命理师B',
    timestamp: '2024-01-12',
    preview: '专业的紫薇命盘解读...',
    icon: 'Sparkles',
  },
  {
    id: '3',
    type: 'user',
    title: '同命好友 - 灵客用户C',
    author: '灵客用户C',
    timestamp: '2024-01-10',
    preview: '同时辰 · 同八字格局...',
    icon: 'Users',
  },
  {
    id: '4',
    type: 'post',
    title: '今年运势预测分享',
    author: '灵客用户D',
    timestamp: '2024-01-08',
    preview: '基于八字的年度运势...',
    icon: 'BookOpen',
  },
  {
    id: '5',
    type: 'article',
    title: '面相学基础知识',
    author: '命理师E',
    timestamp: '2024-01-05',
    preview: '面相识人的基础概念...',
    icon: 'Sparkles',
  },
];

export default function FavoritesDialog({
  open,
  onOpenChange,
}: FavoritesDialogProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'article' | 'user'>('all');

  const filteredFavorites = selectedType === 'all' 
    ? mockFavorites 
    : mockFavorites.filter(item => item.type === selectedType);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return '帖子';
      case 'article':
        return '文章';
      case 'user':
        return '好友';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'post':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'article':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'user':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <SafeIcon name="Heart" className="w-5 h-5 text-accent" />
            <div>
              <DialogTitle>我的收藏</DialogTitle>
              <DialogDescription>
                管理你的收藏内容，包括帖子、文章和好友
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-6">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
            className="text-xs"
          >
            全部 ({mockFavorites.length})
          </Button>
          <Button
            variant={selectedType === 'post' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('post')}
            className="text-xs"
          >
            帖子 ({mockFavorites.filter(f => f.type === 'post').length})
          </Button>
          <Button
            variant={selectedType === 'article' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('article')}
            className="text-xs"
          >
            文章 ({mockFavorites.filter(f => f.type === 'article').length})
          </Button>
          <Button
            variant={selectedType === 'user' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('user')}
            className="text-xs"
          >
            好友 ({mockFavorites.filter(f => f.type === 'user').length})
          </Button>
        </div>

        {/* Favorites List */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-3 pr-4 py-4">
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-border/50"
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(item.type)}`}>
                      <SafeIcon name={item.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate text-foreground">
                          {item.title}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(item.type)}`}>
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.author} · {item.timestamp}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.preview}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 h-8 w-8"
                    >
                      <SafeIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <SafeIcon name="Heart" className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">暂无收藏内容</p>
                <p className="text-xs text-muted-foreground/60">
                  收藏你喜欢的帖子和文章
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-4 border-t border-border/50 px-6 pb-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
          <Button
            className="flex-1 bg-mystical-gradient hover:opacity-90"
          >
            <SafeIcon name="Download" className="w-4 h-4 mr-2" />
            导出收藏
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}