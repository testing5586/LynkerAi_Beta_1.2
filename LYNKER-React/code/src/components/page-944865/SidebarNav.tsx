
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

export default function SidebarNav() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: '全部动态', icon: 'Zap', count: 0 },
    { id: 'friends', name: '朋友动态', icon: 'Users', count: 12 },
    { id: 'masters', name: '命理师', icon: 'Crown', count: 5 },
    { id: 'groups', name: '群组更新', icon: 'Users2', count: 8 },
    { id: 'forum', name: '论坛新帖', icon: 'MessageSquare', count: 23 },
    { id: 'alchemy', name: '炼丹房', icon: 'Flame', count: 3 },
  ];

  const trendingTopics = [
    { name: '丁火身强', posts: 234, trend: 'up' },
    { name: '武曲贪狼', posts: 189, trend: 'up' },
    { name: '八字格局', posts: 156, trend: 'down' },
    { name: '紫微命盘', posts: 142, trend: 'up' },
    { name: '同命匹配', posts: 98, trend: 'up' },
    { name: '命理验证', posts: 87, trend: 'stable' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm -mx-4 px-4 py-3 border-b">
        <h3 className="font-semibold flex items-center space-x-2">
          <SafeIcon name="Menu" className="h-4 w-4" />
          <span>灵友圈</span>
        </h3>
      </div>

      {/* Categories */}
      <div className="space-y-1">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? 'default' : 'ghost'}
            className="w-full justify-start text-sm h-9"
            onClick={() => setActiveCategory(cat.id)}
          >
            <SafeIcon name={cat.icon} className="mr-2 h-4 w-4" />
            <span className="flex-1 text-left">{cat.name}</span>
            {cat.count > 0 && (
              <Badge variant="secondary" className="text-xs">
                {cat.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      <Separator />

      {/* Trending Topics */}
      <div>
        <h4 className="text-xs font-semibold mb-3 flex items-center space-x-1">
          <SafeIcon name="TrendingUp" className="h-3 w-3 text-accent" />
          <span>热门话题</span>
        </h4>
        <div className="space-y-2">
          {trendingTopics.map((topic, idx) => (
            <button
              key={idx}
              className="w-full text-left p-2 rounded hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium group-hover:text-primary transition-colors truncate">
                    #{topic.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{topic.posts} 条讨论</p>
                </div>
                <div className={`text-xs font-semibold ${
                  topic.trend === 'up' ? 'text-green-500' : topic.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {topic.trend === 'up' && <SafeIcon name="TrendingUp" className="h-3 w-3" />}
                  {topic.trend === 'down' && <SafeIcon name="TrendingDown" className="h-3 w-3" />}
                  {topic.trend === 'stable' && <SafeIcon name="Minus" className="h-3 w-3" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Quick Links */}
      <div>
        <h4 className="text-xs font-semibold mb-3">快速链接</h4>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-xs h-8">
            <SafeIcon name="Settings" className="mr-2 h-3 w-3" />
            隐私设置
          </Button>
          <Button variant="ghost" className="w-full justify-start text-xs h-8">
            <SafeIcon name="Bell" className="mr-2 h-3 w-3" />
            通知设置
          </Button>
<Button variant="ghost" className="w-full justify-start text-xs h-8" asChild>
             <a href="./user-friend-request.html">
               <SafeIcon name="Users" className="mr-2 h-3 w-3" />
               好友请求
             </a>
           </Button>
          <Button variant="ghost" className="w-full justify-start text-xs h-8">
            <SafeIcon name="Flag" className="mr-2 h-3 w-3" />
            举报内容
          </Button>
        </div>
      </div>

      <Separator />

      {/* Footer Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>© 2025 灵客AI</p>
        <p>同命相知，灵魂共鸣</p>
      </div>
    </div>
  );
}
