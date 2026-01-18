
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface SecurityBannerProps {
  variant?: 'default' | 'destructive';
  className?: string;
}

export default function SecurityBanner({ variant = 'default', className = '' }: SecurityBannerProps) {
  return (
    <Alert variant={variant} className={`border-2 ${className}`}>
      <SafeIcon name="ShieldAlert" className="h-5 w-5" />
      <AlertTitle className="font-bold">安全提示</AlertTitle>
      <AlertDescription className="text-sm space-y-1">
        <p>本页面内容受到严格保护：</p>
        <ul className="list-disc list-inside space-y-0.5 ml-2">
          <li>禁止截图和录屏</li>
          <li>禁止复制文字内容</li>
          <li>禁止使用爬虫工具</li>
          <li>内容仅供授权用户查看</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2">
          违反规定可能导致账户被封禁。请尊重知识产权。
        </p>
      </AlertDescription>
    </Alert>
  );
}
