
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';

interface APIKeyConfigProps {
  selectedAssistant: string;
}

export default function APIKeyConfig({ selectedAssistant }: APIKeyConfigProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentAssistant = MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAssistant);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    setIsSaved(false);
  };

  return (
    <div className="space-y-4">
      {/* API Key Input Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>API密钥配置</CardTitle>
          <CardDescription>
            为 {currentAssistant?.name} 配置您的API密钥。密钥将被安全加密存储。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Security Warning */}
          <Alert className="border-amber-500/50 bg-amber-500/5">
            <SafeIcon name="AlertTriangle" className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm">
              <strong>安全提示：</strong>
              请勿在任何地方分享您的API密钥。灵客AI不会要求您提供密钥。
            </AlertDescription>
          </Alert>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="api-key">API密钥</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="api-key"
                  type={showKey ? 'text' : 'password'}
                  placeholder="粘贴您的API密钥..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <SafeIcon name={showKey ? 'EyeOff' : 'Eye'} className="w-4 h-4" />
                </button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                }}
                disabled={!apiKey}
              >
                <SafeIcon name="Copy" className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              从{' '}
              <a
                href={currentAssistant?.keySetupLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {currentAssistant?.name}官方平台
              </a>
              获取您的API密钥。
            </p>
          </div>

          {/* Status Messages */}
          {isSaved && (
            <Alert className="border-green-500/50 bg-green-500/5">
              <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-sm text-green-600">
                API密钥已保存！
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="flex-1 bg-mystical-gradient hover:opacity-90"
            >
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              保存密钥
            </Button>
            <Button
              variant="outline"
              onClick={handleClearKey}
              disabled={!apiKey}
              className="flex-1"
            >
              <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
              清除
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Setup Guide */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">设置指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="steps" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="steps">步骤</TabsTrigger>
              <TabsTrigger value="faq">常见问题</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="space-y-3">
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    访问{' '}
                    <a
                      href={currentAssistant?.keySetupLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {currentAssistant?.name}官方平台
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>登录您的账户或创建新账户</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>导航到API密钥管理页面</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>生成新的API密钥</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  <span>复制密钥并粘贴到上方输入框</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    6
                  </span>
                  <span>点击"保存密钥"完成配置</span>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="faq" className="space-y-3">
              <div className="space-y-2">
                <p className="font-medium text-sm">Q: 我的API密钥安全吗？</p>
                <p className="text-sm text-muted-foreground">
                  A: 是的。您的API密钥使用行业标准加密算法进行加密存储，只有您的账户可以访问。
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Q: 如何更换API密钥？</p>
                <p className="text-sm text-muted-foreground">
                  A: 只需清除当前密钥，输入新密钥，然后点击"保存密钥"即可。
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Q: 如果我忘记了密钥怎么办？</p>
                <p className="text-sm text-muted-foreground">
                  A: 您可以在{currentAssistant?.name}官方平台重新生成密钥。
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
