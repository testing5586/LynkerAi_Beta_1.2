
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import AvatarUpload from './AvatarUpload';
import AIAssistantSelector from './AIAssistantSelector';
import PrivacySettings from './PrivacySettings';

interface UserProfile {
  avatar: string;
  nickname: string;
  bio: string;
  bloodType: string;
  occupation: string;
  selectedAI: string;
  privacySettings: {
    showProfile: boolean;
    allowMessages: boolean;
    showLocation: boolean;
  };
}

export default function ProfileSetupUserForm() {
  const [profile, setProfile] = useState<UserProfile>({
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    nickname: '灵客用户',
    bio: '探索命理，发现自我',
    bloodType: '',
    occupation: '',
    selectedAI: 'chatgpt',
    privacySettings: {
      showProfile: true,
      allowMessages: true,
      showLocation: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAvatarChange = (newAvatar: string) => {
    setProfile((prev) => ({ ...prev, avatar: newAvatar }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, nickname: e.target.value }));
  };

const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setProfile((prev) => ({ ...prev, bio: e.target.value }));
};

const handleBloodTypeChange = (value: string) => {
  setProfile((prev) => ({ ...prev, bloodType: value }));
};

const handleOccupationChange = (value: string) => {
  setProfile((prev) => ({ ...prev, occupation: value }));
};

const handleCustomOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setProfile((prev) => ({ ...prev, occupation: e.target.value }));
};

const handleAISelect = (aiId: string) => {
  setProfile((prev) => ({ ...prev, selectedAI: aiId }));
};

  const handlePrivacyChange = (key: keyof typeof profile.privacySettings, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('资料已保存成功！');
      setTimeout(() => {
        window.location.href = './page-706040.html';
      }, 1500);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <Alert className="bg-green-500/10 border-green-500/30">
          <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <SafeIcon name="User" className="h-4 w-4" />
            <span className="hidden sm:inline">基本信息</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <SafeIcon name="Bot" className="h-4 w-4" />
            <span className="hidden sm:inline">AI助手</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <SafeIcon name="Shield" className="h-4 w-4" />
            <span className="hidden sm:inline">隐私设置</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6 mt-6">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle>头像设置</CardTitle>
              <CardDescription>上传您的个人头像，建议使用清晰的照片</CardDescription>
            </CardHeader>
            <CardContent>
              <AvatarUpload
                currentAvatar={profile.avatar}
                onAvatarChange={handleAvatarChange}
              />
            </CardContent>
          </Card>

          <Card className="border-muted">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>完善您的个人信息，帮助其他用户了解您</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">昵称（假名，至少5个字）</Label>
                <Input
                  id="nickname"
                  placeholder="输入您的昵称"
                  value={profile.nickname}
                  onChange={handleNicknameChange}
                  minLength={5}
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">
                  您的昵称将在平台上公开显示，用于保护您的隐私
                </p>
              </div>

<div className="space-y-2">
                <Label htmlFor="bio">个性签名</Label>
                <Textarea
                  id="bio"
                  placeholder="分享您对命理的理解或个人座右铭..."
                  value={profile.bio}
                  onChange={handleBioChange}
                  maxLength={200}
                  rows={4}
                  className="bg-input border-border resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {profile.bio.length}/200 字符
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">血型</Label>
                <Select value={profile.bloodType} onValueChange={handleBloodTypeChange}>
                  <SelectTrigger id="bloodType" className="bg-input border-border">
                    <SelectValue placeholder="选择您的血型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="O">O型</SelectItem>
                    <SelectItem value="A">A型</SelectItem>
                    <SelectItem value="B">B型</SelectItem>
                    <SelectItem value="AB">AB型</SelectItem>
                    <SelectItem value="unknown">不清楚</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">职业</Label>
                <Select value={profile.occupation === '自定义' ? 'custom' : profile.occupation} onValueChange={(value) => {
                  if (value === 'custom') {
                    setProfile((prev) => ({ ...prev, occupation: '' }));
                  } else {
                    handleOccupationChange(value);
                  }
                }}>
                  <SelectTrigger id="occupation" className="bg-input border-border">
                    <SelectValue placeholder="选择或自定义您的职业" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="学生">学生</SelectItem>
                    <SelectItem value="教师">教师</SelectItem>
                    <SelectItem value="医生">医生</SelectItem>
                    <SelectItem value="工程师">工程师</SelectItem>
                    <SelectItem value="设计师">设计师</SelectItem>
                    <SelectItem value="市场营销">市场营销</SelectItem>
                    <SelectItem value="销售">销售</SelectItem>
                    <SelectItem value="金融">金融</SelectItem>
                    <SelectItem value="房地产">房地产</SelectItem>
                    <SelectItem value="自由职业者">自由职业者</SelectItem>
                    <SelectItem value="虚拟币投资">虚拟币投资</SelectItem>
                    <SelectItem value="股票投资">股票投资</SelectItem>
                    <SelectItem value="网红博主">网红博主</SelectItem>
                    <SelectItem value="内容创作者">内容创作者</SelectItem>
                    <SelectItem value="直播主播">直播主播</SelectItem>
                    <SelectItem value="电商运营">电商运营</SelectItem>
                    <SelectItem value="自定义">自定义填写</SelectItem>
                  </SelectContent>
                </Select>
                {profile.occupation === '自定义' || (profile.occupation && !['学生', '教师', '医生', '工程师', '设计师', '市场营销', '销售', '金融', '房地产', '自由职业者', '虚拟币投资', '股票投资', '网红博主', '内容创作者', '直播主播', '电商运营'].includes(profile.occupation)) ? (
                  <Input
                    placeholder="请输入您的自定义职业"
                    value={profile.occupation}
                    onChange={handleCustomOccupationChange}
                    className="bg-input border-border mt-2"
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai" className="space-y-6 mt-6">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle>选择您的AI助手</CardTitle>
              <CardDescription>
                选择一个AI模型作为您的命理助手，它将帮助您生成笔记和分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIAssistantSelector
                selectedAI={profile.selectedAI}
                onAISelect={handleAISelect}
              />
            </CardContent>
          </Card>

          <Alert className="bg-accent/10 border-accent/30">
            <SafeIcon name="Info" className="h-4 w-4 text-accent" />
            <AlertDescription className="text-accent">
              您可以随时在AI助手设置中更改选择或配置多个AI模型
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Privacy Settings Tab */}
        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle>隐私设置</CardTitle>
              <CardDescription>控制您的信息在平台上的可见性</CardDescription>
            </CardHeader>
            <CardContent>
              <PrivacySettings
                settings={profile.privacySettings}
                onSettingChange={handlePrivacyChange}
              />
            </CardContent>
          </Card>

          <Alert className="bg-blue-500/10 border-blue-500/30">
            <SafeIcon name="Shield" className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-500">
              您的真实身份信息（邮箱、电话等）永远不会被公开显示
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="flex-1"
        >
          <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
          返回
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading || profile.nickname.length < 5}
          className="flex-1 bg-mystical-gradient hover:opacity-90"
        >
          {isLoading ? (
            <>
              <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="mr-2 h-4 w-4" />
              保存并前往首页
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
