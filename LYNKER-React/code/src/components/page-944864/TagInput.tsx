import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { PRESET_TAGS } from './PublishTemplate';

interface TagInputProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagInput({
  selectedTags,
  onTagsChange,
}: TagInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

return (
    <Card className="glass-card rounded-2xl border-2 border-muted/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">标签</CardTitle>
        <CardDescription className="text-base">
          添加标签帮助朋友发现您的内容
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="space-y-3">
            <p className="text-base font-bold text-foreground">已选标签 ({selectedTags.length})</p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-2 rounded-lg text-sm py-2 px-3 font-semibold">
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive transition-colors"
                  >
                    <SafeIcon name="X" className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tag Selector */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-between rounded-lg font-semibold text-base"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="flex items-center space-x-2">
              <SafeIcon name="Tag" className="h-5 w-5" />
              <span>选择标签</span>
            </span>
            <SafeIcon
              name={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="h-5 w-5"
            />
          </Button>

          {isExpanded && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-muted/50">
              {PRESET_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.value)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                    selectedTags.includes(tag.value)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
          <SafeIcon name="AlertCircle" className="inline h-4 w-4 mr-2" />
          最多可添加5个标签，最多5个字符
        </p>
      </CardContent>
    </Card>
  );
}