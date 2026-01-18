
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SafeIcon from '@/components/common/SafeIcon';

interface CreateNoteModalProps {
  onClose: () => void;
  onCreate: (title: string, content: string) => void;
  mode?: 'create' | 'edit';
  initialTitle?: string;
  initialContent?: string;
}

export default function CreateNoteModal({ 
  onClose, 
  onCreate, 
  mode = 'create',
  initialTitle = '',
  initialContent = ''
}: CreateNoteModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = mode === 'edit';

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onCreate(title, content);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card">
<DialogHeader>
           <DialogTitle className="flex items-center space-x-2">
             <SafeIcon name={isEditMode ? 'Edit' : 'Plus'} className="h-5 w-5" />
             <span>{isEditMode ? '编辑笔记' : '创建新笔记'}</span>
           </DialogTitle>
           <DialogDescription>
             {isEditMode ? '编辑您的知识库笔记，支持Markdown格式' : '创建一条新的知识库笔记，支持Markdown格式'}
           </DialogDescription>
         </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">笔记标题</label>
            <Input
              placeholder="输入笔记标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">笔记内容</label>
            <Textarea
              placeholder="输入笔记内容（支持Markdown）..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-muted/50 min-h-[300px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              支持 Markdown 格式：# 标题、**粗体**、*斜体*、`代码`、- 列表等
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
<Button
             onClick={handleSubmit}
             disabled={isSubmitting || !title.trim() || !content.trim()}
             className="bg-mystical-gradient hover:opacity-90"
           >
             {isSubmitting ? (
               <>
                 <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                 {isEditMode ? '保存中...' : '创建中...'}
               </>
             ) : (
               <>
                 <SafeIcon name={isEditMode ? 'Save' : 'Plus'} className="h-4 w-4 mr-2" />
                 {isEditMode ? '保存笔记' : '创建笔记'}
               </>
             )}
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
