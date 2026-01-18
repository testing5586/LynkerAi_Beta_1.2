
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';

interface AssistantCustomizationProps {
  assistantName: string;
  onNameChange: (name: string) => void;
  selectedProvider: string;
}

export default function AssistantCustomization({
  assistantName,
  onNameChange,
  selectedProvider,
}: AssistantCustomizationProps) {
  const [customPrompt, setCustomPrompt] = useState(
    '你是一个专业的命理分析助手，精通八字、紫微斗数、占星学等多种命理学派。你的目标是帮助用户理解自己的命盘，提供准确的命理分析和建议。'
  );
  const [personality, setPersonality] = useState('专业');
  const [language, setLanguage] = useState('中文');

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Settings" className="h-5 w-5 text-accent" />
          助手自定义
        </CardTitle>
        <CardDescription>
          个性化您的AI助手，设置名称、个性和特定功能
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Assistant Name */}
        <div className="space-y-3">
          <Label htmlFor="assistant-name" className="text-base font-semibold">
            助手名称
          </Label>
          <div className="flex gap-2">
            <Input
              id="assistant-name"
              value={assistantName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="输入您的AI助手名称"
              maxLength={20}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNameChange('灵伴AI')}
              title="重置为默认名称"
            >
              <SafeIcon name="RotateCcw" className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            为您的AI助手起一个独特的名字，最多20个字符
          </p>
        </div>

        {/* Personality & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="personality" className="text-base font-semibold">
              个性风格
            </Label>
            <select
              id="personality"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="专业">专业严谨</option>
              <option value="友好">友好亲切</option>
              <option value="幽默">幽默风趣</option>
              <option value="神秘">神秘深邃</option>
              <option value="学术">学术严肃</option>
            </select>
            <p className="text-xs text-muted-foreground">
              选择AI助手的交流风格
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="language" className="text-base font-semibold">
              语言偏好
            </Label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="中文">中文</option>
              <option value="英文">English</option>
              <option value="日文">日本語</option>
              <option value="韩文">한국어</option>
              <option value="泰文">ไทย</option>
              <option value="越南文">Tiếng Việt</option>
            </select>
            <p className="text-xs text-muted-foreground">
              选择AI助手的主要交流语言
            </p>
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="space-y-3">
          <Label htmlFor="custom-prompt" className="text-base font-semibold">
            自定义系统提示词
          </Label>
          <Textarea
            id="custom-prompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="输入自定义的系统提示词..."
            rows={6}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            通过编写系统提示词来定义AI助手的行为、知识范围和交互方式。这将影响AI的所有回复。
          </p>
        </div>

        {/* Preset Prompts */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">预设提示词模板</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              {
                name: '命理分析专家',
                prompt: '你是一个精通八字、紫微斗数、占星学的命理分析专家。提供深入的命理分析和建议。',
              },
              {
                name: '友好的命理导师',
                prompt: '你是一个友好、耐心的命理导师。用简单易懂的语言解释复杂的命理概念。',
              },
              {
                name: '学术研究助手',
                prompt: '你是一个学术研究助手，专注于命理学的科学验证和数据分析。',
              },
              {
                name: '生活建议顾问',
                prompt: '你是一个基于命理学的生活建议顾问，帮助用户做出更好的人生决策。',
              },
            ].map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => setCustomPrompt(preset.prompt)}
              >
                <SafeIcon name="Copy" className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-left text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <SafeIcon name="Eye" className="h-4 w-4" />
            预览
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">助手名称：</span>
              <span className="font-semibold text-foreground">{assistantName}</span>
            </p>
            <p>
              <span className="text-muted-foreground">个性风格：</span>
              <span className="font-semibold text-foreground">{personality}</span>
            </p>
            <p>
              <span className="text-muted-foreground">语言：</span>
              <span className="font-semibold text-foreground">{language}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
