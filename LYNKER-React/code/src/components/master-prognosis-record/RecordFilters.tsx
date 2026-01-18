
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';

interface RecordFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: 'all' | '待验证' | '应验中' | '已验证';
  onFilterChange: (status: 'all' | '待验证' | '应验中' | '已验证') => void;
  sortBy: 'date' | 'status';
  onSortChange: (sort: 'date' | 'status') => void;
  onResetPagination?: () => void;
}

export default function RecordFilters({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortBy,
  onSortChange,
  onResetPagination,
}: RecordFiltersProps) {
return (
     <div className="flex flex-col sm:flex-row gap-2 items-end">
       {/* Search */}
       <div className="flex-1 min-w-0">
         <label className="text-xs font-medium text-muted-foreground mb-1 block">
           搜索客户或记录ID
         </label>
        <div className="relative">
          <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="输入客户假名或记录ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

{/* Status Filter */}
       <div className="w-full sm:w-48">
         <label className="text-xs font-medium text-muted-foreground mb-1 block">
           应验状态
         </label>
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="已验证">已验证</SelectItem>
            <SelectItem value="应验中">应验中</SelectItem>
            <SelectItem value="待验证">待验证</SelectItem>
          </SelectContent>
        </Select>
      </div>

{/* Sort */}
       <div className="w-full sm:w-48">
         <label className="text-xs font-medium text-muted-foreground mb-1 block">
           排序方式
         </label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">按日期排序</SelectItem>
            <SelectItem value="status">按状态排序</SelectItem>
          </SelectContent>
        </Select>
      </div>

{/* Reset Button */}
       <Button
         variant="outline"
         size="sm"
         onClick={() => {
           onSearchChange('');
           onFilterChange('all');
           onSortChange('date');
           onResetPagination?.();
         }}
         className="w-full sm:w-auto"
       >
         <SafeIcon name="RotateCcw" className="h-4 w-4 mr-2" />
         重置
       </Button>
    </div>
  );
}
