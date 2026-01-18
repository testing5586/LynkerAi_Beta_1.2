
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import type { OnlineFriendModel } from '@/data/social_feed';

interface OnlineFriendsListProps {
  friends: OnlineFriendModel[];
  selectedFriend: OnlineFriendModel;
  onSelectFriend: (friend: OnlineFriendModel) => void;
}

export default function OnlineFriendsList({
  friends,
  selectedFriend,
  onSelectFriend,
}: OnlineFriendsListProps) {
  return (
    <Card className="glass-card p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <SafeIcon name="Users" className="w-5 h-5 text-accent" />
        <h3 className="font-semibold">在线好友</h3>
        <Badge variant="secondary" className="ml-auto text-xs">
          {friends.length}
        </Badge>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {friends.map((friend) => (
            <button
              key={friend.userId}
              onClick={() => onSelectFriend(friend)}
              className={`w-full p-3 rounded-lg transition-all text-left ${
                selectedFriend.userId === friend.userId
                  ? 'bg-primary/20 border border-primary'
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <UserAvatar
                    user={{
                      name: friend.alias,
                      avatar: friend.avatarUrl,
                      country: friend.geoTag?.country,
                    }}
                    size="small"
                    showHoverCard={false}
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{friend.alias}</p>
                  {friend.isHomologyMatch && (
                    <div className="flex items-center gap-1 mt-1">
                      <SafeIcon name="Sparkles" className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent font-semibold">同命</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground truncate">
                    {friend.geoTag?.region}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Online Status Summary */}
      <div className="mt-4 pt-4 border-t text-xs text-muted-foreground text-center">
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{friends.length} 位在线</span>
        </div>
      </div>
    </Card>
  );
}
