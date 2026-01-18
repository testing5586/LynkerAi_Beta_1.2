
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';

interface FriendRequest {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  country: string;
  region: string;
  isPro: boolean;
  bio: string;
  constellation: string;
  bazi: string;
  ziwei: string;
  matchScore: number;
  requestTime: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface RequestDetailPanelProps {
  request: FriendRequest;
  onAccept: () => void;
  onReject: () => void;
  onViewProfile: () => void;
}

export default function RequestDetailPanel({
  request,
  onAccept,
  onReject,
  onViewProfile,
}: RequestDetailPanelProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <UserAvatar
              user={{
                name: request.userName,
                avatar: request.avatar,
                country: request.country,
                isPro: request.isPro,
              }}
              size="large"
              showHoverCard={false}
            />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <CardTitle className="text-2xl">{request.userName}</CardTitle>
                {request.isPro && (
                  <Badge className="bg-accent text-accent-foreground">
                    <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
                    Pro命理师
                  </Badge>
                )}
              </div>
              <CardDescription className="text-base">{request.region}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Match Score */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">同命匹配度</span>
            <span className="text-2xl font-bold text-accent">{request.matchScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-mystical-gradient h-3 rounded-full transition-all"
              style={{ width: `${request.matchScore}%` }}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="font-semibold mb-2">个人简介</h3>
          <p className="text-muted-foreground">{request.bio}</p>
        </div>

        <Separator />

        {/* Astrology Info */}
        <div className="space-y-4">
          <h3 className="font-semibold">命理信息</h3>

          {/* Constellation */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">星座</label>
            <Badge variant="outline" className="text-base py-1 px-3">
              <SafeIcon name="Star" className="h-4 w-4 mr-2" />
              {request.constellation}
            </Badge>
          </div>

          {/* Bazi */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">八字</label>
            <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm">
              {request.bazi}
            </div>
          </div>

          {/* Ziwei */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">紫微斗数</label>
            <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm">
              {request.ziwei}
            </div>
          </div>
        </div>

        <Separator />

        {/* Region Info */}
        <div>
          <h3 className="font-semibold mb-3">地域信息</h3>
          <RegionBadge country={request.country} region={request.region} />
        </div>

        <Separator />

        {/* Request Time */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <SafeIcon name="Clock" className="h-4 w-4" />
          <span>请求时间：{request.requestTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onAccept}
            className="flex-1 bg-mystical-gradient hover:opacity-90"
          >
            <SafeIcon name="Check" className="h-4 w-4 mr-2" />
            接受请求
          </Button>
          <Button
            onClick={onReject}
            variant="outline"
            className="flex-1"
          >
            <SafeIcon name="X" className="h-4 w-4 mr-2" />
            拒绝
          </Button>
          <Button
            onClick={onViewProfile}
            variant="outline"
            size="icon"
            title="查看完整资料"
          >
            <SafeIcon name="Eye" className="h-4 w-4" />
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full">
            <SafeIcon name="Mail" className="h-4 w-4 mr-2" />
            发送消息
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <SafeIcon name="Share2" className="h-4 w-4 mr-2" />
            分享资料
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
