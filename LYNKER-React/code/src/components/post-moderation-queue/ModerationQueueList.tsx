
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import ModerationQueueItem from '@/components/post-moderation-queue/ModerationQueueItem';
import type { ModerationItem } from '@/components/post-moderation-queue/mock';

interface ModerationQueueListProps {
  items: ModerationItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ModerationQueueList({
  items,
  onApprove,
  onReject,
}: ModerationQueueListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ModerationQueueItem
          key={item.id}
          item={item}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
