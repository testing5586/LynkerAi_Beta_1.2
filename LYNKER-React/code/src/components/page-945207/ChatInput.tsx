
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="border-t bg-card/50 backdrop-blur-sm p-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="输入消息..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          className="bg-primary hover:bg-primary/90"
        >
          <SafeIcon name="Send" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
