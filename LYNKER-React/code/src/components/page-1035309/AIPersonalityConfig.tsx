
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface AIPersonalityConfigProps {
  tone: string
  customPrompt: string
  onToneChange: (tone: string) => void
  onPromptChange: (prompt: string) => void
  isClient: boolean
}

const TONE_OPTIONS = [
  {
    id: 'professional',
    label: '专业严谨',
    description: '学术性强，逻辑清晰，适合深度分析',
    icon: 'Briefcase',
  },
  {
    id: 'friendly',
    label: '友好亲切',
    description: '温暖亲近，易于理解，适合日常交流',
    icon: 'Smile',
  },
  {
    id: 'mystical',
    label: '神秘玄妙',
    description: '富有诗意，充满想象，适合灵感启发',
    icon: 'Sparkles',
  },
  {
    id: 'analytical',
    label: '分析理性',
    description: '数据驱动，精确严谨，适合理性思考',
    icon: 'BarChart3',
  },
  {
    id: 'poetic',
    label: '诗意优雅',
    description: '文采飞扬，意境深远，适合审美享受',
    icon: 'Feather',
  },
]

export default function AIPersonalityConfig({
  tone,
  customPrompt,
  onToneChange,
  onPromptChange,
  isClient,
}: AIPersonalityConfigProps) {
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 500) {
      onPromptChange(value)
    }
  }

  const getToneDescription = (selectedTone: string) => {
    return TONE_OPTIONS.find(opt => opt.id === selectedTone)?.description || ''
  }

  return (
    <div className="space-y-6">
      {/* Tone Selection */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>选择AI语气风格</CardTitle>
          <CardDescription>
            选择最符合您期望的AI助手交互风格
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={tone} onValueChange={onToneChange} disabled={!isClient}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TONE_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    tone === option.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={option.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <SafeIcon name={option.icon} className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-sm">{option.label}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Tone Preview */}
      {tone && (
        <Card className="glass-card border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">风格预览</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">选中风格</p>
              <Badge className="bg-primary text-primary-foreground">
                {TONE_OPTIONS.find(opt => opt.id === tone)?.label}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">特点</p>
              <p className="text-sm">{getToneDescription(tone)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Prompt */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>自定义系统提示词</CardTitle>
          <CardDescription>
            定义AI助手的个性、能力和行为方式（可选）
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-prompt" className="text-base font-semibold">
              系统提示词
            </Label>
            <Textarea
              id="custom-prompt"
              placeholder="例如：你是一个专业的命理分析助手，帮助用户理解他们的命盘和运势。你应该以友好但专业的方式进行交流，提供深入的分析和实用的建议。"
              value={customPrompt}
              onChange={handlePromptChange}
              maxLength={500}
              disabled={!isClient}
              className="min-h-32 resize-none"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {customPrompt.length}/500 字符
              </p>
              {customPrompt.length > 400 && (
                <p className="text-xs text-accent">接近字符限制</p>
              )}
            </div>
          </div>

          {/* Prompt Tips */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
            <p className="text-xs font-semibold text-foreground">提示词编写建议</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>清晰描述AI的角色和目的</li>
              <li>指定交互风格和语言偏好</li>
              <li>说明AI应该关注的重点</li>
              <li>设定适当的边界和限制</li>
              <li>提供具体的行为示例</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Preset Prompts */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">预设提示词模板</CardTitle>
          <CardDescription>点击快速应用</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              name: '命理分析师',
              prompt: '你是一个专业的命理分析助手，精通八字、紫微、占星等多种命理学派。你应该以学术严谨的方式分析用户的命盘，提供深入的解读和实用的建议。',
            },
            {
              name: '灵性导师',
              prompt: '你是一个充满智慧的灵性导师，帮助用户探索自己的灵魂本质和人生目的。你的回答应该富有诗意和启发性，引导用户进行深层思考。',
            },
            {
              name: '友好顾问',
              prompt: '你是一个温暖亲切的命理顾问，用简洁易懂的语言帮助用户理解命理知识。你应该以友好的方式交流，让用户感到被理解和支持。',
            },
            {
              name: '数据分析师',
              prompt: '你是一个精确的数据分析师，用统计学和逻辑推理来解释命理现象。你的分析应该基于数据和事实，提供可验证的结论。',
            },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => onPromptChange(preset.prompt)}
              disabled={!isClient}
              className="w-full p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
            >
              <p className="font-medium text-sm mb-1">{preset.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {preset.prompt}
              </p>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
