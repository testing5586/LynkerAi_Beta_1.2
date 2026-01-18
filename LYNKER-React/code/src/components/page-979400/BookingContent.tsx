
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import { MOCK_APPOINTMENT_LIST } from '@/data/appointment';
import BookingCalendar from './BookingCalendar';
import BookingNotifications from './BookingNotifications';

export default function BookingContent() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Mock notifications data
  const notifications = [
    {
      id: 'notif_001',
      type: 'reminder',
      title: '预约提醒',
      message: '您与玄真子的预约将在明天下午2点进行',
      date: '2025-11-14',
      isRead: false,
      appointmentId: 'apt_001',
    },
    {
      id: 'notif_002',
      type: 'confirmed',
      title: '预约已确认',
      message: '您的预约已被命理师确认，请准时参加',
      date: '2025-11-12',
      isRead: true,
      appointmentId: 'apt_002',
    },
    {
      id: 'notif_003',
      type: 'rescheduled',
      title: '预约已改期',
      message: '命理师已将您的预约改至11月20日10:00',
      date: '2025-11-11',
      isRead: true,
      appointmentId: 'apt_003',
    },
  ];

  // Filter appointments by selected date
  const filteredAppointments = selectedDate
    ? MOCK_APPOINTMENT_LIST.filter((apt) => apt.selectedDateTime.startsWith(selectedDate))
    : MOCK_APPOINTMENT_LIST;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient-mystical mb-2">预约管理</h1>
        <p className="text-muted-foreground">查看和管理您的命理师预约记录</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <SafeIcon name="Calendar" className="h-4 w-4" />
            <span>预约日历</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <SafeIcon name="Bell" className="h-4 w-4" />
            <span>通知 ({notifications.filter((n) => !n.isRead).length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <BookingCalendar
                appointments={MOCK_APPOINTMENT_LIST}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            {/* Appointments List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {selectedDate ? `${selectedDate} 的预约` : '所有预约'}
                </h2>
                {selectedDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDate(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <SafeIcon name="X" className="h-4 w-4 mr-1" />
                    清除筛选
                  </Button>
                )}
              </div>

              {filteredAppointments.length > 0 ? (
                <div className="space-y-3">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <SafeIcon name="Calendar" className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground text-center">
                      {selectedDate ? '该日期暂无预约' : '您还没有预约任何命理师'}
                    </p>
                    <Button asChild className="mt-4 bg-mystical-gradient">
                      <a href="./prognosis-service-entry.html">
                        <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                        立即预约
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <BookingNotifications notifications={notifications} />
        </TabsContent>
      </Tabs>

      {/* Sync Status */}
      <Alert className="border-primary/30 bg-primary/5">
        <SafeIcon name="CheckCircle2" className="h-4 w-4 text-primary" />
        <AlertTitle>日历同步</AlertTitle>
        <AlertDescription>
          您的预约日历已与所有命理师的日程自动同步。新的预约和改期通知将实时更新。
        </AlertDescription>
      </Alert>
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: any }) {
  const statusConfig = {
    PendingPayment: { label: '待支付', color: 'bg-yellow-500/20 text-yellow-700' },
    Confirmed: { label: '已确认', color: 'bg-green-500/20 text-green-700' },
    Completed: { label: '已完成', color: 'bg-blue-500/20 text-blue-700' },
    Cancelled: { label: '已取消', color: 'bg-red-500/20 text-red-700' },
  };

  const status = statusConfig[appointment.status as keyof typeof statusConfig];
  const [dateStr, timeStr] = appointment.selectedDateTime.split(' ');
  const appointmentDate = new Date(dateStr);
  const formattedDate = appointmentDate.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <Card className="glass-card hover:shadow-card transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Master Info */}
          <div className="flex items-start gap-4 flex-1">
            <UserAvatar
              user={{
                name: appointment.master.alias,
                avatar: appointment.master.avatarUrl,
                country: appointment.master.geoTag?.country,
                isPro: true,
              }}
              size="large"
              showHoverCard={false}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{appointment.master.alias}</h3>
              <p className="text-sm text-muted-foreground mb-2">{appointment.master.expertise}</p>
              <RegionBadge
                country={appointment.master.geoTag?.country}
                region={appointment.master.geoTag?.region}
                size="small"
              />
            </div>
          </div>

          {/* Status Badge */}
          <Badge className={status.color}>{status.label}</Badge>
        </div>

        {/* Appointment Details */}
        <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
              <span>
                <span className="font-medium">{formattedDate}</span>
                <span className="text-muted-foreground ml-1">{timeStr}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <SafeIcon name="Zap" className="h-4 w-4 text-muted-foreground" />
              <span>
                <span className="font-medium">{appointment.service.name}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">服务时长：</span>
              <span className="font-medium">{appointment.service.durationMinutes} 分钟</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">价格：</span>
              <span className="text-lg font-bold text-accent">¥{appointment.price}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {appointment.status === 'Confirmed' && (
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
              <a href="./consultation-room.html">
                <SafeIcon name="Video" className="h-4 w-4 mr-2" />
                进入咨询室
              </a>
            </Button>
          )}
          {appointment.status === 'PendingPayment' && (
            <Button asChild className="flex-1 bg-accent hover:bg-accent/90">
              <a href="./payment-gateway.html">
                <SafeIcon name="CreditCard" className="h-4 w-4 mr-2" />
                完成支付
              </a>
            </Button>
          )}
          <Button variant="outline" className="flex-1">
            <SafeIcon name="MessageSquare" className="h-4 w-4 mr-2" />
            联系命理师
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
