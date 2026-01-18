
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  availableYears: number[];
}

export default function YearSelector({
  selectedYear,
  onYearChange,
  availableYears,
}: YearSelectorProps) {
  const sortedYears = [...availableYears].sort((a, b) => b - a);

  return (
    <Select value={selectedYear.toString()} onValueChange={(v) => onYearChange(Number(v))}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortedYears.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}年
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
