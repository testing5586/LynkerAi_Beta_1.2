
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import ProphecyStats from './ProphecyStats';
import ProphecyRecordList from './ProphecyRecordList';
import ProphecyRecordForm from './ProphecyRecordForm';
import { MOCK_PROPHECY_RECORDS } from '@/data/knowledge';
import type { ProphecyRecordModel } from '@/data/knowledge';

export default function ProphecyRecordPage() {
  const [records, setRecords] = useState<ProphecyRecordModel[]>(MOCK_PROPHECY_RECORDS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ProphecyRecordModel | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | '已应验' | '未应验' | '应验中'>('all');

  const filteredRecords = filterStatus === 'all' 
    ? records 
    : records.filter(r => r.fulfillmentStatus === filterStatus);

  const handleAddRecord = (newRecord: Omit<ProphecyRecordModel, 'prophecyId'>) => {
    const record: ProphecyRecordModel = {
      ...newRecord,
      prophecyId: `pvs${Date.now()}`,
    };
    setRecords([record, ...records]);
    setIsFormOpen(false);
  };

  const handleUpdateRecord = (updatedRecord: ProphecyRecordModel) => {
    setRecords(records.map(r => r.prophecyId === updatedRecord.prophecyId ? updatedRecord : r));
    setEditingRecord(null);
    setIsFormOpen(false);
  };

  const handleDeleteRecord = (prophecyId: string) => {
    setRecords(records.filter(r => r.prophecyId !== prophecyId));
  };

  const handleEditRecord = (record: ProphecyRecordModel) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical mb-2">预言应验记录</h1>
            <p className="text-muted-foreground">
              记录和追踪您的预言应验情况，验证命理的准确性
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingRecord(null);
              setIsFormOpen(true);
            }}
            className="bg-mystical-gradient hover:opacity-90"
          >
            <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
            新增预言记录
          </Button>
        </div>

        {/* Stats */}
        <ProphecyStats records={records} />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingRecord ? '编辑预言记录' : '新增预言记录'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingRecord(null);
                }}
              >
                <SafeIcon name="X" className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <ProphecyRecordForm
                record={editingRecord}
                onSubmit={editingRecord ? handleUpdateRecord : handleAddRecord}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingRecord(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>
            全部 ({records.length})
          </TabsTrigger>
          <TabsTrigger value="已应验" onClick={() => setFilterStatus('已应验')}>
            已应验 ({records.filter(r => r.fulfillmentStatus === '已应验').length})
          </TabsTrigger>
          <TabsTrigger value="应验中" onClick={() => setFilterStatus('应验中')}>
            应验中 ({records.filter(r => r.fulfillmentStatus === '应验中').length})
          </TabsTrigger>
          <TabsTrigger value="未应验" onClick={() => setFilterStatus('未应验')}>
            未应验 ({records.filter(r => r.fulfillmentStatus === '未应验').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filterStatus === 'all' ? 'all' : filterStatus}>
          <ProphecyRecordList
            records={filteredRecords}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
        </TabsContent>
      </Tabs>

      {/* Navigation Footer */}
      <div className="mt-12 pt-8 border-t flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => window.location.href = './ai-chat-interface.html'}
        >
          <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
          返回AI聊天
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = './knowledge-base.html'}
        >
          查看知识库
          <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
