
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import SafeIcon from '@/components/common/SafeIcon';

const upgradePlans = [
  {
    id: 'free',
    name: '免费版',
    price: '¥0',
    period: '永久',
    description: '适合初级用户',
    features: [
      '10,000 tokens/月',
      '基础AI功能',
      '社区支持',
      '标准响应速度',
    ],
    limitations: [
      '无优先支持',
      '无高级功能',
      '无自定义模型',
    ],
    current: true,
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥99',
    period: '月',
    description: '适合专业命理师',
    features: [
      '100,000 tokens/月',
      '所有AI功能',
      '优先支持',
      '快速响应速度',
      '自定义提示词',
      '高级分析工具',
    ],
    limitations: [],
    popular: true,
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '¥999',
    period: '月',
    description: '适合机构和团队',
    features: [
      '无限 tokens',
      '所有AI功能',
      '24/7专属支持',
      '超快响应速度',
      '自定义模型训练',
      '团队管理功能',
      'API接口',
      '数据分析报告',
    ],
    limitations: [],
  },
];

export default function UpgradeOptions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">升级您的AI助手</h2>
        <p className="text-muted-foreground">
          选择适合您的套餐，解锁更多功能和更高的使用限额
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upgradePlans.map((plan) => (
          <Card
            key={plan.id}
            className={`glass-card relative transition-all ${
              plan.popular ? 'ring-2 ring-primary md:scale-105' : ''
            } ${plan.current ? 'opacity-75' : ''}`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">
                  <SafeIcon name="Star" className="h-3 w-3 mr-1" />
                  最受欢迎
                </Badge>
              </div>
            )}

            {/* Current Badge */}
            {plan.current && (
              <div className="absolute -top-3 right-4">
                <Badge variant="secondary">当前套餐</Badge>
              </div>
            )}

            <CardHeader className="space-y-4">
              <div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">包含功能</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <p className="text-xs font-semibold text-muted-foreground">限制</p>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <SafeIcon name="X" className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <Button
                className={`w-full ${
                  plan.current
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : plan.popular
                      ? 'bg-mystical-gradient hover:opacity-90'
                      : ''
                }`}
                disabled={plan.current}
              >
                {plan.current ? (
                  <>
                    <SafeIcon name="Check" className="h-4 w-4 mr-2" />
                    当前套餐
                  </>
                ) : (
                  <>
                    <SafeIcon name="Zap" className="h-4 w-4 mr-2" />
                    升级到{plan.name}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card className="glass-card mt-8">
        <CardHeader>
          <CardTitle>常见问题</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">如何升级我的套餐？</h4>
            <p className="text-sm text-muted-foreground">
              选择您想要的套餐，点击"升级"按钮，按照提示完成支付即可。升级后立即生效。
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">可以随时降级吗？</h4>
            <p className="text-sm text-muted-foreground">
              可以。您可以随时降级到更低的套餐，从下个计费周期开始生效。
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Token用完了怎么办？</h4>
            <p className="text-sm text-muted-foreground">
              您可以购买额外的Token包，或升级到更高的套餐。额外Token不会过期。
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">支持哪些支付方式？</h4>
            <p className="text-sm text-muted-foreground">
              我们支持支付宝、微信支付、银行卡和国际信用卡等多种支付方式。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="glass-card bg-primary/10 border-primary/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <SafeIcon name="MessageCircle" className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h4 className="font-semibold">需要帮助？</h4>
              <p className="text-sm text-muted-foreground">
                如果您对升级选项有任何疑问，请联系我们的客服团队。
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                <SafeIcon name="Mail" className="h-4 w-4 mr-2" />
                联系客服
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
