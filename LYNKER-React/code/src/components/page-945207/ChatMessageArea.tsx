
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  sender: 'user' | 'friend' | 'ai';
  content: string;
  timestamp: string;
  avatar?: string;
  name?: string;
}

interface ChatMessageAreaProps {
  messages: Message[];
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function ChatMessageArea({ messages, scrollRef }: ChatMessageAreaProps) {
  return (
    <Card className="glass-card flex-1 p-4 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <SafeIcon name="MessageCircle" className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">开始与同命人交流吧</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
    </Card>
  );
}
