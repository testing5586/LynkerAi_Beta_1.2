
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';

export default function ProlognosisServiceHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `./master-list.html?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative container mx-auto max-w-4xl">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <SafeIcon name="Sparkles" className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">探索命理智慧</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-mystical">
            命理服务入口
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            连接专业命理师与求知者，通过八字、紫微、占星等多维度解读您的命运轨迹。
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-8">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="搜索命理师名字、专长或服务类型..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-card/50 border-primary/30 focus:border-primary"
              />
              <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <Button type="submit" size="lg" className="bg-mystical-gradient hover:opacity-90">
              搜索
            </Button>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary/30 hover:bg-primary/10"
            >
              <a href="./master-list.html">
                <SafeIcon name="Users" className="mr-2 w-4 h-4" />
                浏览全部命理师
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary/30 hover:bg-primary/10"
            >
              <a href="./master-backend-overview.html">
                <SafeIcon name="LayoutDashboard" className="mr-2 w-4 h-4" />
                命理师后台
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary/30 hover:bg-primary/10"
            >
              <a href="./home-page.html">
                <SafeIcon name="Home" className="mr-2 w-4 h-4" />
                返回首页
              </a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-16 pt-12 border-t border-primary/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <p className="text-sm text-muted-foreground">专业命理师</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">50K+</div>
            <p className="text-sm text-muted-foreground">成功咨询</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">4.8★</div>
            <p className="text-sm text-muted-foreground">平均评分</p>
          </div>
        </div>
      </div>
    </section>
  );
}
