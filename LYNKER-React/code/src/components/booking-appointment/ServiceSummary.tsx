
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { MasterSummaryModel } from '@/data/user';
import type { ServiceOfferedModel } from '@/data/service';

interface ServiceSummaryProps {
  master: MasterSummaryModel;
  service: ServiceOfferedModel;
  selectedDate: string | null;
  selectedTime: string | null;
}

export default function ServiceSummary({
  master,
  service,
  selectedDate,
  selectedTime,
}: ServiceSummaryProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  return (
    <Card className="glass-card sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">预约摘要</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service Details */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">命理师</p>
            <p className="font-semibold text-sm">{master.alias}</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-1">服务项目</p>
            <p className="font-semibold text-sm">{service.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {service.description}
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-1">服务类型</p>
            <Badge variant="secondary" className="text-xs">
              {service.type}
            </Badge>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-1">咨询时长</p>
            <div className="flex items-center space-x-1 text-sm font-semibold">
              <SafeIcon name="Clock" className="w-4 h-4" />
              <span>{service.durationMinutes}分钟</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Selected DateTime */}
        {selectedDate && selectedTime && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <p className="text-xs text-muted-foreground">预约时间</p>
            <div className="flex items-center space-x-2 text-sm font-semibold">
              <SafeIcon name="Calendar" className="w-4 h-4 text-accent" />
              <span>{formatDate(selectedDate)} {selectedTime}</span>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2 bg-muted/50 rounded-lg p-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">咨询费用</span>
            <span className="font-semibold">¥{service.priceMin}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">平台服务费</span>
            <span className="font-semibold">¥0</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-bold">
            <span>合计</span>
            <span className="text-accent text-lg">¥{service.priceMin}</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 space-y-2">
          <div className="flex items-start space-x-2">
            <SafeIcon name="Info" className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-foreground/80 space-y-1">
              <p>• 支付后预约即时生效</p>
              <p>• 支持多种支付方式</p>
              <p>• 24小时内可申请退款</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
