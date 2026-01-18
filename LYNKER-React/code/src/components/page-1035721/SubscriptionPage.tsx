
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import SubscriptionCard from './SubscriptionCard';
import AIAssistantConfig from './AIAssistantConfig';
import TokenUsageChart from './TokenUsageChart';
import PaymentSettings from './PaymentSettings';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  tokens: number;
  description: string;
  features: string[];
  isFree: boolean;
  isPopular: boolean;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: '免费版',
    price: 0,
    currency: 'USD',
    tokens: 100,
    description: '试用版本，体验平台全部功能',
    features: [
      '100 tokens 试用额度',
      '基础命理分析',
      '知识库管理',
      '论坛发帖',
      '同命匹配（基础）',
      '社区交流',
    ],
    isFree: true,
    isPopular: false,
  },
  {
    id: 'personal',
    name: '个人版',
    price: 20,
    currency: 'USD',
    tokens: 1000,
    description: '适合个人命理师',
    features: [
      '1000 tokens 月度额度',
      '高级命理分析',
      '完整知识库管理',
      '优先论坛推荐',
      '同命匹配（高级）',
      '客户管理工具',
      '预约链接生成',
      'AI助手定制',
    ],
    isFree: false,
    isPopular: true,
  },
  {
    id: 'professional',
    name: '专业版',
    price: 40,
    currency: 'USD',
    tokens: 2500,
    description: '专业命理师必选',
    features: [
      '2500 tokens 月度额度',
      '企业级命理分析',
      '无限知识库存储',
      '置顶论坛推荐',
      '同命匹配（VIP）',
      '高级客户管理',
      '多预约链接',
      '高级AI助手定制',
      '优先客服支持',
      '数据分析报告',
      '工作室品牌展示',
    ],
    isFree: false,
    isPopular: false,
  },
];

const AI_PROVIDERS = [
  { id: 'chatgpt5', name: 'ChatGPT 5', icon: 'Zap' },
  { id: 'gemini3', name: 'Gemini 3', icon: 'Sparkles' },
  { id: 'qwen', name: 'Qwen', icon: 'Brain' },
  { id: 'deepseek', name: 'DeepSeek', icon: 'Lightbulb' },
];

export default function SubscriptionPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('personal');
  const [selectedProvider, setSelectedProvider] = useState<string>('chatgpt5');
  const [aiName, setAiName] = useState('灵伴AI');
  const [aiTone, setAiTone] = useState('professional');
  const [activeTab, setActiveTab] = useState('plans');
  const [tokenUsage, setTokenUsage] = useState({
    used: 650,
    total: 1000,
    lastReset: '2025-01-15',
  });

  useEffect(() => {
    setIsClient(false);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);
  const currentProvider = AI_PROVIDERS.find(p => p.id === selectedProvider);

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setActiveTab('payment');
  };

  const handleSaveAIConfig = () => {
    // Save AI configuration
    console.log('Saving AI config:', { aiName, selectedProvider, aiTone });
  };

  return (
    <div className="container py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient-mystical mb-2">订阅计划</h1>
        <p className="text-muted-foreground text-lg">
          选择适合您的订阅计划，解锁灵客AI的全部功能
        </p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <SafeIcon name="Package" className="h-4 w-4" />
            <span className="hidden sm:inline">订阅计划</span>
          </TabsTrigger>
          <TabsTrigger value="ai-config" className="flex items-center gap-2">
            <SafeIcon name="Settings" className="h-4 w-4" />
            <span className="hidden sm:inline">AI助手</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <SafeIcon name="CreditCard" className="h-4 w-4" />
            <span className="hidden sm:inline">支付设置</span>
          </TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-8">
          {/* Important Notice */}
          <Alert className="border-accent/50 bg-accent/10">
            <SafeIcon name="AlertCircle" className="h-4 w-4 text-accent" />
            <AlertDescription>
              升级前请阅读<a href="#" className="text-accent hover:underline font-semibold">用户协议</a>和<a href="#" className="text-accent hover:underline font-semibold">服务条款</a>
            </AlertDescription>
          </Alert>

          {/* Subscription Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
                onUpgrade={() => handleUpgrade(plan.id)}
              />
            ))}
          </div>

          {/* Current Plan Info */}
          {currentPlan && !currentPlan.isFree && (
            <Card className="glass-card border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="CheckCircle" className="h-5 w-5 text-accent" />
                  当前订阅
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">订阅计划</p>
                    <p className="text-lg font-semibold">{currentPlan.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">月度费用</p>
                    <p className="text-lg font-semibold">
                      ${currentPlan.price} {currentPlan.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">月度额度</p>
                    <p className="text-lg font-semibold">{currentPlan.tokens} tokens</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">下次续费</p>
                    <p className="text-lg font-semibold">2025-02-15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI Config Tab */}
        <TabsContent value="ai-config" className="space-y-6">
          <AIAssistantConfig
            selectedProvider={selectedProvider}
            onProviderChange={setSelectedProvider}
            aiName={aiName}
            onAiNameChange={setAiName}
            aiTone={aiTone}
            onAiToneChange={setAiTone}
            providers={AI_PROVIDERS}
            onSave={handleSaveAIConfig}
          />
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <PaymentSettings />
            </div>

            {/* Order Summary */}
            <div>
              <Card className="glass-card sticky top-24">
                <CardHeader>
                  <CardTitle>订单摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">订阅计划</span>
                      <span className="font-semibold">{currentPlan?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">月度费用</span>
                      <span className="font-semibold">${currentPlan?.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Token额度</span>
                      <span className="font-semibold">{currentPlan?.tokens}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">总计</span>
                    <span className="text-lg font-bold text-accent">
                      ${currentPlan?.price}
                    </span>
                  </div>
                  <Button className="w-full bg-mystical-gradient hover:opacity-90">
                    <SafeIcon name="CreditCard" className="h-4 w-4 mr-2" />
                    立即支付
                  </Button>
                  <Button variant="outline" className="w-full">
                    返回订阅计划
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Token Usage Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Token使用情况</h2>
        <TokenUsageChart usage={tokenUsage} />
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">常见问题</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">如何升级订阅？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              选择您想要的订阅计划，点击"升级"按钮，完成支付即可立即生效。
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Token如何计费？</CardTitle>
            </CardHeader>
<CardContent className="text-sm text-muted-foreground">
              每次AI分析、知识库操作等都会消耗Token。每个结算周期未使用算力会在结算周期结束后自动结余至下个结算周期，结余算力的有效期至下个结算周期结束。
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">可以随时取消订阅吗？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              可以。取消后将在当前计费周期结束时停止扣费，已支付的费用不予退款。
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">支持哪些支付方式？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              支持国际信用卡、PayPal、微信支付和支付宝等多种支付方式。
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
