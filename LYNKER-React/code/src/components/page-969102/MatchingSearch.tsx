
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';

export default function MatchingSearch() {
  const [activeTab, setActiveTab] = useState('bazi');

  const matchingOptions = {
    bazi: {
      title: '八字同频搜索',
      description: '基于出生年月日时的八字命盘，找到与您格局相似的灵魂',
      icon: 'Calendar',
      filters: [
        { label: '同年同月同日（默认）', checked: true },
        { label: '同时辰', checked: false },
        { label: '同小时', checked: false },
        { label: '同刻', checked: false },
        { label: '同分', checked: false },
      ],
      advancedFilters: [
        { label: '同年月日柱', checked: true },
        { label: '同时柱', checked: false },
        { label: '同天干结构', checked: false },
        { label: '同地支结构', checked: false },
        { label: '同格局', checked: false },
        { label: '同用神', checked: false },
      ],
    },
    ziwei: {
      title: '紫微同频搜索',
      description: '基于紫微斗数命盘，发现与您星盘相似的人生同行者',
      icon: 'Star',
      filters: [
        { label: '同命宫主星（默认）', checked: true },
        { label: '同双星组合（默认）', checked: true },
        { label: '同格局（系统自动识别）', checked: false },
        { label: '三方四正同星', checked: false },
        { label: '自定义星曜+宫位', checked: false },
      ],
    },
    astro: {
      title: '占星同频搜索',
      description: '基于西方占星学，匹配太阳星座、月亮星座等关键信息',
      icon: 'Moon',
      filters: [
        { label: '同太阳星座', checked: true },
        { label: '同月亮星座', checked: false },
        { label: '同上升星座', checked: false },
        { label: '同金星星座', checked: false },
        { label: '同火星星座', checked: false },
      ],
    },
  };

  const currentTab = matchingOptions[activeTab as keyof typeof matchingOptions];

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-background/80">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            同命匹配搜索
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            多维度命理分析，精准匹配与您命盘相似的灵魂同频者
          </p>
        </div>

        {/* Matching Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="bazi" className="flex items-center space-x-2">
              <SafeIcon name="Calendar" className="w-4 h-4" />
              <span className="hidden sm:inline">八字</span>
            </TabsTrigger>
            <TabsTrigger value="ziwei" className="flex items-center space-x-2">
              <SafeIcon name="Star" className="w-4 h-4" />
              <span className="hidden sm:inline">紫微</span>
            </TabsTrigger>
            <TabsTrigger value="astro" className="flex items-center space-x-2">
              <SafeIcon name="Moon" className="w-4 h-4" />
              <span className="hidden sm:inline">占星</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          {Object.entries(matchingOptions).map(([key, option]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <Card className="glass-card border-accent/30">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-mystical-gradient flex items-center justify-center glow-primary">
                      <SafeIcon name={option.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{option.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {option.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Time Filters */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center space-x-2">
                      <SafeIcon name="Clock" className="w-4 h-4 text-accent" />
                      <span>时间维度</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {option.filters.map((filter, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={filter.checked}
                            className="w-4 h-4 rounded accent-primary"
                          />
                          <span className="text-sm">{filter.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  {option.advancedFilters && (
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center space-x-2">
                        <SafeIcon name="Settings" className="w-4 h-4 text-accent" />
                        <span>高级筛选</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {option.advancedFilters.map((filter, idx) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={filter.checked}
                              className="w-4 h-4 rounded accent-primary"
                            />
                            <span className="text-sm">{filter.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

{/* CTA Button */}
                   <div className="pt-4 flex gap-4">
 <Button
                       size="lg"
                       className="bg-mystical-gradient hover:opacity-90 flex-1"
                       asChild
                     >
 <a href="./registration-type-selection.html" id="iw53aj">
                         <SafeIcon name="Search" className="mr-2 h-5 w-5" />
                         开始搜索
                       </a>
                     </Button>
                     <Button
                       size="lg"
                       variant="outline"
                       asChild
                     >
                       <a href="./registration-type-selection.html" id="i4ohqd">
                         <SafeIcon name="User" className="mr-2 h-5 w-5" />
                         完善资料
                       </a>
                     </Button>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-lg border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <div className="flex items-start space-x-4">
            <SafeIcon name="Info" className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">💡 匹配算法说明</h4>
              <p className="text-sm text-foreground/80">
                灵客AI采用多维度命理分析算法，综合考虑八字、紫微、占星等多个维度，为您精准匹配相似度最高的用户。所有匹配结果均基于用户授权的真实命盘数据，确保准确性和隐私安全。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
