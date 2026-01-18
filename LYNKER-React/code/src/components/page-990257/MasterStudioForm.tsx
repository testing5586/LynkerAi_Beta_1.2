
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface StudioData {
  studioName: string;
  introduction: string;
  specialties: string[];
  experience: string;
  clientCount: number;
  rating: number;
  reviewCount: number;
  profileImage: string;
  bio: string;
}

interface MasterStudioFormProps {
  initialData: StudioData;
}

export default function MasterStudioForm({ initialData }: MasterStudioFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const availableSpecialties = ['八字命理', '紫微斗数', '西方占星', '面相学', '手相学', '风水学'];

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="User" className="h-5 w-5" />
            工作室头像与基本信息
          </CardTitle>
          <CardDescription>上传工作室头像和基本介绍</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-2 ring-primary/20">
              <AvatarImage src={formData.profileImage} alt={formData.studioName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {formData.studioName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button variant="outline" className="gap-2">
                <SafeIcon name="Upload" className="h-4 w-4" />
                更换头像
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                建议尺寸：400x400px，支持JPG、PNG格式
              </p>
            </div>
          </div>

          {/* Studio Name */}
          <div className="space-y-2">
            <Label htmlFor="studioName">工作室名称</Label>
            <Input
              id="studioName"
              name="studioName"
              value={formData.studioName}
              onChange={handleInputChange}
              placeholder="输入您的工作室名称"
              className="bg-muted/50"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">个人简介（一句话）</Label>
            <Input
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="例：资深命理师，致力于用科学的方法解读命理"
              className="bg-muted/50"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {formData.bio.length}/100
            </p>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">从业年限</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="例：15年"
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientCount">服务客户数</Label>
              <Input
                id="clientCount"
                name="clientCount"
                type="number"
                value={formData.clientCount}
                onChange={handleInputChange}
                placeholder="例：5000"
                className="bg-muted/50"
              />
            </div>
          </div>

          {/* Rating Display */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">平均评分</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">{formData.rating}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      name="Star"
                      className={`h-4 w-4 ${
                        i < Math.floor(formData.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">评价数量</p>
              <p className="text-2xl font-bold">{formData.reviewCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialties Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Sparkles" className="h-5 w-5" />
            专业领域
          </CardTitle>
          <CardDescription>选择您擅长的命理领域</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableSpecialties.map(specialty => (
              <Badge
                key={specialty}
                variant={formData.specialties.includes(specialty) ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  formData.specialties.includes(specialty)
                    ? 'bg-mystical-gradient'
                    : 'hover:bg-muted'
                }`}
                onClick={() => handleSpecialtyToggle(specialty)}
              >
                {formData.specialties.includes(specialty) && (
                  <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                )}
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Introduction Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="FileText" className="h-5 w-5" />
            工作室介绍
          </CardTitle>
          <CardDescription>详细介绍您的工作室、经历和服务理念</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="introduction">详细介绍</Label>
            <Textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="介绍您的工作室、专业背景、服务理念等..."
              className="bg-muted/50 min-h-[200px] resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {formData.introduction.length}/1000
            </p>
          </div>

          {/* Preview */}
          <div className="p-4 bg-muted/30 rounded-lg border border-muted">
            <p className="text-sm font-semibold mb-2">预览</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {formData.introduction || '您的介绍文字将显示在这里...'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
