
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIChatMessageModel } from '@/data/ai_settings';

interface RealtimeSubtitlesProps {
  subtitles: AIChatMessageModel[];
}

export default function RealtimeSubtitles({ subtitles }: RealtimeSubtitlesProps) {
  const contextualMessages = subtitles.filter((msg) => msg.isContextual);
  const latestContextual = contextualMessages[contextualMessages.length - 1];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-3 h-24">
      <div className="flex items-start gap-3 h-full">
        <div className="flex-shrink-0 mt-1">
          <SafeIcon name="Captions" className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground mb-2">实时字幕</p>
          <ScrollArea className="h-16 pr-4">
            {latestContextual ? (
              <div className="space-y-2">
                {contextualMessages.slice(-3).map((msg) => (
                  <div key={msg.messageId} className="text-sm">
                    {msg.sender === 'ai' ? (
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary" className="flex-shrink-0 mt-0.5">
                          AI
                        </Badge>
                        <p className="text-foreground/80 line-clamp-2">{msg.content}</p>
                      </div>
                    ) : (
                      <p className="text-foreground/60 italic line-clamp-2">{msg.content}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">等待字幕...</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
}
