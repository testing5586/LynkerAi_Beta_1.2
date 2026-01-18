
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface UserProfilePopoverProps {
  user: {
    name: string;
    avatar: string;
    uid: string;
    country: string;
    region: string;
    subscriptionPlan: string;
    apiTokenUsage: string;
  };
}

export default function UserProfilePopover({ user }: UserProfilePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SafeIcon name="MoreVertical" className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        {/* User Info */}
        <div className="flex items-start space-x-3 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 rounded-full"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{user.name}</h4>
            <p className="text-xs text-muted-foreground">UID: {user.uid}</p>
            <p className="text-xs text-muted-foreground">
              {user.country} • {user.region}
            </p>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Account Info */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">订阅套餐</span>
            <span className="font-medium">{user.subscriptionPlan}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">API额度</span>
            <span className="font-medium text-accent">{user.apiTokenUsage}</span>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
<a href="./page-979337.html">
              <SafeIcon name="User" className="mr-2 h-4 w-4" />
              编辑个人资料
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
            <a href="./ai-assistant-settings.html">
              <SafeIcon name="Settings" className="mr-2 h-4 w-4" />
              AI助手设置
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
              我的知识库
            </a>
          </Button>
        </div>

        <Separator className="my-3" />

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <SafeIcon name="LogOut" className="mr-2 h-4 w-4" />
          退出登录
        </Button>
      </PopoverContent>
    </Popover>
  );
}
