import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import { MOCK_MASTER_RECORDS } from '@/data/knowledge';
import type { MasterRecordSummaryModel } from '@/data/knowledge';

export default function CustomerRecordsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');

  // Mock records data
  const records: MasterRecordSummaryModel[] = MOCK_MASTER_RECORDS;

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let filtered = records;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (record) =>
          record.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.aiNotePreview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((record) => record.prognosisStatus === statusFilter);
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'status':
        sorted.sort((a, b) => a.prognosisStatus.localeCompare(b.prognosisStatus));
        break;
      default:
        break;
    }

    return sorted;
  }, [searchQuery, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已验证':
        return 'bg-green-500/20 text-green-700 border-green-500/30';
      case '应验中':
        return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case '待验证':
        return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已验证':
        return 'CheckCircle2';
      case '应验中':
        return 'Clock';
      case '待验证':
        return 'AlertCircle';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 space-y-4">
{/* Header */}
        <div>
          <h1 id="iiy66r" className="text-2xl font-bold mb-1">客户批命记录总览</h1>
          <p className="text-xs text-muted-foreground">
            管理和查看所有客户的批命记录，追踪预测应验情况
          </p>
</div>

        {/* Filters and Search */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">筛选和搜索</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Search */}
              <div className="relative">
                <SafeIcon
                  name="Search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input
                  placeholder="搜索客户名称或笔记..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="按状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="已验证">已验证</SelectItem>
                  <SelectItem value="应验中">应验中</SelectItem>
                  <SelectItem value="待验证">待验证</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">最新优先</SelectItem>
                  <SelectItem value="date-asc">最早优先</SelectItem>
                  <SelectItem value="status">按状态排序</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">批命记录列表</CardTitle>
            <CardDescription className="text-xs">
              共 {filteredRecords.length} 条记录
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {filteredRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <SafeIcon name="FileText" className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="text-sm font-semibold mb-1">暂无记录</h3>
                <p className="text-xs text-muted-foreground">
                  没有找到匹配的批命记录
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-muted-foreground/20 h-8">
                      <TableHead className="w-10 px-2 py-1">客户</TableHead>
                      <TableHead className="px-2 py-1">客户名称</TableHead>
                      <TableHead className="px-2 py-1">批命日期</TableHead>
                      <TableHead className="px-2 py-1">预测摘要</TableHead>
                      <TableHead className="px-2 py-1">应验状态</TableHead>
                      <TableHead className="text-right px-2 py-1">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow
                        key={record.recordId}
                        className="border-muted-foreground/10 hover:bg-muted/50 transition-colors h-9"
                      >
                        <TableCell className="px-2 py-1">
                          <UserAvatar
                            user={{
                              name: record.clientId,
                              avatar: record.clientAvatarUrl,
                            }}
                            size="small"
                            showHoverCard={false}
                          />
                        </TableCell>
                        <TableCell className="font-medium text-xs px-2 py-1">{record.clientId}</TableCell>
                        <TableCell className="text-xs text-muted-foreground px-2 py-1">
                          {new Date(record.date).toLocaleDateString('zh-CN')}
                        </TableCell>
                        <TableCell className="max-w-xs px-2 py-1">
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {record.aiNotePreview}
                          </p>
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(record.prognosisStatus)} text-xs`}
                          >
                            <SafeIcon
                              name={getStatusIcon(record.prognosisStatus)}
                              className="h-2.5 w-2.5 mr-0.5"
                            />
                            {record.prognosisStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-2 py-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="hover:bg-primary/20 h-6 px-2 text-xs"
                          >
                            <a href="./master-record-detail.html">
                              <SafeIcon name="Eye" className="h-3 w-3 mr-0.5" />
                              查看
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination Info */}
        {filteredRecords.length > 0 && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>显示 {filteredRecords.length} 条记录</p>
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm" disabled className="h-7 px-2">
                <SafeIcon name="ChevronLeft" className="h-3 w-3" />
              </Button>
              <span className="px-1 text-xs">1 / 1</span>
              <Button variant="outline" size="sm" disabled className="h-7 px-2">
                <SafeIcon name="ChevronRight" className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}