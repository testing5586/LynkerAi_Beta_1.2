
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_MASTERS } from '@/data/base-mock';

export default function MasterRecommendationSection() {
  // Show top 3 masters
  const topMasters = MOCK_MASTERS.slice(0, 3);

  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">推荐命理师</h2>
            <p className="text-muted-foreground">
              平台精选的顶级命理师，拥有丰富经验和优秀口碑
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="border-primary/30 hover:bg-primary/10"
          >
            <a href="./master-list.html">
              查看全部
              <SafeIcon name="ArrowRight" className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Masters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topMasters.map((master) => (
            <Card
              key={master.masterId}
              className="glass-card group hover:shadow-card transition-all duration-300 hover:border-primary/50 overflow-hidden cursor-pointer"
              onClick={() => window.location.href = `./master-profile.html?id=${master.masterId}`}
            >
              {/* Avatar Section */}
              <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="relative">
                  <UserAvatar
                    user={{
                      name: master.alias,
                      avatar: master.avatarUrl,
                      country: master.geoTag?.country,
                      isPro: true,
                    }}
                    size="large"
                    showHoverCard={false}
                  />
                </div>
              </div>

              {/* Content */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{master.alias}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {master.realName}
                    </CardDescription>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    <SafeIcon name="Star" className="w-3 h-3 mr-1" />
                    {master.rating?.toFixed(1)}
                  </Badge>
                </div>

                {/* Expertise */}
                {master.expertise && (
                  <p className="text-xs text-muted-foreground mb-2">
                    专长：{master.expertise}
                  </p>
                )}

                {/* Region */}
                {master.geoTag && (
                  <div className="mb-2">
                    <RegionBadge
                      country={master.geoTag.flagIcon}
                      region={master.geoTag.region}
                      size="small"
                    />
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/50 rounded p-2 text-center">
                    <div className="font-semibold text-accent">{master.serviceCount}</div>
                    <div className="text-muted-foreground">咨询次数</div>
                  </div>
                  <div className="bg-muted/50 rounded p-2 text-center">
                    <div className="font-semibold text-accent">¥{master.priceMin}</div>
                    <div className="text-muted-foreground">起价</div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-mystical-gradient hover:opacity-90"
                  asChild
                >
                  <a href={`./master-profile.html?id=${master.masterId}`}>
                    查看详情
                    <SafeIcon name="ArrowRight" className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
