
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import MasterStudioForm from './MasterStudioForm';
import AvailabilitySchedule from './AvailabilitySchedule';
import ServiceManagement from './ServiceManagement';

// Mock data for master studio
const mockStudioData = {
  studioName: '灵客命理工作室',
  introduction: '专业八字、紫微、占星命理分析，致力于帮助每位客户找到人生方向。拥有15年命理实践经验，已服务超过5000位客户。',
  specialties: ['八字命理', '紫微斗数', '西方占星'],
  experience: '15年',
  clientCount: 5000,
  rating: 4.8,
  reviewCount: 328,
  profileImage: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
  bio: '资深命理师，致力于用科学的方法解读命理。',
};

const mockServices = [
  {
    id: 'sv001',
    type: '八字',
    name: '八字终身运势精批',
    durationMinutes: 90,
    priceMin: 800,
    description: '深入分析大运流年，涵盖事业、财运、婚姻、健康。',
  },
  {
    id: 'sv002',
    type: '紫微',
    name: '紫微星盘婚姻详论',
    durationMinutes: 60,
    priceMin: 650,
    description: '重点解读夫妻宫、子女宫，提供情感指导。',
  },
  {
    id: 'sv003',
    type: '占星术',
    name: '西方本命盘解读与指导',
    durationMinutes: 45,
    priceMin: 480,
    description: '针对出生盘的相位和宫位进行天赋和挑战分析。',
  },
];

const mockSchedule = [
  { day: '周一', startTime: '09:00', endTime: '18:00', isAvailable: true },
  { day: '周二', startTime: '09:00', endTime: '18:00', isAvailable: true },
  { day: '周三', startTime: '09:00', endTime: '18:00', isAvailable: true },
  { day: '周四', startTime: '09:00', endTime: '18:00', isAvailable: true },
  { day: '周五', startTime: '09:00', endTime: '18:00', isAvailable: true },
  { day: '周六', startTime: '10:00', endTime: '17:00', isAvailable: true },
  { day: '周日', startTime: '10:00', endTime: '17:00', isAvailable: false },
];

export default function MasterStudioManagement() {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">工作室管理</h1>
            <p className="text-muted-foreground">编辑和管理您的工作室信息、服务项目和可用时间</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2"
          >
            <a href="./master-backend-overview.html">
              <SafeIcon name="ArrowLeft" className="h-4 w-4" />
              返回后台概览
            </a>
          </Button>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-500">
              工作室信息已成功保存并同步到公开档案
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="gap-2">
              <SafeIcon name="User" className="h-4 w-4" />
              <span className="hidden sm:inline">基本信息</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <SafeIcon name="Briefcase" className="h-4 w-4" />
              <span className="hidden sm:inline">服务项目</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <SafeIcon name="Calendar" className="h-4 w-4" />
              <span className="hidden sm:inline">可用时间</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <MasterStudioForm initialData={mockStudioData} />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <ServiceManagement initialServices={mockServices} />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <AvailabilitySchedule initialSchedule={mockSchedule} />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <Button
            variant="outline"
            asChild
          >
            <a href="./master-profile.html">取消</a>
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-mystical-gradient hover:opacity-90 gap-2"
          >
            {isSaving ? (
              <>
                <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <SafeIcon name="Save" className="h-4 w-4" />
                保存并同步
              </>
            )}
          </Button>
        </div>

        {/* Info Card */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="Info" className="h-5 w-5 text-accent" />
              提示
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• 保存后，您的工作室信息将立即同步到公开档案页面</p>
            <p>• 客户可以通过您的公开档案查看服务项目和可用时间</p>
            <p>• 修改可用时间表不会影响已确认的预约</p>
            <p>• 建议定期更新工作室介绍和服务项目以吸引更多客户</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
