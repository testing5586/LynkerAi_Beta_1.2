
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SafeIcon from '@/components/common/SafeIcon';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
}

interface ServiceItemCardProps {
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

export default function ServiceItemCard({
  services,
  onServicesChange,
}: ServiceItemCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    currency: 'CNY',
  });

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        duration: 60,
        price: 0,
        currency: 'CNY',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveService = () => {
    if (!formData.name || !formData.description || !formData.price) {
      return;
    }

    if (editingService) {
      // Update existing service
      onServicesChange(
        services.map((s) =>
          s.id === editingService.id
            ? { ...s, ...formData }
            : s
        ) as Service[]
      );
    } else {
      // Add new service
      const newService: Service = {
        id: `service_${Date.now()}`,
        name: formData.name || '',
        description: formData.description || '',
        duration: formData.duration || 60,
        price: formData.price || 0,
        currency: formData.currency || 'CNY',
      };
      onServicesChange([...services, newService]);
    }

    setIsDialogOpen(false);
  };

  const handleDeleteService = (id: string) => {
    onServicesChange(services.filter((s) => s.id !== id));
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>服务项目</CardTitle>
            <CardDescription>
              管理您提供的命理咨询服务
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                添加服务
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md glass-card">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? '编辑服务' : '添加新服务'}
                </DialogTitle>
                <DialogDescription>
                  填写服务的详细信息
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-name">服务名称</Label>
                  <Input
                    id="service-name"
                    value={formData.name || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="例如：八字命盘解读"
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-desc">服务描述</Label>
                  <Textarea
                    id="service-desc"
                    value={formData.description || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="描述您的服务内容..."
                    rows={3}
                    className="bg-muted/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-duration">时长（分钟）</Label>
                    <Input
                      id="service-duration"
                      type="number"
                      value={formData.duration || 60}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseInt(e.target.value),
                        })
                      }
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-price">价格</Label>
                    <Input
                      id="service-price"
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      placeholder="0"
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSaveService}
                    className="flex-1 bg-mystical-gradient hover:opacity-90"
                  >
                    {editingService ? '更新' : '添加'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon name="Package" className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">还没有添加任何服务</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="bg-mystical-gradient hover:opacity-90"
            >
              <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
              添加第一个服务
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={service.id}>
                <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{service.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {service.duration}分钟
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-accent">
                        ¥{service.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / 次
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenDialog(service)}
                    >
                      <SafeIcon name="Edit2" className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <SafeIcon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {index < services.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
