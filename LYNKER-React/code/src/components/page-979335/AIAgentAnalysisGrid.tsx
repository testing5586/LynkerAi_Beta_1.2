
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';
import AIAgentAnalysisColumn from './AIAgentAnalysisColumn';
import type { PrognosisInputModel, PrognosisAgentResultModel } from '@/data/prognosis_pan';

interface AIAgentAnalysisGridProps {
  birthInput: PrognosisInputModel;
  agentResults: PrognosisAgentResultModel[];
}

export default function AIAgentAnalysisGrid({
  birthInput,
  agentResults,
}: AIAgentAnalysisGridProps) {
  const averageConfidence =
    Math.round(
      agentResults.reduce((sum, r) => sum + r.confidenceScore, 0) /
        agentResults.length
    ) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">AI Agent 分析</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">综合置信度</span>
            <div className="flex items-center gap-2">
              <Progress value={averageConfidence} className="w-24 h-2" />
              <span className="text-sm font-semibold">{averageConfidence}%</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            <SafeIcon name="Zap" className="h-3 w-3 mr-1" />
            实时分析中
          </Badge>
        </div>
      </div>

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agentResults.map((result) => (
          <AIAgentAnalysisColumn
            key={result.agent.id}
            result={result}
            birthInput={birthInput}
          />
        ))}
      </div>

      {/* Comparison Summary */}
      <Card className="glass-card border-accent/20 bg-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="BarChart3" className="h-5 w-5 text-accent" />
            分析对比总结
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agentResults.map((result) => (
              <div key={result.agent.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{result.agent.name}</span>
                  <Badge
                    variant="secondary"
                    className={`${
                      result.confidenceScore >= 85
                        ? 'bg-green-500/20 text-green-400'
                        : result.confidenceScore >= 70
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-orange-500/20 text-orange-400'
                    }`}
                  >
                    {result.confidenceScore}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {result.analysisTitle}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background/50 rounded-lg p-3 space-y-2 border border-muted">
            <p className="text-sm font-semibold text-foreground">
              🎯 最可能的出生时辰
            </p>
            <p className="text-sm text-muted-foreground">
              根据三个AI agent的综合分析，您的出生时辰最可能是{' '}
              <span className="font-semibold text-accent">
                {String(birthInput.birthTimeHour).padStart(2, '0')}:
                {String(birthInput.birthTimeMinute).padStart(2, '0')}
              </span>
              。请继续调整时间或确认此方案。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
