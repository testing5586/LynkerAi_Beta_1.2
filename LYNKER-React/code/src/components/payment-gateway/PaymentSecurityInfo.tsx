
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface PaymentSecurityInfoProps {
  className?: string;
}

export default function PaymentSecurityInfo({ className = '' }: PaymentSecurityInfoProps) {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: '256位SSL加密',
      description: '所有数据传输均采用最高级别加密',
    },
    {
      icon: 'Lock',
      title: 'PCI DSS认证',
      description: '符合国际支付卡行业安全标准',
    },
    {
      icon: 'Eye',
      title: '隐私保护',
      description: '我们不会存储您的完整卡号信息',
    },
    {
      icon: 'CheckCircle',
      title: '交易保障',
      description: '支付失败自动退款，无需担心',
    },
  ];

  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-base">安全保障</CardTitle>
        <CardDescription className="text-xs">
          您的支付信息受到多重保护
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <SafeIcon name={feature.icon} className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}

        {/* Support Info */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">
            遇到问题？
          </p>
          <a
            href="#"
            className="text-xs text-primary hover:underline flex items-center space-x-1"
          >
            <SafeIcon name="HelpCircle" className="w-3 h-3" />
            <span>联系客服支持</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
