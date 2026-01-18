
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import MessageDialog from '@/components/homology-match-profile-view/MessageDialog';

interface ProfileActionButtonsProps {
  userId: string;
  alias: string;
}

export default function ProfileActionButtons({ userId, alias }: ProfileActionButtonsProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const handleSendMessage = () => {
    setMessageDialogOpen(true);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleGoBack = () => {
    window.history.back();
  };

return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <SafeIcon name="ArrowLeft" className="w-4 h-4" />
          <span>返回</span>
        </Button>

        <Button
          onClick={handleSendMessage}
          className="flex-1 sm:flex-none bg-mystical-gradient hover:opacity-90 text-white"
        >
          <SafeIcon name="MessageSquare" className="w-4 h-4 mr-2" />
          发送私信
        </Button>

        <Button
          onClick={handleFollow}
          variant={isFollowing ? 'default' : 'outline'}
          className={`flex-1 sm:flex-none ${isFollowing ? 'bg-primary' : ''}`}
        >
          <SafeIcon name={isFollowing ? 'Heart' : 'Heart'} className="w-4 h-4 mr-2" />
          {isFollowing ? '已关注' : '关注'}
        </Button>

        <Button
          variant="outline"
          className="flex items-center space-x-2"
        >
          <SafeIcon name="Share2" className="w-4 h-4" />
          <span>分享</span>
        </Button>
      </div>

      <MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        recipientName={alias}
      />
    </>
  );
}
