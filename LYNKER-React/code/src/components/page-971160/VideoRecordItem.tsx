
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface VideoRecord {
  id: string;
  masterId: string;
  masterName: string;
  masterAvatar: string;
  date: string;
  duration: string;
  title: string;
  thumbnail: string;
  notes?: string;
}

interface VideoRecordItemProps {
  record: VideoRecord;
  onDelete: () => void;
}

export default function VideoRecordItem({ record, onDelete }: VideoRecordItemProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <Card className="glass-card hover:shadow-card transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {/* Thumbnail */}
          <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 group">
            <img
              src={record.thumbnail}
              alt={record.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <SafeIcon name="Play" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <Badge className="absolute top-2 right-2 bg-black/60">
              <SafeIcon name="Clock" className="h-3 w-3 mr-1" />
              {record.duration}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{record.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <UserAvatar
                      user={{
                        name: record.masterName,
                        avatar: record.masterAvatar,
                        isPro: true,
                      }}
                      size="small"
                      showHoverCard={false}
                    />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{record.masterName}</p>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {record.notes && (
                <div className="mb-3">
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <SafeIcon name={showNotes ? 'ChevronUp' : 'ChevronDown'} className="h-3 w-3" />
                    {showNotes ? '隐藏' : '显示'}备注
                  </button>
                  {showNotes && (
                    <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded">
                      {record.notes}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1"
              >
                <a href="./consultation-room.html">
                  <SafeIcon name="Play" className="h-4 w-4 mr-2" />
                  查看视频
                </a>
              </Button>
<Dialog>
                 <DialogTrigger asChild>
                   <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                     <SafeIcon name="Trash2" className="h-4 w-4" />
                   </Button>
                 </DialogTrigger>
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>删除视频记录</DialogTitle>
                     <DialogDescription>
                       确定要删除这条视频记录吗？此操作无法撤销。
                     </DialogDescription>
                   </DialogHeader>
                   <div className="flex gap-3">
                     <Button variant="outline" onClick={() => {}}>
                       取消
                     </Button>
                     <Button
                       onClick={onDelete}
                       className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                     >
                       删除
                     </Button>
                   </div>
                 </DialogContent>
               </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
