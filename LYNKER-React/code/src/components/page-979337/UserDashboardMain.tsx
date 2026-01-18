
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserDashboardSidebar from './UserDashboardSidebar';
import PersonalInfoSection from './PersonalInfoSection';

// Mock user data
const mockUserData = {
  userId: 'user_001',
  alias: '星空下的观测者Q',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
  email: 'user@example.com',
  gmailBound: 'user.example@gmail.com',
  country: '中国',
  region: '广东深圳',
  birthPlace: '广东深圳',
  residencePlace: '广东深圳',
  culture: '汉族',
  religion: '道教',
  apiProvider: 'ChatGPT',
  joinDate: '2025-08-15',
  bio: '一个热爱探索自己命运轨迹的普通人。正在努力实现自我价值，期望通过命理找到人生的最优解。',
  interests: ['八字', '紫微斗数', '占星术'],
};

export default function UserDashboardMain() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUserData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In real app, this would call an API
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      <UserDashboardSidebar currentSection="profile" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">个人资料</h1>
            <p className="text-muted-foreground">管理您的个人信息和账户设置</p>
          </div>

          {/* Profile Card */}
          <Card className="glass-card mb-8 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 ring-2 ring-primary">
                    <AvatarImage src={formData.avatar} alt={formData.alias} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {formData.alias.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{formData.alias}</h2>
                    <p className="text-sm text-muted-foreground">UID: {formData.userId}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">
                        <SafeIcon name="Calendar" className="w-3 h-3 mr-1" />
                        加入于 {formData.joinDate}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? 'destructive' : 'default'}
                  className="bg-mystical-gradient hover:opacity-90"
                >
                  <SafeIcon name={isEditing ? 'X' : 'Edit'} className="w-4 h-4 mr-2" />
                  {isEditing ? '取消编辑' : '编辑资料'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Personal Info Section */}
          <PersonalInfoSection
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />

          {/* Account Binding Section */}
          <Card className="glass-card border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Link" className="w-5 h-5 text-accent" />
                账户绑定
              </CardTitle>
              <CardDescription>管理您的第三方账户绑定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Gmail Binding */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <SafeIcon name="Mail" className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Google Gmail</p>
                      <p className="text-sm text-muted-foreground">用于数据备份和同步</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">已绑定</Badge>
                </div>
                <div className="ml-13 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-mono">{formData.gmailBound}</p>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    <SafeIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                    重新绑定
                  </Button>
                )}
              </div>

              <Separator />

              {/* API Provider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <SafeIcon name="Zap" className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold">AI助手提供商</p>
                      <p className="text-sm text-muted-foreground">灵伴AI使用的服务商</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">{formData.apiProvider}</Badge>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="./page-979411.html">
                      <SafeIcon name="Settings" className="w-4 h-4 mr-2" />
                      前往AI设置
                    </a>
                  </Button>
                )}
              </div>

              <Separator />

              {/* WeChat Binding */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <SafeIcon name="MessageCircle" className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold">微信账户</p>
                      <p className="text-sm text-muted-foreground">用于快速登录和支付</p>
                    </div>
                  </div>
                  <Badge variant="outline">未绑定</Badge>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                    绑定微信
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Interests Section */}
          <Card className="glass-card border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Heart" className="w-5 h-5 text-accent" />
                兴趣标签
              </CardTitle>
              <CardDescription>这些标签帮助我们为您推荐相关内容</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="px-3 py-1.5">
                    {interest}
                    {isEditing && (
                      <button className="ml-2 hover:text-destructive">
                        <SafeIcon name="X" className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <SafeIcon name="Plus" className="w-4 h-4 mr-1" />
                    添加标签
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Shield" className="w-5 h-5 text-accent" />
                隐私设置
              </CardTitle>
              <CardDescription>控制您的信息可见性</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">公开个人资料</p>
                  <p className="text-xs text-muted-foreground">允许其他用户查看您的命理分析摘要</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" disabled={!isEditing} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">显示在同命匹配中</p>
                  <p className="text-xs text-muted-foreground">允许系统在同命匹配中推荐您</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" disabled={!isEditing} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">接收推荐通知</p>
                  <p className="text-xs text-muted-foreground">接收关于同命人和新服务的通知</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" disabled={!isEditing} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
