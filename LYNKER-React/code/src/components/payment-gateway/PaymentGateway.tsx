
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_PAYMENT_ORDER, MOCK_PAYMENT_METHODS } from '@/data/order';
import PaymentOrderSummary from './PaymentOrderSummary';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentForm from './PaymentForm';
import PaymentSecurityInfo from './PaymentSecurityInfo';

type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

export default function PaymentGateway() {
  const [selectedMethod, setSelectedMethod] = useState<string>('wechat');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initialize with mock data
  const order = MOCK_PAYMENT_ORDER;
  const paymentMethods = MOCK_PAYMENT_METHODS;

  const handlePaymentSubmit = async (formData: any) => {
    setIsProcessing(true);
    setErrorMessage('');

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        setPaymentStatus('success');
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = './consultation-room.html';
        }, 2000);
      } else {
        setPaymentStatus('failed');
        setErrorMessage('支付失败，请检查您的支付信息后重试。');
      }
    } catch (error) {
      setPaymentStatus('failed');
      setErrorMessage('支付处理出错，请稍后重试。');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('pending');
    setErrorMessage('');
    setSelectedMethod('wechat');
  };

  const handleCancel = () => {
    window.location.href = './booking-appointment.html';
  };

  // Success State
  if (paymentStatus === 'success') {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Card className="glass-card border-accent/50">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Success Icon */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                  <SafeIcon name="CheckCircle" className="w-12 h-12 text-green-500" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">支付成功！</h2>
                <p className="text-muted-foreground">
                  您的订单已确认，正在为您跳转到咨询室...
                </p>
              </div>

              {/* Order Details */}
              <Card className="w-full bg-muted/30 border-0">
                <CardContent className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">订单号：</span>
                    <span className="font-mono">{order.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">支付金额：</span>
                    <span className="font-semibold">¥{order.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">支付方式：</span>
                    <span>{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Loading Indicator */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>正在跳转...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Failed State
  if (paymentStatus === 'failed') {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Card className="glass-card border-destructive/50">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Error Icon */}
              <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
                <SafeIcon name="AlertCircle" className="w-12 h-12 text-destructive" />
              </div>

              {/* Error Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">支付失败</h2>
                <p className="text-muted-foreground">{errorMessage}</p>
              </div>

              {/* Troubleshooting Tips */}
              <Alert variant="destructive" className="text-left">
                <SafeIcon name="AlertTriangle" className="h-4 w-4" />
                <AlertTitle>可能的原因</AlertTitle>
                <AlertDescription className="mt-2 space-y-1 text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li>支付信息输入错误</li>
                    <li>账户余额不足</li>
                    <li>网络连接不稳定</li>
                    <li>支付方式暂时不可用</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  返回预约
                </Button>
                <Button
                  className="flex-1 bg-mystical-gradient hover:opacity-90"
                  onClick={handleRetry}
                >
                  重新支付
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pending/Processing State
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Summary */}
        <div className="lg:col-span-1">
          <PaymentOrderSummary order={order} />
          <PaymentSecurityInfo className="mt-6" />
        </div>

        {/* Right Column - Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">完成支付</h1>
            <p className="text-muted-foreground">
              选择您喜欢的支付方式，安全快速地完成交易
            </p>
          </div>

          {/* Payment Methods */}
          <PaymentMethodSelector
            methods={paymentMethods}
            selectedMethod={selectedMethod}
            onMethodChange={setSelectedMethod}
          />

          {/* Payment Form */}
          <PaymentForm
            selectedMethod={selectedMethod}
            order={order}
            isProcessing={isProcessing}
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancel}
          />

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <SafeIcon name="Shield" className="w-4 h-4 text-green-500" />
              <span>256位SSL加密</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <SafeIcon name="Lock" className="w-4 h-4 text-green-500" />
              <span>安全支付保障</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <SafeIcon name="CheckCircle" className="w-4 h-4 text-green-500" />
              <span>PCI DSS认证</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
