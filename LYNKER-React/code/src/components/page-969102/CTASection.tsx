
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

export default function CTASection() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <Card className="glass-card border-accent/50 overflow-hidden relative">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-12 md:p-16 text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary animate-pulse">
                <SafeIcon name="Sparkles" className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
              准备好开启您的命理之旅了吗？
            </h2>

            {/* Description */}
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              加入数万名用户，通过灵客AI发现真正理解自己的同命人，获得专业命理师的指导，验证命运规律。
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-2">
                <SafeIcon name="Shield" className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">隐私保护</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <SafeIcon name="Zap" className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">AI验证</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <SafeIcon name="Users" className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">社交生态</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-mystical-gradient hover:opacity-90 text-white px-8 py-6 text-lg font-semibold glow-primary"
                asChild
              >
                <a href="./registration-type-selection.html">
                  <SafeIcon name="UserPlus" className="mr-2 h-5 w-5" />
                  立即注册
                </a>
              </Button>
<Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold"
                asChild
              >
                <a href="./registration-type-selection.html" id="i0yb64">
                  <SafeIcon name="Wand2" className="mr-2 h-5 w-5" />
                  浏览服务
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full border-2 border-accent/20 opacity-50 -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full border-2 border-primary/20 opacity-50 -ml-16 -mb-16" />
        </Card>

        {/* FAQ Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border/50 bg-muted/30 backdrop-blur-sm">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <SafeIcon name="HelpCircle" className="w-5 h-5 text-accent" />
              <span>我是普通用户</span>
            </h3>
            <p className="text-sm text-foreground/80 mb-4">
              使用假名注册，探索命理，发现同命人，获得专业咨询。
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="./user-registration-form.html">
                用户注册
              </a>
            </Button>
          </div>

          <div className="p-6 rounded-lg border border-border/50 bg-muted/30 backdrop-blur-sm">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <SafeIcon name="Crown" className="w-5 h-5 text-accent" />
              <span>我是命理师</span>
            </h3>
            <p className="text-sm text-foreground/80 mb-4">
              实名认证，建立工作室，提供专业服务，扩展客户群体。
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="./master-registration-form.html">
                命理师注册
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
