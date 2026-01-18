
import { useState } from 'react';
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

interface ProphecyValidationMarkersProps {
  markers: ProphecyMarker[];
}

export default function ProphecyValidationMarkers({
  markers,
}: ProphecyValidationMarkersProps) {
  const [statuses, setStatuses] = useState<Record<number, string>>(
    markers.reduce((acc, _, idx) => ({ ...acc, [idx]: markers[idx].validationStatus }), {})
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已应验':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '部分应验':
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
      case '部分应验':
        return 'AlertCircle';
      case '未应验':
        return 'XCircle';
      case '待验证':
        return 'HelpCircle';
      default:
        return 'Circle';
    }
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    setStatuses((prev) => ({ ...prev, [index]: newStatus }));
    // In real app, would save to backend
  };

  return (
    <div className="space-y-4">
      {markers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <SafeIcon name="Info" className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>暂无预言应验标记</p>
        </div>
      ) : (
        markers.map((marker, index) => (
          <Card key={index} className="glass-card border-primary/10 p-4">
            <div className="space-y-3">
              {/* Prophecy Text */}
              <div>
                <p className="text-foreground font-medium">{marker.prophecy}</p>
              </div>

              {/* Status and Date Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">预期日期：</span>
                  <Badge variant="outline" className="bg-muted/50">
                    {marker.expectedDate === 'N/A' ? '长期观察' : marker.expectedDate}
                  </Badge>
                </div>

                {/* Status Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">应验状态：</span>
                  <Select
                    value={statuses[index] || marker.validationStatus}
                    onValueChange={(value) => handleStatusChange(index, value)}
                  >
                    <SelectTrigger className="w-32 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="已应验">
                        <div className="flex items-center space-x-2">
                          <SafeIcon name="CheckCircle2" className="h-4 w-4 text-green-400" />
                          <span>已应验</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="部分应验">
                        <div className="flex items-center space-x-2">
                          <SafeIcon name="AlertCircle" className="h-4 w-4 text-yellow-400" />
                          <span>部分应验</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="未应验">
                        <div className="flex items-center space-x-2">
                          <SafeIcon name="XCircle" className="h-4 w-4 text-red-400" />
                          <span>未应验</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="待验证">
                        <div className="flex items-center space-x-2">
                          <SafeIcon name="HelpCircle" className="h-4 w-4 text-blue-400" />
                          <span>待验证</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={`border ${getStatusColor(statuses[index] || marker.validationStatus)}`}
                >
                  <SafeIcon
                    name={getStatusIcon(statuses[index] || marker.validationStatus)}
                    className="mr-1 h-3 w-3"
                  />
                  {statuses[index] || marker.validationStatus}
                </Badge>
              </div>
            </div>
          </Card>
        ))
      )}

      {/* Summary Stats */}
      {markers.length > 0 && (
        <Card className="glass-card border-accent/20 bg-accent/5 p-4 mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {Object.values(statuses).filter((s) => s === '已应验').length}
              </p>
              <p className="text-xs text-muted-foreground">已应验</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {Object.values(statuses).filter((s) => s === '部分应验').length}
              </p>
              <p className="text-xs text-muted-foreground">部分应验</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">
                {Object.values(statuses).filter((s) => s === '未应验').length}
              </p>
              <p className="text-xs text-muted-foreground">未应验</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {Object.values(statuses).filter((s) => s === '待验证').length}
              </p>
              <p className="text-xs text-muted-foreground">待验证</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
