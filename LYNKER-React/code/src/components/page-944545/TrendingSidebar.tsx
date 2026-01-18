
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface TrendingTopic {
  id: string;
  title: string;
  count: number;
}

interface TrendingSidebarProps {
  topics: TrendingTopic[];
}

export default function TrendingSidebar({ topics }: TrendingSidebarProps) {
  return (
    <Card className="border-border/50 sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
          热门话题
        </CardTitle>
        <CardDescription>实时排行榜</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {topics.map((topic, index) => (
          <Button
            key={topic.id}
            variant="ghost"
            className="w-full justify-start h-auto py-2 px-3 hover:bg-accent/10"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent font-semibold text-xs flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium truncate">{topic.title}</p>
                <p className="text-xs text-muted-foreground">{topic.count} 条讨论</p>
              </div>
              <SafeIcon name="ChevronRight" className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          </Button>
        ))}

        <Button variant="outline" className="w-full mt-4">
          <SafeIcon name="MoreHorizontal" className="h-4 w-4 mr-2" />
          查看更多
        </Button>
      </CardContent>
    </Card>
  );
}
