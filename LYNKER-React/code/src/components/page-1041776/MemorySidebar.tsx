
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface MemorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onGoBack: () => void;
}

export default function MemorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  onGoBack,
}: MemorySidebarProps) {
  return (
    <div className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoBack}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          返回
        </Button>
      </div>

{/* Categories */}
       <ScrollArea className="flex-1">
         <div className="p-3 space-y-1">
{categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                className={`w-full justify-start h-7 text-xs px-2 ${
                  selectedCategory === category.id
                    ? 'bg-mystical-gradient text-primary-foreground'
                    : 'text-foreground/80 hover:bg-accent/20'
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <SafeIcon name={category.icon} className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate text-xs">{category.name}</span>
              </Button>
            ))}
         </div>
       </ScrollArea>

{/* Footer Info */}
       <div className="border-t p-3 space-y-1 text-xs text-muted-foreground">
         <div className="flex items-center space-x-2">
           <SafeIcon name="Info" className="h-3 w-3 flex-shrink-0" />
           <span className="line-clamp-2">提示：选择文本后可推入记忆库</span>
         </div>
         <div className="flex items-center space-x-2">
           <SafeIcon name="Lightbulb" className="h-3 w-3 flex-shrink-0" />
           <span className="line-clamp-2">AI会使用这些记忆作为分析依据</span>
         </div>
       </div>
    </div>
  );
}
