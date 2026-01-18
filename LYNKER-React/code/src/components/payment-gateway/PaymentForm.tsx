
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import type { PaymentOrderModel } from '@/data/order';

interface PaymentFormProps {
  selectedMethod: string;
  order: PaymentOrderModel;
  isProcessing: boolean;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

export default function PaymentForm({
  selectedMethod,
  order,
  isProcessing,
  onSubmit,
  onCancel,
}: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
      if (!formData.cardholderName.trim()) {
        errors.cardholderName = '请输入持卡人姓名';
      }
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = '请输入卡号';
      } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = '卡号格式不正确';
      }
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = '请输入有效期';
      }
      if (!formData.cvv.trim()) {
        errors.cvv = '请输入CVV';
      }
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = '请同意服务条款';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // WeChat/Alipay QR Code Display
  if (selectedMethod === 'wechat' || selectedMethod === 'alipay') {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedMethod === 'wechat' ? '微信支付' : '支付宝支付'}
          </CardTitle>
          <CardDescription>
            使用手机扫描二维码完成支付
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Code Placeholder */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
              <div className="text-center space-y-2">
                <SafeIcon name="QrCode" className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {selectedMethod === 'wechat' ? '微信' : '支付宝'}支付二维码
                </p>
                <p className="text-xs text-muted-foreground">
                  金额: ¥{order.amount}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <Alert>
              <SafeIcon name="Info" className="h-4 w-4" />
              <AlertDescription className="text-sm">
                请使用{selectedMethod === 'wechat' ? '微信' : '支付宝'}应用扫描上方二维码，按照提示完成支付。支付完成后请勿关闭此页面。
              </AlertDescription>
            </Alert>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
              }
            />
            <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
              我已阅读并同意
              <a href="#" className="text-primary hover:underline ml-1">
                服务条款
              </a>
              和
              <a href="#" className="text-primary hover:underline ml-1">
                隐私政策
              </a>
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={isProcessing}
            >
              取消
            </Button>
            <Button
              className="flex-1 bg-mystical-gradient hover:opacity-90"
              onClick={handleSubmit}
              disabled={isProcessing || !formData.agreeTerms}
            >
              {isProcessing ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <SafeIcon name="Check" className="w-4 h-4 mr-2" />
                  确认支付
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Credit Card Form
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg">信用卡/借记卡支付</CardTitle>
        <CardDescription>
          输入您的卡片信息以完成支付
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardholderName">持卡人姓名</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="JOHN DOE"
              value={formData.cardholderName}
              onChange={handleInputChange}
              disabled={isProcessing}
              className={formErrors.cardholderName ? 'border-destructive' : ''}
            />
            {formErrors.cardholderName && (
              <p className="text-xs text-destructive">{formErrors.cardholderName}</p>
            )}
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">卡号</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
              disabled={isProcessing}
              className={formErrors.cardNumber ? 'border-destructive' : ''}
            />
            {formErrors.cardNumber && (
              <p className="text-xs text-destructive">{formErrors.cardNumber}</p>
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">有效期 (MM/YY)</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="12/25"
                value={formData.expiryDate}
                onChange={handleInputChange}
                disabled={isProcessing}
                className={formErrors.expiryDate ? 'border-destructive' : ''}
              />
              {formErrors.expiryDate && (
                <p className="text-xs text-destructive">{formErrors.expiryDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                type="password"
                value={formData.cvv}
                onChange={handleInputChange}
                disabled={isProcessing}
                className={formErrors.cvv ? 'border-destructive' : ''}
              />
              {formErrors.cvv && (
                <p className="text-xs text-destructive">{formErrors.cvv}</p>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <Alert>
            <SafeIcon name="Shield" className="h-4 w-4" />
            <AlertDescription className="text-sm">
              您的卡片信息通过256位SSL加密传输，我们不会存储您的完整卡号。
            </AlertDescription>
          </Alert>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
              }
              disabled={isProcessing}
            />
            <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
              我已阅读并同意
              <a href="#" className="text-primary hover:underline ml-1">
                服务条款
              </a>
              和
              <a href="#" className="text-primary hover:underline ml-1">
                隐私政策
              </a>
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={isProcessing}
            >
              取消
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-mystical-gradient hover:opacity-90"
              disabled={isProcessing || !formData.agreeTerms}
            >
              {isProcessing ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <SafeIcon name="Check" className="w-4 h-4 mr-2" />
                  确认支付 ¥{order.amount}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
