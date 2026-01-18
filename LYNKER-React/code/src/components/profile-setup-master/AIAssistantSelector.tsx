
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';

interface AIAssistantSelectorProps {
  selectedAI: string;
  apiKey: string;
  onAIChange: (ai: string) => void;
  onAPIKeyChange: (key: string) => void;
}

export default function AIAssistantSelector({
  selectedAI,
  apiKey,
  onAIChange,
  onAPIKeyChange,
}: AIAssistantSelectorProps) {
  return (
    <div className="space-y-6">
      {/* AI Selection */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SafeIcon name="Sparkles" className="w-5 h-5" />
            <span>选择AI助手</span>
          </CardTitle>
          <CardDescription>选择您偏好的AI模型用于生成咨询笔记和分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_AI_ASSISTANTS.map((ai) => (
              <button
                key={ai.id}
                onClick={() => onAIChange(ai.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedAI === ai.id
                    ? 'border-accent bg-accent/10'
                    : 'border-muted hover:border-primary'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <SafeIcon name={ai.iconName} className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{ai.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {ai.description}
                    </p>
                  </div>
                  {selectedAI === ai.id && (
                    <Badge className="bg-accent text-accent-foreground flex-shrink-0">
                      <SafeIcon name="Check" className="w-3 h-3 mr-1" />
                      已选择
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Key Configuration */}
      {selectedAI && (
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="Key" className="w-5 h-5" />
              <span>API密钥配置</span>
            </CardTitle>
            <CardDescription>
              配置您的API密钥以启用AI功能
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* API Key Input */}
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-base font-medium">
                API密钥
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="粘贴您的API密钥"
                value={apiKey}
                onChange={(e) => onAPIKeyChange(e.target.value)}
                className="h-11 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                您的API密钥将被安全加密存储，仅用于生成咨询笔记和分析。
              </p>
            </div>

            {/* Setup Guide Link */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-muted">
              <div className="flex items-center space-x-2">
                <SafeIcon name="HelpCircle" className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  不知道如何获取API密钥？
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-accent hover:text-accent hover:bg-accent/10"
              >
                <a
                  href={MOCK_AI_ASSISTANTS.find((a) => a.id === selectedAI)?.keySetupLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看指南
                  <SafeIcon name="ExternalLink" className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>

            {/* Test Connection */}
            <Button
              variant="outline"
              className="w-full"
              disabled={!apiKey}
            >
              <SafeIcon name="Zap" className="w-4 h-4 mr-2" />
              测试连接
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
