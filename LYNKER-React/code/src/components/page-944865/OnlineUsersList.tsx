
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { Card } from '@/components/ui/card';

interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  country: string;
  status: 'online' | 'idle' | 'offline';
}

const MOCK_ONLINE_USERS: OnlineUser[] = [
  {
    id: 'user_001',
    name: '星空下的观测者Q',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
    country: 'CN',
    status: 'online',
  },
  {
    id: 'user_002',
    name: '太乙神数研究员',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/037f4122-b11c-4b06-b481-45cd28e1ef44.png',
    country: 'CN',
    status: 'online',
  },
  {
    id: 'user_003',
    name: '紫微命盘探索家',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/84fe2122-c6a6-4adc-9282-ed9f63c49012.png',
    country: 'US',
    status: 'idle',
  },
  {
    id: 'user_004',
    name: '风水奇门爱好者',
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/fc610ebc-6724-404d-99c9-246c668a2d0b.png',
    country: 'JP',
    status: 'online',
  },
];

export default function OnlineUsersList() {
  const onlineCount = MOCK_ONLINE_USERS.filter((u) => u.status === 'online').length;

  return (
    <Card className="glass-card p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">在线灵友</h3>
        <Badge variant="secondary" className="bg-green-600/20 text-green-400">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
          {onlineCount} 在线
        </Badge>
      </div>

      <div className="space-y-2">
        {MOCK_ONLINE_USERS.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                    user.status === 'online'
                      ? 'bg-green-500'
                      : user.status === 'idle'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.country}</p>
              </div>
            </div>
            <SafeIcon name="MessageCircle" className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </div>
        ))}
      </div>

<div className="mt-3 pt-3 border-t">
         <a
           href="./page-945207.html"
           className="text-xs text-primary hover:underline flex items-center justify-center"
         >
          <SafeIcon name="MessageSquare" className="h-3 w-3 mr-1" />
          查看所有消息
        </a>
      </div>
    </Card>
  );
}
