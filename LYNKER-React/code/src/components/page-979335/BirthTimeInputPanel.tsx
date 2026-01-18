
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisInputModel } from '@/data/prognosis_pan';

interface BirthTimeInputPanelProps {
  selectedSlot: {
    id: string;
    label: string;
    input: PrognosisInputModel;
    isSelected: boolean;
  } | undefined;
  onSlotChange: (slotId: string, updates: any) => void;
}

export default function BirthTimeInputPanel({
  selectedSlot,
  onSlotChange,
}: BirthTimeInputPanelProps) {
  if (!selectedSlot) return null;

  const handleTimeChange = (field: 'hour' | 'minute', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    const newInput = { ...selectedSlot.input };
    if (field === 'hour' && numValue >= 0 && numValue <= 23) {
      newInput.birthTimeHour = numValue;
    } else if (field === 'minute' && numValue >= 0 && numValue <= 59) {
      newInput.birthTimeMinute = numValue;
    }

    onSlotChange(selectedSlot.id, { input: newInput });
  };

  const handleDateChange = (value: string) => {
    onSlotChange(selectedSlot.id, {
      input: { ...selectedSlot.input, birthDate: value },
    });
  };

  const handleLocationChange = (value: string) => {
    onSlotChange(selectedSlot.id, {
      input: { ...selectedSlot.input, birthLocation: value },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">验证真命盘</h2>
        <p className="text-muted-foreground">
          通过三个AI agent的分析，找到最准确的出生时辰
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birth-date" className="text-sm font-medium">
            出生日期
          </Label>
          <Input
            id="birth-date"
            type="date"
            value={selectedSlot.input.birthDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Birth Hour */}
        <div className="space-y-2">
          <Label htmlFor="birth-hour" className="text-sm font-medium">
            出生时（小时）
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="birth-hour"
              type="number"
              min="0"
              max="23"
              value={selectedSlot.input.birthTimeHour}
              onChange={(e) => handleTimeChange('hour', e.target.value)}
              className="bg-background/50"
            />
            <span className="text-muted-foreground">时</span>
          </div>
        </div>

        {/* Birth Minute */}
        <div className="space-y-2">
          <Label htmlFor="birth-minute" className="text-sm font-medium">
            出生分（分钟）
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="birth-minute"
              type="number"
              min="0"
              max="59"
              value={selectedSlot.input.birthTimeMinute}
              onChange={(e) => handleTimeChange('minute', e.target.value)}
              className="bg-background/50"
            />
            <span className="text-muted-foreground">分</span>
          </div>
        </div>

        {/* Birth Location */}
        <div className="space-y-2">
          <Label htmlFor="birth-location" className="text-sm font-medium">
            出生地
          </Label>
          <Input
            id="birth-location"
            type="text"
            placeholder="例：中国 湖北 武汉"
            value={selectedSlot.input.birthLocation}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="bg-background/50"
          />
        </div>
      </div>

      {/* OCR Import Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">导入排盘贴图</h3>
            <p className="text-sm text-muted-foreground">
              上传不同门派的排盘贴图，系统将自动识别并提取时间信息
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <SafeIcon name="Upload" className="h-4 w-4" />
            上传贴图
          </Button>
        </div>
      </div>
    </div>
  );
}
