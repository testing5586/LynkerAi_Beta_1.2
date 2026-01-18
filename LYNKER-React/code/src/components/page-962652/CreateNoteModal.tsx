
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SafeIcon from '@/components/common/SafeIcon';

interface CreateNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (title: string, content: string) => void;
}

export default function CreateNoteModal({
  open,
  onOpenChange,
  onCreate,
}: CreateNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      alert('请输入笔记标题');
      return;
    }

    onCreate(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SafeIcon name="Plus" className="h-5 w-5" />
            创建新笔记
          </DialogTitle>
          <DialogDescription>
            创建一条新的命理研究笔记，支持Markdown格式
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="note-title">笔记标题</Label>
            <Input
              id="note-title"
              placeholder="输入笔记标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="note-content">笔记内容</Label>
            <Textarea
              id="note-content"
              placeholder="输入笔记内容，支持Markdown格式..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-64 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              支持Markdown格式：# 标题、**粗体**、*斜体*、- 列表等
            </p>
          </div>

          {/* Preview */}
          {content && (
            <div className="space-y-2">
              <Label>预览</Label>
              <div className="bg-muted/50 rounded-lg p-4 max-h-32 overflow-auto text-sm">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {content.split('\n').slice(0, 5).join('\n')}
                  {content.split('\n').length > 5 && '...'}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!title.trim()}
              className="bg-mystical-gradient hover:opacity-90 gap-2"
            >
              <SafeIcon name="Save" className="h-4 w-4" />
              创建笔记
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
