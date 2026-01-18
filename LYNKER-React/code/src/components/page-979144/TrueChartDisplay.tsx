
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface TrueChartDisplayProps {
  type: 'bazi' | 'ziwei';
  title: string;
  data: any;
  imageUrl: string;
}

export default function TrueChartDisplay({
  type,
  title,
  data,
  imageUrl,
}: TrueChartDisplayProps) {
  return (
    <Card className="glass-card border-primary/20 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {type === 'bazi' ? (
                <SafeIcon name="Grid3x3" className="h-5 w-5 text-primary" />
              ) : (
                <SafeIcon name="Compass" className="h-5 w-5 text-primary" />
              )}
              {title}
            </CardTitle>
            <CardDescription className="mt-1">
              {type === 'bazi' ? '四柱八字命盘' : '紫薇斗数命盘'}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            {type === 'bazi' ? '八字' : '紫薇'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Chart Image */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted/50 border border-primary/10">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>

        {/* Chart Details */}
        {type === 'bazi' ? (
          <div className="space-y-3">
            {/* Four Pillars */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-3 rounded-lg bg-muted/50 border border-primary/10 text-center">
                <div className="text-xs text-muted-foreground mb-1">年柱</div>
                <div className="font-semibold text-sm">{data.year}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-primary/10 text-center">
                <div className="text-xs text-muted-foreground mb-1">月柱</div>
                <div className="font-semibold text-sm">{data.month}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-primary/10 text-center">
                <div className="text-xs text-muted-foreground mb-1">日柱</div>
                <div className="font-semibold text-sm">{data.day}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-primary/10 text-center">
                <div className="text-xs text-muted-foreground mb-1">时柱</div>
                <div className="font-semibold text-sm">{data.hour}</div>
              </div>
            </div>

            {/* Pattern */}
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="text-xs text-muted-foreground mb-1">格局</div>
              <div className="font-semibold text-accent mb-2">{data.pattern}</div>
              <p className="text-sm text-foreground/80">{data.description}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Main Stars */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
                <div className="text-xs text-muted-foreground mb-1">主星</div>
                <div className="font-semibold text-sm">{data.mainStar}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
                <div className="text-xs text-muted-foreground mb-1">辅星</div>
                <div className="font-semibold text-sm">{data.secondaryStar}</div>
              </div>
            </div>

            {/* Palace */}
            <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
              <div className="text-xs text-muted-foreground mb-1">命宫</div>
              <div className="font-semibold text-sm">{data.palace}</div>
            </div>

            {/* Pattern */}
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="text-xs text-muted-foreground mb-1">格局</div>
              <div className="font-semibold text-accent mb-2">{data.pattern}</div>
              <p className="text-sm text-foreground/80">{data.description}</p>
            </div>

            {/* Stars List */}
            <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
              <div className="text-xs text-muted-foreground mb-2">主要星曜</div>
              <div className="flex flex-wrap gap-2">
                {data.stars.map((star: string) => (
                  <Badge key={star} variant="outline" className="text-xs">
                    {star}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
