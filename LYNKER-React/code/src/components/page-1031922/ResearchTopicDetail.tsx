
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { ResearchTopicModel } from '@/data/knowledge';

interface ResearchTopicDetailProps {
  topic?: ResearchTopicModel;
  isClient?: boolean;
}

export default function ResearchTopicDetail({
  topic,
  isClient = true,
}: ResearchTopicDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');

  if (!topic) {
    return null;
  }

  const stageConfig = {
    Draft: { label: '草稿', color: 'bg-gray-500/20 text-gray-600' },
    Researching: { label: '研究中', color: 'bg-blue-500/20 text-blue-600' },
    Completed: { label: '已完成', color: 'bg-green-500/20 text-green-600' },
  };

  const stageInfo = stageConfig[topic.currentStage];

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl">{topic.title}</CardTitle>
            <CardDescription className="mt-2">
              创建于 {topic.lastUpdated} • 状态：
              <Badge className={`${stageInfo.color} ml-2`} variant="secondary">
                {stageInfo.label}
              </Badge>
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            disabled={!isClient}
          >
            <SafeIcon name={isEditing ? 'X' : 'Edit'} className="h-4 w-4 mr-1" />
            {isEditing ? '取消' : '编辑'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              placeholder="输入研究内容..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              disabled={!isClient}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={!isClient}
              >
                取消
              </Button>
              <Button
                className="bg-mystical-gradient hover:opacity-90"
                onClick={() => setIsEditing(false)}
                disabled={!isClient}
              >
                保存
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">
              {content || '暂无内容。点击编辑按钮添加研究笔记。'}
            </p>
          </div>
        )}

        {/* Related Resources */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <SafeIcon name="Link" className="h-4 w-4" />
            相关资源
          </h4>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              暂无关联资源。在导入内容时可关联到此主题。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
