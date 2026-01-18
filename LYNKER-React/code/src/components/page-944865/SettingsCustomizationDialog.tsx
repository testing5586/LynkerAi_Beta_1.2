import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface SettingsCustomizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsCustomizationDialog({
  open,
  onOpenChange,
}: SettingsCustomizationDialogProps) {
  const [fontSize, setFontSize] = useState(16);
  const [displayDensity, setDisplayDensity] = useState<'compact' | 'normal' | 'comfortable'>('normal');
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('dark');

  const handleSaveSettings = () => {
    // Save settings to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('appSettings', JSON.stringify({
        fontSize,
        displayDensity,
        enableAnimations,
        themeMode,
      }));
    }
    // Apply font size immediately
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = `${fontSize}px`;
    }
    onOpenChange(false);
  };

  const fontSizeOptions = [
    { label: '小', value: 14, preview: 'text-sm' },
    { label: '标准', value: 16, preview: 'text-base' },
    { label: '大', value: 18, preview: 'text-lg' },
    { label: '特大', value: 20, preview: 'text-xl' },
  ];

  const densityOptions = [
    { label: '紧凑', value: 'compact' as const, icon: 'Minimize' },
    { label: '标准', value: 'normal' as const, icon: 'Maximize' },
    { label: '舒适', value: 'comfortable' as const, icon: 'Maximize2' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <SafeIcon name="Settings" className="w-5 h-5" />
            <div>
              <DialogTitle>个性化设置</DialogTitle>
              <DialogDescription>
                自定义字体大小、布局和其他界面偏好
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="display" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="display" className="flex items-center gap-2">
              <SafeIcon name="Eye" className="w-4 h-4" />
              <span className="hidden sm:inline">显示</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <SafeIcon name="Palette" className="w-4 h-4" />
              <span className="hidden sm:inline">主题</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <SafeIcon name="Sliders" className="w-4 h-4" />
              <span className="hidden sm:inline">高级</span>
            </TabsTrigger>
          </TabsList>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6 pt-4">
            {/* Font Size */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <SafeIcon name="Type" className="w-4 h-4" />
                  字体大小
                </label>
                <div className="space-y-3">
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">12px</span>
                    <span className="text-sm font-medium text-foreground">{fontSize}px</span>
                    <span className="text-xs text-muted-foreground">24px</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {fontSizeOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`p-3 cursor-pointer transition-all ${
                        fontSize === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => setFontSize(option.value)}
                    >
                      <div className="text-center space-y-2">
                        <p className={`${option.preview}`}>示例</p>
                        <p className="text-xs text-muted-foreground">{option.label}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Display Density */}
            <div className="space-y-3 pt-4 border-t border-border/50">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <SafeIcon name="Maximize" className="w-4 h-4" />
                布局密度
              </label>
              <div className="grid grid-cols-3 gap-3">
                {densityOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      displayDensity === option.value
                        ? 'border-accent bg-accent/10'
                        : 'border-border/50 hover:border-border'
                    }`}
                    onClick={() => setDisplayDensity(option.value)}
                  >
                    <SafeIcon name={option.icon} className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm font-medium">{option.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Theme Settings */}
          <TabsContent value="theme" className="space-y-6 pt-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <SafeIcon name="Moon" className="w-4 h-4" />
                主题模式
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '浅色', value: 'light' as const, icon: 'Sun' },
                  { label: '深色', value: 'dark' as const, icon: 'Moon' },
                  { label: '自动', value: 'auto' as const, icon: 'Zap' },
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      themeMode === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-border'
                    }`}
                    onClick={() => setThemeMode(option.value)}
                  >
                    <SafeIcon name={option.icon} className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm font-medium">{option.label}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-3 rounded bg-muted/50 text-sm text-muted-foreground">
              <p>• 浅色：适合明亮环境中使用</p>
              <p>• 深色：减少眼睛疲劳，适合夜间使用</p>
              <p>• 自动：根据系统设置自动切换</p>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-2">
                  <SafeIcon name="Zap" className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">启用动画效果</p>
                    <p className="text-xs text-muted-foreground">界面切换时的过渡动画</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEnableAnimations(!enableAnimations)}
                  className={enableAnimations ? 'bg-primary/10 border-primary' : ''}
                >
                  {enableAnimations ? '启用' : '禁用'}
                </Button>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <SafeIcon name="Info" className="w-4 h-4" />
                  关于
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 灵客AI v1.4.0</p>
                  <p>• 个性化设置自动保存</p>
                  <p>• 更改会对所有页面生效</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t border-border/50">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            className="flex-1 bg-mystical-gradient hover:opacity-90"
            onClick={handleSaveSettings}
          >
            <SafeIcon name="Save" className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}