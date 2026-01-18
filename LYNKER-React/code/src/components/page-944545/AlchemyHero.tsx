
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_ALCHEMY_HERO_IMAGE } from '@/data/group_social';

interface AlchemyHeroProps {
  onGenerateInvite: () => void;
}

export default function AlchemyHero({ onGenerateInvite }: AlchemyHeroProps) {
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
        <div className="mb-6 animate-pulse">
          <SafeIcon name="Flame" className="w-16 h-16 text-accent mx-auto mb-4" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gradient-mystical mb-4">
          炼丹房
        </h1>

<p id="if39v" className="text-xl text-foreground/90 mb-2 max-w-2xl" style={{ fontSize: '22px' }}>
          验证玄学，打假伪命理，众议成丹
        </p>

        <p id="if39v-2" className="text-xl text-foreground/90 mb-2 max-w-2xl" style={{ fontSize: '15px', fontWeight: '300' }}>
          是结丹成功，还是炸炉了？ 由灵友们投票说了算！
        </p>

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
      </div>
    </div>
  );
}
