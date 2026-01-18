
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface AIProviderCardProps {
  provider: AIAssistantModel;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AIProviderCard({
  provider,
  isSelected,
  onSelect,
}: AIProviderCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-primary bg-primary/10 glass-card'
          : 'hover:bg-muted/50 glass-card'
      }`}
      onClick={onSelect}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <SafeIcon name={provider.iconName} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{provider.name}</h3>
              {isSelected && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                  已选择
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {provider.description}
        </p>

        {/* Action Button */}
        <Button
          variant={isSelected ? 'default' : 'outline'}
          size="sm"
          className="w-full text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? (
            <>
              <SafeIcon name="Check" className="h-3 w-3 mr-1" />
              已选择
            </>
          ) : (
            <>
              <SafeIcon name="Plus" className="h-3 w-3 mr-1" />
              选择此提供商
            </>
          )}
        </Button>

        {/* Setup Link */}
        {isSelected && (
          <a
            href={provider.keySetupLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <SafeIcon name="ExternalLink" className="h-3 w-3" />
            {provider.keySetupLinkTitle}
          </a>
        )}
      </div>
    </Card>
  );
}
