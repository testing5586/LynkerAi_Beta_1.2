
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

interface ForumSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function ForumSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: ForumSidebarProps) {
  const trendingTopics = [
    { id: '1', title: '2024年流年运势预测', posts: 234, votes: 1205 },
    { id: '2', title: '紫微斗数命盘解读', posts: 189, votes: 987 },
    { id: '3', title: '八字五行平衡论', posts: 156, votes: 834 },
    { id: '4', title: '占星学与人生规划', posts: 142, votes: 756 },
    { id: '5', title: '面相识人秘诀', posts: 128, votes: 645 },
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="Layers" className="w-5 h-5 text-accent" />
          <span>分类</span>
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <SafeIcon name="Home" className="w-4 h-4" />
            <span>全部</span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon name={category.icon} className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      {/* Trending Topics */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="TrendingUp" className="w-5 h-5 text-accent" />
          <span>热门话题</span>
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => onSelectCategory(topic.id)}
              className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors group"
            >
              <div className="flex items-start space-x-2">
                <span className="text-accent font-bold text-sm min-w-6">#{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                    {topic.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {topic.posts} 帖子 · {topic.votes} 投票
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Community Guidelines */}
      <Card className="glass-card p-4 bg-accent/10 border-accent/20">
        <h3 className="font-semibold mb-3 text-sm flex items-center space-x-2">
          <SafeIcon name="AlertCircle" className="w-4 h-4 text-accent" />
          <span>社区规则</span>
        </h3>
        <ul className="text-xs text-muted-foreground space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-accent">•</span>
            <span>尊重他人，禁止人身攻击</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-accent">•</span>
            <span>分享真实经历和见解</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-accent">•</span>
            <span>不发布虚假或误导信息</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-accent">•</span>
            <span>保护个人隐私信息</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
