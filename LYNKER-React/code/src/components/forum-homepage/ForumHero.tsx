
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface ForumHeroProps {
  onSearch: (query: string) => void;
}

export default function ForumHero({ onSearch }: ForumHeroProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch('');
  };

  return (
    <div className="relative bg-gradient-to-b from-primary/20 via-secondary/10 to-background border-b border-border overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-mystical">灵客论坛</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            同命相知的社区。在这里分享命理见解、验证预言、发现同频灵友。
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center">
              <SafeIcon
                name="Search"
                className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none"
              />
              <Input
                type="text"
                placeholder="搜索帖子、话题、用户..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 pr-12 py-3 text-base bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SafeIcon name="X" className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['八字', '紫微', '占星', '面相', '风水'].map((tag) => (
              <button
                key={tag}
                onClick={() => onSearch(tag)}
                className="px-3 py-1 rounded-full text-sm bg-muted hover:bg-primary/20 text-muted-foreground hover:text-foreground transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
