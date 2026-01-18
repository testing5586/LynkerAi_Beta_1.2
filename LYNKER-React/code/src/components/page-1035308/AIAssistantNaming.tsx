
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';

interface AIAssistantNamingProps {
  assistantName: string;
  tone: 'formal' | 'casual' | 'mystical' | 'professional';
  customPrompt: string;
  onNameChange: (name: string) => void;
  onToneChange: (tone: 'formal' | 'casual' | 'mystical' | 'professional') => void;
  onPromptChange: (prompt: string) => void;
}

const toneDescriptions = {
  formal: '正式、学术性强，适合专业讨论',
  casual: '轻松、友好，适合日常交流',
  mystical: '神秘、深邃，适合命理分析',
  professional: '专业、高效，适合工作场景',
};

const toneExamples = {
  formal: '尊敬的用户，根据您的八字信息，我进行了详细的命理分析...',
  casual: '嘿，根据你的命盘，我发现了一些有趣的东西...',
  mystical: '在宇宙的神秘力量中，您的命盘展现出...',
  professional: '基于数据分析，您的命理特征表现为...',
};

export default function AIAssistantNaming({
  assistantName,
  tone,
  customPrompt,
  onNameChange,
  onToneChange,
  onPromptChange,
}: AIAssistantNamingProps) {
  const [showPromptHint, setShowPromptHint] = useState(false);

  return (
    <div className="space-y-6">
      {/* Assistant Name */}
      <Card>
        <CardHeader>
          <CardTitle>自定义AI助手名称</CardTitle>
          <CardDescription>
            给您的AI助手起一个独特的名字，让交互更加个性化
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assistant-name">助手名称</Label>
            <Input
              id="assistant-name"
              value={assistantName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="例如：灵伴AI、命理小助手、紫微大师..."
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground">
              {assistantName.length}/20 字符
            </p>
          </div>

          {/* Name Suggestions */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm font-semibold mb-3">推荐名称</p>
            <div className="grid grid-cols-2 gap-2">
              {['灵伴AI', '命理小助手', '紫微大师', '八字分析师', '占星导师', '玄学顾问'].map(
                (name) => (
                  <Button
                    key={name}
                    variant="outline"
                    size="sm"
                    onClick={() => onNameChange(name)}
                    className="text-xs"
                  >
                    {name}
                  </Button>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tone Selection */}
      <Card>
        <CardHeader>
          <CardTitle>AI语气风格</CardTitle>
          <CardDescription>
            选择AI助手的交流风格，影响回复的语气和表达方式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tone-select">选择语气</Label>
            <Select value={tone} onValueChange={(value: any) => onToneChange(value)}>
              <SelectTrigger id="tone-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">正式学术</SelectItem>
                <SelectItem value="casual">轻松友好</SelectItem>
                <SelectItem value="mystical">神秘深邃</SelectItem>
                <SelectItem value="professional">专业高效</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tone Description */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold mb-1">风格描述</p>
              <p className="text-sm text-muted-foreground">
                {toneDescriptions[tone]}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">示例回复</p>
              <p className="text-sm text-muted-foreground italic">
                "{toneExamples[tone]}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Prompt */}
      <Card>
        <CardHeader>
          <CardTitle>自定义系统提示词</CardTitle>
          <CardDescription>
            编写自定义提示词来定义AI助手的行为、知识领域和回复风格
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-prompt">提示词</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPromptHint(!showPromptHint)}
                className="gap-1"
              >
                <SafeIcon name="HelpCircle" className="h-4 w-4" />
                帮助
              </Button>
            </div>
            <Textarea
              id="custom-prompt"
              value={customPrompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="输入您的自定义提示词，例如：你是一位专业的命理分析师，擅长八字、紫微、占星等多个领域。请用友好但专业的语气回答用户的问题..."
              rows={6}
              className="font-mono text-sm resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {customPrompt.length} 字符
            </p>
          </div>

          {/* Prompt Hints */}
          {showPromptHint && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-semibold text-accent">提示词编写建议</p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>明确定义AI的角色和专长</li>
                <li>指定回复的语言和风格</li>
                <li>说明AI应该关注的知识领域</li>
                <li>设定交互的边界和限制</li>
                <li>提供具体的行为指导</li>
              </ul>
            </div>
          )}

          {/* Template Prompts */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm font-semibold mb-3">提示词模板</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() =>
                  onPromptChange(
                    '你是一位专业的命理分析师，擅长八字、紫微、占星等多个领域。请用友好但专业的语气回答用户的问题，并提供详细的分析和建议。'
                  )
                }
              >
                <SafeIcon name="Copy" className="h-3 w-3 mr-2" />
                命理分析师模板
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() =>
                  onPromptChange(
                    '你是一位友好的命理学习助手，帮助用户理解命理知识。用简洁、易懂的语言解释复杂的概念，并提供实际例子。'
                  )
                }
              >
                <SafeIcon name="Copy" className="h-3 w-3 mr-2" />
                学习助手模板
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() =>
                  onPromptChange(
                    '你是一位神秘的命理导师，用深邃而富有诗意的语言讲述命理的奥秘。帮助用户发现自己命盘中的隐藏含义。'
                  )
                }
              >
                <SafeIcon name="Copy" className="h-3 w-3 mr-2" />
                神秘导师模板
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
