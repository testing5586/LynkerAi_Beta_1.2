
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import SafeIcon from '@/components/common/SafeIcon';

interface Service {
  id: string;
  type: string;
  name: string;
  durationMinutes: number;
  priceMin: number;
  description: string;
}

interface ServiceManagementProps {
  initialServices: Service[];
}

export default function ServiceManagement({ initialServices }: ServiceManagementProps) {
  const [services, setServices] = useState(initialServices);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    type: '八字',
    name: '',
    durationMinutes: 60,
    priceMin: 500,
    description: '',
  });

  const serviceTypes = ['八字', '紫微', '占星术', '面相', '手相', '风水'];

  const handleAddService = () => {
    if (formData.name && formData.description) {
      const newService: Service = {
        id: `sv${Date.now()}`,
        type: formData.type || '八字',
        name: formData.name,
        durationMinutes: formData.durationMinutes || 60,
        priceMin: formData.priceMin || 500,
        description: formData.description,
      };
      setServices([...services, newService]);
      setFormData({
        type: '八字',
        name: '',
        durationMinutes: 60,
        priceMin: 500,
        description: '',
      });
      setIsAddingService(false);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleEditService = (service: Service) => {
    setFormData(service);
    setEditingId(service.id);
    setIsAddingService(true);
  };

  const handleUpdateService = () => {
    if (editingId && formData.name && formData.description) {
      setServices(services.map(s =>
        s.id === editingId
          ? {
              ...s,
              type: formData.type || s.type,
              name: formData.name,
              durationMinutes: formData.durationMinutes || s.durationMinutes,
              priceMin: formData.priceMin || s.priceMin,
              description: formData.description,
            }
          : s
      ));
      setEditingId(null);
      setFormData({
        type: '八字',
        name: '',
        durationMinutes: 60,
        priceMin: 500,
        description: '',
      });
      setIsAddingService(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'durationMinutes' || name === 'priceMin' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Add Service Button */}
      <div className="flex justify-end">
        <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
          <DialogTrigger asChild>
            <Button className="bg-mystical-gradient hover:opacity-90 gap-2">
              <SafeIcon name="Plus" className="h-4 w-4" />
              添加服务项目
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? '编辑服务项目' : '添加新服务项目'}
              </DialogTitle>
              <DialogDescription>
                填写服务项目的详细信息
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">服务类型</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type || '八字'}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm"
                >
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">服务名称</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleFormChange}
                  placeholder="例：八字终身运势精批"
                  className="bg-muted/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="durationMinutes">时长（分钟）</Label>
                  <Input
                    id="durationMinutes"
                    name="durationMinutes"
                    type="number"
                    value={formData.durationMinutes || 60}
                    onChange={handleFormChange}
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceMin">价格（元）</Label>
                  <Input
                    id="priceMin"
                    name="priceMin"
                    type="number"
                    value={formData.priceMin || 500}
                    onChange={handleFormChange}
                    className="bg-muted/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">服务描述</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleFormChange}
                  placeholder="详细描述此服务的内容和特点"
                  className="bg-muted/50 min-h-[100px] resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingService(false);
                    setEditingId(null);
                    setFormData({
                      type: '八字',
                      name: '',
                      durationMinutes: 60,
                      priceMin: 500,
                      description: '',
                    });
                  }}
                >
                  取消
                </Button>
                <Button
                  onClick={editingId ? handleUpdateService : handleAddService}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  {editingId ? '更新' : '添加'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services List */}
      <div className="grid gap-4">
        {services.length === 0 ? (
          <Card className="glass-card border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <SafeIcon name="Briefcase" className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">还没有添加任何服务项目</p>
              <Button
                variant="outline"
                onClick={() => setIsAddingService(true)}
                className="gap-2"
              >
                <SafeIcon name="Plus" className="h-4 w-4" />
                添加第一个服务
              </Button>
            </CardContent>
          </Card>
        ) : (
          services.map(service => (
            <Card key={service.id} className="glass-card hover:shadow-card transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/20 text-primary border-0">
                        {service.type}
                      </Badge>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
                        <span>{service.durationMinutes}分钟</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SafeIcon name="DollarSign" className="h-4 w-4 text-accent" />
                        <span className="font-semibold text-accent">¥{service.priceMin}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditService(service)}
                      className="gap-2"
                    >
                      <SafeIcon name="Edit" className="h-4 w-4" />
                      编辑
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <SafeIcon name="Trash2" className="h-4 w-4" />
                      删除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Info Card */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Info" className="h-5 w-5 text-accent" />
            服务项目建议
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 建议至少添加3个不同的服务项目以满足不同客户需求</p>
          <p>• 服务名称应清晰明确，让客户一目了然</p>
          <p>• 价格应根据服务时长和复杂度合理设定</p>
          <p>• 详细的服务描述有助于提高客户预约率</p>
        </CardContent>
      </Card>
    </div>
  );
}
