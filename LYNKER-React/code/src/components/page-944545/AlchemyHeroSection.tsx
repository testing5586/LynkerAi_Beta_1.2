
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_ALCHEMY_HERO_IMAGE } from '@/data/group_social';

interface AlchemyHeroSectionProps {
  onGenerateInvite: () => void;
}

export default function AlchemyHeroSection({ onGenerateInvite }: AlchemyHeroSectionProps) {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${MOCK_ALCHEMY_HERO_IMAGE}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 relative">
          <div className="w-20 h-20 rounded-full bg-mystical-gradient flex items-center justify-center glow-primary animate-pulse">
            <SafeIcon name="Flame" className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gradient-mystical mb-4">
          炼丹房
        </h1>

        <p className="text-lg text-foreground/80 mb-2 max-w-2xl">
          验证命理预言的真伪，让大众投票判断准确性
        </p>

        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          从小红书、抖音、B站、YouTube导入命理师内容，社区投票验证，结丹成功或炸炉一目了然！
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-mystical-gradient hover:opacity-90 text-white"
            onClick={onGenerateInvite}
          >
            <SafeIcon name="Plus" className="mr-2 h-5 w-5" />
            生成邀请函
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.href = './forum-homepage.html'}
          >
            <SafeIcon name="ArrowRight" className="mr-2 h-5 w-5" />
            返回论坛
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 flex gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-accent">1,234</div>
            <div className="text-sm text-muted-foreground">已验证内容</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">5,678</div>
            <div className="text-sm text-muted-foreground">社区投票</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">89%</div>
            <div className="text-sm text-muted-foreground">准确率</div>
          </div>
        </div>
      </div>
    </div>
  );
}
