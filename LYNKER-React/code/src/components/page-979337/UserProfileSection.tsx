
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';
import AvatarUploadDialog from '@/components/page-979337/AvatarUploadDialog';

// Mock user profile data
const MOCK_USER_PROFILE = {
  userId: 'user_001',
  alias: '星空下的观测者Q',
  email: 'user@gmail.com',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
  country: 'CN',
  region: '广东深圳',
  birthDate: '1990-05-15',
  birthTime: '14:30',
  birthPlace: '深圳市',
  currentResidence: '深圳市南山区',
  culture: '汉族',
  religion: '道教',
  apiProvider: 'ChatGPT',
  apiKey: '••••••••••••••••',
  joinDate: '2025-08-15',
  bio: '一个热爱探索自己命运轨迹的普通人。正在努力实现自我价值，期望通过命理找到人生的最优解。',
  interests: ['八字', '紫微斗数', '占星术'],
};

export default function UserProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(MOCK_USER_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUploadOpen, setAvatarUploadOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    // Show success message
    alert('个人资料已更新');
  };

  const handleCancel = () => {
    setFormData(MOCK_USER_PROFILE);
    setIsEditing(false);
  };

  const handleAvatarChange = (avatarUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: avatarUrl,
    }));
  };

  const handleOpenAvatarDialog = () => {
    setAvatarUploadOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-mystical">个人资料</h1>
          <p className="text-muted-foreground mt-2">
            管理您的账户信息和个人设置
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-mystical-gradient hover:opacity-90"
          >
            <SafeIcon name="Edit" className="h-4 w-4 mr-2" />
            编辑资料
          </Button>
        )}
      </div>

      {/* Avatar Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="User" className="h-5 w-5" />
            <span>头像</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 ring-2 ring-primary">
              <AvatarImage src={formData.avatar} alt={formData.alias} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {formData.alias.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
{isEditing && (
              <Button
                variant="outline"
                onClick={handleOpenAvatarDialog}
              >
                <SafeIcon name="Upload" className="h-4 w-4 mr-2" />
                更换头像
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Info" className="h-5 w-5" />
            <span>基本信息</span>
          </CardTitle>
          <CardDescription>
            您在注册时填写的基本信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alias */}
            <div className="space-y-2">
              <Label htmlFor="alias">假名</Label>
              {isEditing ? (
                <Input
                  id="alias"
                  name="alias"
                  value={formData.alias}
                  onChange={handleInputChange}
                  placeholder="至少5个字"
                  minLength={5}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.alias}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@gmail.com"
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground flex items-center space-x-2">
                  <SafeIcon name="Mail" className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.email}</span>
                </div>
              )}
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">出生日期</Label>
              {isEditing ? (
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.birthDate}
                </div>
              )}
            </div>

            {/* Birth Time */}
            <div className="space-y-2">
              <Label htmlFor="birthTime">出生时间</Label>
              {isEditing ? (
                <Input
                  id="birthTime"
                  name="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.birthTime}
                </div>
              )}
            </div>

            {/* Birth Place */}
            <div className="space-y-2">
              <Label htmlFor="birthPlace">出生地</Label>
              {isEditing ? (
                <Input
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  placeholder="城市名称"
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.birthPlace}
                </div>
              )}
            </div>

            {/* Current Residence */}
            <div className="space-y-2">
              <Label htmlFor="currentResidence">常驻地</Label>
              {isEditing ? (
                <Input
                  id="currentResidence"
                  name="currentResidence"
                  value={formData.currentResidence}
                  onChange={handleInputChange}
                  placeholder="城市名称"
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.currentResidence}
                </div>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label>国籍</Label>
              <div className="p-3 rounded-lg bg-muted/50">
                <RegionBadge country={formData.country} />
              </div>
            </div>

            {/* Culture */}
            <div className="space-y-2">
              <Label htmlFor="culture">文化/民族</Label>
              {isEditing ? (
                <Input
                  id="culture"
                  name="culture"
                  value={formData.culture}
                  onChange={handleInputChange}
                  placeholder="汉族"
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.culture}
                </div>
              )}
            </div>

            {/* Religion */}
            <div className="space-y-2">
              <Label htmlFor="religion">宗教信仰</Label>
              {isEditing ? (
                <Input
                  id="religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="道教"
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                  {formData.religion}
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">个人简介</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="介绍一下您自己..."
                rows={4}
              />
            ) : (
              <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                {formData.bio}
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label>兴趣标签</Label>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Bot" className="h-5 w-5" />
            <span>AI助手配置</span>
          </CardTitle>
          <CardDescription>
            配置您的灵伴AI助手
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <SafeIcon name="Info" className="h-4 w-4" />
            <AlertDescription>
              详细的AI助手配置请前往 <a href="./page-979411.html" className="text-primary hover:underline">AI设置</a> 页面
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* API Provider */}
            <div className="space-y-2">
              <Label>AI提供商</Label>
              <div className="p-3 rounded-lg bg-muted/50 text-foreground flex items-center space-x-2">
                <SafeIcon name="Zap" className="h-4 w-4 text-accent" />
                <span>{formData.apiProvider}</span>
              </div>
            </div>

            {/* API Key Status */}
            <div className="space-y-2">
              <Label>API密钥</Label>
              <div className="p-3 rounded-lg bg-muted/50 text-foreground flex items-center justify-between">
                <span>{formData.apiKey}</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                  已配置
                </Badge>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <a href="./page-979411.html">
              <SafeIcon name="Settings" className="h-4 w-4 mr-2" />
              前往AI设置
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Shield" className="h-5 w-5" />
            <span>账户信息</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">用户ID</Label>
              <div className="p-3 rounded-lg bg-muted/50 text-foreground font-mono text-sm">
                {formData.userId}
              </div>
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">加入日期</Label>
              <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                {formData.joinDate}
              </div>
            </div>
          </div>

          <Separator />

<div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Open password change dialog or navigate
                alert('修改密码功能即将推出');
              }}
            >
              <SafeIcon name="Lock" className="h-4 w-4 mr-2" />
              修改密码
            </Button>
            <Button
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
              onClick={() => {
                // Confirm account deletion
                if (window.confirm('确定要删除账户？此操作不可撤销。')) {
                  alert('账户删除请求已提交');
                }
              }}
            >
              <SafeIcon name="Trash2" className="h-4 w-4 mr-2" />
              删除账户
            </Button>
           </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-4 sticky bottom-6 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-mystical-gradient hover:opacity-90"
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
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1"
          >
            <SafeIcon name="X" className="h-4 w-4 mr-2" />
            取消
          </Button>
</div>
      )}

      {/* Avatar Upload Dialog */}
      <AvatarUploadDialog
        open={avatarUploadOpen}
        onOpenChange={setAvatarUploadOpen}
        onAvatarChange={handleAvatarChange}
        currentAvatar={formData.avatar}
      />
    </div>
  );
}
