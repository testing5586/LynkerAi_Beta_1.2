
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const COUNTRIES = [
  { code: 'CN', name: '中国' },
  { code: 'US', name: '美国' },
  { code: 'JP', name: '日本' },
  { code: 'KR', name: '韩国' },
  { code: 'TH', name: '泰国' },
  { code: 'VN', name: '越南' },
  { code: 'GB', name: '英国' },
  { code: 'FR', name: '法国' },
  { code: 'DE', name: '德国' },
  { code: 'IT', name: '意大利' },
  { code: 'ES', name: '西班牙' },
  { code: 'CA', name: '加拿大' },
  { code: 'AU', name: '澳大利亚' },
  { code: 'SG', name: '新加坡' },
  { code: 'MY', name: '马来西亚' },
  { code: 'PH', name: '菲律宾' },
  { code: 'ID', name: '印度尼西亚' },
  { code: 'IN', name: '印度' },
  { code: 'BR', name: '巴西' },
  { code: 'MX', name: '墨西哥' },
];

export default function CountrySelector({
  value,
  onChange,
  error,
}: CountrySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={error ? 'border-destructive' : ''}>
        <SelectValue placeholder="选择您的国籍" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
