
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import SafeIcon from '@/components/common/SafeIcon';
import MasterRecordSidebar from './MasterRecordSidebar';
import AccuracyCharts from './AccuracyCharts';
import RecordListTable from './RecordListTable';
import RecordFilters from './RecordFilters';
import { MOCK_MASTER_RECORDS } from '@/data/knowledge';

export default function MasterRecordContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | '待验证' | '应验中' | '已验证'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter records based on search and status
  const filteredRecords = MOCK_MASTER_RECORDS.filter((record) => {
    const matchesSearch = 
      record.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recordId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || record.prognosisStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    const statusOrder = { '已验证': 0, '应验中': 1, '待验证': 2 };
    return statusOrder[a.prognosisStatus] - statusOrder[b.prognosisStatus];
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    total: MOCK_MASTER_RECORDS.length,
    verified: MOCK_MASTER_RECORDS.filter(r => r.prognosisStatus === '已验证').length,
    verifying: MOCK_MASTER_RECORDS.filter(r => r.prognosisStatus === '应验中').length,
    pending: MOCK_MASTER_RECORDS.filter(r => r.prognosisStatus === '待验证').length,
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <MasterRecordSidebar />

{/* Main Content */}
<div className="flex-1 overflow-auto">
<div className="container max-w-7xl mx-auto px-4 py-1 space-y-1">
            {/* Header */}
            <div className="space-y-0.5">
             <div className="flex items-center justify-between">
               <div>
<h1 id="idibt3" className="text-2xl font-bold text-gradient-mystical">预言批命记录</h1>
                 <p className="text-muted-foreground text-sm">管理和追踪所有客户的批命记录与应验情况</p>
               </div>
               <Button asChild className="bg-mystical-gradient hover:opacity-90 h-8 px-3 text-xs">
                 <a href="./knowledge-base-main.html">
                   <SafeIcon name="ArrowLeft" className="mr-1.5 h-3.5 w-3.5" />
                   返回知识库
                 </a>
               </Button>
             </div>
           </div>

{/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-1">
<Card className="glass-card">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-xs font-medium text-muted-foreground">总记录数</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1.5 pt-0">
                  <div className="text-2xl font-bold text-gradient-mystical">{stats.total}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">所有批命记录</p>
                </CardContent>
              </Card>
 
  <Card className="glass-card border-green-500/30">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-xs font-medium text-green-400">已验证</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1.5 pt-0">
                  <div className="text-2xl font-bold text-green-400">{stats.verified}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">应验率: {stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0}%</p>
                </CardContent>
              </Card>
 
  <Card className="glass-card border-yellow-500/30">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-xs font-medium text-yellow-400">应验中</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1.5 pt-0">
                  <div className="text-2xl font-bold text-yellow-400">{stats.verifying}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">持续追踪中</p>
                </CardContent>
              </Card>
 
  <Card className="glass-card border-blue-500/30">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-xs font-medium text-blue-400">待验证</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1.5 pt-0">
                  <div className="text-2xl font-bold text-blue-400">{stats.pending}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">等待反馈</p>
                </CardContent>
              </Card>
          </div>

{/* Charts Section */}
             <Tabs defaultValue="accuracy" className="w-full -mx-4 px-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="accuracy" className="text-xs">命中率分析</TabsTrigger>
                <TabsTrigger value="trends" className="text-xs">趋势预测</TabsTrigger>
              </TabsList>
 
              <TabsContent value="accuracy" className="space-y-0.5 mt-1">
                <Card className="glass-card">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm">过往命中率曲线</CardTitle>
                    <CardDescription className="text-xs">最近12个月的批命应验情况统计</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                   <AccuracyCharts variant="historical" />
                 </CardContent>
              </Card>
            </TabsContent>

<TabsContent value="trends" className="space-y-0.5 mt-1">
                <Card className="glass-card">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm">预测未来命中率</CardTitle>
                    <CardDescription className="text-xs">基于历史数据的AI预测趋势</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                   <AccuracyCharts variant="predicted" />
                 </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

{/* Records Section */}
            <Card className="glass-card">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm">批命记录列表</CardTitle>
                <CardDescription className="text-xs">点击记录查看详细信息</CardDescription>
              </CardHeader>
<CardContent className="space-y-1 p-2 pt-0">
{/* Filters */}
               <RecordFilters
                 searchQuery={searchQuery}
                 onSearchChange={setSearchQuery}
                 filterStatus={filterStatus}
                 onFilterChange={setFilterStatus}
                 sortBy={sortBy}
                 onSortChange={setSortBy}
                 onResetPagination={() => setCurrentPage(1)}
               />

{/* Table */}
                {sortedRecords.length > 0 ? (
                  <RecordListTable records={paginatedRecords} />
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon name="FileText" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">没有找到匹配的记录</p>
                  </div>
                )}
                
                {/* Pagination */}
                {sortedRecords.length > 0 && (
                  <div className="flex justify-end pt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
