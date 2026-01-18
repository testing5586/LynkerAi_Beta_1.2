
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import type { PaymentOrderModel } from '@/data/order';

interface PaymentOrderSummaryProps {
  order: PaymentOrderModel;
}

export default function PaymentOrderSummary({ order }: PaymentOrderSummaryProps) {
  const { appointment, amount, currency, orderId, creationDate } = order;
  const { master, service, selectedDateTime, price } = appointment;

  return (
    <Card className="glass-card sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">订单摘要</CardTitle>
        <CardDescription className="text-xs">订单号: {orderId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Master Info */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">命理师信息</h4>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
            <img
              src={master.avatarUrl}
              alt={master.alias}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{master.alias}</p>
              <p className="text-xs text-muted-foreground">{master.expertise}</p>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Service Info */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">服务详情</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">服务类型：</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">时长：</span>
              <span className="font-medium">{service.durationMinutes}分钟</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">预约时间：</span>
              <span className="font-medium">{selectedDateTime}</span>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">费用明细</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">服务费：</span>
              <span>¥{price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">平台费：</span>
              <span>¥0</span>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Total */}
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold">应付金额：</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">¥{amount}</div>
              <div className="text-xs text-muted-foreground">{currency}</div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="pt-2">
          <Badge variant="outline" className="w-full justify-center">
            <SafeIcon name="Clock" className="w-3 h-3 mr-1" />
            待支付
          </Badge>
        </div>

        {/* Creation Date */}
        <div className="text-xs text-muted-foreground text-center pt-2">
          创建于 {creationDate}
        </div>
      </CardContent>
    </Card>
  );
}
