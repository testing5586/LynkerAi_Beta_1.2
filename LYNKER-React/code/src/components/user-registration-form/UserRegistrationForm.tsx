
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import SafeIcon from '@/components/common/SafeIcon';
import LanguageSelector from './LanguageSelector';
import CountrySelector from './CountrySelector';
import RegistrationProgress from './RegistrationProgress';

interface FormData {
  language: string;
  pseudonym: string;
  email: string;
  country: string;
  birthPlace: string;
  residencePlace: string;
  culture: string;
  religion: string;
}

interface FormErrors {
  [key: string]: string;
}

const LANGUAGES = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'ja', name: '日本語' },
  { code: 'th', name: 'ไทย' },
  { code: 'vi', name: 'Tiếng Việt' },
];

const CULTURES = [
  '汉文化',
  '日本文化',
  '韩国文化',
  '泰国文化',
  '越南文化',
  '西方文化',
  '其他',
];

const RELIGIONS = [
  '无',
  '道教',
  '佛教',
  '基督教',
  '伊斯兰教',
  '其他',
];

export default function UserRegistrationForm() {
const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    language: 'zh',
    pseudonym: '',
    email: '',
    country: '',
    birthPlace: '',
    residencePlace: '',
    culture: '',
    religion: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalSteps = 3;

  // Validate pseudonym
  const validatePseudonym = (value: string): boolean => {
    return value.length >= 5;
  };

  // Validate email
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Handle field changes
  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

if (step === 1) {
      if (!formData.pseudonym.trim()) {
        newErrors.pseudonym = '请输入假名';
      } else if (!validatePseudonym(formData.pseudonym)) {
        newErrors.pseudonym = '假名至少需要5个字';
      }

      if (!formData.email.trim()) {
        newErrors.email = '请输入邮箱地址';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }
    }

    if (step === 2) {
      if (!formData.country) {
        newErrors.country = '请选择国籍';
      }
      if (!formData.birthPlace.trim()) {
        newErrors.birthPlace = '请输入出生地';
      }
      if (!formData.residencePlace.trim()) {
        newErrors.residencePlace = '请输入常驻地';
      }
    }

    if (step === 3) {
      if (!formData.culture) {
        newErrors.culture = '请选择文化背景';
      }
      if (!formData.religion) {
        newErrors.religion = '请选择宗教信仰';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real app, this would be an API call
      console.log('Registration data:', formData);

      // Redirect to profile setup
      window.location.href = './profile-setup-user.html';
    } catch (error) {
      setSubmitError('注册失败，请稍后重试');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLanguageName = (code: string) => {
    return LANGUAGES.find((l) => l.code === code)?.name || '中文';
  };

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex justify-end">
        <LanguageSelector
          currentLanguage={formData.language}
          onLanguageChange={(lang) => handleFieldChange('language', lang)}
        />
      </div>

      {/* Progress Indicator */}
      <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Form Card */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && '账户信息'}
            {currentStep === 2 && '地理信息'}
            {currentStep === 3 && '文化背景'}
          </CardTitle>
<CardDescription>
            {currentStep === 1 && '创建您的账户以开始使用平台'}
            {currentStep === 2 && '告诉我们您的地理位置信息'}
            {currentStep === 3 && '完善您的文化和宗教背景'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Pseudonym */}
                <div className="space-y-2">
                  <Label htmlFor="pseudonym" className="flex items-center space-x-2">
                    <span>假名</span>
                    <span className="text-destructive">*</span>
                    <span className="text-xs text-muted-foreground">(至少5个字)</span>
                  </Label>
                  <Input
                    id="pseudonym"
                    placeholder="输入您的假名，例如：紫微星君"
                    value={formData.pseudonym}
                    onChange={(e) => handleFieldChange('pseudonym', e.target.value)}
                    className={errors.pseudonym ? 'border-destructive' : ''}
                  />
                  {errors.pseudonym && (
                    <p className="text-sm text-destructive">{errors.pseudonym}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    您的假名将在平台上显示，用于保护您的隐私
                  </p>
                </div>

{/* Email */}
                 <div className="space-y-2">
                   <Label htmlFor="email" className="flex items-center space-x-2">
                     <span>Gmail邮箱</span>
                     <span className="text-destructive">*</span>
                   </Label>
                   <Input
                     id="email"
                     type="email"
                     placeholder="your.email@gmail.com"
                     value={formData.email}
                     onChange={(e) => handleFieldChange('email', e.target.value)}
                     className={errors.email ? 'border-destructive' : ''}
                   />
                   {errors.email && (
                     <p className="text-sm text-destructive">{errors.email}</p>
                   )}
                   <p className="text-xs text-muted-foreground">
                     建议创建新的Gmail账户以获得更好的隐私保护
                   </p>
                 </div>

                 {/* Info Alert */}
                <Alert className="border-accent/50 bg-accent/5">
                  <SafeIcon name="Info" className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-sm">
                    您的个人信息将被加密存储，我们承诺不会与第三方共享您的数据。
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Step 2: Geographic Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center space-x-2">
                    <span>国籍</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <CountrySelector
                    value={formData.country}
                    onChange={(value) => handleFieldChange('country', value)}
                    error={errors.country}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country}</p>
                  )}
                </div>

                {/* Birth Place */}
                <div className="space-y-2">
                  <Label htmlFor="birthPlace" className="flex items-center space-x-2">
                    <span>出生地</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="birthPlace"
                    placeholder="例如：北京市朝阳区"
                    value={formData.birthPlace}
                    onChange={(e) => handleFieldChange('birthPlace', e.target.value)}
                    className={errors.birthPlace ? 'border-destructive' : ''}
                  />
                  {errors.birthPlace && (
                    <p className="text-sm text-destructive">{errors.birthPlace}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    精确的出生地信息有助于更准确的命理分析
                  </p>
                </div>

                {/* Residence Place */}
                <div className="space-y-2">
                  <Label htmlFor="residencePlace" className="flex items-center space-x-2">
                    <span>常驻地</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="residencePlace"
                    placeholder="例如：上海市浦东新区"
                    value={formData.residencePlace}
                    onChange={(e) => handleFieldChange('residencePlace', e.target.value)}
                    className={errors.residencePlace ? 'border-destructive' : ''}
                  />
                  {errors.residencePlace && (
                    <p className="text-sm text-destructive">{errors.residencePlace}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    用于计算环境因子标签（气候、湿度、纬度等）
                  </p>
                </div>

                {/* Info Alert */}
                <Alert className="border-primary/50 bg-primary/5">
                  <SafeIcon name="MapPin" className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-sm">
                    地理信息将用于分析环境因子对命运的影响，不会被公开显示。
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Step 3: Cultural Background */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Culture */}
                <div className="space-y-2">
                  <Label htmlFor="culture" className="flex items-center space-x-2">
                    <span>文化背景</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.culture} onValueChange={(value) => handleFieldChange('culture', value)}>
                    <SelectTrigger id="culture" className={errors.culture ? 'border-destructive' : ''}>
                      <SelectValue placeholder="选择您的文化背景" />
                    </SelectTrigger>
                    <SelectContent>
                      {CULTURES.map((culture) => (
                        <SelectItem key={culture} value={culture}>
                          {culture}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.culture && (
                    <p className="text-sm text-destructive">{errors.culture}</p>
                  )}
                </div>

                {/* Religion */}
                <div className="space-y-2">
                  <Label htmlFor="religion" className="flex items-center space-x-2">
                    <span>宗教信仰</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.religion} onValueChange={(value) => handleFieldChange('religion', value)}>
                    <SelectTrigger id="religion" className={errors.religion ? 'border-destructive' : ''}>
                      <SelectValue placeholder="选择您的宗教信仰" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGIONS.map((religion) => (
                        <SelectItem key={religion} value={religion}>
                          {religion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.religion && (
                    <p className="text-sm text-destructive">{errors.religion}</p>
                  )}
                </div>

                {/* Info Alert */}
                <Alert className="border-accent/50 bg-accent/5">
                  <SafeIcon name="Globe" className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-sm">
                    文化和宗教背景信息将帮助我们提供更符合您文化背景的命理解读。
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Submit Error */}
            {submitError && (
              <Alert variant="destructive">
                <SafeIcon name="AlertCircle" className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
<Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                上一步
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  下一步
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 inline-flex items-center animate-spin">⏳</span>
                      注册中...
                    </>
                  ) : (
                    <>
                      完成注册
                      <span className="ml-2 h-4 w-4 inline-flex items-center">✓</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Sign In Link */}
      <div className="text-center text-sm text-muted-foreground">
        已有账户？{' '}
        <a href="./home-page.html" className="text-primary hover:underline font-medium">
          返回首页登录
        </a>
      </div>
    </div>
  );
}
