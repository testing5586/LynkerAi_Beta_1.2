
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface PaymentStepProps {
  data: {
    paymentMethods: string[];
    wechatPayEnabled: boolean;
    internationalPayEnabled: boolean;
    bankInfo?: string;
  };
  onChange: (updates: Partial<typeof data>) => void;
  errors: Record<string, string>;
}

const PAYMENT_METHODS = [
  {
    id: 'wechat',
    label: '微信支付',
    icon: 'MessageCircle',
    description: '中国用户常用支付方式',
    region: 'CN',
  },
  {
    id: 'alipay',
    label: '支付宝',
    icon: 'CreditCard',
    description: '中国用户常用支付方式',
    region: 'CN',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    icon: 'CreditCard',
    description: '国际支付方式',
    region: 'INTL',
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: 'DollarSign',
    description: '国际支付方式',
    region: 'INTL',
  },
];

export default function PaymentStep({
  data,
  onChange,
  errors,
}: PaymentStepProps) {
  const togglePaymentMethod = (id: string) => {
    const updated = data.paymentMethods.includes(id)
      ? data.paymentMethods.filter(m => m !== id)
      : [...data.paymentMethods, id];
    onChange({ paymentMethods: updated });
  };

  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <SafeIcon name="AlertCircle" className="h-4 w-4" />
        <AlertDescription>
          请选择您接受的支付方式。用户将通过这些方式支付咨询费用。
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Payment Methods */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            支付方式 <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.id}
                className="flex items-center space-x-3 p-4 rounded-lg border border-muted hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => togglePaymentMethod(method.id)}
              >
                <Checkbox
                  id={method.id}
                  checked={data.paymentMethods.includes(method.id)}
                  onCheckedChange={() => togglePaymentMethod(method.id)}
                />
                <SafeIcon name={method.icon} className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <Label htmlFor={method.id} className="cursor-pointer font-medium">
                    {method.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <div className="text-xs bg-muted px-2 py-1 rounded">
                  {method.region === 'CN' ? '中国' : '国际'}
                </div>
              </div>
            ))}
          </div>
          {errors.paymentMethods && (
            <p className="text-sm text-destructive">{errors.paymentMethods}</p>
          )}
        </div>

        {/* Payment Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">支付账户配置</h3>

          {/* WeChat Pay */}
          {data.paymentMethods.includes('wechat') && (
            <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">微信支付账户</h4>
                <SafeIcon name="CheckCircle" className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                已使用您之前提供的微信ID进行配置
              </p>
            </div>
          )}

          {/* Alipay */}
          {data.paymentMethods.includes('alipay') && (
            <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
              <h4 className="font-semibold text-sm">支付宝账户</h4>
              <Input
                placeholder="请输入支付宝账户邮箱或手机号"
                className="text-sm"
              />
            </div>
          )}

          {/* Stripe */}
          {data.paymentMethods.includes('stripe') && (
            <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
              <h4 className="font-semibold text-sm">Stripe 账户</h4>
              <p className="text-sm text-muted-foreground mb-2">
                点击下方按钮连接您的Stripe账户
              </p>
              <button className="w-full px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                <SafeIcon name="Link" className="w-4 h-4 inline mr-2" />
                连接Stripe
              </button>
            </div>
          )}

          {/* PayPal */}
          {data.paymentMethods.includes('paypal') && (
            <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
              <h4 className="font-semibold text-sm">PayPal 账户</h4>
              <p className="text-sm text-muted-foreground mb-2">
                点击下方按钮连接您的PayPal账户
              </p>
              <button className="w-full px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                <SafeIcon name="Link" className="w-4 h-4 inline mr-2" />
                连接PayPal
              </button>
            </div>
          )}
        </div>

        {/* Fee Information */}
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <SafeIcon name="Info" className="w-4 h-4 text-accent" />
            费用说明
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>平台服务费</span>
              <span className="text-foreground font-medium">15%</span>
            </div>
            <div className="flex justify-between">
              <span>支付处理费</span>
              <span className="text-foreground font-medium">2-3%</span>
            </div>
            <div className="border-t border-muted pt-2 flex justify-between">
              <span>您将获得</span>
              <span className="text-foreground font-medium">约82-83%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-2">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <SafeIcon name="Shield" className="w-4 h-4 text-primary" />
          安全保障
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
          <li>• 所有支付信息都经过加密处理</li>
          <li>• 符合PCI DSS安全标准</li>
          <li>• 定期进行安全审计</li>
          <li>• 您的账户信息不会被第三方访问</li>
        </ul>
      </div>
    </div>
  );
}
