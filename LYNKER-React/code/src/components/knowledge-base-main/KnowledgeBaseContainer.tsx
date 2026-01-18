import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import KnowledgeBaseContent from '@/components/knowledge-base-main/KnowledgeBaseContent';
import Footer from '@/components/common/Footer';
import { cn } from '@/lib/utils';

type ViewType = 'user-records' | 'master-records' | string;

interface CustomCategory {
  id: string;
  name: string;
  icon: string;
}

export default function KnowledgeBaseContainer() {
  const [selectedView, setSelectedView] = useState<ViewType>('bazi');
const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: CustomCategory = {
        id: `custom_${Date.now()}`,
        name: newCategoryName,
        icon: 'BookMarked',
      };
      setCustomCategories([...customCategories, newCategory]);
      setNewCategoryName('');
      setShowNewCategoryModal(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCustomCategories(customCategories.filter(cat => cat.id !== id));
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
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

{/* Main Navigation */}
         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
           {/* 八字分类 */}
          <button
            onClick={() => setSelectedView('bazi')}
            className={cn(
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left',
              selectedView === 'bazi'
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <SafeIcon name="BarChart3" className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">八字命理</span>
          </button>

          {/* 紫微分类 */}
          <button
            onClick={() => setSelectedView('ziwei')}
            className={cn(
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left',
              selectedView === 'ziwei'
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <SafeIcon name="Star" className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">紫微斗数</span>
</button>

           {/* 自定义分类 */}
          {customCategories.length > 0 && (
            <>
              <div className="px-4 py-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                自定义分类
              </div>
              {customCategories.map((category) => (
                <div
                  key={category.id}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group',
                    selectedView === category.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  )}
                >
                  <button
                    onClick={() => setSelectedView(category.id)}
                    className="flex-1 flex items-center space-x-3 text-left"
                  >
                    <SafeIcon name={category.icon} className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                  >
                    <SafeIcon name="X" className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </>
          )}

          {/* 新增分类按钮 */}
          <Button
            variant="outline"
            className="w-full justify-start mt-4"
            onClick={() => setShowNewCategoryModal(true)}
          >
            <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
            新增分类
          </Button>

{/* 记忆库按钮 */}
          <Button
            variant="outline"
            className="w-full justify-start mt-2"
            onClick={() => window.location.href = './page-1041776.html'}
          >
            <SafeIcon name="Brain" className="h-4 w-4 mr-2" />
            记忆库
          </Button>
        </nav>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:text-sidebar-primary"
            onClick={() => window.location.href = './master-backend-overview.html'}
          >
            <SafeIcon name="LayoutDashboard" className="h-4 w-4 mr-2" />
            返回后台
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:text-sidebar-primary"
            onClick={() => window.location.href = './home-page.html'}
          >
            <SafeIcon name="Home" className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto">
          <KnowledgeBaseContent selectedView={selectedView} />
        </main>
        <Footer variant="simple" />
      </div>

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4">新增分类</h3>
            <input
              type="text"
              placeholder="输入分类名称"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory();
                }
              }}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewCategoryModal(false);
                  setNewCategoryName('');
                }}
              >
                取消
              </Button>
              <Button
                className="bg-mystical-gradient hover:opacity-90"
                onClick={handleAddCategory}
              >
                创建
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}