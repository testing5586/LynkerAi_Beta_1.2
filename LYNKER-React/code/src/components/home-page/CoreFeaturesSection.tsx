
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_CORE_FEATURES } from '@/data/navigation';

export default function CoreFeaturesSection() {
  const featureRoutes: Record<string, string> = {
    service: './prognosis-service-entry.html',
    match: './homology-match-discovery.html',
    ai_kb: './knowledge-base-main.html',
  };

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            核心功能
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            灵客AI为您提供完整的命理服务生态，从专业咨询到社交匹配，再到AI验证
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MOCK_CORE_FEATURES.map((feature) => (
            <Card
              key={feature.id}
              className="glass-card border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-card group overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-mystical-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <SafeIcon
                      name={feature.iconName}
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full border-accent/50 hover:bg-accent/10"
                    asChild
                  >
                    <a href={featureRoutes[feature.id]}>
                      了解更多
                      <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <SafeIcon name="Lightbulb" className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">为什么选择灵客AI？</h3>
              <p className="text-muted-foreground">
                我们不仅提供传统的命理咨询服务，更通过AI技术验证预言准确性，
                建立全球同命人社交网络，让您找到真正理解自己的灵魂同频者。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
