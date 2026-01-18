
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';
import SafeIcon from '@/components/common/SafeIcon';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  tokens: number;
  description: string;
  isPopular?: boolean;
  features: string[];
  cta: string;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: '免费版',
    price: 0,
    currency: 'USD',
    tokens: 100,
    description: '试用版本，体验平台全部功能',
    features: [
      '100 算力试用',
      '基础命理分析',
      '客户批命记录',
      '知识库管理',
      'AI助手基础功能',
      '社区论坛访问',
      '邮件支持',
    ],
    cta: '开始免费试用',
  },
  {
    id: 'personal',
    name: '个人版',
    price: 20,
    currency: 'USD',
    tokens: 1000,
    description: '适合独立命理师',
    isPopular: true,
    features: [
      '1000 算力额度',
      '高级命理分析',
      '无限客户记录',
      '高级知识库',
      'AI助手完整功能',
      '优先社区支持',
      '视频会议集成',
      '自定义工作室页面',
      '优先邮件支持',
    ],
    cta: '升级到个人版',
  },
  {
    id: 'professional',
    name: '专业版',
    price: 40,
    currency: 'USD',
    tokens: 2500,
    description: '适合专业工作室',
    features: [
      '2500 算力额度',
      '企业级分析工具',
      '无限客户管理',
      '高级知识库+API',
      'AI助手企业功能',
      '24/7 优先支持',
      '高级视频会议',
      '团队协作功能',
      '数据分析仪表板',
      '自定义品牌',
      'API访问权限',
    ],
    cta: '升级到专业版',
  },
];

export default function SubscriptionPlans() {
  const [isClient, setIsClient] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('personal');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsClient(false);
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navigate to payment settings
    window.location.href = './page-979468.html';
  };

  return (
    <div className="space-y-8">
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all duration-300 ${
              selectedPlan === plan.id
                ? 'ring-2 ring-primary shadow-card'
                : 'hover:shadow-card'
            } ${plan.isPopular ? 'md:scale-105' : ''}`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">
                  <Zap className="h-3 w-3 mr-1" />
                  最受欢迎
                </Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gradient-mystical">
                    {plan.price === 0 ? '免费' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/月</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-accent" />
                  <span>{plan.tokens} 算力额度</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isProcessing && selectedPlan === plan.id}
                className={`w-full ${
                  plan.isPopular
                    ? 'bg-mystical-gradient hover:opacity-90'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isProcessing && selectedPlan === plan.id ? (
                  <>
                    <SafeIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    处理中...
                  </>
                ) : (
                  plan.cta
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-12 pt-8 border-t border-border/50">
        <h3 className="text-2xl font-bold mb-6">功能对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold">功能</th>
                <th className="text-center py-3 px-4 font-semibold">免费版</th>
                <th className="text-center py-3 px-4 font-semibold">个人版</th>
                <th className="text-center py-3 px-4 font-semibold">专业版</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: '算力额度', free: '100', personal: '1000', pro: '2500' },
                { feature: '客户记录', free: '有限', personal: '无限', pro: '无限' },
                { feature: '知识库', free: '基础', personal: '高级', pro: '企业级' },
                { feature: 'AI助手', free: '基础', personal: '完整', pro: '企业' },
                { feature: '视频会议', free: '否', personal: '是', pro: '高级' },
                { feature: '团队协作', free: '否', personal: '否', pro: '是' },
                { feature: '数据分析', free: '否', personal: '否', pro: '是' },
                { feature: 'API访问', free: '否', personal: '否', pro: '是' },
{ feature: '一键推送知识库', free: '邮件', personal: '优先', pro: '24/7' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-border/30 hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{row.feature}</td>
                  <td className="text-center py-3 px-4 text-muted-foreground">{row.free}</td>
                  <td className="text-center py-3 px-4 text-foreground">{row.personal}</td>
                  <td className="text-center py-3 px-4 text-accent font-semibold">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-border/50">
        <h3 className="text-2xl font-bold mb-6">常见问题</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: '我可以随时升级或降级我的计划吗？',
              a: '是的，您可以随时升级或降级您的订阅计划。升级立即生效，降级将在下个计费周期生效。',
            },
            {
              q: '如果我的算力用完了怎么办？',
              a: '您可以随时购买额外的算力包，或升级到更高的订阅等级以获得更多算力。',
            },
            {
              q: '是否提供退款保证？',
              a: '我们提供 7 天无条件退款保证。如果您对服务不满意，请联系我们的支持团队。',
            },
            {
              q: '团队协作功能如何工作？',
              a: '专业版支持添加团队成员，每个成员可以有自己的账户和权限设置。',
            },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-foreground">{item.q}</h4>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
