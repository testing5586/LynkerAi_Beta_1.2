
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import SafeIcon from '@/components/common/SafeIcon';

interface UpgradeOptionsProps {
  selectedProvider: string;
}

const UPGRADE_PLANS = [
  {
    name: '免费版',
    price: '¥0',
    period: '永久',
    description: '适合初级用户',
    features: [
      '基础AI对话',
      '每月1000 tokens',
      '标准响应速度',
      '社区支持',
    ],
    limitations: [
      '无优先支持',
      '无高级功能',
      '无自定义模型',
    ],
    current: true,
  },
  {
    name: '专业版',
    price: '¥99',
    period: '每月',
    description: '适合活跃用户',
    features: [
      '高级AI对话',
      '每月50000 tokens',
      '优先响应速度',
      '邮件支持',
      '自定义提示词',
      '高级分析工具',
    ],
    limitations: [
      '无电话支持',
      '无专属账户经理',
    ],
    current: false,
  },
  {
    name: '企业版',
    price: '¥999',
    period: '每月',
    description: '适合专业机构',
    features: [
      '企业级AI对话',
      '无限 tokens',
      '最快响应速度',
      '24/7 电话支持',
      '完全自定义',
      '专属账户经理',
      'API接口',
      '数据分析报告',
    ],
    limitations: [],
    current: false,
  },
];

export default function UpgradeOptions({ selectedProvider }: UpgradeOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Current Plan Info */}
      <Card className="glass-card border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
            当前订阅
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">当前计划：</span>
              <span className="font-semibold text-foreground">免费版</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Token余额：</span>
              <span className="font-semibold text-foreground">850 / 1000</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">重置日期：</span>
              <span className="font-semibold text-foreground">2025年12月1日</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">升级您的AI助手</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UPGRADE_PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`glass-card flex flex-col transition-all ${
                plan.current
                  ? 'border-primary ring-2 ring-primary/50 shadow-lg'
                  : 'hover:border-primary/50'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {plan.description}
                    </CardDescription>
                  </div>
                  {plan.current && (
                    <Badge className="bg-primary text-primary-foreground">
                      当前
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gradient-mystical">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Features */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-semibold text-foreground">包含功能</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-6 pb-6 border-t">
                    <h4 className="text-sm font-semibold text-foreground mt-4">不包含</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-2 text-sm">
                          <SafeIcon name="X" className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  className={`w-full mt-auto ${
                    plan.current
                      ? 'bg-muted text-muted-foreground cursor-default'
                      : 'bg-mystical-gradient hover:opacity-90'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? '当前计划' : '升级到此计划'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Table" className="h-5 w-5 text-accent" />
            详细对比
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">功能</th>
                  <th className="text-center py-3 px-4 font-semibold">免费版</th>
                  <th className="text-center py-3 px-4 font-semibold">专业版</th>
                  <th className="text-center py-3 px-4 font-semibold">企业版</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'AI对话', free: '✓', pro: '✓', enterprise: '✓' },
                  { feature: '月度Tokens', free: '1K', pro: '50K', enterprise: '无限' },
                  { feature: '响应速度', free: '标准', pro: '优先', enterprise: '最快' },
                  { feature: '自定义提示词', free: '✗', pro: '✓', enterprise: '✓' },
                  { feature: '高级分析', free: '✗', pro: '✓', enterprise: '✓' },
                  { feature: '优先支持', free: '✗', pro: '✓', enterprise: '✓' },
                  { feature: '电话支持', free: '✗', pro: '✗', enterprise: '✓' },
                  { feature: 'API接口', free: '✗', pro: '✗', enterprise: '✓' },
                ].map((row) => (
                  <tr key={row.feature} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{row.feature}</td>
                    <td className="text-center py-3 px-4 text-muted-foreground">
                      {row.free}
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">
                      {row.pro}
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="HelpCircle" className="h-5 w-5 text-accent" />
            常见问题
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">如何升级我的计划？</h4>
            <p className="text-sm text-muted-foreground">
              选择您想要的计划，点击"升级到此计划"按钮，然后按照支付流程完成升级。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">可以随时取消订阅吗？</h4>
            <p className="text-sm text-muted-foreground">
              是的，您可以随时取消订阅。取消后，您将在当前计费周期结束时降级到免费版。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Token是什么？</h4>
            <p className="text-sm text-muted-foreground">
              Token是API调用的计费单位。每个请求都会消耗一定数量的Token。不同的操作消耗不同数量的Token。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">未使用的Token会过期吗？</h4>
            <p className="text-sm text-muted-foreground">
              是的，Token在每个计费周期重置。未使用的Token不会结转到下一个周期。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
