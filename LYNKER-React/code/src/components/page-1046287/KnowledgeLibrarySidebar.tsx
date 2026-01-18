
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface KnowledgeLibrarySidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isClient: boolean;
}

const categories = [
  { name: '八字', icon: 'Scroll' },
  { name: '紫薇', icon: 'Star' },
  { name: '占星', icon: 'Moon' },
  { name: '风水', icon: 'Compass' },
  { name: '面相', icon: 'Eye' },
];

export default function KnowledgeLibrarySidebar({
  selectedCategory,
  onSelectCategory,
  isClient,
}: KnowledgeLibrarySidebarProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-muted-foreground/20 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold mb-3">分类</h3>
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              selectedCategory === category.name
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent/20'
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <SafeIcon name={category.icon} className="h-4 w-4 mr-2" />
            {category.name}
          </Button>
        ))}

        {/* Add New Category */}
        <Button
          variant="outline"
          className="w-full justify-start mt-4 border-dashed"
          disabled={!isClient}
        >
          <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
          新增分类
        </Button>
      </div>

      {/* Memory Library Link */}
      <div className="mt-6 pt-4 border-t">
        <Button
          asChild
          variant="outline"
          className="w-full justify-start"
        >
          <a href="./page-1041776.html">
            <SafeIcon name="Brain" className="h-4 w-4 mr-2" />
            记忆库
          </a>
        </Button>
      </div>
    </Card>
  );
}
