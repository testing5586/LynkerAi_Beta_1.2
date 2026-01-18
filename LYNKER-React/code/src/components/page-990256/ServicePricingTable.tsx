
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface ServicePricingTableProps {
  initialServices: Service[];
}

export default function ServicePricingTable({ initialServices }: ServicePricingTableProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    duration: 60,
    price: 0,
  });

  const handleAddService = () => {
    if (formData.name && formData.price) {
      const newService: Service = {
        id: Math.max(...services.map((s) => s.id), 0) + 1,
        name: formData.name,
        description: formData.description || '',
        duration: formData.duration || 60,
        price: formData.price,
      };
      setServices([...services, newService]);
      setFormData({ name: '', description: '', duration: 60, price: 0 });
      setIsAddingService(false);
    }
  };

  const handleUpdateService = () => {
    if (editingId && formData.name && formData.price) {
      setServices(
        services.map((s) =>
          s.id === editingId
            ? {
                ...s,
                name: formData.name,
                description: formData.description || '',
                duration: formData.duration || 60,
                price: formData.price,
              }
            : s
        )
      );
      setEditingId(null);
      setFormData({ name: '', description: '', duration: 60, price: 0 });
    }
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleEditClick = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>服务项目与收费</CardTitle>
            <CardDescription>
              管理您提供的服务项目和相应的收费标准
            </CardDescription>
          </div>
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <Button className="bg-mystical-gradient hover:opacity-90">
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                添加服务
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>添加新服务</DialogTitle>
                <DialogDescription>
                  填写服务项目的详细信息
                </DialogDescription>
              </DialogHeader>
              <ServiceForm
                data={formData}
                onChange={setFormData}
                onSubmit={handleAddService}
                submitLabel="添加服务"
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>服务名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead className="text-right">时长</TableHead>
                <TableHead className="text-right">价格</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {service.description}
                  </TableCell>
                  <TableCell className="text-right">{service.duration}分钟</TableCell>
                  <TableCell className="text-right font-semibold">
                    ¥{service.price}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(service)}
                        >
                          <SafeIcon name="Edit2" className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card">
                        <DialogHeader>
                          <DialogTitle>编辑服务</DialogTitle>
                          <DialogDescription>
                            修改服务项目的信息
                          </DialogDescription>
                        </DialogHeader>
                        <ServiceForm
                          data={formData}
                          onChange={setFormData}
                          onSubmit={handleUpdateService}
                          submitLabel="保存修改"
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <SafeIcon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {services.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <SafeIcon name="Package" className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>还没有添加任何服务项目</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ServiceForm({
  data,
  onChange,
  onSubmit,
  submitLabel,
}: {
  data: Partial<Service>;
  onChange: (data: Partial<Service>) => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="service-name">服务名称</Label>
        <Input
          id="service-name"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="如：八字详解"
          className="bg-muted/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="service-description">服务描述</Label>
        <Textarea
          id="service-description"
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="简要描述此服务的内容"
          className="bg-muted/50 min-h-[100px] resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="service-duration">时长（分钟）</Label>
          <Input
            id="service-duration"
            type="number"
            value={data.duration || 60}
            onChange={(e) => onChange({ ...data, duration: parseInt(e.target.value) })}
            className="bg-muted/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service-price">价格（¥）</Label>
          <Input
            id="service-price"
            type="number"
            value={data.price || 0}
            onChange={(e) => onChange({ ...data, price: parseFloat(e.target.value) })}
            className="bg-muted/50"
          />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full bg-mystical-gradient hover:opacity-90">
        {submitLabel}
      </Button>
    </div>
  );
}
