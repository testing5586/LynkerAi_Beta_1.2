
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export default function YearSelector({
  years,
  selectedYear,
  onYearChange,
}: YearSelectorProps) {
  return (
    <Card className="glass-card border-primary/20 p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <SafeIcon name="Calendar" className="h-5 w-5 text-accent" />
          <span className="font-semibold">选择年份</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? 'default' : 'outline'}
              size="sm"
              onClick={() => onYearChange(year)}
              className={selectedYear === year ? 'bg-mystical-gradient' : ''}
            >
              {year}年
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
