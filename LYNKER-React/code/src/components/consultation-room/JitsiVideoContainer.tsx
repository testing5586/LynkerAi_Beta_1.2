
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface JitsiVideoContainerProps {
  jitsiUrl: string;
  isCallActive: boolean;
}

export default function JitsiVideoContainer({
  jitsiUrl,
  isCallActive,
}: JitsiVideoContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCallActive || !containerRef.current) return;

    // In a real implementation, you would initialize Jitsi here
    // For now, we'll just show a placeholder
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;

    // Note: Actual Jitsi initialization would happen here
    // This is a simplified version for demonstration
  }, [isCallActive]);

  return (
    <Card className="flex-1 bg-black/50 border-primary/20 overflow-hidden relative">
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative"
        id="jitsi-container"
      >
        {/* Jitsi iframe placeholder */}
        <iframe
          src={jitsiUrl}
          className="w-full h-full border-0"
          allow="camera; microphone; display-capture"
          title="Jitsi Video Conference"
        />

        {/* Overlay info when call is not active */}
        {!isCallActive && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <SafeIcon name="PhoneOff" className="w-16 h-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">咨询已结束</h3>
            <p className="text-muted-foreground">感谢您的咨询，正在返回首页...</p>
          </div>
        )}
      </div>
    </Card>
  );
}
