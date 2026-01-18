
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';

interface VoiceInputSettingsProps {
  voiceEnabled: boolean;
  voiceLanguage: string;
  onVoiceEnabledChange: (enabled: boolean) => void;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁体中文' },
  { code: 'en-US', name: '英语 (美国)' },
  { code: 'en-GB', name: '英语 (英国)' },
  { code: 'ja-JP', name: '日语' },
  { code: 'ko-KR', name: '韩语' },
  { code: 'th-TH', name: '泰语' },
  { code: 'vi-VN', name: '越南语' },
];

export default function VoiceInputSettings({
  voiceEnabled,
  voiceLanguage,
  onVoiceEnabledChange,
  onLanguageChange,
}: VoiceInputSettingsProps) {
  const handleTestVoice = () => {
    // Simulate voice test
    const utterance = new SpeechSynthesisUtterance('这是语音测试');
    utterance.lang = voiceLanguage;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Voice Input Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>启用语音输入</CardTitle>
          <CardDescription>
            使用语音与AI助手交互，支持多种语言
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-semibold">语音输入</Label>
              <p className="text-sm text-muted-foreground">
                启用后可以使用麦克风与AI助手对话
              </p>
            </div>
            <Switch
              checked={voiceEnabled}
              onCheckedChange={onVoiceEnabledChange}
            />
          </div>

          {voiceEnabled && (
            <div className="space-y-4">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label htmlFor="voice-language">语言选择</Label>
                <Select value={voiceLanguage} onValueChange={onLanguageChange}>
                  <SelectTrigger id="voice-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Test Voice */}
              <Button
                variant="outline"
                onClick={handleTestVoice}
                className="w-full gap-2"
              >
                <SafeIcon name="Volume2" className="h-4 w-4" />
                测试语音
              </Button>

              {/* Microphone Permissions */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-accent">麦克风权限</p>
                <p className="text-sm text-muted-foreground">
                  首次使用语音输入时，浏览器会请求麦克风访问权限。请允许访问以启用语音功能。
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Features */}
      <Card>
        <CardHeader>
          <CardTitle>语音功能</CardTitle>
          <CardDescription>
            了解语音输入的功能和特性
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <SafeIcon name="Mic" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">实时转录</p>
                <p className="text-sm text-muted-foreground">
                  您的语音实时转换为文字，支持自然语言理解
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <SafeIcon name="Volume2" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">语音回复</p>
                <p className="text-sm text-muted-foreground">
                  AI可以用语音回复您，支持多种语言和口音
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <SafeIcon name="Zap" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">快速响应</p>
                <p className="text-sm text-muted-foreground">
                  低延迟的语音处理，提供流畅的交互体验
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <SafeIcon name="Shield" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">隐私保护</p>
                <p className="text-sm text-muted-foreground">
                  语音数据加密传输，不会被用于其他目的
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Info" className="h-4 w-4 text-accent" />
            隐私提示
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            • 语音数据仅用于转录和AI处理，不会被保存或用于其他目的
          </p>
          <p>
            • 您可以随时禁用语音输入功能
          </p>
          <p>
            • 建议在安全的网络环境中使用语音功能
          </p>
          <p>
            • 如有隐私顾虑，请查看我们的隐私政策
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
