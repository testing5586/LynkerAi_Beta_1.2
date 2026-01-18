
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { PrognosisQuickViewModel } from '@/data/social_feed';

interface PrognesisPanelProps {
  data: PrognosisQuickViewModel;
}

export default function PrognosisPanel({ data }: PrognesisPanelProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">我的命盘</h3>
        {data.isVerified && (
          <Badge className="bg-green-600 text-white text-xs">
            <SafeIcon name="CheckCircle" className="w-3 h-3 mr-1" />
            已验证
          </Badge>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        与已验证真命盘实时同步
      </p>

 {/* Two Square Boards */}
      <div className="grid grid-cols-1 gap-3">
        {/* Bazi Board */}
        <Card className={`glass-card p-4 rounded-lg overflow-hidden flex flex-col justify-between ${!isUnlocked ? 'blur-sm' : ''}`}>
          <div>
            <h4 className="text-xs font-semibold text-accent mb-2">八字</h4>
            <p className="text-xs text-foreground/80 leading-relaxed line-clamp-4">
              {data.baziSummary}
            </p>
          </div>
          <div className="text-xs text-muted-foreground text-center mt-2">
            <SafeIcon name="Calendar" className="w-4 h-4 mx-auto opacity-50" />
          </div>
        </Card>

        {/* Ziwei Board */}
 <Card className={`glass-card p-4 rounded-lg overflow-hidden flex flex-col justify-between ${!isUnlocked ? 'blur-sm' : ''}`}>
          <div>
            <h4 className="text-xs font-semibold text-accent mb-2">紫微</h4>
            <p className="text-xs text-foreground/80 leading-relaxed line-clamp-4">
              {data.ziweiSummary}
            </p>
          </div>
          <div className="text-xs text-muted-foreground text-center mt-2">
            <SafeIcon name="Star" className="w-4 h-4 mx-auto opacity-50" />
          </div>
        </Card>
      </div>

      {/* Unlock Button */}
      {!isUnlocked && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setIsUnlocked(true)}
        >
          <SafeIcon name="Lock" className="h-3 w-3 mr-2" />
          解锁命盘
        </Button>
      )}

      {isUnlocked && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setIsUnlocked(false)}
        >
          <SafeIcon name="LockOpen" className="h-3 w-3 mr-2" />
          隐藏命盘
        </Button>
      )}
    </div>
  );
}
