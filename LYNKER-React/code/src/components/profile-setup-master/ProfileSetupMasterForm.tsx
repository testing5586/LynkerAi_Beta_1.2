
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';
import { MOCK_SERVICE_TYPES, MOCK_SERVICES_OFFERED } from '@/data/service';
import AvatarUploader from './AvatarUploader';
import AIAssistantSelector from './AIAssistantSelector';
import ServiceOfferedSection from './ServiceOfferedSection';
import AvailabilityScheduler from './AvailabilityScheduler';
import StudioInfoSection from './StudioInfoSection';

interface FormData {
  avatar: string;
  studioName: string;
  serviceIntro: string;
  specialties: string[];
  selectedAI: string;
  apiKey: string;
  services: Array<{
    id: string;
    type: string;
    name: string;
    duration: number;
    price: number;
    enabled: boolean;
  }>;
  availability: {
    monday: { start: string; end: string; enabled: boolean };
    tuesday: { start: string; end: string; enabled: boolean };
    wednesday: { start: string; end: string; enabled: boolean };
    thursday: { start: string; end: string; enabled: boolean };
    friday: { start: string; end: string; enabled: boolean };
    saturday: { start: string; end: string; enabled: boolean };
    sunday: { start: string; end: string; enabled: boolean };
  };
  studioLocation: string;
  studioPhone: string;
  studioEmail: string;
}

const MOCK_FORM_DATA: FormData = {
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
  studioName: '灵慧命理工作室',
  serviceIntro: '专注于八字和紫微斗数的深度解读，为您揭示人生运势的奥秘。',
  specialties: ['八字', '紫微斗数'],
  selectedAI: 'chatgpt',
  apiKey: '',
  services: [
    {
      id: 'sv001',
      type: '八字',
      name: '八字终身运势精批',
      duration: 90,
      price: 800,
      enabled: true,
    },
    {
      id: 'sv002',
      type: '紫微',
      name: '紫微星盘婚姻详论',
      duration: 60,
      price: 650,
      enabled: true,
    },
  ],
  availability: {
    monday: { start: '09:00', end: '18:00', enabled: true },
    tuesday: { start: '09:00', end: '18:00', enabled: true },
    wednesday: { start: '09:00', end: '18:00', enabled: true },
    thursday: { start: '09:00', end: '18:00', enabled: true },
    friday: { start: '09:00', end: '18:00', enabled: true },
    saturday: { start: '10:00', end: '17:00', enabled: true },
    sunday: { start: '10:00', end: '17:00', enabled: false },
  },
  studioLocation: '北京市朝阳区',
  studioPhone: '+86 10 1234 5678',
  studioEmail: 'studio@example.com',
};

export default function ProfileSetupMasterForm() {
  const [formData, setFormData] = useState<FormData>(MOCK_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to master studio management
      window.location.href = './master-studio-management.html';
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm font-medium">基本信息</span>
          </div>
          <div className="w-12 h-0.5 bg-muted" />
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
              2
            </div>
            <span className="text-sm font-medium">服务设置</span>
          </div>
          <div className="w-12 h-0.5 bg-muted" />
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-sm font-medium">AI助手</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="basic" className="flex items-center space-x-2">
            <SafeIcon name="User" className="w-4 h-4" />
            <span>基本信息</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center space-x-2">
            <SafeIcon name="Briefcase" className="w-4 h-4" />
            <span>服务设置</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <SafeIcon name="Sparkles" className="w-4 h-4" />
            <span>AI助手</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          {/* Avatar Section */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Image" className="w-5 h-5" />
                <span>头像设置</span>
              </CardTitle>
              <CardDescription>上传您的真实头像，这将显示在您的公开档案中</CardDescription>
            </CardHeader>
            <CardContent>
              <AvatarUploader
                currentAvatar={formData.avatar}
                onAvatarChange={(avatar) => handleInputChange('avatar', avatar)}
              />
            </CardContent>
          </Card>

          {/* Studio Information */}
          <StudioInfoSection
            studioName={formData.studioName}
            studioLocation={formData.studioLocation}
            studioPhone={formData.studioPhone}
            studioEmail={formData.studioEmail}
            onStudioNameChange={(value) => handleInputChange('studioName', value)}
            onStudioLocationChange={(value) => handleInputChange('studioLocation', value)}
            onStudioPhoneChange={(value) => handleInputChange('studioPhone', value)}
            onStudioEmailChange={(value) => handleInputChange('studioEmail', value)}
          />

          {/* Service Introduction */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="FileText" className="w-5 h-5" />
                <span>服务介绍</span>
              </CardTitle>
              <CardDescription>简要介绍您的服务特色和专业背景</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="serviceIntro" className="text-base font-medium mb-2 block">
                  服务介绍文案
                </Label>
                <Textarea
                  id="serviceIntro"
                  placeholder="例如：专注于八字和紫微斗数的深度解读，为您揭示人生运势的奥秘..."
                  value={formData.serviceIntro}
                  onChange={(e) => handleInputChange('serviceIntro', e.target.value)}
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {formData.serviceIntro.length}/500 字符
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="Star" className="w-5 h-5" />
                <span>专长领域</span>
              </CardTitle>
              <CardDescription>选择您的专业领域</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {MOCK_SERVICE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleSpecialtyToggle(type.name)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.specialties.includes(type.name)
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-muted text-muted-foreground hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <SafeIcon name={type.iconName} className="w-4 h-4" />
                      <span>{type.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Services */}
        <TabsContent value="services" className="space-y-6">
          {/* Availability Schedule */}
          <AvailabilityScheduler
            availability={formData.availability}
            onAvailabilityChange={(day, data) => {
              setFormData((prev) => ({
                ...prev,
                availability: {
                  ...prev.availability,
                  [day]: data,
                },
              }));
            }}
          />

          {/* Services Offered */}
          <ServiceOfferedSection
            services={formData.services}
            onServicesChange={(services) => handleInputChange('services', services)}
          />
        </TabsContent>

        {/* Tab 3: AI Assistant */}
        <TabsContent value="ai" className="space-y-6">
          <Alert className="border-accent/50 bg-accent/5">
            <SafeIcon name="Info" className="h-4 w-4" />
            <AlertDescription>
              选择您偏好的AI助手，用于生成咨询笔记、提醒和分析。您可以随时更改选择。
            </AlertDescription>
          </Alert>

          <AIAssistantSelector
            selectedAI={formData.selectedAI}
            apiKey={formData.apiKey}
            onAIChange={(ai) => handleInputChange('selectedAI', ai)}
            onAPIKeyChange={(key) => handleInputChange('apiKey', key)}
          />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-muted">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="px-8"
        >
          <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
          返回
        </Button>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="px-8 bg-mystical-gradient hover:opacity-90"
        >
          {isLoading ? (
            <>
              <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <SafeIcon name="Check" className="w-4 h-4 mr-2" />
              保存并前往工作室
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
