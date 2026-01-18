
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import { MOCK_APPOINTMENT_LIST } from '@/data/appointment';
import { MOCK_MASTERS } from '@/data/user';

export default function AppointmentContent() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  // Mock notification data
  const notifications = [
    {
      id: 'notif_001',
      type: 'reminder',
      title: '预约提醒',
      message: '您与玄真子的预约将在2天后进行',
      date: '2025-11-13',
      read: false,
    },
    {
      id: 'notif_002',
      type: 'confirmed',
      title: '预约已确认',
      message: '您的预约已被命理师确认',
      date: '2025-11-12',
      read: true,
    },
    {
      id: 'notif_003',
      type: 'completed',
      title: '预约已完成',
      message: '感谢您的咨询，请留下评价',
      date: '2025-11-10',
      read: true,
    },
  ];

  // Categorize appointments
  const upcomingAppointments = MOCK_APPOINTMENT_LIST.filter(
    apt => apt.status === 'Confirmed'
  );
  const completedAppointments = MOCK_APPOINTMENT_LIST.filter(
    apt => apt.status === 'Completed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-500/20 text-blue-400';
      case 'Completed':
        return 'bg-green-500/20 text-green-400';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '已确认';
      case 'Completed':
        return '已完成';
      case 'Cancelled':
        return '已取消';
      case 'PendingPayment':
        return '待支付';
      default:
        return status;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'Clock';
      case 'confirmed':
        return 'CheckCircle';
      case 'completed':
        return 'CheckCircle2';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient-mystical mb-2">我的预约</h1>
        <p className="text-muted-foreground">
          管理您与命理师的预约，查看预约日期和通知
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">即将进行</p>
                <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Calendar" className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">已完成</p>
                <p className="text-3xl font-bold">{completedAppointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <SafeIcon name="CheckCircle" className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">未读通知</p>
                <p className="text-3xl font-bold">
                  {notifications.filter(n => !n.read).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <SafeIcon name="Bell" className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <SafeIcon name="Calendar" className="h-4 w-4" />
            <span className="hidden sm:inline">即将进行</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <SafeIcon name="CheckCircle" className="h-4 w-4" />
            <span className="hidden sm:inline">已完成</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <SafeIcon name="Bell" className="h-4 w-4" />
            <span className="hidden sm:inline">通知</span>
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Appointments */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.appointmentId} className="glass-card hover:shadow-card transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Master Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <UserAvatar
                          user={{
                            name: appointment.master.alias,
                            avatar: appointment.master.avatarUrl,
                            country: appointment.master.geoTag?.country,
                            isPro: true,
                          }}
                          size="default"
                          showHoverCard={true}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {appointment.master.alias}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {appointment.service.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.selectedDateTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.service.durationMinutes}分钟</span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Price */}
                      <div className="flex flex-col items-end gap-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">价格</p>
                          <p className="text-2xl font-bold text-accent">
                            ¥{appointment.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="default"
                        className="bg-mystical-gradient hover:opacity-90 flex-1"
                        asChild
                      >
                        <a href="./consultation-room.html">
                          <SafeIcon name="Video" className="h-4 w-4 mr-2" />
                          进入咨询室
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <SafeIcon name="MessageSquare" className="h-4 w-4 mr-2" />
                        发送消息
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <SafeIcon name="Edit" className="h-4 w-4 mr-2" />
                        修改预约
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <SafeIcon name="Calendar" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">暂无即将进行的预约</h3>
                <p className="text-muted-foreground mb-4">
                  立即预约命理师，开始您的命理探索之旅
                </p>
                <Button className="bg-mystical-gradient hover:opacity-90" asChild>
                  <a href="./prognosis-service-entry.html">
                    <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                    新增预约
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Completed Appointments */}
        <TabsContent value="completed" className="space-y-4">
          {completedAppointments.length > 0 ? (
            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <Card key={appointment.appointmentId} className="glass-card">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Master Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <UserAvatar
                          user={{
                            name: appointment.master.alias,
                            avatar: appointment.master.avatarUrl,
                            country: appointment.master.geoTag?.country,
                            isPro: true,
                          }}
                          size="default"
                          showHoverCard={true}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {appointment.master.alias}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {appointment.service.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.selectedDateTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col items-end gap-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <a href="./user-record-detail.html">
                            <SafeIcon name="FileText" className="h-4 w-4 mr-2" />
                            查看记录
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <SafeIcon name="CheckCircle" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">暂无已完成的预约</h3>
                <p className="text-muted-foreground">
                  完成预约后，您可以在此查看咨询记录
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`glass-card transition-all ${
                    !notification.read ? 'border-primary/50 bg-primary/5' : ''
                  }`}
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <SafeIcon
                          name={getNotificationIcon(notification.type)}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="pt-12 pb-12 text-center">
                <SafeIcon name="Bell" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">暂无通知</h3>
                <p className="text-muted-foreground">
                  当有新的预约提醒时，您将在此收到通知
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Calendar Section */}
      <Card className="glass-card mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Calendar" className="h-5 w-5" />
            预约日历
          </CardTitle>
          <CardDescription>
            与命理师的预约日历自动同步
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <SafeIcon name="Calendar" className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              日历视图将在此显示您的所有预约
            </p>
            <p className="text-sm text-muted-foreground">
              系统会自动与命理师的日历同步，确保您不会错过任何预约
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
