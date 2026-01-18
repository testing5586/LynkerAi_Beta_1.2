
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_GROUP, MOCK_ONLINE_FRIENDS } from '@/data/group_social';

export default function GroupsSidebar() {
  const mockGroups = [
    {
      id: 'g001',
      name: '丁火身强群',
      members: 235,
      icon: 'Flame',
    },
    {
      id: 'g002',
      name: '紫微天机研究',
      members: 189,
      icon: 'Star',
    },
    {
      id: 'g003',
      name: '占星爱好者',
      members: 412,
      icon: 'Compass',
    },
    {
      id: 'g004',
      name: '八字交流社',
      members: 567,
      icon: 'BarChart3',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Groups Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Users" className="h-5 w-5 text-accent" />
            热门群组
          </CardTitle>
          <CardDescription>加入社区讨论</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {mockGroups.map((group) => (
            <Button
              key={group.id}
              variant="ghost"
              className="w-full justify-start h-auto py-2 px-3 hover:bg-accent/10"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name={group.icon} className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate">{group.name}</p>
                  <p className="text-xs text-muted-foreground">{group.members} 人</p>
                </div>
                <SafeIcon name="ChevronRight" className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </Button>
          ))}

          <Button variant="outline" className="w-full mt-4">
            <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
            创建群组
          </Button>
        </CardContent>
      </Card>

{/* Online Friends Card */}
       <Card className="border-border/50">
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <SafeIcon name="Radio" className="h-5 w-5 text-green-500 animate-pulse" />
             在线灵友
           </CardTitle>
           <CardDescription>{MOCK_ONLINE_FRIENDS.length} 人在线</CardDescription>
         </CardHeader>

         <CardContent id="iwirju" className="space-y-2" style={{ backgroundImage: 'linear-gradient(#1d1c22 0%, #1d1c22 100%)' }}>
          {MOCK_ONLINE_FRIENDS.map((friend) => (
            <div
              key={friend.userId}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold">
                    {friend.alias.slice(0, 2)}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border border-background" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{friend.alias}</p>
                {friend.isHomologyMatch && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0 mt-0.5">
                    <SafeIcon name="Sparkles" className="h-2.5 w-2.5 mr-1" />
                    同命
                  </Badge>
                )}
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-4">
            <SafeIcon name="MessageCircle" className="h-4 w-4 mr-2" />
            发起聊天
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
