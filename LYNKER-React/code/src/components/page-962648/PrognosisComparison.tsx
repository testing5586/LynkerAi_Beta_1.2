
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisAgentResultModel } from '@/data/prognosis_pan';

interface PrognosisComparisonProps {
  results: PrognosisAgentResultModel[];
}

export default function PrognosisComparison({ results }: PrognosisComparisonProps) {
  const highestConfidence = Math.max(...results.map(r => r.confidenceScore));
  const averageConfidence = Math.round(results.reduce((sum, r) => sum + r.confidenceScore, 0) / results.length);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">最高置信度</p>
              <p className="text-3xl font-bold text-accent">{highestConfidence}%</p>
            </div>
            <SafeIcon name="TrendingUp" className="h-8 w-8 text-accent opacity-50" />
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">平均置信度</p>
              <p className="text-3xl font-bold text-primary">{averageConfidence}%</p>
            </div>
            <SafeIcon name="BarChart3" className="h-8 w-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">分析完成度</p>
              <p className="text-3xl font-bold text-green-500">100%</p>
            </div>
            <SafeIcon name="CheckCircle" className="h-8 w-8 text-green-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="BookOpen" className="h-5 w-5 text-accent" />
          <span>AI总结与建议</span>
        </h3>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary">总体总结</TabsTrigger>
            <TabsTrigger value="consensus">共识分析</TabsTrigger>
            <TabsTrigger value="recommendation">建议</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={result.agent.id} className="border-l-4 border-accent/50 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{result.agent.name}</h4>
                    <Badge className="bg-accent/20 text-accent border-accent/50">
                      {result.confidenceScore}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.analysisTitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                    {result.interpretationMarkdown}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Consensus Tab */}
          <TabsContent value="consensus" className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <SafeIcon name="Users" className="h-4 w-4 text-accent" />
                <span>三方共识</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <SafeIcon name="Check" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>所有AI Agent都认为命主具有强势的领导力和事业心</span>
                </li>
                <li className="flex items-start space-x-2">
                  <SafeIcon name="Check" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>出生时间在7:20-7:35之间的可能性最高</span>
                </li>
                <li className="flex items-start space-x-2">
                  <SafeIcon name="Check" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>财运和事业运势在未来3-5年内有明显提升</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <SafeIcon name="AlertCircle" className="h-4 w-4 text-amber-500" />
                <span>分歧点</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <SafeIcon name="AlertCircle" className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>关于感情运势的判断存在差异，需要进一步确认</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          {/* Recommendation Tab */}
          <TabsContent value="recommendation" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                  <SafeIcon name="Lightbulb" className="h-4 w-4 text-primary" />
                  <span>推荐出生时间</span>
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  基于三个AI Agent的综合分析，最可能的出生时间是：
                </p>
                <div className="bg-background/50 rounded p-3 text-center">
                  <p className="text-2xl font-bold text-accent">
                    1988年8月8日 07:30
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    置信度：92% | 时辰：午时 | 天干地支：丙午
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">后续建议</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <SafeIcon name="ArrowRight" className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>确认此出生时间后，系统将为您生成完整的命盘分析报告</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon name="ArrowRight" className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>建议咨询专业命理师进行进一步的深度分析</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon name="ArrowRight" className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>可以参与"同命匹配"功能，找到与您命盘相似的朋友</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
