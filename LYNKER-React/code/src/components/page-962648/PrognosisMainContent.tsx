
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import BirthtimeInputPanel from './BirthtimeInputPanel';
import PrognosisColumn from './PrognosisColumn';
import PrognosisComparison from './PrognosisComparison';
import { MOCK_PROGNOSIS_INPUT, MOCK_PROGNOSIS_AGENT_RESULTS } from '@/data/prognosis_pan';

export default function PrognosisMainContent() {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [birthtimeInput, setBirthtimeInput] = useState(MOCK_PROGNOSIS_INPUT);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="container px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient-mystical mb-2">
                我的真命盘
              </h1>
              <p className="text-muted-foreground">
                通过多个AI Agent的分析，确定您最准确的出生时辰
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10">
                <SafeIcon name="Sparkles" className="h-3 w-3 mr-1" />
                AI验证中
              </Badge>
            </div>
          </div>

          {/* Birthtime Input Panel */}
          <BirthtimeInputPanel
            input={birthtimeInput}
            onChange={setBirthtimeInput}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-6 py-8">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <SafeIcon name="BarChart3" className="h-4 w-4" />
              <span>三方对比分析</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center space-x-2">
              <SafeIcon name="CheckCircle" className="h-4 w-4" />
              <span>AI总结与建议</span>
            </TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-8">
            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {MOCK_PROGNOSIS_AGENT_RESULTS.map((result, index) => (
                <PrognosisColumn
                  key={result.agent.id}
                  agent={result.agent}
                  result={result}
                  columnIndex={index}
                  birthtimeInput={birthtimeInput}
                />
              ))}
            </div>

            {/* Confidence Comparison */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
                <span>置信度对比</span>
              </h3>
              <div className="space-y-4">
                {MOCK_PROGNOSIS_AGENT_RESULTS.map((result) => (
                  <div key={result.agent.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{result.agent.name}</span>
                      <span className="text-sm font-semibold text-accent">
                        {result.confidenceScore}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-mystical-gradient h-2 rounded-full transition-all"
                        style={{ width: `${result.confidenceScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <PrognosisComparison results={MOCK_PROGNOSIS_AGENT_RESULTS} />
          </TabsContent>
        </Tabs>

        {/* Confirmation Section */}
        <Card className="glass-card p-8 mt-8 border-accent/50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <SafeIcon name="AlertCircle" className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">确认您的真命盘</h3>
              <p className="text-muted-foreground mb-4">
                根据上述三个AI Agent的分析结果，请选择您认为最准确的出生时辰。这将帮助系统为您提供更精准的命理分析和同命匹配。
              </p>
              <div className="flex items-center space-x-3">
                <Button className="bg-mystical-gradient hover:opacity-90">
                  <SafeIcon name="Check" className="h-4 w-4 mr-2" />
                  确认真命盘
                </Button>
                <Button variant="outline">
                  <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                  重新分析
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
