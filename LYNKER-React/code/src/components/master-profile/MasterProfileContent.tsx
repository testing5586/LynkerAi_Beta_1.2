
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_MASTER_PROFILE } from '@/data/user';
import type { MasterProfileModel, ServiceOfferedModel } from '@/data/user';

export default function MasterProfileContent() {
  const [master] = useState<MasterProfileModel>(MOCK_MASTER_PROFILE);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleBooking = () => {
    window.location.href = './booking-appointment.html';
  };

  const handleEditProfile = () => {
    window.location.href = './master-studio-management.html';
  };

  const handleCreateLink = () => {
    window.location.href = './appointment-link-creation.html';
  };

  const handleBackend = () => {
    window.location.href = './master-backend-overview.html';
  };

  const handleBack = () => {
    window.location.href = './master-list.html';
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <SafeIcon name="ArrowLeft" className="h-4 w-4" />
        <span>返回命理师列表</span>
      </button>

{/* Banner Section */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-8 glass-card">
        <img
          src={master.bannerUrl}
          alt="工作室背景"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
{/* Studio Name Display */}
         <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center">
             <h2 id="ihs2h" className="text-3xl md:text-4xl font-bold text-accent drop-shadow-lg" style={{ color: '#d4d4d4' }}>
               {master.studioName}
             </h2>
           </div>
         </div>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col items-center md:items-start -mt-20 md:-mt-16 relative z-10">
          <UserAvatar
            user={{
              name: master.alias,
              avatar: master.avatarUrl,
              country: master.geoTag.country,
              isPro: true,
            }}
            size="large"
            showHoverCard={false}
            className="mb-4 ring-4 ring-background"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{master.realName}</h1>
            <p className="text-lg text-muted-foreground mb-3">{master.alias}</p>
            <RegionBadge country={master.geoTag.flagIcon} region={master.geoTag.region} />
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-accent mb-1">{master.rating}</div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      name="Star"
                      className={`h-4 w-4 ${i < Math.floor(master.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">评分</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{master.serviceCount}</div>
                <p className="text-xs text-muted-foreground">累计服务</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-accent mb-1">¥{master.priceMin}</div>
                <p className="text-xs text-muted-foreground">起价</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleBooking}
              className="flex-1 bg-mystical-gradient hover:opacity-90 text-white"
              size="lg"
            >
              <SafeIcon name="Calendar" className="mr-2 h-5 w-5" />
              预约咨询
</Button>
             <Button
              variant="outline"
              onClick={handleBackend}
              size="lg"
              className="flex-1"
            >
              <SafeIcon name="LayoutDashboard" className="mr-2 h-5 w-5" />
              我的后台
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Main Content Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="about">关于我</TabsTrigger>
          <TabsTrigger value="services">服务项目</TabsTrigger>
          <TabsTrigger value="reviews">客户评价</TabsTrigger>
          <TabsTrigger value="availability">可用时间</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>专业介绍</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">{master.longDescription}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <SafeIcon name="Sparkles" className="h-5 w-5 text-accent" />
                    <span>专长领域</span>
                  </h4>
                  <p className="text-muted-foreground">{master.expertise}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <SafeIcon name="Tag" className="h-5 w-5 text-accent" />
                    <span>风格标签</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {master.styleTags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <SafeIcon name="Square" className="h-5 w-5 text-accent" />
                  <span>八字四柱</span>
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {master.baziPillars.map((pillar) => (
                    <div
                      key={pillar}
                      className="p-3 bg-background rounded text-center font-mono text-sm border border-border"
                    >
                      {pillar}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          {master.services.length > 0 ? (
            master.services.map((service) => (
              <ServiceCard key={service.serviceId} service={service} />
            ))
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center text-muted-foreground">
                暂无服务项目
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          {master.reviews.length > 0 ? (
            master.reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center text-muted-foreground">
                暂无评价
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>可用时间表</CardTitle>
              <CardDescription>
                {master.isAvailableToday ? (
                  <span className="flex items-center space-x-2 text-green-500">
                    <SafeIcon name="CheckCircle" className="h-4 w-4" />
                    <span>今日有空</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 text-muted-foreground">
                    <SafeIcon name="Clock" className="h-4 w-4" />
                    <span>今日已满</span>
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
                  <div key={day} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{day}</p>
                    <div className="space-y-1">
                      {['09:00', '14:00', '19:00'].map((time) => (
                        <button
                          key={time}
                          className="w-full px-2 py-1 text-xs rounded bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleBooking}
                className="w-full bg-mystical-gradient hover:opacity-90"
              >
                <SafeIcon name="Calendar" className="mr-2 h-4 w-4" />
                选择时间预约
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceOfferedModel }) {
  return (
    <Card className="glass-card hover:shadow-card transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{service.name}</CardTitle>
            <CardDescription>{service.type}</CardDescription>
          </div>
          {service.isPopular && (
            <Badge className="bg-accent text-accent-foreground">
              <SafeIcon name="Flame" className="h-3 w-3 mr-1" />
              热门
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">{service.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <SafeIcon name="Clock" className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">时长</p>
              <p className="font-semibold">{service.durationMinutes}分钟</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <SafeIcon name="DollarSign" className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">起价</p>
              <p className="font-semibold text-accent">¥{service.priceMin}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => window.location.href = './booking-appointment.html'}
          className="w-full bg-mystical-gradient hover:opacity-90"
        >
          预约此服务
        </Button>
      </CardContent>
    </Card>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{review.userNameAlias}</CardTitle>
            <CardDescription className="flex items-center space-x-2 mt-1">
              <span>{review.serviceType}</span>
              <span>•</span>
              <span>{review.date}</span>
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <SafeIcon
                key={i}
                name="Star"
                className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{review.content}</p>
      </CardContent>
    </Card>
  );
}
