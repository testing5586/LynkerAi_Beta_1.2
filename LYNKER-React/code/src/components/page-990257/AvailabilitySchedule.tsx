
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  const [schedule, setSchedule] = useState(initialSchedule);
  const [breakTime, setBreakTime] = useState('12:00-13:00');

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newSchedule = [...schedule];
    newSchedule[index] = {
      ...newSchedule[index],
      [field]: value,
    };
    setSchedule(newSchedule);
  };

  const handleAvailabilityToggle = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isAvailable = !newSchedule[index].isAvailable;
    setSchedule(newSchedule);
  };

  const handleApplyToAll = (day: ScheduleItem) => {
    const newSchedule = schedule.map(item => ({
      ...item,
      startTime: day.startTime,
      endTime: day.endTime,
      isAvailable: day.isAvailable,
    }));
    setSchedule(newSchedule);
  };

  const getAvailableDays = () => {
    return schedule.filter(s => s.isAvailable).length;
  };

  const getTotalHours = () => {
    return schedule.reduce((total, item) => {
      if (!item.isAvailable) return total;
      const [startH, startM] = item.startTime.split(':').map(Number);
      const [endH, endM] = item.endTime.split(':').map(Number);
      const hours = (endH + endM / 60) - (startH + startM / 60);
      return total + hours;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">可用工作日</p>
              <p className="text-3xl font-bold text-accent">{getAvailableDays()}</p>
              <p className="text-xs text-muted-foreground mt-1">/ 7 天</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">周均工作时长</p>
              <p className="text-3xl font-bold text-primary">{getTotalHours().toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">小时</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">午餐休息时间</p>
              <Input
                type="text"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
                placeholder="例：12:00-13:00"
                className="bg-muted/50 text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                系统将自动在此时间段内禁止预约
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Calendar" className="h-5 w-5" />
            每周工作时间表
          </CardTitle>
          <CardDescription>设置您每天的可用咨询时间</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div key={item.day} className="p-4 bg-muted/30 rounded-lg border border-muted">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16">
                      <p className="font-semibold text-sm">{item.day}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.isAvailable}
                        onCheckedChange={() => handleAvailabilityToggle(index)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.isAvailable ? '营业' : '休息'}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleApplyToAll(item)}
                    className="text-xs gap-1"
                  >
                    <SafeIcon name="Copy" className="h-3 w-3" />
                    应用到全周
                  </Button>
                </div>

                {item.isAvailable && (
                  <div className="flex items-center gap-4 ml-20">
                    <div className="flex-1 flex items-center gap-2">
                      <Label htmlFor={`start-${index}`} className="text-xs w-12">
                        开始
                      </Label>
                      <Input
                        id={`start-${index}`}
                        type="time"
                        value={item.startTime}
                        onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                        className="bg-background/50 text-sm w-24"
                      />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <Label htmlFor={`end-${index}`} className="text-xs w-12">
                        结束
                      </Label>
                      <Input
                        id={`end-${index}`}
                        type="time"
                        value={item.endTime}
                        onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                        className="bg-background/50 text-sm w-24"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <SafeIcon name="AlertCircle" className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-500 text-sm">
          <p className="font-semibold mb-1">时间表说明</p>
          <ul className="list-disc list-inside space-y-0.5 text-xs">
            <li>修改时间表不会影响已确认的预约</li>
            <li>客户只能在您设定的可用时间内预约</li>
            <li>建议预留足够的时间用于咨询和记录</li>
            <li>系统会自动扣除午餐休息时间</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Recommended Schedule */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent" />
            推荐工作时间
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 工作日：09:00-18:00（中间休息1小时）</p>
          <p>• 周末：10:00-17:00（可选）</p>
          <p>• 每次咨询预留15分钟缓冲时间</p>
          <p>• 建议每周至少营业5天以获得更多客户</p>
        </CardContent>
      </Card>
    </div>
  );
}
