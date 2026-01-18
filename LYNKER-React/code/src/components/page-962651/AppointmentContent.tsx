
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import RegionBadge from '@/components/common/RegionBadge';
import EmptyState from '@/components/common/EmptyState';
import { MOCK_APPOINTMENT_LIST } from '@/data/appointment';
import type { AppointmentModel } from '@/data/appointment';

export default function AppointmentContent() {
  const [appointments] = useState<AppointmentModel[]>(MOCK_APPOINTMENT_LIST);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  // Filter appointments by status
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'Confirmed'
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.status === 'Completed'
  );
  const allAppointments = appointments;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PendingPayment: { label: '待支付', variant: 'outline' as const },
      Confirmed: { label: '已确认', variant: 'default' as const },
      Completed: { label: '已完成', variant: 'secondary' as const },
      Cancelled: { label: '已取消', variant: 'destructive' as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const iconMap = {
      PendingPayment: 'Clock',
      Confirmed: 'CheckCircle',
      Completed: 'CheckCircle2',
      Cancelled: 'XCircle',
    };
    return iconMap[status as keyof typeof iconMap] || 'Circle';
  };

  const renderAppointmentCard = (appointment: AppointmentModel) => (
    <Card key={appointment.appointmentId} className="glass-card hover:shadow-card transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            {/* Master Avatar */}
            <UserAvatar
              user={{
                name: appointment.master.alias,
                avatar: appointment.master.avatarUrl,
                country: appointment.master.geoTag?.flagIcon,
                region: appointment.master.geoTag?.region,
                isPro: true,
              }}
              size="large"
              showHoverCard={true}
            />

            {/* Appointment Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{appointment.master.alias}</h3>
                {appointment.master.geoTag && (
                  <RegionBadge
                    country={appointment.master.geoTag.flagIcon}
                    region={appointment.master.geoTag.region}
                    size="small"
                  />
                )}
              </div>

              {/* Service Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-2">
                  <SafeIcon name="Sparkles" className="h-4 w-4 text-accent" />
                  <span className="text-sm text-foreground/80">
                    {appointment.service.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon name="Clock" className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {appointment.selectedDateTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon name="DurationMinutes" className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {appointment.service.durationMinutes} 分钟
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">价格：</span>
                <span className="text-lg font-bold text-accent">
                  ¥{appointment.price}
                </span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end space-y-2">
            {getStatusBadge(appointment.status)}
            <SafeIcon
              name={getStatusIcon(appointment.status)}
              className="h-5 w-5 text-accent"
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <SafeIcon name="Calendar" className="h-4 w-4" />
            <span>预约ID: {appointment.appointmentId}</span>
          </div>

          <div className="flex items-center space-x-2">
            {appointment.status === 'Confirmed' && (
              <>
                <Button
                  size="sm"
                  className="bg-mystical-gradient hover:opacity-90"
                  asChild
                >
                  <a href="./consultation-room.html">
                    <SafeIcon name="Video" className="h-4 w-4 mr-1" />
                    进入咨询室
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Handle cancellation
                    alert('预约已取消');
                  }}
                >
                  <SafeIcon name="X" className="h-4 w-4 mr-1" />
                  取消预约
                </Button>
              </>
            )}
            {appointment.status === 'Completed' && (
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
            {appointment.status === 'PendingPayment' && (
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:opacity-90"
                asChild
              >
                <a href="./payment-gateway.html">
                  <SafeIcon name="CreditCard" className="h-4 w-4 mr-1" />
                  完成支付
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">我的预约</h1>
          <p className="text-muted-foreground">
            管理您与命理师的预约，实时同步预约日历
          </p>
        </div>

        {/* Notifications */}
        {upcomingAppointments.length > 0 && (
          <Card className="glass-card mb-6 border-accent/50 bg-accent/5">
            <CardContent className="p-4 flex items-start space-x-3">
              <SafeIcon name="Bell" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">
                  您有 {upcomingAppointments.length} 个即将进行的预约
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  请提前 15 分钟进入咨询室，确保良好的咨询体验
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <SafeIcon name="Clock" className="h-4 w-4" />
              <span>即将进行</span>
              {upcomingAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {upcomingAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <SafeIcon name="CheckCircle" className="h-4 w-4" />
              <span>已完成</span>
              {completedAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {completedAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <SafeIcon name="List" className="h-4 w-4" />
              <span>全部</span>
              {allAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {allAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Tab */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(renderAppointmentCard)}
              </div>
            ) : (
              <EmptyState
                variant="no-records"
                title="暂无即将进行的预约"
                description="您还没有确认的预约，立即预约一位命理师开始您的命理探索之旅。"
                actionLabel="浏览命理师"
                actionHref="./prognosis-service-entry.html"
              />
            )}
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-4">
            {completedAppointments.length > 0 ? (
              <div className="space-y-4">
                {completedAppointments.map(renderAppointmentCard)}
              </div>
            ) : (
              <EmptyState
                variant="no-records"
                title="暂无已完成的预约"
                description="您还没有完成任何预约，预约一位命理师开始咨询吧。"
                actionLabel="预约咨询"
                actionHref="./prognosis-service-entry.html"
              />
            )}
          </TabsContent>

          {/* All Tab */}
          <TabsContent value="all" className="space-y-4">
            {allAppointments.length > 0 ? (
              <div className="space-y-4">
                {allAppointments.map(renderAppointmentCard)}
              </div>
            ) : (
              <EmptyState
                variant="no-records"
                title="暂无预约"
                description="您还没有任何预约记录，立即预约一位命理师开始您的命理探索之旅。"
                actionLabel="浏览命理师"
                actionHref="./prognosis-service-entry.html"
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Calendar Sync Info */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SafeIcon name="Calendar" className="h-5 w-5 text-accent" />
              <span>日历同步</span>
            </CardTitle>
            <CardDescription>
              您的预约已与命理师的日历自动同步
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">已同步</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  所有预约已实时同步到命理师日历
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon name="Bell" className="h-5 w-5 text-accent" />
                  <span className="font-semibold">自动提醒</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  预约前 24 小时和 1 小时将收到提醒
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon name="Shield" className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">安全保障</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  您的预约信息已加密保护
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
