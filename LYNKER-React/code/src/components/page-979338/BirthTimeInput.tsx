
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface BirthTimeInputProps {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
}

export default function BirthTimeInput({ hour, minute, onChange }: BirthTimeInputProps) {
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
    onChange(value, minute);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    onChange(hour, value);
  };

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Clock" className="h-5 w-5 text-primary" />
          出生时辰
        </CardTitle>
        <CardDescription>
          输入您的出生时间（24小时制），系统将为您生成三个不同时辰的命盘进行对比分析
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Label htmlFor="birth-hour" className="text-sm font-medium mb-2 block">
              时（Hour）
            </Label>
            <div className="relative">
              <Input
                id="birth-hour"
                type="number"
                min="0"
                max="23"
                value={String(hour).padStart(2, '0')}
                onChange={handleHourChange}
                className="text-center text-lg font-semibold"
                placeholder="00"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                时
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary">:</div>

          <div className="flex-1">
            <Label htmlFor="birth-minute" className="text-sm font-medium mb-2 block">
              分（Minute）
            </Label>
            <div className="relative">
              <Input
                id="birth-minute"
                type="number"
                min="0"
                max="59"
                value={String(minute).padStart(2, '0')}
                onChange={handleMinuteChange}
                className="text-center text-lg font-semibold"
                placeholder="00"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                分
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary">
            {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
          </div>
        </div>

        {/* Time Explanation */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <SafeIcon name="Info" className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              请输入您的出生时间。如果不确定具体分钟，可以先输入整点时间，然后在下方三列中进行微调。
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
