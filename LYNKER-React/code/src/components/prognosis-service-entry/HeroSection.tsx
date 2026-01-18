
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to master list with search query
      window.location.href = `./master-list.html?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-gradient-mystical leading-tight">
            探寻命运的奥秘
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            与专业命理师连接，通过八字、紫微、占星等多维度分析，发现属于您的人生轨迹
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="搜索命理师名字、专长或服务类型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 pl-4 pr-12 bg-card border-primary/30 focus:border-primary"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <SafeIcon name="Search" className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <Button
            onClick={() => window.location.href = './master-list.html'}
            className="h-12 bg-mystical-gradient hover:opacity-90 px-8"
          >
            浏览全部命理师
            <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => window.location.href = './master-list.html?type=bazi'}
            className="border-primary/30 hover:bg-primary/10"
          >
            <SafeIcon name="BarChart3" className="mr-2 h-4 w-4" />
            八字命理
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = './master-list.html?type=ziwei'}
            className="border-primary/30 hover:bg-primary/10"
          >
            <SafeIcon name="Star" className="mr-2 h-4 w-4" />
            紫微斗数
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = './master-list.html?type=astrology'}
            className="border-primary/30 hover:bg-primary/10"
          >
            <SafeIcon name="Compass" className="mr-2 h-4 w-4" />
            西方占星
          </Button>
        </div>
      </div>
    </section>
  );
}
