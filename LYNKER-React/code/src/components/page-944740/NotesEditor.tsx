
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SafeIcon from '@/components/common/SafeIcon';

interface NotesEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export default function NotesEditor({
  initialContent,
  onSave,
  onCancel,
}: NotesEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave(content);
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="输入您的备注内容...支持Markdown格式"
        className="min-h-48 resize-none bg-muted/50 border-primary/20 focus:border-primary"
      />

      {/* Character Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{content.length} / 5000 字符</span>
        {content.length > 4500 && (
          <span className="text-yellow-400">接近字符限制</span>
        )}
      </div>

      {/* Format Help */}
      <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">支持的格式：</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>**粗体** 或 __粗体__</li>
          <li>*斜体* 或 _斜体_</li>
          <li>- 列表项</li>
          <li>[链接文本](URL)</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          取消
        </Button>
        <Button
          className="bg-mystical-gradient hover:opacity-90"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="mr-2 h-4 w-4" />
              保存备注
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
