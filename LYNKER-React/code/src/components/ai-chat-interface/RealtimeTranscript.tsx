
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

export default function RealtimeTranscript() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(true);

  // Simulate real-time transcription
  useEffect(() => {
    if (!isListening) return;

    const mockTranscripts = [
      '用户正在说话...',
      '关于我明年的财运...',
      '我想了解更多关于...',
      '命理师正在分析...',
    ];

    let index = 0;
    const interval = setInterval(() => {
      setTranscript(mockTranscripts[index % mockTranscripts.length]);
      index++;
    }, 3000);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <Card className="glass-card mx-4 mb-4 p-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon name="Mic" className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-xs font-semibold text-muted-foreground">实时字幕</span>
          </div>
          <p className="text-sm text-foreground min-h-5">
            {transcript || '等待音频输入...'}
          </p>
        </div>
        <button
          onClick={() => setIsListening(!isListening)}
          className="ml-2 p-1 hover:bg-muted rounded transition-colors"
        >
          <SafeIcon
            name={isListening ? 'MicOff' : 'Mic'}
            className="h-4 w-4 text-muted-foreground"
          />
        </button>
      </div>
    </Card>
  );
}
