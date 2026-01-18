
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisInputModel } from '@/data/prognosis_pan';

interface TimeSlot {
  id: string;
  label: string;
  input: PrognosisInputModel;
  isSelected: boolean;
}

interface TimeManagementSidebarProps {
  timeSlots: TimeSlot[];
  selectedSlotId: string;
  onSelectSlot: (slotId: string) => void;
  onAddSlot: () => void;
  onUpdateSlot: (slotId: string, updates: Partial<TimeSlot>) => void;
}

export default function TimeManagementSidebar({
  timeSlots,
  selectedSlotId,
  onSelectSlot,
  onAddSlot,
  onUpdateSlot,
}: TimeManagementSidebarProps) {
  return (
    <Card className="glass-card sticky top-32">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">时间方案管理</CardTitle>
        <CardDescription className="text-xs">
          创建和管理最多3个出生时间方案
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-3">
        {/* Time Slots List */}
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => onSelectSlot(slot.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                slot.isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-muted hover:border-primary/50 bg-muted/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{slot.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {slot.input.birthDate}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {String(slot.input.birthTimeHour).padStart(2, '0')}:
                    {String(slot.input.birthTimeMinute).padStart(2, '0')}
                  </p>
                </div>
                {slot.isSelected && (
                  <Badge variant="default" className="bg-primary">
                    <SafeIcon name="Check" className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Add Slot Button */}
        {timeSlots.length < 3 && (
          <Button
            onClick={onAddSlot}
            variant="outline"
            className="w-full gap-2"
          >
            <SafeIcon name="Plus" className="h-4 w-4" />
            添加新方案
          </Button>
        )}

        <Separator className="my-3" />

        {/* Time Adjustment Controls */}
        {timeSlots.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">分钟微调</h4>
            <div className="space-y-2">
              {[1, 5, 10, 15].map((minutes) => (
                <Button
                  key={minutes}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    const slot = timeSlots.find((s) => s.id === selectedSlotId);
                    if (slot) {
                      const newMinute = (slot.input.birthTimeMinute + minutes) % 60;
                      onUpdateSlot(selectedSlotId, {
                        input: {
                          ...slot.input,
                          birthTimeMinute: newMinute,
                        },
                      });
                    }
                  }}
                >
                  <SafeIcon name="Plus" className="h-3 w-3 mr-1" />
                  +{minutes}分钟
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-3" />

        {/* Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-accent">💡 提示</p>
          <p className="text-xs text-muted-foreground">
            创建多个时间方案，让AI agent分析对比，找到最准确的出生时辰。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
