
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface APIKeyManagerProps {
  provider: AIAssistantModel;
}

export default function APIKeyManager({ provider }: APIKeyManagerProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      alert('请输入API密钥');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSaved(true);

    // Reset saved state after 3 seconds
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      alert('请先输入API密钥');
      return;
    }

    setIsLoading(true);
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('连接测试成功！');
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name={provider.iconName} className="h-5 w-5" />
          {provider.name} API密钥
        </CardTitle>
        <CardDescription>
          配置您的{provider.name} API密钥以启用AI功能
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Info Alert */}
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <SafeIcon name="Info" className="h-4 w-4 text-blue-500" />
          <AlertTitle>获取API密钥</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              请访问{provider.name}官方网站获取您的API密钥：
            </p>
            <a
              href={provider.keySetupLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 text-sm"
            >
              <SafeIcon name="ExternalLink" className="h-3 w-3" />
              {provider.keySetupLinkTitle}
            </a>
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
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入您的API密钥"
                className="bg-muted/50 pr-10"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <SafeIcon name={showKey ? 'Eye' : 'EyeOff'} className="h-4 w-4" />
              </button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
                alert('已复制到剪贴板');
              }}
              disabled={!apiKey}
            >
              <SafeIcon name="Copy" className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            您的API密钥将被加密存储，仅用于与{provider.name}通信
          </p>
        </div>

        {/* Status Message */}
        {isSaved && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
            <AlertTitle>保存成功</AlertTitle>
            <AlertDescription>
              API密钥已成功保存
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleTestConnection}
            disabled={isLoading || !apiKey}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                测试中...
              </>
            ) : (
              <>
                <SafeIcon name="Zap" className="h-4 w-4 mr-2" />
                测试连接
              </>
            )}
          </Button>
          <Button
            onClick={handleSaveKey}
            disabled={isLoading || !apiKey}
            className="flex-1 bg-mystical-gradient hover:opacity-90"
          >
            {isLoading ? (
              <>
                <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                保存密钥
              </>
            )}
          </Button>
        </div>

        {/* Security Notice */}
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <SafeIcon name="AlertTriangle" className="h-4 w-4 text-amber-500" />
          <AlertTitle>安全提示</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>不要与他人分享您的API密钥</li>
              <li>定期更新和轮换您的密钥</li>
              <li>如果密钥泄露，请立即在{provider.name}官网重置</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
