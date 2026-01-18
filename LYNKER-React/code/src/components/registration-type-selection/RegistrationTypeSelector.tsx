
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import RoleCard from './RoleCard';

interface RoleOption {
  id: 'user' | 'master';
  title: string;
  description: string;
  icon: string;
  features: string[];
  requirements: string[];
  ctaText: string;
  ctaHref: string;
  badge?: string;
  highlight?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    id: 'user',
    title: '普通用户',
    description: '探索命理，发现同命人，记录预言应验',
    icon: 'User',
    features: [
      '使用假名注册（≥5个字）',
      '浏览命理师列表',
      '预约在线咨询',
      '建立个人知识库',
      '参与社区论坛',
      '发现同命匹配用户',
      '使用AI助手',
    ],
    requirements: [
      '年满18岁',
      '有效的邮箱地址',
      '同意用户协议',
    ],
    ctaText: '普通用户注册',
    ctaHref: './user-registration-form.html',
  },
  {
    id: 'master',
    title: 'Pro命理师',
    description: '提供专业命理服务，建立个人工作室，获得收入',
    icon: 'Crown',
    features: [
      '实名认证注册',
      '创建个人工作室',
      '发布服务项目',
      '管理预约日程',
      '进行在线咨询',
      '管理客户批命记录',
      '发布专业文章',
      '获得平台收入分成',
    ],
    requirements: [
      '实名认证',
      '命理资质证明',
      '年满21岁',
      '有效的邮箱地址',
      '同意服务协议',
    ],
    ctaText: '命理师注册',
    ctaHref: './master-registration-form.html',
    badge: '专业认证',
    highlight: true,
  },
];

export default function RegistrationTypeSelector() {
  const [selectedRole, setSelectedRole] = useState<'user' | 'master' | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
<Button
             id="i3uau"
             variant="ghost"
             size="icon"
             onClick={() => window.location.href = './index.html'}
             className="absolute left-[60px] top-[60px]"
           >
              <SafeIcon name="ArrowLeft" className="h-5 w-5" />
            </Button>
          <div className="w-16 h-16 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary">
            <SafeIcon name="Sparkles" className="w-8 h-8 text-white" />
          </div>
        </div>
<h1 className="text-4xl font-bold mb-3 text-gradient-mystical">选择您的身份</h1>
         <p id="iud6y" className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: '17px' }}>
           灵客AI为不同身份的用户提供定制化体验。选择最适合您的角色，开始您的命理之旅。
         </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {roleOptions.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRole === role.id}
            onSelect={() => setSelectedRole(role.id)}
          />
        ))}
      </div>

      {/* Comparison Section */}
      <Card className="glass-card mb-12">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="BarChart3" className="h-5 w-5 text-accent" />
            <span>功能对比</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">功能</th>
                  <th className="text-center py-3 px-4 font-semibold">普通用户</th>
                  <th className="text-center py-3 px-4 font-semibold">Pro命理师</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">浏览命理师</td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">预约咨询</td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">提供咨询服务</td>
                  <td className="text-center">
                    <SafeIcon name="X" className="h-5 w-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">个人知识库</td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">发布文章</td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">工作室管理</td>
                  <td className="text-center">
                    <SafeIcon name="X" className="h-5 w-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">获得收入</td>
                  <td className="text-center">
                    <SafeIcon name="X" className="h-5 w-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4">同命匹配</td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center">
                    <SafeIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="HelpCircle" className="h-5 w-5 text-accent" />
            <span>常见问题</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">我可以先注册为普通用户，后来升级为命理师吗？</h4>
            <p className="text-muted-foreground text-sm">
              可以。您可以先以普通用户身份体验平台，之后通过实名认证和资质审核升级为Pro命理师。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">命理师需要什么资质？</h4>
            <p className="text-muted-foreground text-sm">
              我们接受各种命理学背景的专业人士，包括八字、紫微、占星等领域的从业者。需要提供相关证书或作品集作为资质证明。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">假名注册有什么限制吗？</h4>
            <p className="text-muted-foreground text-sm">
              假名需要至少5个字，且不能包含敏感词汇。这是为了保护用户隐私同时维护社区秩序。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">如何修改我的身份？</h4>
            <p className="text-muted-foreground text-sm">
              注册后，您可以在账户设置中申请身份变更。如从普通用户升级为命理师，需要通过审核流程。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          注册即表示您同意我们的
          <a href="./placeholder.html" className="text-primary hover:underline mx-1">
            服务条款
          </a>
          和
          <a href="./placeholder.html" className="text-primary hover:underline mx-1">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  );
}
