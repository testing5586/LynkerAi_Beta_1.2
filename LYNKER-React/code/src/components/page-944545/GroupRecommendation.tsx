
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface Group {
  id: string;
  name: string;
  memberCount: number;
  image: string;
}

interface GroupRecommendationProps {
  groups: Group[];
}

export default function GroupRecommendation({ groups }: GroupRecommendationProps) {
  return (
    <div className="space-y-4 sticky top-24">
      {/* Recommended Groups */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="Users" className="w-5 h-5 text-accent" />
            推荐群组
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groups.map((group) => (
            <div key={group.id} className="space-y-2">
              {/* Group Card */}
              <div className="rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
                {/* Group Image */}
                <div className="w-full h-32 overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* Group Info */}
                <div className="p-3 space-y-2">
                  <h4 className="font-semibold text-sm line-clamp-2">{group.name}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <SafeIcon name="Users" className="w-3 h-3" />
                      <span>{group.memberCount} 成员</span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => window.location.href = './page-944544.html'}
                  >
                    <SafeIcon name="Plus" className="w-3 h-3 mr-1" />
                    进入群组
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Online Friends */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SafeIcon name="Users" className="w-5 h-5 text-accent" />
            在线灵友
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: '星空观测者', status: 'online' },
            { name: '紫微探索家', status: 'online' },
            { name: '命运追寻者', status: 'idle' },
          ].map((friend) => (
            <div key={friend.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-sm truncate">{friend.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <SafeIcon name="MessageSquare" className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
