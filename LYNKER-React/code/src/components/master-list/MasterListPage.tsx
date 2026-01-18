
'use client';

import { useState, useMemo } from 'react';
import { MOCK_MASTERS } from '@/data/user';
import { MOCK_SERVICE_TYPES } from '@/data/service';
import type { MasterSummaryModel } from '@/data/user';
import MasterFilterBar from './MasterFilterBar';
import MasterCard from './MasterCard';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

type SortOption = 'rating' | 'price-low' | 'price-high' | 'service-count';

export default function MasterListPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort masters
  const filteredAndSortedMasters = useMemo(() => {
    let filtered = MOCK_MASTERS;

    // Filter by service type
    if (selectedServiceType !== 'all') {
      filtered = filtered.filter((master) =>
        master.expertise.includes(
          MOCK_SERVICE_TYPES.find((s) => s.id === selectedServiceType)?.name || ''
        )
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (master) =>
          master.alias.toLowerCase().includes(query) ||
          master.realName.toLowerCase().includes(query) ||
          master.expertise.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.priceMin - b.priceMin;
        case 'price-high':
          return b.priceMin - a.priceMin;
        case 'service-count':
          return b.serviceCount - a.serviceCount;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedServiceType, sortBy, searchQuery]);

  return (
    <div className="container px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">
              专业命理师
            </h1>
            <p className="text-muted-foreground">
              发现平台上最优秀的命理师，为您的人生指点迷津
            </p>
          </div>
<Button
             variant="outline"
             onClick={() => window.history.back()}
             className="flex items-center space-x-2"
           >
             <SafeIcon name="ArrowLeft" className="h-4 w-4" />
             <span>返回</span>
           </Button>
         </div>
       </div>

      {/* Filter Bar */}
      <MasterFilterBar
        selectedServiceType={selectedServiceType}
        onServiceTypeChange={setSelectedServiceType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredAndSortedMasters.length}
      />

      {/* Masters Grid */}
      {filteredAndSortedMasters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredAndSortedMasters.map((master) => (
            <MasterCard key={master.masterId} master={master} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="mb-6 relative">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
              <SafeIcon name="Search" className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <h3 className="text-xl font-semibold mb-2">未找到匹配的命理师</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            尝试调整筛选条件或搜索关键词，找到适合您的命理师
          </p>
          <Button
            onClick={() => {
              setSelectedServiceType('all');
              setSortBy('rating');
              setSearchQuery('');
            }}
            className="bg-mystical-gradient hover:opacity-90"
          >
            重置筛选
          </Button>
        </div>
      )}
    </div>
  );
}
