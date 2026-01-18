
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface TimePickerProps {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
}

export default function TimePicker({ hour, minute, onChange }: TimePickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHourChange = (delta: number) => {
    const newHour = (hour + delta + 24) % 24;
    onChange(newHour, minute);
  };

  const handleMinuteChange = (delta: number) => {
    const newMinute = (minute + delta + 60) % 60;
    onChange(hour, newMinute);
  };

  const formatTime = (h: number, m: number) => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {/* Time Display */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
        <div className="text-2xl font-mono font-bold text-primary">
          {formatTime(hour, minute)}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SafeIcon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} className="h-4 w-4" />
        </Button>
      </div>

      {/* Expanded Controls */}
      {isExpanded && (
        <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/50">
          {/* Hour Control */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">小时</label>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleHourChange(-1)}
              >
                <SafeIcon name="Minus" className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-12 text-center">
                {String(hour).padStart(2, '0')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleHourChange(1)}
              >
                <SafeIcon name="Plus" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Minute Control */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">分钟</label>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMinuteChange(-5)}
              >
                <SafeIcon name="Minus" className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-12 text-center">
                {String(minute).padStart(2, '0')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMinuteChange(5)}
              >
                <SafeIcon name="Plus" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
