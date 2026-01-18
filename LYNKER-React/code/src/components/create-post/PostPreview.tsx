
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  images: string[];
  isArticle: boolean;
}

interface PostPreviewProps {
  postData: PostData;
  userName: string;
  userAvatar: string;
  isPro: boolean;
}

const categoryLabels: Record<string, string> = {
  general: '综合讨论',
  bazi: '八字命理',
  ziwei: '紫微斗数',
  astrology: '占星学',
  experience: '经验分享',
  question: '问题求助',
  research: '研究探讨',
};

const categoryColors: Record<string, string> = {
  general: 'bg-blue-500/20 text-blue-400',
  bazi: 'bg-purple-500/20 text-purple-400',
  ziwei: 'bg-pink-500/20 text-pink-400',
  astrology: 'bg-yellow-500/20 text-yellow-400',
  experience: 'bg-green-500/20 text-green-400',
  question: 'bg-orange-500/20 text-orange-400',
  research: 'bg-indigo-500/20 text-indigo-400',
};

export default function PostPreview({
  postData,
  userName,
  userAvatar,
  isPro,
}: PostPreviewProps) {
  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    let html = text
      .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-background/50 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>')
      .replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-2 text-muted-foreground italic">$1</blockquote>')
      .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li>.*?<\/li>)/s, '<ul class="list-disc space-y-1">$1</ul>')
      .replace(/\n\n/g, '</p><p class="my-4">');

    return `<p class="my-4">${html}</p>`;
  };

  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <Card className="glass-card border-primary/20 overflow-hidden">
        {/* Header */}
        <CardHeader className="border-b border-primary/10 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={categoryColors[postData.category] || 'bg-primary/20'}>
                  {categoryLabels[postData.category] || '综合讨论'}
                </Badge>
                {postData.isArticle && (
                  <Badge className="bg-accent/20 text-accent">
                    <SafeIcon name="Crown" className="h-3 w-3 mr-1" />
                    专业文章
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold mb-2">
                {postData.title || '（未输入标题）'}
              </h1>
            </div>
          </div>
        </CardHeader>

        {/* Author Info */}
        <CardContent className="pt-6 pb-4 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{userName}</span>
                  {isPro && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                      <SafeIcon name="Crown" className="h-3 w-3" />
                      Pro命理师
                    </span>
                  )}
                </div>
<p className="text-sm text-muted-foreground">
                  刚刚
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>浏览: 0</p>
              <p>评论: 0</p>
            </div>
          </div>
        </CardContent>

        {/* Content */}
        <CardContent className="pt-6">
          {postData.content ? (
            <div
              className="prose prose-invert max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(postData.content),
              }}
            />
          ) : (
            <p className="text-muted-foreground italic">（内容预览）</p>
          )}

          {/* Images */}
          {postData.images.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">图片</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`图片 ${index + 1}`}
                    className="w-full h-auto rounded-lg border border-primary/20 object-cover max-h-96"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {postData.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {postData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/20">
                  <SafeIcon name="Hash" className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardContent className="pt-4 border-t border-primary/10 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <SafeIcon name="ThumbsUp" className="h-4 w-4" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <SafeIcon name="MessageCircle" className="h-4 w-4" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <SafeIcon name="Share2" className="h-4 w-4" />
              <span>分享</span>
            </button>
          </div>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            <SafeIcon name="Bookmark" className="h-4 w-4" />
            <span>收藏</span>
          </button>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">预览提示</p>
              <p>
                这是您的帖子在论坛中的显示效果预览。提交后，内容将进入审核队列，审核通过后将在论坛中发布。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
