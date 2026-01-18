
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import ProfileSidebar from './ProfileSidebar';
import AvatarUpload from './AvatarUpload';
import BasicInfoForm from './BasicInfoForm';
import DetailedInfoForm from './DetailedInfoForm';
import { MOCK_USER_PROFILE_DETAIL } from '@/data/user';

export default function ProfileEditPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setShowSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <ProfileSidebar currentPage="profile" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">个人资料</h1>
            <p className="text-muted-foreground">
              管理您的个人信息，帮助我们为您提供更好的匹配建议
            </p>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <Card className="mb-6 border-green-500/50 bg-green-500/10">
              <CardContent className="pt-6 flex items-center space-x-3">
                <SafeIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                <span className="text-green-500">个人资料已成功保存！</span>
              </CardContent>
            </Card>
          )}

          {/* Avatar Section */}
          <Card className="mb-8 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SafeIcon name="User" className="h-5 w-5" />
                <span>头像</span>
              </CardTitle>
              <CardDescription>上传或更改您的个人头像</CardDescription>
            </CardHeader>
            <CardContent>
              <AvatarUpload currentAvatar={MOCK_USER_PROFILE_DETAIL.avatarUrl} />
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic" className="flex items-center space-x-2">
                <SafeIcon name="FileText" className="h-4 w-4" />
                <span>基本信息</span>
              </TabsTrigger>
              <TabsTrigger value="detailed" className="flex items-center space-x-2">
                <SafeIcon name="Settings" className="h-4 w-4" />
                <span>详细信息</span>
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>基本信息</CardTitle>
                  <CardDescription>
                    您在注册时填写的基本信息
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BasicInfoForm userProfile={MOCK_USER_PROFILE_DETAIL} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Detailed Info Tab */}
            <TabsContent value="detailed" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>详细信息</CardTitle>
                  <CardDescription>
                    补充更多个人信息以获得更精准的匹配建议
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DetailedInfoForm userProfile={MOCK_USER_PROFILE_DETAIL} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button variant="outline" asChild>
              <a href="./page-961642.html">
                <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
                返回仪表板
              </a>
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <SafeIcon name="RotateCcw" className="mr-2 h-4 w-4" />
                重置
              </Button>
              <Button
                className="bg-mystical-gradient hover:opacity-90"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
