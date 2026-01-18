
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIAssistantModel } from '@/data/ai_settings';

interface APIKeyManagementProps {
  selectedModel?: AIAssistantModel;
}

export default function APIKeyManagement({ selectedModel }: APIKeyManagementProps) {
  const [apiKey, setApiKey] = useState('sk-proj-••••••••••••••••••••');
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveKey = () => {
    setIsEditing(false);
    // API call would happen here
  };

  return (
    <div className="space-y-6">
      {/* Current API Key */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>API密钥管理</CardTitle>
          <CardDescription>
            安全地管理您的API密钥，用于连接AI服务
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedModel ? (
            <>
              <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2">
                <SafeIcon name={selectedModel.iconName} className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{selectedModel.name}</p>
                  <p className="text-xs text-muted-foreground">当前配置的AI模型</p>
                </div>
              </div>

              <Separator />

              {!isEditing ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>API密钥</Label>
                    <div className="flex gap-2">
                      <Input
                        type={showKey ? 'text' : 'password'}
                        value={apiKey}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowKey(!showKey)}
                        title={showKey ? '隐藏' : '显示'}
                      >
                        <SafeIcon name={showKey ? 'EyeOff' : 'Eye'} className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ✓ 密钥已安全保存，仅在此显示最后4位
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex-1"
                    >
                      <SafeIcon name="Edit2" className="h-4 w-4 mr-2" />
                      更新密钥
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                    >
                      <SafeIcon name="Copy" className="h-4 w-4 mr-2" />
                      复制
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="new-api-key">新API密钥</Label>
                    <Input
                      id="new-api-key"
                      type="password"
                      placeholder="粘贴您的新API密钥"
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      从 {selectedModel.name} 官方获取您的API密钥
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleSaveKey}
                      className="flex-1 bg-mystical-gradient hover:opacity-90"
                    >
                      <SafeIcon name="Save" className="h-4 w-4 mr-2" />
                      保存密钥
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Alert>
              <SafeIcon name="AlertCircle" className="h-4 w-4" />
              <AlertDescription>
                请先在"模型选择"标签页选择一个AI模型
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert className="border-amber-500/50 bg-amber-500/5">
        <SafeIcon name="Shield" className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-900 dark:text-amber-200">
          <strong>安全提示：</strong>
          <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
            <li>永远不要在公开场合分享您的API密钥</li>
            <li>定期更换密钥以保护账户安全</li>
            <li>如果密钥泄露，请立即更新</li>
            <li>我们不会通过邮件或消息要求您的密钥</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Get API Key */}
      <Card className="glass-card border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">获取API密钥</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedModel ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                点击下方按钮前往 {selectedModel.name} 官方网站获取您的API密钥
              </p>
              <Button asChild className="w-full">
                <a
                  href={selectedModel.keySetupLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SafeIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                  {selectedModel.keySetupLinkTitle}
                </a>
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              选择AI模型后，此处将显示获取API密钥的链接
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
