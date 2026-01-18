
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import MessageDialog from './MessageDialog';
import type { HomologyProfileViewModel } from '@/data/homology_match';

interface HomologyProfileActionsProps {
  profile: HomologyProfileViewModel;
}

export default function HomologyProfileActions({ profile }: HomologyProfileActionsProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const handleMessage = () => {
    setIsMessageDialogOpen(true);
  };

  const handleViewProfile = () => {
    window.location.href = './profile-detail.html';
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
  };

return (
    <>
      <div className="space-y-4 sticky top-24">
        {/* Main Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">互动</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handleMessage}
              className="w-full bg-mystical-gradient hover:opacity-90 text-white"
              size="lg"
            >
              <SafeIcon name="MessageCircle" className="w-4 h-4 mr-2" />
              发送私信
            </Button>

            <Button
              onClick={handleViewProfile}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <SafeIcon name="User" className="w-4 h-4 mr-2" />
              查看完整资料
            </Button>

            <Button
              onClick={handleFollow}
              variant={isFollowing ? 'secondary' : 'outline'}
              className="w-full"
              size="lg"
            >
              <SafeIcon name={isFollowing ? 'UserCheck' : 'UserPlus'} className="w-4 h-4 mr-2" />
              {isFollowing ? '已关注' : '关注'}
            </Button>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">个人统计</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">加入时间</span>
              <span className="text-sm font-medium">2025年8月</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">论坛发帖</span>
              <span className="text-sm font-medium">12篇</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">获赞数</span>
              <span className="text-sm font-medium">245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">粉丝数</span>
              <span className="text-sm font-medium">89</span>
            </div>
          </CardContent>
        </Card>

        {/* Verification Badge */}
        <Card className="glass-card border-accent/50 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <SafeIcon name="CheckCircle" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-accent mb-1">真命盘已验证</p>
                <p className="text-xs text-muted-foreground">
                  此用户的命盘信息已通过平台验证，数据真实可靠。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Options */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <Button
              onClick={handleBlock}
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              size="sm"
            >
              <SafeIcon name={isBlocked ? 'UserX' : 'Ban'} className="w-4 h-4 mr-2" />
              {isBlocked ? '已屏蔽' : '屏蔽用户'}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              size="sm"
            >
              <SafeIcon name="Flag" className="w-4 h-4 mr-2" />
              举报用户
            </Button>
          </CardContent>
        </Card>
      </div>

      <MessageDialog
        open={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
        recipientName={profile.alias}
      />
    </>
  );
}
