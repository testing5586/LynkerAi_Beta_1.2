
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';
import AIAgentChat from './AIAgentChat';
import type { AIAssistantModel, PrognosisAgentResultModel } from '@/data/prognosis_pan';
import type { PrognosisInputModel } from '@/data/prognosis_pan';

interface PrognosisColumnProps {
  agent: AIAssistantModel;
  result: PrognosisAgentResultModel;
  columnIndex: number;
  birthtimeInput: PrognosisInputModel;
}

export default function PrognosisColumn({
  agent,
  result,
  columnIndex,
  birthtimeInput,
}: PrognosisColumnProps) {
  const [minuteAdjustment, setMinuteAdjustment] = useState(0);
  const [showChat, setShowChat] = useState(false);

  const adjustedMinute = Math.max(0, Math.min(59, birthtimeInput.birthTimeMinute + minuteAdjustment));

  const colors = [
    'border-purple-500/50 bg-purple-500/5',
    'border-blue-500/50 bg-blue-500/5',
    'border-amber-500/50 bg-amber-500/5',
  ];

  return (
    <Card className={`glass-card p-6 border-2 ${colors[columnIndex]} flex flex-col h-full`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <SafeIcon name={agent.iconName} className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{agent.name}</h3>
              <p className="text-xs text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <Badge className="bg-accent/20 text-accent border-accent/50">
            {result.confidenceScore}%
          </Badge>
        </div>
      </div>

{/* OCR Import */}
      <div className="mb-6 pb-6 border-b">
        <Button
          variant="outline"
          className="w-full justify-center text-sm"
          onClick={() => {
            // Trigger file upload
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                // In real app, would call OCR API
                console.log('OCR processing:', file.name);
              }
            };
            input.click();
          }}
        >
          <SafeIcon name="Upload" className="h-4 w-4 mr-2" />
          导入排盘图进行OCR
        </Button>
      </div>

      {/* Analysis Result */}
      <div className="space-y-4 mb-6 flex-1">
        <div>
          <h4 className="font-semibold text-sm mb-2">{result.analysisTitle}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
            {result.interpretationMarkdown}
          </p>
        </div>

      </div>

      {/* Chat Button */}
      <Button
        variant="outline"
        className="w-full justify-center"
        onClick={() => setShowChat(!showChat)}
      >
        <SafeIcon name="MessageSquare" className="h-4 w-4 mr-2" />
        {showChat ? '关闭对话' : '与AI对话'}
      </Button>

      {/* Chat Interface */}
      {showChat && (
        <div className="mt-4 pt-4 border-t">
          <AIAgentChat
            agent={agent}
            result={result}
            birthtimeInput={birthtimeInput}
            adjustedMinute={adjustedMinute}
          />
        </div>
      )}
    </Card>
  );
}
