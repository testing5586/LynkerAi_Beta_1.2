
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import type { PrognosisInputModel } from '@/data/prognosis_pan';

interface BirthtimeInputPanelProps {
  input: PrognosisInputModel;
  onChange: (input: PrognosisInputModel) => void;
}

export default function BirthtimeInputPanel({ input, onChange }: BirthtimeInputPanelProps) {
  const [activeTab, setActiveTab] = useState('manual');
  const [ocrImage, setOcrImage] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...input,
      birthDate: e.target.value,
    });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hour = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
    onChange({
      ...input,
      birthTimeHour: hour,
    });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minute = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    onChange({
      ...input,
      birthTimeMinute: minute,
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...input,
      birthLocation: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOcrImage(event.target?.result as string);
        // In real app, would call OCR API here
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <SafeIcon name="Clock" className="h-5 w-5 text-accent" />
        <span>出生时辰输入</span>
      </h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="manual">手动输入</TabsTrigger>
          <TabsTrigger value="ocr">导入排盘图</TabsTrigger>
        </TabsList>

        {/* Manual Input Tab */}
        <TabsContent value="manual" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium">
                出生日期
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={input.birthDate}
                onChange={handleDateChange}
                className="bg-background/50"
              />
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <Label htmlFor="birthLocation" className="text-sm font-medium">
                出生地点
              </Label>
              <Input
                id="birthLocation"
                type="text"
                placeholder="例：中国 湖北 武汉"
                value={input.birthLocation}
                onChange={handleLocationChange}
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Time Input */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">出生时刻</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label htmlFor="hour" className="text-xs text-muted-foreground">
                  小时
                </Label>
                <Input
                  id="hour"
                  type="number"
                  min="0"
                  max="23"
                  value={String(input.birthTimeHour).padStart(2, '0')}
                  onChange={handleHourChange}
                  className="bg-background/50 text-center text-lg font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minute" className="text-xs text-muted-foreground">
                  分钟
                </Label>
                <Input
                  id="minute"
                  type="number"
                  min="0"
                  max="59"
                  value={String(input.birthTimeMinute).padStart(2, '0')}
                  onChange={handleMinuteChange}
                  className="bg-background/50 text-center text-lg font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">时辰</Label>
                <div className="bg-background/50 rounded-md p-2 flex items-center justify-center h-10 text-sm font-medium">
                  {getChineseHour(input.birthTimeHour)}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">天干地支</Label>
                <div className="bg-background/50 rounded-md p-2 flex items-center justify-center h-10 text-sm font-medium">
                  {getHourStem(input.birthTimeHour)}
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-mystical-gradient hover:opacity-90">
            <SafeIcon name="Zap" className="h-4 w-4 mr-2" />
            开始分析
          </Button>
        </TabsContent>

        {/* OCR Tab */}
        <TabsContent value="ocr" className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="ocrInput"
            />
            <label htmlFor="ocrInput" className="cursor-pointer block">
              {ocrImage ? (
                <div className="space-y-4">
                  <img
                    src={ocrImage}
                    alt="Uploaded chart"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    点击重新上传或拖拽新图片
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <SafeIcon name="Upload" className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="font-medium">上传排盘图片</p>
                    <p className="text-sm text-muted-foreground">
                      支持八字、紫微、占星等各门派排盘图
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium flex items-center space-x-2">
              <SafeIcon name="Info" className="h-4 w-4" />
              <span>支持的排盘类型</span>
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
              <li>• 八字排盘（天干地支）</li>
              <li>• 紫微斗数盘</li>
              <li>• 西方占星盘</li>
              <li>• 其他命理排盘</li>
            </ul>
          </div>

          <Button className="w-full bg-mystical-gradient hover:opacity-90" disabled={!ocrImage}>
            <SafeIcon name="Zap" className="h-4 w-4 mr-2" />
            OCR识别并分析
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function getChineseHour(hour: number): string {
  const hours = [
    '子', '丑', '寅', '卯', '辰', '巳',
    '午', '未', '申', '酉', '戌', '亥'
  ];
  return hours[Math.floor(hour / 2) % 12];
}

function getHourStem(hour: number): string {
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  
  const branchIndex = Math.floor(hour / 2) % 12;
  // Simplified stem calculation (would need actual date for accurate calculation)
  const stemIndex = (hour % 10);
  
  return stems[stemIndex] + branches[branchIndex];
}
