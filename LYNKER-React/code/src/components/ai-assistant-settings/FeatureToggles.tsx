
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface FeatureTogglesProps {
  settings: {
    realtimeSubtitles: boolean;
    autoSaveNotes: boolean;
    aiReminders: boolean;
    notificationEmail: boolean;
    notificationInApp: boolean;
    dailyDigest: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export default function FeatureToggles({ settings, onSettingsChange }: FeatureTogglesProps) {
  const handleToggle = (key: keyof typeof settings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const features = [
    {
      id: 'realtimeSubtitles',
      title: '实时字幕',
      description: '启用后，AI将实时转录您与命理师的对话内容',
      icon: 'Captions',
      beta: false,
    },
    {
      id: 'autoSaveNotes',
      title: '自动保存笔记',
      description: '启用后，AI将自动生成Markdown格式的咨询笔记并保存到知识库',
      icon: 'FileText',
      beta: false,
    },
    {
      id: 'aiReminders',
      title: 'AI断语提醒',
      description: '启用后，AI将在检测到重要命理断语时提醒命理师注意',
      icon: 'AlertCircle',
      beta: false,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4">
        {features.map((feature) => (
          <Card key={feature.id} className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <SafeIcon name={feature.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-base font-semibold cursor-pointer">
                        {feature.title}
                      </Label>
                      {feature.beta && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                          Beta
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings[feature.id as keyof typeof settings]}
                  onCheckedChange={() => handleToggle(feature.id as keyof typeof settings)}
                  className="ml-4"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Alert */}
      <Alert className="border-blue-500/50 bg-blue-500/5">
        <SafeIcon name="Info" className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm">
          <strong>提示：</strong>
          这些功能可以随时启用或禁用。更改将立即生效。
        </AlertDescription>
      </Alert>

      {/* Advanced Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">高级选项</CardTitle>
          <CardDescription>
            配置AI助手的高级行为参数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Label className="text-sm font-medium">响应速度</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  调整AI生成响应的速度（更快 = 更简洁，更慢 = 更详细）
                </p>
              </div>
              <select className="px-3 py-1 rounded-md bg-muted border border-border text-sm">
                <option>平衡</option>
                <option>快速</option>
                <option>详细</option>
              </select>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <Label className="text-sm font-medium">语言偏好</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  选择AI助手的主要工作语言
                </p>
              </div>
              <select className="px-3 py-1 rounded-md bg-muted border border-border text-sm">
                <option>中文</option>
                <option>English</option>
                <option>日本語</option>
                <option>한국어</option>
              </select>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <Label className="text-sm font-medium">命理专业度</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  AI在命理分析中的专业程度（影响术语使用和深度）
                </p>
              </div>
              <select className="px-3 py-1 rounded-md bg-muted border border-border text-sm">
                <option>初级</option>
                <option>中级</option>
                <option>高级</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
