
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';
import { useState } from 'react';

interface MarkdownNoteViewerProps {
  content: string;
  isEditing: boolean;
  onChange: (content: string) => void;
  onSave: () => void;
}

export default function MarkdownNoteViewer({
  content,
  isEditing,
  onChange,
  onSave,
}: MarkdownNoteViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-96 font-mono text-sm"
          placeholder="编辑Markdown笔记..."
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            支持Markdown格式，包括标题、列表、代码块等
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
            >
              <SafeIcon name="Save" className="mr-2 h-4 w-4" />
              保存编辑
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Markdown Preview */}
      <Card className="glass-card p-6 prose prose-invert max-w-none">
        <div className="markdown-content space-y-4 text-sm leading-relaxed">
          {content.split('\n').map((line, idx) => {
            // Simple markdown rendering
            if (line.startsWith('# ')) {
              return (
                <h1 key={idx} className="text-2xl font-bold mt-4 mb-2">
                  {line.replace('# ', '')}
                </h1>
              );
            }
            if (line.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-xl font-bold mt-3 mb-2">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={idx} className="ml-4">
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.startsWith('**') && line.endsWith('**')) {
              return (
                <p key={idx} className="font-semibold">
                  {line.replace(/\*\*/g, '')}
                </p>
              );
            }
            if (line.trim() === '') {
              return <div key={idx} className="h-2" />;
            }
            return (
              <p key={idx} className="text-muted-foreground">
                {line}
              </p>
            );
          })}
        </div>
      </Card>

      {/* Copy Button */}
      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
        >
          <SafeIcon name={copied ? 'Check' : 'Copy'} className="mr-2 h-4 w-4" />
          {copied ? '已复制' : '复制笔记'}
        </Button>
      </div>
    </div>
  );
}
