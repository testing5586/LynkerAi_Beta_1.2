
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import GroupPost from './GroupPost';
import CommentSection from './CommentSection';
import type { GroupModel } from '@/data/group_social';

interface GroupCardProps {
  group: GroupModel;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="space-y-6">
      {/* Group Header Card */}
      <Card className="glass-card overflow-hidden">
        {/* Group Banner */}
        <div
          className="h-32 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${group.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>

        <CardHeader className="relative -mt-12 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{group.name}</h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <UserAvatar
                    user={{
                      name: group.creatorAlias,
                      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
                    }}
                    size="small"
                    showHoverCard={false}
                  />
                  <span className="text-sm text-muted-foreground">
                    由 <span className="font-medium text-foreground">{group.creatorAlias}</span> 创建
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <SafeIcon name="Users" className="h-4 w-4" />
                  <span>{group.memberCount} 成员</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon name="MessageSquare" className="h-4 w-4" />
                  <span>1 贴文</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                className={`${
                  group.isJoined
                    ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                    : 'bg-mystical-gradient hover:opacity-90'
                }`}
              >
                {group.isJoined ? (
                  <>
                    <SafeIcon name="Check" className="mr-2 h-4 w-4" />
                    已加入
                  </>
                ) : (
                  <>
                    <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
                    加入群组
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <SafeIcon name="Share2" className="mr-2 h-4 w-4" />
                分享
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Group Description */}
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{group.description}</p>
        </CardContent>
      </Card>

      {/* Group Post */}
      <GroupPost post={group.groupPost} />

      {/* Comments Section */}
      <CommentSection comments={[]} />
    </div>
  );
}
