
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface ConsultationActionsProps {
  isCallActive: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isRecording?: boolean;
  recordingTime?: number;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onViewNotes: () => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
}

export default function ConsultationActions({
  isCallActive,
  isMuted,
  isVideoOff,
  isRecording = false,
  recordingTime = 0,
  onToggleMute,
  onToggleVideo,
  onEndCall,
  onViewNotes,
  onStartRecording,
  onStopRecording,
}: ConsultationActionsProps) {
  return (
    <Card className="border-t border-primary/20 bg-card/50 backdrop-blur-sm m-4 mb-0 p-4">
      <div className="flex items-center justify-between">
{/* Left: Media Controls */}
         <div className="flex items-center gap-2">
           <Button
             variant={isMuted ? 'destructive' : 'outline'}
             size="icon"
             onClick={onToggleMute}
             disabled={!isCallActive}
             title={isMuted ? '取消静音' : '静音'}
           >
             <SafeIcon
               name={isMuted ? 'MicOff' : 'Mic'}
               className="w-5 h-5"
             />
           </Button>
           <Button
             variant={isVideoOff ? 'destructive' : 'outline'}
             size="icon"
             onClick={onToggleVideo}
             disabled={!isCallActive}
             title={isVideoOff ? '打开摄像头' : '关闭摄像头'}
           >
             <SafeIcon
               name={isVideoOff ? 'VideoOff' : 'Video'}
               className="w-5 h-5"
             />
           </Button>
           <Button
             variant="outline"
             size="icon"
             onClick={onViewNotes}
             disabled={!isCallActive}
             title="查看笔记"
           >
             <SafeIcon name="FileText" className="w-5 h-5" />
           </Button>
           <Button
             variant={isRecording ? 'destructive' : 'outline'}
             size="icon"
             onClick={isRecording ? onStopRecording : onStartRecording}
             disabled={!isCallActive}
             title={isRecording ? '停止录影' : '开始录影'}
           >
             <SafeIcon
               name={isRecording ? 'Square' : 'Circle'}
               className="w-5 h-5"
             />
           </Button>
         </div>

        {/* Center: Status */}
        <div className="flex items-center gap-2">
          {isCallActive && (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">通话中</span>
            </>
          )}
        </div>

        {/* Right: End Call */}
        <Button
          variant="destructive"
          onClick={onEndCall}
          className="gap-2"
        >
          <SafeIcon name="PhoneOff" className="w-4 h-4" />
          {isCallActive ? '结束咨询' : '返回'}
        </Button>
      </div>
    </Card>
  );
}
