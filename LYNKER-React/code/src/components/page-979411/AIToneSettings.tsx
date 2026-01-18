
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SafeIcon from '@/components/common/SafeIcon';

interface AIToneSettingsProps {
  reminderTone: string;
  onToneChange: (tone: string) => void;
}

const toneOptions = [
  {
    id: 'professional',
    name: '专业严谨',
    description: '正式、学术性的语气，适合深度分析',
    icon: 'Briefcase',
  },
  {
    id: 'friendly',
    name: '友好温暖',
    description: '亲切、易接近的语气，适合日常交流',
    icon: 'Smile',
  },
  {
    id: 'mystical',
    name: '神秘深邃',
    description: '富有诗意、充满智慧的语气，适合命理解读',
    icon: 'Sparkles',
  },
  {
    id: 'analytical',
    name: '分析理性',
    description: '逻辑清晰、数据驱动的语气，适合数据分析',
    icon: 'BarChart3',
  },
];

export default function AIToneSettings({
  reminderTone,
  onToneChange,
}: AIToneSettingsProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>AI语气设置</CardTitle>
        <CardDescription>
          选择AI助手的回答风格和语气
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={reminderTone} onValueChange={onToneChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toneOptions.map((option) => (
              <div
                key={option.id}
                className={`relative flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  reminderTone === option.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <SafeIcon name={option.icon} className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{option.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
