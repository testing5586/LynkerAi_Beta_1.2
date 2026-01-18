
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface TaggingSystemProps {
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  isClient: boolean;
}

const suggestedTags = [
  '基础理论',
  '案例分析',
  '高应验',
  '低应验',
  '高争议',
  '投票分析',
  '八字',
  '紫薇',
  '占星',
  '风水',
  '面相',
];

export default function TaggingSystem({
  selectedTags,
  onAddTag,
  onRemoveTag,
  isClient,
}: TaggingSystemProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag)) {
      onAddTag(customTag);
      setCustomTag('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => onRemoveTag(tag)}
            >
              {tag}
              <SafeIcon name="X" className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Custom Tag Input */}
      <div className="flex gap-2">
        <Input
          placeholder="添加自定义标签..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddCustomTag();
            }
          }}
          disabled={!isClient}
          className="text-xs bg-muted/50 border-muted-foreground/20"
        />
        <Button
          onClick={handleAddCustomTag}
          size="sm"
          variant="outline"
          disabled={!customTag.trim() || !isClient}
        >
          <SafeIcon name="Plus" className="h-3 w-3" />
        </Button>
      </div>

      {/* Suggested Tags */}
      <div>
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          disabled={!isClient}
        >
          <SafeIcon
            name={showSuggestions ? 'ChevronUp' : 'ChevronDown'}
            className="h-3 w-3"
          />
          推荐标签
        </button>

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedTags
              .filter((tag) => !selectedTags.includes(tag))
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => onAddTag(tag)}
                  className="text-xs px-2 py-1 rounded bg-muted/50 hover:bg-accent/20 transition-colors"
                  disabled={!isClient}
                >
                  + {tag}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
