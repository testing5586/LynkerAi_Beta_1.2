
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

interface NotificationPreferencesProps {
  settings: {
    realtimeSubtitles: boolean;
    autoSaveNotes: boolean;
    aiReminders: boolean;
    notificationEmail: boolean;
    notificationInApp: boolean;
    dailyDigest: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export default function NotificationPreferences({
  settings,
  onSettingsChange,
}: NotificationPreferencesProps) {
  const handleToggle = (key: keyof typeof settings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const notificationTypes = [
    {
      id: 'notificationInApp',
      title: '应用内通知',
      description: '在灵客AI应用内接收实时通知',
      icon: 'Bell',
    },
    {
      id: 'notificationEmail',
      title: '邮件通知',
      description: '通过邮件接收重要更新和提醒',
      icon: 'Mail',
    },
    {
      id: 'dailyDigest',
      title: '每日摘要',
      description: '每天接收一份您的活动和建议摘要',
      icon: 'Newspaper',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Notification Channels */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>通知渠道</CardTitle>
          <CardDescription>
            选择您希望接收通知的方式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((type, index) => (
            <div key={type.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <SafeIcon name={type.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-base font-semibold cursor-pointer">
                      {type.title}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings[type.id as keyof typeof settings]}
                  onCheckedChange={() => handleToggle(type.id as keyof typeof settings)}
                  className="ml-4"
                />
              </div>
              {index < notificationTypes.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>通知类型</CardTitle>
          <CardDescription>
            选择您想要接收的通知类型
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="MessageSquare" className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">新消息提醒</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="Calendar" className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">预约提醒</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="Sparkles" className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">AI建议</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="TrendingUp" className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">平台更新</span>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <SafeIcon name="Gift" className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">优惠和活动</span>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>静音时段</CardTitle>
          <CardDescription>
            设置您不想接收通知的时间段
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">启用静音时段</Label>
              <p className="text-xs text-muted-foreground mt-1">
                在指定时间内不接收任何通知
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quiet-start" className="text-sm">
                开始时间
              </Label>
              <input
                id="quiet-start"
                type="time"
                defaultValue="22:00"
                className="w-full mt-2 px-3 py-2 rounded-md bg-muted border border-border text-sm"
              />
            </div>
            <div>
              <Label htmlFor="quiet-end" className="text-sm">
                结束时间
              </Label>
              <input
                id="quiet-end"
                type="time"
                defaultValue="08:00"
                className="w-full mt-2 px-3 py-2 rounded-md bg-muted border border-border text-sm"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            在此时段内，紧急通知仍会被发送。
          </p>
        </CardContent>
      </Card>

      {/* Email Preferences */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>邮件偏好</CardTitle>
          <CardDescription>
            管理您的邮件订阅设置
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">订阅频率</span>
            <select className="px-3 py-1 rounded-md bg-background border border-border text-sm">
              <option>实时</option>
              <option>每日</option>
              <option>每周</option>
              <option>每月</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">邮件地址</span>
            <span className="text-sm text-muted-foreground">user@example.com</span>
          </div>

          <p className="text-xs text-muted-foreground">
            您可以在账户设置中更改邮件地址。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
