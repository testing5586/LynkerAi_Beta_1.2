
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'

interface AINameCustomizerProps {
  assistantName: string
  onNameChange: (name: string) => void
  isClient: boolean
}

export default function AINameCustomizer({
  assistantName,
  onNameChange,
  isClient,
}: AINameCustomizerProps) {
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)

  useEffect(() => {
    // Check voice input support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setVoiceSupported(!!SpeechRecognition)
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 20) {
      onNameChange(value)
    }
  }

  const handleVoiceInput = () => {
    if (!voiceSupported) {
      alert('您的浏览器不支持语音输入')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'zh-CN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      if (transcript.length <= 20) {
        onNameChange(transcript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const suggestedNames = [
    '灵伴AI',
    '命理助手',
    '灵客伴侣',
    '玄学顾问',
    '命盘解读官',
    '灵魂导师',
    '命运指南针',
    '八字分析师',
  ]

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>自定义AI助手名称</CardTitle>
          <CardDescription>
            给您的AI助手起一个独特的名字，让交互更加个性化
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="assistant-name" className="text-base font-semibold">
              助手名称
            </Label>
            <div className="flex gap-2">
              <Input
                id="assistant-name"
                type="text"
                placeholder="输入您的AI助手名称"
                value={assistantName}
                onChange={handleNameChange}
                maxLength={20}
                disabled={!isClient}
                className="flex-1"
              />
              {voiceSupported && (
                <Button
                  onClick={handleVoiceInput}
                  disabled={isListening || !isClient}
                  variant="outline"
                  size="icon"
                  className="gap-2"
                >
                  <SafeIcon
                    name={isListening ? 'Loader2' : 'Mic'}
                    className={`h-4 w-4 ${isListening ? 'animate-spin' : ''}`}
                  />
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {assistantName.length}/20 字符
              </p>
              {isListening && (
                <p className="text-xs text-accent flex items-center gap-1">
                  <SafeIcon name="Mic" className="h-3 w-3 animate-pulse" />
                  正在监听...
                </p>
              )}
            </div>
          </div>

          {/* Name Preview */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">预览</p>
            <p className="text-lg font-semibold text-gradient-mystical">
              {assistantName || '灵伴AI'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              这是您的AI助手在对话中显示的名称
            </p>
          </div>

          {/* Naming Tips */}
          <Alert className="border-primary/50 bg-primary/5">
            <SafeIcon name="Lightbulb" className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              <p className="font-semibold mb-2">命名建议</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>使用易记的名字，最多20个字符</li>
                <li>可以包含中文、英文或数字</li>
                <li>避免使用特殊符号</li>
                <li>选择能反映AI特性的名字</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Suggested Names */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">推荐名称</CardTitle>
          <CardDescription>点击快速选择</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {suggestedNames.map((name) => (
              <button
                key={name}
                onClick={() => onNameChange(name)}
                disabled={!isClient}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  assistantName === name
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalization Tips */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">个性化建议</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <SafeIcon name="Sparkles" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">创意命名</p>
              <p className="text-muted-foreground text-xs">
                结合您的兴趣和命理特点，创造独特的名字
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <SafeIcon name="Heart" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">情感连接</p>
              <p className="text-muted-foreground text-xs">
                选择能让您感到亲切和信任的名字
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <SafeIcon name="Zap" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">易于记忆</p>
              <p className="text-muted-foreground text-xs">
                简洁易记的名字能提升使用体验
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
