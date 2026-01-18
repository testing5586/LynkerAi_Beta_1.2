
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface Message {
  id: string;
  sender: 'user' | 'friend' | 'ai';
  content: string;
  timestamp: string;
  avatar?: string;
  name?: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const isAI = message.sender === 'ai';

  if (isAI) {
    return (
      <div className="flex justify-center mb-4">
        <Card className="bg-accent/10 border-accent/30 px-4 py-2 max-w-md">
          <div className="flex items-start gap-2">
            <SafeIcon name="Sparkles" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-accent mb-1">AI助手提示</p>
              <p className="text-sm text-foreground/80">{message.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && message.avatar && (
        <UserAvatar
          user={{
            name: message.name || '朋友',
            avatar: message.avatar,
          }}
          size="small"
          showHoverCard={false}
        />
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 max-w-xs`}>
        {!isUser && message.name && (
          <p className="text-xs font-medium text-muted-foreground">{message.name}</p>
        )}
        <Card
          className={`px-4 py-2 ${
            isUser
              ? 'bg-mystical-gradient text-primary-foreground rounded-3xl rounded-tr-sm'
              : 'bg-muted text-foreground rounded-3xl rounded-tl-sm'
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </Card>
        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
      </div>
    </div>
  );
}
