
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import SettingsSidebar from '@/components/page-1035308/SettingsSidebar';
import AIProviderSelector from '@/components/page-1035308/AIProviderSelector';
import APIKeyManager from '@/components/page-1035308/APIKeyManager';
import AIAssistantNaming from '@/components/page-1035308/AIAssistantNaming';
import VoiceInputSettings from '@/components/page-1035308/VoiceInputSettings';
import PaymentSettings from '@/components/page-1035308/PaymentSettings';

interface AIAssistantConfig {
  provider: 'chatgpt' | 'gemini' | 'qwen' | 'deepseek' | 'claude';
  apiKey: string;
  assistantName: string;
  voiceEnabled: boolean;
  voiceLanguage: string;
  tone: 'formal' | 'casual' | 'mystical' | 'professional';
  customPrompt: string;
  isPremium: boolean;
}

const mockConfig: AIAssistantConfig = {
  provider: 'chatgpt',
  apiKey: 'sk-proj-••••••••••••••••••••',
  assistantName: '灵伴AI',
  voiceEnabled: true,
  voiceLanguage: 'zh-CN',
  tone: 'mystical',
  customPrompt: '你是一位专业的命理分析师，擅长八字、紫微、占星等多个领域...',
  isPremium: false,
};

export default function AIAssistantSettingsPage() {
  const [isClient, setIsClient] = useState(true);
  const [config, setConfig] = useState<AIAssistantConfig>(mockConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('provider');

  useEffect(() => {
    setIsClient(false);
    
    // Simulate loading config from server
    const timer = setTimeout(() => {
      setConfig(mockConfig);
      setIsClient(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleBackToProfile = () => {
    window.location.href = './page-979337.html';
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      <SettingsSidebar currentPage="ai-settings" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container max-w-4xl py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient-mystical mb-2">AI助手设置</h1>
                <p className="text-muted-foreground">
                  配置您的专属"灵伴AI"助手，提升个性化体验
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleBackToProfile}
                className="gap-2"
              >
                <SafeIcon name="ArrowLeft" className="h-4 w-4" />
                返回个人资料
              </Button>
            </div>
          </div>

          {/* Success Alert */}
          {(saveSuccess || isClient) && (
            <Alert className="mb-6 border-accent bg-accent/10">
              <SafeIcon name="CheckCircle" className="h-4 w-4 text-accent" />
              <AlertDescription className="text-accent">
                设置已保存成功！您的AI助手已更新配置。
              </AlertDescription>
            </Alert>
          )}

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50">
              <TabsTrigger value="provider" className="gap-2">
                <SafeIcon name="Zap" className="h-4 w-4" />
                <span className="hidden sm:inline">提供商</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <SafeIcon name="Key" className="h-4 w-4" />
                <span className="hidden sm:inline">API密钥</span>
              </TabsTrigger>
              <TabsTrigger value="naming" className="gap-2">
                <SafeIcon name="Edit" className="h-4 w-4" />
                <span className="hidden sm:inline">命名</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="gap-2">
                <SafeIcon name="Mic" className="h-4 w-4" />
                <span className="hidden sm:inline">语音</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-2">
                <SafeIcon name="CreditCard" className="h-4 w-4" />
                <span className="hidden sm:inline">支付</span>
              </TabsTrigger>
            </TabsList>

            {/* Provider Tab */}
            <TabsContent value="provider" className="space-y-6">
              <AIProviderSelector
                currentProvider={config.provider}
                onProviderChange={(provider) =>
                  setConfig({ ...config, provider })
                }
              />
            </TabsContent>

            {/* API Key Tab */}
            <TabsContent value="api" className="space-y-6">
              <APIKeyManager
                provider={config.provider}
                apiKey={config.apiKey}
                onApiKeyChange={(apiKey) =>
                  setConfig({ ...config, apiKey })
                }
              />
            </TabsContent>

            {/* Naming Tab */}
            <TabsContent value="naming" className="space-y-6">
              <AIAssistantNaming
                assistantName={config.assistantName}
                tone={config.tone}
                customPrompt={config.customPrompt}
                onNameChange={(name) =>
                  setConfig({ ...config, assistantName: name })
                }
                onToneChange={(tone) =>
                  setConfig({ ...config, tone })
                }
                onPromptChange={(prompt) =>
                  setConfig({ ...config, customPrompt: prompt })
                }
              />
            </TabsContent>

            {/* Voice Tab */}
            <TabsContent value="voice" className="space-y-6">
              <VoiceInputSettings
                voiceEnabled={config.voiceEnabled}
                voiceLanguage={config.voiceLanguage}
                onVoiceEnabledChange={(enabled) =>
                  setConfig({ ...config, voiceEnabled: enabled })
                }
                onLanguageChange={(language) =>
                  setConfig({ ...config, voiceLanguage: language })
                }
              />
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6">
              <PaymentSettings
                isPremium={config.isPremium}
                provider={config.provider}
              />
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-mystical-gradient hover:opacity-90 gap-2"
            >
              {isSaving ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <SafeIcon name="Save" className="h-4 w-4" />
                  保存设置
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleBackToProfile}
              className="gap-2"
            >
              <SafeIcon name="X" className="h-4 w-4" />
              取消
            </Button>
          </div>

          {/* Info Card */}
          <Card className="mt-8 border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Info" className="h-5 w-5 text-accent" />
                使用提示
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                • 不同的AI提供商有不同的能力和定价模式，请根据您的需求选择
              </p>
              <p>
                • API密钥应妥善保管，不要在公开场合分享
              </p>
              <p>
                • 自定义提示词可以帮助AI更好地理解您的需求和风格
              </p>
              <p>
                • 语音输入支持多种语言，选择您最常用的语言以获得最佳体验
              </p>
              <p>
                • 升级到高级版本可解锁更多功能和更高的API额度
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
