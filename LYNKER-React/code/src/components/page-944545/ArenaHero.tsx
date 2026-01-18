
import { MOCK_ALCHEMY_HERO_IMAGE } from '@/data/group_social';
import SafeIcon from '@/components/common/SafeIcon';

export default function ArenaHero() {
  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden">
      {/* Background Image */}
      <img
        src={MOCK_ALCHEMY_HERO_IMAGE}
        alt="炼丹房"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />

{/* Content */}
       <div id="i2h0l" className="absolute inset-0 flex flex-col justify-center px-4 md:px-8">
         <div id="iyd1z" className="flex items-center gap-3 mb-4 justify-center">
           <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
             <SafeIcon name="Flame" className="h-6 w-6 text-accent" />
           </div>
           <h1 id="i9i07" className="text-4xl md:text-5xl font-bold text-gradient-mystical">
             炼丹房
           </h1>
         </div>
<div className="max-w-2xl"></div>
          <p id="iu8ar" className="text-lg text-foreground/80 mb-2 text-center">
            是结丹成功或者是炸炉了？灵友们说了算！
          </p>
 <b id="iga3rr" style={{ width: 'auto', margin: '0 0 0 300px', minWidth: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}></b>
          <p id="iegri" className="text-sm text-muted-foreground max-w-xl"></p>
          <span id="ia7ang" className="text-sm text-muted-foreground" style={{ display: 'flex', fontWeight: 400, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>在这里，我们验证来自全球命理师的预测。导入您感兴趣的内容，让社区投票验证其准确性。<br />每一个预测都值得被记录和讨论。</span>
       </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-20">
        <SafeIcon name="Sparkles" className="h-8 w-8 text-accent animate-pulse" />
      </div>
    </div>
  );
}
