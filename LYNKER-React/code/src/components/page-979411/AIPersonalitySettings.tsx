
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface AIPersonalitySettingsProps {
  reminderTone: string;
  onToneChange: (tone: string) => void;
  enableSubtitles: boolean;
  onSubtitlesChange: (enabled: boolean) => void;
  autoSaveNotes: boolean;
  onAutoSaveChange: (enabled: boolean) => void;
}

export default function AIPersonalitySettings({
  reminderTone,
  onToneChange,
  enableSubtitles,
  onSubtitlesChange,
  autoSaveNotes,
  onAutoSaveChange,
}: AIPersonalitySettingsProps) {
  const toneOptions = [
    { id: 'professional', label: '专业', description: '正式、学术、严谨的语气' },
    { id: 'friendly', label: '友好', description: '亲切、温暖、易接近的语气' },
    { id: 'mystical', label: '神秘', description: '深邃、玄妙、富有意境的语气' },
    { id: 'casual', label: '随意', description: '轻松、幽默、非正式的语气' },
  ];

  const selectedTone = toneOptions.find(t => t.id === reminderTone);

  return (
    <div className="space-y-6">
      {/* AI Tone */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>AI语气设置</CardTitle>
          <CardDescription>
            选择您偏好的AI助手交互风格
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.id}
                onClick={() => onToneChange(tone.id)}
                className={`text-left p-3 rounded-lg border-2 transition-all ${
                  reminderTone === tone.id
                    ? 'border-primary bg-primary/10'
                    : 'border-muted hover:border-muted-foreground/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{tone.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tone.description}</p>
                  </div>
                  {reminderTone === tone.id && (
                    <SafeIcon name="Check" className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedTone && (
            <div className="p-3 rounded-lg bg-muted/50 flex items-start gap-2">
              <SafeIcon name="Info" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">当前选择：{selectedTone.label}</p>
                <p className="text-muted-foreground text-xs mt-1">{selectedTone.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Prompt */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>自定义提示词</CardTitle>
          <CardDescription>
            编写自定义提示词来定义AI助手的个性和行为
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-prompt">系统提示词</Label>
            <Textarea
              id="custom-prompt"
              placeholder="例如：你是一位专业的命理师助手，擅长用简洁的语言解释复杂的命理概念。你应该以友好和尊重的态度与用户互动..."
              className="min-h-32 font-mono text-sm"
              defaultValue="你是灵客AI平台的专业命理助手。你应该以友好、专业的态度帮助用户理解命理知识，提供准确的分析和建议。"
            />
            <p className="text-xs text-muted-foreground">
              提示：详细的提示词能帮助AI更好地理解您的需求
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <SafeIcon name="RotateCcw" className="h-4 w-4 mr-2" />
              恢复默认
            </Button>
            <Button className="flex-1 bg-mystical-gradient hover:opacity-90">
              <SafeIcon name="Save" className="h-4 w-4 mr-2" />
              保存提示词
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>功能设置</CardTitle>
          <CardDescription>
            启用或禁用AI助手的特定功能
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Real-time Subtitles */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <SafeIcon name="Captions" className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">实时字幕</p>
                <p className="text-xs text-muted-foreground">在咨询时显示实时语音转文字</p>
              </div>
            </div>
            <button
              onClick={() => onSubtitlesChange(!enableSubtitles)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enableSubtitles ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enableSubtitles ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <Separator />

          {/* Auto-save Notes */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <SafeIcon name="FileText" className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">自动保存笔记</p>
                <p className="text-xs text-muted-foreground">自动将咨询内容生成Markdown笔记</p>
              </div>
            </div>
            <button
              onClick={() => onAutoSaveChange(!autoSaveNotes)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSaveNotes ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSaveNotes ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <Separator />

          {/* Voice Input */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <SafeIcon name="Mic" className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">语音输入</p>
                <p className="text-xs text-muted-foreground">支持语音输入与AI交互</p>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground">已启用</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Preset Templates */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>预设模板</CardTitle>
          <CardDescription>
            快速应用预设的AI个性配置
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <SafeIcon name="Sparkles" className="h-4 w-4 mr-2" />
              命理专家模式
            </Button>
            <Button variant="outline" className="justify-start">
              <SafeIcon name="Heart" className="h-4 w-4 mr-2" />
              温暖陪伴模式
            </Button>
            <Button variant="outline" className="justify-start">
              <SafeIcon name="Brain" className="h-4 w-4 mr-2" />
              学术研究模式
            </Button>
            <Button variant="outline" className="justify-start">
              <SafeIcon name="Zap" className="h-4 w-4 mr-2" />
              快速问答模式
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
