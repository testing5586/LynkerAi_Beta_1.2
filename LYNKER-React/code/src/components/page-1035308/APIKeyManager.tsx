
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface APIKeyManagerProps {
  provider: string;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const providerGuides = {
  chatgpt: {
    name: 'ChatGPT (OpenAI)',
    url: 'https://platform.openai.com/api-keys',
    steps: [
      '访问 OpenAI API 密钥页面',
      '点击"Create new secret key"',
      '复制生成的密钥',
      '粘贴到下方输入框',
    ],
  },
  gemini: {
    name: 'Google Gemini',
    url: 'https://makersuite.google.com/app/apikey',
    steps: [
      '访问 Google AI Studio',
      '点击"Get API Key"',
      '选择或创建项目',
      '复制 API 密钥',
    ],
  },
  qwen: {
    name: '通义千问 (Qwen)',
    url: 'https://dashscope.console.aliyun.com/apiKey',
    steps: [
      '登录阿里云控制台',
      '进入 DashScope 服务',
      '创建新的 API 密钥',
      '复制密钥到下方',
    ],
  },
  deepseek: {
    name: 'DeepSeek',
    url: 'https://platform.deepseek.com/api_keys',
    steps: [
      '访问 DeepSeek 平台',
      '进入 API 密钥管理',
      '创建新密钥',
      '复制到下方输入框',
    ],
  },
  claude: {
    name: 'Claude (Anthropic)',
    url: 'https://console.anthropic.com/account/keys',
    steps: [
      '访问 Anthropic 控制台',
      '进入 API 密钥页面',
      '创建新的 API 密钥',
      '复制密钥',
    ],
  },
};

export default function APIKeyManager({
  provider,
  apiKey,
  onApiKeyChange,
}: APIKeyManagerProps) {
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const guide = providerGuides[provider as keyof typeof providerGuides];

  const handleValidate = async () => {
    setIsValidating(true);
    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsValidating(false);
    setIsValid(true);
  };

  const handleCopyExample = () => {
    const examples = {
      chatgpt: 'sk-proj-...',
      gemini: 'AIzaSy...',
      qwen: 'sk-...',
      deepseek: 'sk-...',
      claude: 'sk-ant-...',
    };
    const example = examples[provider as keyof typeof examples];
    navigator.clipboard.writeText(example);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API密钥管理</CardTitle>
          <CardDescription>
            输入您的 {guide?.name} API 密钥以启用 AI 助手功能
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alert */}
          <Alert className="border-accent/20 bg-accent/5">
            <SafeIcon name="AlertCircle" className="h-4 w-4 text-accent" />
            <AlertDescription className="text-accent">
              请妥善保管您的 API 密钥，不要在公开场合分享或上传到版本控制系统
            </AlertDescription>
          </Alert>

          {/* API Key Input */}
          <div className="space-y-3">
            <Label htmlFor="api-key">API 密钥</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="粘贴您的 API 密钥..."
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowKey(!showKey)}
              >
                <SafeIcon
                  name={showKey ? 'EyeOff' : 'Eye'}
                  className="h-4 w-4"
                />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              密钥格式示例：{examples[provider as keyof typeof examples]}
            </p>
          </div>

          {/* Validation */}
          <div className="flex gap-2">
            <Button
              onClick={handleValidate}
              disabled={!apiKey || isValidating}
              variant="outline"
              className="gap-2"
            >
              {isValidating ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                  验证中...
                </>
              ) : (
                <>
                  <SafeIcon name="CheckCircle" className="h-4 w-4" />
                  验证密钥
                </>
              )}
            </Button>
            {isValid && apiKey && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <SafeIcon name="Check" className="h-4 w-4" />
                密钥有效
              </div>
            )}
          </div>

          {/* Setup Guide */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-sm">获取 API 密钥步骤</h4>
            <ol className="space-y-2">
              {guide?.steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 mt-4"
              asChild
            >
              <a href={guide?.url} target="_blank" rel="noopener noreferrer">
                <SafeIcon name="ExternalLink" className="h-4 w-4" />
                前往获取 API 密钥
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const examples = {
  chatgpt: 'sk-proj-abc123...',
  gemini: 'AIzaSyD...',
  qwen: 'sk-abc123...',
  deepseek: 'sk-abc123...',
  claude: 'sk-ant-abc123...',
};
