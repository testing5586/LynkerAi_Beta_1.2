
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_ASSISTANTS, MOCK_AI_ASSISTANT_SETTINGS } from '@/data/ai_settings';
import AIProviderSelector from './AIProviderSelector';
import APIKeyConfiguration from './APIKeyConfiguration';
import AssistantCustomization from './AssistantCustomization';
import VoiceAndToneSettings from './VoiceAndToneSettings';
import UpgradeOptions from './UpgradeOptions';

export default function AIAssistantSettings() {
  const [selectedProvider, setSelectedProvider] = useState(MOCK_AI_ASSISTANT_SETTINGS.selectedModelId);
  const [assistantName, setAssistantName] = useState('灵伴AI');
  const [enableVoiceInput, setEnableVoiceInput] = useState(true);
  const [selectedTone, setSelectedTone] = useState(MOCK_AI_ASSISTANT_SETTINGS.reminderTone);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    chatgpt: '••••••••••••••••',
    qwen: '••••••••••••••••',
    gemini: '••••••••••••••••',
    deepseek: '••••••••••••••••',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedAssistant = MOCK_AI_ASSISTANTS.find(a => a.id === selectedProvider);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveSuccess(true);
    setIsSaving(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container max-w-4xl py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient-mystical mb-2">AI助手设置</h1>
          <p className="text-muted-foreground">
            配置您的专属"灵伴AI"助手，提升个性化体验
          </p>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 border-green-500/50 bg-green-500/10">
            <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">设置已保存</AlertTitle>
            <AlertDescription className="text-green-500/80">
              您的AI助手设置已成功更新
            </AlertDescription>
          </Alert>
        )}

        {/* Main Tabs */}
        <Tabs defaultValue="provider" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="provider" className="flex items-center gap-2">
              <SafeIcon name="Sparkles" className="h-4 w-4" />
              <span className="hidden sm:inline">提供商</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <SafeIcon name="Key" className="h-4 w-4" />
              <span className="hidden sm:inline">API密钥</span>
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-2">
              <SafeIcon name="Settings" className="h-4 w-4" />
              <span className="hidden sm:inline">自定义</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <SafeIcon name="Mic" className="h-4 w-4" />
              <span className="hidden sm:inline">语音</span>
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="flex items-center gap-2">
              <SafeIcon name="Zap" className="h-4 w-4" />
              <span className="hidden sm:inline">升级</span>
            </TabsTrigger>
          </TabsList>

          {/* Provider Selection Tab */}
          <TabsContent value="provider" className="space-y-6">
            <AIProviderSelector
              selectedProvider={selectedProvider}
              onSelectProvider={setSelectedProvider}
              assistants={MOCK_AI_ASSISTANTS}
            />
          </TabsContent>

          {/* API Key Configuration Tab */}
          <TabsContent value="api" className="space-y-6">
            <APIKeyConfiguration
              selectedProvider={selectedProvider}
              apiKeys={apiKeys}
              onUpdateApiKey={(provider, key) => {
                setApiKeys(prev => ({ ...prev, [provider]: key }));
              }}
              assistants={MOCK_AI_ASSISTANTS}
            />
          </TabsContent>

          {/* Customization Tab */}
          <TabsContent value="customize" className="space-y-6">
            <AssistantCustomization
              assistantName={assistantName}
              onNameChange={setAssistantName}
              selectedProvider={selectedProvider}
            />
          </TabsContent>

          {/* Voice and Tone Tab */}
          <TabsContent value="voice" className="space-y-6">
            <VoiceAndToneSettings
              enableVoiceInput={enableVoiceInput}
              onVoiceInputChange={setEnableVoiceInput}
              selectedTone={selectedTone}
              onToneChange={setSelectedTone}
            />
          </TabsContent>

          {/* Upgrade Options Tab */}
          <TabsContent value="upgrade" className="space-y-6">
            <UpgradeOptions selectedProvider={selectedProvider} />
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" asChild>
            <a href="./page-944686.html">取消</a>
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
