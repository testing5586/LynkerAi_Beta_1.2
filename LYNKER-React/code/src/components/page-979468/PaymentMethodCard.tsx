
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { PaymentMethodModel } from '@/data/order';

interface PaymentMethodCardProps {
  method: PaymentMethodModel;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function PaymentMethodCard({
  method,
  isSelected,
  onSelect,
  onDelete,
}: PaymentMethodCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-primary bg-primary/5'
          : 'hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {method.logoUrl ? (
              <img
                src={method.logoUrl}
                alt={method.name}
                className="h-10 w-10 object-contain"
              />
            ) : method.iconName ? (
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <SafeIcon name={method.iconName} className="h-6 w-6 text-primary" />
              </div>
            ) : null}
            <div>
              <h4 className="font-semibold text-sm">{method.name}</h4>
              <p className="text-xs text-muted-foreground">{method.description}</p>
            </div>
          </div>
          {isSelected && (
            <Badge className="bg-primary text-primary-foreground">
              <SafeIcon name="Check" className="h-3 w-3 mr-1" />
              默认
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? '已选择' : '选择'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <SafeIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
