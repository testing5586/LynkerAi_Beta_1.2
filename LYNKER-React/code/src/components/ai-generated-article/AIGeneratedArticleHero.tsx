
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface AIGeneratedArticleHeroProps {}

export default function AIGeneratedArticleHero({}: AIGeneratedArticleHeroProps) {
  const article = {
    id: 'AI_ARTICLE_001',
    title: '金木交战在现代都市人群中的命理规律验证',
    subtitle: '基于大数据分析的八字格局应验研究',
    category: '八字研究',
    generatedDate: '2024-01-15',
    readTime: '8分钟',
    viewCount: 2847,
    discussionCount: 156,
    aiModel: 'LynkerAI-v2.1',
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-12 md:py-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
          <a href="./forum-homepage.html" className="hover:text-foreground transition-colors">
            论坛
          </a>
          <SafeIcon name="ChevronRight" className="w-4 h-4" />
          <span>AI生成文章</span>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl">
          {/* Category & AI Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {article.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <SafeIcon name="Sparkles" className="w-3 h-3" />
              AI生成
            </Badge>
            <Badge variant="outline" className="text-xs">
              {article.aiModel}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical leading-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-6">
            {article.subtitle}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <SafeIcon name="Calendar" className="w-4 h-4" />
              <span>{new Date(article.generatedDate).toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="Clock" className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="Eye" className="w-4 h-4" />
              <span>{article.viewCount.toLocaleString()} 次阅读</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="MessageSquare" className="w-4 h-4" />
              <span>{article.discussionCount} 条讨论</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-mystical-gradient hover:opacity-90"
            >
              <a href="./forum-post-detail.html">
                <SafeIcon name="MessageSquare" className="mr-2 h-4 w-4" />
                进入讨论
              </a>
            </Button>
            <Button variant="outline">
              <SafeIcon name="Share2" className="mr-2 h-4 w-4" />
              分享文章
            </Button>
            <Button variant="outline">
              <SafeIcon name="Bookmark" className="mr-2 h-4 w-4" />
              收藏
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
