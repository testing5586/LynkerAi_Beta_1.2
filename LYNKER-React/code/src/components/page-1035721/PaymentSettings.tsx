
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  isAvailable: boolean;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: '信用卡',
    icon: 'CreditCard',
    description: 'Visa, Mastercard, American Express',
    isAvailable: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'DollarSign',
    description: '国际支付，安全便捷',
    isAvailable: true,
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: 'Smartphone',
    description: '中国用户专用',
    isAvailable: true,
  },
  {
    id: 'alipay',
    name: '支付宝',
    icon: 'Smartphone',
    description: '中国用户专用',
    isAvailable: true,
  },
];

export default function PaymentSettings() {
  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    // In real app, redirect to payment gateway
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="CreditCard" className="h-5 w-5 text-accent" />
            选择支付方式
          </CardTitle>
          <CardDescription>
            选择您偏好的支付方式完成订阅
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  } ${!method.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => method.isAvailable && setSelectedMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} disabled={!method.isAvailable} />
                    <SafeIcon name={method.icon} className="h-5 w-5 text-accent" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                    {!method.isAvailable && (
                      <Badge variant="secondary">即将推出</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Details */}
      {selectedMethod === 'credit-card' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">信用卡信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">持卡人姓名</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">卡号</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">有效期</Label>
                <Input
                  id="card-expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvc">CVV</Label>
                <Input
                  id="card-cvc"
                  placeholder="123"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <SafeIcon name="Lock" className="h-4 w-4 inline mr-2" />
              您的支付信息已加密，我们不会存储您的完整卡号
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'paypal' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">PayPal支付</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <p className="text-sm font-semibold">支付流程</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                <li>点击"立即支付"按钮</li>
                <li>跳转到PayPal登录页面</li>
                <li>使用您的PayPal账户完成支付</li>
                <li>返回灵客AI确认订阅</li>
              </ol>
            </div>
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 text-xs text-muted-foreground">
              <SafeIcon name="Info" className="h-4 w-4 inline mr-2" />
              PayPal支持全球用户，支持多种货币
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'wechat' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">微信支付</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-semibold">扫码支付</p>
              <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <SafeIcon name="QrCode" className="h-24 w-24 text-muted mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">二维码加载中...</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                使用微信扫描二维码完成支付
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'alipay' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">支付宝支付</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-semibold">扫码支付</p>
              <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <SafeIcon name="QrCode" className="h-24 w-24 text-muted mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">二维码加载中...</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                使用支付宝扫描二维码完成支付
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Address */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">账单地址</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">国家/地区</Label>
              <Input
                id="country"
                placeholder="China"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">省份/州</Label>
              <Input
                id="state"
                placeholder="Beijing"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">详细地址</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">城市</Label>
              <Input
                id="city"
                placeholder="Beijing"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal">邮编</Label>
              <Input
                id="postal"
                placeholder="100000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card className="glass-card border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              我已阅读并同意
              <a href="#" className="text-accent hover:underline font-semibold">
                用户协议
              </a>
              和
              <a href="#" className="text-accent hover:underline font-semibold">
                服务条款
              </a>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        className="w-full h-12 bg-mystical-gradient hover:opacity-90 text-lg font-semibold"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <SafeIcon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
            处理中...
          </>
        ) : (
          <>
            <SafeIcon name="CreditCard" className="h-5 w-5 mr-2" />
            立即支付 $20.00
          </>
        )}
      </Button>

      {/* Security Info */}
      <div className="p-4 rounded-lg bg-muted/50 space-y-2">
        <p className="text-sm font-semibold flex items-center gap-2">
          <SafeIcon name="Shield" className="h-4 w-4 text-accent" />
          安全支付保障
        </p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>✓ 所有交易均通过SSL加密传输</li>
          <li>✓ 支持PCI DSS安全标准</li>
          <li>✓ 支付信息不会被存储在我们的服务器上</li>
          <li>✓ 支持退款和纠纷解决</li>
        </ul>
      </div>
    </div>
  );
}
