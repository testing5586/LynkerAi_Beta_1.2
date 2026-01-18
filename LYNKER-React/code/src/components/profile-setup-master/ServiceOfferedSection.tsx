
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_SERVICES_OFFERED } from '@/data/service';

interface Service {
  id: string;
  type: string;
  name: string;
  duration: number;
  price: number;
  enabled: boolean;
}

interface ServiceOfferedSectionProps {
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

export default function ServiceOfferedSection({
  services,
  onServicesChange,
}: ServiceOfferedSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Service | null>(null);

  const handleToggleService = (id: string) => {
    onServicesChange(
      services.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleEditStart = (service: Service) => {
    setEditingId(service.id);
    setEditData({ ...service });
  };

  const handleEditSave = () => {
    if (!editData) return;
    onServicesChange(
      services.map((s) => (s.id === editData.id ? editData : s))
    );
    setEditingId(null);
    setEditData(null);
  };

  const handleAddService = () => {
    const newService: Service = {
      id: `sv_${Date.now()}`,
      type: '八字',
      name: '新服务',
      duration: 60,
      price: 500,
      enabled: true,
    };
    onServicesChange([...services, newService]);
  };

  const handleDeleteService = (id: string) => {
    onServicesChange(services.filter((s) => s.id !== id));
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="Briefcase" className="w-5 h-5" />
              <span>服务项目</span>
            </CardTitle>
            <CardDescription>管理您提供的命理服务项目</CardDescription>
          </div>
          <Button
            onClick={handleAddService}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <SafeIcon name="Plus" className="w-4 h-4" />
            添加服务
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <SafeIcon name="AlertCircle" className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>还没有添加任何服务项目</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-lg border border-muted hover:border-primary/50 transition-colors"
              >
                {editingId === service.id && editData ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">服务名称</Label>
                        <Input
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">服务类型</Label>
                        <select
                          value={editData.type}
                          onChange={(e) =>
                            setEditData({ ...editData, type: e.target.value })
                          }
                          className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="八字">八字</option>
                          <option value="紫微">紫微</option>
                          <option value="占星术">占星术</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">时长（分钟）</Label>
                        <Input
                          type="number"
                          value={editData.duration}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              duration: parseInt(e.target.value),
                            })
                          }
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">价格（元）</Label>
                        <Input
                          type="number"
                          value={editData.price}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              price: parseInt(e.target.value),
                            })
                          }
                          className="h-9"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        取消
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleEditSave}
                        className="bg-accent hover:bg-accent/90"
                      >
                        保存
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {service.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <SafeIcon name="Clock" className="w-4 h-4" />
                          <span>{service.duration} 分钟</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon name="DollarSign" className="w-4 h-4" />
                          <span>¥{service.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={service.enabled}
                          onCheckedChange={() => handleToggleService(service.id)}
                        />
                        <span className="text-xs text-muted-foreground">
                          {service.enabled ? '启用' : '禁用'}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditStart(service)}
                      >
                        <SafeIcon name="Edit2" className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <SafeIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
