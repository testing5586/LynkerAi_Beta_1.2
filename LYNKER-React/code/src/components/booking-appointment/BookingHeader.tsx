
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import type { MasterSummaryModel } from '@/data/user';
import type { ServiceOfferedModel } from '@/data/service';

interface BookingHeaderProps {
  master: MasterSummaryModel;
  service: ServiceOfferedModel;
}

export default function BookingHeader({ master, service }: BookingHeaderProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-6 p-6">
          {/* Master Avatar */}
          <div className="flex-shrink-0">
            <UserAvatar
              user={{
                name: master.alias,
                avatar: master.avatarUrl,
                country: master.geoTag.country,
                isPro: true,
              }}
              size="large"
              showHoverCard={false}
            />
          </div>

          {/* Master Info */}
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold">{master.alias}</h2>
                <Badge className="bg-accent text-accent-foreground">
                  <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                  Pro命理师
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{master.realName}</p>
            </div>

            {/* Rating & Stats */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      name="Star"
                      className={`w-4 h-4 ${
                        i < Math.floor(master.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{master.rating}</span>
              </div>
              <span className="text-muted-foreground">
                {master.serviceCount}次咨询
              </span>
            </div>

            {/* Location & Expertise */}
            <div className="space-y-2">
              <RegionBadge
                country={master.geoTag.country}
                region={master.geoTag.region}
                size="small"
              />
              <div className="flex flex-wrap gap-2">
                {master.expertise.split(',').map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-xs">
                    {exp.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="flex-shrink-0 bg-muted/50 rounded-lg p-4 space-y-3 sm:min-w-[200px]">
            <div>
              <p className="text-xs text-muted-foreground mb-1">选择的服务</p>
              <p className="font-semibold text-sm">{service.name}</p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground mb-1">咨询时长</p>
              <p className="font-semibold text-sm flex items-center space-x-1">
                <SafeIcon name="Clock" className="w-4 h-4" />
                <span>{service.durationMinutes}分钟</span>
              </p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground mb-1">咨询费用</p>
              <p className="text-lg font-bold text-accent">¥{service.priceMin}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
