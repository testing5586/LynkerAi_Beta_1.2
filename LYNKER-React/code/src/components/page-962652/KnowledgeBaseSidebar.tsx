
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_KB_CATEGORIES } from '@/data/knowledge';
import type { ResearchTopicModel } from '@/data/knowledge';

interface KnowledgeBaseSidebarProps {
  researchTopics: ResearchTopicModel[];
  onCreateTopic: (title: string) => void;
}

export default function KnowledgeBaseSidebar({
  researchTopics,
  onCreateTopic,
}: KnowledgeBaseSidebarProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const handleCreateTopic = () => {
    if (newTopicTitle.trim()) {
      onCreateTopic(newTopicTitle);
      setNewTopicTitle('');
      setShowCreateDialog(false);
    }
  };

  return (
    <div className="w-64 border-r bg-background/50 backdrop-blur-sm flex flex-col overflow-hidden">
      {/* Categories */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground px-2">命理分类</h3>
        {MOCK_KB_CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="w-full justify-start gap-2 text-sm"
          >
            <SafeIcon name={category.iconName} className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Research Topics */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">研究主题</h3>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <SafeIcon name="Plus" className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新研究主题</DialogTitle>
                <DialogDescription>
                  为您的命理研究创建一个新的主题
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="输入主题名称..."
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateTopic();
                    }
                  }}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleCreateTopic}
                    className="bg-mystical-gradient hover:opacity-90"
                  >
                    创建
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {researchTopics.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            暂无研究主题
          </p>
        ) : (
          researchTopics.map((topic) => (
            <Card
              key={topic.topicId}
              className="p-3 glass-card hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium line-clamp-2">{topic.title}</p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    {topic.currentStage === 'Draft'
                      ? '草稿'
                      : topic.currentStage === 'Researching'
                        ? '研究中'
                        : '已完成'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {topic.lastUpdated}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Separator />

      {/* Quick Links */}
      <div className="p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-2 text-sm" asChild>
          <a href="./page-961642.html">
            <SafeIcon name="Home" className="h-4 w-4" />
            返回个人中心
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 text-sm" asChild>
          <a href="./home-page.html">
            <SafeIcon name="Globe" className="h-4 w-4" />
            返回首页
          </a>
        </Button>
      </div>
    </div>
  );
}
