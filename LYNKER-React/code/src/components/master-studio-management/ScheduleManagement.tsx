
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_TIME_SLOTS } from '@/data/appointment';

interface ScheduleManagementProps {
  onSave: () => Promise<void>;
}

export default function ScheduleManagement({ onSave }: ScheduleManagementProps) {
  const [timeSlots, setTimeSlots] = useState(MOCK_TIME_SLOTS);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const defaultTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleToggleSlot = (dateIndex: number, slotIndex: number) => {
    const newSlots = [...timeSlots];
    newSlots[dateIndex].slots[slotIndex].isAvailable = !newSlots[dateIndex].slots[slotIndex].isAvailable;
    setTimeSlots(newSlots);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Weekly Schedule */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>每周日程</CardTitle>
          <CardDescription>设置您每周的可用时间段</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weekDays.map((day, dayIndex) => (
              <div key={day} className="space-y-2">
                <Label className="font-semibold">{day}</Label>
                <div className="grid grid-cols-4 gap-2">
                  {defaultTimes.map((time) => (
                    <button
                      key={`${day}-${time}`}
                      className="px-3 py-2 rounded-md border border-border hover:bg-card transition-colors text-sm font-medium"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specific Dates */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>特定日期时间段</CardTitle>
          <CardDescription>管理特定日期的可用时间</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSlots.map((slot, dateIndex) => (
              <div key={slot.date} className="space-y-3 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <SafeIcon name="Calendar" className="h-4 w-4" />
                    <span>{slot.date}</span>
                  </h4>
                  <Badge variant="outline">
                    {slot.slots.filter(s => s.isAvailable).length}/{slot.slots.length} 可用
                  </Badge>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {slot.slots.map((timeSlot, slotIndex) => (
                    <button
                      key={`${slot.date}-${timeSlot.time}`}
                      onClick={() => handleToggleSlot(dateIndex, slotIndex)}
                      className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                        timeSlot.isAvailable
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {timeSlot.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Break Times */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>休息时间</CardTitle>
          <CardDescription>设置您的休息日期和时间</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>休息日期</Label>
              <div className="flex flex-wrap gap-2">
                {['2025-11-15', '2025-11-22', '2025-11-29'].map((date) => (
                  <Badge key={date} variant="secondary" className="px-3 py-1.5">
                    {date}
                    <button className="ml-2 hover:text-destructive">
                      <SafeIcon name="X" className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
                添加休息日期
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => window.location.href = './master-backend-overview.html'}
        >
          取消
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-mystical-gradient hover:opacity-90"
        >
          {isSaving ? (
            <>
              <SafeIcon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="mr-2 h-4 w-4" />
              保存日程
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
