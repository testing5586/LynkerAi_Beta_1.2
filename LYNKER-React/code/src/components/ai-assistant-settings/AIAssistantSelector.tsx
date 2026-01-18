
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface AIAssistantSelectorProps {
  assistants: AIAssistantModel[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function AIAssistantSelector({
  assistants,
  selectedId,
  onSelect,
}: AIAssistantSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {assistants.map((assistant) => (
        <Card
          key={assistant.id}
          className={`glass-card cursor-pointer transition-all ${
            selectedId === assistant.id
              ? 'ring-2 ring-accent border-accent/50 bg-accent/5'
              : 'hover:border-accent/30'
          }`}
          onClick={() => onSelect(assistant.id)}
        >
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-mystical-gradient flex items-center justify-center">
                  <SafeIcon name={assistant.iconName} className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{assistant.name}</h3>
                  <p className="text-xs text-muted-foreground">AI模型</p>
                </div>
              </div>
              {selectedId === assistant.id && (
                <Badge className="bg-accent text-accent-foreground">
                  <SafeIcon name="Check" className="w-3 h-3 mr-1" />
                  已选择
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {assistant.description}
            </p>

            {/* Select Button */}
            <Button
              variant={selectedId === assistant.id ? 'default' : 'outline'}
              size="sm"
              className="w-full"
              onClick={() => onSelect(assistant.id)}
            >
              {selectedId === assistant.id ? '已选择' : '选择此模型'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
