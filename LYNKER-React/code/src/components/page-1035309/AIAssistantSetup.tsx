
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import AIProviderSelector from './AIProviderSelector'
import APIKeyInput from './APIKeyInput'
import AINameCustomizer from './AINameCustomizer'
import PaymentSettings from './PaymentSettings'
import AIPersonalityConfig from './AIPersonalityConfig'
import ConfigurationSummary from './ConfigurationSummary'

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

const MOCK_CONFIG: AIConfig = {
  provider: 'chatgpt',
  apiKey: 'sk-proj-••••••••••••••••••••',
  assistantName: '灵伴AI',
  language: 'zh',
  tone: 'professional',
  customPrompt: '你是一个专业的命理分析助手，帮助用户理解他们的命盘和运势。',
  paymentMethod: 'wechat',
  isVerified: true,
}

export default function AIAssistantSetup() {
  const [isClient, setIsClient] = useState(true)
  const [config, setConfig] = useState<AIConfig>(MOCK_CONFIG)
  const [activeTab, setActiveTab] = useState('provider')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    setIsClient(false)

    // Simulate loading saved configuration
    const timer = setTimeout(() => {
      setIsClient(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleProviderChange = (provider: string) => {
    setConfig({ ...config, provider, apiKey: '', isVerified: false })
  }

  const handleAPIKeyChange = (apiKey: string) => {
    setConfig({ ...config, apiKey })
  }

  const handleNameChange = (name: string) => {
    setConfig({ ...config, assistantName: name })
  }

  const handleToneChange = (tone: string) => {
    setConfig({ ...config, tone })
  }

  const handlePromptChange = (prompt: string) => {
    setConfig({ ...config, customPrompt: prompt })
  }

  const handlePaymentMethodChange = (method: string) => {
    setConfig({ ...config, paymentMethod: method })
  }

  const handleVerifyAPI = async () => {
    setIsSaving(true)
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    setConfig({ ...config, isVerified: true })
    setIsSaving(false)
  }

  const handleSaveConfig = async () => {
    setIsSaving(true)
    // Simulate saving configuration
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleBackToProfile = () => {
    window.location.href = './page-979337.html'
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">灵伴AI助手设置</h1>
            <p className="text-muted-foreground">
              配置您专属的AI助手，提升命理咨询和学习体验
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Steps */}
        <div className="lg:col-span-1">
          <Card className="glass-card sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">配置步骤</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 'provider', label: '选择提供商', icon: 'Zap' },
                { id: 'apikey', label: '配置API密钥', icon: 'Key' },
                { id: 'name', label: '自定义名称', icon: 'Edit' },
                { id: 'personality', label: '设置个性', icon: 'Sparkles' },
                { id: 'payment', label: '支付设置', icon: 'CreditCard' },
              ].map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activeTab === step.id
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted'
                  }`}>
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.label}</p>
                  </div>
                  {activeTab === step.id && (
                    <SafeIcon name="Check" className="h-4 w-4" />
                  )}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Current Configuration Summary */}
          <Card className="glass-card mt-6">
            <CardHeader>
              <CardTitle className="text-base">当前配置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">AI助手</p>
                <p className="font-semibold text-sm">{config.assistantName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">提供商</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getProviderLabel(config.provider)}
                  </Badge>
                  {config.isVerified && (
                    <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">语气风格</p>
                <p className="text-sm">{getToneLabel(config.tone)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Configuration Forms */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="provider" className="text-xs sm:text-sm">提供商</TabsTrigger>
              <TabsTrigger value="apikey" className="text-xs sm:text-sm">API密钥</TabsTrigger>
              <TabsTrigger value="name" className="text-xs sm:text-sm">名称</TabsTrigger>
              <TabsTrigger value="personality" className="text-xs sm:text-sm">个性</TabsTrigger>
              <TabsTrigger value="payment" className="text-xs sm:text-sm">支付</TabsTrigger>
            </TabsList>

            {/* Provider Selection */}
            <TabsContent value="provider" className="space-y-6">
              <AIProviderSelector
                selectedProvider={config.provider}
                onProviderChange={handleProviderChange}
                isClient={isClient || true}
              />
            </TabsContent>

            {/* API Key Configuration */}
            <TabsContent value="apikey" className="space-y-6">
              <APIKeyInput
                provider={config.provider}
                apiKey={config.apiKey}
                isVerified={config.isVerified}
                onAPIKeyChange={handleAPIKeyChange}
                onVerify={handleVerifyAPI}
                isSaving={isSaving}
                isClient={isClient || true}
              />
            </TabsContent>

            {/* Name Customization */}
            <TabsContent value="name" className="space-y-6">
              <AINameCustomizer
                assistantName={config.assistantName}
                onNameChange={handleNameChange}
                isClient={isClient || true}
              />
            </TabsContent>

            {/* Personality Configuration */}
            <TabsContent value="personality" className="space-y-6">
              <AIPersonalityConfig
                tone={config.tone}
                customPrompt={config.customPrompt}
                onToneChange={handleToneChange}
                onPromptChange={handlePromptChange}
                isClient={isClient || true}
              />
            </TabsContent>

            {/* Payment Settings */}
            <TabsContent value="payment" className="space-y-6">
              <PaymentSettings
                paymentMethod={config.paymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                isClient={isClient || true}
              />
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={handleBackToProfile}
              className={`${!isClient ? 'opacity-50' : ''}`}
              disabled={!isClient}
            >
              取消
            </Button>
            <Button
              onClick={handleSaveConfig}
              className="bg-mystical-gradient hover:opacity-90 gap-2"
              disabled={isSaving || !isClient}
            >
              {isSaving ? (
                <>
                  <SafeIcon name="Loader2" className="h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : saveSuccess ? (
                <>
                  <SafeIcon name="Check" className="h-4 w-4" />
                  已保存
                </>
              ) : (
                <>
                  <SafeIcon name="Save" className="h-4 w-4" />
                  保存配置
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Configuration Summary Card */}
      <div className="mt-12">
        <ConfigurationSummary config={config} isClient={isClient || true} />
      </div>
    </div>
  )
}

function getProviderLabel(provider: string): string {
  const labels: Record<string, string> = {
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    qwen: 'Qwen (阿里)',
    deepseek: 'DeepSeek',
    claude: 'Claude',
  }
  return labels[provider] || provider
}

function getToneLabel(tone: string): string {
  const labels: Record<string, string> = {
    professional: '专业严谨',
    friendly: '友好亲切',
    mystical: '神秘玄妙',
    analytical: '分析理性',
    poetic: '诗意优雅',
  }
  return labels[tone] || tone
}
