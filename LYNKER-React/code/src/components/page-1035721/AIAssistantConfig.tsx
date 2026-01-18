
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface AIProvider {
  id: string;
  name: string;
  icon: string;
}

interface AIAssistantConfigProps {
  selectedProvider: string;
  onProviderChange: (provider: string) => void;
  aiName: string;
  onAiNameChange: (name: string) => void;
  aiTone: string;
  onAiToneChange: (tone: string) => void;
  providers: AIProvider[];
  onSave: () => void;
}

const TONE_OPTIONS = [
  { value: 'professional', label: '专业严谨', description: '正式、学术性的语气' },
  { value: 'friendly', label: '友好亲切', description: '温暖、易接近的语气' },
  { value: 'mystical', label: '神秘玄妙', description: '深邃、富有哲理的语气' },
  { value: 'casual', label: '轻松随意', description: '轻松、幽默的语气' },
];

export default function AIAssistantConfig({
  selectedProvider,
  onProviderChange,
  aiName,
  onAiNameChange,
  aiTone,
  onAiToneChange,
  providers,
  onSave,
}: AIAssistantConfigProps) {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave();
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* AI Provider Selection */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Brain" className="h-5 w-5 text-accent" />
            选择AI提供商
          </CardTitle>
          <CardDescription>
            选择您偏好的AI模型作为灵伴AI的核心引擎
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onProviderChange(provider.id)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  selectedProvider === provider.id
                    ? 'border-accent bg-accent/10'
                    : 'border-muted hover:border-accent/50'
                }`}
              >
                <div className="flex justify-center mb-2">
                  <SafeIcon name={provider.icon} className="h-6 w-6 text-accent" />
                </div>
                <p className="font-semibold text-sm">{provider.name}</p>
                {selectedProvider === provider.id && (
                  <Badge className="mt-2 bg-accent text-accent-foreground text-xs">
                    已选择
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Customization */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Wand2" className="h-5 w-5 text-accent" />
            自定义灵伴AI
          </CardTitle>
          <CardDescription>
            为您的AI助手设置个性化的名称、语气和特性
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Name */}
          <div className="space-y-2">
            <Label htmlFor="ai-name" className="text-base font-semibold">
              灵伴AI名称
            </Label>
            <div className="flex gap-2">
              <Input
                id="ai-name"
                value={aiName}
                onChange={(e) => onAiNameChange(e.target.value)}
                placeholder="输入您的AI助手名称"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                title="语音输入"
              >
                <SafeIcon name="Mic" className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              给您的AI助手起个独特的名字，最多20个字符
            </p>
          </div>

          <Separator />

          {/* AI Tone */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">AI语气风格</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TONE_OPTIONS.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => onAiToneChange(tone.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    aiTone === tone.value
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                >
                  <p className="font-semibold text-sm">{tone.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tone.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Voice Input */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <SafeIcon name="Mic" className="h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold text-sm">语音输入</p>
                <p className="text-xs text-muted-foreground">
                  启用语音输入与AI助手交互
                </p>
              </div>
            </div>
            <Button
              variant={isVoiceEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            >
              {isVoiceEnabled ? '已启用' : '已禁用'}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-mystical-gradient hover:opacity-90"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                保存配置
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* API Key Management */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Key" className="h-5 w-5 text-accent" />
            API密钥管理
          </CardTitle>
          <CardDescription>
            绑定您的AI提供商API密钥以启用完整功能
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-sm font-semibold">
              {providers.find(p => p.id === selectedProvider)?.name} API密钥
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              您的API密钥将被加密存储，仅用于调用AI服务
            </p>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <SafeIcon name="ExternalLink" className="h-4 w-4 mr-2" />
              获取API密钥指南
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      <Card className="glass-card border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
            升级AI能力
          </CardTitle>
          <CardDescription>
            升级到更高级的AI模型以获得更强大的分析能力
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <p className="font-semibold text-sm">当前模型</p>
              <p className="text-lg font-bold text-accent">
                {providers.find(p => p.id === selectedProvider)?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                标准版本，适合日常使用
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 space-y-2">
              <p className="font-semibold text-sm">高级模型</p>
              <p className="text-lg font-bold text-accent">Pro版本</p>
              <p className="text-xs text-muted-foreground">
                更强大的分析和推理能力
              </p>
            </div>
          </div>
          <Button className="w-full bg-mystical-gradient hover:opacity-90">
            <SafeIcon name="Zap" className="h-4 w-4 mr-2" />
            升级到Pro版本 (+$9.99/月)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
