import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import BackgroundImageSelector from './BackgroundImageSelector';
import type { MasterProfileModel } from '@/data/user';

interface StudioInfoFormProps {
  masterProfile: MasterProfileModel;
  onSave: () => Promise<void>;
}

export default function StudioInfoForm({ masterProfile, onSave }: StudioInfoFormProps) {
const [formData, setFormData] = useState({
    studioName: '玄真子命理工作室',
    description: masterProfile.longDescription,
    avatarUrl: masterProfile.avatarUrl,
    bannerUrl: masterProfile.bannerUrl,
    phone: '+86 138-1234-5678',
    email: 'xuanzhenzi@example.com',
    location: `${masterProfile.geoTag.country} ${masterProfile.geoTag.region}`,
    website: 'https://xuanzhenzi.example.com',
    primaryLanguage: masterProfile.primaryLanguage || '中文',
    servesInternational: masterProfile.servesInternational || false,
    professionalFields: masterProfile.professionalFields || ['八字命理'],
    serviceTypes: masterProfile.serviceTypes || ['初级批命'],
    yearsOfExperience: masterProfile.yearsOfExperience || 10,
    personalIntroduction: masterProfile.personalIntroduction || '',
    secondaryLanguage: masterProfile.secondaryLanguage || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [backgroundSelectorOpen, setBackgroundSelectorOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBackgroundSelect = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, bannerUrl: imageUrl }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner Section */}
      <Card className="glass-card overflow-hidden">
<div className="relative h-48 bg-gradient-to-r from-primary to-secondary overflow-hidden">
           <img
             src={formData.bannerUrl}
             alt="工作室背景"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
             <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                 {formData.studioName}
               </h2>
             </div>
           </div>
<div id="iv6wv5" className="absolute inset-0 bg-black/30 flex items-start justify-end p-3">
              <Button
                id="io2c6v"
                variant="outline"
                className="bg-background/80 backdrop-blur-sm"
                onClick={() => setBackgroundSelectorOpen(true)}
              >
                <SafeIcon name="Upload" className="mr-2 h-4 w-4" />
                更换背景图
              </Button>
            </div>
         </div>

        {/* Avatar Section */}
        <CardContent className="pt-0">
          <div className="flex items-end space-x-4 -mt-12 mb-6 relative z-10">
            <Avatar className="h-24 w-24 ring-4 ring-card">
              <AvatarImage src={formData.avatarUrl} alt={masterProfile.realName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {masterProfile.realName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <SafeIcon name="Camera" className="mr-2 h-4 w-4" />
              更换头像
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>管理您的工作室基本信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studioName">工作室名称</Label>
              <Input
                id="studioName"
                name="studioName"
                value={formData.studioName}
                onChange={handleInputChange}
                placeholder="输入工作室名称"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">地点</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="输入工作室地点"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">联系电话</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="输入联系电话"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="输入邮箱地址"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">网站</Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="输入网站地址"
            />
          </div>

<div className="space-y-2">
             <Label htmlFor="description">工作室介绍</Label>
             <Textarea
               id="description"
               name="description"
               value={formData.description}
               onChange={handleInputChange}
               placeholder="详细介绍您的工作室和服务理念"
               rows={6}
             />
             <p className="text-xs text-muted-foreground">
               {formData.description.length}/500 字符
             </p>
           </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryLanguage">第一擅长语言</Label>
                <Select
                  value={formData.primaryLanguage}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, primaryLanguage: value }))
                  }
                >
                  <SelectTrigger id="primaryLanguage">
                    <SelectValue placeholder="选择擅长的语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="中文">中文</SelectItem>
                    <SelectItem value="英文">英文</SelectItem>
                    <SelectItem value="日文">日文</SelectItem>
                    <SelectItem value="韩文">韩文</SelectItem>
                    <SelectItem value="泰文">泰文</SelectItem>
                    <SelectItem value="越南文">越南文</SelectItem>
                    <SelectItem value="法文">法文</SelectItem>
                    <SelectItem value="德文">德文</SelectItem>
                    <SelectItem value="西班牙文">西班牙文</SelectItem>
                    <SelectItem value="葡萄牙文">葡萄牙文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryLanguage">第二支持语言</Label>
                <Select
                  value={formData.secondaryLanguage}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, secondaryLanguage: value }))
                  }
                >
                  <SelectTrigger id="secondaryLanguage">
                    <SelectValue placeholder="选择第二语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">无</SelectItem>
                    <SelectItem value="中文">中文</SelectItem>
                    <SelectItem value="英文">英文</SelectItem>
                    <SelectItem value="日文">日文</SelectItem>
                    <SelectItem value="韩文">韩文</SelectItem>
                    <SelectItem value="泰文">泰文</SelectItem>
                    <SelectItem value="越南文">越南文</SelectItem>
                    <SelectItem value="法文">法文</SelectItem>
                    <SelectItem value="德文">德文</SelectItem>
                    <SelectItem value="西班牙文">西班牙文</SelectItem>
                    <SelectItem value="葡萄牙文">葡萄牙文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="servesInternational"
                  checked={formData.servesInternational}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, servesInternational: checked as boolean }))
                  }
                />
                <Label htmlFor="servesInternational" className="text-sm font-medium cursor-pointer">
                  服务外国顾客
                </Label>
              </div>
            </div>
         </CardContent>
       </Card>

{/* Professional Fields & Service Types */}
       <Card className="glass-card">
         <CardHeader>
           <CardTitle>专业信息</CardTitle>
           <CardDescription>设置您的专业领域、服务类型和从业年限</CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <Label>专业领域</Label>
               <div className="flex flex-wrap gap-2 p-3 rounded-md border border-input bg-background/50">
                 {formData.professionalFields.map((field) => (
                   <div key={field} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center space-x-1">
                     <span>{field}</span>
                     <button
                       onClick={() => {
                         setFormData(prev => ({
                           ...prev,
                           professionalFields: prev.professionalFields.filter(f => f !== field)
                         }));
                       }}
                       className="hover:text-primary-foreground transition-colors"
                     >
                       <SafeIcon name="X" className="h-3 w-3" />
                     </button>
                   </div>
                 ))}
               </div>
               <div className="flex gap-2">
                 <Input
                   id="newField"
                   placeholder="输入新领域"
                   className="flex-1"
                   onKeyUp={(e) => {
                     if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                       const value = e.currentTarget.value.trim();
                       if (!formData.professionalFields.includes(value)) {
                         setFormData(prev => ({
                           ...prev,
                           professionalFields: [...prev.professionalFields, value]
                         }));
                       }
                       e.currentTarget.value = '';
                     }
                   }}
                 />
                 <Button
                   variant="outline"
                   onClick={(e) => {
                     const input = (e.currentTarget.parentElement?.querySelector('#newField') as HTMLInputElement);
                     if (input?.value.trim()) {
                       const value = input.value.trim();
                       if (!formData.professionalFields.includes(value)) {
                         setFormData(prev => ({
                           ...prev,
                           professionalFields: [...prev.professionalFields, value]
                         }));
                       }
                       input.value = '';
                     }
                   }}
                 >
                   <SafeIcon name="Plus" className="h-4 w-4" />
                 </Button>
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="yearsOfExperience">从业年限</Label>
               <Input
                 id="yearsOfExperience"
                 name="yearsOfExperience"
                 type="number"
                 min="0"
                 max="100"
                 value={formData.yearsOfExperience}
                 onChange={(e) => {
                   const value = parseInt(e.target.value) || 0;
                   setFormData(prev => ({ ...prev, yearsOfExperience: value }));
                 }}
                 placeholder="输入从业年限"
               />
             </div>
           </div>

           <div className="space-y-2">
             <Label>服务类型</Label>
             <div className="flex flex-wrap gap-3 p-3 rounded-md border border-input bg-background/50">
               {['初级批命', '全面分析', '咨询指导', '疑难解答', '长期跟踪'].map((type) => (
                 <div key={type} className="flex items-center space-x-2">
                   <Checkbox
                     id={`service-${type}`}
                     checked={formData.serviceTypes.includes(type)}
                     onCheckedChange={(checked) => {
                       if (checked) {
                         setFormData(prev => ({
                           ...prev,
                           serviceTypes: [...prev.serviceTypes, type]
                         }));
                       } else {
                         setFormData(prev => ({
                           ...prev,
                           serviceTypes: prev.serviceTypes.filter(t => t !== type)
                         }));
                       }
                     }}
                   />
                   <Label htmlFor={`service-${type}`} className="text-sm font-medium cursor-pointer">
                     {type}
                   </Label>
                 </div>
               ))}
             </div>
           </div>

           <div className="space-y-2">
             <Label htmlFor="personalIntroduction">个人介绍</Label>
             <Textarea
               id="personalIntroduction"
               name="personalIntroduction"
               value={formData.personalIntroduction}
               onChange={handleInputChange}
               placeholder="介绍自己的修行背景、特色方法、成就案例等"
               rows={5}
             />
             <p className="text-xs text-muted-foreground">
               {formData.personalIntroduction.length}/800 字符
             </p>
           </div>
         </CardContent>
       </Card>

        {/* Style Tags */}
       <Card className="glass-card">
         <CardHeader>
           <CardTitle>风格标签</CardTitle>
           <CardDescription>选择您的工作风格特征</CardDescription>
         </CardHeader>
         <CardContent>
           <div className="flex flex-wrap gap-2">
             {masterProfile.styleTags.map((tag) => (
               <button
                 key={tag}
                 className="px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-medium flex items-center space-x-1"
               >
                 <span>{tag}</span>
                 <SafeIcon name="X" className="h-3 w-3" />
               </button>
             ))}
             <Button variant="outline" size="sm">
               <SafeIcon name="Plus" className="mr-1 h-4 w-4" />
               添加标签
             </Button>
           </div>
         </CardContent>
       </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => window.location.href = './master-backend-overview.html'}
        >
          取消
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-mystical-gradient hover:opacity-90"
        >
          {isSaving ? (
            <>
              <SafeIcon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="mr-2 h-4 w-4" />
              保存更改
            </>
          )}
        </Button>
      </div>

      <BackgroundImageSelector
        open={backgroundSelectorOpen}
        onOpenChange={setBackgroundSelectorOpen}
        onSelect={handleBackgroundSelect}
      />
    </div>
  );
}