
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';
import type { MasterProfileModel } from '@/data/user';

interface ServiceManagementProps {
  masterProfile: MasterProfileModel;
  onSave: () => Promise<void>;
}

export default function ServiceManagement({ masterProfile, onSave }: ServiceManagementProps) {
  const [services, setServices] = useState(masterProfile.services);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '八字',
    duration: 60,
    price: 800,
    description: '',
  });

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      name: '',
      type: '八字',
      duration: 60,
      price: 800,
      description: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      type: service.type,
      duration: service.durationMinutes,
      price: service.priceMin,
      description: service.description,
    });
    setIsDialogOpen(true);
  };

  const handleSaveService = async () => {
    if (editingService) {
      setServices(services.map(s => s.serviceId === editingService.serviceId ? { ...s, ...formData } : s));
    } else {
      setServices([...services, { serviceId: `sv_${Date.now()}`, ...formData }]);
    }
    setIsDialogOpen(false);
    await onSave();
  };

  const handleDeleteService = async (serviceId: string) => {
    setServices(services.filter(s => s.serviceId !== serviceId));
    await onSave();
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>服务项目管理</CardTitle>
            <CardDescription>添加和管理您提供的命理服务</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddService} className="bg-mystical-gradient hover:opacity-90">
                <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
                添加服务
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
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
                  <Label htmlFor="name">服务名称</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例如：八字终身运势精批"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">服务类型</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option>八字</option>
                    <option>紫微</option>
                    <option>占星术</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">时长（分钟）</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">价格（元）</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">服务描述</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="详细描述此服务的内容"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSaveService} className="bg-mystical-gradient hover:opacity-90">
                    保存
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <SafeIcon name="Package" className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>还没有添加任何服务</p>
              </div>
            ) : (
              services.map((service) => (
                <div
                  key={service.serviceId}
                  className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-card/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{service.name}</h4>
                      <Badge variant="secondary">{service.type}</Badge>
                      {service.isPopular && (
                        <Badge className="bg-accent text-accent-foreground">
                          <SafeIcon name="Flame" className="h-3 w-3 mr-1" />
                          热门
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1">
                        <SafeIcon name="Clock" className="h-4 w-4" />
                        <span>{service.durationMinutes}分钟</span>
                      </span>
                      <span className="flex items-center space-x-1 text-accent font-semibold">
                        <SafeIcon name="DollarSign" className="h-4 w-4" />
                        <span>{service.priceMin}元起</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditService(service)}
                    >
                      <SafeIcon name="Edit" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteService(service.serviceId)}
                    >
                      <SafeIcon name="Trash" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
