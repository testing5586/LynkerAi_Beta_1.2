
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { Badge } from '@/components/ui/badge';

interface BookingCalendarProps {
  appointments: any[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export default function BookingCalendar({
  appointments,
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get appointment dates
  const appointmentDates = useMemo(() => {
    return appointments.map((apt) => apt.selectedDateTime.split(' ')[0]);
  }, [appointments]);

  // Calendar generation
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days = [];
  const firstDay = firstDayOfMonth(currentMonth);
  const totalDays = daysInMonth(currentMonth);

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= totalDays; i++) {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({
      day: i,
      dateStr,
      hasAppointment: appointmentDates.includes(dateStr),
    });
  }

  const monthName = currentMonth.toLocaleDateString('zh-CN', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <Card className="glass-card sticky top-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">预约日历</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevMonth}
            className="h-8 w-8 p-0"
          >
            <SafeIcon name="ChevronLeft" className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold">{monthName}</span>
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
        <div className="grid grid-cols-7 gap-1 text-center">
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className="text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const isSelected = selectedDate === day.dateStr;
            const isToday = new Date().toISOString().split('T')[0] === day.dateStr;

            return (
              <button
                key={day.dateStr}
                onClick={() => onSelectDate(isSelected ? null : day.dateStr)}
                className={`aspect-square rounded-lg text-xs font-medium transition-all relative flex items-center justify-center ${
                  isSelected
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                    : isToday
                      ? 'bg-accent/20 text-accent border border-accent/50'
                      : day.hasAppointment
                        ? 'bg-muted/50 text-foreground hover:bg-muted'
                        : 'text-muted-foreground hover:bg-muted/30'
                }`}
              >
                {day.day}
                {day.hasAppointment && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-border/30 space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">有预约</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-accent/20 border border-accent/50" />
            <span className="text-muted-foreground">今天</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-border/30 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">本月预约：</span>
            <Badge variant="secondary">{appointmentDates.length}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
