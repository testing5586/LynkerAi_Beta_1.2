
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface APIKeyConfigurationProps {
  selectedProvider: string;
  apiKeys: Record<string, string>;
  onUpdateApiKey: (provider: string, key: string) => void;
  assistants: AIAssistantModel[];
}

export default function APIKeyConfiguration({
  selectedProvider,
  apiKeys,
  onUpdateApiKey,
  assistants,
}: APIKeyConfigurationProps) {
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [tempKey, setTempKey] = useState('');
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const handleEditKey = (provider: string) => {
    setEditingProvider(provider);
    setTempKey(apiKeys[provider] || '');
  };

  const handleSaveKey = (provider: string) => {
    onUpdateApiKey(provider, tempKey);
    setEditingProvider(null);
    setTempKey('');
  };

  const selectedAssistant = assistants.find(a => a.id === selectedProvider);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Key" className="h-5 w-5 text-accent" />
          API密钥配置
        </CardTitle>
        <CardDescription>
          配置各个AI提供商的API密钥以启用相应功能
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warning Alert */}
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <SafeIcon name="AlertTriangle" className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">安全提示</AlertTitle>
          <AlertDescription className="text-amber-500/80">
            请勿在任何地方分享您的API密钥。灵客AI不会要求您提供密钥。
          </AlertDescription>
        </Alert>

        {/* Tabs for each provider */}
        <Tabs defaultValue={selectedProvider} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {assistants.map((assistant) => (
              <TabsTrigger key={assistant.id} value={assistant.id} className="text-xs">
                {assistant.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {assistants.map((assistant) => (
            <TabsContent key={assistant.id} value={assistant.id} className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold text-sm mb-2">{assistant.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{assistant.description}</p>

                {editingProvider === assistant.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`key-${assistant.id}`} className="text-sm">
                        API密钥
                      </Label>
                      <Input
                        id={`key-${assistant.id}`}
                        type="password"
                        placeholder="输入您的API密钥"
                        value={tempKey}
                        onChange={(e) => setTempKey(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveKey(assistant.id)}
                        className="bg-mystical-gradient hover:opacity-90"
                      >
                        <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                        保存密钥
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingProvider(null)}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <SafeIcon name={showKey[assistant.id] ? 'Eye' : 'EyeOff'} className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm font-mono">
                          {showKey[assistant.id] ? apiKeys[assistant.id] : '••••••••••••••••'}
                        </code>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowKey(prev => ({ ...prev, [assistant.id]: !prev[assistant.id] }))}
                      >
                        {showKey[assistant.id] ? '隐藏' : '显示'}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditKey(assistant.id)}
                      >
                        <SafeIcon name="Edit" className="h-4 w-4 mr-2" />
                        编辑密钥
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={assistant.keySetupLinkUrl} target="_blank" rel="noopener noreferrer">
                          <SafeIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                          {assistant.keySetupLinkTitle}
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Setup Instructions */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <SafeIcon name="HelpCircle" className="h-4 w-4" />
            如何获取API密钥？
          </h4>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>访问您选择的AI提供商官方网站</li>
            <li>登录或创建账户</li>
            <li>进入API管理或开发者设置</li>
            <li>生成新的API密钥</li>
            <li>复制密钥并粘贴到上方输入框</li>
            <li>点击"保存密钥"完成配置</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
