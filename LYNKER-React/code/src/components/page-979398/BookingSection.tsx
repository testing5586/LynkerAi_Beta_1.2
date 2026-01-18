
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import BookingCalendar from './BookingCalendar';
import EmptyState from '@/components/common/EmptyState';

interface Booking {
  id: string;
  masterId: string;
  masterName: string;
  masterAvatar: string;
  masterCountry: string;
  serviceType: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  notes?: string;
  meetingLink?: string;
}

// Mock booking data
const mockBookings: Booking[] = [
  {
    id: 'booking-001',
    masterId: 'master-001',
    masterName: '灵月命理师',
    masterAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    masterCountry: 'CN',
    serviceType: '八字详解',
    date: '2025-01-20',
    time: '14:00',
    duration: 60,
    status: 'upcoming',
    price: 299,
    currency: 'CNY',
    notes: '请提前10分钟进入会议室',
    meetingLink: 'https://meet.jitsi.org/lynker-001',
  },
  {
    id: 'booking-002',
    masterId: 'master-002',
    masterName: '紫薇大师',
    masterAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    masterCountry: 'CN',
    serviceType: '紫微斗数分析',
    date: '2025-01-15',
    time: '10:00',
    duration: 90,
    status: 'completed',
    price: 399,
    currency: 'CNY',
    meetingLink: 'https://meet.jitsi.org/lynker-002',
  },
  {
    id: 'booking-003',
    masterId: 'master-003',
    masterName: '占星师Alice',
    masterAvatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    masterCountry: 'US',
    serviceType: '星座运势',
    date: '2025-01-10',
    time: '09:00',
    duration: 45,
    status: 'cancelled',
    price: 199,
    currency: 'USD',
  },
];

export default function BookingSection() {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming');
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: { label: '即将开始', variant: 'default' as const },
      completed: { label: '已完成', variant: 'secondary' as const },
      cancelled: { label: '已取消', variant: 'destructive' as const },
    };
    return variants[status as keyof typeof variants] || variants.upcoming;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      upcoming: 'Clock',
      completed: 'CheckCircle2',
      cancelled: 'XCircle',
    };
    return icons[status as keyof typeof icons] || 'Clock';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    });
  };

  const renderBookingsList = (items: Booking[]) => {
    if (items.length === 0) {
      return (
        <EmptyState
          variant="no-records"
          title="暂无预约"
          description="您还没有任何预约记录，立即预约命理师开始您的命理探索之旅。"
          actionLabel="预约命理师"
          actionHref="./prognosis-service-entry.html"
        />
      );
    }

    return (
      <div className="space-y-4">
        {items.map((booking) => (
          <Card key={booking.id} className="glass-card hover:shadow-card transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Left: Master Info */}
                <div className="flex items-start gap-4 flex-1">
                  <UserAvatar
                    user={{
                      name: booking.masterName,
                      avatar: booking.masterAvatar,
                      country: booking.masterCountry,
                      isPro: true,
                    }}
                    size="large"
                    showHoverCard={true}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {booking.masterName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {booking.serviceType}
                    </p>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <SafeIcon name="Calendar" className="h-4 w-4 text-accent" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SafeIcon name="Clock" className="h-4 w-4 text-accent" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SafeIcon name="Timer" className="h-4 w-4 text-accent" />
                        <span>{booking.duration}分钟</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {booking.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        💡 {booking.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Status & Actions */}
                <div className="flex flex-col items-end gap-3">
                  <Badge
                    variant={getStatusBadge(booking.status).variant}
                    className="flex items-center gap-1"
                  >
                    <SafeIcon
                      name={getStatusIcon(booking.status)}
                      className="h-3 w-3"
                    />
                    {getStatusBadge(booking.status).label}
                  </Badge>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">价格</p>
                    <p className="text-lg font-bold text-accent">
                      {booking.price} {booking.currency}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {booking.status === 'upcoming' && booking.meetingLink && (
                      <Button
                        size="sm"
                        className="bg-mystical-gradient hover:opacity-90"
                        asChild
                      >
                        <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer">
                          <SafeIcon name="Video" className="h-4 w-4 mr-1" />
                          进入会议
                        </a>
                      </Button>
                    )}
                    {booking.status === 'completed' && booking.meetingLink && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href="./user-record-detail.html">
                          <SafeIcon name="FileText" className="h-4 w-4 mr-1" />
                          查看记录
                        </a>
                      </Button>
                    )}
                    {booking.status === 'upcoming' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                      >
                        <SafeIcon name="X" className="h-4 w-4 mr-1" />
                        取消预约
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient-mystical mb-2">
          我的预约
        </h1>
        <p className="text-muted-foreground">
          管理您与命理师的预约，与命理师日历实时同步
        </p>
      </div>

      <Separator />

      {/* Calendar & List View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card className="glass-card sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">预约日历</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingCalendar bookings={bookings} />
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <SafeIcon name="Clock" className="h-4 w-4" />
                <span className="hidden sm:inline">即将开始</span>
                <Badge variant="secondary" className="ml-2">
                  {upcomingBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <SafeIcon name="CheckCircle2" className="h-4 w-4" />
                <span className="hidden sm:inline">已完成</span>
                <Badge variant="secondary" className="ml-2">
                  {completedBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-2">
                <SafeIcon name="XCircle" className="h-4 w-4" />
                <span className="hidden sm:inline">已取消</span>
                <Badge variant="secondary" className="ml-2">
                  {cancelledBookings.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {renderBookingsList(upcomingBookings)}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {renderBookingsList(completedBookings)}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {renderBookingsList(cancelledBookings)}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">总预约次数</p>
                <p className="text-3xl font-bold text-gradient-mystical">
                  {bookings.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Calendar" className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">已完成</p>
                <p className="text-3xl font-bold text-accent">
                  {completedBookings.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <SafeIcon name="CheckCircle2" className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">即将开始</p>
                <p className="text-3xl font-bold text-primary">
                  {upcomingBookings.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Clock" className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
