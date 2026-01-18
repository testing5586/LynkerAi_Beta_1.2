
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface AIProviderSelectorProps {
  selectedProvider: string
  onProviderChange: (provider: string) => void
  isClient: boolean
}

const PROVIDERS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI的先进语言模型，功能强大，支持多种任务',
    icon: 'Zap',
    features: ['高精度', '多语言', '快速响应'],
    pricing: '按token计费',
    recommended: true,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google的多模态AI模型，支持文本和图像分析',
    icon: 'Sparkles',
    features: ['多模态', '图像理解', '实时更新'],
    pricing: '按token计费',
    recommended: false,
  },
  {
    id: 'qwen',
    name: 'Qwen (阿里)',
    description: '阿里云的大语言模型，针对中文优化',
    icon: 'Globe',
    features: ['中文优化', '低延迟', '成本低'],
    pricing: '按token计费',
    recommended: false,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: '深度思考的AI模型，擅长复杂推理',
    icon: 'Brain',
    features: ['深度推理', '逻辑清晰', '精准分析'],
    pricing: '按token计费',
    recommended: false,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic的AI助手，注重安全和可靠性',
    icon: 'Shield',
    features: ['安全可靠', '长文本', '细致分析'],
    pricing: '按token计费',
    recommended: false,
  },
]

export default function AIProviderSelector({
  selectedProvider,
  onProviderChange,
  isClient,
}: AIProviderSelectorProps) {
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>选择AI提供商</CardTitle>
          <CardDescription>
            选择最适合您的AI助手提供商。您可以随时更改选择。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onProviderChange(provider.id)}
                className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                  selectedProvider === provider.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
                disabled={!isClient}
              >
                {/* Recommended Badge */}
                {provider.recommended && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                    推荐
                  </Badge>
                )}

                {/* Provider Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <SafeIcon name={provider.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{provider.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{provider.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {provider.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{provider.pricing}</span>
                  {selectedProvider === provider.id && (
                    <SafeIcon name="CheckCircle" className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provider Info */}
      {selectedProvider && (
        <Card className="glass-card border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">
              {PROVIDERS.find(p => p.id === selectedProvider)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">下一步</h4>
              <p className="text-sm text-muted-foreground">
                请在下一步中输入您的API密钥。您可以从{' '}
                <a
                  href={getProviderURL(selectedProvider)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {PROVIDERS.find(p => p.id === selectedProvider)?.name}官网
                </a>
                {' '}获取API密钥。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">安全提示</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>不要与他人分享您的API密钥</li>
                <li>定期更新和轮换API密钥</li>
                <li>监控API使用情况和费用</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function getProviderURL(provider: string): string {
  const urls: Record<string, string> = {
    chatgpt: 'https://platform.openai.com/api-keys',
    gemini: 'https://ai.google.dev/tutorials/setup',
    qwen: 'https://dashscope.console.aliyun.com/api-key',
    deepseek: 'https://platform.deepseek.com/api-keys',
    claude: 'https://console.anthropic.com/account/keys',
  }
  return urls[provider] || '#'
}
