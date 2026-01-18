
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MOCK_SERVICE_TYPES } from '@/data/service';
import SafeIcon from '@/components/common/SafeIcon';

interface MasterFilterBarProps {
  selectedServiceType: string;
  onServiceTypeChange: (type: string) => void;
  sortBy: 'rating' | 'price-low' | 'price-high' | 'service-count';
  onSortChange: (sort: 'rating' | 'price-low' | 'price-high' | 'service-count') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export default function MasterFilterBar({
  selectedServiceType,
  onServiceTypeChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  resultCount,
}: MasterFilterBarProps) {
  return (
    <div className="glass-card p-6 rounded-lg space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <SafeIcon name="Search" className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="搜索命理师名字、专长..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>

      {/* Filters and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Service Type Filter */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            命理类型
          </label>
          <Select value={selectedServiceType} onValueChange={onServiceTypeChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="选择命理类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              {MOCK_SERVICE_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            排序方式
          </label>
          <Select value={sortBy} onValueChange={(value: any) => onSortChange(value)}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="选择排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">评分最高</SelectItem>
              <SelectItem value="service-count">服务最多</SelectItem>
              <SelectItem value="price-low">价格最低</SelectItem>
              <SelectItem value="price-high">价格最高</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-end">
          <div className="text-sm text-muted-foreground">
            找到 <span className="font-semibold text-accent">{resultCount}</span> 位命理师
          </div>
        </div>
      </div>
    </div>
  );
}
