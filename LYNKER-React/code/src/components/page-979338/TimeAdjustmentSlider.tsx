
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface TimeAdjustmentSliderProps {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
}

export default function TimeAdjustmentSlider({
  hour,
  minute,
  onChange,
}: TimeAdjustmentSliderProps) {
  // Convert to total minutes for slider
  const totalMinutes = hour * 60 + minute;

  const handleSliderChange = (value: number[]) => {
    const newTotalMinutes = value[0];
    const newHour = Math.floor(newTotalMinutes / 60);
    const newMinute = newTotalMinutes % 60;
    onChange(newHour, newMinute);
  };

  const handleAdjust = (minutesDelta: number) => {
    let newMinute = minute + minutesDelta;
    let newHour = hour;

    if (newMinute < 0) {
      newHour = Math.max(0, newHour - 1);
      newMinute = 60 + newMinute;
    } else if (newMinute >= 60) {
      newHour = Math.min(23, newHour + 1);
      newMinute = newMinute - 60;
    }

    onChange(newHour, newMinute);
  };

  return (
    <div className="space-y-3">
      {/* Slider */}
      <Slider
        value={[totalMinutes]}
        onValueChange={handleSliderChange}
        min={0}
        max={1439}
        step={1}
        className="w-full"
      />

      {/* Quick Adjust Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjust(-15)}
          className="flex-1"
        >
          <SafeIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
          -15分
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjust(-5)}
          className="flex-1"
        >
          <SafeIcon name="Minus" className="h-4 w-4 mr-1" />
          -5分
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjust(5)}
          className="flex-1"
        >
          <SafeIcon name="Plus" className="h-4 w-4 mr-1" />
          +5分
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjust(15)}
          className="flex-1"
        >
          +15分
          <SafeIcon name="ChevronRight" className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Time Display */}
      <div className="text-center p-2 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">当前时辰</p>
        <p className="text-2xl font-bold text-primary">
          {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}
