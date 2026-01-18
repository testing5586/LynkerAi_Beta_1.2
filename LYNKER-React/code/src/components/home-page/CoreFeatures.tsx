
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_CORE_FEATURES } from '@/data/navigation';

export default function CoreFeatures() {
  const featureRoutes: Record<string, string> = {
    service: './prognosis-service-entry.html',
    match: './homology-match-discovery.html',
    ai_kb: './knowledge-base-main.html',
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            核心功能模块
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            灵客AI整合命理、AI与社交，为您提供完整的命运探索体验
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {MOCK_CORE_FEATURES.map((feature, index) => (
            <Card
              key={feature.id}
              className="glass-card group hover:border-primary/50 transition-all duration-300 hover:shadow-card overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Content */}
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-mystical-gradient flex items-center justify-center glow-primary">
                    <SafeIcon name={feature.iconName} className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {index + 1}
                  </span>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  className="w-full bg-mystical-gradient hover:opacity-90"
                  asChild
                >
                  <a href={featureRoutes[feature.id]}>
                    <span>立即体验</span>
                    <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-colors" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            还没有账户？立即加入灵客AI社区
          </p>
          <Button
            size="lg"
            className="bg-gold-gradient hover:opacity-90 text-background font-semibold"
            asChild
          >
<a href="./registration-type-selection.html">
              <SafeIcon name="UserPlus" className="mr-2 h-5 w-5" />
              免费注册
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
