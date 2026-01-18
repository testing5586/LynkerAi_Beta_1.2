
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';

interface UserProfilePopoverProps {
  user: {
    name: string;
    avatar: string;
    country: string;
    uid: string;
    subscription: string;
    apiUsage: { used: number; total: number };
  };
}

export default function UserProfilePopover({ user }: UserProfilePopoverProps) {
  const subscription = {
    type: user.subscription,
    expiryDate: '2026-01-15',
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-card" align="end">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-xs text-muted-foreground">{user.uid}</p>
            <div className="mt-2">
              <RegionBadge country={user.country} size="small" />
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Subscription Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">订阅套餐</span>
            <Badge className="bg-accent text-accent-foreground">
              <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
              {subscription.type}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>有效期至</span>
            <span>{subscription.expiryDate}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* API Usage */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">API Token使用</span>
            <span className="text-sm font-semibold">
              {user.apiUsage.used} / {user.apiUsage.total}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-mystical-gradient h-2 rounded-full transition-all"
              style={{ width: `${(user.apiUsage.used / user.apiUsage.total) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            剩余 {user.apiUsage.total - user.apiUsage.used} tokens
          </p>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
<a href="./page-979337.html">
              <SafeIcon name="User" className="h-4 w-4 mr-2" />
              编辑个人资料
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              我的知识库
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./page-979411.html">
              <SafeIcon name="Settings" className="h-4 w-4 mr-2" />
              AI助手设置
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="CreditCard" className="h-4 w-4 mr-2" />
            充值Token
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <SafeIcon name="LogOut" className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
