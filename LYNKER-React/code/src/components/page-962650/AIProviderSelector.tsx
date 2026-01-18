
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface AIProviderSelectorProps {
  selectedProvider: string;
  onSelectProvider: (providerId: string) => void;
  assistants: AIAssistantModel[];
}

export default function AIProviderSelector({
  selectedProvider,
  onSelectProvider,
  assistants,
}: AIProviderSelectorProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
          选择AI助手提供商
        </CardTitle>
        <CardDescription>
          选择最适合您的AI模型，支持多个提供商的API配置
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assistants.map((assistant) => (
            <div
              key={assistant.id}
              onClick={() => onSelectProvider(assistant.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedProvider === assistant.id
                  ? 'border-primary bg-primary/10 shadow-lg'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <SafeIcon name={assistant.iconName} className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{assistant.name}</h3>
                    {selectedProvider === assistant.id && (
                      <Badge className="mt-1 bg-primary text-primary-foreground">
                        <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                        已选择
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{assistant.description}</p>
              <Button
                variant={selectedProvider === assistant.id ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProvider(assistant.id);
                }}
              >
                {selectedProvider === assistant.id ? '已选择' : '选择此提供商'}
              </Button>
            </div>
          ))}
        </div>

        {/* Current Selection Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-2">当前选择</h4>
          <p className="text-sm text-muted-foreground">
            您已选择 <span className="font-semibold text-foreground">{assistants.find(a => a.id === selectedProvider)?.name}</span> 作为您的AI助手提供商。
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            需要配置API密钥才能使用此提供商。请前往"API密钥"标签页进行配置。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
