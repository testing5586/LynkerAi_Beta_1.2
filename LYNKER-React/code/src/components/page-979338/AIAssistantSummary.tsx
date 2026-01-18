
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisAgentResultModel } from '@/data/prognosis_pan';

interface AIAssistantSummaryProps {
  agentResults: PrognosisAgentResultModel[];
  selectedChartIndex: number | null;
}

export default function AIAssistantSummary({
  agentResults,
  selectedChartIndex,
}: AIAssistantSummaryProps) {
  const generateSummary = () => {
    const scores = agentResults.map((r) => r.confidenceScore);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const maxScore = Math.max(...scores);
    const maxIndex = scores.indexOf(maxScore);

    return {
      avgScore,
      maxScore,
      maxIndex,
      recommendation: agentResults[maxIndex].agent.name,
    };
  };

  const summary = generateSummary();

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="glass-card border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
            灵伴AI总结
          </CardTitle>
          <CardDescription>
            基于三个AI命理师的分析结果，灵伴AI为您提供综合建议
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">平均置信度</p>
              <p className="text-2xl font-bold text-primary">{summary.avgScore}%</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">最高置信度</p>
              <p className="text-2xl font-bold text-accent">{summary.maxScore}%</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">推荐命理师</p>
              <p className="text-sm font-bold text-primary">{summary.recommendation}</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <SafeIcon name="Lightbulb" className="h-4 w-4 text-primary" />
              灵伴AI建议
            </h4>
            <p className="text-sm text-foreground/80">
              根据三个AI命理师的分析，{summary.recommendation}
              的分析置信度最高（{summary.maxScore}%）。该分析认为您的命盘特征与实际人生经历最为吻合。建议您选择该时辰作为真命盘。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-lg">三师对比分析</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comparison">对比分析</TabsTrigger>
              <TabsTrigger value="debate">辩论观点</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              {agentResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedChartIndex === index
                      ? 'border-accent bg-accent/5'
                      : 'border-primary/20 bg-muted/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <SafeIcon name={result.agent.iconName} className="h-4 w-4" />
                        {result.agent.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {result.analysisTitle}
                      </p>
                    </div>
                    <Badge
                      variant={
                        result.confidenceScore >= 85
                          ? 'default'
                          : result.confidenceScore >= 75
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {result.confidenceScore}%
                    </Badge>
                  </div>

                  {/* Confidence Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-mystical-gradient h-2 rounded-full transition-all"
                      style={{ width: `${result.confidenceScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="debate" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <SafeIcon name="MessageCircle" className="h-4 w-4 text-primary" />
                  三师辩论观点
                </h4>

                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-lg border-l-4 border-primary">
                    <p className="text-sm font-medium text-primary mb-1">
                      {agentResults[0].agent.name}：
                    </p>
                    <p className="text-sm text-foreground/80">
                      认为该时辰的八字格局最为清晰，官星和财星的配置最为合理，与命主的实际经历高度吻合。
                    </p>
                  </div>

                  <div className="p-3 bg-background rounded-lg border-l-4 border-secondary">
                    <p className="text-sm font-medium text-secondary mb-1">
                      {agentResults[1].agent.name}：
                    </p>
                    <p className="text-sm text-foreground/80">
                      从紫微斗数的角度，该时辰的命宫主星和三方四正的星曜组合最为稳定，预示着命主的人生轨迹。
                    </p>
                  </div>

                  <div className="p-3 bg-background rounded-lg border-l-4 border-accent">
                    <p className="text-sm font-medium text-accent mb-1">
                      {agentResults[2].agent.name}：
                    </p>
                    <p className="text-sm text-foreground/80">
                      从西方占星的角度，该时辰的行星位置和宫位分布最为符合命主的性格特征和人生事件。
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm text-foreground/80">
                    <strong>灵伴AI总结：</strong>
                    三个AI命理师虽然使用不同的命理体系，但都指向同一个时辰作为最准确的出生时间。这种高度的一致性表明该时辰的可信度非常高。
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Questions to Verify */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="HelpCircle" className="h-4 w-4" />
            验证问卷
          </CardTitle>
          <CardDescription>
            回答以下问题可以帮助灵伴AI更准确地确认您的真命盘
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">1. 您的性格特征最符合以下哪个描述？</p>
            <div className="space-y-2">
              {[
                '强势、进取、领导力强',
                '温和、内敛、思虑周密',
                '活泼、社交、适应力强',
              ].map((option, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="personality" className="w-4 h-4" />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">2. 您的人生中最重要的转折点发生在？</p>
            <div className="space-y-2">
              {[
                '20-25岁之间',
                '25-30岁之间',
                '30-35岁之间',
              ].map((option, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="turning-point" className="w-4 h-4" />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            这些问题仅供参考，最终的真命盘确认应基于您对三个AI分析的综合判断。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
