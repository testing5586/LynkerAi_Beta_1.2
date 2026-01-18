
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';

export default function RecommendedContent() {
  // Mock recommended masters
  const recommendedMasters = [
    {
      id: '1',
      name: '云中子',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      specialty: '八字命理',
      rating: 4.9,
      reviews: 328,
      country: 'CN',
      bio: '20年八字研究经验，擅长流年运势分析',
      price: '¥299/小时',
    },
    {
      id: '2',
      name: '紫微仙子',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      specialty: '紫微斗数',
      rating: 4.8,
      reviews: 256,
      country: 'CN',
      bio: '紫微斗数专家，精通宫位解读',
      price: '¥349/小时',
    },
    {
      id: '3',
      name: '占星大师',
      avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
      specialty: '西方占星',
      rating: 4.7,
      reviews: 189,
      country: 'US',
      bio: '国际认证占星师，跨文化命理研究',
      price: '$49/小时',
    },
  ];

// Mock trending posts
   const trendingPosts = [
     {
       id: '1',
       title: '喜火人2026年运势预测',
       author: '身强喜火群主',
      category: '八字',
      views: 2543,
      likes: 456,
      comments: 89,
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/c9279bbd-45da-4f61-8df1-86ceda4aca30.png',
    },
{
       id: '2',
       title: '杀破狼的财运密码',
       author: '紫微专家',
      category: '紫微',
      views: 1876,
      likes: 342,
      comments: 67,
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/aff1b44d-44ed-4bbf-ac8c-038d749cc2cb.png',
    },
    {
      id: '3',
      title: '水星逆行期间的人际关系指南',
      author: '占星师',
      category: '占星',
      views: 1543,
      likes: 287,
      comments: 54,
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/e90e656e-f118-47bb-8357-96d3199d4e06.png',
    },
  ];

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background/80 via-background to-background">
      <div className="container max-w-6xl mx-auto">
        {/* Recommended Masters */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-mystical mb-2">
                推荐命理师
              </h2>
              <p className="text-foreground/70">
                平台认证的专业命理师，为您提供专业咨询服务
              </p>
</div>
           </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedMasters.map((master) => (
              <Card key={master.id} className="glass-card hover:shadow-card transition-all hover:scale-105 group overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <UserAvatar
                      user={{
                        name: master.name,
                        avatar: master.avatar,
                        country: master.country,
                        isPro: true,
                      }}
                      size="large"
                      showHoverCard={false}
                    />
                    <Badge className="bg-accent text-accent-foreground">
                      <SafeIcon name="Star" className="w-3 h-3 mr-1" />
                      {master.rating}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{master.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {master.specialty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80">{master.bio}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{master.reviews} 条评价</span>
                    <span className="font-semibold text-accent">{master.price}</span>
                  </div>
<Button
                    className="w-full bg-mystical-gradient hover:opacity-90"
                    asChild
                  >
                    <a href="./registration-type-selection.html" id="i4rveg">
                      <SafeIcon name="Calendar" className="mr-2 h-4 w-4" />
                      预约咨询
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

{/* Trending Posts */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 id="i36jdp" className="text-3xl md:text-4xl font-bold text-gradient-mystical mb-2">论坛讨论
                </h2>
                <p id="iesgnw" className="text-foreground/70">同频人分享最新的命理话题和经验，同命人一同鼓励一同修命。</p>
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingPosts.map((post) => (
              <Card key={post.id} className="glass-card hover:shadow-card transition-all hover:scale-105 group overflow-hidden cursor-pointer">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-primary/80">
                    {post.category}
                  </Badge>
                </div>

<CardHeader>
                   <CardTitle id={post.id === '1' ? 'i95nwg' : post.id === '2' ? 'i69i59' : undefined} className="text-lg line-clamp-2 group-hover:text-accent transition-colors">
                     {post.title}
                   </CardTitle>
                   <CardDescription id={post.id === '1' ? 'ih5yul' : undefined} className="text-sm">
                     {post.author}
                   </CardDescription>
                 </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <SafeIcon name="Eye" className="w-3 h-3" />
                        <span>{post.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <SafeIcon name="Heart" className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <SafeIcon name="MessageCircle" className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
