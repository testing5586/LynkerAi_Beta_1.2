
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/common/UserAvatar';
import SafeIcon from '@/components/common/SafeIcon';
import type { MasterProfileModel } from '@/data/user';

interface ConsultationHeaderProps {
  master: MasterProfileModel;
  elapsedTime: string;
  isCallActive: boolean;
  isRecording?: boolean;
  recordingTime?: number;
}

export default function ConsultationHeader({
  master,
  elapsedTime,
  isCallActive,
  isRecording = false,
  recordingTime = 0,
}: ConsultationHeaderProps) {
  
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <Card className="border-b border-primary/20 bg-card/50 backdrop-blur-sm m-4 mt-0 p-4">
      <div className="flex items-center justify-between">
        {/* Left: Master Info */}
        <div className="flex items-center gap-4">
          <UserAvatar
            user={{
              name: master.alias,
              avatar: master.avatarUrl,
              country: master.geoTag.country,
              isPro: true,
            }}
            size="default"
            showHoverCard={false}
          />
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              {master.alias}
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                <SafeIcon name="Star" className="w-3 h-3 mr-1" />
                {master.rating.toFixed(1)}
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">{master.expertise}</p>
          </div>
        </div>

        {/* Center: Service Info */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">服务类型</p>
            <p className="font-semibold text-sm">八字终身运势精批</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">通话时长</p>
            <p className="font-mono font-semibold text-sm flex items-center gap-1">
              {isCallActive && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
              {elapsedTime}
            </p>
          </div>
</div>

{/* Right: Recording Status */}
         {isRecording && (
           <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-destructive/20 border border-destructive/40">
             <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
             <span className="text-xs font-medium text-destructive">录影中</span>
             <span className="text-xs text-destructive font-mono">{formatRecordingTime(recordingTime)}</span>
           </div>
         )}
      </div>
    </Card>
  );
}
