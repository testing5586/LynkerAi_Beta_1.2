
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'

interface APIKeyInputProps {
  provider: string
  apiKey: string
  isVerified: boolean
  onAPIKeyChange: (key: string) => void
  onVerify: () => void
  isSaving: boolean
  isClient: boolean
}

export default function APIKeyInput({
  provider,
  apiKey,
  isVerified,
  onAPIKeyChange,
  onVerify,
  isSaving,
  isClient,
}: APIKeyInputProps) {
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState('')

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onAPIKeyChange(value)
    setError('')
  }

  const handleVerify = async () => {
    if (!apiKey.trim()) {
      setError('请输入API密钥')
      return
    }
    if (apiKey.length < 20) {
      setError('API密钥格式不正确')
      return
    }
    onVerify()
  }

  const getProviderName = (p: string) => {
    const names: Record<string, string> = {
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      qwen: 'Qwen',
      deepseek: 'DeepSeek',
      claude: 'Claude',
    }
    return names[p] || p
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>配置API密钥</CardTitle>
          <CardDescription>
            输入您的{getProviderName(provider)} API密钥以启用AI助手功能
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-base font-semibold">
              API密钥
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-proj-••••••••••••••••••••"
                value={apiKey}
                onChange={handleKeyChange}
                disabled={!isClient}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={!isClient}
              >
                <SafeIcon
                  name={showKey ? 'EyeOff' : 'Eye'}
                  className="h-4 w-4"
                />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              您的API密钥将被加密存储，仅用于与{getProviderName(provider)}通信
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <SafeIcon name="AlertCircle" className="h-4 w-4" />
              <AlertTitle>验证失败</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Verification Status */}
          {isVerified && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-500">验证成功</AlertTitle>
              <AlertDescription className="text-green-500/80">
                API密钥已验证，可以正常使用
              </AlertDescription>
            </Alert>
          )}

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={isSaving || !isClient || isVerified}
            className="w-full bg-mystical-gradient hover:opacity-90 gap-2"
          >
            {isSaving ? (
              <>
                <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                验证中...
              </>
            ) : isVerified ? (
              <>
                <SafeIcon name="Check" className="h-4 w-4" />
                已验证
              </>
            ) : (
              <>
                <SafeIcon name="Shield" className="h-4 w-4" />
                验证API密钥
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">如何获取API密钥</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                1
              </div>
              <div>
                <p className="font-medium text-sm">访问{getProviderName(provider)}官网</p>
                <p className="text-xs text-muted-foreground mt-1">
                  登录您的{getProviderName(provider)}账户
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                2
              </div>
              <div>
                <p className="font-medium text-sm">进入API密钥管理页面</p>
                <p className="text-xs text-muted-foreground mt-1">
                  通常在账户设置或开发者控制台中
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                3
              </div>
              <div>
                <p className="font-medium text-sm">创建新的API密钥</p>
                <p className="text-xs text-muted-foreground mt-1">
                  复制完整的密钥字符串
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                4
              </div>
              <div>
                <p className="font-medium text-sm">粘贴到上方输入框</p>
                <p className="text-xs text-muted-foreground mt-1">
                  点击验证按钮确认密钥有效
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Alert className="border-accent/50 bg-accent/10">
        <SafeIcon name="Lock" className="h-4 w-4 text-accent" />
        <AlertTitle className="text-accent">安全提示</AlertTitle>
        <AlertDescription className="text-accent/80">
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>定期更新您的API密钥</li>
            <li>不要在公共场所输入API密钥</li>
            <li>监控您的API使用情况和费用</li>
            <li>如果密钥泄露，立即在提供商官网重新生成</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
