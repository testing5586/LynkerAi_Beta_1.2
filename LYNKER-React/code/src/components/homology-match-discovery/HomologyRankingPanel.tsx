
'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import HomologyRankingCard from './HomologyRankingCard';
import type { HomologyRankingModel } from '@/data/homology_match';

interface HomologyRankingPanelProps {
  rankings: HomologyRankingModel[];
}

export default function HomologyRankingPanel({
  rankings,
}: HomologyRankingPanelProps) {
  return (
    <Card className="glass-card p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <SafeIcon name="Trophy" className="h-5 w-5 text-accent" />
          <span>同频排行榜</span>
        </h3>
      </div>

      <Tabs defaultValue="Bazi" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="ModernTime" className="text-xs">
            <SafeIcon name="Clock" className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">时间</span>
          </TabsTrigger>
          <TabsTrigger value="Bazi" className="text-xs">
            <SafeIcon name="BarChart3" className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">八字</span>
          </TabsTrigger>
          <TabsTrigger value="Ziwei" className="text-xs">
            <SafeIcon name="Star" className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">紫微</span>
          </TabsTrigger>
        </TabsList>

        {rankings.map((ranking) => (
          <TabsContent key={ranking.id} value={ranking.id} className="space-y-2">
            {ranking.rankList.map((item) => (
              <HomologyRankingCard key={item.userId} item={item} rank={item.rank} />
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Info Box */}
      <div className="mt-6 bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">🏆 排行榜说明</p>
        <ul className="space-y-0.5 list-disc list-inside">
          <li>实时更新排名</li>
          <li>基于匹配算法</li>
          <li>点击查看详情</li>
        </ul>
      </div>
    </Card>
  );
}
