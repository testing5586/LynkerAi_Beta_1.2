
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import UserDashboardSidebar from '@/components/page-979411/UserDashboardSidebar';
import AIProviderCard from '@/components/page-979411/AIProviderCard';
import APIKeyManager from '@/components/page-979411/APIKeyManager';
import AIToneSettings from '@/components/page-979411/AIToneSettings';
import APIUsageStats from '@/components/page-979411/APIUsageStats';
import UpgradeOptions from '@/components/page-979411/UpgradeOptions';
import { MOCK_AI_ASSISTANTS, MOCK_AI_ASSISTANT_SETTINGS } from '@/data/ai_settings';

export default function AIAssistantSettings() {
  const [selectedProvider, setSelectedProvider] = useState(MOCK_AI_ASSISTANT_SETTINGS.selectedModelId);
  const [assistantName, setAssistantName] = useState('灵伴AI');
  const [reminderTone, setReminderTone] = useState(MOCK_AI_ASSISTANT_SETTINGS.reminderTone);
  const [enableSubtitles, setEnableSubtitles] = useState(MOCK_AI_ASSISTANT_SETTINGS.enableRealtimeSubtitles);
  const [autoSaveNotes, setAutoSaveNotes] = useState(MOCK_AI_ASSISTANT_SETTINGS.autoSaveNotes);
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const selectedProviderData = MOCK_AI_ASSISTANTS.find(p => p.id === selectedProvider);

  const handleSaveSettings = () => {
    // In real app, this would save to backend
    console.log('Settings saved:', {
      selectedProvider,
      assistantName,
      reminderTone,
      enableSubtitles,
      autoSaveNotes,
      voiceInputEnabled,
    });
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <UserDashboardSidebar activeItem="ai_settings" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl py-8 px-4 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI助手设置</h1>
            <p className="text-muted-foreground">
              配置您的专属"灵伴AI"助手，提升个性化体验
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="provider" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="provider" className="flex items-center gap-2">
                <SafeIcon name="Bot" className="h-4 w-4" />
                <span className="hidden sm:inline">AI提供商</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <SafeIcon name="Settings" className="h-4 w-4" />
                <span className="hidden sm:inline">设置</span>
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <SafeIcon name="BarChart3" className="h-4 w-4" />
                <span className="hidden sm:inline">使用统计</span>
              </TabsTrigger>
              <TabsTrigger value="upgrade" className="flex items-center gap-2">
                <SafeIcon name="Zap" className="h-4 w-4" />
                <span className="hidden sm:inline">升级</span>
              </TabsTrigger>
            </TabsList>

            {/* Provider Selection Tab */}
            <TabsContent value="provider" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>选择AI提供商</CardTitle>
                  <CardDescription>
                    选择您偏好的AI模型作为灵伴AI的核心引擎
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_AI_ASSISTANTS.map((provider) => (
                      <AIProviderCard
                        key={provider.id}
                        provider={provider}
                        isSelected={selectedProvider === provider.id}
                        onSelect={() => setSelectedProvider(provider.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* API Key Manager */}
              {selectedProviderData && (
                <APIKeyManager provider={selectedProviderData} />
              )}

              {/* Assistant Name */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>自定义助手名称</CardTitle>
                  <CardDescription>
                    为您的AI助手起一个独特的名字
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assistant-name">助手名称</Label>
                    <Input
                      id="assistant-name"
                      value={assistantName}
                      onChange={(e) => setAssistantName(e.target.value)}
                      placeholder="输入您的AI助手名称"
                      className="bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      建议使用2-20个字符，可包含中文、英文和数字
                    </p>
                  </div>

                  {/* Voice Input */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Label>语音输入</Label>
                      <Button
                        variant={voiceInputEnabled ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVoiceInputEnabled(!voiceInputEnabled)}
                      >
                        <SafeIcon name={voiceInputEnabled ? 'Mic' : 'MicOff'} className="h-4 w-4 mr-2" />
                        {voiceInputEnabled ? '已启用' : '已禁用'}
                      </Button>
                    </div>
                    {voiceInputEnabled && (
                      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <p className="text-sm text-muted-foreground">
                          启用语音输入后，您可以通过语音与AI助手交互
                        </p>
                        <Button
                          variant={isRecording ? 'destructive' : 'secondary'}
                          className="w-full"
                          onClick={() => setIsRecording(!isRecording)}
                        >
                          <SafeIcon name={isRecording ? 'Square' : 'Mic'} className="h-4 w-4 mr-2" />
                          {isRecording ? '停止录音' : '开始录音'}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <AIToneSettings
                reminderTone={reminderTone}
                onToneChange={setReminderTone}
              />

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>功能设置</CardTitle>
                  <CardDescription>
                    配置AI助手的工作方式
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Real-time Subtitles */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-semibold">实时字幕</Label>
                      <p className="text-sm text-muted-foreground">
                        在咨询过程中显示实时字幕转录
                      </p>
                    </div>
                    <Button
                      variant={enableSubtitles ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setEnableSubtitles(!enableSubtitles)}
                    >
                      {enableSubtitles ? '已启用' : '已禁用'}
                    </Button>
                  </div>

                  {/* Auto-save Notes */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-semibold">自动保存笔记</Label>
                      <p className="text-sm text-muted-foreground">
                        自动将咨询内容生成Markdown笔记并保存到知识库
                      </p>
                    </div>
                    <Button
                      variant={autoSaveNotes ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAutoSaveNotes(!autoSaveNotes)}
                    >
                      {autoSaveNotes ? '已启用' : '已禁用'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Personality Settings */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>AI个性设置</CardTitle>
                  <CardDescription>
                    自定义AI助手的回答风格和个性
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>回答风格</Label>
                    <RadioGroup defaultValue="balanced">
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="concise" id="concise" />
                        <Label htmlFor="concise" className="cursor-pointer flex-1">
                          <span className="font-medium">简洁风格</span>
                          <p className="text-sm text-muted-foreground">直接回答，避免冗长解释</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="balanced" id="balanced" />
                        <Label htmlFor="balanced" className="cursor-pointer flex-1">
                          <span className="font-medium">平衡风格</span>
                          <p className="text-sm text-muted-foreground">适度详细，兼顾准确性和易读性</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="detailed" id="detailed" />
                        <Label htmlFor="detailed" className="cursor-pointer flex-1">
                          <span className="font-medium">详细风格</span>
                          <p className="text-sm text-muted-foreground">深入分析，提供详细解释和背景</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label>专业程度</Label>
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[60]}
                        min={0}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>友好随意</span>
                        <span>专业严谨</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label htmlFor="custom-prompt">自定义提示词</Label>
                    <textarea
                      id="custom-prompt"
                      placeholder="输入自定义提示词来定制AI的行为和个性..."
                      className="w-full h-24 p-3 rounded-lg bg-muted/50 border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="你是一位专业的命理分析师，以深邃的洞察力和温暖的语气为用户提供命理指导。"
                    />
                    <p className="text-xs text-muted-foreground">
                      提示词将影响AI的回答方式和内容风格
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usage Statistics Tab */}
            <TabsContent value="usage" className="space-y-6">
              <APIUsageStats />
            </TabsContent>

            {/* Upgrade Tab */}
            <TabsContent value="upgrade" className="space-y-6">
              <UpgradeOptions />
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex gap-3 mt-8 sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 -mx-4 md:-mx-8 border-t">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex-1"
            >
              <SafeIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              返回
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="flex-1 bg-mystical-gradient hover:opacity-90"
            >
              <SafeIcon name="Save" className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
