
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';

interface HomologyProfileSimilaritiesProps {
  matchPercentage: number;
}

export default function HomologyProfileSimilarities({
  matchPercentage,
}: HomologyProfileSimilaritiesProps) {
  const similarities = [
    {
      category: '现代时间匹配',
      score: 85,
      description: '同年同月同日，时辰相近',
      icon: 'Clock',
    },
    {
      category: '八字相似度',
      score: 92,
      description: '年月日柱相同，五行平衡相似',
      icon: 'BarChart3',
    },
    {
      category: '紫微相似度',
      score: 88,
      description: '命宫主星相同，格局相近',
      icon: 'Star',
    },
    {
      category: '性格匹配度',
      score: 79,
      description: '性格特质互补，沟通顺畅',
      icon: 'Heart',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return '极高';
    if (score >= 80) return '很高';
    if (score >= 70) return '较高';
    return '中等';
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SafeIcon name="Zap" className="w-5 h-5 text-accent" />
          <CardTitle className="text-lg">相似度详情</CardTitle>
        </div>
        <CardDescription>多维度命理匹配分析</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">总体匹配度</span>
            <span className={`text-2xl font-bold ${getScoreColor(matchPercentage)}`}>
              {matchPercentage}%
            </span>
          </div>
          <Progress value={matchPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            评级：<span className={getScoreColor(matchPercentage)}>
              {getScoreLabel(matchPercentage)}
            </span>
          </p>
        </div>

        {/* Detailed Scores */}
        <div className="space-y-4">
          {similarities.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SafeIcon name={item.icon} className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                  {item.score}%
                </span>
              </div>
              <Progress value={item.score} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="flex items-start gap-2">
            <SafeIcon name="ThumbsUp" className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-green-500 mb-1">高度推荐</p>
              <p className="text-xs text-muted-foreground">
                你们的命盘匹配度很高，有很大的互动和交流潜力。不妨先发送私信，了解彼此的想法吧！
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
