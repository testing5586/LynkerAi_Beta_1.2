
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
}

interface PricingSectionProps {
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

export default function PricingSection({
  services,
}: PricingSectionProps) {
  const totalServices = services.length;
  const avgPrice = services.length > 0
    ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length)
    : 0;
  const minPrice = services.length > 0
    ? Math.min(...services.map((s) => s.price))
    : 0;
  const maxPrice = services.length > 0
    ? Math.max(...services.map((s) => s.price))
    : 0;

  return (
    <div className="space-y-6">
      {/* Pricing Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>收费概览</CardTitle>
          <CardDescription>
            您的服务定价统计
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">服务总数</p>
              <p className="text-2xl font-bold">{totalServices}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">平均价格</p>
              <p className="text-2xl font-bold text-accent">¥{avgPrice}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">最低价格</p>
              <p className="text-2xl font-bold">¥{minPrice}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">最高价格</p>
              <p className="text-2xl font-bold">¥{maxPrice}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Pricing Details */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>服务定价详情</CardTitle>
          <CardDescription>
            您所有服务的价格列表
          </CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8">
              <SafeIcon name="Package" className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                还没有添加任何服务，请先在"服务项目"标签页添加
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={service.id}>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{service.name}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          <SafeIcon name="Clock" className="h-3 w-3 mr-1" />
                          {service.duration}分钟
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {service.description}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-accent">
                        ¥{service.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        / 次
                      </p>
                    </div>
                  </div>
                  {index < services.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Tips */}
      <Card className="glass-card border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent" />
            定价建议
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-1">💡 竞争力定价</p>
            <p className="text-muted-foreground">
              根据您的经验和专业领域设置合理的价格，参考平台内其他命理师的定价
            </p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold mb-1">⏱️ 时长与价格</p>
            <p className="text-muted-foreground">
              通常60分钟的咨询价格应该是45分钟的1.5倍左右
            </p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold mb-1">🎯 差异化服务</p>
            <p className="text-muted-foreground">
              提供不同价位的服务选项，满足不同客户的需求
            </p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold mb-1">📊 定期调整</p>
            <p className="text-muted-foreground">
              根据市场反馈和您的知名度定期调整价格
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
