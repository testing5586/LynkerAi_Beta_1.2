
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';

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

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: () => void;
  onUpgrade: () => void;
}

export default function SubscriptionCard({
  plan,
  isSelected,
  onSelect,
  onUpgrade,
}: SubscriptionCardProps) {
  return (
    <Card
      className={`glass-card relative transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-accent border-accent/50' : 'hover:border-accent/30'
      } ${plan.isPopular ? 'md:scale-105' : ''}`}
      onClick={onSelect}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground">
            <SafeIcon name="Star" className="h-3 w-3 mr-1" />
            最受欢迎
          </Badge>
        </div>
      )}

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <SafeIcon name="Check" className="h-4 w-4 text-accent-foreground" />
          </div>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price */}
        <div className="space-y-1">
          {plan.isFree ? (
            <div className="text-3xl font-bold text-accent">免费</div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/月</span>
            </div>
          )}
        </div>

        {/* Token Info */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <SafeIcon name="Zap" className="h-5 w-5 text-accent" />
            <span className="font-semibold">{plan.tokens} Tokens</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {plan.isFree ? '试用额度' : '月度额度'}
          </p>
        </div>

        <Separator />

        {/* Features */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">包含功能：</p>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <SafeIcon name="Check" className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        {plan.isFree ? (
          <Button variant="outline" className="w-full" disabled>
            当前计划
          </Button>
        ) : (
          <Button
            className="w-full bg-mystical-gradient hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              onUpgrade();
            }}
          >
            {isSelected ? '已选择' : '选择此计划'}
            <SafeIcon name="ArrowRight" className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
