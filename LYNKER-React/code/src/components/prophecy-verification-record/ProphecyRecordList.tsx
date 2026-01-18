
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import EmptyState from '@/components/common/EmptyState';
import type { ProphecyRecordModel } from '@/data/knowledge';

interface ProphecyRecordListProps {
  records: ProphecyRecordModel[];
  onEdit: (record: ProphecyRecordModel) => void;
  onDelete: (prophecyId: string) => void;
}

export default function ProphecyRecordList({
  records,
  onEdit,
  onDelete,
}: ProphecyRecordListProps) {
  if (records.length === 0) {
    return (
      <EmptyState
        variant="no-records"
        title="暂无预言记录"
        description="您还没有创建任何预言应验记录。开始记录您的预言应验情况吧！"
        actionLabel="新增记录"
        onAction={() => window.location.reload()}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已应验':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '应验中':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case '未应验':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已应验':
        return 'CheckCircle';
      case '应验中':
        return 'Clock';
      case '未应验':
        return 'XCircle';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.prophecyId} className="glass-card hover:shadow-card transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {record.prophecySummary}
                  </h3>
                  <Badge className={`${getStatusColor(record.fulfillmentStatus)} border`}>
                    <SafeIcon name={getStatusIcon(record.fulfillmentStatus)} className="mr-1 h-3 w-3" />
                    {record.fulfillmentStatus}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <SafeIcon name="User" className="h-4 w-4" />
                    <span>来源：{record.sourceMaster}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SafeIcon name="Calendar" className="h-4 w-4" />
                    <span>记录于：{record.dateRecorded}</span>
                  </div>
                  {record.dateExpected !== 'N/A' && (
                    <div className="flex items-center gap-1">
                      <SafeIcon name="Clock" className="h-4 w-4" />
                      <span>预期：{record.dateExpected}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(record)}
                  className="hover:bg-primary/20"
                >
                  <SafeIcon name="Edit" className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(record.prophecyId)}
                  className="hover:bg-destructive/20"
                >
                  <SafeIcon name="Trash2" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {record.userReflection && (
            <CardContent className="pt-0">
              <div className="bg-muted/30 rounded-lg p-4 border border-muted">
                <p className="text-sm text-foreground/80">
                  <span className="font-semibold text-accent">我的反思：</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {record.userReflection}
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
