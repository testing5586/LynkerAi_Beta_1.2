
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';

interface PrognosisAnalysisSummaryProps {
  summary: string;
}

export default function PrognosisAnalysisSummary({ summary }: PrognosisAnalysisSummaryProps) {
  return (
    <section class="mt-8">
      <Card className="glass-card p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold">命理分析摘要</h2>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">
              <SafeIcon name="BarChart3" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">八字分析</span>
            </TabsTrigger>
            <TabsTrigger value="ziwei">
              <SafeIcon name="Star" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">紫微分析</span>
            </TabsTrigger>
            <TabsTrigger value="astrology">
              <SafeIcon name="Compass" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">占星分析</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-foreground/80 leading-relaxed">
                {summary}
              </p>
              <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
                <SafeIcon name="Info" className="w-4 h-4" />
                <span>此分析基于用户公开的命盘信息</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ziwei" className="mt-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-foreground/80 leading-relaxed">
                紫微斗数分析：命主命宫主星为紫微，具有领导力和责任感。与天府星同宫，增强了稳定性和财运。建议在事业发展中发挥组织能力。
              </p>
              <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
                <SafeIcon name="Info" className="w-4 h-4" />
                <span>紫微分析需要用户验证真命盘后显示完整内容</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="astrology" className="mt-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-foreground/80 leading-relaxed">
                西方占星分析：太阳星座在狮子座，赋予自信和创意。月亮星座在处女座，提供理性和分析能力。上升星座在天秤座，展现优雅的外在气质。
              </p>
              <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
                <SafeIcon name="Info" className="w-4 h-4" />
                <span>占星分析基于出生时间和地点计算</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
}
