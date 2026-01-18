
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface HomologyProfileInterestsProps {
  tags: string[];
}

export default function HomologyProfileInterests({ tags }: HomologyProfileInterestsProps) {
  const interestIcons: Record<string, string> = {
    '国学': 'BookOpen',
    '冥想': 'Zap',
    '科技': 'Cpu',
    '金融': 'TrendingUp',
    '旅游': 'MapPin',
    '素食': 'Leaf',
    '写作': 'PenTool',
    '电影': 'Film',
    '咖啡': 'Coffee',
    '编程': 'Code',
    '户外': 'Mountain',
    '哲学': 'Brain',
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SafeIcon name="Heart" className="w-5 h-5 text-destructive" />
          <CardTitle className="text-lg">兴趣爱好</CardTitle>
        </div>
        <CardDescription>了解对方的热情所在</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <SafeIcon
                name={interestIcons[tag] || 'Sparkles'}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm font-medium">{tag}</span>
            </div>
          ))}
        </div>

        {/* Common Interests Highlight */}
        <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs font-semibold text-accent mb-2">共同兴趣</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-accent/20 text-accent font-medium">
              <SafeIcon name="Check" className="w-3 h-3 mr-1" />
              国学
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-accent/20 text-accent font-medium">
              <SafeIcon name="Check" className="w-3 h-3 mr-1" />
              科技
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
