
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import AIAssistantSelector from '@/components/ai-assistant-settings/AIAssistantSelector';
import APIKeyConfig from '@/components/ai-assistant-settings/APIKeyConfig';
import FeatureToggles from '@/components/ai-assistant-settings/FeatureToggles';
import NotificationPreferences from '@/components/ai-assistant-settings/NotificationPreferences';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';

export default function AIAssistantSettingsPage() {
  const [selectedAssistant, setSelectedAssistant] = useState('chatgpt');
  const [settings, setSettings] = useState({
    realtimeSubtitles: true,
    autoSaveNotes: true,
    aiReminders: true,
    notificationEmail: true,
    notificationInApp: true,
    dailyDigest: false,
  });

  const handleSaveSettings = () => {
    // Mock save - in real app, would call API
    console.log('Settings saved:', { selectedAssistant, settings });
    alert('设置已保存！');
  };

  const handleResetSettings = () => {
    setSettings({
      realtimeSubtitles: true,
      autoSaveNotes: true,
      aiReminders: true,
      notificationEmail: true,
      notificationInApp: true,
      dailyDigest: false,
    });
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background">
      <div className="container max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-mystical-gradient flex items-center justify-center">
              <SafeIcon name="Settings" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI助手设置</h1>
              <p className="text-muted-foreground">个性化您的AI助手体验</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            配置您的AI助手参数，包括选择AI模型、API密钥、功能偏好和通知设置。
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="assistant" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assistant" className="flex items-center space-x-2">
              <SafeIcon name="Bot" className="w-4 h-4" />
              <span className="hidden sm:inline">AI助手</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <SafeIcon name="Key" className="w-4 h-4" />
              <span className="hidden sm:inline">API配置</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center space-x-2">
              <SafeIcon name="Zap" className="w-4 h-4" />
              <span className="hidden sm:inline">功能</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <SafeIcon name="Bell" className="w-4 h-4" />
              <span className="hidden sm:inline">通知</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Assistant Selection Tab */}
          <TabsContent value="assistant" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>选择AI助手</CardTitle>
                <CardDescription>
                  选择最适合您的AI模型。不同模型在语言处理和命理分析方面各有特色。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIAssistantSelector
                  assistants={MOCK_AI_ASSISTANTS}
                  selectedId={selectedAssistant}
                  onSelect={setSelectedAssistant}
                />
              </CardContent>
            </Card>

            {/* Current Selection Info */}
            {MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAssistant) && (
              <Card className="glass-card border-accent/50 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-base">当前选择</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">
                        {MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAssistant)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAssistant)?.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">下一步：配置API密钥</p>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full"
                      >
                        <a href={MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAssistant)?.keySetupLinkUrl || '#'}>
                          <SafeIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                          {MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAssistant)?.keySetupLinkTitle}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* API Configuration Tab */}
          <TabsContent value="api" className="space-y-4">
            <APIKeyConfig selectedAssistant={selectedAssistant} />
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-4">
            <FeatureToggles settings={settings} onSettingsChange={setSettings} />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <NotificationPreferences settings={settings} onSettingsChange={setSettings} />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            className="flex items-center space-x-2"
          >
            <SafeIcon name="RotateCcw" className="w-4 h-4" />
            <span>重置为默认</span>
          </Button>
          <Button
            onClick={handleSaveSettings}
            className="bg-mystical-gradient hover:opacity-90 flex items-center space-x-2"
          >
            <SafeIcon name="Save" className="w-4 h-4" />
            <span>保存设置</span>
          </Button>
        </div>

        {/* Help Section */}
        <Card className="glass-card mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <SafeIcon name="HelpCircle" className="w-5 h-5" />
              <span>需要帮助？</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>实时字幕：</strong>
              启用后，AI助手将实时转录您与命理师的对话，帮助您更好地记录咨询内容。
            </p>
            <p>
              <strong>自动保存笔记：</strong>
              启用后，AI将自动生成Markdown格式的咨询笔记并保存到您的知识库。
            </p>
            <p>
              <strong>AI断语提醒：</strong>
              启用后，AI将在检测到重要命理断语时提醒命理师注意。
            </p>
            <Separator className="my-3" />
            <p className="text-muted-foreground">
              如有问题，请访问{' '}
              <a href="#" className="text-accent hover:underline">
                帮助中心
              </a>
              或{' '}
              <a href="#" className="text-accent hover:underline">
                联系支持
              </a>
              。
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
