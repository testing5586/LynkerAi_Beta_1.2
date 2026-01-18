
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserSettingsSidebar from '@/components/page-979411/UserSettingsSidebar';
import AIModelSelector from '@/components/page-979411/AIModelSelector';
import APIKeyManagement from '@/components/page-979411/APIKeyManagement';
import AIPersonalitySettings from '@/components/page-979411/AIPersonalitySettings';
import APIUsageStats from '@/components/page-979411/APIUsageStats';
import UpgradeCard from '@/components/page-979411/UpgradeCard';
import { MOCK_AI_ASSISTANTS, MOCK_AI_ASSISTANT_SETTINGS } from '@/data/ai_settings';

export default function AIAssistantSettingsPage() {
  const [selectedModelId, setSelectedModelId] = useState(MOCK_AI_ASSISTANT_SETTINGS.selectedModelId);
  const [assistantName, setAssistantName] = useState('灵伴AI');
  const [reminderTone, setReminderTone] = useState(MOCK_AI_ASSISTANT_SETTINGS.reminderTone);
  const [enableSubtitles, setEnableSubtitles] = useState(MOCK_AI_ASSISTANT_SETTINGS.enableRealtimeSubtitles);
  const [autoSaveNotes, setAutoSaveNotes] = useState(MOCK_AI_ASSISTANT_SETTINGS.autoSaveNotes);
  const [isSaving, setIsSaving] = useState(false);

  const selectedModel = MOCK_AI_ASSISTANTS.find(m => m.id === selectedModelId);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
    alert('设置已保存');
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <UserSettingsSidebar currentSection="ai_settings" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI助手设置</h1>
            <p className="text-muted-foreground">
              配置您的专属"灵伴AI"助手，提升个性化命理体验
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="model" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="model" className="flex items-center gap-2">
                <SafeIcon name="Bot" className="h-4 w-4" />
                <span className="hidden sm:inline">模型选择</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <SafeIcon name="Key" className="h-4 w-4" />
                <span className="hidden sm:inline">API密钥</span>
              </TabsTrigger>
              <TabsTrigger value="personality" className="flex items-center gap-2">
                <SafeIcon name="Sparkles" className="h-4 w-4" />
                <span className="hidden sm:inline">个性化</span>
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <SafeIcon name="BarChart3" className="h-4 w-4" />
                <span className="hidden sm:inline">使用统计</span>
              </TabsTrigger>
            </TabsList>

            {/* Model Selection Tab */}
            <TabsContent value="model" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>选择AI模型</CardTitle>
                  <CardDescription>
                    选择您偏好的AI助手提供商，每个模型都有不同的特点和优势
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AIModelSelector
                    models={MOCK_AI_ASSISTANTS}
                    selectedModelId={selectedModelId}
                    onSelectModel={setSelectedModelId}
                  />

                  {selectedModel && (
                    <Alert className="border-primary/50 bg-primary/5">
                      <SafeIcon name="Info" className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{selectedModel.name}</strong> - {selectedModel.description}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Assistant Name */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>助手名称</CardTitle>
                  <CardDescription>
                    自定义您的AI助手名称，让它更具个性
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assistant-name">助手名称</Label>
                    <div className="flex gap-2">
                      <Input
                        id="assistant-name"
                        value={assistantName}
                        onChange={(e) => setAssistantName(e.target.value)}
                        placeholder="输入您的AI助手名称"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        title="使用语音输入"
                      >
                        <SafeIcon name="Mic" className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      例如：灵伴、命理小助手、AI命师等
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <SafeIcon name="Lightbulb" className="h-4 w-4 text-accent" />
                    <p className="text-sm text-muted-foreground">
                      提示：给您的AI助手起个有意义的名字，会让交互更加亲切自然
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Key Tab */}
            <TabsContent value="api" className="space-y-6">
              <APIKeyManagement selectedModel={selectedModel} />
            </TabsContent>

            {/* Personality Tab */}
            <TabsContent value="personality" className="space-y-6">
              <AIPersonalitySettings
                reminderTone={reminderTone}
                onToneChange={setReminderTone}
                enableSubtitles={enableSubtitles}
                onSubtitlesChange={setEnableSubtitles}
                autoSaveNotes={autoSaveNotes}
                onAutoSaveChange={setAutoSaveNotes}
              />
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="space-y-6">
              <APIUsageStats />
              <UpgradeCard />
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="mt-8 flex gap-3 justify-end">
            <Button variant="outline">
              <SafeIcon name="RotateCcw" className="h-4 w-4 mr-2" />
              重置
            </Button>
            <Button
              onClick={handleSaveSettings}
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
                  保存设置
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
