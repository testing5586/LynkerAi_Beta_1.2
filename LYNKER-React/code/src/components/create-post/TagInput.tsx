
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
}

const suggestedTags = [
  '八字',
  '紫微',
  '占星',
  '命理',
  '运势',
  '婚姻',
  '事业',
  '财运',
  '健康',
  '性格分析',
  '同命',
  '验证',
  '经验分享',
  '案例分析',
  '学习笔记',
];

export default function TagInput({
  tags,
  onTagsChange,
  maxTags = 5,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      tags.length < maxTags &&
      trimmedTag.length <= 20
    ) {
      onTagsChange([...tags, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      handleRemoveTag(tags.length - 1);
    }
  };

  const filteredSuggestions = suggestedTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(tag)
  );

  return (
    <div className="space-y-3">
      {/* Input */}
      <div className="relative">
        <Input
          placeholder="输入标签后按Enter添加"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="bg-background/50 border-primary/20"
        />

        {/* Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-primary/20 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors text-sm"
              >
                <SafeIcon name="Plus" className="h-3 w-3 inline mr-2" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tags Display */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1"
          >
            <SafeIcon name="Hash" className="h-3 w-3" />
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(index)}
              className="ml-1 hover:text-destructive transition-colors"
            >
              <SafeIcon name="X" className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Counter */}
      <p className="text-xs text-muted-foreground">
        {tags.length}/{maxTags} 标签
      </p>
    </div>
  );
}
