
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface UserInfo {
  name: string;
  uid: string;
  avatar: string;
  subscription: string;
  apiTokenUsage: number;
  apiTokenLimit: number;
  country: string;
}

const MOCK_USER: UserInfo = {
  name: '灵客用户',
  uid: 'LK-2024-001234',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
  subscription: 'Pro会员',
  apiTokenUsage: 7500,
  apiTokenLimit: 10000,
  country: 'CN',
};

export default function UserProfileCard() {
  const [isOpen, setIsOpen] = useState(false);

  const usagePercentage = (MOCK_USER.apiTokenUsage / MOCK_USER.apiTokenLimit) * 100;
  const usageColor = usagePercentage > 80 ? 'text-destructive' : usagePercentage > 50 ? 'text-accent' : 'text-green-500';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-muted">
          <Avatar className="h-10 w-10 ring-2 ring-accent/50">
            <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {MOCK_USER.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align="end">
        {/* User Info Header */}
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {MOCK_USER.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-sm truncate">{MOCK_USER.name}</h4>
                <Badge className="bg-accent text-accent-foreground text-xs">
                  <SafeIcon name="Crown" className="h-3 w-3 mr-0.5" />
                  Pro
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">UID: {MOCK_USER.uid}</p>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">订阅套餐</span>
              <Badge variant="secondary" className="text-xs">
                {MOCK_USER.subscription}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">API Token 使用量</span>
                <span className={`font-semibold ${usageColor}`}>
                  {MOCK_USER.apiTokenUsage.toLocaleString()} / {MOCK_USER.apiTokenLimit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    usagePercentage > 80
                      ? 'bg-destructive'
                      : usagePercentage > 50
                        ? 'bg-accent'
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {usagePercentage > 80 && '⚠️ 即将达到限额'}
                {usagePercentage <= 80 && usagePercentage > 50 && '📊 使用量较高'}
                {usagePercentage <= 50 && '✅ 使用量充足'}
              </p>
            </div>
          </div>

          {/* Country Info */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-2xl">{getFlagEmoji(MOCK_USER.country)}</span>
            <span className="text-muted-foreground">{getCountryName(MOCK_USER.country)}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
<a href="./page-979337.html" className="cursor-pointer">
            <SafeIcon name="User" className="mr-2 h-4 w-4" />
            <span>编辑个人资料</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="./placeholder.html" className="cursor-pointer">
            <SafeIcon name="Eye" className="mr-2 h-4 w-4" />
            <span>查看真命盘</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="./placeholder.html" className="cursor-pointer">
            <SafeIcon name="Lock" className="mr-2 h-4 w-4" />
            <span>隐私设置</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="./ai-assistant-settings.html" className="cursor-pointer">
            <SafeIcon name="Settings" className="mr-2 h-4 w-4" />
            <span>AI助手设置</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href="./placeholder.html" className="cursor-pointer">
            <SafeIcon name="HelpCircle" className="mr-2 h-4 w-4" />
            <span>帮助中心</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive">
          <SafeIcon name="LogOut" className="mr-2 h-4 w-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    CN: '中国',
    US: '美国',
    JP: '日本',
    KR: '韩国',
    TH: '泰国',
    VN: '越南',
  };
  return countries[code] || code;
}
