
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

export default function UpgradeCard() {
  const plans = [
    {
      name: '基础版',
      price: '免费',
      tokens: '10,000',
      features: [
        '基础AI分析',
        '每月10,000 tokens',
        '标准响应速度',
        '社区支持',
      ],
      current: true,
    },
    {
      name: '专业版',
      price: '¥99/月',
      tokens: '100,000',
      features: [
        '高级AI分析',
        '每月100,000 tokens',
        '优先响应速度',
        '邮件支持',
        '自定义提示词',
      ],
      current: false,
    },
    {
      name: '企业版',
      price: '¥299/月',
      tokens: '500,000',
      features: [
        '企业级AI分析',
        '每月500,000 tokens',
        '最快响应速度',
        '24/7专属支持',
        '完全自定义',
        'API访问权限',
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Upgrade CTA */}
      <Card className="glass-card border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
            升级您的套餐
          </CardTitle>
          <CardDescription>
            获得更多Token和高级功能，提升命理体验
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            当前套餐即将用尽，升级可获得更多Token和优先支持。
          </p>
          <Button className="w-full bg-mystical-gradient hover:opacity-90">
            <SafeIcon name="CreditCard" className="h-4 w-4 mr-2" />
            立即升级
          </Button>
        </CardContent>
      </Card>

      {/* Plans Comparison */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>套餐对比</CardTitle>
          <CardDescription>
            选择最适合您的套餐
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  plan.current
                    ? 'border-primary bg-primary/10'
                    : 'border-muted hover:border-muted-foreground/50'
                }`}
              >
                {plan.current && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                    当前套餐
                  </Badge>
                )}

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{plan.name}</h4>
                    <p className="text-2xl font-bold text-primary mt-1">{plan.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {plan.tokens} tokens/月
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs">
                        <SafeIcon name="Check" className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {!plan.current && (
                    <Button variant="outline" className="w-full text-xs h-8">
                      升级到{plan.name}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Token Purchase */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>额外充值</CardTitle>
          <CardDescription>
            按需购买额外的Token
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { tokens: '10,000', price: '¥9.9' },
              { tokens: '50,000', price: '¥39.9' },
              { tokens: '100,000', price: '¥69.9' },
              { tokens: '500,000', price: '¥299.9' },
            ].map((option) => (
              <Button
                key={option.tokens}
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <span className="font-semibold text-sm">{option.tokens}</span>
                <span className="text-xs text-muted-foreground">tokens</span>
                <span className="text-primary font-bold text-sm mt-1">{option.price}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">常见问题</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-medium mb-1">Token如何计算？</p>
            <p className="text-muted-foreground text-xs">
              每次API调用根据输入和输出的文本长度计算Token消耗，通常1个Token约等于4个字符。
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">未使用的Token会过期吗？</p>
            <p className="text-muted-foreground text-xs">
              月度套餐的Token在每月重置日期过期。购买的额外Token永不过期。
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">如何取消升级？</p>
            <p className="text-muted-foreground text-xs">
              您可以随时在账户设置中取消升级，下个计费周期将恢复为基础版。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
