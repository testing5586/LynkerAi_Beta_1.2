
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_SERVICES_OFFERED } from '@/data/service';

export default function ServiceOverviewSection() {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">热门服务项目</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            精选最受欢迎的命理咨询服务，满足不同需求
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {MOCK_SERVICES_OFFERED.map((service, index) => (
            <Card
              key={service.serviceId}
              className="glass-card hover:shadow-card transition-all duration-300 hover:border-primary/50 group cursor-pointer"
              onClick={() => window.location.href = `./master-list.html?service=${service.serviceId}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <span className="text-lg font-bold text-accent">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {service.type} • {service.durationMinutes}分钟
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-13">
                      {service.description}
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-4">
                    {/* Popular Badge */}
                    {service.isPopular && (
                      <Badge className="bg-accent text-accent-foreground whitespace-nowrap">
                        <SafeIcon name="Flame" className="w-3 h-3 mr-1" />
                        热门
                      </Badge>
                    )}

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        ¥{service.priceMin}
                      </div>
                      <p className="text-xs text-muted-foreground">起价</p>
                    </div>

                    {/* Arrow */}
                    <SafeIcon
                      name="ArrowRight"
                      className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-mystical-gradient hover:opacity-90"
            asChild
          >
            <a href="./master-list.html">
              浏览所有服务
              <SafeIcon name="ArrowRight" className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
