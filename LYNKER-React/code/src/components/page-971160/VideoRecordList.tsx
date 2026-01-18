
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import VideoRecordItem from './VideoRecordItem';

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

interface VideoRecordListProps {
  records: VideoRecord[];
}

export default function VideoRecordList({ records }: VideoRecordListProps) {
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  const handleDelete = (id: string) => {
    const newDeleted = new Set(deletedIds);
    newDeleted.add(id);
    setDeletedIds(newDeleted);
  };

  const visibleRecords = records.filter((record) => !deletedIds.has(record.id));

  if (visibleRecords.length === 0) {
    return (
      <Card className="glass-card">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <SafeIcon name="Video" className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">暂无视频记录</h3>
            <p className="text-sm text-muted-foreground mb-4">
              您还没有任何批命视频记录，预约命理师开始咨询吧
            </p>
            <Button asChild className="bg-mystical-gradient hover:opacity-90">
              <a href="./prognosis-service-entry.html">
                <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                预约命理师
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {visibleRecords.map((record) => (
        <VideoRecordItem
          key={record.id}
          record={record}
          onDelete={() => handleDelete(record.id)}
        />
      ))}
    </div>
  );
}
