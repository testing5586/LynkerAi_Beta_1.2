
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface PaymentSettingsProps {
  isPremium: boolean;
  provider: string;
}

const plans = [
  {
    name: '免费版',
    price: '¥0',
    period: '永久',
    description: '适合个人用户',
    features: [
      '基础AI对话',
      '每月 10,000 tokens',
      '单一AI提供商',
      '基础语音输入',
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
    name: '高级版',
    price: '¥99',
    period: '每月',
    description: '适合专业用户',
    features: [
      '无限AI对话',
      '每月 1,000,000 tokens',
      '多个AI提供商',
      '高级语音输入',
      '优先支持',
      '自定义提示词',
      '高级分析工具',
    ],
    limitations: [],
    current: false,
    recommended: true,
  },
  {
    name: '企业版',
    price: '¥999',
    period: '每月',
    description: '适合团队和企业',
    features: [
      '无限一切',
      '专属账户管理',
      '团队协作功能',
      'API访问',
      '自定义集成',
      '24/7 专业支持',
      '数据分析报告',
    ],
    limitations: [],
    current: false,
  },
];

export default function PaymentSettings({
  isPremium,
  provider,
}: PaymentSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className={isPremium ? 'border-accent bg-accent/5' : ''}>
        <CardHeader>
          <CardTitle>当前订阅</CardTitle>
          <CardDescription>
            您的当前订阅计划和使用情况
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-semibold">
                {isPremium ? '高级版' : '免费版'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isPremium ? '每月 ¥99' : '永久免费'}
              </p>
            </div>
            <Badge className={isPremium ? 'bg-accent text-accent-foreground' : ''}>
              {isPremium ? '活跃' : '当前计划'}
            </Badge>
          </div>

          {/* Usage Stats */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">本月使用情况</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">API Tokens</span>
                <span className="font-semibold">8,500 / 10,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-mystical-gradient h-2 rounded-full"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </div>

          {/* Renewal Info */}
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="text-muted-foreground">
              下次续费日期：<span className="font-semibold">2026-01-15</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Plans */}
      <div>
        <h3 className="text-lg font-semibold mb-4">升级计划</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.recommended ? 'border-accent ring-2 ring-accent/20' : ''
              } ${plan.current ? 'border-primary' : ''}`}
            >
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  推荐
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <SafeIcon name="Check" className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-start gap-2">
                          <SafeIcon name="X" className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Action Button */}
                <Button
                  className={`w-full mt-4 ${
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

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>支付方式</CardTitle>
          <CardDescription>
            管理您的支付方式和账单信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <SafeIcon name="CreditCard" className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Visa 卡</p>
                  <p className="text-xs text-muted-foreground">****1234</p>
                </div>
              </div>
              <Badge variant="outline">默认</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <SafeIcon name="Smartphone" className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">微信支付</p>
                  <p className="text-xs text-muted-foreground">已绑定</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                编辑
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <SafeIcon name="Plus" className="h-4 w-4" />
            添加新支付方式
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>账单历史</CardTitle>
          <CardDescription>
            查看您的账单和交易记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { date: '2025-12-15', amount: '¥99', status: '已支付', plan: '高级版' },
              { date: '2025-11-15', amount: '¥99', status: '已支付', plan: '高级版' },
              { date: '2025-10-15', amount: '¥99', status: '已支付', plan: '高级版' },
            ].map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-sm">{bill.plan}</p>
                  <p className="text-xs text-muted-foreground">{bill.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{bill.amount}</p>
                  <Badge variant="outline" className="text-xs">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            查看完整账单
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="HelpCircle" className="h-4 w-4 text-accent" />
            常见问题
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-1">如何升级我的计划？</p>
            <p className="text-muted-foreground">
              选择您想要的计划，点击"升级到此计划"按钮，按照提示完成支付即可。
            </p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold mb-1">可以随时取消订阅吗？</p>
            <p className="text-muted-foreground">
              是的，您可以随时取消订阅。取消后，您将在当前计费周期结束时降级到免费版。
            </p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold mb-1">如何获得发票？</p>
            <p className="text-muted-foreground">
              所有付款都会自动生成发票，您可以在账单历史中下载。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
