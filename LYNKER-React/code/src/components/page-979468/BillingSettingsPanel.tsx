
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_PAYMENT_METHODS } from '@/data/order';
import PaymentMethodCard from './PaymentMethodCard';
import PaymentMethodForm from './PaymentMethodForm';
import BillingHistory from './BillingHistory';

export default function BillingSettingsPanel() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(MOCK_PAYMENT_METHODS);

  const handleAddPaymentMethod = (method: any) => {
    // In real app, this would call an API
    setPaymentMethods([...paymentMethods, method]);
    setShowAddForm(false);
  };

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
    if (selectedPaymentMethod === id) {
      setSelectedPaymentMethod(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient-mystical mb-2">付款设置</h1>
        <p className="text-muted-foreground">管理您的支付方式和账单信息</p>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="methods">支付方式</TabsTrigger>
          <TabsTrigger value="history">账单历史</TabsTrigger>
        </TabsList>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          {/* Current Payment Methods */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>已保存的支付方式</CardTitle>
                  <CardDescription>
                    您可以添加多个支付方式以便快速结账
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                  添加支付方式
                </Button>
              </div>
            </CardHeader>

            {showAddForm && (
              <>
                <Separator />
                <CardContent className="pt-6">
                  <PaymentMethodForm
                    onSubmit={handleAddPaymentMethod}
                    onCancel={() => setShowAddForm(false)}
                  />
                </CardContent>
              </>
            )}

            <CardContent className="space-y-4">
              {paymentMethods.length === 0 ? (
                <div className="text-center py-8">
                  <SafeIcon name="CreditCard" className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">还没有添加支付方式</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setShowAddForm(true)}
                  >
                    添加第一个支付方式
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedPaymentMethod === method.id}
                      onSelect={() => setSelectedPaymentMethod(method.id)}
                      onDelete={() => handleDeletePaymentMethod(method.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Info" className="h-5 w-5 text-accent" />
                <span>支付信息</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">账户余额</p>
                  <p className="text-2xl font-bold text-gradient-mystical">¥ 2,500.00</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                    充值
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">本月消费</p>
                  <p className="text-2xl font-bold">¥ 1,200.00</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    下次结算日期：2025-12-01
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">支持的支付方式</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center p-3 rounded-lg border border-muted hover:border-primary transition-colors">
                    <SafeIcon name="Smartphone" className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs text-center">微信支付</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-muted hover:border-primary transition-colors">
                    <SafeIcon name="Smartphone" className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs text-center">支付宝</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-muted hover:border-primary transition-colors">
                    <SafeIcon name="CreditCard" className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs text-center">信用卡</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-muted hover:border-primary transition-colors">
                    <SafeIcon name="Banknote" className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs text-center">银行转账</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History Tab */}
        <TabsContent value="history">
          <BillingHistory />
        </TabsContent>
      </Tabs>

      {/* Security Notice */}
      <Card className="glass-card border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-600">
            <SafeIcon name="ShieldAlert" className="h-5 w-5" />
            <span>安全提示</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 您的支付信息已通过 SSL 加密保护</p>
          <p>• 我们不会存储您的完整信用卡信息</p>
          <p>• 所有交易均符合 PCI DSS 标准</p>
          <p>• 如有异常交易，请立即联系客服</p>
        </CardContent>
      </Card>
    </div>
  );
}
