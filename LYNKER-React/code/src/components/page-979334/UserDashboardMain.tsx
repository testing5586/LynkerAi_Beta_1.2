
'use client';

import { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { toast } from 'sonner';

interface UserProfile {
  userId: string;
  alias: string;
  realName?: string;
  email: string;
  avatar: string;
  country: string;
  region: string;
  birthPlace?: string;
  currentResidence?: string;
  culture?: string;
  religion?: string;
  apiProvider: string;
  apiKey?: string;
  joinDate: string;
  bio?: string;
}

const mockUserProfile: UserProfile = {
  userId: 'user_001',
  alias: '星空下的观测者Q',
  realName: '张三',
  email: 'user@gmail.com',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
  country: '中国',
  region: '广东深圳',
  birthPlace: '广东广州',
  currentResidence: '广东深圳',
  culture: '汉文化',
  religion: '道教',
  apiProvider: 'ChatGPT',
  apiKey: 'sk-***',
  joinDate: '2025-08-15',
  bio: '一个热爱探索自己命运轨迹的普通人。正在努力实现自我价值，期望通过命理找到人生的最优解。',
};

const navigationItems = [
  { id: 'personal-info', label: '个人资料', icon: 'User' },
  { id: 'true-chart', label: '我的真命盘', icon: 'Star' },
  { id: 'yearly-fortune', label: '年流年运势', icon: 'TrendingUp' },
  { id: 'knowledge-base', label: '知识库', icon: 'BookOpen' },
  { id: 'booking', label: '预约', icon: 'Calendar' },
  { id: 'ai-settings', label: 'AI设置', icon: 'Settings' },
  { id: 'payment', label: '付款设置', icon: 'CreditCard' },
];

export default function UserDashboardMain() {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockUserProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile(editedProfile);
      setIsEditing(false);
      toast.success('个人资料已更新');
    } catch (error) {
      toast.error('更新失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditedProfile({
          ...editedProfile,
          avatar: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavigate = (tabId: string) => {
    const routes: Record<string, string> = {
      'personal-info': './page-979334.html',
      'true-chart': './page-979145.html',
      'yearly-fortune': './page-979336.html',
      'knowledge-base': './page-979401.html',
      'booking': './page-979400.html',
      'ai-settings': './page-979411.html',
      'payment': './page-979468.html',
    };
    if (routes[tabId]) {
      window.location.href = routes[tabId];
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <Sidebar className="border-r bg-background/50">
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="cursor-pointer"
                >
                  <button className="flex items-center space-x-2 w-full">
                    <SafeIcon name={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="flex-1 overflow-auto">
        <div className="container max-w-4xl py-8 px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">个人资料</h1>
            <p className="text-muted-foreground">
              管理您的个人信息和账户设置
            </p>
          </div>

          {/* Content */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>
                  查看和编辑您的个人资料
                </CardDescription>
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
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
              {isEditing ? (
                <EditForm
                  profile={editedProfile}
                  onFieldChange={handleEditChange}
                  onAvatarChange={handleAvatarChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  isSaving={isSaving}
                />
              ) : (
                <ViewProfile profile={profile} />
              )}
            </CardContent>
          </Card>

          {/* Additional Info Cards */}
          {!isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Account Status */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">账户状态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">用户ID</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {profile.userId}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">加入日期</span>
                    <span className="text-sm font-medium">{profile.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">账户等级</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
                      普通用户
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* API Configuration */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">API配置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI提供商</span>
                    <Badge variant="outline">{profile.apiProvider}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">API密钥</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {profile.apiKey}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a href="./page-979411.html">
                      <SafeIcon name="Settings" className="h-4 w-4 mr-2" />
                      配置AI助手
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </SidebarInset>
    </div>
  );
}

function ViewProfile({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <Avatar className="h-24 w-24 ring-2 ring-primary">
          <AvatarImage src={profile.avatar} alt={profile.alias} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            {profile.alias.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{profile.alias}</h3>
          <p className="text-muted-foreground">{profile.bio}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{profile.country}</Badge>
            <Badge variant="outline">{profile.region}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-muted-foreground text-xs uppercase">假名</Label>
          <p className="text-lg font-medium mt-1">{profile.alias}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">真实姓名</Label>
          <p className="text-lg font-medium mt-1">{profile.realName || '未设置'}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">邮箱</Label>
          <p className="text-lg font-medium mt-1">{profile.email}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">国籍</Label>
          <p className="text-lg font-medium mt-1">{profile.country}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">出生地</Label>
          <p className="text-lg font-medium mt-1">{profile.birthPlace || '未设置'}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">常驻地</Label>
          <p className="text-lg font-medium mt-1">{profile.currentResidence || '未设置'}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">文化背景</Label>
          <p className="text-lg font-medium mt-1">{profile.culture || '未设置'}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs uppercase">宗教信仰</Label>
          <p className="text-lg font-medium mt-1">{profile.religion || '未设置'}</p>
        </div>
      </div>

      <Separator />

      {/* Bio */}
      <div>
        <Label className="text-muted-foreground text-xs uppercase">个人简介</Label>
        <p className="text-base mt-2 leading-relaxed">
          {profile.bio || '暂无简介'}
        </p>
      </div>
    </div>
  );
}

function EditForm({
  profile,
  onFieldChange,
  onAvatarChange,
  onSave,
  onCancel,
  isSaving,
}: {
  profile: UserProfile;
  onFieldChange: (field: keyof UserProfile, value: string) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="space-y-8">
      {/* Avatar Upload */}
      <div className="flex items-center space-x-6">
        <Avatar className="h-24 w-24 ring-2 ring-primary">
          <AvatarImage src={profile.avatar} alt={profile.alias} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            {profile.alias.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Label htmlFor="avatar-upload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <SafeIcon name="Upload" className="h-4 w-4 mr-2" />
                更换头像
              </span>
            </Button>
          </Label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            支持 JPG, PNG, GIF (最大 5MB)
          </p>
        </div>
      </div>

      <Separator />

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="alias">假名 *</Label>
          <Input
            id="alias"
            value={profile.alias}
            onChange={(e) => onFieldChange('alias', e.target.value)}
            placeholder="至少5个字"
            minLength={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="realName">真实姓名</Label>
          <Input
            id="realName"
            value={profile.realName || ''}
            onChange={(e) => onFieldChange('realName', e.target.value)}
            placeholder="可选"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">邮箱 *</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            placeholder="your@gmail.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">国籍 *</Label>
          <Input
            id="country"
            value={profile.country}
            onChange={(e) => onFieldChange('country', e.target.value)}
            placeholder="中国"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthPlace">出生地</Label>
          <Input
            id="birthPlace"
            value={profile.birthPlace || ''}
            onChange={(e) => onFieldChange('birthPlace', e.target.value)}
            placeholder="省/州/城市"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentResidence">常驻地</Label>
          <Input
            id="currentResidence"
            value={profile.currentResidence || ''}
            onChange={(e) => onFieldChange('currentResidence', e.target.value)}
            placeholder="省/州/城市"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="culture">文化背景</Label>
          <Input
            id="culture"
            value={profile.culture || ''}
            onChange={(e) => onFieldChange('culture', e.target.value)}
            placeholder="汉文化、日本文化等"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="religion">宗教信仰</Label>
          <Input
            id="religion"
            value={profile.religion || ''}
            onChange={(e) => onFieldChange('religion', e.target.value)}
            placeholder="道教、佛教等"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">个人简介</Label>
        <Textarea
          id="bio"
          value={profile.bio || ''}
          onChange={(e) => onFieldChange('bio', e.target.value)}
          placeholder="介绍一下你自己..."
          rows={4}
        />
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          取消
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="bg-mystical-gradient hover:opacity-90"
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
      </div>
    </div>
  );
}
