
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_PAYMENT_METHODS } from '@/data/order';

interface PaymentMethod {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  isActive?: boolean;
}

export default function BillingSettings() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentMethods] = useState<PaymentMethod[]>(
    MOCK_PAYMENT_METHODS.map(method => ({
      ...method,
      isActive: method.id === 'wechat' // Default: WeChat is active
    }))
  );

  const activeMethod = paymentMethods.find(m => m.isActive);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient-mystical mb-2">付款设置</h1>
        <p className="text-muted-foreground">
          管理您的支付方式和账单信息
        </p>
      </div>

      {/* Current Payment Method */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="CreditCard" className="h-5 w-5 text-accent" />
            <span>当前支付方式</span>
          </CardTitle>
          <CardDescription>
            您的默认支付方式用于所有订阅和充值
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeMethod ? (
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center space-x-4">
                {activeMethod.logoUrl ? (
                  <img
                    src={activeMethod.logoUrl}
                    alt={activeMethod.name}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <SafeIcon name="Wallet" className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{activeMethod.name}</p>
                  <p className="text-sm text-muted-foreground">{activeMethod.description}</p>
                </div>
              </div>
              <Badge className="bg-accent text-accent-foreground">
                <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                已激活
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <SafeIcon name="AlertCircle" className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">未设置支付方式</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Payment Methods */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Wallet" className="h-5 w-5 text-accent" />
            <span>可用支付方式</span>
          </CardTitle>
          <CardDescription>
            选择您偏好的支付方式。我们支持国际支付和中国本地支付
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id}>
              <button
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {method.logoUrl ? (
                      <img
                        src={method.logoUrl}
                        alt={method.name}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <SafeIcon name="CreditCard" className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedMethod === method.id && (
                      <SafeIcon name="Check" className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Method Details */}
      {selectedMethod && (
        <Card className="glass-card border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="Info" className="h-5 w-5 text-accent" />
              <span>支付方式详情</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedMethod === 'wechat' && (
              <div className="space-y-4">
                <Alert>
                  <SafeIcon name="Shield" className="h-4 w-4" />
                  <AlertTitle>安全提示</AlertTitle>
                  <AlertDescription>
                    微信支付采用最高级别的加密和安全认证，您的账户信息完全受保护。
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">支持的交易类型</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• 订阅续费</li>
                      <li>• Token充值</li>
                      <li>• 命理师预约支付</li>
                      <li>• 高级功能解锁</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">交易限额</p>
                    <p className="text-sm text-muted-foreground">单笔最高 ¥50,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">到账时间</p>
                    <p className="text-sm text-muted-foreground">实时到账</p>
                  </div>
                </div>
              </div>
            )}
            {selectedMethod === 'alipay' && (
              <div className="space-y-4">
                <Alert>
                  <SafeIcon name="Shield" className="h-4 w-4" />
                  <AlertTitle>安全提示</AlertTitle>
                  <AlertDescription>
                    支付宝支付采用业界领先的风控系统，保障您的资金安全。
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">支持的交易类型</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• 订阅续费</li>
                      <li>• Token充值</li>
                      <li>• 命理师预约支付</li>
                      <li>• 高级功能解锁</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">交易限额</p>
                    <p className="text-sm text-muted-foreground">单笔最高 ¥50,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">到账时间</p>
                    <p className="text-sm text-muted-foreground">实时到账</p>
                  </div>
                </div>
              </div>
            )}
            {selectedMethod === 'visa' && (
              <div className="space-y-4">
                <Alert>
                  <SafeIcon name="Shield" className="h-4 w-4" />
                  <AlertTitle>安全提示</AlertTitle>
                  <AlertDescription>
                    国际信用卡支付采用PCI DSS标准加密，支持3D验证。
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">支持的交易类型</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• 订阅续费</li>
                      <li>• Token充值</li>
                      <li>• 命理师预约支付</li>
                      <li>• 高级功能解锁</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">交易限额</p>
                    <p className="text-sm text-muted-foreground">单笔最高 USD $5,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">到账时间</p>
                    <p className="text-sm text-muted-foreground">1-3个工作日</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="History" className="h-5 w-5 text-accent" />
            <span>账单历史</span>
          </CardTitle>
          <CardDescription>
            查看您最近的交易记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                date: '2025-11-12',
                description: 'Token充值 - 10,000 tokens',
                amount: '¥99.00',
                status: '已完成',
                method: '微信支付',
              },
              {
                date: '2025-11-05',
                description: '高级会员订阅续费',
                amount: '¥199.00',
                status: '已完成',
                method: '微信支付',
              },
              {
                date: '2025-10-28',
                description: '命理师预约 - 张大师',
                amount: '¥800.00',
                status: '已完成',
                method: '支付宝',
              },
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex-1">
                  <p className="font-medium text-sm">{bill.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {bill.date} • {bill.method}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{bill.amount}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <SafeIcon name="Download" className="h-4 w-4 mr-2" />
            下载账单
          </Button>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={() => setSelectedMethod(null)}
          variant="outline"
          className="flex-1"
        >
          <SafeIcon name="X" className="h-4 w-4 mr-2" />
          取消
        </Button>
        <Button
          disabled={!selectedMethod}
          className="flex-1 bg-mystical-gradient hover:opacity-90"
        >
          <SafeIcon name="Save" className="h-4 w-4 mr-2" />
          保存支付方式
        </Button>
      </div>
    </div>
  );
}
