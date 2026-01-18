
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIChatMessageModel } from '@/data/ai_settings';

interface ChatMessageProps {
  message: AIChatMessageModel;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const isContextual = message.isContextual;

  if (isContextual) {
    return (
      <div className="flex justify-center py-2">
        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/50">
          <SafeIcon name="AlertCircle" className="h-3 w-3 mr-1" />
          {message.content}
        </Badge>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <Card
        className={`max-w-md px-4 py-3 ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-3xl rounded-tr-sm'
            : 'glass-card rounded-3xl rounded-tl-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p className={`text-xs mt-2 ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {message.timestamp}
        </p>
      </Card>
    </div>
  );
}
