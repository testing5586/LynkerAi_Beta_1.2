
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { PaymentMethodModel } from '@/data/order';

interface PaymentMethodSelectorProps {
  methods: PaymentMethodModel[];
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
}

export default function PaymentMethodSelector({
  methods,
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">选择支付方式</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/10 shadow-lg'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            {/* Selected Indicator */}
            {selectedMethod === method.id && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <SafeIcon name="Check" className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
            )}

            {/* Method Content */}
            <div className="flex items-start space-x-3">
              {/* Logo/Icon */}
              <div className="flex-shrink-0">
                {method.logoUrl ? (
                  <img
                    src={method.logoUrl}
                    alt={method.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <SafeIcon
                      name={method.iconName || 'CreditCard'}
                      className="w-6 h-6 text-muted-foreground"
                    />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-sm">{method.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
