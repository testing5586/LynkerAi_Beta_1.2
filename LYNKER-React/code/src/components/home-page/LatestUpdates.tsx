
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import { MOCK_FORUM_POSTS } from '@/data/forum';
import { MOCK_MASTERS } from '@/data/user';

export default function LatestUpdates() {
  // Get latest posts and articles
  const latestPosts = MOCK_FORUM_POSTS.slice(0, 3);
  
  // Get featured masters
  const featuredMasters = MOCK_MASTERS.slice(0, 3);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            最新动态
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            社区热议话题与专家见解，与全球命理爱好者共同探索命运奥秘
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest Forum Posts */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <SafeIcon name="MessageSquare" className="h-6 w-6 text-accent" />
                论坛热议
              </h3>
              <Button variant="ghost" size="sm" asChild>
                <a href="./forum-homepage.html">
                  查看全部
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              {latestPosts.map((post) => (
                <Card key={post.postId} className="glass-card hover:border-primary/50 transition-all group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <a href="./forum-post-detail.html" className="block group-hover:text-primary transition-colors">
                          <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                        </a>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <SafeIcon name="User" className="h-4 w-4" />
                            {post.authorAlias}
                          </span>
                          <span className="flex items-center gap-1">
                            <SafeIcon name="Calendar" className="h-4 w-4" />
                            {post.date}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Vote Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent">{post.accurateVotes}</div>
                          <div className="text-xs text-muted-foreground">准</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-destructive">{post.inaccurateVotes}</div>
                          <div className="text-xs text-muted-foreground">不准</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Masters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <SafeIcon name="Crown" className="h-6 w-6 text-accent" />
                推荐命理师
              </h3>
            </div>

            <div className="space-y-4">
              {featuredMasters.map((master) => (
                <Card key={master.masterId} className="glass-card hover:border-primary/50 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <UserAvatar
                        user={{
                          name: master.alias,
                          avatar: master.avatarUrl,
                          country: master.geoTag.flagIcon,
                          isPro: true,
                        }}
                        size="default"
                        showHoverCard={false}
                      />
                      <div className="flex-1 min-w-0">
                        <a href="./master-profile.html" className="block group-hover:text-primary transition-colors">
                          <h4 className="font-semibold truncate">{master.alias}</h4>
                        </a>
                        <p className="text-xs text-muted-foreground truncate">{master.expertise}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon
                            key={i}
                            name="Star"
                            className={`h-3 w-3 ${i < Math.floor(master.rating) ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold">{master.rating}</span>
                      <span className="text-xs text-muted-foreground">({master.serviceCount})</span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-accent">
                        ¥{master.priceMin}起
                      </span>
                      <Button size="sm" variant="outline" asChild>
                        <a href="./master-profile.html">
                          <SafeIcon name="Calendar" className="h-3 w-3 mr-1" />
                          预约
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Browse All Masters */}
            <Button className="w-full bg-mystical-gradient hover:opacity-90" asChild>
              <a href="./master-list.html">
                <SafeIcon name="Users" className="mr-2 h-4 w-4" />
                浏览全部命理师
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
