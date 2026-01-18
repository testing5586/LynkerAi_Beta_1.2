
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_HOME_HERO } from '@/data/navigation';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background with gradient and mystical elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Starfield effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-bounce">
          <div className="w-20 h-20 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary shadow-lg">
            <SafeIcon name="Sparkles" className="w-10 h-10 text-white" />
          </div>
        </div>

{/* Main Slogan */}
        <h1 id="iiqg6" className="text-5xl md:text-7xl font-bold text-gradient-mystical leading-tight" style={{ height: '110px', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
          灵客AI
        </h1>

        {/* Secondary Slogan */}
        <h1 id="iiqg6-2" className="text-5xl md:text-7xl font-bold text-gradient-mystical leading-tight" style={{ fontSize: '40px', margin: '0', color: 'rgba(244,244,245,0.9)' }}>
          同命相知
        </h1>

        {/* Subtitle */}
        <p id="i6qwt" className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto" style={{ fontWeight: '100' }}>
          <span id="ix0pzn" style={{
            color: 'rgb(242, 242, 242)',
            fontSize: '19.125px',
            fontStyle: 'italic',
            fontFamily: 'serif',
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            whiteSpaceCollapse: 'preserve-breaks'
          }}>在你降生之时， 天地为你凝成一段独特的频率。 它不是宿命， 而是一股等待被理解与运用的能量。 当你调和这频率， 便能与宇宙共振， 找到属于你的节奏与机缘。 科学称它为振动， 东方称它为五行， 灵性称它为阿卡西。 或许它们只是用不同语言 指向同一个未解的真相。 灵客AI 不给答案， 只邀请你一同探索—— 倾听自己的频率， 并遇见与你同频的灵魂。</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            size="lg"
            className="bg-mystical-gradient hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
            asChild
          >
            <a href="./prognosis-service-entry.html">
              <SafeIcon name="Wand2" className="mr-2 h-5 w-5" />
              开始命理咨询
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-6 text-lg"
            asChild
          >
            <a href="./homology-match-discovery.html">
              <SafeIcon name="Users" className="mr-2 h-5 w-5" />
              发现同命人
            </a>
          </Button>
        </div>

{/* Hero Image */}
         <div className="w-full max-w-4xl mx-auto">
           <div className="relative rounded-2xl overflow-hidden glass-card border border-accent/20 shadow-card">
           </div>
         </div>

{/* Scroll Indicator */}
        <div className="mt-12 animate-bounce">
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
