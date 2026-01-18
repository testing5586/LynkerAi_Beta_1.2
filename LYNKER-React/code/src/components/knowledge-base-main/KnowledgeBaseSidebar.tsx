
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface KnowledgeBaseSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddCategory: () => void;
}

export default function KnowledgeBaseSidebar({
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}: KnowledgeBaseSidebarProps) {
  const categories = [
    { id: 'bazi', name: '八字命理', icon: 'BarChart3' },
    { id: 'ziwei', name: '紫微斗数', icon: 'Star' },
    { id: 'research', name: '研究笔记', icon: 'BookMarked' },
  ];

  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-mystical-gradient flex items-center justify-center">
            <SafeIcon name="BookOpen" className="h-4 w-4 text-white" />
          </div>
          <h2 className="font-bold text-lg">知识库</h2>
        </div>
      </div>

      {/* Categories */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            <SafeIcon name={category.icon} className="h-5 w-5" />
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onAddCategory}
        >
          <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
          新增分类
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => window.location.href = './home-page.html'}
        >
          <SafeIcon name="Home" className="h-4 w-4 mr-2" />
          返回首页
        </Button>
      </div>
    </aside>
  );
}
