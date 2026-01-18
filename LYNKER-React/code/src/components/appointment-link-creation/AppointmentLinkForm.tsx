
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';
import type { ServiceOfferedModel } from '@/data/service';
import type { TimeSlotModel } from '@/data/appointment';

interface AppointmentLinkFormProps {
  services: ServiceOfferedModel[];
  timeSlots: TimeSlotModel[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AppointmentLinkForm({
  services,
  timeSlots,
  onSubmit,
  onCancel,
}: AppointmentLinkFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    serviceType: '',
    duration: 60,
    price: 0,
    description: '',
    availableSlots: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSlotToggle = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      availableSlots: prev.availableSlots.includes(slot)
        ? prev.availableSlots.filter(s => s !== slot)
        : [...prev.availableSlots, slot],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = '请输入链接标题';
    if (!formData.serviceType) newErrors.serviceType = '请选择服务类型';
    if (formData.price <= 0) newErrors.price = '请输入有效的价格';
    if (formData.availableSlots.length === 0) newErrors.availableSlots = '请至少选择一个可用时间段';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const selectedService = services.find(s => s.serviceId === formData.serviceType);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center space-x-2">
          <SafeIcon name="Info" className="h-4 w-4" />
          <span>基本信息</span>
        </h3>

        <div className="space-y-2">
          <Label htmlFor="title">链接标题 *</Label>
          <Input
            id="title"
            name="title"
            placeholder="例如：八字终身运势精批"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceType">服务类型 *</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
              <SelectTrigger id="serviceType" className={errors.serviceType ? 'border-destructive' : ''}>
                <SelectValue placeholder="选择服务类型" />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service.serviceId} value={service.serviceId}>
                    {service.type} - {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">咨询时长 (分钟)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="15"
              step="15"
              value={formData.duration}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">咨询价格 (RMB) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="50"
            placeholder="0"
            value={formData.price}
            onChange={handleInputChange}
            className={errors.price ? 'border-destructive' : ''}
          />
          {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
          {selectedService && (
            <p className="text-xs text-muted-foreground">
              建议价格范围：¥{selectedService.priceMin} 起
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">服务描述</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="详细描述您的服务内容和特色..."
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center space-x-2">
          <SafeIcon name="Clock" className="h-4 w-4" />
          <span>可用时间段 *</span>
        </h3>

        <div className="space-y-3">
          {timeSlots.map(slot => (
            <Card key={slot.date} className="glass-card p-4">
              <div className="space-y-2">
                <p className="font-medium text-sm">{slot.date}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {slot.slots.map(timeSlot => (
                    <div key={`${slot.date}-${timeSlot.time}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${slot.date}-${timeSlot.time}`}
                        checked={formData.availableSlots.includes(`${slot.date} ${timeSlot.time}`)}
                        onCheckedChange={() => handleSlotToggle(`${slot.date} ${timeSlot.time}`)}
                        disabled={!timeSlot.isAvailable}
                      />
                      <label
                        htmlFor={`${slot.date}-${timeSlot.time}`}
                        className={`text-sm cursor-pointer ${!timeSlot.isAvailable ? 'text-muted-foreground line-through' : ''}`}
                      >
                        {timeSlot.time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {errors.availableSlots && <p className="text-sm text-destructive">{errors.availableSlots}</p>}
      </div>

      {/* Summary */}
      {formData.serviceType && (
        <Card className="glass-card bg-primary/5 border-primary/20 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">服务类型：</span>
              <span className="font-medium">{selectedService?.type} - {selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">咨询时长：</span>
              <span className="font-medium">{formData.duration} 分钟</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">价格：</span>
              <span className="font-medium text-accent">¥{formData.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">可用时间段：</span>
              <span className="font-medium">{formData.availableSlots.length} 个</span>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" className="bg-mystical-gradient hover:opacity-90">
          <SafeIcon name="Check" className="mr-2 h-4 w-4" />
          创建链接
        </Button>
      </div>
    </form>
  );
}
