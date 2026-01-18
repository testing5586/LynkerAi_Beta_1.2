
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface AIAgentAnalysisProps {
  agent: AIAssistantModel;
  analysisTitle: string;
  interpretation: string;
  confidenceScore: number;
  agentNumber: number;
}

export default function AIAgentAnalysis({
  agent,
  analysisTitle,
  interpretation,
  confidenceScore,
  agentNumber,
}: AIAgentAnalysisProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 text-green-400';
    if (score >= 80) return 'bg-blue-500/20 text-blue-400';
    if (score >= 70) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-orange-500/20 text-orange-400';
  };

  return (
    <Card className="glass-card p-4 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <SafeIcon name={agent.iconName} className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{agent.name}</h4>
            <p className="text-xs text-muted-foreground">Agent #{agentNumber}</p>
          </div>
        </div>
        <Badge className={getConfidenceColor(confidenceScore)}>
          {confidenceScore}% 置信度
        </Badge>
      </div>

      {/* Analysis Title */}
      <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm font-medium text-primary">{analysisTitle}</p>
      </div>

      {/* Interpretation */}
      <div className="mb-4 text-sm text-muted-foreground space-y-2">
        <p>{interpretation}</p>
      </div>

      {/* Confidence Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">分析可信度</span>
          <span className="text-xs font-semibold">{confidenceScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-mystical-gradient h-2 rounded-full transition-all"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <SafeIcon name="MessageSquare" className="mr-1 h-3 w-3" />
          详细对话
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
        >
          <SafeIcon name="ThumbsUp" className="mr-1 h-3 w-3" />
          赞同
        </Button>
      </div>
    </Card>
  );
}
