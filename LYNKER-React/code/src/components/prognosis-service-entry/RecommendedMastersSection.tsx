
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_MASTERS } from '@/data/base-mock';

export default function RecommendedMastersSection() {
  // Show top 3 masters
  const recommendedMasters = MOCK_MASTERS.slice(0, 3);

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient-mystical">推荐命理师</span>
            </h2>
            <p className="text-muted-foreground">
              平台认证的专业命理师，为您提供精准的命运指引
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = './master-list.html'}
            className="hidden sm:flex border-primary/30 hover:bg-primary/10"
          >
            查看全部
            <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Masters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recommendedMasters.map((master) => (
            <Card
              key={master.masterId}
              className="glass-card group hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => window.location.href = `./master-profile.html?id=${master.masterId}`}
            >
              {/* Avatar Section */}
              <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <Avatar className="h-24 w-24 ring-4 ring-background">
                  <AvatarImage src={master.avatarUrl} alt={master.alias} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {master.alias.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Content */}
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CardTitle className="text-lg">{master.alias}</CardTitle>
                  <SafeIcon name="BadgeCheck" className="h-4 w-4 text-accent" />
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  {master.realName}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Expertise */}
                {master.expertise && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">专长领域</p>
                    <div className="flex flex-wrap gap-1">
                      {master.expertise.split(',').map((exp) => (
                        <Badge key={exp} variant="secondary" className="text-xs">
                          {exp.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <SafeIcon name="Star" className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold">{master.rating?.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({master.serviceCount} 次服务)
                    </span>
                  </div>
                </div>

                {/* Region */}
                {master.geoTag && (
                  <RegionBadge
                    country={master.geoTag.flagIcon}
                    region={master.geoTag.region}
                    size="small"
                  />
                )}

                {/* Price */}
                {master.priceMin && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm">
                      <span className="text-muted-foreground">起价</span>
                      <span className="ml-2 font-semibold text-accent">
                        ¥{master.priceMin}
                      </span>
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  className="w-full bg-mystical-gradient hover:opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `./master-profile.html?id=${master.masterId}`;
                  }}
                >
                  查看详情
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden">
          <Button
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/10"
            onClick={() => window.location.href = './master-list.html'}
          >
            查看全部命理师
            <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
