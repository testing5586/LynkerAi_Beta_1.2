
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface AIAssistantFloatProps {
  unreadCount?: number;
}

export default function AIAssistantFloat({ unreadCount = 0 }: AIAssistantFloatProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Prevent body scroll when expanded
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const handleOpenChat = () => {
    window.location.href = './ai-chat-interface.html';
  };

  const handleOpenSettings = () => {
    window.location.href = './ai-assistant-settings.html';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50"></div>
    );
  }

return (
     <>
       {/* Main Float Button */}
<div className="fixed bottom-6 right-6 z-50"></div>
     </>
   );
}
