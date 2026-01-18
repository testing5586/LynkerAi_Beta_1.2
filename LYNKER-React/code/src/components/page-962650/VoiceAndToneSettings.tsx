
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VoiceAndToneSettingsProps {
  enableVoiceInput: boolean;
  onVoiceInputChange: (enabled: boolean) => void;
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

const TONE_OPTIONS = [
  {
    id: 'Professional',
    name: '专业',
    description: '正式、学术、严谨的语气',
    icon: 'Briefcase',
  },
  {
    id: 'Friendly',
    name: '友好',
    description: '温暖、亲切、易接近的语气',
    icon: 'Smile',
  },
  {
    id: 'Witty',
    name: '幽默',
    description: '机智、有趣、轻松的语气',
    icon: 'Laugh',
  },
];

export default function VoiceAndToneSettings({
  enableVoiceInput,
  onVoiceInputChange,
  selectedTone,
  onToneChange,
}: VoiceAndToneSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Voice Input Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Mic" className="h-5 w-5 text-accent" />
            语音输入
          </CardTitle>
          <CardDescription>
            启用语音输入功能，用语音与AI助手交互
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
            <div className="space-y-1">
              <Label className="text-base font-semibold">启用语音输入</Label>
              <p className="text-sm text-muted-foreground">
                允许通过麦克风向AI助手说话
              </p>
            </div>
            <Switch
              checked={enableVoiceInput}
              onCheckedChange={onVoiceInputChange}
            />
          </div>

          {enableVoiceInput && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">语音设置</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-background rounded-lg border border-border">
                  <Label className="text-sm font-medium mb-2 block">语言</Label>
                  <select className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm">
                    <option>中文（简体）</option>
                    <option>中文（繁体）</option>
                    <option>English</option>
                    <option>日本語</option>
                    <option>한국어</option>
                  </select>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <Label className="text-sm font-medium mb-2 block">识别速度</Label>
                  <select className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm">
                    <option>实时识别</option>
                    <option>标准识别</option>
                    <option>精确识别</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg border border-border">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <SafeIcon name="Volume2" className="h-4 w-4" />
                  麦克风测试
                </h5>
                <Button variant="outline" size="sm" className="w-full">
                  <SafeIcon name="Mic" className="h-4 w-4 mr-2" />
                  测试麦克风
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tone Selection Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="MessageSquare" className="h-5 w-5 text-accent" />
            AI语气设置
          </CardTitle>
          <CardDescription>
            选择AI助手的交流语气和风格
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TONE_OPTIONS.map((tone) => (
              <div
                key={tone.id}
                onClick={() => onToneChange(tone.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTone === tone.id
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <SafeIcon name={tone.icon} className="h-5 w-5 text-primary" />
                  </div>
                  {selectedTone === tone.id && (
                    <Badge className="bg-primary text-primary-foreground">
                      <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                      已选择
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold text-sm mb-1">{tone.name}</h4>
                <p className="text-xs text-muted-foreground">{tone.description}</p>
              </div>
            ))}
          </div>

          {/* Tone Preview */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <h4 className="font-semibold text-sm mb-3">语气示例</h4>
            <div className="space-y-2 text-sm">
              {selectedTone === 'Professional' && (
                <p className="text-muted-foreground italic">
                  "根据您的八字分析，您的命盘显示出强大的事业运势。建议您在职业发展中采取稳健的策略。"
                </p>
              )}
              {selectedTone === 'Friendly' && (
                <p className="text-muted-foreground italic">
                  "哈，看您的八字，真的很有意思呢！您的命盘显示您很有事业运，加油哦！"
                </p>
              )}
              {selectedTone === 'Witty' && (
                <p className="text-muted-foreground italic">
                  "您的八字？哈哈，这可是个有趣的组合！事业运爆表，简直是职场小能手！"
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Output Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Volume2" className="h-5 w-5 text-accent" />
            语音输出
          </CardTitle>
          <CardDescription>
            配置AI助手的语音回复设置
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
              <Label className="text-sm font-medium">启用语音回复</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
              <Label className="text-sm font-medium">自动播放</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
              <Label className="text-sm font-medium">调整语速</Label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                defaultValue="1"
                className="w-24"
              />
            </div>
          </div>

          <div className="p-3 bg-background rounded-lg border border-border">
            <Label className="text-sm font-medium mb-2 block">语音</Label>
            <select className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm">
              <option>女性声音 - 温柔</option>
              <option>女性声音 - 标准</option>
              <option>男性声音 - 温和</option>
              <option>男性声音 - 标准</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
