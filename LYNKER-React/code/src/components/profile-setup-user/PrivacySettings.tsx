
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface PrivacySettingsProps {
  settings: {
    showProfile: boolean;
    allowMessages: boolean;
    showLocation: boolean;
  };
  onSettingChange: (key: string, value: boolean) => void;
}

export default function PrivacySettings({
  settings,
  onSettingChange,
}: PrivacySettingsProps) {
  const privacyOptions = [
    {
      key: 'showProfile',
      label: '公开个人资料',
      description: '允许其他用户查看您的个人资料和命理信息摘要',
      icon: 'Eye',
    },
    {
      key: 'allowMessages',
      label: '接收私信',
      description: '允许同命人向您发送私信和消息',
      icon: 'Mail',
    },
    {
      key: 'showLocation',
      label: '显示地区信息',
      description: '在您的资料中显示国家和地区标签',
      icon: 'MapPin',
    },
  ];

  return (
    <div className="space-y-4">
      {privacyOptions.map((option) => (
        <Card key={option.key} className="border-muted">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <SafeIcon name={option.icon} className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <Label className="text-base font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </div>
              </div>
              <Switch
                checked={settings[option.key as keyof typeof settings]}
                onCheckedChange={(checked) =>
                  onSettingChange(option.key, checked)
                }
                className="flex-shrink-0"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Privacy Notice */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <SafeIcon name="Shield" className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-blue-500">隐私保护</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>您的真实身份信息（邮箱、电话、真实姓名）永远不会被公开</li>
                <li>所有隐私设置可随时修改，立即生效</li>
                <li>您可以随时删除账户和所有相关数据</li>
                <li>我们遵守严格的数据保护政策和隐私法规</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Usage Notice */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-accent">数据使用</p>
              <p className="text-muted-foreground">
                您的命理数据和咨询记录仅用于改进AI模型和提供更好的服务。我们不会将您的个人数据出售给第三方。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
