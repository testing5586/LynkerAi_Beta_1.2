
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface OnlineFriend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'idle' | 'offline';
  country: string;
  region: string;
}

const ONLINE_FRIENDS: OnlineFriend[] = [
  {
    id: 'f001',
    name: '星空下的观测者Q',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
    status: 'online',
    country: 'CN',
    region: '深圳',
  },
  {
    id: 'f002',
    name: '太乙神数研究员',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    status: 'online',
    country: 'CN',
    region: '北京',
  },
  {
    id: 'f003',
    name: '紫微命盘探索家',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/037f4122-b11c-4b06-b481-45cd28e1ef44.png',
    status: 'idle',
    country: 'US',
    region: '加州',
  },
  {
    id: 'f004',
    name: '风水奇门爱好者',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/1ca11d36-3115-4b29-90bd-95a9c7adfdf3.png',
    status: 'offline',
    country: 'CN',
    region: '香港',
  },
];

const statusConfig = {
  online: { color: 'bg-green-500', label: '在线' },
  idle: { color: 'bg-yellow-500', label: '离开' },
  offline: { color: 'bg-gray-500', label: '离线' },
};

export default function OnlineFriends() {
  const onlineFriends = ONLINE_FRIENDS.filter((f) => f.status === 'online');
  const idleFriends = ONLINE_FRIENDS.filter((f) => f.status === 'idle');
  const offlineFriends = ONLINE_FRIENDS.filter((f) => f.status === 'offline');

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <SafeIcon name="Users" className="h-5 w-5 text-accent" />
          灵友在线 ({onlineFriends.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Online Friends */}
        {onlineFriends.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">在线</h4>
            <div className="space-y-2">
              {onlineFriends.map((friend) => (
                <FriendItem key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        )}

        {/* Idle Friends */}
        {idleFriends.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">离开</h4>
            <div className="space-y-2">
              {idleFriends.map((friend) => (
                <FriendItem key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        )}

        {/* Offline Friends */}
        {offlineFriends.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">离线</h4>
            <div className="space-y-2">
              {offlineFriends.map((friend) => (
                <FriendItem key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FriendItem({ friend }: { friend: OnlineFriend }) {
  const status = statusConfig[friend.status];

  return (
    <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group text-left">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="relative flex-shrink-0">
          <UserAvatar
            user={{
              name: friend.name,
              avatar: friend.avatar,
              country: friend.country,
            }}
            size="small"
            showHoverCard={false}
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${status.color} border border-background`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">
            {friend.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">{friend.region}</p>
        </div>
      </div>
      <SafeIcon name="MessageCircle" className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-1" />
    </button>
  );
}
