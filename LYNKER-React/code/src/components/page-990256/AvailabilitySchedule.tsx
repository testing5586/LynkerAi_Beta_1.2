
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SafeIcon from '@/components/common/SafeIcon';

interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AvailabilityScheduleProps {
  initialSchedule: ScheduleItem[];
}

export default function AvailabilitySchedule({ initialSchedule }: AvailabilityScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);

  const handleToggleDay = (index: number) => {
    const updated = [...schedule];
    updated[index].isAvailable = !updated[index].isAvailable;
    setSchedule(updated);
  };

  const handleTimeChange = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const handleSetAllDays = (isAvailable: boolean) => {
    setSchedule(
      schedule.map((item) => ({
        ...item,
        isAvailable,
      }))
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>可用时间表</CardTitle>
            <CardDescription>
              设置您每周的可用咨询时间
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSetAllDays(true)}
            >
              <SafeIcon name="Check" className="h-4 w-4 mr-1" />
              全部启用
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSetAllDays(false)}
            >
              <SafeIcon name="X" className="h-4 w-4 mr-1" />
              全部禁用
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日期</TableHead>
                <TableHead>启用</TableHead>
                <TableHead>开始时间</TableHead>
                <TableHead>结束时间</TableHead>
                <TableHead>时长</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item, index) => {
                const [startHour, startMin] = item.startTime.split(':').map(Number);
                const [endHour, endMin] = item.endTime.split(':').map(Number);
                const duration =
                  (endHour * 60 + endMin) - (startHour * 60 + startMin);
                const hours = Math.floor(duration / 60);
                const mins = duration % 60;

                return (
                  <TableRow key={item.day}>
                    <TableCell className="font-medium">{item.day}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.isAvailable}
                        onCheckedChange={() => handleToggleDay(index)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={item.startTime}
                        onChange={(e) =>
                          handleTimeChange(index, 'startTime', e.target.value)
                        }
                        disabled={!item.isAvailable}
                        className="w-32 bg-muted/50"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={item.endTime}
                        onChange={(e) =>
                          handleTimeChange(index, 'endTime', e.target.value)
                        }
                        disabled={!item.isAvailable}
                        className="w-32 bg-muted/50"
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.isAvailable ? (
                        <>
                          {hours}小时{mins > 0 ? `${mins}分` : ''}
                        </>
                      ) : (
                        '不可用'
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-muted-foreground/20">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>提示：</strong>
              </p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>启用的时间段内，客户可以预约您的咨询服务</li>
                <li>时间表将实时同步到您的公开档案</li>
                <li>建议至少预留15分钟的缓冲时间</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
