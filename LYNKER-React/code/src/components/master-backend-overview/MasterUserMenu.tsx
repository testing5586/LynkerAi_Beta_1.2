import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface MasterUserMenuProps {
  master: {
    name: string;
    avatar: string;
    specialty: string;
    rating: number;
    totalConsultations: number;
  };
}

export default function MasterUserMenu({ master }: MasterUserMenuProps) {
  // Mock data for studio info
  const studioInfo = {
    studioName: '玄真子命理工作室',
    avgResponseTime: '2小时',
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
<Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
            <SafeIcon name="Crown" className="w-3 h-3 text-accent-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-card" align="end" side="top">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={master.avatar} alt={master.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {master.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{master.name}</h3>
            <p className="text-xs text-muted-foreground">{master.specialty}</p>
            <div className="mt-2">
              <Badge className="bg-accent text-accent-foreground">
                <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
                Pro命理师
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Studio Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">工作室</span>
            <span className="text-sm font-semibold">{studioInfo.studioName}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>平均响应</span>
            <span>{studioInfo.avgResponseTime}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-background/50 rounded p-2 text-center">
            <p className="font-bold text-accent">{master.rating}</p>
            <p className="text-muted-foreground">客户评分</p>
          </div>
          <div className="bg-background/50 rounded p-2 text-center">
            <p className="font-bold text-primary">{master.totalConsultations}</p>
            <p className="text-muted-foreground">咨询次数</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./master-backend-overview.html">
              <SafeIcon name="LayoutDashboard" className="h-4 w-4 mr-2" />
              我的后台
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
<a href="./page-990256.html">
              <SafeIcon name="Store" className="h-4 w-4 mr-2" />
              公开档案页管理
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./customer-prognosis-records-view.html">
              <SafeIcon name="Archive" className="h-4 w-4 mr-2" />
              客户记录
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./knowledge-base-main.html">
              <SafeIcon name="BookOpen" className="h-4 w-4 mr-2" />
              知识库
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./profile-setup-master.html">
              <SafeIcon name="User" className="h-4 w-4 mr-2" />
              账户设置
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./master-profile.html">
              <SafeIcon name="Eye" className="h-4 w-4 mr-2" />
              查看公开档案
            </a>
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