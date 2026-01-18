
import { ScrollArea } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/common/UserAvatar';
import SafeIcon from '@/components/common/SafeIcon';

interface ChatMessage {
  id: string;
  sender: 'user' | 'friend' | 'ai';
  content: string;
  timestamp: string;
  avatar?: string;
  name?: string;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function ChatMessageList({ messages, scrollRef }: ChatMessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-end space-x-2 max-w-xs ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {msg.sender !== 'user' && msg.avatar && (
                <UserAvatar
                  user={{ name: msg.name || '', avatar: msg.avatar }}
                  size="small"
                  showHoverCard={false}
                />
              )}
              <div
                className={`rounded-lg px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : msg.sender === 'ai'
                    ? 'bg-accent/20 text-foreground border border-accent/30'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.sender !== 'user' && msg.name && (
                  <p className="text-xs font-semibold mb-1 opacity-70">{msg.name}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-60 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
        {scrollRef && <div ref={scrollRef} />}
      </div>
    </ScrollArea>
  );
}
