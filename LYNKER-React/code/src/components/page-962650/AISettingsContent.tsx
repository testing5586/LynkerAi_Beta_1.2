
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_ASSISTANTS, MOCK_AI_ASSISTANT_SETTINGS } from '@/data/ai_settings';

export default function AISettingsContent() {
  // Initialize with mock data
  const [selectedModelId, setSelectedModelId] = useState(MOCK_AI_ASSISTANT_SETTINGS.selectedModelId);
  const [assistantName, setAssistantName] = useState('灵伴AI');
  const [reminderTone, setReminderTone] = useState(MOCK_AI_ASSISTANT_SETTINGS.reminderTone);
  const [enableRealtimeSubtitles, setEnableRealtimeSubtitles] = useState(
    MOCK_AI_ASSISTANT_SETTINGS.enableRealtimeSubtitles
  );
  const [autoSaveNotes, setAutoSaveNotes] = useState(MOCK_AI_ASSISTANT_SETTINGS.autoSaveNotes);
  const [tokenLimitAlert, setTokenLimitAlert] = useState(
    MOCK_AI_ASSISTANT_SETTINGS.tokenLimitAlertThreshold
  );
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    chatgpt: '****...****',
    qwen: '****...****',
    gemini: '****...****',
    deepseek: '****...****',
  });
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedModel = MOCK_AI_ASSISTANTS.find((m) => m.id === selectedModelId);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success toast (in real app)
    console.log('Settings saved successfully');
  };

  const handleVoiceInput = () => {
    setIsVoiceInputActive(!isVoiceInputActive);
    // In real app, would trigger speech recognition
    if (!isVoiceInputActive) {
      console.log('Starting voice input...');
    }
  };

  const handleUpdateAPIKey = (modelId: string) => {
    // In real app, would open a dialog to update API key
    console.log(`Update API key for ${modelId}`);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="container max-w-4xl py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI助手设置</h1>
          <p className="text-muted-foreground">
            配置您的专属"灵伴AI"助手，提升个性化体验
          </p>
        </div>

        <Tabs defaultValue="model" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="model">模型选择</TabsTrigger>
            <TabsTrigger value="customize">自定义设置</TabsTrigger>
            <TabsTrigger value="features">功能开关</TabsTrigger>
            <TabsTrigger value="api">API管理</TabsTrigger>
          </TabsList>

          {/* Tab 1: Model Selection */}
          <TabsContent value="model" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>选择AI模型</CardTitle>
                <CardDescription>
                  选择最适合您的AI助手提供商，不同模型在命理分析能力上各有特色
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedModelId} onValueChange={setSelectedModelId}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_AI_ASSISTANTS.map((model) => (
                      <div
                        key={model.id}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedModelId === model.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={model.id} id={model.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={model.id} className="cursor-pointer">
                              <div className="flex items-center space-x-2 mb-1">
                                <SafeIcon name={model.iconName} className="h-5 w-5 text-primary" />
                                <span className="font-semibold">{model.name}</span>
                              </div>
                            </Label>
                            <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="w-full"
                            >
                              <a href={model.keySetupLinkUrl}>
                                <SafeIcon name="ExternalLink" className="h-3 w-3 mr-1" />
                                {model.keySetupLinkTitle}
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {selectedModel && (
                  <Alert className="border-primary/50 bg-primary/5">
                    <SafeIcon name="Info" className="h-4 w-4" />
                    <AlertTitle>当前选择</AlertTitle>
                    <AlertDescription>
                      您已选择 <strong>{selectedModel.name}</strong> 作为AI助手提供商
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Upgrade Section */}
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
                  <span>升级到高级API</span>
                </CardTitle>
                <CardDescription>
                  获得更快的响应速度和更强大的分析能力
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: '标准版', price: '免费', features: ['基础分析', '每月1000 tokens'] },
                    { name: '专业版', price: '¥99/月', features: ['深度分析', '每月10000 tokens', '优先支持'] },
                    { name: '企业版', price: '¥299/月', features: ['完整分析', '无限 tokens', '24/7支持'] },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <h4 className="font-semibold mb-1">{plan.name}</h4>
                      <p className="text-lg font-bold text-accent mb-3">{plan.price}</p>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="text-sm text-muted-foreground flex items-center">
                            <SafeIcon name="Check" className="h-4 w-4 mr-2 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full" size="sm">
                        升级
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Customization */}
          <TabsContent value="customize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>自定义您的AI助手</CardTitle>
                <CardDescription>
                  为您的AI助手起个独特的名字，设置它的语气风格
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Assistant Name */}
                <div className="space-y-3">
                  <Label htmlFor="assistant-name" className="text-base font-semibold">
                    助手名称
                  </Label>
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
                      onClick={handleVoiceInput}
                      className={isVoiceInputActive ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <SafeIcon name="Mic" className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isVoiceInputActive ? '🎤 正在监听...' : '点击麦克风图标使用语音输入'}
                  </p>
                </div>

                <Separator />

                {/* Tone Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">AI语气风格</Label>
                  <p className="text-sm text-muted-foreground">
                    选择AI助手与您交互时的语气风格
                  </p>
                  <RadioGroup value={reminderTone} onValueChange={(value: any) => setReminderTone(value)}>
                    <div className="space-y-3">
                      {[
                        {
                          value: 'Professional',
                          label: '专业严谨',
                          description: '正式、学术性强，适合深度命理分析',
                          icon: 'Briefcase',
                        },
                        {
                          value: 'Friendly',
                          label: '友好亲切',
                          description: '温暖、易理解，适合日常交流',
                          icon: 'Smile',
                        },
                        {
                          value: 'Witty',
                          label: '幽默风趣',
                          description: '活泼、有趣，适合轻松互动',
                          icon: 'Laugh',
                        },
                      ].map((tone) => (
                        <div
                          key={tone.value}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            reminderTone === tone.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value={tone.value} id={tone.value} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={tone.value} className="cursor-pointer">
                                <div className="flex items-center space-x-2 mb-1">
                                  <SafeIcon name={tone.icon} className="h-5 w-5 text-primary" />
                                  <span className="font-semibold">{tone.label}</span>
                                </div>
                              </Label>
                              <p className="text-sm text-muted-foreground">{tone.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Custom Prompt */}
                <div className="space-y-3">
                  <Label htmlFor="custom-prompt" className="text-base font-semibold">
                    自定义提示词（可选）
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    为AI助手设置特定的个性和功能指导
                  </p>
                  <textarea
                    id="custom-prompt"
                    placeholder="例如：你是一位温和的命理师，擅长用比喻来解释复杂的命理概念..."
                    className="w-full h-32 p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="你是一位温和的命理师，擅长用比喻来解释复杂的命理概念。"
                  />
                  <p className="text-xs text-muted-foreground">
                    提示词将影响AI的回应风格和内容深度
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Features */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>功能开关</CardTitle>
                <CardDescription>
                  启用或禁用AI助手的各项功能
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Realtime Subtitles */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-start space-x-3">
                    <SafeIcon name="Captions" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">实时字幕</h4>
                      <p className="text-sm text-muted-foreground">
                        在咨询过程中自动生成实时字幕转录
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={enableRealtimeSubtitles}
                    onCheckedChange={setEnableRealtimeSubtitles}
                  />
                </div>

                {/* Auto Save Notes */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-start space-x-3">
                    <SafeIcon name="Save" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">自动保存笔记</h4>
                      <p className="text-sm text-muted-foreground">
                        自动将AI生成的Markdown笔记保存到知识库
                      </p>
                    </div>
                  </div>
                  <Switch checked={autoSaveNotes} onCheckedChange={setAutoSaveNotes} />
                </div>

                {/* Token Limit Alert */}
                <div className="space-y-3 p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <SafeIcon name="AlertCircle" className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold">Token额度提醒</h4>
                        <p className="text-sm text-muted-foreground">
                          当使用量达到设定百分比时发送提醒
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-8">
                    <Input
                      type="number"
                      min="10"
                      max="100"
                      step="10"
                      value={tokenLimitAlert}
                      onChange={(e) => setTokenLimitAlert(parseInt(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-start space-x-3">
                    <SafeIcon name="Bell" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">命理师提醒</h4>
                      <p className="text-sm text-muted-foreground">
                        接收AI关于命理断语的提醒和建议
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* Privacy Mode */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-start space-x-3">
                    <SafeIcon name="Lock" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">隐私模式</h4>
                      <p className="text-sm text-muted-foreground">
                        不保存对话历史，增强隐私保护
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: API Management */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API密钥管理</CardTitle>
                <CardDescription>
                  管理您的AI服务提供商API密钥和绑定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {MOCK_AI_ASSISTANTS.map((model) => (
                  <div
                    key={model.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <SafeIcon name={model.iconName} className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{model.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {apiKeys[model.id] ? '已绑定' : '未绑定'}
                          </p>
                        </div>
                      </div>
                      {apiKeys[model.id] && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                          <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                          已配置
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={apiKeys[model.id]}
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateAPIKey(model.id)}
                      >
                        <SafeIcon name="Edit" className="h-4 w-4 mr-2" />
                        更新
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <SafeIcon name="Info" className="h-3 w-3 inline mr-1" />
                      点击"更新"按钮修改或添加API密钥
                    </p>
                  </div>
                ))}

                <Alert className="border-amber-500/50 bg-amber-500/5">
                  <SafeIcon name="AlertTriangle" className="h-4 w-4 text-amber-600" />
                  <AlertTitle>安全提示</AlertTitle>
                  <AlertDescription>
                    请勿在任何地方分享您的API密钥。灵客AI不会要求您提供密钥。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Connected Services */}
            <Card>
              <CardHeader>
                <CardTitle>已连接的服务</CardTitle>
                <CardDescription>
                  管理与第三方服务的连接
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Google Drive', connected: true, icon: 'HardDrive' },
                  { name: 'Notion', connected: false, icon: 'FileText' },
                  { name: 'Slack', connected: false, icon: 'MessageSquare' },
                ].map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <SafeIcon name={service.icon} className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={service.connected ? 'text-destructive' : ''}
                    >
                      {service.connected ? '断开连接' : '连接'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" asChild>
            <a href="./page-962651.html">返回</a>
          </Button>
          <Button
            className="bg-mystical-gradient hover:opacity-90"
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <SafeIcon name="Loader" className="h-4 w-4 mr-2 animate-spin" />
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
  );
}
