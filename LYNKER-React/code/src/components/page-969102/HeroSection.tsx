
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_PAGE_969102_HERO } from '@/data/ui_content';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={MOCK_PAGE_969102_HERO.imageUrl}
          alt="Mystical Eastern and Western Astrology"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
{/* Mystical Symbol */}
        <div className="mb-8 animate-pulse"></div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-mystical leading-tight">
          {MOCK_PAGE_969102_HERO.title}
        </h1>

{/* Subtitle */}
        <p id="iypa7" className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl leading-relaxed">
          {MOCK_PAGE_969102_HERO.description}
        </p>

{/* Slogan */}
        <div className="mb-12 inline-block"></div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Button
            size="lg"
            className="bg-mystical-gradient hover:opacity-90 text-white px-8 py-6 text-lg font-semibold glow-primary"
            asChild
          >
            <a href="./registration-type-selection.html" id="imhem">
              <SafeIcon name="Zap" className="mr-2 h-5 w-5" />
              开始探索
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg font-semibold"
            asChild
          >
            <a href="./registration-type-selection.html" id="iyrvw">
              <SafeIcon name="Wand2" className="mr-2 h-5 w-5" />
              命理服务
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <SafeIcon name="ChevronDown" className="w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-primary/20 opacity-50 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-2 border-accent/20 opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}
