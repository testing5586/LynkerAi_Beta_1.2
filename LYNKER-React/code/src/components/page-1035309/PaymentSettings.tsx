
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface PaymentSettingsProps {
  paymentMethod: string
  onPaymentMethodChange: (method: string) => void
  isClient: boolean
}

const PAYMENT_METHODS = [
  {
    id: 'wechat',
    name: '微信支付',
    description: '使用微信钱包进行支付，快速便捷',
    icon: 'Smartphone',
    region: '中国',
    fees: '0%',
  },
  {
    id: 'alipay',
    name: '支付宝',
    description: '使用支付宝账户进行支付',
    icon: 'CreditCard',
    region: '中国',
    fees: '0%',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: '国际信用卡支付，支持全球',
    icon: 'Globe',
    region: '国际',
    fees: '2.9% + $0.30',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'PayPal账户支付，安全可靠',
    icon: 'DollarSign',
    region: '国际',
    fees: '2.9% + $0.30',
  },
]

const PRICING_PLANS = [
  {
    name: '免费版',
    price: '¥0',
    period: '永久',
    features: ['基础API调用', '每月1000 tokens', '社区支持'],
    recommended: false,
  },
  {
    name: '专业版',
    price: '¥99',
    period: '每月',
    features: ['优先API调用', '每月100,000 tokens', '邮件支持', '自定义提示词'],
    recommended: true,
  },
  {
    name: '企业版',
    price: '¥999',
    period: '每月',
    features: ['最高优先级', '无限 tokens', '24/7电话支持', '专属账户经理'],
    recommended: false,
  },
]

export default function PaymentSettings({
  paymentMethod,
  onPaymentMethodChange,
  isClient,
}: PaymentSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>选择支付方式</CardTitle>
          <CardDescription>
            选择最方便的支付方式来升级您的AI助手服务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange} disabled={!isClient}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={method.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <SafeIcon name={method.icon} className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-sm">{method.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {method.region}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                    <p className="text-xs text-muted-foreground">
                      手续费: <span className="font-semibold">{method.fees}</span>
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>订阅计划</CardTitle>
          <CardDescription>
            选择适合您的订阅计划，随时可以升级或降级
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-lg border-2 transition-all ${
                  plan.recommended
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {plan.recommended && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                    推荐
                  </Badge>
                )}

                <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gradient-mystical">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">/{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <SafeIcon name="Check" className="h-4 w-4 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.recommended
                      ? 'bg-mystical-gradient hover:opacity-90'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  disabled={!isClient}
                >
                  {plan.name === '免费版' ? '当前计划' : '升级'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">账单信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">当前订阅</p>
              <p className="font-semibold">免费版</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">下次结算日期</p>
              <p className="font-semibold">-</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">本月使用</p>
              <p className="font-semibold">850 / 1,000 tokens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">剩余额度</p>
              <p className="font-semibold text-accent">150 tokens</p>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-mystical-gradient h-2 rounded-full"
              style={{ width: '85%' }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Security */}
      <Card className="glass-card border-accent/50 bg-accent/10">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Lock" className="h-5 w-5 text-accent" />
            支付安全
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-accent/80">
          <p>✓ 所有支付均通过加密连接进行</p>
          <p>✓ 我们不存储您的完整信用卡信息</p>
          <p>✓ 支持PCI DSS合规标准</p>
          <p>✓ 可随时取消订阅，无隐藏费用</p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">常见问题</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-1">如何升级我的订阅？</p>
            <p className="text-muted-foreground">
              选择您想要的计划，点击升级按钮，选择支付方式完成支付即可。
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">可以随时取消订阅吗？</p>
            <p className="text-muted-foreground">
              是的，您可以随时取消订阅。取消后，您将在当前计费周期结束时失去高级功能。
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">如何获得发票？</p>
            <p className="text-muted-foreground">
              所有支付完成后，您将自动收到电子发票。您也可以在账户设置中下载历史发票。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
