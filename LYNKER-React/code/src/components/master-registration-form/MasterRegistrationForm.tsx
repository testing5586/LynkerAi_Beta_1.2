import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import SafeIcon from '@/components/common/SafeIcon';
import BasicInfoStep from './BasicInfoStep';
import ContactStep from './ContactStep';
import ProfessionalStep from './ProfessionalStep';

type RegistrationStep = 'basic' | 'contact' | 'professional';

interface FormData {
  // Basic Info
  realName: string;
  idNumber: string;
  country: string;
  birthDate: string;
  
  // Contact
  phone: string;
  email: string;
  wechatId: string;
  
  // Professional
  specialties: string[];
  serviceTypes: string[];
  yearsOfExperience: string;
  bio: string;
}

const STEPS: { id: RegistrationStep; label: string; icon: string }[] = [
  { id: 'basic', label: '基本信息', icon: 'User' },
  { id: 'contact', label: '联系方式', icon: 'Phone' },
  { id: 'professional', label: '专业领域', icon: 'Briefcase' },
];

export default function MasterRegistrationForm() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('basic');
  const [formData, setFormData] = useState<FormData>({
    realName: '',
    idNumber: '',
    country: 'CN',
    birthDate: '',
    phone: '',
    email: '',
    wechatId: '',
    specialties: [],
    serviceTypes: [],
    yearsOfExperience: '',
    bio: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < STEPS.length) {
        setCurrentStep(STEPS[nextIndex].id);
      }
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'basic') {
      if (!formData.realName.trim()) newErrors.realName = '请输入真实姓名';
      if (!formData.idNumber.trim()) newErrors.idNumber = '请输入身份证号';
      if (!formData.country) newErrors.country = '请选择国籍';
      if (!formData.birthDate) newErrors.birthDate = '请选择出生日期';
    } else if (currentStep === 'contact') {
      if (!formData.phone.trim()) newErrors.phone = '请输入手机号码';
      if (!formData.email.trim()) newErrors.email = '请输入邮箱地址';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '邮箱格式不正确';
      }
      if (!formData.wechatId.trim()) newErrors.wechatId = '请输入微信ID';
    } else if (currentStep === 'professional') {
      if (formData.specialties.length === 0) newErrors.specialties = '请至少选择一个专长';
      if (formData.serviceTypes.length === 0) newErrors.serviceTypes = '请至少选择一种服务类型';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = '请选择从业年限';
      if (!formData.bio.trim()) newErrors.bio = '请填写个人介绍';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to profile setup
      window.location.href = './profile-setup-master.html';
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: '注册失败，请重试' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    window.location.href = './registration-type-selection.html';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="glass-card border-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">命理师注册</CardTitle>
              <CardDescription>
                完成以下步骤成为灵客AI平台的专业命理师
              </CardDescription>
            </div>
            <div className="w-12 h-12 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary">
              <SafeIcon name="GraduationCap" className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                第 {currentStepIndex + 1} 步，共 {STEPS.length} 步
              </span>
              <span className="text-primary font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between gap-2">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  if (index < currentStepIndex) {
                    setCurrentStep(step.id);
                  }
                }}
                className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  step.id === currentStep
                    ? 'bg-primary/20 border border-primary'
                    : index < currentStepIndex
                    ? 'bg-muted/50 border border-muted cursor-pointer hover:bg-muted'
                    : 'bg-muted/30 border border-muted/50'
                }`}
              >
                <SafeIcon
                  name={step.icon}
                  className={`w-4 h-4 ${
                    step.id === currentStep ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span className={`text-xs font-medium ${
                  step.id === currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Form Content */}
          <div className="min-h-[400px]">
            {currentStep === 'basic' && (
              <BasicInfoStep
                data={formData}
                onChange={(updates) => setFormData({ ...formData, ...updates })}
                errors={errors}
              />
            )}
            {currentStep === 'contact' && (
              <ContactStep
                data={formData}
                onChange={(updates) => setFormData({ ...formData, ...updates })}
                errors={errors}
              />
            )}
            {currentStep === 'professional' && (
              <ProfessionalStep
                data={formData}
                onChange={(updates) => setFormData({ ...formData, ...updates })}
                errors={errors}
              />
            )}
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {errors.submit}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={currentStepIndex === 0 ? handleGoBack : handlePrev}
              className="flex-1"
            >
              <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
              {currentStepIndex === 0 ? '返回' : '上一步'}
            </Button>
            
            {currentStepIndex < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-mystical-gradient hover:opacity-90"
              >
                下一步
                <SafeIcon name="ChevronRight" className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-mystical-gradient hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    注册中...
                  </>
                ) : (
                  <>
                    完成注册
                    <SafeIcon name="Check" className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center">
            点击"完成注册"即表示您同意
            <a href="./placeholder.html" className="text-primary hover:underline">
              服务条款
            </a>
            和
            <a href="./placeholder.html" className="text-primary hover:underline">
              隐私政策
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}