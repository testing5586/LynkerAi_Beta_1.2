
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisInputModel, PrognosisAgentResultModel } from '@/data/prognosis_pan';

interface AIAgentAnalysisColumnProps {
  result: PrognosisAgentResultModel;
  birthInput: PrognosisInputModel;
}

export default function AIAgentAnalysisColumn({
  result,
  birthInput,
}: AIAgentAnalysisColumnProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  };

  return (
    <Card className="glass-card flex flex-col h-full overflow-hidden hover:shadow-card transition-shadow">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name={result.agent.iconName} className="h-5 w-5" />
              {result.agent.name}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {result.agent.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="flex-1 pt-4 space-y-4 overflow-y-auto">
        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">置信度</span>
            <Badge
              variant="outline"
              className={`${getConfidenceColor(result.confidenceScore)} border`}
            >
              {result.confidenceScore}%
            </Badge>
          </div>
          <Progress value={result.confidenceScore} className="h-2" />
        </div>

        {/* Analysis Title */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">
            {result.analysisTitle}
          </h4>
        </div>

        {/* Interpretation */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2 border border-muted/50">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            分析解读
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {result.interpretationMarkdown}
          </p>
        </div>

        {/* Birth Info */}
        <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 space-y-2">
          <p className="text-xs font-semibold text-primary">📅 当前分析时间</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              日期：<span className="text-foreground font-semibold">{birthInput.birthDate}</span>
            </p>
            <p>
              时间：
              <span className="text-foreground font-semibold">
                {String(birthInput.birthTimeHour).padStart(2, '0')}:
                {String(birthInput.birthTimeMinute).padStart(2, '0')}
              </span>
            </p>
            <p>
              地点：<span className="text-foreground font-semibold">{birthInput.birthLocation}</span>
            </p>
          </div>
        </div>

        {/* Key Insights */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            关键要点
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <SafeIcon name="CheckCircle2" className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
              <span>分析基于最新的命理学理论</span>
            </li>
            <li className="flex gap-2">
              <SafeIcon name="AlertCircle" className="h-3 w-3 text-yellow-500 flex-shrink-0 mt-0.5" />
              <span>建议结合其他两个AI的分析</span>
            </li>
            <li className="flex gap-2">
              <SafeIcon name="Info" className="h-3 w-3 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>时间精度影响分析准确性</span>
            </li>
          </ul>
        </div>
      </CardContent>

      {/* Footer */}
      <Separator />
      <div className="p-3 bg-muted/20 text-xs text-muted-foreground text-center">
        <a
          href={result.agent.keySetupLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {result.agent.keySetupLinkTitle}
        </a>
      </div>
    </Card>
  );
}
