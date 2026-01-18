
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_SERVICE_TYPES } from '@/data/service';

export default function ServiceTypeGrid() {
  return (
    <section id="i8h54" className="py-16 px-4">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient-mystical">命理服务体系</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            灵客AI整合了东方传统命理与现代科学验证，为您提供多维度的命运分析
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MOCK_SERVICE_TYPES.map((service) => (
            <Card
              key={service.id}
              className="glass-card group hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => window.location.href = `./master-list.html?type=${service.id}`}
            >
              {/* Background Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Content */}
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <SafeIcon name={service.iconName} className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>

                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10 group-hover:border-primary/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `./master-list.html?type=${service.id}`;
                  }}
                >
                  查看专家
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-card/50 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-muted-foreground">
            <SafeIcon name="Info" className="inline h-4 w-4 mr-2" />
            所有命理师均经过平台认证，提供专业、安全的咨询服务
          </p>
        </div>
      </div>
    </section>
  );
}
