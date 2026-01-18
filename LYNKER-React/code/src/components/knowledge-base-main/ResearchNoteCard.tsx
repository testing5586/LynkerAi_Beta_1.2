
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface ResearchNoteCardProps {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ResearchNoteCard({
  id,
  title,
  date,
  content,
  tags,
  onEdit,
  onDelete,
}: ResearchNoteCardProps) {
  return (
    <Card className="glass-card hover:shadow-card transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-2">
              <div className="flex items-center space-x-2">
                <SafeIcon name="Calendar" className="h-4 w-4" />
                <span>{date}</span>
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{content}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(id)}
              >
                <SafeIcon name="Edit" className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(id)}
              >
                <SafeIcon name="Trash2" className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
