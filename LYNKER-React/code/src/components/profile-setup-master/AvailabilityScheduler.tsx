
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import SafeIcon from '@/components/common/SafeIcon';

interface TimeSlot {
  start: string;
  end: string;
  enabled: boolean;
}

interface AvailabilitySchedulerProps {
  availability: Record<string, TimeSlot>;
  onAvailabilityChange: (day: string, data: TimeSlot) => void;
}

const DAYS = [
  { key: 'monday', label: '周一' },
  { key: 'tuesday', label: '周二' },
  { key: 'wednesday', label: '周三' },
  { key: 'thursday', label: '周四' },
  { key: 'friday', label: '周五' },
  { key: 'saturday', label: '周六' },
  { key: 'sunday', label: '周日' },
];

export default function AvailabilityScheduler({
  availability,
  onAvailabilityChange,
}: AvailabilitySchedulerProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <SafeIcon name="Calendar" className="w-5 h-5" />
          <span>预约时段设置</span>
        </CardTitle>
        <CardDescription>设置您每周的可预约时间</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DAYS.map((day) => {
            const slot = availability[day.key];
            return (
              <div
                key={day.key}
                className="p-4 rounded-lg border border-muted hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <Label className="font-semibold text-base">{day.label}</Label>
                  <Switch
                    checked={slot.enabled}
                    onCheckedChange={(checked) =>
                      onAvailabilityChange(day.key, {
                        ...slot,
                        enabled: checked,
                      })
                    }
                  />
                </div>

                {slot.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${day.key}-start`} className="text-sm">
                        开始时间
                      </Label>
                      <Input
                        id={`${day.key}-start`}
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          onAvailabilityChange(day.key, {
                            ...slot,
                            start: e.target.value,
                          })
                        }
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${day.key}-end`} className="text-sm">
                        结束时间
                      </Label>
                      <Input
                        id={`${day.key}-end`}
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          onAvailabilityChange(day.key, {
                            ...slot,
                            end: e.target.value,
                          })
                        }
                        className="h-9"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
