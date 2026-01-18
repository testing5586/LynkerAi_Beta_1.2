import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';
import type { TimeSlotModel } from '@/data/appointment';

interface DateTimeSelectorProps {
  timeSlots: TimeSlotModel[];
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function DateTimeSelector({
  timeSlots,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: DateTimeSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedDate) {
      return new Date(selectedDate + 'T00:00:00');
    }
    return new Date();
  });

  const currentSlots = timeSlots.find((slot) => slot.date === selectedDate);

  // Generate calendar days for the current month
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const formatDateString = (year: number, month: number, day: number): string => {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  const isDateAvailable = (dateStr: string): boolean => {
    const slot = timeSlots.find((s) => s.date === dateStr);
    return slot ? slot.slots.some((s) => s.isAvailable) : false;
  };

  const formatDateDisplay = (dateStr: string): string => {
    const date = new Date(dateStr + 'T00:00:00');
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const dayName = days[date.getDay()];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日 ${dayName}`;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const calendarDays = generateCalendarDays(currentMonth);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

return (
    <div className="space-y-6">
      {/* Calendar View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center space-x-2">
            <SafeIcon name="Calendar" className="w-4 h-4" />
            <span>选择日期</span>
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevMonth}
              className="h-8 w-8 p-0"
            >
              <SafeIcon name="ChevronLeft" className="w-4 h-4" />
            </Button>
            <span className="text-sm font-semibold min-w-32 text-center">
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 w-8 p-0"
            >
              <SafeIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="glass-card p-4">
          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isSelected = selectedDate === dateStr;
              const isToday = 
                day === new Date().getDate() &&
                currentMonth.getMonth() === new Date().getMonth() &&
                currentMonth.getFullYear() === new Date().getFullYear();

              return (
                <Button
                  key={`day-${day}`}
                  variant={isSelected ? 'default' : 'outline'}
                  className={`h-auto aspect-square flex items-center justify-center text-sm transition-all ${
                    isSelected ? 'bg-primary text-primary-foreground' : ''
                  } ${
                    isToday && !isSelected ? 'border-primary border-2' : ''
                  }`}
                  onClick={() => {
                    onDateSelect(dateStr);
                  }}
                >
                  <span className="font-semibold">{day}</span>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Time Selection */}
      {selectedDate && currentSlots && (
        <div>
          <h3 className="font-semibold flex items-center space-x-2 mb-4">
            <SafeIcon name="Clock" className="w-4 h-4" />
            <span>选择时间</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currentSlots.slots.map((slot) => {
              const isSelected = selectedTime === slot.time;

              return (
                <Button
                  key={slot.time}
                  className={`py-3 transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : slot.isAvailable
                      ? 'border border-border bg-card text-foreground hover:bg-muted'
                      : 'border border-border/50 bg-muted/30 text-muted-foreground opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (slot.isAvailable) {
                      onTimeSelect(slot.time);
                    }
                  }}
                  disabled={!slot.isAvailable}
                  variant={isSelected ? 'default' : 'outline'}
                >
                  <span className="font-semibold">{slot.time}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            选定时间：<span className="font-semibold text-foreground">{formatDateDisplay(selectedDate)} {selectedTime}</span>
          </p>
        </div>
      )}
    </div>
  );
}