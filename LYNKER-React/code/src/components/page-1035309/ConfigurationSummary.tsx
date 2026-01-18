
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface AIConfig {
  provider: string
  apiKey: string
  assistantName: string
  language: string
  tone: string
  customPrompt: string
  paymentMethod: string
  isVerified: boolean
}

interface ConfigurationSummaryProps {
  config: AIConfig
  isClient: boolean
}

export default function ConfigurationSummary({
  config,
  isClient,
}: ConfigurationSummaryProps) {
  const getProviderLabel = (provider: string) => {
    const labels: Record<string, string> = {
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      qwen: 'Qwen (阿里)',
      deepseek: 'DeepSeek',
      claude: 'Claude',
    }
    return labels[provider] || provider
  }

  const getToneLabel = (tone: string) => {
    const labels: Record<string, string> = {
      professional: '专业严谨',
      friendly: '友好亲切',
      mystical: '神秘玄妙',
      analytical: '分析理性',
      poetic: '诗意优雅',
    }
    return labels[tone] || tone
  }

  const getPaymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      wechat: '微信支付',
      alipay: '支付宝',
      stripe: 'Stripe',
      paypal: 'PayPal',
    }
    return labels[method] || method
  }

  return (
    <Card className="glass-card border-primary/50 bg-primary/5">
      <CardHeader>
        <CardTitle>配置总结</CardTitle>
        <CardDescription>
          您的AI助手配置概览，所有设置已准备就绪
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Assistant Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="Sparkles" className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground">AI助手名称</p>
            </div>
            <p className="text-lg font-semibold text-gradient-mystical">
              {config.assistantName}
            </p>
          </div>

          {/* Provider */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="Zap" className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground">AI提供商</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {getProviderLabel(config.provider)}
              </Badge>
              {config.isVerified && (
                <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="Smile" className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground">语气风格</p>
            </div>
            <Badge className="bg-accent text-accent-foreground">
              {getToneLabel(config.tone)}
            </Badge>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="CreditCard" className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground">支付方式</p>
            </div>
            <Badge variant="outline">
              {getPaymentLabel(config.paymentMethod)}
            </Badge>
          </div>
        </div>

        {/* Custom Prompt Preview */}
        {config.customPrompt && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">自定义提示词</p>
            <p className="text-sm text-foreground line-clamp-3">
              {config.customPrompt}
            </p>
          </div>
        )}

        {/* Status Indicators */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
            <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-green-500">配置完成</span>
          </div>
          {config.isVerified && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <SafeIcon name="Shield" className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium text-blue-500">API已验证</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
            <SafeIcon name="Zap" className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium text-accent">已激活</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
