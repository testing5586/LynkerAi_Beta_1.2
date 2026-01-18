
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_MASTERS } from '@/data/base-mock';
import type { ProphecyRecordModel } from '@/data/knowledge';

interface ProphecyRecordFormProps {
  record?: ProphecyRecordModel | null;
  onSubmit: (record: ProphecyRecordModel | Omit<ProphecyRecordModel, 'prophecyId'>) => void;
  onCancel: () => void;
}

export default function ProphecyRecordForm({
  record,
  onSubmit,
  onCancel,
}: ProphecyRecordFormProps) {
  const [formData, setFormData] = useState({
    prophecySummary: record?.prophecySummary || '',
    sourceMaster: record?.sourceMaster || MOCK_MASTERS[0].realName,
    dateRecorded: record?.dateRecorded || new Date().toISOString().split('T')[0],
    dateExpected: record?.dateExpected || '',
    fulfillmentStatus: record?.fulfillmentStatus || ('应验中' as const),
    userReflection: record?.userReflection || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.prophecySummary.trim()) {
      newErrors.prophecySummary = '预言内容不能为空';
    }
    if (!formData.sourceMaster.trim()) {
      newErrors.sourceMaster = '请选择预言来源';
    }
    if (!formData.dateRecorded) {
      newErrors.dateRecorded = '请选择记录日期';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = record
      ? {
          ...record,
          ...formData,
        }
      : formData;

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prophecy Summary */}
      <div className="space-y-2">
        <Label htmlFor="prophecySummary" className="text-base font-semibold">
          预言内容 <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="prophecySummary"
          placeholder="请输入预言的具体内容，例如：2025年3月会遇到贵人，带来新的工作机会"
          value={formData.prophecySummary}
          onChange={(e) => setFormData({ ...formData, prophecySummary: e.target.value })}
          className="min-h-24 resize-none"
        />
        {errors.prophecySummary && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="h-4 w-4" />
            {errors.prophecySummary}
          </p>
        )}
      </div>

      {/* Source Master */}
      <div className="space-y-2">
        <Label htmlFor="sourceMaster" className="text-base font-semibold">
          预言来源 <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.sourceMaster} onValueChange={(value) => setFormData({ ...formData, sourceMaster: value })}>
          <SelectTrigger id="sourceMaster">
            <SelectValue placeholder="选择命理师" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_MASTERS.map((master) => (
              <SelectItem key={master.masterId} value={master.realName}>
                {master.realName} ({master.expertise})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.sourceMaster && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="h-4 w-4" />
            {errors.sourceMaster}
          </p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateRecorded" className="text-base font-semibold">
            记录日期 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateRecorded"
            type="date"
            value={formData.dateRecorded}
            onChange={(e) => setFormData({ ...formData, dateRecorded: e.target.value })}
          />
          {errors.dateRecorded && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="h-4 w-4" />
              {errors.dateRecorded}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateExpected" className="text-base font-semibold">
            预期应验日期
          </Label>
          <Input
            id="dateExpected"
            type="date"
            value={formData.dateExpected}
            onChange={(e) => setFormData({ ...formData, dateExpected: e.target.value })}
            placeholder="如果预言没有具体时间，可留空"
          />
        </div>
      </div>

      {/* Fulfillment Status */}
      <div className="space-y-2">
        <Label htmlFor="fulfillmentStatus" className="text-base font-semibold">
          应验状态
        </Label>
        <Select value={formData.fulfillmentStatus} onValueChange={(value) => setFormData({ ...formData, fulfillmentStatus: value as any })}>
          <SelectTrigger id="fulfillmentStatus">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="已应验">
              <div className="flex items-center gap-2">
                <SafeIcon name="CheckCircle" className="h-4 w-4 text-green-400" />
                已应验
              </div>
            </SelectItem>
            <SelectItem value="应验中">
              <div className="flex items-center gap-2">
                <SafeIcon name="Clock" className="h-4 w-4 text-yellow-400" />
                应验中
              </div>
            </SelectItem>
            <SelectItem value="未应验">
              <div className="flex items-center gap-2">
                <SafeIcon name="XCircle" className="h-4 w-4 text-red-400" />
                未应验
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Reflection */}
      <div className="space-y-2">
        <Label htmlFor="userReflection" className="text-base font-semibold">
          我的反思
        </Label>
        <Textarea
          id="userReflection"
          placeholder="记录您对这个预言的想法、观察或反思。例如：预言完全应验，命理师的分析非常准确..."
          value={formData.userReflection}
          onChange={(e) => setFormData({ ...formData, userReflection: e.target.value })}
          className="min-h-20 resize-none"
        />
        <p className="text-xs text-muted-foreground">
          这些反思将帮助您更好地理解命理规律和AI的预测准确性
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" className="bg-mystical-gradient hover:opacity-90">
          <SafeIcon name="Save" className="mr-2 h-4 w-4" />
          {record ? '更新记录' : '创建记录'}
        </Button>
      </div>
    </form>
  );
}
