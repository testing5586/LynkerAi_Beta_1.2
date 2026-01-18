
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AINoteDetailModel } from '@/data/ai_settings';

interface NoteMetadataProps {
  note: AINoteDetailModel;
}

export default function NoteMetadata({ note }: NoteMetadataProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <SafeIcon name="Calendar" className="h-4 w-4" />
        <span>{formatDate(note.timestamp)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <SafeIcon name="FileText" className="h-4 w-4" />
        <span>AI自动生成</span>
      </div>

      <Badge variant="secondary" className="flex items-center gap-1">
        <SafeIcon name="Sparkles" className="h-3 w-3" />
        Markdown格式
      </Badge>

      <Badge variant="outline" className="flex items-center gap-1">
        <SafeIcon name="Video" className="h-3 w-3" />
        包含视频链接
      </Badge>
    </div>
  );
}
