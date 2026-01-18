
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import type { OnlineFriendModel } from '@/data/social_feed';

interface OnlineFriendsSidebarProps {
  currentFriend: OnlineFriendModel;
  otherFriends: OnlineFriendModel[];
  onFriendSelect?: (friend: OnlineFriendModel) => void;
}

export default function OnlineFriendsSidebar({
  currentFriend,
  otherFriends,
  onFriendSelect,
}: OnlineFriendsSidebarProps) {
  return (
    <Sidebar className="w-64 border-r bg-card">
      <SidebarHeader className="border-b p-4">
        <h2 className="font-semibold flex items-center space-x-2">
          <SafeIcon name="Users" className="h-5 w-5 text-primary" />
          <span>在线同命友</span>
        </h2>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {/* Current Chat Friend */}
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-3 mb-2">
                <UserAvatar
                  user={{ name: currentFriend.alias, avatar: currentFriend.avatarUrl }}
                  size="default"
                  showHoverCard={false}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{currentFriend.alias}</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">在线</span>
                  </div>
                </div>
              </div>
              <Badge className="w-full justify-center bg-accent text-accent-foreground">
                <SafeIcon name="Heart" className="w-3 h-3 mr-1" />
                同命匹配
              </Badge>
            </div>

            <Separator className="my-4" />

            {/* Other Online Friends */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-3 px-2">其他在线好友</p>
              <div className="space-y-2">
                {otherFriends.map((friend) => (
                  <button
                    key={friend.userId}
                    onClick={() => onFriendSelect?.(friend)}
                    className="w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <UserAvatar
                        user={{ name: friend.alias, avatar: friend.avatarUrl }}
                        size="small"
                        showHoverCard={false}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{friend.alias}</p>
                        {friend.isHomologyMatch && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            同命
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
