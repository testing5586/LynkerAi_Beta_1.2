
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import EmptyState from '@/components/common/EmptyState';
import { MOCK_USER_RECORDS } from '@/data/knowledge';
import type { KnowledgeRecordSummaryModel } from '@/data/knowledge';

export default function UserPrognosisRecordList() {
  const [records] = useState<KnowledgeRecordSummaryModel[]>(MOCK_USER_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc'>('date-desc');

  // Filter and sort records
  const filteredRecords = records
    .filter((record) => {
      const matchesSearch =
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.masterAlias.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || record.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'date-desc' ? dateB - dateA : dateA - dateB;
    });

  const recordTypes = ['八字', '紫微', '占星'];

  const handleViewDetail = (recordId: string) => {
    window.location.href = `./user-record-detail.html?id=${recordId}`;
  };

  const handleBackToKnowledgeBase = () => {
    window.location.href = './knowledge-base-main.html';
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
<h1 className="text-3xl font-bold text-gradient-mystical mb-2">我的批命咨询记录</h1>
            <p className="text-muted-foreground">
              查看您的历史咨询笔记和视频片段，深入了解每次预测的关键信息。
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleBackToKnowledgeBase}
            className="flex items-center space-x-2"
          >
            <SafeIcon name="ArrowLeft" className="h-4 w-4" />
            <span>返回知识库</span>
          </Button>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-card p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <SafeIcon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
              <Input
                placeholder="搜索记录标题或命理师..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="筛选类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                {recordTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">最新优先</SelectItem>
                <SelectItem value="date-asc">最早优先</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            找到 <span className="font-semibold text-foreground">{filteredRecords.length}</span> 条记录
          </div>
        </div>
      </div>

      {/* Records List */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          variant="no-records"
          title="暂无预测记录"
          description="您还没有任何预测记录。点击下方按钮开始您的命理咨询之旅。"
          actionLabel="开始咨询"
          actionHref="./prognosis-service-entry.html"
        />
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <PrognosisRecordCard
              key={record.recordId}
              record={record}
              onViewDetail={() => handleViewDetail(record.recordId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface PrognosisRecordCardProps {
  record: KnowledgeRecordSummaryModel;
  onViewDetail: () => void;
}

function PrognosisRecordCard({ record, onViewDetail }: PrognosisRecordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '八字':
        return 'BarChart3';
      case '紫微':
        return 'Star';
      case '占星':
        return 'Compass';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '八字':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case '紫微':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case '占星':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Card className="glass-card hover:shadow-card transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${getTypeColor(record.type)}`}>
                <SafeIcon name={getTypeIcon(record.type)} className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{record.title}</CardTitle>
                <CardDescription className="text-xs mt-1">
                  {formatDate(record.date)} • 命理师：{record.masterAlias}
                </CardDescription>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={getTypeColor(record.type)}>
            {record.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thumbnail and Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thumbnail */}
          <div className="md:col-span-1">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 group cursor-pointer">
              <img
                src={record.thumbnailUrl}
                alt={record.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <SafeIcon name="Play" className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="md:col-span-2 space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">AI生成摘要</h4>
              <p className="text-sm text-foreground/80 line-clamp-3">
                {record.userNotesPreview}
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/50 rounded p-2">
                <span className="text-muted-foreground">咨询日期</span>
                <p className="font-semibold text-foreground">{formatDate(record.date)}</p>
              </div>
              <div className="bg-muted/50 rounded p-2">
                <span className="text-muted-foreground">命理师</span>
                <p className="font-semibold text-foreground truncate">{record.masterAlias}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-4 border-t space-y-3 animate-in fade-in">
            <div>
              <h4 className="text-sm font-semibold mb-2">完整笔记预览</h4>
              <p className="text-sm text-muted-foreground bg-muted/30 rounded p-3 max-h-32 overflow-y-auto">
                {record.userNotesPreview}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <SafeIcon name="Video" className="h-4 w-4" />
              <a
                href={record.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                查看完整视频记录
              </a>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            <SafeIcon
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              className="h-4 w-4 mr-1"
            />
            {isExpanded ? '收起' : '展开'}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = record.videoLink}
              className="flex items-center space-x-1"
            >
              <SafeIcon name="Video" className="h-4 w-4" />
              <span>视频</span>
            </Button>
            <Button
              size="sm"
              className="bg-mystical-gradient hover:opacity-90"
              onClick={onViewDetail}
            >
              <SafeIcon name="ChevronRight" className="h-4 w-4 mr-1" />
              查看详情
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
