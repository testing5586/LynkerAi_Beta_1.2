
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface RoleCardProps {
  role: {
    id: 'user' | 'master';
    title: string;
    description: string;
    icon: string;
    features: string[];
    requirements: string[];
    ctaText: string;
    ctaHref: string;
    badge?: string;
    highlight?: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export default function RoleCard({ role, isSelected, onSelect }: RoleCardProps) {
  return (
    <Card
      className={`glass-card transition-all cursor-pointer overflow-hidden ${
        isSelected ? 'ring-2 ring-accent shadow-lg' : 'hover:shadow-lg'
      } ${role.highlight ? 'border-accent/50' : ''}`}
      onClick={onSelect}
    >
<CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 rounded-lg bg-mystical-gradient flex items-center justify-center glow-primary">
            <SafeIcon name={role.icon} className="w-8 h-8 text-white" />
          </div>
          {role.badge && (
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              {role.badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-2xl">{role.title}</CardTitle>
        <CardDescription className="text-base mt-2">{role.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Features */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <SafeIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
            <span>主要功能</span>
          </h4>
          <ul className="space-y-2">
            {role.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm">
                <SafeIcon name="Check" className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <SafeIcon name="Shield" className="h-5 w-5 text-primary" />
            <span>注册要求</span>
          </h4>
          <ul className="space-y-2">
            {role.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm">
                <SafeIcon name="AlertCircle" className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className={`w-full h-11 font-semibold transition-all ${
            isSelected
              ? 'bg-mystical-gradient text-white hover:opacity-90'
              : 'bg-primary/80 hover:bg-primary'
          }`}
        >
          <a href={role.ctaHref}>{role.ctaText}</a>
        </Button>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="flex items-center justify-center space-x-2 text-accent text-sm font-semibold">
            <SafeIcon name="CheckCircle" className="h-5 w-5" />
            <span>已选择</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
