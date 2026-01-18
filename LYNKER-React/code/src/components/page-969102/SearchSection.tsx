
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';

export default function SearchSection() {
  const [baziSearch, setBaziSearch] = useState('');
  const [ziweiSearch, setZiweiSearch] = useState('');

  const handleBaziSearch = () => {
    if (baziSearch.trim()) {
      window.location.href = `./homology-match-discovery.html?type=bazi&query=${encodeURIComponent(baziSearch)}`;
    }
  };

  const handleZiweiSearch = () => {
    if (ziweiSearch.trim()) {
      window.location.href = `./homology-match-discovery.html?type=ziwei&query=${encodeURIComponent(ziweiSearch)}`;
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            发现您的同命人
          </h2>
          <p className="text-lg text-foreground/70">
            通过八字或紫微命盘搜索，找到与您命运相同的灵魂同频者
          </p>
        </div>

        {/* Search Tabs */}
        <Tabs defaultValue="bazi" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 glass">
            <TabsTrigger value="bazi" className="flex items-center space-x-2">
              <SafeIcon name="Calendar" className="w-4 h-4" />
              <span>八字同频搜索</span>
            </TabsTrigger>
            <TabsTrigger value="ziwei" className="flex items-center space-x-2">
              <SafeIcon name="Compass" className="w-4 h-4" />
              <span>紫微同频搜索</span>
            </TabsTrigger>
          </TabsList>

          {/* Bazi Search */}
          <TabsContent value="bazi" className="space-y-4">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="Calendar" className="w-5 h-5 text-primary" />
                  <span>八字命盘共振搜索</span>
                </CardTitle>
                <CardDescription>
                  输入您的出生日期和时辰，系统将为您匹配八字格局相似的用户
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">出生日期</label>
                    <Input
                      type="date"
                      placeholder="选择出生日期"
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">出生时辰</label>
                    <Input
                      type="time"
                      placeholder="选择出生时辰"
                      className="glass"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">搜索关键词（可选）</label>
                  <Input
                    placeholder="如：同年月日柱、同格局、同用神..."
                    value={baziSearch}
                    onChange={(e) => setBaziSearch(e.target.value)}
                    className="glass"
                  />
                </div>
                <Button
                  onClick={handleBaziSearch}
                  className="w-full bg-mystical-gradient hover:opacity-90 text-white"
                >
                  <SafeIcon name="Search" className="mr-2 h-4 w-4" />
                  开始搜索同命人
                </Button>
              </CardContent>
            </Card>

            {/* Bazi Info */}
            <Card className="glass-card border-primary/10">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>同年同月同日（默认）</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>同时辰</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>同天干结构</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>同地支结构</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ziwei Search */}
          <TabsContent value="ziwei" className="space-y-4">
            <Card className="glass-card border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SafeIcon name="Compass" className="w-5 h-5 text-accent" />
                  <span>紫微星盘同频搜索</span>
                </CardTitle>
                <CardDescription>
                  输入您的出生信息，系统将为您匹配紫微命宫主星相似的用户
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">出生日期</label>
                    <Input
                      type="date"
                      placeholder="选择出生日期"
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">出生时辰</label>
                    <Input
                      type="time"
                      placeholder="选择出生时辰"
                      className="glass"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">搜索关键词（可选）</label>
                  <Input
                    placeholder="如：同命宫主星、同双星组合、同格局..."
                    value={ziweiSearch}
                    onChange={(e) => setZiweiSearch(e.target.value)}
                    className="glass"
                  />
                </div>
                <Button
                  onClick={handleZiweiSearch}
                  className="w-full bg-mystical-gradient hover:opacity-90 text-white"
                >
                  <SafeIcon name="Search" className="mr-2 h-4 w-4" />
                  开始搜索同命人
                </Button>
              </CardContent>
            </Card>

            {/* Ziwei Info */}
            <Card className="glass-card border-accent/10">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>同命宫主星（默认）</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>同双星组合（默认）</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>同格局</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon name="Check" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>三方四正同星</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
