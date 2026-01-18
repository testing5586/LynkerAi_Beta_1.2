
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import UserBatchRecordChart from '@/components/page-944726/UserBatchRecordChart';
import BatchRecordList from '@/components/page-944726/BatchRecordList';
import { MOCK_MULTI_MASTER_CURVES } from '@/data/prognosis_chart';
import { MOCK_MASTER_RECORDS } from '@/data/knowledge';

export default function BatchRecordContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMaster, setFilterMaster] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter records based on search and filters
  const filteredRecords = MOCK_MASTER_RECORDS.filter((record) => {
    const matchesSearch =
      record.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recordId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMaster = filterMaster === 'all' || record.recordId.includes(filterMaster);
    const matchesStatus = filterStatus === 'all' || record.prognosisStatus === filterStatus;

    return matchesSearch && matchesMaster && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-auto">
      <div className="container px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient-mystical">批命记录视图</h1>
          <p className="text-muted-foreground">
            查看您被多个命理师批命的历史记录，对比不同命理师的预测结果
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart" className="flex items-center space-x-2">
              <SafeIcon name="BarChart3" className="h-4 w-4" />
              <span>运势对比图</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2">
              <SafeIcon name="FileText" className="h-4 w-4" />
              <span>批命记录列表</span>
            </TabsTrigger>
          </TabsList>

          {/* Chart Tab */}
          <TabsContent value="chart" className="space-y-6">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent" />
                  <span>多年流年运势对比曲线</span>
                </CardTitle>
                <CardDescription>
                  不同颜色的曲线代表不同命理师的预测，实时同步更新
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserBatchRecordChart data={MOCK_MULTI_MASTER_CURVES} />
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">曲线说明</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_MULTI_MASTER_CURVES.curves.map((curve) => (
                    <div key={curve.sourceId} className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: curve.color }}
                      />
                      <div>
                        <p className="text-sm font-semibold">{curve.sourceName}</p>
                        <p className="text-xs text-muted-foreground">
                          {curve.data.length}年数据
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            {/* Filters */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">筛选和搜索</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">搜索</label>
                    <div className="relative">
                      <SafeIcon
                        name="Search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      />
                      <Input
                        placeholder="搜索客户或记录ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Filter by Master */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">命理师</label>
                    <Select value={filterMaster} onValueChange={setFilterMaster}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择命理师" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部命理师</SelectItem>
                        <SelectItem value="master_001">玄真子</SelectItem>
                        <SelectItem value="master_002">星辰引路人</SelectItem>
                        <SelectItem value="master_003">紫微天机</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Filter by Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">验证状态</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="已验证">已验证</SelectItem>
                        <SelectItem value="应验中">应验中</SelectItem>
                        <SelectItem value="待验证">待验证</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Records List */}
            <BatchRecordList records={filteredRecords} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
