
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import type { KBNoteModel } from '@/data/knowledge';

interface KnowledgeNoteCardProps {
  note: KBNoteModel;
  onEdit?: (note: KBNoteModel) => void;
  onDelete?: (noteId: string) => void;
}

export default function KnowledgeNoteCard({ note, onEdit, onDelete }: KnowledgeNoteCardProps) {
  const preview = note.contentMarkdown.substring(0, 150).replace(/[#*`]/g, '');
  const isImported = !!note.sourceUrl;

  return (
    <Card className="glass-card hover:shadow-card transition-all cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
              {note.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {note.dateCreated}
            </CardDescription>
          </div>
          {isImported && (
            <SafeIcon name="Download" className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {preview}
          {preview.length < note.contentMarkdown.length && '...'}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <a href={`#note-${note.noteId}`}>
              <SafeIcon name="Eye" className="h-3 w-3 mr-1" />
              查看
            </a>
          </Button>
<Button
             variant="ghost"
             size="sm"
             className="flex-1"
             onClick={() => onEdit?.(note)}
           >
             <SafeIcon name="Edit" className="h-3 w-3 mr-1" />
             编辑
           </Button>
           <Button
             variant="ghost"
             size="sm"
             className="text-destructive hover:text-destructive"
             onClick={() => {
               if (confirm('确定要删除这条笔记吗？')) {
                 onDelete?.(note.noteId);
               }
             }}
           >
             <SafeIcon name="Trash2" className="h-3 w-3" />
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}
