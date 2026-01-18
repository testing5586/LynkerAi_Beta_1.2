
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import HomologyFilterPanel from './HomologyFilterPanel';
import HomologyMatchCard from './HomologyMatchCard';
import HomologyRankingPanel from './HomologyRankingPanel';
import {
  MOCK_MATCH_PROFILES,
  MOCK_HOMOLOGY_RANKINGS,
  MOCK_HOMOLOGY_FILTERS,
} from '@/data/homology_match';
import type { HomologyFilterModel } from '@/data/homology_match';

export default function HomologyDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<HomologyFilterModel>(MOCK_HOMOLOGY_FILTERS);
  const [sortBy, setSortBy] = useState<'match' | 'online' | 'recent'>('match');

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let results = MOCK_MATCH_PROFILES;

    // Apply search filter
    if (searchQuery.trim()) {
      results = results.filter(
        (match) =>
          match.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.mainStarOrPillar.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.interestTags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort results
    if (sortBy === 'match') {
      results = [...results].sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (sortBy === 'online') {
      // Mock online status - in real app would come from API
      results = [...results].sort((a, b) => {
        const aOnline = Math.random() > 0.5;
        const bOnline = Math.random() > 0.5;
        return (bOnline ? 1 : 0) - (aOnline ? 1 : 0);
      });
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
        <h1 className="text-4xl font-bold text-gradient-mystical mb-2">同命发现</h1>
        <p className="text-muted-foreground text-lg">
          基于命盘维度发现与您灵魂共鸣的同命人，开启命理社交新体验
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex gap-2">
        <div className="flex-1 relative">
          <SafeIcon
            name="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          />
          <Input
            placeholder="搜索用户名、命盘特征或兴趣标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSearchQuery('')}
          className="hidden sm:flex"
        >
          <SafeIcon name="X" className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Layout: Filter | Matches | Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Filter Panel */}
        <div className="lg:col-span-1">
          <HomologyFilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Center: Match Cards */}
        <div className="lg:col-span-2">
          {/* Sort Controls */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              匹配结果 ({filteredMatches.length})
            </h2>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'match' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('match')}
              >
                <SafeIcon name="TrendingUp" className="h-4 w-4 mr-1" />
                匹配度
              </Button>
              <Button
                variant={sortBy === 'online' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('online')}
              >
                <SafeIcon name="Circle" className="h-4 w-4 mr-1" />
                在线
              </Button>
            </div>
          </div>

          {/* Match Cards Grid */}
          {filteredMatches.length > 0 ? (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <HomologyMatchCard key={match.matchId} match={match} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <SafeIcon
                name="Users"
                className="h-12 w-12 text-muted-foreground mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">暂无匹配结果</h3>
              <p className="text-muted-foreground mb-4">
                调整筛选条件或搜索关键词，发现更多同命人
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
            </div>
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
