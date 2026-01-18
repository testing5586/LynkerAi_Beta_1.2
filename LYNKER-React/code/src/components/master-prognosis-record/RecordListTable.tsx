
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import type { MasterRecordSummaryModel } from '@/data/knowledge';

interface RecordListTableProps {
  records: MasterRecordSummaryModel[];
}

export default function RecordListTable({ records }: RecordListTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '已验证':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '应验中':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case '待验证':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已验证':
        return 'CheckCircle';
      case '应验中':
        return 'Clock';
      case '待验证':
        return 'AlertCircle';
      default:
        return 'HelpCircle';
    }
  };

  return (
<div className="overflow-x-auto">
       <Table>
         <TableHeader>
           <TableRow className="border-border/50 hover:bg-transparent h-8">
             <TableHead className="w-[200px] text-xs">客户信息</TableHead>
             <TableHead className="w-[150px] text-xs">批命日期</TableHead>
             <TableHead className="w-[200px] text-xs">AI笔记摘要</TableHead>
             <TableHead className="w-[120px] text-xs">应验状态</TableHead>
             <TableHead className="w-[100px] text-right text-xs">操作</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           {records.map((record) => (
             <TableRow key={record.recordId} className="border-border/50 hover:bg-muted/30 transition-colors h-10">
               {/* Client Info */}
               <TableCell className="p-1">
                 <div className="flex items-center space-x-2">
                   <UserAvatar
                     user={{
                       name: record.clientId,
                       avatar: record.clientAvatarUrl,
                     }}
                     size="small"
                     showHoverCard={false}
                   />
                   <div className="min-w-0">
                     <p className="font-medium text-xs truncate">{record.clientId}</p>
                     <p className="text-xs text-muted-foreground">ID: {record.recordId}</p>
                   </div>
                 </div>
               </TableCell>

               {/* Date */}
               <TableCell className="p-1">
                 <div className="flex items-center space-x-1">
                   <SafeIcon name="Calendar" className="h-3 w-3 text-muted-foreground" />
                   <span className="text-xs">{record.date}</span>
                 </div>
               </TableCell>

               {/* AI Note Preview */}
               <TableCell className="p-1">
                 <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                   {record.aiNotePreview}
                 </p>
               </TableCell>

               {/* Status */}
               <TableCell className="p-1">
                 <Badge variant="outline" className={`${getStatusColor(record.prognosisStatus)} border text-xs`}>
                   <SafeIcon name={getStatusIcon(record.prognosisStatus)} className="h-2.5 w-2.5 mr-0.5" />
                   {record.prognosisStatus}
                 </Badge>
               </TableCell>

               {/* Actions */}
               <TableCell className="text-right p-1">
                 <Button
                   variant="ghost"
                   size="sm"
                   asChild
                   className="hover:bg-primary/20 h-6 px-2"
                 >
                   <a href={`./master-record-detail.html?id=${record.recordId}`}>
                     <SafeIcon name="Eye" className="h-3 w-3 mr-0.5" />
                     <span className="text-xs">查看</span>
                   </a>
                 </Button>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
