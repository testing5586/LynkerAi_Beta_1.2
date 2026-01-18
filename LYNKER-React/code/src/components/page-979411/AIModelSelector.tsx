
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface AIModelSelectorProps {
  models: AIAssistantModel[];
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
}

export default function AIModelSelector({
  models,
  selectedModelId,
  onSelectModel,
}: AIModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => {
        const isSelected = model.id === selectedModelId;
        return (
          <button
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={`text-left transition-all ${
              isSelected
                ? 'ring-2 ring-primary'
                : 'hover:ring-1 hover:ring-muted-foreground/50'
            }`}
          >
            <Card className={`glass-card cursor-pointer ${isSelected ? 'bg-primary/10' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <SafeIcon name={model.iconName} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{model.name}</h4>
                      <p className="text-xs text-muted-foreground">AI助手</p>
                    </div>
                  </div>
                  {isSelected && (
                    <Badge className="bg-primary text-primary-foreground">
                      <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                      已选择
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {model.description}
                </p>

                <a
                  href={model.keySetupLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SafeIcon name="ExternalLink" className="h-3 w-3" />
                  {model.keySetupLinkTitle}
                </a>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
