
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

interface RecommendedPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    isPro: boolean;
  };
  category: string;
  votes: number;
  timestamp: string;
  href: string;
}

interface RecommendedMaster {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  href: string;
}

export default function RecommendedContentSection() {
  // Mock recommended posts
  const recommendedPosts: RecommendedPost[] = [
    {
      id: '1',
      title: '2025年丁火身强人的运势预测',
      excerpt: '通过八字分析，为丁火身强的朋友们详细解读2025年的整体运势走向...',
      author: {
        name: '灵客命理师',
        avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
        isPro: true,
      },
      category: '八字',
      votes: 342,
      timestamp: '2天前',
      href: './forum-post-detail.html',
    },
    {
      id: '2',
      title: '紫薇命盘中的财帛宫解读',
      excerpt: '深入探讨紫薇斗数中财帛宫的含义，以及如何通过命盘优化财运...',
      author: {
        name: '紫薇研究者',
        avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
        isPro: true,
      },
      category: '紫薇',
      votes: 218,
      timestamp: '5天前',
      href: './forum-post-detail.html',
    },
    {
      id: '3',
      title: '占星学中的月亮星座与情感关系',
      excerpt: '月亮星座如何影响我们的情感需求和人际关系，以及如何利用这一知识...',
      author: {
        name: '占星爱好者',
        avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
        isPro: false,
      },
      category: '占星',
      votes: 156,
      timestamp: '1周前',
      href: './forum-post-detail.html',
    },
  ];

  // Mock recommended masters
  const recommendedMasters: RecommendedMaster[] = [
    {
      id: '1',
      name: '李大师',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      specialty: '八字、紫薇、占星',
      rating: 4.9,
      reviews: 342,
      price: 299,
      href: './master-profile.html',
    },
    {
      id: '2',
      name: '王命理师',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      specialty: '紫薇斗数专家',
      rating: 4.8,
      reviews: 287,
      price: 399,
      href: './master-profile.html',
    },
    {
      id: '3',
      name: '张老师',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      specialty: '八字命理、风水',
      rating: 4.7,
      reviews: 215,
      price: 249,
      href: './master-profile.html',
    },
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-mystical">
            推荐内容
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            发现最新的命理知识和热门讨论
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recommended Posts - 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">热门讨论</h3>
              <Button variant="ghost" asChild>
                <a href="./forum-homepage.html">
                  查看全部
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              {recommendedPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  className="block group"
                >
                  <Card className="glass-card border-accent/20 hover:border-accent/50 transition-all hover:shadow-card">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {post.timestamp}
                            </span>
                          </div>
                          <CardTitle className="group-hover:text-accent transition-colors">
                            {post.title}
                          </CardTitle>
                        </div>
                        <SafeIcon name="TrendingUp" className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserAvatar
                            user={{
                              name: post.author.name,
                              avatar: post.author.avatar,
                              isPro: post.author.isPro,
                            }}
                            size="small"
                            showHoverCard={false}
                          />
                          <span className="text-sm font-medium">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <SafeIcon name="ThumbsUp" className="h-4 w-4" />
                          {post.votes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Recommended Masters - 1 column */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">推荐命理师</h3>
              <Button variant="ghost" asChild>
                <a href="./master-list.html">
                  全部
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              {recommendedMasters.map((master) => (
                <a
                  key={master.id}
                  href={master.href}
                  className="block group"
                >
                  <Card className="glass-card border-accent/20 hover:border-accent/50 transition-all hover:shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <UserAvatar
                          user={{
                            name: master.name,
                            avatar: master.avatar,
                            isPro: true,
                          }}
                          size="large"
                          showHoverCard={false}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold group-hover:text-accent transition-colors">
                            {master.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {master.specialty}
                          </p>
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <SafeIcon
                                  key={i}
                                  name="Star"
                                  className={`h-3 w-3 ${
                                    i < Math.floor(master.rating)
                                      ? 'text-accent fill-accent'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {master.rating} ({master.reviews})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-accent">
                              ¥{master.price}/小时
                            </span>
                            <SafeIcon name="ChevronRight" className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 border border-accent/30 p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              准备好开启您的命理之旅了吗？
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              加入全球数万名用户，发现您的同命人，获得专业的命理指导
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-mystical-gradient hover:opacity-90 text-white font-semibold"
                asChild
              >
                <a href="./prognosis-service-entry.html">
                  <SafeIcon name="Wand2" className="mr-2 h-5 w-5" />
                  开始咨询
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/50 hover:bg-accent/10"
                asChild
              >
                <a href="./homology-match-discovery.html">
                  <SafeIcon name="Users" className="mr-2 h-5 w-5" />
                  发现同命人
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
