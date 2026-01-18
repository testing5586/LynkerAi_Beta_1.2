
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import ModerationQueueList from '@/components/post-moderation-queue/ModerationQueueList';
import { moderationQueueMock } from '@/components/post-moderation-queue/mock';

type ContentType = 'all' | 'post' | 'article';
type Status = 'all' | 'pending' | 'approved' | 'rejected';

export default function ModerationQueuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState<ContentType>('all');
  const [status, setStatus] = useState<Status>('pending');
  const [items, setItems] = useState(moderationQueueMock);

  // Filter items based on search and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = contentType === 'all' || item.type === contentType;
    const matchesStatus = status === 'all' || item.status === status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === 'pending').length,
    approved: items.filter((i) => i.status === 'approved').length,
    rejected: items.filter((i) => i.status === 'rejected').length,
  };

  const handleApprove = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    );
  };

  const handleReject = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: 'rejected' as const } : item
      )
    );
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">内容审核队列</h1>
            <p className="text-muted-foreground">
              管理和审核用户发布的帖子和文章，确保社区内容的健康与安全
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="flex items-center space-x-2"
          >
            <a href="./forum-homepage.html">
              <SafeIcon name="ArrowLeft" className="h-4 w-4" />
              <span>返回论坛首页</span>
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">总计</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">待审核</div>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">已批准</div>
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">已拒绝</div>
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-lg mb-8">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <SafeIcon
              name="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="搜索标题或作者..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">审核状态</label>
              <Tabs value={status} onValueChange={(v) => setStatus(v as Status)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="pending">待审核</TabsTrigger>
                  <TabsTrigger value="approved">已批准</TabsTrigger>
                  <TabsTrigger value="rejected">已拒绝</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">内容类型</label>
              <Tabs value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="post">用户帖子</TabsTrigger>
                  <TabsTrigger value="article">命理师文章</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Content List */}
      {filteredItems.length > 0 ? (
        <ModerationQueueList
          items={filteredItems}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ) : (
        <div className="glass-card p-12 rounded-lg text-center">
          <SafeIcon
            name="CheckCircle"
            className="h-12 w-12 text-muted-foreground mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">没有待审核内容</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? '没有找到匹配的内容，请尝试其他搜索条件'
              : '所有内容都已审核完毕'}
          </p>
        </div>
      )}
    </div>
  );
}
