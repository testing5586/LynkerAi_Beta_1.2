
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { cn } from '@/lib/utils';
import type { ResearchTopicModel } from '@/data/knowledge';

interface ResearchTopicCardProps {
  topic: ResearchTopicModel;
  isSelected?: boolean;
  onSelect?: () => void;
  isClient?: boolean;
}

const stageConfig = {
  Draft: { label: '草稿', color: 'bg-gray-500/20 text-gray-600' },
  Researching: { label: '研究中', color: 'bg-blue-500/20 text-blue-600' },
  Completed: { label: '已完成', color: 'bg-green-500/20 text-green-600' },
};

export default function ResearchTopicCard({
  topic,
  isSelected = false,
  onSelect,
  isClient = true,
}: ResearchTopicCardProps) {
  const stageInfo = stageConfig[topic.currentStage];

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-card',
        isSelected && 'ring-2 ring-primary shadow-card'
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base line-clamp-2">{topic.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              更新于 {topic.lastUpdated}
            </CardDescription>
          </div>
          <Badge className={stageInfo.color} variant="secondary">
            {stageInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <SafeIcon name="Clock" className="h-3 w-3" />
          <span>最后编辑：{topic.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  );
}
