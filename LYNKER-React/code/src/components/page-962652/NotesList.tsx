
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import type { KBNoteModel } from '@/data/knowledge';

interface NotesListProps {
  notes: KBNoteModel[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
}

export default function NotesList({
  notes,
  selectedNoteId,
  onSelectNote,
}: NotesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card
          key={note.noteId}
          className={`glass-card hover:border-primary/50 transition-all cursor-pointer ${
            selectedNoteId === note.noteId ? 'border-primary ring-2 ring-primary/20' : ''
          }`}
          onClick={() => onSelectNote(note.noteId)}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base line-clamp-2">{note.title}</CardTitle>
                <CardDescription className="mt-1 text-xs">
                  {note.dateCreated}
                </CardDescription>
              </div>
              {note.sourceUrl && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  导入
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Preview */}
            <div className="text-sm text-muted-foreground line-clamp-3">
              {note.contentMarkdown.replace(/[#*`]/g, '').substring(0, 150)}...
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-1 text-xs"
                asChild
              >
                <a href={`#note-${note.noteId}`}>
                  <SafeIcon name="Eye" className="h-3 w-3" />
                  查看
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-1 text-xs"
              >
                <SafeIcon name="Edit" className="h-3 w-3" />
                编辑
              </Button>
              {note.sourceUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 gap-1 text-xs"
                  asChild
                >
                  <a href={note.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <SafeIcon name="ExternalLink" className="h-3 w-3" />
                    原文
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
