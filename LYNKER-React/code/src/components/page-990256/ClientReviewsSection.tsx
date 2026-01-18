
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ClientReviewsSectionProps {
  reviews: Review[];
}

export default function ClientReviewsSection({ reviews }: ClientReviewsSectionProps) {
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>评价统计</CardTitle>
          <CardDescription>
            基于{reviews.length}条客户评价
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-gradient-mystical mb-2">
                  {averageRating}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      name="Star"
                      className={`h-4 w-4 ${
                        i < Math.round(parseFloat(averageRating as string))
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviews.length}条评价
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mystical-gradient"
                        style={{
                          width: `${
                            reviews.length > 0
                              ? (ratingDistribution[rating as keyof typeof ratingDistribution] /
                                  reviews.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {ratingDistribution[rating as keyof typeof ratingDistribution]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-muted-foreground/20">
                <div className="text-2xl font-bold text-gradient-mystical mb-1">
                  {reviews.length}
                </div>
                <p className="text-sm text-muted-foreground">总评价数</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-muted-foreground/20">
                <div className="text-2xl font-bold text-accent mb-1">
                  {reviews.filter((r) => r.verified).length}
                </div>
                <p className="text-sm text-muted-foreground">已验证评价</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-muted-foreground/20">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {ratingDistribution[5]}
                </div>
                <p className="text-sm text-muted-foreground">5星评价</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-muted-foreground/20">
                <div className="text-2xl font-bold text-accent mb-1">
                  {((reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100).toFixed(0)}%
                </div>
                <p className="text-sm text-muted-foreground">好评率</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>客户评价</CardTitle>
          <CardDescription>
            来自已验证客户的真实评价
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-lg border border-muted-foreground/20 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.clientName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.clientName}</p>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <SafeIcon name="CheckCircle" className="h-3 w-3 mr-1" />
                          已验证
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      name="Star"
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground/80">{review.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="glass-card border-accent/50 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-semibold text-accent">提示</p>
              <p className="text-muted-foreground">
                客户评价是建立信任和吸引新客户的重要因素。优质的服务和专业的态度会获得更多好评。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
