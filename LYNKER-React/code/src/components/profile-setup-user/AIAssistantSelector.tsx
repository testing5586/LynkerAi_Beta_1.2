
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_AI_ASSISTANTS } from '@/data/ai_settings';
import type { AIAssistantModel } from '@/data/ai_settings';

interface AIAssistantSelectorProps {
  selectedAI: string;
  onAISelect: (aiId: string) => void;
}

export default function AIAssistantSelector({
  selectedAI,
  onAISelect,
}: AIAssistantSelectorProps) {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    chatgpt: '',
    qwen: '',
    gemini: '',
    deepseek: '',
  });

  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleApiKeyChange = (aiId: string, value: string) => {
    setApiKeys((prev) => ({ ...prev, [aiId]: value }));
  };

  const handleSaveApiKey = (aiId: string) => {
    // In a real app, this would be encrypted and sent to the server
    console.log(`API Key saved for ${aiId}`);
    setOpenDialog(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_AI_ASSISTANTS.map((ai) => (
          <Card
            key={ai.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedAI === ai.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onAISelect(ai.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <SafeIcon name={ai.iconName} className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{ai.name}</CardTitle>
                  </div>
                </div>
                {selectedAI === ai.id && (
                  <Badge className="bg-primary text-primary-foreground">
                    <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                    已选择
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="text-sm">
                {ai.description}
              </CardDescription>

              {/* API Key Status */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {apiKeys[ai.id] ? '✓ API密钥已配置' : '⚠ 需要配置API密钥'}
                </span>
                <Dialog open={openDialog === ai.id} onOpenChange={(open) => setOpenDialog(open ? ai.id : null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDialog(ai.id);
                      }}
                    >
                      <SafeIcon name="Settings" className="h-3 w-3 mr-1" />
                      配置
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{ai.name} - API密钥配置</DialogTitle>
                      <DialogDescription>
                        请输入您的API密钥。密钥将被加密存储，仅用于本地调用。
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* API Key Input */}
                      <div className="space-y-2">
                        <Label htmlFor={`api-key-${ai.id}`}>API密钥</Label>
                        <Input
                          id={`api-key-${ai.id}`}
                          type="password"
                          placeholder="输入您的API密钥"
                          value={apiKeys[ai.id]}
                          onChange={(e) => handleApiKeyChange(ai.id, e.target.value)}
                          className="bg-input border-border"
                        />
                      </div>

                      {/* Help Link */}
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                        <p className="text-sm font-medium flex items-center gap-2">
                          <SafeIcon name="HelpCircle" className="h-4 w-4" />
                          如何获取API密钥？
                        </p>
                        <a
                          href={ai.keySetupLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {ai.keySetupLinkTitle}
                          <SafeIcon name="ExternalLink" className="h-3 w-3" />
                        </a>
                      </div>

                      {/* Security Notice */}
                      <div className="bg-accent/10 rounded-lg p-3">
                        <p className="text-xs text-accent">
                          🔒 您的API密钥将被加密存储在本地，不会上传到服务器。
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialog(null)}
                          className="flex-1"
                        >
                          取消
                        </Button>
                        <Button
                          onClick={() => handleSaveApiKey(ai.id)}
                          disabled={!apiKeys[ai.id]}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                          保存密钥
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-accent">关于AI助手</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>您可以选择一个主要AI助手，也可以配置多个备选方案</li>
                <li>API密钥仅用于本地调用，确保您的数据隐私</li>
                <li>不同AI模型在命理分析上各有特色，可根据需要切换</li>
                <li>所有配置可在AI助手设置中随时修改</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
