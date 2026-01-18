
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import HomologyFilterPanel from './HomologyFilterPanel';
import HomologyMatchGrid from './HomologyMatchGrid';
import HomologyRankingPanel from './HomologyRankingPanel';
import {
  MOCK_MATCH_PROFILES,
  MOCK_HOMOLOGY_RANKINGS,
  MOCK_HOMOLOGY_FILTERS,
  type HomologyMatchModel,
  type HomologyFilterModel,
} from '@/data/homology_match';

export default function HomologyMatchDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<HomologyFilterModel>(MOCK_HOMOLOGY_FILTERS);
  const [sortBy, setSortBy] = useState<'match' | 'online' | 'recent'>('match');

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let results = [...MOCK_MATCH_PROFILES];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (match) =>
          match.alias.toLowerCase().includes(query) ||
          match.mainStarOrPillar.toLowerCase().includes(query) ||
          match.interestTags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    if (sortBy === 'match') {
      results.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (sortBy === 'online') {
      // Mock online status - in real app would come from server
      results.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));
    }

    return results;
  }, [searchQuery, sortBy]);

  const handleFilterChange = (newFilters: HomologyFilterModel) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gradient-mystical mb-2">
              同命匹配发现
            </h1>
            <p className="text-muted-foreground">
              基于命盘维度，发现与您灵魂共鸣的同命人
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
            <SafeIcon name="Users" className="h-5 w-5" />
            <span>已发现 {filteredMatches.length} 位同命人</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SafeIcon
            name="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          />
          <Input
            placeholder="搜索假名、命盘特征或兴趣标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-card border-border"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Filter Panel */}
        <div className="lg:col-span-1">
          <HomologyFilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Center: Match List */}
        <div className="lg:col-span-2">
          {/* Sort Controls */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">匹配结果</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">排序：</span>
              <div className="flex space-x-2">
                <Button
                  variant={sortBy === 'match' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('match')}
                  className="text-xs"
                >
                  <SafeIcon name="TrendingUp" className="h-3 w-3 mr-1" />
                  匹配度
                </Button>
                <Button
                  variant={sortBy === 'online' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('online')}
                  className="text-xs"
                >
                  <SafeIcon name="Circle" className="h-3 w-3 mr-1" />
                  在线
                </Button>
              </div>
            </div>
          </div>

          {/* Match Grid */}
          {filteredMatches.length > 0 ? (
            <HomologyMatchGrid matches={filteredMatches} />
          ) : (
            <Card className="glass-card p-12 text-center">
              <SafeIcon
                name="Search"
                className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50"
              />
              <h3 className="text-lg font-semibold mb-2">未找到匹配结果</h3>
              <p className="text-muted-foreground mb-4">
                尝试调整筛选条件或搜索关键词
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilters(MOCK_HOMOLOGY_FILTERS);
                }}
              >
                重置筛选
              </Button>
            </Card>
          )}
        </div>

        {/* Right: Ranking Panel */}
        <div className="lg:col-span-1">
          <HomologyRankingPanel rankings={MOCK_HOMOLOGY_RANKINGS} />
        </div>
      </div>
    </div>
  );
}
