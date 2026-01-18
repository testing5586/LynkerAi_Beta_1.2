
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_PROGNOSIS_INPUT } from '@/data/prognosis_pan';

export default function TrueChartContent() {
  // Check if user has verified chart data (in real app, this would come from API/state)
  const hasVerifiedChart = false; // Set to false to show empty state, true to show verified data

  // Format birth date and time
  const birthDate = new Date(MOCK_PROGNOSIS_INPUT.birthDate);
  const formattedDate = birthDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = `${String(MOCK_PROGNOSIS_INPUT.birthTimeHour).padStart(2, '0')}:${String(MOCK_PROGNOSIS_INPUT.birthTimeMinute).padStart(2, '0')}`;

return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gradient-mystical mb-2">我的真命盘</h1>
          <p className="text-muted-foreground">
            已验证的八字和紫薇命盘，与验证真命盘页面实时同步
          </p>
        </div>

{/* Birth Time Section - Always Visible */}
         <Card className="glass-card border-primary/20">
           <CardHeader className="pb-3">
             <CardTitle className="flex items-center space-x-2 text-base">
               <SafeIcon name="Clock" className="h-4 w-4 text-accent" />
               <span>出生信息</span>
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-2">
             {hasVerifiedChart ? (
               <>
                 <div className="grid grid-cols-3 gap-2">
                   {/* Date */}
                   <div className="p-2 rounded bg-muted/50 border border-border border-sm">
                     <p className="text-xs text-muted-foreground mb-0.5">出生日期</p>
                     <p className="text-sm font-semibold">{formattedDate}</p>
                   </div>

                   {/* Time */}
                   <div className="p-2 rounded bg-muted/50 border border-border">
                     <p className="text-xs text-muted-foreground mb-0.5">出生时辰</p>
                     <p className="text-sm font-semibold">{formattedTime}</p>
                   </div>

                   {/* Location */}
                   <div className="p-2 rounded bg-muted/50 border border-border">
                     <p className="text-xs text-muted-foreground mb-0.5">出生地点</p>
                     <p className="text-sm font-semibold">{MOCK_PROGNOSIS_INPUT.birthLocation}</p>
                   </div>
                 </div>

                 <div className="flex items-center space-x-2 p-2 rounded text-xs bg-accent/10 border border-accent/20">
                   <SafeIcon name="CheckCircle" className="h-4 w-4 text-accent flex-shrink-0" />
                   <p className="text-accent">此出生时辰已验证，准确度达92%</p>
                 </div>
               </>
             ) : (
               <div className="flex flex-col items-center justify-center py-8 space-y-2">
                 <p className="text-lg font-semibold text-muted-foreground">等待中</p>
                 <p className="text-sm text-muted-foreground">
                   完成真命盘验证后，出生信息将自动同步显示
                 </p>
               </div>
             )}
           </CardContent>
         </Card>

{/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bazi Chart */}
          <Card className="glass-card border-primary/20">
            {hasVerifiedChart ? (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SafeIcon name="Grid3x3" className="h-5 w-5 text-primary" />
                    <span>八字命盘</span>
                  </CardTitle>
                  <CardDescription>
                    根据出生时间推算的八字信息
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Chart Image */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted/50 border border-border flex items-center justify-center">
                    <img
                      src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/13/1690dbd2-9be3-4e5e-b7cb-a7d732c7e27a.png"
                      alt="八字命盘"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Chart Details */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded bg-muted/50 text-center">
                        <p className="text-xs text-muted-foreground">年柱</p>
                        <p className="text-sm font-semibold">庚午</p>
                      </div>
                      <div className="p-2 rounded bg-muted/50 text-center">
                        <p className="text-xs text-muted-foreground">月柱</p>
                        <p className="text-sm font-semibold">丙寅</p>
                      </div>
                      <div className="p-2 rounded bg-muted/50 text-center">
                        <p className="text-xs text-muted-foreground">日柱</p>
                        <p className="text-sm font-semibold">戊申</p>
                      </div>
                      <div className="p-2 rounded bg-muted/50 text-center">
                        <p className="text-xs text-muted-foreground">时柱</p>
                        <p className="text-sm font-semibold">甲巳</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                    <p className="text-xs font-semibold text-primary">命格特点</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 强大的意志力和进取心</li>
                      <li>• 在事业上有较强的竞争意识</li>
                      <li>• 与他人合作时可能出现摩擦</li>
                    </ul>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SafeIcon name="Grid3x3" className="h-5 w-5 text-primary" />
                    <span>八字命盘</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="text-center space-y-2">
                      <p className="text-lg font-semibold text-muted-foreground">等待中</p>
                      <p className="text-sm text-muted-foreground">
                        您还没有验证过真实命盘，开始排盘来确定您的准确出生时辰
                      </p>
                    </div>
                    <Button
                      className="bg-mystical-gradient hover:opacity-90"
                      asChild
                    >
                      <a href="./page-979338.html">
                        <SafeIcon name="Sparkles" className="h-4 w-4 mr-2" />
                        开始排盘
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </Card>

          {/* Ziwei Chart */}
          <Card className="glass-card border-accent/20">
            {hasVerifiedChart ? (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SafeIcon name="Compass" className="h-5 w-5 text-accent" />
                    <span>紫薇命盘</span>
                  </CardTitle>
                  <CardDescription>
                    紫薇斗数推算的命宫和宫位分析
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Chart Image */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted/50 border border-border flex items-center justify-center">
                    <img
                      src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/13/698010aa-0b2c-43ad-b171-24d0034f8c4e.png"
                      alt="紫薇命盘"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Palace Info */}
                  <div className="space-y-2">
                    <div className="p-3 rounded bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">命宫主星</p>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-accent/20 text-accent border-accent/30">天府</Badge>
                        <Badge variant="outline">紫微</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 space-y-2">
                    <p className="text-xs font-semibold text-accent">宫位特点</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 命宫天府，财富与领导力并存</li>
                      <li>• 受到陀罗干扰，需谨慎扩张</li>
                      <li>• 适宜稳健发展，避免激进决策</li>
                    </ul>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SafeIcon name="Compass" className="h-5 w-5 text-accent" />
                    <span>紫薇命盘</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="text-center space-y-2">
                      <p className="text-lg font-semibold text-muted-foreground">等待中</p>
                      <p className="text-sm text-muted-foreground">
                        完成八字排盘后，紫薇命盘将自动生成
                      </p>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>

        {/* Action Section - Only show when no verified chart */}
        {!hasVerifiedChart && (
          <Card className="glass-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">开始您的命盘之旅</h3>
                  <p className="text-sm text-muted-foreground">
                    通过AI三方分析初步确认您的准确出生时辰，建立您的个人命盘库
                  </p>
                </div>
                <Button
                  className="bg-mystical-gradient hover:opacity-90 whitespace-nowrap"
                  asChild
                >
                  <a href="./page-979338.html">
                    <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                    开始排盘
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Update Section - Only show when chart is verified */}
        {hasVerifiedChart && (
          <Card className="glass-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">需要更新或重新验证命盘？</h3>
                  <p className="text-sm text-muted-foreground">
                    前往验证真命盘页面，通过AI三方分析确认最准确的出生时辰
                  </p>
                </div>
                <Button
                  className="bg-mystical-gradient hover:opacity-90 whitespace-nowrap"
                  asChild
                >
                  <a href="./page-979338.html">
                    <SafeIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                    验证真命盘
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Banner */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
          <div className="flex items-start space-x-3">
            <SafeIcon name="Info" className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>提示：</strong>您的真命盘已与所有相关页面同步。在同命匹配、灵友圈等社交功能中，其他用户将看到您已验证的命盘信息。
              </p>
              <p>
                如果您对出生时辰有疑问，建议前往验证真命盘页面进行三方AI分析，以获得最准确的结果。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
