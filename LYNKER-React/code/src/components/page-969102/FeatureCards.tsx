
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_CORE_FEATURES } from '@/data/navigation';

export default function FeatureCards() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            核心功能模块
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            灵客AI为您提供完整的命理服务生态，从专业咨询到社交互动，一站式满足您的需求
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CORE_FEATURES.map((feature, index) => (
            <Card
              key={feature.id}
              className="glass-card hover:shadow-card transition-all duration-300 hover:scale-105 group overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-mystical-gradient flex items-center justify-center mb-4 glow-primary">
                    <SafeIcon name={feature.iconName} className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
<CardContent>
                   <Button
                     variant="outline"
                     className="w-full group/btn"
                     asChild
                   >
                     <a href={getFeatureLink(feature.id)} id={getFeatureId(feature.id)}>
                       <span>了解更多</span>
                       <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                     </a>
                   </Button>
                 </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm">
          <div className="flex items-start space-x-4">
            <SafeIcon name="Lightbulb" className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">为什么选择灵客AI？</h3>
              <ul className="space-y-2 text-foreground/80">
<li className="flex items-center space-x-2">
                   <SafeIcon name="Check" className="w-4 h-4 text-accent" />
                   <span id="ignh9j">Pro命理师认证，专业可信</span>
                 </li>
                <li className="flex items-center space-x-2">
                  <SafeIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>AI技术验证预言应验，科学严谨</span>
                </li>
                <li className="flex items-center space-x-2">
                  <SafeIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>同命社交生态，找到灵魂同频者</span>
                </li>
                <li className="flex items-center space-x-2">
                  <SafeIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>隐私保护机制，安全匿名交互</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getFeatureLink(featureId: string): string {
  const links: Record<string, string> = {
    service: './registration-type-selection.html',
    match: './registration-type-selection.html',
    ai_kb: './registration-type-selection.html',
  };
  return links[featureId] || './home-page.html';
}

function getFeatureId(featureId: string): string | undefined {
  const ids: Record<string, string> = {
    service: 'i2cj1b',
    match: 'i173es',
    ai_kb: 'ivi6us',
  };
  return ids[featureId];
}
