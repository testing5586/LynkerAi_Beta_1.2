
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import AIAssistantFloat from '@/components/common/AIAssistantFloat';

export default function AIAssistantFloatDemo() {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <div className="container px-4 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gradient-mystical">AI助手浮窗</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          这是一个固定在页面右下角的浮窗，为用户提供便捷的AI助手入口。用户可以随时点击展开或收起进行交互，开始与AI的实时对话，或调整相关的助手设置。
        </p>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center">
              <SafeIcon name="MessageSquare" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold">实时对话</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            与AI助手进行实时对话，获取命理建议和指导
          </p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center">
              <SafeIcon name="BookOpen" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold">知识库访问</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            快速访问个人知识库，查看历史预测记录
          </p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center">
              <SafeIcon name="FileText" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold">AI生成笔记</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            查看AI自动生成的Markdown格式笔记
          </p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center">
              <SafeIcon name="CheckCircle" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold">预言应验</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            管理和追踪预言应验记录，验证预测准确性
          </p>
        </Card>
      </div>

      {/* Functionality Tabs */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">功能特性</TabsTrigger>
          <TabsTrigger value="navigation">导航流程</TabsTrigger>
          <TabsTrigger value="settings">设置选项</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <Card className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <SafeIcon name="Sparkles" className="w-5 h-5 text-accent" />
              <span>核心功能</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Badge variant="secondary" className="mt-1">1</Badge>
                <div>
                  <p className="font-medium">展开/收起浮窗</p>
                  <p className="text-sm text-muted-foreground">点击浮窗按钮展开完整菜单，再次点击收起</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Badge variant="secondary" className="mt-1">2</Badge>
                <div>
                  <p className="font-medium">最小化功能</p>
                  <p className="text-sm text-muted-foreground">将浮窗最小化为图标，节省屏幕空间</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Badge variant="secondary" className="mt-1">3</Badge>
                <div>
                  <p className="font-medium">未读消息提示</p>
                  <p className="text-sm text-muted-foreground">显示未读消息计数，及时提醒用户</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Badge variant="secondary" className="mt-1">4</Badge>
                <div>
                  <p className="font-medium">快速访问</p>
                  <p className="text-sm text-muted-foreground">一键访问聊天、知识库、笔记等功能</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Badge variant="secondary" className="mt-1">5</Badge>
                <div>
                  <p className="font-medium">在线状态</p>
                  <p className="text-sm text-muted-foreground">显示AI助手在线状态，确保服务可用</p>
                </div>
              </li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <SafeIcon name="Navigation" className="w-5 h-5 text-accent" />
              <span>导航流程</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="font-medium">打开AI聊天界面</p>
                  <p className="text-sm text-muted-foreground">点击"开始对话"按钮</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="./ai-chat-interface.html">前往</a>
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="font-medium">查看知识库</p>
                  <p className="text-sm text-muted-foreground">点击"查看知识库"按钮</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="./knowledge-base.html">前往</a>
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="font-medium">查看AI生成笔记</p>
                  <p className="text-sm text-muted-foreground">点击"AI生成笔记"按钮</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="./ai-generated-note-view.html">前往</a>
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="font-medium">管理预言应验记录</p>
                  <p className="text-sm text-muted-foreground">点击"预言应验记录"按钮</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="./prophecy-verification-record.html">前往</a>
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="font-medium">配置助手设置</p>
                  <p className="text-sm text-muted-foreground">点击"助手设置"按钮</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="./ai-assistant-settings.html">前往</a>
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <SafeIcon name="Settings" className="w-5 h-5 text-accent" />
              <span>可配置选项</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <SafeIcon name="Check" className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">实时字幕开关</p>
                  <p className="text-sm text-muted-foreground">在AI聊天中启用/禁用实时字幕功能</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon name="Check" className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">通知偏好</p>
                  <p className="text-sm text-muted-foreground">设置消息通知的频率和方式</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon name="Check" className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">笔记自动保存</p>
                  <p className="text-sm text-muted-foreground">启用自动保存AI生成的笔记到知识库</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon name="Check" className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">AI模型选择</p>
                  <p className="text-sm text-muted-foreground">选择ChatGPT、Qwen、Gemini或DeepSeek</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon name="Check" className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">API密钥配置</p>
                  <p className="text-sm text-muted-foreground">配置您选择的AI服务的API密钥</p>
                </div>
              </li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Demo Section */}
      <Card className="glass-card p-8 mb-12">
        <h3 className="text-xl font-semibold mb-6">浮窗演示</h3>
        <div className="bg-background/50 rounded-lg p-8 min-h-96 flex items-center justify-center relative">
<div className="text-center space-y-4">
          </div>
        </div>
      </Card>

      {/* Usage Guidelines */}
      <Card className="glass-card p-6">
        <h3 className="font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon name="BookOpen" className="w-5 h-5 text-accent" />
          <span>使用指南</span>
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium mb-2">💡 最佳实践</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>在咨询前使用AI助手了解基本命理知识</li>
              <li>及时保存AI生成的笔记到知识库</li>
              <li>定期更新预言应验记录以验证准确性</li>
              <li>根据需要调整AI助手的设置以获得最佳体验</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">🔔 消息提醒</p>
            <p className="text-muted-foreground">
              浮窗会显示未读消息计数，点击浮窗可查看所有待处理的消息和提醒。
            </p>
          </div>
          <div>
            <p className="font-medium mb-2">⚙️ 个性化设置</p>
            <p className="text-muted-foreground">
              访问AI助手设置页面，根据您的偏好配置实时字幕、通知方式和AI模型选择。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
