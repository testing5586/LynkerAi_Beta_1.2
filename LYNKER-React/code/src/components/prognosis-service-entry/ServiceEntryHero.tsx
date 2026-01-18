
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

export default function ServiceEntryHero() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary">
            <SafeIcon name="Sparkles" className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient-mystical">
          命理服务门户
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          连接专业命理师与求知者，通过八字、紫微、占星等多维度解读您的人生轨迹。
          <br />
          <span className="text-accent font-semibold">同命相知，灵魂共鸣。</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-mystical-gradient hover:opacity-90 text-white"
            asChild
          >
            <a href="./master-list.html">
              <SafeIcon name="Users" className="mr-2 h-5 w-5" />
              浏览全部命理师
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
          >
            <a href="./home-page.html">
              <SafeIcon name="Home" className="mr-2 h-5 w-5" />
              返回首页
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <p className="text-sm text-muted-foreground">专业命理师</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">50K+</div>
            <p className="text-sm text-muted-foreground">成功咨询</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">4.8★</div>
            <p className="text-sm text-muted-foreground">平均评分</p>
          </div>
        </div>
      </div>
    </section>
  );
}
