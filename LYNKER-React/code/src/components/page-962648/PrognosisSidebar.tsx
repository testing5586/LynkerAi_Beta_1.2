
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import SafeIcon from '@/components/common/SafeIcon';

interface TimeGroup {
  id: string;
  date: string;
  hour: number;
  minute: number;
  location: string;
  isSelected: boolean;
}

interface PrognosisSidebarProps {
  onSelectTimeGroup?: (groupId: string) => void;
}

export default function PrognosisSidebar({ onSelectTimeGroup }: PrognosisSidebarProps) {
  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([
    {
      id: 'group-1',
      date: '1988-08-08',
      hour: 7,
      minute: 30,
      location: '中国 湖北 武汉',
      isSelected: true,
    },
    {
      id: 'group-2',
      date: '1988-08-08',
      hour: 7,
      minute: 25,
      location: '中国 湖北 武汉',
      isSelected: false,
    },
  ]);

  const handleSelectGroup = (groupId: string) => {
    setTimeGroups(timeGroups.map(g => ({
      ...g,
      isSelected: g.id === groupId,
    })));
    onSelectTimeGroup?.(groupId);
  };

  const handleAddGroup = () => {
    const newGroup: TimeGroup = {
      id: `group-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      hour: 12,
      minute: 0,
      location: '中国',
      isSelected: false,
    };
    setTimeGroups([...timeGroups, newGroup]);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (timeGroups.length > 1) {
      const filtered = timeGroups.filter(g => g.id !== groupId);
      setTimeGroups(filtered);
    }
  };

  const menuItems = [
    { name: '个人资料', href: './page-962653.html', icon: 'User' },
    { name: '我的真命盘', href: './page-962648.html', icon: 'Sparkles', active: true },
    { name: '年流年运势', href: './page-962654.html', icon: 'TrendingUp' },
    { name: '知识库', href: './page-962652.html', icon: 'BookOpen' },
    { name: '预约', href: './page-962651.html', icon: 'Calendar' },
    { name: 'AI设置', href: './page-962650.html', icon: 'Settings' },
    { name: '付款设置', href: './page-962649.html', icon: 'CreditCard' },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>用户中心</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.active}
                    className={item.active ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <a href={item.href} className="flex items-center space-x-2">
                      <SafeIcon name={item.icon} className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Time Groups */}
        <SidebarGroup className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <SidebarGroupLabel>出生时间组</SidebarGroupLabel>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddGroup}
              className="h-6 w-6 p-0"
            >
              <SafeIcon name="Plus" className="h-4 w-4" />
            </Button>
          </div>
          <SidebarGroupContent>
            <div className="space-y-2">
              {timeGroups.map((group) => (
                <Card
                  key={group.id}
                  className={`p-3 cursor-pointer transition-all ${
                    group.isSelected
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleSelectGroup(group.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{group.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {String(group.hour).padStart(2, '0')}:{String(group.minute).padStart(2, '0')}
                        </p>
                      </div>
                      {group.isSelected && (
                        <Badge className="bg-primary text-primary-foreground">
                          <SafeIcon name="Check" className="h-3 w-3 mr-1" />
                          选中
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {group.location}
                    </p>
                    {timeGroups.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full h-6 text-xs text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group.id);
                        }}
                      >
                        <SafeIcon name="Trash2" className="h-3 w-3 mr-1" />
                        删除
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>帮助</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                    <SafeIcon name="HelpCircle" className="h-4 w-4" />
                    <span>如何确认真命盘</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                    <SafeIcon name="FileText" className="h-4 w-4" />
                    <span>命盘解读指南</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
