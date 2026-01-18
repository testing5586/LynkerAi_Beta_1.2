
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VideoRecord {
  id: string;
  masterName: string;
  masterAvatar: string;
  date: string;
  duration: string;
  summary: string;
  videoUrl: string;
}

interface VideoRecordItemProps {
  record: VideoRecord;
  onDelete: () => void;
}

export default function VideoRecordItem({ record, onDelete }: VideoRecordItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Card className="glass-card border-primary/20 hover:border-primary/40 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src={record.masterAvatar} alt={record.masterName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {record.masterName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h4 className="font-semibold text-sm">{record.masterName}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDate(record.date)} · {record.duration}
                </p>
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                <SafeIcon name="Video" className="h-3 w-3 mr-1" />
                已录制
              </Badge>
            </div>

            {/* Summary */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {record.summary}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                asChild
              >
                <a href={record.videoUrl}>
                  <SafeIcon name="Play" className="h-3 w-3 mr-1" />
                  查看视频
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
              >
                <SafeIcon name="FileText" className="h-3 w-3 mr-1" />
                查看笔记
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <SafeIcon name="Trash2" className="h-3 w-3 mr-1" />
                删除
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
