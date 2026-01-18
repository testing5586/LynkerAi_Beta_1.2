
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface RegionBadgeProps {
  country?: string;
  region?: string;
  climate?: string;
  culture?: string;
  size?: 'small' | 'default';
}

export default function RegionBadge({
  country,
  region,
  climate,
  culture,
  size = 'default',
}: RegionBadgeProps) {
  const sizeClasses = size === 'small' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {country && (
        <Badge variant="outline" className={sizeClasses}>
          <SafeIcon name="MapPin" className="w-3 h-3 mr-1" />
          {getCountryName(country)}
        </Badge>
      )}
      {region && (
        <Badge variant="outline" className={sizeClasses}>
          <SafeIcon name="Map" className="w-3 h-3 mr-1" />
          {region}
        </Badge>
      )}
      {climate && (
        <Badge variant="secondary" className={sizeClasses}>
          <SafeIcon name="Cloud" className="w-3 h-3 mr-1" />
          {climate}
        </Badge>
      )}
      {culture && (
        <Badge variant="secondary" className={sizeClasses}>
          <SafeIcon name="Globe" className="w-3 h-3 mr-1" />
          {culture}
        </Badge>
      )}
    </div>
  );
}

function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    CN: '中国',
    US: '美国',
    JP: '日本',
    KR: '韩国',
    TH: '泰国',
    VN: '越南',
    GB: '英国',
    FR: '法国',
    DE: '德国',
    // Add more as needed
  };
  return countries[code] || code;
}
