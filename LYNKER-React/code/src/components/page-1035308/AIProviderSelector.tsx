
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface AIProviderSelectorProps {
  currentProvider: string;
  onProviderChange: (provider: 'chatgpt' | 'gemini' | 'qwen' | 'deepseek' | 'claude') => void;
}

const providers = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI的强大语言模型，擅长自然对话和复杂推理',
    icon: 'Zap',
    features: ['高精度', '多语言', '快速响应'],
    pricing: '按token计费',
    recommended: true,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google的多模态AI模型，支持文本、图像和代码分析',
    icon: 'Sparkles',
    features: ['多模态', '图像理解', '代码生成'],
    pricing: '按token计费',
    recommended: false,
  },
  {
    id: 'qwen',
    name: '通义千问 (Qwen)',
    description: '阿里巴巴的大语言模型，对中文优化，支持长文本',
    icon: 'Globe',
    features: ['中文优化', '长文本', '成本低'],
    pricing: '按token计费',
    recommended: false,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: '深度求索的高效AI模型，性价比高',
    icon: 'Brain',
    features: ['高效能', '低成本', '快速'],
    pricing: '按token计费',
    recommended: false,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic的安全AI助手，擅长长文本和分析',
    icon: 'Shield',
    features: ['安全性', '长文本', '分析能力'],
    pricing: '按token计费',
    recommended: false,
  },
];

export default function AIProviderSelector({
  currentProvider,
  onProviderChange,
}: AIProviderSelectorProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>选择AI提供商</CardTitle>
          <CardDescription>
            选择您想使用的AI助手提供商。不同提供商有不同的能力和定价
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentProvider === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onProviderChange(provider.id as any)}
              >
                {provider.recommended && (
                  <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                    推荐
                  </Badge>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <SafeIcon name={provider.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{provider.name}</h3>
                    <p className="text-xs text-muted-foreground">{provider.pricing}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {provider.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {provider.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant={currentProvider === provider.id ? 'default' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProviderChange(provider.id as any);
                  }}
                >
                  {currentProvider === provider.id ? (
                    <>
                      <SafeIcon name="Check" className="h-4 w-4 mr-2" />
                      已选择
                    </>
                  ) : (
                    '选择此提供商'
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Info" className="h-4 w-4 text-accent" />
            如何选择提供商？
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>ChatGPT：</strong>
            最流行的选择，功能全面，适合大多数用户
          </p>
          <p>
            <strong>Gemini：</strong>
            支持图像分析，适合需要处理图片的用户
          </p>
          <p>
            <strong>Qwen：</strong>
            对中文优化，成本低，适合中文用户
          </p>
          <p>
            <strong>DeepSeek：</strong>
            性价比最高，适合预算有限的用户
          </p>
          <p>
            <strong>Claude：</strong>
            安全性最高，适合处理敏感信息
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
