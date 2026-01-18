
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface BirthTimeInfoProps {
  birthTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    timezone: string;
  };
}

export default function BirthTimeInfo({ birthTime }: BirthTimeInfoProps) {
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}年${String(month).padStart(2, '0')}月${String(day).padStart(2, '0')}日`;
  };

  const formatTime = (hour: number, minute: number) => {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const getChineseZodiac = (year: number) => {
    const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    return zodiacs[(year - 1900) % 12];
  };

  const getHourName = (hour: number) => {
    const hours: Record<number, string> = {
      0: '子时',
      2: '丑时',
      4: '寅时',
      6: '卯时',
      8: '辰时',
      10: '巳时',
      12: '午时',
      14: '未时',
      16: '申时',
      18: '酉时',
      20: '戌时',
      22: '亥时',
    };
    
    // Find the closest hour
    const keys = Object.keys(hours).map(Number).sort((a, b) => a - b);
    let closestHour = keys[0];
    for (const key of keys) {
      if (hour >= key) {
        closestHour = key;
      }
    }
    return hours[closestHour] || '未知';
  };

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Clock" className="h-5 w-5 text-primary" />
          出生时辰信息
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date */}
          <div className="p-4 rounded-lg bg-muted/50 border border-primary/10">
            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <SafeIcon name="Calendar" className="h-3 w-3" />
              出生日期
            </div>
            <div className="font-semibold text-sm mb-1">
              {formatDate(birthTime.year, birthTime.month, birthTime.day)}
            </div>
            <div className="text-xs text-muted-foreground">
              {getChineseZodiac(birthTime.year)}年生
            </div>
          </div>

          {/* Time */}
          <div className="p-4 rounded-lg bg-muted/50 border border-primary/10">
            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <SafeIcon name="Clock" className="h-3 w-3" />
              出生时刻
            </div>
            <div className="font-semibold text-sm mb-1">
              {formatTime(birthTime.hour, birthTime.minute)}
            </div>
            <div className="text-xs text-muted-foreground">
              {getHourName(birthTime.hour)}
            </div>
          </div>

          {/* Timezone */}
          <div className="p-4 rounded-lg bg-muted/50 border border-primary/10">
            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <SafeIcon name="Globe" className="h-3 w-3" />
              时区
            </div>
            <div className="font-semibold text-sm">
              {birthTime.timezone}
            </div>
            <div className="text-xs text-muted-foreground">
              中国标准时间
            </div>
          </div>

          {/* Age */}
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <SafeIcon name="Sparkles" className="h-3 w-3" />
              当前年龄
            </div>
            <div className="font-semibold text-sm text-accent">
              {new Date().getFullYear() - birthTime.year}岁
            </div>
            <div className="text-xs text-muted-foreground">
              虚岁 {new Date().getFullYear() - birthTime.year + 1}
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-blue-400 flex items-start gap-2">
            <SafeIcon name="Info" className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              出生时辰的准确性直接影响命盘的准确度。如果您不确定确切的出生时间，建议前往"验证真命盘"页面进行多时辰对比验证。
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
