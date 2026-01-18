
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

export default function AIReminder() {
  const reminders = [
    {
      id: 'r1',
      type: 'warning',
      title: '断语提醒',
      content: '命主目前处于七杀流年。建议断语应偏向保守稳健，避免过度激励。',
      icon: 'AlertTriangle',
    },
    {
      id: 'r2',
      type: 'info',
      title: '分析建议',
      content: '注意丙火和申金的冲突，可能会导致合作关系破裂。',
      icon: 'Lightbulb',
    },
  ];

  return (
    <div className="border-t bg-card/50 backdrop-blur-sm p-4 space-y-2 max-h-32 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-2">
        <SafeIcon name="Bell" className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold text-muted-foreground">AI提醒</span>
      </div>
      <div className="space-y-2">
        {reminders.map((reminder) => (
          <Card
            key={reminder.id}
            className={`p-2 ${
              reminder.type === 'warning'
                ? 'bg-destructive/10 border-destructive/30'
                : 'bg-primary/10 border-primary/30'
            }`}
          >
            <div className="flex items-start space-x-2">
              <SafeIcon
                name={reminder.icon}
                className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                  reminder.type === 'warning' ? 'text-destructive' : 'text-primary'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{reminder.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {reminder.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
