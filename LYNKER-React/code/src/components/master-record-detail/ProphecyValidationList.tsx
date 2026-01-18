
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';

interface ProphecyMarker {
  prophecy: string;
  expectedDate: string;
  validationStatus: '已应验' | '未应验' | '部分应验' | '待验证';
}

interface ProphecyValidationListProps {
  prophecies: ProphecyMarker[];
  onUpdateStatus: (index: number, status: string) => void;
}

export default function ProphecyValidationList({
  prophecies,
  onUpdateStatus,
}: ProphecyValidationListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '已应验':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '应验中':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case '未应验':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case '待验证':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已应验':
        return 'CheckCircle2';
      case '应验中':
        return 'Clock';
      case '未应验':
        return 'XCircle';
      case '待验证':
        return 'HelpCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-4">
      {prophecies.map((prophecy, index) => (
        <Card key={index} className="glass-card p-4">
          <div className="space-y-4">
            {/* Prophecy Text */}
            <div>
              <h4 className="font-semibold mb-2">预言 #{index + 1}</h4>
              <p className="text-muted-foreground">{prophecy.prophecy}</p>
            </div>

            {/* Expected Date */}
            <div className="flex items-center space-x-2 text-sm">
              <SafeIcon name="Calendar" className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                预期应验日期：
                {prophecy.expectedDate === 'N/A' ? '长期观察' : prophecy.expectedDate}
              </span>
            </div>

            {/* Status Update */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={`${getStatusColor(prophecy.validationStatus)} border`}>
                  <SafeIcon
                    name={getStatusIcon(prophecy.validationStatus)}
                    className="mr-1 h-3 w-3"
                  />
                  {prophecy.validationStatus}
                </Badge>
              </div>

              <Select
                value={prophecy.validationStatus}
                onValueChange={(value) => onUpdateStatus(index, value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="待验证">待验证</SelectItem>
                  <SelectItem value="应验中">应验中</SelectItem>
                  <SelectItem value="已应验">已应验</SelectItem>
                  <SelectItem value="未应验">未应验</SelectItem>
                  <SelectItem value="部分应验">部分应验</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes Section */}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">备注（可选）</p>
              <textarea
                className="w-full h-20 p-2 rounded-md bg-muted/50 text-sm text-foreground placeholder-muted-foreground border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="添加关于此预言的备注..."
                defaultValue=""
              />
            </div>
          </div>
        </Card>
      ))}

      {/* Add New Prophecy */}
      <Card className="glass-card p-4 border-dashed">
        <Button
          variant="ghost"
          className="w-full justify-center text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
          添加新预言
        </Button>
      </Card>
    </div>
  );
}
