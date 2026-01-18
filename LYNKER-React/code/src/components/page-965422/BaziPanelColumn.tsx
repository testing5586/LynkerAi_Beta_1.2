
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import TimePicker from './TimePicker';

interface BaziPanelColumnProps {
  panelId: string;
  panelNumber: number;
  hour: number;
  minute: number;
  location: string;
  baziImage: string;
  isSelected: boolean;
  onTimeChange: (panelId: string, hour: number, minute: number) => void;
  onConfirm: (panelId: string) => void;
}

export default function BaziPanelColumn({
  panelId,
  panelNumber,
  hour,
  minute,
  location,
  baziImage,
  isSelected,
  onTimeChange,
  onConfirm,
}: BaziPanelColumnProps) {
  return (
    <Card className={`glass-card p-4 transition-all ${isSelected ? 'ring-2 ring-accent' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">命盘 #{panelNumber}</h3>
        {isSelected && (
          <Badge className="bg-accent text-accent-foreground">
            <SafeIcon name="CheckCircle" className="h-3 w-3 mr-1" />
            已确认
          </Badge>
        )}
      </div>

      {/* Time Picker */}
      <div className="mb-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          出生时辰微调
        </label>
        <TimePicker
          hour={hour}
          minute={minute}
          onChange={(h, m) => onTimeChange(panelId, h, m)}
        />
      </div>

      {/* Bazi Image */}
      <div className="mb-4 rounded-lg overflow-hidden bg-muted aspect-square">
        <img
          src={baziImage}
          alt={`命盘 #${panelNumber}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* OCR Import */}
      <div className="mb-4">
        <Button
          variant="outline"
          className="w-full"
          size="sm"
        >
          <SafeIcon name="Upload" className="mr-2 h-4 w-4" />
          导入排盘贴图 (OCR识别)
        </Button>
      </div>

      {/* Location Info */}
      <div className="mb-4 p-3 rounded-lg bg-muted/50">
        <p className="text-xs text-muted-foreground mb-1">出生地</p>
        <p className="text-sm font-medium">{location}</p>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={() => onConfirm(panelId)}
        className={`w-full ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-mystical-gradient'}`}
        size="sm"
      >
        <SafeIcon name="CheckCircle" className="mr-2 h-4 w-4" />
        {isSelected ? '已确认为真命盘' : '确认为真命盘'}
      </Button>
    </Card>
  );
}
