
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import TimeAdjustmentSlider from './TimeAdjustmentSlider';
import ChartOCRUpload from './ChartOCRUpload';
import AIAgentChat from './AIAgentChat';
import type { PrognosisAgentResultModel } from '@/data/prognosis_pan';

interface ChartColumnProps {
  index: number;
  chart: {
    hour: number;
    minute: number;
    chartImage?: string;
    agentAnalysis: string;
  };
  aiAgent: PrognosisAgentResultModel;
  isSelected: boolean;
  onTimeChange: (hour: number, minute: number) => void;
  onConfirm: () => void;
}

export default function ChartColumn({
  index,
  chart,
  aiAgent,
  isSelected,
  onTimeChange,
  onConfirm,
}: ChartColumnProps) {
  const [activeTab, setActiveTab] = useState('analysis');

  return (
    <Card
      className={`glass-card transition-all ${
        isSelected
          ? 'border-accent ring-2 ring-accent/50 shadow-lg'
          : 'border-primary/30 hover:border-primary/50'
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              {aiAgent.agent.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {aiAgent.agent.description}
            </CardDescription>
          </div>
          {isSelected && (
            <Badge className="bg-accent text-accent-foreground">
              <SafeIcon name="Check" className="h-3 w-3 mr-1" />
              已选择
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Time Adjustment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">出生时辰微调</label>
            <span className="text-lg font-bold text-primary">
              {String(chart.hour).padStart(2, '0')}:{String(chart.minute).padStart(2, '0')}
            </span>
          </div>
          <TimeAdjustmentSlider
            hour={chart.hour}
            minute={chart.minute}
            onChange={onTimeChange}
          />
        </div>

        {/* OCR Upload */}
        <ChartOCRUpload agentName={aiAgent.agent.name} />

        {/* Tabs for Analysis and Chat */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">分析结果</TabsTrigger>
            <TabsTrigger value="chat">AI对话</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-3">
            {/* Analysis Title */}
            <div className="p-3 bg-muted/50 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-primary">
                {aiAgent.analysisTitle}
              </p>
            </div>

            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">分析置信度</span>
                <span className="font-semibold">{aiAgent.confidenceScore}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-mystical-gradient h-2 rounded-full transition-all"
                  style={{ width: `${aiAgent.confidenceScore}%` }}
                />
              </div>
            </div>

            {/* Analysis Content */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="text-sm text-foreground/80 space-y-2 max-h-64 overflow-y-auto">
                {aiAgent.interpretationMarkdown.split('\n').map((line, i) => {
                  if (line.startsWith('##')) {
                    return (
                      <h3 key={i} className="font-semibold text-primary mt-2">
                        {line.replace(/^#+\s*/, '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('-')) {
                    return (
                      <p key={i} className="ml-4">
                        • {line.replace(/^-\s*/, '')}
                      </p>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p key={i} className="text-sm">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <AIAgentChat agent={aiAgent.agent} />
          </TabsContent>
        </Tabs>

        {/* Confirm Button */}
        <Button
          onClick={onConfirm}
          className={`w-full ${
            isSelected
              ? 'bg-accent text-accent-foreground hover:bg-accent/90'
              : 'bg-mystical-gradient hover:opacity-90'
          }`}
          size="lg"
        >
          <SafeIcon name={isSelected ? 'CheckCircle' : 'Circle'} className="h-4 w-4 mr-2" />
          {isSelected ? '已选择此命盘' : '选择此命盘'}
        </Button>
      </CardContent>
    </Card>
  );
}
