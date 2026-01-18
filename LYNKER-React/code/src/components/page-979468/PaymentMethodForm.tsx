
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface PaymentMethodFormProps {
  onSubmit: (method: any) => void;
  onCancel: () => void;
}

export default function PaymentMethodForm({
  onSubmit,
  onCancel,
}: PaymentMethodFormProps) {
  const [paymentType, setPaymentType] = useState('wechat');
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    wechatId: '',
    alipayId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMethod = {
      id: `payment_${Date.now()}`,
      name: paymentType === 'wechat' ? '微信支付' : paymentType === 'alipay' ? '支付宝' : '信用卡',
      description: `${paymentType === 'wechat' ? '微信账户' : paymentType === 'alipay' ? '支付宝账户' : '****' + formData.cardNumber.slice(-4)}`,
    };

    onSubmit(newMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Type Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">选择支付方式</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'wechat', name: '微信支付', icon: 'Smartphone' },
            { id: 'alipay', name: '支付宝', icon: 'Smartphone' },
            { id: 'card', name: '信用卡', icon: 'CreditCard' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setPaymentType(type.id)}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center space-y-2 ${
                paymentType === type.id
                  ? 'border-primary bg-primary/10'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <SafeIcon name={type.icon} className="h-6 w-6" />
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* WeChat Payment */}
      {paymentType === 'wechat' && (
        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <div>
            <Label htmlFor="wechat-id">微信账户</Label>
            <Input
              id="wechat-id"
              placeholder="输入您的微信账户"
              value={formData.wechatId}
              onChange={(e) =>
                setFormData({ ...formData, wechatId: e.target.value })
              }
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            我们将通过微信支付进行交易，您需要确保微信账户有足够的余额或绑定了银行卡。
          </p>
        </div>
      )}

      {/* Alipay Payment */}
      {paymentType === 'alipay' && (
        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <div>
            <Label htmlFor="alipay-id">支付宝账户</Label>
            <Input
              id="alipay-id"
              placeholder="输入您的支付宝账户（邮箱或手机号）"
              value={formData.alipayId}
              onChange={(e) =>
                setFormData({ ...formData, alipayId: e.target.value })
              }
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            我们将通过支付宝进行交易，您需要确保支付宝账户有足够的余额或绑定了银行卡。
          </p>
        </div>
      )}

      {/* Credit Card Payment */}
      {paymentType === 'card' && (
        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <div>
            <Label htmlFor="cardholder">持卡人姓名</Label>
            <Input
              id="cardholder"
              placeholder="输入持卡人姓名"
              value={formData.cardholderName}
              onChange={(e) =>
                setFormData({ ...formData, cardholderName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="card-number">卡号</Label>
            <Input
              id="card-number"
              placeholder="输入16位卡号"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
              maxLength={16}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">有效期</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="3位数字"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
                maxLength={3}
                required
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            您的信用卡信息已通过 SSL 加密保护，我们不会存储您的完整卡号。
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-3 pt-4 border-t">
        <Button
          type="submit"
          className="flex-1 bg-mystical-gradient hover:opacity-90"
        >
          <SafeIcon name="Check" className="h-4 w-4 mr-2" />
          保存支付方式
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          取消
        </Button>
      </div>
    </form>
  );
}
