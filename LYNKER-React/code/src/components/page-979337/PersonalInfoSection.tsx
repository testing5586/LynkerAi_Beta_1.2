
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface PersonalInfoSectionProps {
  formData: any;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function PersonalInfoSection({
  formData,
  isEditing,
  onInputChange,
  onSave,
}: PersonalInfoSectionProps) {
  return (
    <Card className="glass-card border-primary/20 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="User" className="w-5 h-5 text-accent" />
          基本信息
        </CardTitle>
        <CardDescription>您在注册时填写的个人信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Alias */}
        <div className="space-y-2">
          <Label htmlFor="alias" className="text-sm font-semibold">
            假名 (至少5个字)
          </Label>
          <Input
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={onInputChange}
            disabled={!isEditing}
            className="bg-muted/50 border-primary/20"
            placeholder="输入您的假名"
          />
          <p className="text-xs text-muted-foreground">
            用于在平台上的公开显示，保护您的隐私
          </p>
        </div>

        <Separator />

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            注册邮箱
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            disabled={!isEditing}
            className="bg-muted/50 border-primary/20"
            placeholder="your@email.com"
          />
          <p className="text-xs text-muted-foreground">
            用于账户恢复和重要通知
          </p>
        </div>

        <Separator />

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-semibold">
            个人简介
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={onInputChange}
            disabled={!isEditing}
            className="bg-muted/50 border-primary/20 min-h-24"
            placeholder="介绍一下您自己..."
          />
          <p className="text-xs text-muted-foreground">
            其他用户可以看到这个简介
          </p>
        </div>

        <Separator />

        {/* Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-semibold">
              国籍
            </Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={onInputChange}
              disabled={!isEditing}
              className="bg-muted/50 border-primary/20"
              placeholder="中国"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region" className="text-sm font-semibold">
              常驻地区
            </Label>
            <Input
              id="region"
              name="region"
              value={formData.region}
              onChange={onInputChange}
              disabled={!isEditing}
              className="bg-muted/50 border-primary/20"
              placeholder="广东深圳"
            />
          </div>
        </div>

        <Separator />

        {/* Birth & Residence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthPlace" className="text-sm font-semibold">
              出生地
            </Label>
            <Input
              id="birthPlace"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={onInputChange}
              disabled={!isEditing}
              className="bg-muted/50 border-primary/20"
              placeholder="出生地"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="residencePlace" className="text-sm font-semibold">
              常驻地
            </Label>
            <Input
              id="residencePlace"
              name="residencePlace"
              value={formData.residencePlace}
              onChange={onInputChange}
              disabled={!isEditing}
              className="bg-muted/50 border-primary/20"
              placeholder="常驻地"
            />
          </div>
        </div>

        <Separator />

        {/* Culture & Religion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="culture" className="text-sm font-semibold">
              文化背景
            </Label>
            <Input
              id="culture"
              name="culture"
              value={formData.culture}
              onChange={onInputChange}
              disabled={!isEditing}
              className="bg-muted/50 border-primary/20"
              placeholder="汉族"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="religion" className="text-sm font-semibold">
              宗教信仰
            </Label>
            <Input
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={onInputChange}
              disabled={!isEditing}
              className="bg-muted/50 border-primary/20"
              placeholder="道教"
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <>
            <Separator />
            <div className="flex gap-3 justify-end">
              <Button variant="outline">取消</Button>
              <Button onClick={onSave} className="bg-mystical-gradient hover:opacity-90">
                <SafeIcon name="Save" className="w-4 h-4 mr-2" />
                保存更改
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
