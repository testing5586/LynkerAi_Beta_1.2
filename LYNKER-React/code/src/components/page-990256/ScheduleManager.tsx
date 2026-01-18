
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface Schedule {
  [key: string]: {
    available: boolean;
    slots: string[];
  };
}

interface ScheduleManagerProps {
  schedule: Schedule;
  onScheduleChange: (schedule: Schedule) => void;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: '周一', abbr: '一' },
  { key: 'tuesday', label: '周二', abbr: '二' },
  { key: 'wednesday', label: '周三', abbr: '三' },
  { key: 'thursday', label: '周四', abbr: '四' },
  { key: 'friday', label: '周五', abbr: '五' },
  { key: 'saturday', label: '周六', abbr: '六' },
  { key: 'sunday', label: '周日', abbr: '日' },
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

export default function ScheduleManager({
  schedule,
  onScheduleChange,
}: ScheduleManagerProps) {
  const handleToggleDay = (dayKey: string) => {
    onScheduleChange({
      ...schedule,
      [dayKey]: {
        ...schedule[dayKey],
        available: !schedule[dayKey].available,
      },
    });
  };

  const handleToggleSlot = (dayKey: string, slot: string) => {
    const currentSlots = schedule[dayKey].slots || [];
    const newSlots = currentSlots.includes(slot)
      ? currentSlots.filter((s) => s !== slot)
      : [...currentSlots, slot].sort();

    onScheduleChange({
      ...schedule,
      [dayKey]: {
        ...schedule[dayKey],
        slots: newSlots,
      },
    });
  };

  const handleSelectAllSlots = (dayKey: string) => {
    onScheduleChange({
      ...schedule,
      [dayKey]: {
        ...schedule[dayKey],
        slots: TIME_SLOTS,
      },
    });
  };

  const handleClearSlots = (dayKey: string) => {
    onScheduleChange({
      ...schedule,
      [dayKey]: {
        ...schedule[dayKey],
        slots: [],
      },
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>可用时间表</CardTitle>
        <CardDescription>
          设置您每周的可用咨询时间
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {DAYS_OF_WEEK.map((day) => {
          const dayData = schedule[day.key];
          const isAvailable = dayData?.available || false;
          const slots = dayData?.slots || [];

          return (
            <div key={day.key} className="space-y-3">
              {/* Day Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`day-${day.key}`}
                    checked={isAvailable}
                    onCheckedChange={() => handleToggleDay(day.key)}
                  />
                  <Label
                    htmlFor={`day-${day.key}`}
                    className="font-semibold cursor-pointer"
                  >
                    {day.label}
                  </Label>
                  {isAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      {slots.length} 个时段
                    </Badge>
                  )}
                </div>

                {isAvailable && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelectAllSlots(day.key)}
                      className="text-xs"
                    >
                      全选
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleClearSlots(day.key)}
                      className="text-xs"
                    >
                      清空
                    </Button>
                  </div>
                )}
              </div>

              {/* Time Slots */}
              {isAvailable && (
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pl-8">
                  {TIME_SLOTS.map((slot) => (
                    <Button
                      key={slot}
                      size="sm"
                      variant={slots.includes(slot) ? 'default' : 'outline'}
                      className={`text-xs ${
                        slots.includes(slot)
                          ? 'bg-mystical-gradient hover:opacity-90'
                          : ''
                      }`}
                      onClick={() => handleToggleSlot(day.key, slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              )}

              <Separator className="mt-4" />
            </div>
          );
        })}

        {/* Summary */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30">
          <div className="flex items-start gap-3">
            <SafeIcon name="Info" className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="text-sm space-y-1">
              <p className="font-semibold">时间表提示</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>选择您每周可用的咨询时间</li>
                <li>客户将根据您的时间表进行预约</li>
                <li>您可以随时修改时间表</li>
                <li>建议至少设置3-4个可用时段</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
