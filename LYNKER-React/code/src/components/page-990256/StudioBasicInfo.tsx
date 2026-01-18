
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface StudioBasicInfoProps {
  initialData: {
    studioName: string;
    introduction: string;
  };
}

export default function StudioBasicInfo({ initialData }: StudioBasicInfoProps) {
  const [studioName, setStudioName] = useState(initialData.studioName);
  const [introduction, setIntroduction] = useState(initialData.introduction);
  const [avatar, setAvatar] = useState('https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>基本信息</CardTitle>
        <CardDescription>
          编辑您的工作室名称、头像和专业介绍
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Section */}
        <div className="space-y-4">
          <Label>工作室头像</Label>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-2 ring-primary">
              <AvatarImage src={avatar} alt="Studio Avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                灵
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>
                    <SafeIcon name="Upload" className="h-4 w-4 mr-2" />
                    上传新头像
                  </span>
                </Button>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <p className="text-xs text-muted-foreground">
                推荐尺寸：400x400px，支持JPG、PNG格式
              </p>
            </div>
          </div>
        </div>

        {/* Studio Name */}
        <div className="space-y-2">
          <Label htmlFor="studio-name">工作室名称</Label>
          <Input
            id="studio-name"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            placeholder="输入您的工作室名称"
            className="bg-muted/50"
          />
          <p className="text-xs text-muted-foreground">
            工作室名称将显示在您的公开档案中
          </p>
        </div>

        {/* Introduction */}
        <div className="space-y-2">
          <Label htmlFor="introduction">专业介绍</Label>
          <Textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="介绍您的专业背景、经验和特长..."
            className="bg-muted/50 min-h-[200px] resize-none"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>详细的专业介绍有助于吸引更多客户</span>
            <span>{introduction.length}/500</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="space-y-2">
          <Label>专业领域</Label>
          <div className="grid grid-cols-2 gap-3">
            {['八字', '紫微', '占星', '塔罗', '面相', '风水'].map((specialty) => (
              <div key={specialty} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={specialty}
                  defaultChecked={['八字', '紫微', '占星'].includes(specialty)}
                  className="rounded"
                />
                <Label htmlFor={specialty} className="cursor-pointer font-normal">
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <Label>资质证书</Label>
          <div className="space-y-2">
            <div className="p-4 rounded-lg border border-dashed border-muted-foreground/30 text-center">
              <SafeIcon name="FileUp" className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                拖拽或点击上传资质证书
              </p>
              <Button variant="outline" size="sm">
                选择文件
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              支持JPG、PNG、PDF格式，最大5MB
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
