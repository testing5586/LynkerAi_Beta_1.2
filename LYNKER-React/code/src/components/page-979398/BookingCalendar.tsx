
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface Booking {
  id: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface BookingCalendarProps {
  bookings: Booking[];
}

export default function BookingCalendar({ bookings }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const bookingDates = useMemo(() => {
    return new Set(
      bookings
        .filter((b) => b.status !== 'cancelled')
        .map((b) => b.date)
    );
  }, [bookings]);

  const monthName = currentDate.toLocaleDateString('zh-CN', {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const days = [];
  const totalDays = daysInMonth(currentDate);
  const firstDay = firstDayOfMonth(currentDate);

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= totalDays; i++) {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({
      day: i,
      dateStr,
      hasBooking: bookingDates.has(dateStr),
    });
  }

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className="h-8 w-8 p-0"
        >
          <SafeIcon name="ChevronLeft" className="h-4 w-4" />
        </Button>
        <h3 className="text-sm font-semibold text-center flex-1">{monthName}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="h-8 w-8 p-0"
        >
          <SafeIcon name="ChevronRight" className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center rounded text-xs font-medium transition-all ${
              day === null
                ? 'bg-transparent'
                : day.hasBooking
                  ? 'bg-primary text-primary-foreground cursor-pointer hover:shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {day && day.day}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2 pt-4 border-t">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-muted-foreground">有预约</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded bg-muted" />
          <span className="text-muted-foreground">无预约</span>
        </div>
      </div>
    </div>
  );
}
