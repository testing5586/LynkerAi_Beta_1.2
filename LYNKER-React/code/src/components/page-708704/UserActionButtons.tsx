
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface UserActionButtonsProps {}

export default function UserActionButtons({}: UserActionButtonsProps) {
  const actions = [
    {
      label: '我的知识库',
      description: '查看和管理您的预测记录',
      icon: 'BookOpen',
      href: './knowledge-base-main.html',
      color: 'text-blue-500',
    },
    {
      label: '我的帖子',
      description: '查看您在论坛发布的内容',
      icon: 'MessageSquare',
      href: './forum-homepage.html',
      color: 'text-purple-500',
    },
    {
      label: '消息中心',
description: '查看与同命人的对话',
      icon: 'Mail',
      href: './page-945207.html',
      color: 'text-green-500',
    },
    {
      label: '预约咨询',
      description: '与Pro命理师进行一对一咨询',
      icon: 'Calendar',
      href: './prognosis-service-entry.html',
      color: 'text-orange-500',
    },
    {
      label: '同命匹配',
      description: '发现与您命盘相匹配的用户',
      icon: 'Users',
      href: './homology-match-discovery.html',
      color: 'text-pink-500',
    },
    {
      label: 'AI助手设置',
      description: '配置您的AI助手偏好',
      icon: 'Settings',
      href: './ai-assistant-settings.html',
      color: 'text-indigo-500',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">快捷导航</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Card key={action.label} className="glass-card hover:shadow-card transition-all cursor-pointer group">
            <CardContent className="p-4">
              <a href={action.href} className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <SafeIcon name={action.icon} className={`w-6 h-6 ${action.color}`} />
                  <SafeIcon name="ArrowRight" className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{action.label}</h3>
                <p className="text-sm text-muted-foreground flex-1">{action.description}</p>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
