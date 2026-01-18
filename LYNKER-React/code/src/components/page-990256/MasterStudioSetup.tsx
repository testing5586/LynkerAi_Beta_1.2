
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import SafeIcon from '@/components/common/SafeIcon';
import ServiceItemCard from './ServiceItemCard';
import ScheduleManager from './ScheduleManager';
import PricingSection from './PricingSection';

// Mock data for SSG
const mockMasterData = {
  id: 'master_001',
  name: '李明轩',
  title: '资深八字命理师',
  bio: '专注八字命理研究15年，擅长婚姻、事业、财运分析。已为超过5000位客户提供咨询服务。',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
  specialties: ['八字命理', '紫微斗数', '婚姻咨询', '事业规划'],
  experience: '15年',
  rating: 4.8,
  reviewCount: 328,
  services: [
    {
      id: 'service_1',
      name: '八字命盘解读',
      description: '深度解读您的八字命盘，分析性格、运势、婚姻等方面',
      duration: 60,
      price: 299,
      currency: 'CNY',
    },
    {
      id: 'service_2',
      name: '婚姻匹配分析',
      description: '分析两人八字匹配度，提供婚姻建议',
      duration: 45,
      price: 199,
      currency: 'CNY',
    },
    {
      id: 'service_3',
      name: '事业运势咨询',
      description: '分析事业发展方向，把握机遇',
      duration: 45,
      price: 199,
      currency: 'CNY',
    },
  ],
  schedule: {
    monday: { available: true, slots: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
    tuesday: { available: true, slots: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
    wednesday: { available: true, slots: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
    thursday: { available: false, slots: [] },
    friday: { available: true, slots: ['14:00', '15:00', '16:00', '17:00'] },
    saturday: { available: true, slots: ['10:00', '11:00', '14:00', '15:00'] },
    sunday: { available: false, slots: [] },
  },
  responseTime: '通常在2小时内回复',
  cancellationPolicy: '预约前24小时可免费取消',
};

export default function MasterStudioSetup() {
  const [isClient, setIsClient] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Form state
  const [formData, setFormData] = useState({
    name: mockMasterData.name,
    title: mockMasterData.title,
    bio: mockMasterData.bio,
    specialties: mockMasterData.specialties,
    experience: mockMasterData.experience,
    responseTime: mockMasterData.responseTime,
    cancellationPolicy: mockMasterData.cancellationPolicy,
  });

  const [services, setServices] = useState(mockMasterData.services);
  const [schedule, setSchedule] = useState(mockMasterData.schedule);

  useEffect(() => {
    // SSG state: isClient = True (already set)
    // Hydration: switch to False
    setIsClient(false);
    
    // Client: restore to True after setup
    const timer = requestAnimationFrame(() => {
      setIsClient(true);
    });
    
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSpecialty = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty],
      }));
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('工作室信息已保存！');
      // In real app, would sync with master_profile page
    } catch (error) {
      toast.error('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="container max-w-4xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">工作室设置</h1>
              <p className="text-muted-foreground">
                管理您的公开档案信息，这些信息将同步到您的命理师档案页面
              </p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-mystical-gradient hover:opacity-90"
            >
              {isSaving ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                  保存更改
                </>
              )}
            </Button>
          </div>
          <Separator />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <SafeIcon name="User" className="h-4 w-4" />
              <span className="hidden sm:inline">基本信息</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <SafeIcon name="Briefcase" className="h-4 w-4" />
              <span className="hidden sm:inline">服务项目</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <SafeIcon name="Calendar" className="h-4 w-4" />
              <span className="hidden sm:inline">时间表</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <SafeIcon name="DollarSign" className="h-4 w-4" />
              <span className="hidden sm:inline">收费标准</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>
                  编辑您的个人档案信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">真实姓名</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="输入您的真实姓名"
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Pro命理师必须使用真实姓名
                  </p>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">职称/头衔</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="例如：资深八字命理师"
                    className="bg-muted/50"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">个人介绍</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="介绍您的专业背景、经验和特长..."
                    rows={5}
                    className="bg-muted/50 resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.bio.length}/500 字符
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience">从业年限</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="例如：15年"
                    className="bg-muted/50"
                  />
                </div>

                {/* Specialties */}
                <div className="space-y-3">
                  <Label>专业领域</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => handleRemoveSpecialty(specialty)}
                      >
                        {specialty}
                        <SafeIcon name="X" className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="specialty-input"
                      placeholder="输入专业领域，按Enter添加"
                      className="bg-muted/50"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget;
                          handleAddSpecialty(input.value);
                          input.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Response Time */}
                <div className="space-y-2">
                  <Label htmlFor="responseTime">回复时间</Label>
                  <Input
                    id="responseTime"
                    value={formData.responseTime}
                    onChange={(e) => handleInputChange('responseTime', e.target.value)}
                    placeholder="例如：通常在2小时内回复"
                    className="bg-muted/50"
                  />
                </div>

                {/* Cancellation Policy */}
                <div className="space-y-2">
                  <Label htmlFor="cancellationPolicy">取消政策</Label>
                  <Textarea
                    id="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                    placeholder="说明您的预约取消政策..."
                    rows={3}
                    className="bg-muted/50 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <ServiceItemCard
              services={services}
              onServicesChange={setServices}
            />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <ScheduleManager
              schedule={schedule}
              onScheduleChange={setSchedule}
            />
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <PricingSection
              services={services}
              onServicesChange={setServices}
            />
          </TabsContent>
        </Tabs>

{/* Footer Actions */}
        <div className="mt-8 flex justify-between items-center pt-6 border-t">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => window.location.href = './master-backend-overview.html'}
            >
              取消
            </Button>
            <Button
              onClick={() => window.location.href = './master-profile.html'}
              className="border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              <SafeIcon name="Eye" className="h-4 w-4 mr-2" />
              查看公开档案
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-mystical-gradient hover:opacity-90"
            >
              {isSaving ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                  保存并同步
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
