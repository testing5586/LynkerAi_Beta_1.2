
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface VideoRecord {
  id: string;
  masterId: string;
  masterName: string;
  date: string;
  duration: string;
  notes: string;
}

interface VideoRecordItemProps {
  record: VideoRecord;
  onDelete: () => void;
}

export default function VideoRecordItem({ record, onDelete }: VideoRecordItemProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const videoThumbnailUrl = `https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/23/89801da2-29e1-466f-816a-78342b77276a.png`;

  return (
    <Card className="glass-card hover:shadow-card transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* Video Thumbnail */}
      <div className="relative w-full h-32 overflow-hidden group cursor-pointer bg-muted/50">
        <img
          src={videoThumbnailUrl}
          alt={`${record.masterName}的批命视频`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 flex items-center justify-center transition-all">
          <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all">
            <SafeIcon name="Play" className="h-5 w-5 text-black ml-0.5" />
          </div>
        </div>
      </div>

      <CardContent className="pt-4 flex flex-col flex-1">
        {/* Content */}
        <div className="space-y-2 flex-1">
          <div>
            <h4 className="font-semibold text-sm line-clamp-1">{record.masterName}</h4>
            <p className="text-xs text-muted-foreground">{formatDate(record.date)}</p>
          </div>

          <p className="text-xs text-foreground/80 line-clamp-2">
            {record.notes}
          </p>

          <div className="flex items-center space-x-1">
            <Badge variant="outline" className="text-xs">
              <SafeIcon name="Clock" className="h-3 w-3 mr-1" />
              {record.duration}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 gap-1 pt-3 border-t mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground flex-1 text-xs h-7"
            asChild
          >
            <a href="./consultation-room.html">
              <SafeIcon name="Play" className="h-3 w-3 mr-1" />
              查看
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-1 text-xs h-7"
            onClick={onDelete}
          >
            <SafeIcon name="Trash2" className="h-3 w-3" />
            <span className="ml-1">删除</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
