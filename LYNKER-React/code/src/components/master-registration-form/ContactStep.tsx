
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface ContactStepProps {
  data: {
    phone: string;
    email: string;
    wechatId: string;
  };
  onChange: (updates: Partial<typeof data>) => void;
  errors: Record<string, string>;
}

export default function ContactStep({ data, onChange, errors }: ContactStepProps) {
  const [emailProvider, setEmailProvider] = useState<'gmail' | 'other'>('gmail');

  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <SafeIcon name="AlertCircle" className="h-4 w-4" />
        <AlertDescription>
          请提供有效的联系方式。我们将使用这些信息与您沟通重要事项。
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-semibold">
            手机号码 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+86 13800138000"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">
            邮箱地址 <span className="text-destructive">*</span>
          </Label>
          <Tabs value={emailProvider} onValueChange={(v) => setEmailProvider(v as 'gmail' | 'other')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gmail">Gmail</TabsTrigger>
              <TabsTrigger value="other">其他邮箱</TabsTrigger>
            </TabsList>
            <TabsContent value="gmail" className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="your.email@gmail.com"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className={errors.email ? 'border-destructive' : ''}
              />
              <p className="text-xs text-muted-foreground">
                推荐使用Gmail，便于绑定Google Drive存储您的数据
              </p>
            </TabsContent>
            <TabsContent value="other" className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className={errors.email ? 'border-destructive' : ''}
              />
            </TabsContent>
          </Tabs>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* WeChat */}
        <div className="space-y-2">
          <Label htmlFor="wechatId" className="text-base font-semibold">
            微信ID <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="wechatId"
              placeholder="请输入您的微信ID"
              value={data.wechatId}
              onChange={(e) => onChange({ wechatId: e.target.value })}
              className={errors.wechatId ? 'border-destructive' : ''}
            />
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <SafeIcon name="QrCode" className="w-4 h-4" />
            </Button>
          </div>
          {errors.wechatId && (
            <p className="text-sm text-destructive">{errors.wechatId}</p>
          )}
          <p className="text-xs text-muted-foreground">
            用于接收预约通知和客户沟通
          </p>
        </div>
      </div>

      {/* Google Drive Integration */}
      <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
        <div className="flex items-start gap-3">
          <SafeIcon name="Cloud" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Google Drive 集成</h4>
            <p className="text-sm text-muted-foreground mb-3">
              绑定您的Google账户，自动备份批命视频、研究笔记和客户记录
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <SafeIcon name="Link" className="w-4 h-4" />
              连接Google Drive
            </Button>
          </div>
        </div>
      </div>

      {/* WeChat Integration */}
      <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
        <div className="flex items-start gap-3">
          <SafeIcon name="MessageCircle" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">微信集成</h4>
            <p className="text-sm text-muted-foreground mb-3">
              绑定微信账户，方便客户通过微信联系您
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <SafeIcon name="Link" className="w-4 h-4" />
              连接微信
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
